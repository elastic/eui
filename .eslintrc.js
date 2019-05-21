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
    "plugin:prettier/recommended"
  ],
  plugins: [
    "prettier",
    "local"
  ],
  rules: {
    "prefer-template": "error",
    "local/i18n": "error"
  },
  env: {
    jest: true
  }
};
