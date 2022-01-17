import { resolve } from 'path'
import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import Dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'js' : 'cjs'}`,
    },
    rollupOptions: {
      external: ['vue', '@marvr/storyblok-rich-text-types'],
    },
    minify: false,
  },
  plugins: [
    Vue(),
    Dts({
      tsConfigFilePath: resolve(__dirname, '../../tsconfig.json'),
      include: ['src/**/*.ts', 'src/**/*.vue'],
    }),
  ],
})
