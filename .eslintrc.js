module.exports = {
  settings: {
    "import/resolver": {
       node: {
        extensions: [".js"]
      },
      webpack: {
        config: "./src-docs/webpack.config.js"
      }
    }
  },
  extends: [
    "@elastic/eslint-config-kibana",
    // Prettier options need to come last, in order to override other style
    // rules.
    "prettier/react",
    "prettier/standard",
    //"plugin:jsx-a11y/recommended",
    "plugin:prettier/recommended"
  ],
  plugins: [
    "prettier",
    "jsx-a11y",
    "local"
  ],
  rules: {
      "prefer-template": "error",
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
      "local/i18n": "error"
  },
  env: {
    jest: true
  }
};
