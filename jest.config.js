module.exports = {
  globals: {
    'vue-jest': {
      babelConfig: false,
    },
  },
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  transform: {
    '.*\\.(vue)$': 'vue-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['<rootDir>/packages/**/__tests__/**/*.spec.[jt]s?(x)'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: [
    'packages/*/src/**/*.(ts|vue)',
    '!packages/rich-text-types/src/**',
  ],
  watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
  rootDir: __dirname,
};
