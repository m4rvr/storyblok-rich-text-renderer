import { resolve } from 'path';
import typescript from 'rollup-plugin-typescript2';
import nodeResolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import vue from 'rollup-plugin-vue';
import cjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import { config } from 'dotenv';
config();

const targets = process.env.TARGETS.split(' ');
const isDev = process.env.NODE_ENV === 'development';
const packagesDir = resolve(__dirname, 'packages');
const extensions = ['.tsx', '.ts', '.jsx', '.js'];
const external = [
  'vue',
  'vue-template-compiler',
  '@vue/composition-api',
  '@babel/runtime',
  '@babel/runtime-corejs3',
  '@babel/plugin-transform-runtime',
  'core-js',
];

const basePlugins = [
  nodeResolve({
    preferBuiltins: true,
    browser: true,
  }),
  cjs(),
  vue({
    css: false,
  }),
  /* builtins(),
  globals(), */
  babel({
    extensions,
    exclude: 'node_modules/**',
    babelHelpers: 'runtime',
    plugins: [['@babel/plugin-transform-runtime']],
    babelrc: false,
  }),
  json(),
];

const configs = targets.map((p) => createConfig(p));

// Build fixtures if development mode
if (isDev) {
  configs.push(getFixturesConfig());
}

function createConfig(target) {
  const packageDir = resolve(packagesDir, target);
  const packageResolve = (p) => resolve(packageDir, p);
  const pkg = require(packageResolve('package.json'));

  const plugins = [
    typescript({
      tsconfig: packageResolve('tsconfig.json'),
      tsconfigOverride: {
        compilerOptions: {
          declarationMap: true,
        },
        exclude: ['**/__tests__'],
      },
    }),
    ...basePlugins,
  ];

  const output = [
    {
      file: packageResolve(pkg.module),
      format: 'es',
      sourcemap: !isDev,
    },
  ];

  if (!isDev) {
    const { terser } = require('rollup-plugin-terser');
    const globals = {
      vue: 'Vue',
      '@vue/composition-api': 'vueCompositionApi',
      '@marvinrudolph/storyblok-rich-text-types': 'storyblokRichTextTypes',
    };

    const outputConfig = {
      exports: 'named',
      name: pkg.buildOptions.name,
      sourcemap: true,
      globals,
    };

    output.push(
      {
        ...outputConfig,
        file: packageResolve(pkg.main),
        format: 'umd',
      },
      {
        ...outputConfig,
        file: packageResolve(pkg.unpkg),
        format: 'iife',
        plugins: [terser()],
      },
    );

    plugins.push(getReplacementPlugin());
  }

  return {
    input: packageResolve('src/index.ts'),
    output,
    plugins,
    external: [...external, ...Object.keys(pkg.dependencies || {})],
  };
}

function getFixturesConfig() {
  const fixturesFolder = resolve(__dirname, 'tests/fixtures');

  return {
    input: resolve(fixturesFolder, 'src/index.ts'),
    output: {
      file: resolve(fixturesFolder, 'dist/main.js'),
      format: 'es',
    },
    plugins: [
      typescript({
        tsconfig: resolve(fixturesFolder, 'tsconfig.json'),
        check: false,
      }),
      getReplacementPlugin(),
      ...basePlugins,
    ],
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg);
      }
    },
  };
}

function getReplacementPlugin() {
  return replace({
    'process.env.NODE_ENV': `"development"`,
    'process.env.STORYBLOK_TOKEN': `'${process.env.STORYBLOK_TOKEN}'`,
  });
}

export default configs;
