## [`v99.3.0`](https://github.com/elastic/eui/releases/v99.3.0)

- Updated table components to support adding tooltips to header cells ([#8273](https://github.com/elastic/eui/pull/8273))
  - Added `columns.nameTooltip` on `EuiBasicTable`
  - Added `tooltipProps` prop on `EuiTableHeaderCell`
- Added `accent` color option to `EuiCallOut` ([#8303](https://github.com/elastic/eui/pull/8303))
- Updated `EuiInlineEditForm`'s `onCancel` prop type to allow uncontrolled mode usage ([#8307](https://github.com/elastic/eui/pull/8307))
- Added ES|QL syntax highlighting for `EuiCode`, `EuiCodeBlock`, `EuiMarkdownFormat`, and `EuiMarkdownEditor` components. ([#8317](https://github.com/elastic/eui/pull/8317))
- Updated `EuiAccordion` to prevent content from being transitioned on initial render when `initialIsOpen=true` ([#8327](https://github.com/elastic/eui/pull/8327))

**Bug fixes**

- Fixed a bug on `EuiSuperDatePicker` where pasting an absolute date would append the date instead of replace it ([#8311](https://github.com/elastic/eui/pull/8311))

## [`v99.2.0`](https://github.com/elastic/eui/releases/v99.2.0)

- Changed `EuiFieldText` styles to prioritize `disabled` styling over `readonly`. ([#8271](https://github.com/elastic/eui/pull/8271))
- Added `plugs` and `web` glyphs to `EuiIcon` ([#8285](https://github.com/elastic/eui/pull/8285))
- Update `title` on `EuiColorPalettePickerPaletteProps` to be optional ([#8289](https://github.com/elastic/eui/pull/8289))

**Bug fixes**

- Fixed an issue with EuiDataGrid with auto row height resulting in a table of 0 height ([#8251](https://github.com/elastic/eui/pull/8251))
- Fixed `disabled` behavior of `EuiFieldText` to  prevent input changes. ([#8271](https://github.com/elastic/eui/pull/8271))

## [`v99.1.0`](https://github.com/elastic/eui/releases/v99.1.0)

- Updated `EuiColorPalettePicker` - adds `append` to `EuiColorPalettePickerPaletteProps` to support appending custom content to the title ([#8208](https://github.com/elastic/eui/pull/8208))
- Updated font-weight and font-size of `EuiBetaBadge`s to improve legibility ([#8255](https://github.com/elastic/eui/pull/8255))
- Added support for `titleColor` variant `warning` on `EuiStat` ([#8278](https://github.com/elastic/eui/pull/8278))

## [`v99.0.0`](https://github.com/elastic/eui/releases/v99.0.0)

- Added two new icons: `createGenericJob` and `createGeoJob` ([#8248](https://github.com/elastic/eui/pull/8248))
- Added new icon `section` ([#8261](https://github.com/elastic/eui/pull/8261))

**Bug fixes**

- Ensures that the `values` of `EuiI18n` used in `EuiPagination` use `key` attributes to prevent potential ["unique key" warnings](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key). ([#8243](https://github.com/elastic/eui/pull/8243))

**Breaking changes**

- Removed `EuiPopover`'s deprecated `hasDragDrop` prop. Use `usePortal` on any child `EuiDraggable` instead ([#8256](https://github.com/elastic/eui/pull/8256))

