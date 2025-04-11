import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({command, mode})=>{
  let env = loadEnv(mode, process.cwd())
  return {
    plugins: [vue()],
    resolve:{
      alias:{
        '@': path.resolve(__dirname, './src')
      }
    },
    server: {
      proxy: {
        [env.VITE_APP_BASE_API]: {
          target: env.VITE_SERVE,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      }
    }
   
  }
})
