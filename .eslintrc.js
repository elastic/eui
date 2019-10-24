module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    "import/resolver": {
       node: {
        extensions: [".ts", ".tsx", ".js", ".json"]
      },
      webpack: {
        config: "./src-docs/webpack.config.js"
      }
    },
    react: {
      version: "detect"
    }
  },
  extends: [
    "@elastic/eslint-config-kibana",
    "plugin:@typescript-eslint/recommended",
    // Prettier options need to come last, in order to override other style
    // rules.
    "prettier/react",
    "prettier/standard",
    "plugin:prettier/recommended"
  ],
  plugins: [
    "jsx-a11y",
    "prettier",
    "local",
    "react-hooks"
  ],
  rules: {
    "prefer-template": "error",
    "local/i18n": "error",
    "no-use-before-define": "off",
    "quotes": ["warn", "single", "avoid-escape"],

    "jsx-a11y/accessible-emoji": "error",
    "jsx-a11y/alt-text": "error",
    "jsx-a11y/anchor-has-content": "error",
    "jsx-a11y/aria-activedescendant-has-tabindex": "error",
    "jsx-a11y/aria-props": "error",
    "jsx-a11y/aria-proptypes": "error",
    "jsx-a11y/aria-role": "error",
    "jsx-a11y/aria-unsupported-elements": "error",
    "jsx-a11y/heading-has-content": "error",
    "jsx-a11y/html-has-lang": "error",
    "jsx-a11y/iframe-has-title": "error",
    "jsx-a11y/interactive-supports-focus": "error",
    "jsx-a11y/media-has-caption": "error",
    "jsx-a11y/mouse-events-have-key-events": "error",
    "jsx-a11y/no-access-key": "error",
    "jsx-a11y/no-distracting-elements": "error",
    "jsx-a11y/no-interactive-element-to-noninteractive-role": "error",
    "jsx-a11y/no-noninteractive-element-interactions": "error",
    "jsx-a11y/no-noninteractive-element-to-interactive-role": "error",
    "jsx-a11y/no-redundant-roles": "error",
    "jsx-a11y/role-has-required-aria-props": "error",
    "jsx-a11y/role-supports-aria-props": "error",
    "jsx-a11y/scope": "error",
    "jsx-a11y/tabindex-no-positive": "error",
    "jsx-a11y/label-has-associated-control": "error",

    // "react-hooks/rules-of-hooks": "error",
    // "react-hooks/exhaustive-deps": "warn",

    "@typescript-eslint/array-type": ["error", "array-simple"],
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/class-name-casing": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-parameter-properties": "off",
    "@typescript-eslint/no-triple-slash-reference": "off",
    "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_", "ignoreRestSiblings": true }],
    "@typescript-eslint/no-use-before-define": "off",
  },
  env: {
    jest: true
  }
};
