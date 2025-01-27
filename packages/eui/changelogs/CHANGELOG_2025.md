## [`v99.1.0`](https://github.com/elastic/eui/releases/v99.1.0)

- Updated `EuiColorPalettePicker` - adds `append` to `EuiColorPalettePickerPaletteProps` to support appending custom content to the title ([#8208](https://github.com/elastic/eui/pull/8208))
- Updated font-weight and font-size of `EuiBetaBadge`s to improve legibility ([#8255](https://github.com/elastic/eui/pull/8255))
- Added suppport for `titleColor` variant `warning` on `EuiStat` ([#8278](https://github.com/elastic/eui/pull/8278))

## [`v99.0.0`](https://github.com/elastic/eui/releases/v99.0.0)

- Added two new icons: `createGenericJob` and `createGeoJob` ([#8248](https://github.com/elastic/eui/pull/8248))
- Added new icon `section` ([#8261](https://github.com/elastic/eui/pull/8261))

**Bug fixes**

- Ensures that the `values` of `EuiI18n` used in `EuiPagination` use `key` attributes to prevent potential ["unique key" warnings](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key). ([#8243](https://github.com/elastic/eui/pull/8243))

**Breaking changes**

- Removed `EuiPopover`'s deprecated `hasDragDrop` prop. Use `usePortal` on any child `EuiDraggable` instead ([#8256](https://github.com/elastic/eui/pull/8256))

