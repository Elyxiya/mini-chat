<template>
  <div class="frame">
    <div class="center">

      <div class="box-1" :class="{'is-right': !isLogin}">
        <form class="form" id="a-form">
          <h2 class="form_title">创建账号</h2>
          <input type="text" class="form_input" v-model="registerForm.userName" placeholder="用户名">
          <input type="text" class="form_input" v-model="registerForm.email" placeholder="邮箱">
          <div class="verify-code">
              <input type="text" class="form_input" v-model="registerForm.emailCode" placeholder="验证码">
              <button type="button" class="button send-code-btn" :disabled="countdown > 0"
                  @click="sendVerifyCode">
                  {{ countdown > 0 ? `${countdown}s` : '获取验证码' }}
              </button>
          </div>
          <input type="password" class="form_input" v-model="registerForm.password" placeholder="密码">
          <input type="password" class="form_input" v-model="registerForm.confirmPassword"
              placeholder="确认密码">
          <button type="button" class="button submit" @click="handleRegister">注 册</button>
        </form>
      </div>

      <div class="box-2" :class="{'is-right': isLogin, 'is-z': isLogin}">
        <form class="form" id="b-form">
            <h2 class="form_title title">登入账号</h2>
            <input type="text" class="form_input" v-model="loginForm.userName" placeholder="用户名">
            <input type="password" class="form_input" v-model="loginForm.password" placeholder="密码">
            <a class="form_link">忘记密码？</a>
            <button type="button" class="button submit" @click="handleLogin">登 入</button>
        </form>
      </div>

      <div class="box-3" :class="{'is-left': isLogin, 'is-tr': isAnimating }">
        <div class="box_circle-1" :class="{ 'is-left': isLogin }"></div>
        <div class="box_circle-2" :class="{ 'is-left': isLogin }"></div>

        <div class="box_container" :class="{ 'is-hidden': isLogin }" id="box-c1">
            <h2 class="box_title title" style="letter-spacing: 0;">Welcome Back！</h2>
            <p class="box_description description">已经有账号了嘛，去登入账号来进入奇妙世界吧！！！</p>
            <button class="box_button button box-btn" @click="handleSwitch">SIGN IN</button>
        </div>

        <div class="box_container" :class="{ 'is-hidden': !isLogin }" id="box-c2">
            <h2 class="box_title title" style="letter-spacing: 0;">Hello Friend！</h2>
            <p class="box_description description">去注册一个账号，成为尊贵的粉丝会员，让我们踏入奇妙的旅途！</p>
            <button class="box_button button box-btn" @click="handleSwitch">SIGN UP</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { login, register, getCode } from '@/api/login'
import type { LoginResponse, RegisterResponese, CodeResponese, UserInfo } from '@/types/login'
import { useUserStore } from '@/store/module/useUserStore'

const router = useRouter()
const isLogin = ref(true)
const isAnimating = ref(false)
const countdown = ref(0)

const loginForm = ref({
    userName: '',
    password: ''
})

const registerForm = ref({
    userName: '',
    email: '',
    emailCode: '',
    password: '',
    confirmPassword: ''
})

// 切换登录/注册
const handleSwitch = () => {
    isAnimating.value = true
    setTimeout(() => {
        isAnimating.value = false
    }, 1500)
    isLogin.value = !isLogin.value
}

// 处理登录
const handleLogin = async () => {
    if (!loginForm.value.userName || !loginForm.value.password) {
        ElMessage.error('请输入用户名和密码')
        return
    }

    try {
        const res = await login(loginForm.value) as LoginResponse
        if (res.code === 0) {
            // 存储token
            localStorage.setItem('x-token', res.data.token)
            useUserStore().setUser(res.data as UserInfo)
            localStorage.setItem('user', JSON.stringify(res.data))
            ElMessage.success('登录成功')
            router.push('/')
        } else {
            ElMessage.error(res.msg || '登录失败')
        }
    } catch (error: any) {
        ElMessage.error(error.message || '登录失败，请稍后重试')
    }
}

// 处理注册
const handleRegister = async () => {
    // 表单验证
    if (!registerForm.value.userName || !registerForm.value.email ||
        !registerForm.value.password || !registerForm.value.confirmPassword ||
        !registerForm.value.emailCode) {
        ElMessage.error('请填写所有必填项')
        return
    }

    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(registerForm.value.email)) {
        ElMessage.error('请输入正确的邮箱格式')
        return
    }

    // 验证密码
    if (registerForm.value.password !== registerForm.value.confirmPassword) {
        ElMessage.error('两次输入的密码不一致')
        return
    }

    try {
        const res = await register({
            userName: registerForm.value.userName,
            email: registerForm.value.email,
            password: registerForm.value.password,
            emailCode: registerForm.value.emailCode
        }) as RegisterResponese

        if (res.code === 0) {
            ElMessage.success('注册成功')
            // 清空表单
            registerForm.value = {
                userName: '',
                email: '',
                emailCode: '',
                password: '',
                confirmPassword: ''
            }
            // 切换到登录页面
            isLogin.value = true
        } else {
            ElMessage.error(res.msg || '注册失败')
        }
    } catch (error: any) {
        ElMessage.error(error.message || '注册失败，请稍后重试')
    }
}

// 发送验证码
const sendVerifyCode = async () => {
    if (!registerForm.value.email) {
        ElMessage.error('请输入邮箱')
        return
    }
    // 验证邮箱格式
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(registerForm.value.email)) {
        ElMessage.error('请输入正确的邮箱格式')
        return
    }

    try {
        const res = await getCode({ email: registerForm.value.email }) as CodeResponese
        if (res.code === 0) {
            ElMessage.success('验证码已发送')
            // 开始倒计时
            countdown.value = 60
            const timer = setInterval(() => {
                countdown.value--
                if (countdown.value <= 0) {
                    clearInterval(timer)
                }
            }, 1000)
        } else {
            ElMessage.error(res.msg || '发送验证码失败')
        }
    } catch (error: any) {
        ElMessage.error(error.message || '发送验证码失败，请重试')
    }
}
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  user-select: none;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 12px;
    background-color: #ecf0f3;
    color: #a0a5a8;
}

.frame {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;

  top: 50%;
  left: 50%;
  width: 100vw;
  height: 100vh;
  transform: translate(-50%, -50%);

  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background: linear-gradient(90deg, #e0c3fc, #8ec5fc 100%);
}

.center {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1000px;
  height: 600px;
  margin: 0 auto;
  padding: 25px;
  transform: translate(-50%, -50%);

  border-radius: 12px;
  box-shadow: 10px 10px 10px #d1d9e6, -10px -10px 10px #f9f9f9;
  background: #ecf0f3;
  overflow: hidden;

  min-width: 1000px;
  min-height: 600px;
}

.box {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  width: 600px;
  height: 100%;
  padding: 25px;

  background: #ecf0f3;
  transition: 1.25s;
}

.box-1 {
  @extend .box;
  z-index: 100;
  margin-left: 400px;
  right: 0;
  left: auto;
}

.box-2 {
  @extend .box;
  z-index: 0;
  left: 0;
}

.button {
   width:  100px;
   height: 50px;
   margin-top: 50px;
   
   border: none;
   outline: none;
   color: #f9f9f9;
   border-radius: 25px;
   box-shadow: 8px 8px 8px #d1d9e6, -8px -8px 16px #f9f9f9;
   font-size: 14px;
   font-weight: 700;
   letter-spacing: 1.15px;
   background: #4b70e2;
   cursor: pointer; 

   &:hover {
    box-shadow: 6px 6px 10px #d1d9e6, -6px -6px 10px #f9f9f9;
    transform: scale(0.985);
    transition: 0.25s;
   }
}

.description {
    color: #666666;
    font-size: 14px;
    letter-spacing: 0.25px;
    text-align: center;
    line-height: 1.6;
}

.form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 20px 0;

  .form_title {
    margin-bottom: 20px;
    
    color: #666;
    font-size: 34px;
    font-weight: 700;
    line-height: 3;
    letter-spacing: 10px;
  }

  .form_input {
    width: 350px;
    height: 40px;
    margin: 4px 0;
    padding-left: 25px;

    border: none;
    outline: none;
    color: #666;
    font-size: 13px;
    letter-spacing: 0.15px;
    border-radius: 8px;
    box-shadow: inset 2px 2px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9;
    background: #ecf0f3;

    transition: 0.25s ease;

    &:focus {
      box-shadow: inset 4px 4px 4px #d1d9e6, inset -2px -2px 4px #f9f9f9; 
    }
    
  }

  .submit {
    width: 200px;
  }

  .verify-code {
    display: flex;
    gap: 10px;
    width: 350px;
    margin: 4px 0;

    .form_input {
      flex: 1;
      margin: 0;
    }

    .send-code-btn {
      width: 120px;
      height: 40px;
      margin: 0;
      padding: 0;
      font-size: 12px;

      &:disabled {
        background: #ccc;
        cursor: not-allowed;
      }
    }
  }

}

.box-3 {
  @extend .box;
  z-index: 200; 
  left: 0;
  width: 400px;
  padding: 50px;

  box-shadow: 4px 4px 10px #d1d9e6, -4px -4px 10px #d1d9e6;
  overflow: hidden;
}

.box_circle-1 {
  position: absolute;
  width: 500px;
  height: 500px;
  left: -60%;
  bottom: -60%;

  border-radius: 50%;
  box-shadow: inset 8px 8px 12px #b8bec7, inset -8px -8px 12px #fff;
  background: #ecf0f3;
  transition: 1.25s;
}

.box_circle-2 {
  @extend .box_circle-1;
  top: -30%;
  left: 60%;
  width: 300px;
  height: 300px;
}

.box_container {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  position: absolute;
  width: 400px;
  padding: 50px 55px;
  transform: 1.25s;

  .box_title {
    margin-bottom: 20px;
    
    color: #666;
    font-size: 34px;
    font-weight: 700;
    line-height: 3;
    letter-spacing: 10px;
  }
  
  .box_button {
    width: 200px;
    &:active,:focus {
      box-shadow: 2px 2px 6px #d1d9e6, -2px -2px 6px #f9f9f9;
      transform: scale(0.97);
      transition: 0.25s;
    }
  }
}

.is-left {
  left: calc(100% - 400px);
  transition: 1.25s;
  transform-origin: left;
}

.is-right {
  left: 0;
  transition: 1.25s;
  transform-origin: right;
}

.is-hidden {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  transition: 1.25s;
}

.is-z {
  z-index: 200;
  transform: 1.25s;
}

.is-tr {
  animation: translation 1.25s;
}
@keyframes translation {
  0%,
    10%,
    100% {
        width: 400px;
    }

    30%,
    50% {
        width: 500px;
    }
}
</style>