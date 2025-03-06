## [`v100.0.0`](https://github.com/elastic/eui/releases/v100.0.0)

# eui-theme/borealis Changelog ([#8386](https://github.com/elastic/eui/pull/8386))
 ([#8386](https://github.com/elastic/eui/pull/8386))
- Added new "Borealis" theme as `@elastic/eui-theme-borealis` package ([#8030](https://github.com/elastic/eui/pull/8030)) ([#8386](https://github.com/elastic/eui/pull/8386))
- Updated the default `theme` value on `EuiProvider` to "Borealis" ([#8288](https://github.com/elastic/eui/pull/8288)) ([#8386](https://github.com/elastic/eui/pull/8386))
- Added shared theme code as `@elastic/eui-theme-common` package ([#8030](https://github.com/elastic/eui/pull/8030)) ([#8386](https://github.com/elastic/eui/pull/8386))
- Added new semantic color tokens on `euiTheme.colors` ([#8097](https://github.com/elastic/eui/pull/8097)) ([#8386](https://github.com/elastic/eui/pull/8386))
  - `textPrimary`
  - `textAccent`
  - `textAccentSecondary`
  - `textSuccess`
  - `textWarning`
  - `textDanger`
  - `textParagraph`
  - `textHeading`
  - `textSubdued`
  - `textDisabled`
  - `textInverse`
  - `backgroundBasePrimary`
  - `backgroundBaseAccent`
  - `backgroundBaseAccentSecondary`
  - `backgroundBaseSuccess`
  - `backgroundBaseWarning`
  - `backgroundBaseDanger`
  - `backgroundBaseSubdued`
  - `backgroundBasePlain`
  - `backgroundBaseDisabled`
  - `backgroundBaseHighlighted`
  - `backgroundBaseFormsPrepend`
  - `backgroundBaseFormsControlDisabled`
  - `backgroundBaseInteractiveHover`
  - `backgroundBaseInteractiveSelect`
  - `backgroundBaseInteractiveOverlay`
  - `backgroundBaseSkeletonEdge`
  - `backgroundBaseSkeletonMiddle`
  - `backgroundLightPrimary`
  - `backgroundLightAccent`
  - `backgroundLightAccentSecondary`
  - `backgroundLightSuccess`
  - `backgroundLightWarning`
  - `backgroundLightDanger`
  - `backgroundLightText`
  - `backgroundFilledPrimary`
  - `backgroundFilledAccent`
  - `backgroundFilledAccentSecondary`
  - `backgroundFilledSuccess`
  - `backgroundFilledWarning`
  - `backgroundFilledDanger`
  - `backgroundFilledText`
  - `borderBasePrimary`
  - `borderBaseAccent`
  - `borderBaseAccentSecondary`
  - `borderBaseSuccess`
  - `borderBaseWarning`
  - `borderBaseDanger`
  - `borderBasePlain`
  - `borderBaseSubdued`
  - `borderBaseDisabled`
  - `borderBaseFloating`
  - `borderBaseFormsColorSwatch`
  - `borderBaseFormsControl`
  - `borderStrongPrimary`
  - `borderStrongAccent`
  - `borderStrongAccentSecondary`
  - `borderStrongSuccess`
  - `borderStrongWarning`
  - `borderStrongDanger`
- Added deprecation for non-semantic color tokens ([#8097](https://github.com/elastic/eui/pull/8097)) ([#8386](https://github.com/elastic/eui/pull/8386))
- Added new component specific tokens on `euiTheme.components` ([#8097](https://github.com/elastic/eui/pull/8097)) ([#8386](https://github.com/elastic/eui/pull/8386))
  - added `components.buttons`, `components.forms` for shared tokens (e.g. `components.forms.maxWidth`)
- Added data vis color tokens on `euiTheme.colors.vis` ([#8112](https://github.com/elastic/eui/pull/8112)) ([#8386](https://github.com/elastic/eui/pull/8386))
  - `euiColorVis0`
  - `euiColorVis1`
  - `euiColorVis2`
  - `euiColorVis3`
  - `euiColorVis4`
  - `euiColorVis5`
  - `euiColorVis6`
  - `euiColorVis7`
  - `euiColorVis8`
  - `euiColorVis9`
  - `euiColorVisBehindText0`
  - `euiColorVisBehindText1`
  - `euiColorVisBehindText2`
  - `euiColorVisBehindText3`
  - `euiColorVisBehindText4`
  - `euiColorVisBehindText5`
  - `euiColorVisBehindText6`
  - `euiColorVisBehindText7`
  - `euiColorVisBehindText8`
  - `euiColorVisBehindText9`
  - `euiColorVisAsTextLight0`
  - `euiColorVisAsTextLight1`
  - `euiColorVisAsTextLight2`
  - `euiColorVisAsTextLight3`
  - `euiColorVisAsTextLight4`
  - `euiColorVisAsTextLight5`
  - `euiColorVisAsTextLight6`
  - `euiColorVisAsTextDark0`
  - `euiColorVisAsTextDark1`
  - `euiColorVisAsTextDark2`
  - `euiColorVisAsTextDark3`
  - `euiColorVisAsTextDark4`
  - `euiColorVisAsTextDark5`
  - `euiColorVisAsTextDark6`
  - `euiColorVisSuccess0`
  - `euiColorVisSuccess1`
  - `euiColorVisWarning0`
  - `euiColorVisDanger0`
  - `euiColorVisDanger1`
  - `euiColorVisNeutral0`
  - `euiColorVisGrey0`
  - `euiColorVisGrey1`
  - `euiColorVisGrey2`
  - `euiColorVisGrey3`
  - `euiColorVisWarm0`
  - `euiColorVisWarm1`
  - `euiColorVisWarm2`
  - `euiColorVisCool0`
  - `euiColorVisCool1`
  - `euiColorVisCool2`
  - `euiColorVisComplementary0`
  - `euiColorVisComplementary1`
- Added severity colors to `euiTheme.colors.vis` ([#8247](https://github.com/elastic/eui/pull/8247)) ([#8386](https://github.com/elastic/eui/pull/8386))
  - `euiColorSeverity0`
  - `euiColorSeverity1`
  - `euiColorSeverity2`
  - `euiColorSeverity3`
  - `euiColorSeverity4`
  - `euiColorSeverity5`
  - `euiColorSeverity6`
  - `euiColorSeverity7`
  - `euiColorSeverity8`
  - `euiColorSeverity9`
  - `euiColorSeverity10`
  - `euiColorSeverity11`
  - `euiColorSeverity12`
  - `euiColorSeverity13`
  - `euiColorSeverity14`
- Updated color palette functions to support multiple themes by retrieving colors from the new `EuiVisColorStore` ([#8112](https://github.com/elastic/eui/pull/8112)) ([#8386](https://github.com/elastic/eui/pull/8386))
- Added new semantic tokens to SCSS variables ([#8097](https://github.com/elastic/eui/pull/8097)) ([#8386](https://github.com/elastic/eui/pull/8386))
- Added new semantic tokens to static JSON exports ([#8115](https://github.com/elastic/eui/pull/8115)) ([#8386](https://github.com/elastic/eui/pull/8386))
- Updated mixin functions `euiBackgroundColor`, `euiBorderColor`, `euiButtonColor`, `euiButtonFilledColor` and `euiButtonEmptyColor` to return tokens ([#8097](https://github.com/elastic/eui/pull/8097)) ([#8386](https://github.com/elastic/eui/pull/8386))
- Updated usages of `transparentize`, `shade` and `tint` with tokens ([#8097](https://github.com/elastic/eui/pull/8097)) ([#8386](https://github.com/elastic/eui/pull/8386))
- Added hooks for color palette functions ([#8284](https://github.com/elastic/eui/pull/8284)) ([#8386](https://github.com/elastic/eui/pull/8386))
  - `useEuiPaletteColorBlind`
  - `useEuiPaletteColorBlindBehindText`
  - `useEuiPaletteForStatus`
  - `useEuiPaletteForTemperature`
  - `useEuiPaletteComplementary`
  - `useEuiPaletteRed`
  - `useEuiPaletteGreen`
  - `useEuiPaletteCool`
  - `useEuiPaletteWarm`
  - `useEuiPaletteGray`
- Updated `EuiPopover`, `EuiToolTip`, `EuiTour` and `EuiRange` with shared popover arrow styles ([#8212](https://github.com/elastic/eui/)pull/8212) ([#8386](https://github.com/elastic/eui/pull/8386))
- Updated border styles on `EuiPanel` to use pseudo element borders ([#8270](https://github.com/elastic/eui/pull/8270)) ([#8386](https://github.com/elastic/eui/pull/8386))

**Bug fixes**

- Fixed `EuiComboBox` by cleaning duplicated values when having a delimiter prop. ([#8335](https://github.com/elastic/eui/pull/8335))

**Breaking changes**

- Renamed `eui_theme_light.json` and `eui_theme_dark.json` to `eui_theme_amsterdam_light.json` and `eui_theme_amsterdam_dark.json` ([#8115](https://github.com/elastic/eui/pull/8115)) ([#8386](https://github.com/elastic/eui/pull/8386))
- Removed `isDefaultTheme` ([#8288](https://github.com/elastic/eui/pull/8288)) ([#8386](https://github.com/elastic/eui/pull/8386))

**Accessibility**

- Updated colors of `EuiToken` to increase contrast ([#8250](https://github.com/elastic/eui/pull/8250)) ([#8386](https://github.com/elastic/eui/pull/8386))
- Added background to hovered `EuiKeypadMenuItem` to increase visibility ([#8294](https://github.com/elastic/eui/pull/8294)) ([#8386](https://github.com/elastic/eui/pull/8386))

## [`v99.4.0`](https://github.com/elastic/eui/releases/v99.4.0)

- Minor design updates to `EuiCollapsibleNavBeta` ([#8332](https://github.com/elastic/eui/pull/8332))
  - Allow section without a title
  - Second-level icons should be horizontally aligned with the top-level icon
  - Turn off text truncation for nav items
- Added `quickSelectButtonProps` to `EuiSuperDatePicker` ([#8380](https://github.com/elastic/eui/pull/8380))

**Bug fixes**

- Fixed a bug in `EuiHeader` where the navigation of `EuiCollapsibleNavBeta` would render below the `EuiFlyout`'s overlay ([#8325](https://github.com/elastic/eui/pull/8325))

**Accessibility**

- Improved the accessibility of `EuiComboBox` by adding `aria-setsize` and `aria-posinset` to ensure correct information is provided for its virtualized listbox ([#8333](https://github.com/elastic/eui/pull/8333))
- Improved the `EuiAccordionTrigger`'s screen reader UX by passed `aria-hidden` to the `EuiAccordionArrow` to avoid duplicated announcements by screen readers. ([#8342](https://github.com/elastic/eui/pull/8342))

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

