## [`v2.11.0`](https://github.com/elastic/eui/releases/v2.11.0)

- Updated `no-unnamed-interactive-element` to include checking `EuiColorPicker` ([#9436](https://github.com/elastic/eui/pull/9436))

## [`v2.10.0`](https://github.com/elastic/eui/releases/v2.10.0)

- Added `EuiPopover` and `EuiWrappingPopover` checks to `require-aria-label-for-modals`, requiring either `aria-label` or `aria-labelledby` for these popover components. ([#9427](https://github.com/elastic/eui/pull/9427))
- Updated `require-aria-label-for-modals` to skip ARIA validation when the component has spread attributes (for example, `<EuiModal {...props} />`). ([#9427](https://github.com/elastic/eui/pull/9427))

## [`v2.9.0`](https://github.com/elastic/eui/releases/v2.9.0)

-  Prevented `badge-accessibility-rules` rule autofix from duplicating `aria-hidden` attributes. ([#9366](https://github.com/elastic/eui/pull/9366))
-  Skip `badge-accessibility-rules` rule validation when a spread operator is used in a component. ([#9366](https://github.com/elastic/eui/pull/9366))

## [`v2.8.0`](https://github.com/elastic/eui/releases/v2.8.0)

- Added new `icon-accessibility-rules` rule. ([#9357](https://github.com/elastic/eui/pull/9357))
- Added new `badge-accessibility-rules` rule. ([#9354](https://github.com/elastic/eui/pull/9354))

## [`v2.7.0`](https://github.com/elastic/eui/releases/v2.7.0)

- Added `no-static-z-index` rule ([#9236](https://github.com/elastic/eui/pull/9236))

