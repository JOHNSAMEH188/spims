import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    allowedHosts: ['bbb10d76c810.ngrok-free.app','1e806b4c5214.ngrok-free.app'],
  },
})
