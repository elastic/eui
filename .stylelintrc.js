const camelCaseRegex = '^[a-z][\\w-]*$'; // Note: also allows `_` as part of BEM naming

// TODO: Remove Sass-specific config & rules once we're completely off Sass
module.exports = {
  extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier-scss'],
  // @see https://stylelint.io/user-guide/rules
  // @see https://github.com/stylelint-scss/stylelint-scss#list-of-rules
  rules: {
    // Enforce camelCase naming
    'selector-class-pattern': camelCaseRegex,
    'keyframes-name-pattern': camelCaseRegex,
    'scss/dollar-variable-pattern': camelCaseRegex,
    'scss/at-mixin-pattern': camelCaseRegex,
    'scss/at-function-pattern': camelCaseRegex,
    // TODO: This rule can be removed entirely (already lower by default) once we're fully off Sass
    'function-name-case': [
      'lower',
      {
        ignoreFunctions: [`/${camelCaseRegex}/`, 'MIN'],
      },
    ],

    // Opinionated rules
    'declaration-no-important': true,
    'max-nesting-depth': [
      2,
      {
        ignore: ['blockless-at-rules', 'pseudo-classes'],
      },
    ],
    'block-no-empty': true,
    'selector-no-qualifying-type': [
      true,
      {
        ignore: ['attribute'], // Allows input[type=search]
      },
    ],

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
    // Put a line-break between sections of CSS, but allow quick one-liners for legibility
    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
    // Ensure multiple selectors on one line each
    'selector-list-comma-newline-before': 'never-multi-line',
    'selector-list-comma-newline-after': 'always',
    // Trim unnecessary newlines/whitespace
    'block-closing-brace-empty-line-before': 'never',
    'declaration-empty-line-before': null,
    'max-empty-lines': 1,
    'no-eol-whitespace': true,
    // Enforce spacing around various syntax symbols (colons, operators, etc.)
    'declaration-colon-space-after': 'always-single-line',
    'declaration-colon-space-before': 'never',
    'function-calc-no-unspaced-operator': true,
    'scss/operator-no-unspaced': true,
    'selector-combinator-space-before': 'always',
    'selector-combinator-space-after': 'always',
    // Ensure trailing semicolons are always present on non-oneliners
    'declaration-block-semicolon-newline-after': 'always-multi-line',

    // Value preferences
    'number-max-precision': null,
    'color-hex-case': 'upper',
    // Attempt to catch/flag non-variable color values
    'color-named': 'never',
    'color-no-hex': true,
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

    // TODO: It may be worth investigating and updating these rules to their more modern counterparts
    'selector-not-notation': 'simple',
    'color-function-notation': 'legacy',
    'alpha-value-notation': 'number',

    // Disable various opinionated extended stylelint rules that EUI has not previously enforced
    'no-descending-specificity': null,
    'keyframe-selector-notation': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'scss/no-global-function-names': null,
    'scss/dollar-variable-empty-line-before': null,
    'scss/at-rule-conditional-no-parentheses': null,
    'scss/double-slash-comment-empty-line-before': null,
    'scss/at-if-no-null': null,
  },
  ignoreFiles: [
    'generator-eui/**/*.scss',
    'src/global_styling/react_date_picker/**/*.scss',
    'src/themes/amsterdam/global_styling/react_date_picker/**/*.scss',
    'src/components/date_picker/react-datepicker/**/*.scss',
  ],
};
