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
    // Mimic 1tbs `} else {` brace style, like our JS
    'block-opening-brace-space-before': 'always',
    'block-closing-brace-newline-before': 'always-multi-line',
    'scss/at-if-closing-brace-space-after': 'always-intermediate',

    // Value preferences
    'number-leading-zero': 'never',
    'number-max-precision': null,
    'color-hex-case': 'upper',
    // Prefer lowercase values, except for font names and currentColor
    'value-keyword-case': [
      'lower',
      {
        ignoreProperties: ['font-family', '/^\\$eui[\\w]+/'], // Allow fonts and Sass variables
        ignoreKeywords: ['currentColor'],
      },
    ],
    'declaration-block-no-duplicate-properties': [
      true,
      {
        ignore: ['consecutive-duplicates'], // We occasionally use duplicate property values for cross-browser fallbacks
      },
    ],
  },
  ignoreFiles: [
    'generator-eui/**/*.scss',
    'src/global_styling/react_date_picker/**/*.scss',
    'src/themes/amsterdam/global_styling/react_date_picker/**/*.scss',
    'src/components/date_picker/react-datepicker/**/*.scss',
  ],
};
