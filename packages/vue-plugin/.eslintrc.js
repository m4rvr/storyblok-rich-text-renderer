module.exports = {
  extends: [
    '../../.eslintrc.js',
    'plugin:vue/essential',
    '@vue/standard',
    '@vue/typescript/recommended'
  ],
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      env: {
        jest: true
      }
    }
  ]
}
