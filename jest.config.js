module.exports = {
  preset: 'ts-jest',
  globals: {
    'vue-jest': {
      babelConfig: false,
    },
  },
  moduleFileExtensions: ['js', 'ts', 'json', 'vue'],
  moduleNameMapper: {
    '^@marvr/(.*?)$': '<rootDir>/packages/$1/src',
  },
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
    '!packages/storyblok-rich-text-types/src/**',
  ],
  watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
  rootDir: __dirname,
  testPathIgnorePatterns: ['/node_modules/'],
};
