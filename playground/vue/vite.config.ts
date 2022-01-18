import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [{ find: /^@marvr\/(.*)/, replacement: '@marvr/$1/src' }],
  },
  plugins: [Vue()],
})
