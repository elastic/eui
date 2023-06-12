const camelCaseRegex = '^[a-z][\\w-]*$'; // Note: also allows `_` as part of BEM naming

module.exports = {
  // @see https://stylelint.io/user-guide/rules
  rules: {
    // Enforce camelCase naming
    'selector-class-pattern': camelCaseRegex,
    'keyframes-name-pattern': camelCaseRegex,

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

    // Non-Prettier newline rules
    // Put a line-break between sections of CSS, but allow quick one-liners for legibility
    'rule-empty-line-before': [
      'always-multi-line',
      {
        except: ['first-nested'],
        ignore: ['after-comment'],
      },
    ],
    'comment-empty-line-before': null,
    'declaration-empty-line-before': null,

    // Value preferences
    'number-max-precision': null,
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
    'color-function-notation': 'legacy',
    'alpha-value-notation': 'number',

    // Disable various opinionated extended stylelint rules that EUI has not previously enforced
    'no-descending-specificity': null,
    'keyframe-selector-notation': null,
    'declaration-block-no-redundant-longhand-properties': null,
  },
  overrides: [
    {
      // TODO: Remove Sass-specific config & rules once we're completely off Sass
      files: ['**/*.scss'],
      ignoreFiles: [
        'generator-eui/**/*.scss',
        'src/global_styling/react_date_picker/**/*.scss',
        'src/themes/amsterdam/global_styling/react_date_picker/**/*.scss',
        'src/components/date_picker/react-datepicker/**/*.scss',
      ],
      extends: [
        'stylelint-config-standard-scss',
        'stylelint-config-prettier-scss',
      ],
      // @see https://github.com/stylelint-scss/stylelint-scss#list-of-rules
      rules: {
        // Casing
        'scss/dollar-variable-pattern': camelCaseRegex,
        'scss/at-mixin-pattern': camelCaseRegex,
        'scss/at-function-pattern': camelCaseRegex,
        'function-name-case': [
          'lower',
          {
            ignoreFunctions: [`/${camelCaseRegex}/`, 'MIN'],
          },
        ],

        // Whitespace/newlines
        'scss/at-if-closing-brace-space-after': 'always-intermediate',
        'scss/operator-no-unspaced': true,

        // Formatting rules deprecated as of v15 - keep them in Sass styles just in case until end of migration
        // @see https://github.com/stylelint/stylelint/blob/main/docs/user-guide/rules.md#deprecated
        'color-hex-case': 'upper',
        'string-quotes': 'single',
        // 2 spaces for indentation
        indentation: [2, { indentInsideParens: 'once-at-root-twice-in-block' }],
        // Mimic 1tbs `} else {` brace style, like our JS
        'block-opening-brace-space-before': 'always',
        'block-closing-brace-newline-before': 'always-multi-line',
        // Ensure multiple selectors on one line each
        'selector-list-comma-newline-before': 'never-multi-line',
        'selector-list-comma-newline-after': 'always',
        // Trim unnecessary newlines/whitespace
        'block-closing-brace-empty-line-before': 'never',
        'max-empty-lines': 1,
        'no-eol-whitespace': true,
        // Enforce spacing around various syntax symbols (colons, operators, etc.)
        'declaration-colon-space-after': 'always-single-line',
        'declaration-colon-space-before': 'never',
        'function-calc-no-unspaced-operator': true,
        'selector-combinator-space-before': 'always',
        'selector-combinator-space-after': 'always',
        // Ensure trailing semicolons are always present on non-oneliners
        'declaration-block-semicolon-newline-after': 'always-multi-line',

        // Disable various opinionated extended stylelint rules that EUI has not previously enforced
        'scss/no-global-function-names': null,
        'scss/dollar-variable-empty-line-before': null,
        'scss/at-rule-conditional-no-parentheses': null,
        'scss/double-slash-comment-empty-line-before': null,
        'scss/at-if-no-null': null,
      },
    },
  ],
};
