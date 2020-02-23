module.exports = {
  root: true,
  env: {
    node: true
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'standard'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    '@typescript-eslint/no-unused-vars': ['warn', {'args': 'none'}],
    '@typescript-eslint/no-use-before-define': ['error', { 'functions': false }]
  }
}
