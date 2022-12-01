const camelCaseRegex = '^[a-z][\\w-]*$'; // Note: also allows `_` as part of BEM naming

module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
  rules: {
    // Enforce camelCase naming
    'selector-class-pattern': camelCaseRegex,
    'keyframes-name-pattern': camelCaseRegex,
    'scss/dollar-variable-pattern': camelCaseRegex,
    'scss/at-mixin-pattern': camelCaseRegex,
    'scss/at-function-pattern': camelCaseRegex,

    // 2 spaces for indentation
    indentation: [
      2,
      {
        indentInsideParens: 'once-at-root-twice-in-block',
      },
    ],
    'string-quotes': 'single',
    'number-leading-zero': 'never',
    'color-hex-case': 'upper',
  },
  ignoreFiles: [
    'generator-eui/**/*.scss',
    'src/global_styling/react_date_picker/**/*.scss',
    'src/themes/amsterdam/global_styling/react_date_picker/**/*.scss',
    'src/components/date_picker/react-datepicker/**/*.scss',
  ],
};
