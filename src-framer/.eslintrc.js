module.exports = {
  extends: '../.eslintrc.js',
  rules: {
    'import/no-unresolved': ['error', { ignore: [
      '^framer$',
      '^@elastic/eui/lib/',
      '^!!raw-loader!',
    ]}],
    '@typescript-eslint/no-var-requires': 'off',
  }
}
