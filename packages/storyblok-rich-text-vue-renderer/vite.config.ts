import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [{ find: /^@marvr\/(.*)/, replacement: '@marvr/$1/src' }],
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/plugin.ts'),
      name: 'StoryblokRichTextVueRenderer',
    },
  },
});
