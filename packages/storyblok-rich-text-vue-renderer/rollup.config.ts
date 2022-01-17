import { defineConfig } from 'rollup'
import dts from 'rollup-plugin-dts'
import pkg from './package.json'

export default defineConfig({
  input: 'dist/src/index.d.ts',
  output: {
    file: 'dist/index.d.ts',
    format: 'es',
  },
  plugins: [dts()],
  external: [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  ],
})
