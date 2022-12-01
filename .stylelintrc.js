module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
  rules: {
    'number-leading-zero': 'never',
    'color-hex-case': 'upper',
  },
  ignoreFiles: [
    "**/*.ts",
    "**/*.tsx",
    "**/*.js",
    "**/*.jsx",
    "**/*.md"
  ],
};
