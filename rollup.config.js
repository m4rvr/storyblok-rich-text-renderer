import { resolve } from 'path';
import typescript from 'rollup-plugin-typescript2';
import vue from 'rollup-plugin-vue';
import nodeResolve from '@rollup/plugin-node-resolve';
import cjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import json from '@rollup/plugin-json';
import { config } from 'dotenv';
config();

const packagesDir = resolve(__dirname, 'packages');
const targets = process.env.TARGETS.split(' ');
const isDev = process.env.NODE_ENV === 'development';
const shouldEmitDeclaration = process.env.TYPES != null;

const plugins = [
  typescript({
    check: !isDev,
    cacheRoot: resolve(__dirname, 'node_modules/.rts2_cache'),
    tsconfig: resolve(__dirname, 'tsconfig.json'),
    tsconfigOverride: {
      compilerOptions: {
        sourceMap: true,
        declaration: shouldEmitDeclaration,
        declarationMap: shouldEmitDeclaration,
      },
      exclude: ['tests', '**/__tests__'],
    },
  }),
  vue(),
  nodeResolve({
    preferBuiltins: true,
    browser: true,
  }),
  cjs(),
  json(),
];

const external = ['vue', 'vue-template-compiler', '@vue/composition-api'];

const configs = targets.map((target) => createConfig(target));

if (isDev) {
  plugins.push(getReplacementPlugin());
  configs.push(createFixturesConfig());
}

function createConfig(target) {
  const packageDir = resolve(packagesDir, target);
  const packageResolve = (p) => resolve(packageDir, p);
  const pkg = require(packageResolve('package.json'));

  const output = [
    {
      file: packageResolve(pkg.module),
      format: 'es',
      sourcemap: !isDev,
    },
  ];

  external.push(
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
  );

  if (!isDev) {
    const globals = {
      vue: 'Vue',
      '@vue/composition-api': 'vueCompositionApi',
      '@marvr/storyblok-rich-text-types': 'storyblokRichTextTypes',
    };

    output.push({
      exports: 'named',
      name: pkg.buildOptions.name,
      sourcemap: true,
      file: packageResolve(pkg.main),
      format: 'umd',
      globals,
    });
  }

  return {
    input: packageResolve('src/index.ts'),
    output,
    plugins,
    external,
  };
}

function createFixturesConfig() {
  const fixturesFolder = resolve(__dirname, 'tests/fixtures');

  return {
    input: resolve(fixturesFolder, 'src/index.ts'),
    output: {
      file: resolve(fixturesFolder, 'dist/main.esm.js'),
      format: 'es',
    },
    plugins,
    onwarn: (msg, warn) => {
      if (!/Circular/.test(msg)) {
        warn(msg);
      }
    },
    external: [...external, '@marvr/vue-storyblok-rich-text-renderer'],
  };
}

function getReplacementPlugin() {
  return replace({
    'process.env.NODE_ENV': `"development"`,
    'process.env.STORYBLOK_TOKEN': `'${process.env.STORYBLOK_TOKEN}'`,
  });
}

export default configs;
