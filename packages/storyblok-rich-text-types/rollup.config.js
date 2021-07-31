import esbuild from 'rollup-plugin-esbuild';

const formats = ['cjs', 'es'];

export default {
  input: 'src/index.ts',
  output: formats.map((format) => ({
    file: `dist/storyblok-rich-text-types.${format}.js`,
    format,
  })),
  plugins: [esbuild()],
};
