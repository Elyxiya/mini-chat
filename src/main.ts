import { createApp } from 'vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import '@/style/main.css'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
//svg
import 'virtual:svg-icons-register'
//引入自定义插件对象：注册整个项目全局组件
import gloablComponent from './components/index'
import pinia from './store'
const app = createApp(App)

pinia.use(piniaPluginPersistedstate)

app
.use(gloablComponent)
.use(pinia)
.use(router)
.use(ElementPlus, {
  locale: zhCn,
})
app.mount('#app')
