## [`v2.3.0`](https://github.com/elastic/eui/releases/v2.3.0)

- Added `EuiFlyoutResizable` to `require-aria-label-for-modals` check ([#8946](https://github.com/elastic/eui/pull/8946))
- Added new `no-unnamed-radio-group` rule. ([#8929](https://github.com/elastic/eui/pull/8929))
- Fixed attributes comparison issue in the `consistent-is-invalid-props` rule. ([#8920](https://github.com/elastic/eui/pull/8920))

## [`v2.2.1`](https://github.com/elastic/eui/releases/v2.2.1)

**Bug fixes**

- Removed `no-css_color` entry which mapped to a duplicate `no-css-color` rule ([#8888](https://github.com/elastic/eui/pull/8888))

## [`v2.2.0`](https://github.com/elastic/eui/releases/v2.2.0)

- Added new `prefer-eui-icon-tip` rule. ([#8877](https://github.com/elastic/eui/pull/8877))

## [`v2.1.0`](https://github.com/elastic/eui/releases/v2.1.0)

- Added new `sr-output-disabled-tooltip` rule. ([#8848](https://github.com/elastic/eui/pull/8848))
- Added new `consistent-is-invalid-props` rule. ([#8843](https://github.com/elastic/eui/pull/8843))
- Added new `require-aria-label-for-modals` rule. ([#8811](https://github.com/elastic/eui/pull/8811))

## [`v2.0.0`](https://github.com/elastic/eui/releases/v2.0.0)

**Breaking changes**

- Remove `prefer-css-prop-for-static-styles` rule because it produces too many warnings. Static code analysis cannot flag dynamic styles with confidence because it doesn't run the code to asses runtime values. We will explore runtime solutions. ([#8760](https://github.com/elastic/eui/pull/8760))

## [`v1.0.0`](https://github.com/elastic/eui/releases/v1.0.0)

- Changed the `prefer-css-prop-for-static-styles` rule message (formerly `prefer-css-attribute-for-eui-components`) ([#8722](https://github.com/elastic/eui/pull/8722))

**Breaking changes**

- Renamed the rule from `prefer-css-attribute-for-eui-components` to `prefer-css-prop-for-static-styles` to align with Emotion's best practice guidelines ([#8722](https://github.com/elastic/eui/pull/8722))

**Dependency updates**

- Updated `typescript` to v5.8.3 ([#8669](https://github.com/elastic/eui/pull/8669))
- Updated `@typescript-eslint/eslint-plugin` to v8.31.1 ([#8669](https://github.com/elastic/eui/pull/8669))
- Updated `@typescript-eslint/parser` to v8.31.1 ([#8669](https://github.com/elastic/eui/pull/8669))
- Updated `@typescript-eslint/rule-tester` to v8.31.1 ([#8669](https://github.com/elastic/eui/pull/8669))
- Updated `@typescript-eslint/typescript-estree` to v8.31.1 ([#8669](https://github.com/elastic/eui/pull/8669))
- Updated `@typescript-eslint/utils` to v8.31.1 ([#8669](https://github.com/elastic/eui/pull/8669))

## [`v0.2.0`](https://github.com/elastic/eui/releases/v0.2.0)

- Updated the `no-restricted-eui-imports` warning to clarify that JSON tokens remain supported for server-side or non-React use cases ([#8613](https://github.com/elastic/eui/pull/8613))

## [`v0.1.1`](https://github.com/elastic/eui/releases/v0.1.1)

**Bug fixes**

- Fix `no-css-color` rule breaking at accessing the node `init` property ([#8524](https://github.com/elastic/eui/pull/8524))

## [`v0.1.0`](https://github.com/elastic/eui/releases/v0.1.0)

- Added `no-restricted-eui-imports`, `no-css-color` and `prefer-css-attribute-for-eui-components` rules ([#8304](https://github.com/elastic/eui/pull/8304))
- Added TypeScript and ESM support ([#8304](https://github.com/elastic/eui/pull/8304))

