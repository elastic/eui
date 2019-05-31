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
    "prettier",
    "local"
  ],
  rules: {
    "prefer-template": "error",
    "local/i18n": "error",
    "no-use-before-define": "off",
    "quotes": ["warn", "single", "avoid-escape"],

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
