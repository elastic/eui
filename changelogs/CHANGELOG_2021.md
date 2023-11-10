## [`v43.1.1`](https://github.com/elastic/eui/releases/tag/v43.1.1)

**Bug fixes**

- Fixed `EuiDataGrid`'s cell popover overlapping with modals and flyouts ([#5461](https://github.com/elastic/eui/pull/5461))
- Fixed an accessibility issue where `EuiDatePicker` time options did not have unique IDs ([#5466](https://github.com/elastic/eui/pull/5466))
- Fixed global and reset styles when using the legacy theme ([#5473](https://github.com/elastic/eui/pull/5473))
- Fixed `EuiSuperDatePicker` not passing `isDisabled` to `EuiAutoRefresh` ([#5472](https://github.com/elastic/eui/pull/5472))

## [`v43.1.0`](https://github.com/elastic/eui/releases/tag/v43.1.0)

- Added `magnifyWithExclamation` icon ([#5455](https://github.com/elastic/eui/pull/5455))

**Bug fixes**

- Reinstated `EuiCode` and `EuiCodeBlock` `testenv` mocking ([#5464](https://github.com/elastic/eui/pull/5464))

## [`v43.0.0`](https://github.com/elastic/eui/releases/tag/v43.0.0)

- Updated the organization of `EuiDataGrid`'s toolbar/grid controls ([#5334](https://github.com/elastic/eui/pull/5334))
- Updated `EuiDataGrid`'s full screen mode to use the `fullScreenExit` icon ([#5415](https://github.com/elastic/eui/pull/5415))
- Added `left.append` and `left.prepend` to `EuiDataGrid`'s `toolbarVisibility.additionalControls` prop [#5394](https://github.com/elastic/eui/pull/5394))
- Added a row height control to `EuiDataGrid`'s toolbar ([#5372](https://github.com/elastic/eui/pull/5372))
- Added `onChange` callbacks to `EuiDataGrid`'s `gridStyle` and `rowHeightOptions` settings ([#5424](https://github.com/elastic/eui/pull/5424))
- Added a reset button to `EuiDataGrid`'s display controls ([#5428](https://github.com/elastic/eui/pull/5428))
- Added `timeRefresh` icon ([#5383](https://github.com/elastic/eui/pull/5383))
- Added `responsive` and `iconOnly` props to `EuiSuperUpdateButton`  ([#5383](https://github.com/elastic/eui/pull/5383))
- Added better auto refresh indicator to `EuiSuperDatePicker` ([#5383](https://github.com/elastic/eui/pull/5383))
- Added `compressed`, `width`, `isQuickSelectOnly` props to `EuiSuperDatePicker` ([#5383](https://github.com/elastic/eui/pull/5383))
- Updated `showUpdateButton` prop with `iconOnly` option in `EuiSuperDatePicker` ([#5383](https://github.com/elastic/eui/pull/5383))
- Increased default `refreshInterval` of `EuiSuperDatePicker` to `1000` ([#5383](https://github.com/elastic/eui/pull/5383))
- Remove `Show dates` button from pretty format of `EuiSuperDatePicker` in favor of directly opening `start` date popover ([#5383](https://github.com/elastic/eui/pull/5383))
- Added `shortHand` option to `prettyInterval` ([#5383](https://github.com/elastic/eui/pull/5383))
- Moved `rounding` switch to popover footer in relative tab of `EuiSuperDatePicker` ([#5383](https://github.com/elastic/eui/pull/5383))
- Simplified `EuiRefreshInterval` to use a switch to start/stop and other visual touch ups ([#5383](https://github.com/elastic/eui/pull/5383))
- Created stand alone `EuiAutoRefresh` and `EuiAutoRefreshButton` components ([#5383](https://github.com/elastic/eui/pull/5383))

**Bug fixes**

- Fixed persistent `EuiDataGrid` full screen `<body>` class ([#5354](https://github.com/elastic/eui/pull/5354))
- Fixed dark mode background color of `EuiFormControlLayout` `prepend` and `append` ([#5383](https://github.com/elastic/eui/pull/5383))
- Fixed background color of `EuiFormControlLayout` when `readOnly` ([#5383](https://github.com/elastic/eui/pull/5383))
- Fixed the name of `data-test-subj` prop of `EuiFormControlLayout` ([#5383](https://github.com/elastic/eui/pull/5383))
- Fixed global reset styles for plain `<button>`s ([#5452](https://github.com/elastic/eui/pull/5452))

**Breaking changes**

- Removed `toolbarVisibility`'s `showStyleSelector` prop of `EuiDataGrid` in favor of `showDisplaySelector`, which allows configuration of both grid density and row height ([#5372](https://github.com/elastic/eui/pull/5372))
- Changed prop name `applyRefreshInterval` to `onRefreshChange` in `EuiRefreshInterval` ([#5383](https://github.com/elastic/eui/pull/5383))
- Increased the size of `s`-sized `EuiLoadingSpinner`s to match `s`-sized `EuiIcon`s ([#5440](https://github.com/elastic/eui/pull/5440))

## [`v42.1.0`](https://github.com/elastic/eui/releases/tag/v42.1.0)

- Added first and last page arrow buttons to `EuiPagination` when `compressed=true` ([#5362](https://github.com/elastic/eui/pull/5362))
- Added support for indeterminate `EuiPagination` when `pageCount=0` ([#5362](https://github.com/elastic/eui/pull/5362))
- Moved mobile behavior to a customizable `responsive` prop to `EuiPagination` that renders the `compressed` display ([#5362](https://github.com/elastic/eui/pull/5362))
- Added `doubleArrowLeft`, `doubleArrowRight`, `arrowStart`, `arrowEnd` icons ([#5362](https://github.com/elastic/eui/pull/5362))

**Bug fixes**

- Fixed scrollbars in `EuiRange` tick labels in Safari ([#5427](https://github.com/elastic/eui/pull/5427))
- Fixed an `EuiOverlayMask` bug where it calls window.document on server side([#5422](https://github.com/elastic/eui/pull/5422))
- Fixed unremoved event listener memory leak in `EuiPopover` ([#5437](https://github.com/elastic/eui/pull/5437))
- Fixed `EuiDatePicker` not correctly handling the `onBlur` callback ([#5441](https://github.com/elastic/eui/pull/5441))
- Fixed `EuiToolTip` not correctly handling child `onBlur` and `onFocus` callbacks ([#5441](https://github.com/elastic/eui/pull/5441))

## [`v42.0.0`](https://github.com/elastic/eui/releases/tag/v42.0.0)

### Feature: CSS-in-JS ([#5121](https://github.com/elastic/eui/pull/5121))

- Added reset and global styles via CSS-in-JS with `@emotion/react/Global`
- Added `EuiProvider`, a React context provider for theming and global styles
- Added `isDefaultTheme` and `isLegacyTheme` utilities

**Breaking changes**

- Added `@emotion/react` to `peerDependencies`
- Amsterdam is now the default theme, deprecated and renamed old theme as "legacy"
- Re-organized Sass files including where the `globals` are imported from

## [`v41.4.0`](https://github.com/elastic/eui/releases/tag/v41.4.0)

- Added `payment` glyph to `EuiIcon` ([#5414](https://github.com/elastic/eui/pull/5414))
- Updated `EuiCodeBlock`'s full screen mode to use the `fullScreenExit` icon ([#5421](https://github.com/elastic/eui/pull/5421))

**Bug fixes**

- Fixed an `EuiCodeBlock` bug where empty code blocks could be copyable ([#5421](https://github.com/elastic/eui/pull/5421))
- Fixed an accessibility issue in `EuiAvatar` by adding a meaningful role ([#5423](https://github.com/elastic/eui/pull/5423))

## [`v41.3.0`](https://github.com/elastic/eui/releases/tag/v41.3.0)

- Updated color of `EuiHorizontalRule` when rendered inside `EuiToolTip` ([#5378](https://github.com/elastic/eui/pull/5378))

**Bug fixes**

- Fixed an `EuiDataGrid` bug where paginated overflowing data grids could become unscrollable when `rowCount` changed ([#5400](https://github.com/elastic/eui/pull/5400))
- Fixed `EuiCode` line-wrapping ([#5379](https://github.com/elastic/eui/pull/5379))
- Fixed `EuiCodeBlock` not passing `data-test-subj` or `aria-label` to virtualized & full-screen code blocks ([#5379](https://github.com/elastic/eui/pull/5379))
- Fixed `EuiCodeBlock` not closing full-screen mode when the Escape key is pressed ([#5379](https://github.com/elastic/eui/pull/5379))
- Fixed virtualized `EuiCodeBlock`s blanking out when entering & exiting full-screen mode ([#5379](https://github.com/elastic/eui/pull/5379))
- Fixed `EuiCodeBlock`'s full-screen mode to use a large font and padding size & added several missing wrapper classes ([#5379](https://github.com/elastic/eui/pull/5379))
- Fixed `EuiCodeBlock` broken line wrapping when using virtualization ([#5379](https://github.com/elastic/eui/pull/5379))
- Fixed type exports to not include test mocks & specs ([#5412](https://github.com/elastic/eui/pull/5412))

**Theme: Amsterdam**

- Fixed `EuiCodeBlock` not properly increasing large font sizes on Amsterdam ([#5379](https://github.com/elastic/eui/pull/5379))

## [`v41.2.3`](https://github.com/elastic/eui/releases/tag/v41.2.3)

**Note: this release is a backport containing changes originally made in `42.1.0`**

**Bug fixes**

- Fixed `EuiDatePicker` not correctly handling the `onBlur` callback ([#5441](https://github.com/elastic/eui/pull/5441))
- Fixed `EuiToolTip` not correctly handling child `onBlur` and `onFocus` callbacks ([#5441](https://github.com/elastic/eui/pull/5441))

## [`v41.2.2`](https://github.com/elastic/eui/releases/tag/v41.2.2)

**Bug fixes**

- Fixed type exports to not include test mocks & specs ([#5412](https://github.com/elastic/eui/pull/5412))

**Note: this release is a backport containing changes originally made in `41.3.0`**

## [`v41.2.1`](https://github.com/elastic/eui/releases/tag/v41.2.1)

**Bug fixes**

- Refactored definition of `isNamedColor` function so it isn't mocked away by the testenv configuration ([#5397](https://github.com/elastic/eui/pull/5397))

**Note: this release is a backport containing changes originally made in `14.6.0` and `14.7.0`**

## [`v41.2.0`](https://github.com/elastic/eui/releases/tag/v41.2.0)

- Added `aria-label` and `aria-labelledby` props to `EuiComboBox` ([#5360](https://github.com/elastic/eui/issues/5360))
- Updated `EuiDatePicker` to use `EuiPopover`, `EuiFocusTrap`, and `EuiScreenReaderOnly` ([#5339](https://github.com/elastic/eui/pull/5339))

**Bug fixes**

- Fixed an `EuiDataGrid` row height bug for grids that set a default `lineCount` and also used `rowHeights` to set row-specific `lineCount`s ([#5376](https://github.com/elastic/eui/pull/5376))
- Fixed `EuiComboBox` from allowing keyboard actions when `isDisabled` ([#5373](https://github.com/elastic/eui/pull/5373))
- Fixed an accessibility issue where `EuiSuperSelect` was not creating accessible labels for its listbox ([#5364](https://github.com/elastic/eui/pull/5364))
- Fixed an accessibility issue where `EuiColorPalettePicker` was not creating an accessible label for its button ([#5364](https://github.com/elastic/eui/pull/5364))
- Fixed `EuiDatePicker` being constrained to its parent container by using React portal ([#5339](https://github.com/elastic/eui/pull/5339))

## [`v41.1.0`](https://github.com/elastic/eui/releases/tag/v41.1.0)

- Added `layout` and `footer` props to `EuiEmptyPrompt` ([#5275](https://github.com/elastic/eui/pull/5275))
- Updated `EuiEmptyPrompt` to extend `EuiPanelProps` ([#5275](https://github.com/elastic/eui/pull/5275))
- Add `data-icon-type` to `EuiIcon` `<svg>` for easier debugging of `iconType` [#5366](https://github.com/elastic/eui/pull/5366))

**Bug fixes**

- Fixed an `EuiDataGrid` race condition where grid rows had incorrect heights if loaded in before CSS ([#5284](https://github.com/elastic/eui/pull/5284))
- Fixed an accessibility issue where `EuiDataGrid` cells weren't owned by `role=row` elements ([#5285](https://github.com/elastic/eui/pull/5285))
- Fixed `EuiErrorBoundary` overflow scrolling by wrapping contents in `EuiCodeBlock` ([#5359](https://github.com/elastic/eui/pull/5359))
- Fixed `analyzeEvent` icon to be horizontally centered [#5365](https://github.com/elastic/eui/pull/5365))

## [`v41.0.0`](https://github.com/elastic/eui/releases/tag/v41.0.0)

- Added `EuiAutoSizer` component for setting dimensions on virtualized lists ([#5278](https://github.com/elastic/eui/pull/5278))
- Added `testenv` mock for `EuiAutoSizer` ([#5278](https://github.com/elastic/eui/pull/5278))
- Changed render of `useEuiTextDiff` to a `span` instead of `div` ([#5323](https://github.com/elastic/eui/pull/5323))
- Changed change prop type of `children` for `EuiMark` from `string` to `ReactNode` ([#5323](https://github.com/elastic/eui/pull/5323))
- Added `render` prop to `EuiI18n` ([#5236](https://github.com/elastic/eui/pull/5236))

**Bug fixes**

- Fixed styling of `align: center` for mobile version of `EuiTableRowCell` ([#5323](https://github.com/elastic/eui/pull/5323))
- Fixed `endDateControl` `className` in `EuiDatePickerRange` ([#5329](https://github.com/elastic/eui/pull/5329))
- Fixed `EuiMarkdownEditor` intercepting all drop events on the page ([#5340](https://github.com/elastic/eui/pull/5340))

**Breaking changes**

- Removed `EuiCodeEditor` ([#5323](https://github.com/elastic/eui/pull/5323))
- Removed `betaBadgeLabel`, `betaBadgeTooltipContent`, `betaBadgeTitle` props from `EuiCard` ([#5323](https://github.com/elastic/eui/pull/5323))
- Removed `EuiLoadingKibana` ([#5323](https://github.com/elastic/eui/pull/5323))
- Removed `secondary` color prop options ([#5323](https://github.com/elastic/eui/pull/5323))
- Removed `subdued` color prop option from `EuiButtonIcon` ([#5323](https://github.com/elastic/eui/pull/5323))
- Removed `panelPaddingSize` from `EuiPageContent` ([#5323](https://github.com/elastic/eui/pull/5323))
- Removed `makeId` ([#5323](https://github.com/elastic/eui/pull/5323))
- Removed mobile-only props from `EuiTableRowCell` ([#5323](https://github.com/elastic/eui/pull/5323))
- Removed Sass vars `$euiColorSecondary` and `$euiColorSecondaryText` ([#5345](https://github.com/elastic/eui/pull/5345))

## [`v40.1.1`](https://github.com/elastic/eui/releases/tag/v40.1.0)

**Note: this release is a backport containing changes originally made after `42.0.0`**

**Bug fixes**

- Fixed unremoved event listener memory leak in `EuiPopover` ([#5437](https://github.com/elastic/eui/pull/5437))

## [`v40.1.0`](https://github.com/elastic/eui/releases/tag/v40.1.0)

- Added styling support for `valign` prop on `EuiTableRowCell` ([#5283](https://github.com/elastic/eui/pull/5283))
- Added `remark-breaks` plugin to mimic GitHub-flavored markdown line breaks within `EuiMarkdownEditor` ([#5272](https://github.com/elastic/eui/pull/5272))
- Removed `EuiErrorBoundary` from `EuiDatePicker` when unsupported props are used ([#5318](https://github.com/elastic/eui/pull/5318))

**Bug fixes**

- Fixed default text alignment in `EuiTableRowCell` on Safari ([#5283](https://github.com/elastic/eui/pull/5283))
- Fixed `mobileOptions.truncateText` from getting overridden by `truncateText` in `EuiTableRowCell` ([#5283](https://github.com/elastic/eui/pull/5283))
- Fixed issue with dynamic row counts in `EuiDataGrid` ([#5313](https://github.com/elastic/eui/pull/5313))
- Fixed `EuiDataGrid` to dynamically update row heights when set to `auto` ([#5281](https://github.com/elastic/eui/pull/5281))

**Theme: Amsterdam**

- Fixed `mobileOptions.enlarge` styling in `EuiTableRowCell` ([#5283](https://github.com/elastic/eui/pull/5283))
- Fixed `EuiDataGrid`'s expanded density not increasing font size on Amsterdam ([#5320](https://github.com/elastic/eui/pull/5320))

## [`v40.0.0`](https://github.com/elastic/eui/releases/tag/v40.0.0)

- Updated `tokenKeyword` to match the definition of keyword field type ([#5251](https://github.com/elastic/eui/pull/5251))
- Added `element`, `buttonElement`, and `arrowProps` props to further customize `EuiAccordion` ([#5258](https://github.com/elastic/eui/pull/5258))

**Bug fixes**

- Fixed missing `id` for `EuiCombobox` by generating one if `prepend` or `append` exists ([#5229](https://github.com/elastic/eui/pull/5229))

**Breaking changes**

- Renamed `tokenKeyword` icon to `tokenTag` in `EuiToken` ([#5251](https://github.com/elastic/eui/pull/5251))

## [`v39.1.4`](https://github.com/elastic/eui/releases/tag/v39.1.4)

**Note: this release is a backport containing changes originally made in `44.0.0`**

**Deprecations**

- Deprecated `PartitionConfig` in favor of inclusion in Charts `theme.partition` ([#5492](https://github.com/elastic/eui/pull/5492)).

## [`v39.1.3`](https://github.com/elastic/eui/releases/tag/v39.1.2)

**Note: this release is a backport containing changes originally made after `42.0.0`**

**Bug fixes**

- Fixed unremoved event listener memory leak in `EuiPopover` ([#5437](https://github.com/elastic/eui/pull/5437))

## [`v39.1.2`](https://github.com/elastic/eui/releases/tag/v39.1.2)

**Note: this release is a backport containing changes originally made in `40.1.0`**

**Bug fixes**

- Fixed `EuiDataGrid` to dynamically update row heights when set to `auto` ([#5281](https://github.com/elastic/eui/pull/5281))

## [`v39.1.1`](https://github.com/elastic/eui/releases/tag/v39.1.1)

**Bug fixes**

- Fixed `EuiSuperDatePicker` from crashing due to invalid time input ([#5263](https://github.com/elastic/eui/pull/5263))
- Fixed content in `EuiFilterButton` again when `numFilters` is undefined ([#5268](https://github.com/elastic/eui/pull/5268))

## [`v39.1.0`](https://github.com/elastic/eui/releases/tag/v39.1.0)

- Added support for `ghost` and `text` `EuiIcon` colors on Elastic logos ([#5245](https://github.com/elastic/eui/pull/5245))
- Added a default `data-test-subj` to `EuiErrorBoundary` ([#5232](https://github.com/elastic/eui/pull/5232))

**Bug fixes**

- Fixed content in `EuiPopover` from being inaccessible during the opening animation ([#5249](https://github.com/elastic/eui/pull/5249))
- Fixed multiple accessibility issues in `EuiBasicTable` and `EuiInMemoryTable` ([#5241](https://github.com/elastic/eui/pull/5241))

## [`v39.0.0`](https://github.com/elastic/eui/releases/tag/v39.0.0)

- Added `maxWidth` prop to `EuiTour`, made `subtitle` optional, and fixed heading levels and footer background ([#5225](https://github.com/elastic/eui/pull/5225))
- Updated `tint`, `shade`, `saturate`, `desaturate`, and `makeHighContrastColor` utility functions to maintain color format supplied ([#5230](https://github.com/elastic/eui/pull/5230))
- Converted generated icon files to Typescript, eliminating the last `.js` files in our source files ([#5212](https://github.com/elastic/eui/pull/5212))

**Bug fixes**

- Fixed tick and level alignment in `Eui[Dual]Range` ([#5181](https://github.com/elastic/eui/pull/5181))
- Fixed duplicate IDs on mobile/desktop select all checkboxes in EuiBasicTable ([#5237](https://github.com/elastic/eui/pull/5237))
- Fixed missing i18n token in `EuiBasicTable`'s no items message ([#5242](https://github.com/elastic/eui/pull/5242))

**Breaking changes**

- Removed `boolean` from `EuiTour`'s `minWidth` type ([#5225](https://github.com/elastic/eui/pull/5225))

## [`v38.2.0`](https://github.com/elastic/eui/releases/tag/v38.2.0)

- Updated `EuiRangeLevel` `color` property to accept CSS color values ([#5171](https://github.com/elastic/eui/pull/5171))
- Added optional visual line highlighting to `EuiCodeBlock` ([#5207](https://github.com/elastic/eui/pull/5207))
- Added `popoverProps` to `EuiSuperSelect` and deprecated `popoverClassName` & `repositionOnScroll` ([#5214](https://github.com/elastic/eui/pull/5214))
- Added `lineHeight` configuration to `rowHeightsOptions` in `EuiDataGrid` ([#5221](https://github.com/elastic/eui/pull/5221))

**Bug fixes**

- Fixed logo icons with static SVG IDs causing accessibility errors when multiples of the same logo were present ([#5204](https://github.com/elastic/eui/pull/5204))
- Fixed several `EuiDataGrid` console errors that occur on column drag/drop reorder ([#5209](https://github.com/elastic/eui/pull/5209))

**Reverts**

- Reverted `EuiScreenReaderOnly` left positioning change due to Selenium issues ([#5215](https://github.com/elastic/eui/pull/5215))

## [`v38.1.0`](https://github.com/elastic/eui/releases/tag/v38.1.0)

- Fixed the `title` prop `EuiButtonGroup` to automatically display the `label` provided ([#5199](https://github.com/elastic/eui/pull/5199))
- Updated `barSeriesStyle.displayValue` of the elastic-charts `Theme` for better default styles ([#4845](https://github.com/elastic/eui/pull/4845))
- Added a configuration parameter to the `EuiMarkdownEditor` plugin functions to exclude custom plugins ([#5147](https://github.com/elastic/eui/pull/5147))
- Added `auto` as value for `defaultHeight` in prop `rowHeightsOptions` in `EuiDataGrid` that allows to content auto-fit to row ([#4958](https://github.com/elastic/eui/pull/4958))
- Updated `titleProps` and `descriptionProps` on `EuiDescriptionList` to extend `CommonProps` ([#5166](https://github.com/elastic/eui/pull/5166))
- Added the ability to return `visibleOptions` from `EuiSelectable` by using `onSearch` ([#5178](https://github.com/elastic/eui/pull/5178))

**Bug fixes**

- Fixed `EuiDataGrid` focus ring to be contained in the cell ([#5194](https://github.com/elastic/eui/pull/5194))
- Fixed `EuiDataGrid` cells when focused getting a higher `z-index` which was causing long content to overlap surrounding cells ([#5194](https://github.com/elastic/eui/pull/5194))
- Replaced the `EuiMarkdownEditor` help syntax modal with a popover when no custom plugins are available ([#5147](https://github.com/elastic/eui/pull/5147))
- Fixed multiple components unnecessarily rerendering generated IDs on every update ([#5195](https://github.com/elastic/eui/pull/5195), [#5196](https://github.com/elastic/eui/pull/5196), [#5197](https://github.com/elastic/eui/pull/5197), [#5200](https://github.com/elastic/eui/pull/#5200), [#5201](https://github.com/elastic/eui/pull/#5201))

**Theme: Amsterdam**

- Fixed `border-radius` and increased `font-weight` for `EuiButtonGroup` ([#4993](https://github.com/elastic/eui/pull/4993))
- Increased contrast of text `color` for `text` colored `EuiButton` and `EuiButtonIcon` ([#5177](https://github.com/elastic/eui/pull/5177))

## [`v38.0.1`](https://github.com/elastic/eui/releases/tag/v38.0.1)

- Reverted `EuiScreenReaderOnly` left positioning change due to Selenium issues ([#5215](https://github.com/elastic/eui/pull/5215))

## [`v38.0.0`](https://github.com/elastic/eui/releases/tag/v38.0.0)

- Added optional line numbers to `EuiCodeBlock` ([#4993](https://github.com/elastic/eui/pull/4993))
- Removed `emoticon` support and removed rendered `<div>` from `EuiMarkdownFormat` ([#5176](https://github.com/elastic/eui/pull/5176))
- Moved `EuiCheckbox` and `EuiRadio` inputs to always float inline on top of the faux inputs ([#5152](https://github.com/elastic/eui/pull/5152))

**Bug fixes**

- Fixed `EuiDataGrid` stripes not alternating as expected on sort/pagination ([#5070](https://github.com/elastic/eui/pull/5070))

**Breaking changes**

- Upgraded TypeScript version to ~4.1.3 ([#5182](https://github.com/elastic/eui/pull/5182))
- Added `clip` property to `EuiScreenReaderOnly`, to fix positioning issues within scrolling containers ([#5152](https://github.com/elastic/eui/pull/5152))

## [`v37.7.0`](https://github.com/elastic/eui/releases/tag/v37.7.0)

- Added `placeholder` prop to `EuiMarkdownEditor` ([#5151](https://github.com/elastic/eui/pull/5151))
- Added `.eui-textNumber` utility class to apply `tnum` font-feature setting ([#5078](https://github.com/elastic/eui/pull/5078))
- Changed `EuiPageHeader`'s tab implementation to use size `xl` when only content ([#5135](https://github.com/elastic/eui/pull/5135))
- Added `pageTitleProps` prop to `EuiPageHeader` to pass through props to the `EuiTitle` ([#5135](https://github.com/elastic/eui/pull/5135))
- Added screen-reader only `<h1>` to `EuiPageHeader` when tabs exist without a `pageTitle` ([#5135](https://github.com/elastic/eui/pull/5135))
- Added `bottomBorder` prop and `xl` `size` to `EuiTabs` ([#5135](https://github.com/elastic/eui/pull/5135))
- Added `prepend` and `append` props to `EuiTab` ([#5135](https://github.com/elastic/eui/pull/5135))
- Refactored styles of `EuiTabs` ([#5135](https://github.com/elastic/eui/pull/5135))
- Removed Sass variables for `EuiTabs` font size (`$euiTabFontSize, $euiTabFontSizeS, $euiTabFontSizeL`) ([#5135](https://github.com/elastic/eui/pull/5135))
- Extended all `EuiTabProps` for each `EuiTabbedContentTab` ([#5135](https://github.com/elastic/eui/pull/5135))
- Changed `EuiPopover`'s `repositionOnScroll` function to prevent popover and input elements from separating on scroll when nested in `EuiFlyout` ([#5155](https://github.com/elastic/eui/pull/5155))
- Added the `repositionOnScroll` prop to `EuiSuperSelect` ([#5155](https://github.com/elastic/eui/pull/5155))
- Added `useGeneratedHtmlId` utility, which memoizes the randomly generated ID on mount and prevents regenerated IDs on component rerender ([#5133](https://github.com/elastic/eui/pull/5133))
- Fixed `z-index` styles that were causing parts of `EuiResizableContainer` to overlap `EuiHeader` ([#5164](https://github.com/elastic/eui/pull/5164))

**Bug fixes**

- Fixed [de]optimization bug in `EuiDataGrid` when cells are removed from the DOM via virtualization ([#5163](https://github.com/elastic/eui/pull/5163))

**Theme: Amsterdam**

- Deprecated `display` prop of `EuiTabs` in favor of unified styles and `bottomBorder` ([#5135](https://github.com/elastic/eui/pull/5135))

## [`v37.6.2`](https://github.com/elastic/eui/releases/tag/v37.6.2)

**Reverts**

- Reverted `EuiScreenReaderOnly` clip property ([#5150](https://github.com/elastic/eui/pull/5150))

## [`v37.6.1`](https://github.com/elastic/eui/releases/tag/v37.6.1)

**Bug fixes**

- **[REVERTED in 37.6.2]** Fixed `EuiScreenReaderOnly` positioning issues within scrolling containers ([#5130](https://github.com/elastic/eui/pull/5130))
- Fixed `EuiDataGrid` cell actions not unmounting from the DOM after mouse interaction ([#5120](https://github.com/elastic/eui/pull/5120))
- Optimized `EuiDataGrid` cell interactions' performance  ([#5136](https://github.com/elastic/eui/pull/5136))

## [`v37.6.0`](https://github.com/elastic/eui/releases/tag/v37.6.0)

- Updated `EuiSuperDatePicker` to pass a `data-test-subj` prop ([#5085](https://github.com/elastic/eui/pull/5085))
- Added `euiTextBreakWord()` mixin to the `euiTitle()` mixin to ensure all titles break long words ([#5107](https://github.com/elastic/eui/pull/5107))
- Added `euiTextBreakWord()` to `EuiFormLabels` ([#5107](https://github.com/elastic/eui/pull/5107))

**Bug fixes**

- Fixed `EuiSuperSelect`'s focus keyboard behavior when no initial value is passed, and focus label behavior ([#5097](https://github.com/elastic/eui/pull/5097))
- Fixed `EuiSelectable` sometimes requiring two clicks to change selection ([#5117](https://github.com/elastic/eui/pull/5117))

## [`v37.5.0`](https://github.com/elastic/eui/releases/tag/v37.5.0)

### Feature: CSS-in-JS ([#4511](https://github.com/elastic/eui/pull/4511))

- Added `EuiThemeProvider`, a React context provider for theme values and color mode selection
- Added `useEuiTheme` React hook, and `withEuiTheme` React HOC for consuming the EuiTheme
- Added global `EuiTheme` tokens for `colors`, `size`, `font`, `border`, `animation`, and `breakpoint`
- Added color services for `makeHighContrastColor`, `makeDisabledContrastColor`, `shade`, `tint`, `transparentize`, `saturate`, `desaturate`, `lightness`

## [`v37.4.0`](https://github.com/elastic/eui/releases/tag/v37.4.0)

- Updated `EuiToolTip` to remain showing tooltip while child element is in focus ([#5066](https://github.com/elastic/eui/pull/5066))
- Removed `children` from TypeScript definition in `EuiIconTip` ([#5066](https://github.com/elastic/eui/pull/5066))
- Removed `children` as a possible prop on `EuiTreeView` ([#5053](https://github.com/elastic/eui/pull/5053))
- Updated `elastic-charts` theme with better text colors, font stack and `goal` styles ([#5077](https://github.com/elastic/eui/pull/5077))

**Bug fixes**

- Fixed location of default value of `EuiToolTip`'s `display` prop ([#5066](https://github.com/elastic/eui/pull/5066))
- Fixed instance of  `EuiScreenReader` text being exposed in `EuiDataGrid` sorting menu ([#5084](https://github.com/elastic/eui/pull/5084))
- Fixed default value of `EuiPagination`'s `activePage` to target first page ([#5053](https://github.com/elastic/eui/pull/5053))
- Fixed screen reader text from displaying in some `EuiDataGrid` cell popovers ([#5087](https://github.com/elastic/eui/pull/5087))
- Fixed `EuiDatePicker` year dropdown when configured with `minDate` and/or `maxDate` ([#5069](https://github.com/elastic/eui/pull/5069))
- Fixed `EuiDatePicker`'s clear icon overlaying date text ([#5095](https://github.com/elastic/eui/pull/5095))

**Theme: Amsterdam**

- Reduced `EuiNotificationBadge` border-radius to `small` ([#5053](https://github.com/elastic/eui/pull/5053))
- Fixed hover and focus states of `EuiFacet` to match established pattern ([#5053](https://github.com/elastic/eui/pull/5053))

## [`v37.3.1`](https://github.com/elastic/eui/releases/tag/v37.3.1)

**Bug fixes**

- Fixed bug in `EuiDataGrid` where a custom `className` was also being passed to the full screen button ([#5050](https://github.com/elastic/eui/pull/5050))
- Fixed rerender state issues in `PaginationButton` inside `EuiPagination` ([#5048](https://github.com/elastic/eui/pull/5048))
- Fixed bug in `euiHeaderAffordForFixed` mixin that was not accounting for situations where `EuiDataGrid` was in full screen mode ([#5054](https://github.com/elastic/eui/pull/5054))
- Fixed `z-index` styles that were causing `EuiModal` and `EuiFlyout` components to appear behind `EuiDataGrid` when in full screen mode ([#5054](https://github.com/elastic/eui/pull/5054))
- Fixed untranslated i18n strings for `EuiFilterButton` - adds 2 new tokens and removes old `euiFilterButton.filterBadge` token ([#4750](https://github.com/elastic/eui/pull/5061))
- Fixed missing i18n token `EuiFilePicker`'s default prompt, and improved i18n string for `euiFilePicker.filesSelected` ([#5063](https://github.com/elastic/eui/pull/5063))
- Fixed `EuiDataGrid` sort button text pluralization ([#5043](https://github.com/elastic/eui/pull/5043))
- Fixed styles of `EuiButtonIcon` when passing `disabled` prop ([#5060](https://github.com/elastic/eui/pull/5060))
- Fixed `EuiDataGrid` not clearing cell styles when column position changes ([#5068](https://github.com/elastic/eui/issues/5068))

**Theme: Amsterdam**

- Updated styles for `EuiDatePicker` ([#5000](https://github.com/elastic/eui/pull/5000))
- Fixed styles for `EuiSuperDatePicker` ([#5060](https://github.com/elastic/eui/pull/5060))
- Fixed styles for `compressed` + `prepend/append` + `readOnly` input backgrounds ([#5073](https://github.com/elastic/eui/pull/5073))

## [`v37.3.0`](https://github.com/elastic/eui/releases/tag/v37.3.0)

- Updated `copyClipboard` glyph in `EuiIcon` to be centered ([#5023](https://github.com/elastic/eui/pull/5023))
- Updated `EuiFilePicker` `removeFiles` method to enable programmatic selection clearing  ([#5017](https://github.com/elastic/eui/pull/5017))
- Updated `EuiFlyout` testenv mock to pass-through `onKeyDown` prop ([#5029](https://github.com/elastic/eui/pull/5029))
- Enabled `EuiCodeBlock` copy button  in `EuiMarkdownFormat` ([#5032](https://github.com/elastic/eui/pull/5032))
- Changed `copy` icon to `copyClipboard` in `EuiCodeBlock` ([#5018](https://github.com/elastic/eui/pull/5018))
- Finished type conversion of source components to Typescript ([#5044](https://github.com/elastic/eui/pull/5044))

**Bug fixes**

- Fixed content in `EuiFilterButton` when `numFilters` is not passed ([#5012](https://github.com/elastic/eui/pull/5012))
- Fixed default value of `outsideClickCloses` prop of `EuiFlyout` ([#5027](https://github.com/elastic/eui/pull/5027))
- Fixed `EuiSelectable`'s double click bug ([#5021](https://github.com/elastic/eui/pull/5021))
- Fixed overflowing controls when `EuiCodeBlock` is short in height ([#5018](https://github.com/elastic/eui/pull/5018))
- Fixed `EuiButtonGroup` firing `onChange` twice ([#5033](https://github.com/elastic/eui/pull/5033))

## [`v37.2.0`](https://github.com/elastic/eui/releases/tag/v37.2.0)

- Added `isDisabled` prop to `EuiFormLabel` and passed it down from `EuiFormRow` ([#5009](https://github.com/elastic/eui/pull/#5009))

**Bug fixes**

- Fixed usage of `outsideClickCloses` prop of `EuiFlyout` ([#4986](https://github.com/elastic/eui/pull/4986))
- Fixed `EuiFormRow` ignoring `isDisabled` prop on the child element. ([#5022](https://github.com/elastic/eui/pull/5022))

## [`v37.1.4`](https://github.com/elastic/eui/releases/tag/v37.1.4)

**Note: this release is a backport containing changes originally made in `37.7.0`**

**Bug fixes**

- Fixed [de]optimization bug in `EuiDataGrid` when cells are removed from the DOM via virtualization ([#5163](https://github.com/elastic/eui/pull/5163))

## [`v37.1.3`](https://github.com/elastic/eui/releases/tag/v37.1.3)

**Note: this release is a backport containing changes originally made in `37.4.0` and `37.6.1`**

**Bug fixes**

- Fixed instance of  `EuiScreenReader` text being exposed in `EuiDataGrid` sorting menu ([#5084](https://github.com/elastic/eui/pull/5084))
- Fixed screen reader text from displaying in some `EuiDataGrid` cell popovers ([#5087](https://github.com/elastic/eui/pull/5087))
- Fixed `EuiDataGrid` cell actions not unmounting from the DOM after mouse interaction ([#5120](https://github.com/elastic/eui/pull/5120))
- Optimized `EuiDataGrid` cell interactions' performance  ([#5136](https://github.com/elastic/eui/pull/5136))

## [`v37.1.2`](https://github.com/elastic/eui/releases/tag/v37.1.2)

**Note: this release is a backport containing changes originally made in `37.3.0` and `37.3.1`**

**Bug fixes**

- Fixed `EuiSelectable`'s double click bug ([#5021](https://github.com/elastic/eui/pull/5021))
- Fixed bug in `euiHeaderAffordForFixed` mixin that was not accounting for situations where `EuiDataGrid` was in full screen mode ([#5054](https://github.com/elastic/eui/pull/5054))
- Fixed `z-index` styles that were causing `EuiModal` and `EuiFlyout` components to appear behind `EuiDataGrid` when in full screen mode ([#5054](https://github.com/elastic/eui/pull/5054))

## [`v37.1.1`](https://github.com/elastic/eui/releases/tag/v37.1.1)

**Note: this release is a backport containing changes originally made in `37.2.0`**

**Bug fixes**

- Fixed `EuiFormRow` ignoring `isDisabled` prop on the child element. ([#5022](https://github.com/elastic/eui/pull/5022))

## [`v37.1.0`](https://github.com/elastic/eui/releases/tag/v37.1.0)

- Added `isDisabled` prop to `EuiFormRow` that disables the child field element ([#4908](https://github.com/elastic/eui/pull/4908

## [`v37.0.0`](https://github.com/elastic/eui/releases/tag/v37.0.0)

- Added `fleetApp` and `agentApp` icons ([#4989](https://github.com/elastic/eui/pull/4989))
- Added i18n tokens for `EuiSuperDatePicker` button `title` ([#4998](https://github.com/elastic/eui/pull/4998))

**Bug fixes**

- Fixed incorrect date formatting on `EuiSuperDatePicker` button `title` ([#4998](https://github.com/elastic/eui/pull/4998))

**Breaking changes**

- Removed `EuiKeyboardAccessible` ([#4991](https://github.com/elastic/eui/pull/4991))

## [`v36.1.0`](https://github.com/elastic/eui/releases/tag/v36.1.0)

- Fixed color of `html` scrollbar in dark mode ([#4969](https://github.com/elastic/eui/pull/4969))
- Updated `EuiMarkdownFormat` to use `EuiHorizontalRule` and better render tables, code blocks and blockquotes ([#4663](https://github.com/elastic/eui/pull/4663))
- Updated the `EuiMarkdownFormat` to use  `EuiText` as a wrapper to handle all the CSS styling ([#4663](https://github.com/elastic/eui/pull/4663))
- Updated `EuiText`s `color` prop to accept `inherit` and custom colors. Updated the `size` prop to accept `relative` ([#4663](https://github.com/elastic/eui/pull/4663))
- Updated `EuiText`s `blockquote` font-size/line-height to match the base font-size/line-height which is the same as paragraphs ([#4663](https://github.com/elastic/eui/pull/4663))
- Added `markdownFormatProps` prop to `EuiMarkdownEditor` to extend the props passed to the rendered `EuiMarkdownFormat` ([#4663](https://github.com/elastic/eui/pull/4663))
- Added optional virtualized line rendering to `EuiCodeBlock` ([#4952](https://github.com/elastic/eui/pull/4952))
- Added `current` as a `status` of `EuiHorizontalStep` ([#4911](https://github.com/elastic/eui/pull/4911))
- Improved accessibility of `EuiBreadcrumbs` ([#4763](https://github.com/elastic/eui/pull/4763))
- Exported `onChange` type for `EuiSearchBar` ([#4968](https://github.com/elastic/eui/pull/4968))
- Added `warnOnce` service ([#4984](https://github.com/elastic/eui/pull/4984))
- Added a console warning for the deprecation of `EuiCodeEditor` ([#4984](https://github.com/elastic/eui/pull/4984))

**Bug fixes**

- Fixed filter count of 0 in `EuiSearchBar` ([#4977](https://github.com/elastic/eui/pull/4977))
- Fixed edge case where `EuiDataGrid` cells could create an infinite loop of focus changes ([#4983](https://github.com/elastic/eui/pull/4983))

**Theme: Amsterdam**

- Updated styles for `EuiLink` ([#4979](https://github.com/elastic/eui/pull/4979))

## [`v36.0.0`](https://github.com/elastic/eui/releases/tag/v36.0.0)

- Refactored `EuiFlyout` types ([#4940](https://github.com/elastic/eui/pull/4940))
- Updated `pause` icon ([#4947](https://github.com/elastic/eui/pull/4947))
- Changed multi-line `EuiDataGrid` cells to `break-word` instead of `break-all` ([#4955](https://github.com/elastic/eui/pull/4955))
- Refactored `MarkdownEditor` plugins into separate files ([#4970](https://github.com/elastic/eui/pull/4970))
- Added `checkable` options to `EuiKeyPadMenu` and `EuiKeyPadMenuItem` ([#4950](https://github.com/elastic/eui/pull/4950))

**Bug fixes**

- Fixed render-blocking error when `EuiCodeBlock` is configured with an unsupported language ([#4943](https://github.com/elastic/eui/pull/4943))
- Fixed initial alignment of `EuiDataGrid` cells and the expand button on multi-line cells ([#4955](https://github.com/elastic/eui/pull/4955))
- Fixed pass-through of `iconSize` prop on `EuiButtonEmpty` ([#4965](https://github.com/elastic/eui/pull/4965))
- Fixed (reduced) size of spinner on small `isLoading` buttons ([#4965](https://github.com/elastic/eui/pull/4965))
- Fixed click event subscription bug in `EuiOverlayMask` ([#4967](https://github.com/elastic/eui/pull/4967))
- Fixed background-color in `EuiCard.selectable`'s button ([#4954](https://github.com/elastic/eui/pull/4954))

**Theme: Amsterdam**

- Fixed border-radius in `EuiCard.selectable`'s button ([#4954](https://github.com/elastic/eui/pull/4954))
- Updated styles for `EuiKeyPadMenuItem` ([#4950](https://github.com/elastic/eui/pull/4950))

**Breaking changes**

- Changed `EuiButtonEmpty` `size` of `l` to `m` to match other buttons ([#4965](https://github.com/elastic/eui/pull/4965))

## [`v35.1.0`](https://github.com/elastic/eui/releases/tag/v35.1.0)

- Improved keyboard and screen reader experience for `EuiColorPicker` ([#4886](https://github.com/elastic/eui/pull/4886))
- Changed `EuiImage` to use `ImgHTMLAttributes` type ([#4865](https://github.com/elastic/eui/pull/4865))

**Bug fixes**

- Fixed focus bug in `EuiColorPicker` which allowed user to break out of focus lock ([#4886](https://github.com/elastic/eui/pull/4886))

## [`v35.0.0`](https://github.com/elastic/eui/releases/tag/v35.0.0)

**Breaking changes**

- Changed EUI license from Apache v2 to dual-licensed Elastic v2 and Server Side Public License, v 1 ([#4930](https://github.com/elastic/eui/pull/4930))

## [`v34.6.0`](https://github.com/elastic/eui/releases/tag/v34.6.0)

- Updated `EuiContextMenuPanelDescriptor`'s `title` prop type from `string` to `ReactNode` ([#4933](https://github.com/elastic/eui/pull/4933))
- Added `EuiTokensObject` type definition to allow enforcing i18n token coverage in consuming applications ([#4927](https://github.com/elastic/eui/issues/4927))
- Added `rowHeightsOptions` to `EuiDataGrid` to allow configuring row heights ([#4853](https://github.com/elastic/eui/pull/4853))


## [`v34.5.3`](https://github.com/elastic/eui/releases/tag/v34.5.3)

**Note: this release is a backport containing changes originally made in `37.3.0`**

**Bug fixes**

- Fixed `EuiSelectable`'s double click bug ([#5021](https://github.com/elastic/eui/pull/5021))

## [`v34.5.2`](https://github.com/elastic/eui/releases/tag/v34.5.2)

**Bug fixes**

- Fixed incorrect active filter count badge when `EuiSearchBar` is initialized with a query value ([#4928](https://github.com/elastic/eui/issues/4928))
- Fixed a render-blocking error in `EuiCodeBlock` when certain HTML tags are childless ([#4929](https://github.com/elastic/eui/issues/4929))

## [`v34.5.1`](https://github.com/elastic/eui/releases/tag/v34.5.1)

**Bug fixes**

- Fixed bug in `EuiColorStops` where the outline was flashing when clicking or adding stops in Safari ([#4900](https://github.com/elastic/eui/issues/4900))
- Fixed `showIcons` prop in `EuiSelectableListItem` ([#4920](https://github.com/elastic/eui/pull/4920))
- Changed `mobileBreakpoints` prop to optional `EuiSideNav` ([#4921](https://github.com/elastic/eui/pull/4921))

## [`v34.5.0`](https://github.com/elastic/eui/releases/tag/v34.5.0)

- Added `success` as `color` option to `EuiBadge`, `EuiTextColor`, `EuiText`, `EuiStat`, and `EuiExpression` ([#4888](https://github.com/elastic/eui/pull/4888))
- Changed default `color` props from `secondary` to `success` where necessary ([#4888](https://github.com/elastic/eui/pull/4888))
- Added display of number of selected options in `EuiSearchBar` filters when `numActiveFilters` exists ([#4748](https://github.com/elastic/eui/pull/4748))
- Reverted `z-index: 1` on `EuiPageBody` ([#4892](https://github.com/elastic/eui/pull/4892))
- Added `updateButtonProps` to `EuiSuperDatePicker` to provide more control over the update/refresh button ([#4895](https://github.com/elastic/eui/pull/4895))
- Updated `EuiNotificationEvent` to render an icon instead of a button if `onRead` is undefined ([#4881](https://github.com/elastic/eui/pull/4881))
- Added `DraggableProvidedDragHandleProps` interface from 'react-beautiful-dnd' ([#4903](https://github.com/elastic/eui/pull/4903))
- Added `success` and `accent` `color` options to `EuiButton` ([#4874](https://github.com/elastic/eui/pull/4874))
- Added `success` `color` option to `EuiLink` ([#4874](https://github.com/elastic/eui/pull/4874))

**Bug fixes**

- Fixed `EuiRange` container expansion due to negative margin value ([#4815](https://github.com/elastic/eui/pull/4815))
- Fixed `EuiRange` ticks position to better align with thumbs ([#4815](https://github.com/elastic/eui/pull/4815))
- Fixed `EuiComboBox` disabled pills and text contrast ([#4901](https://github.com/elastic/eui/issues/4901))
- Fixed `EuiDataGrid` footer and header rows jumps in Firefox ([#4869](https://github.com/elastic/eui/issues/4869))
- Fixed shaded colors of `EuiButtonIcon` ([#4874](https://github.com/elastic/eui/pull/4874))
- Fixed `pageHeader` display in `EuiPageTemplate` when template is `empty` or `default` ([#4905](https://github.com/elastic/eui/pull/4905))
- Fixed `EuiPageHeader` bottom padding when `borderBottom = true` ([#4905](https://github.com/elastic/eui/pull/4905))
- Fixed incomplete `height` and `width` information in `EuiResizeObserver` ([#4909](https://github.com/elastic/eui/pull/4909))

**Theme: Amsterdam**

- Updated styles for `EuiRange` ([#4815](https://github.com/elastic/eui/pull/4815)
- Fixed more unique focus states using `outline` ([#4876](https://github.com/elastic/eui/pull/4876))
- Fixed `border-radius` value of `EuiPanel` ([#4876](https://github.com/elastic/eui/pull/4876))
- Fixed `disabled` background color of `EuiCard` for better visibility on subdued backgrounds ([#4876](https://github.com/elastic/eui/pull/4876))

## [`v34.4.0`](https://github.com/elastic/eui/releases/tag/v34.4.0)

- Added draggable highlight area to `EuiDualRange` ([#4776](https://github.com/elastic/eui/pull/4776))

**Bug fixes**

- Fixed auto scrolling on update in `EuiComboBox` ([#4879](https://github.com/elastic/eui/pull/4879))

## [`v34.3.0`](https://github.com/elastic/eui/releases/tag/v34.3.0)

- Added `testenv` mock for `EuiFlyout` ([#4858](https://github.com/elastic/eui/pull/4858))
- Added `mobile` glyph to `EuiIcon` ([#4827](https://github.com/elastic/eui/pull/4827))
- Reduced display of arrow icon in `EuiSideNav` to only if the item is **not** linked but has children ([#4827](https://github.com/elastic/eui/pull/4827))
- Increased size and prominence of mobile toggle in `EuiSideNav` ([#4827](https://github.com/elastic/eui/pull/4827))
- Added `heading`, `headingProps`, and `mobileBreakpoints` props for better accessibility to `EuiSideNav` ([#4827](https://github.com/elastic/eui/pull/4827))

**Bug fixes**

- Fixed mobile menus styles on `EuiDataGrid` ([#4844](https://github.com/elastic/eui/pull/4844))

**Theme: Amsterdam**

- Decreased spacing and root element size of `EuiSideNav` ([#4827](https://github.com/elastic/eui/pull/4827))

## [`v34.2.0`](https://github.com/elastic/eui/releases/tag/v34.2.0)

- Removed `text-transform: capitalize` from the `EuiTourSteps` title to better fit with Elastic title guidelines ([#4839](https://github.com/elastic/eui/pull/4839))
- Added `color` and `size` props and added support for click event to `EuiBetaBadge` ([#4798](https://github.com/elastic/eui/pull/4798))
- Added `documentation` and `layers` glyphs to `EuiIcon` ([#4833](https://github.com/elastic/eui/pull/4833))
- Updated `EuiTourStep`'s `title` and `subtitle` prop type from `string` to `ReactNode` ([#4841](https://github.com/elastic/eui/pull/4841))
- Added `euiCantAnimate` Sass mixin ([#4835](https://github.com/elastic/eui/pull/4835))
- Added new `EuiLoadingLogo` component ([#4835](https://github.com/elastic/eui/pull/4835))
- Added `icon` props to `EuiEmptyPrompt` for custom icons ([#4835](https://github.com/elastic/eui/pull/4835))
- Deprecated `EuiLoadingKibana` ([#4835](https://github.com/elastic/eui/pull/4135))
- Paused animations when `prefers-reduced-motion` is on for loader components ([#4835](https://github.com/elastic/eui/pull/4135))

**Bug fixes**

- Fixed `onBlur` and `data-test-subj` prop propagation in `EuiColorPicker` ([#4822](https://github.com/elastic/eui/pull/4822))

## [`v34.1.0`](https://github.com/elastic/eui/releases/tag/v34.1.0)

- Updated `max` and  `min` label positioning for `EuiRange` and `EuiDualRange` ([#4781](https://github.com/elastic/eui/pull/4781))
- Added `timeslider`, `playFilled`, `frameNext` and `framePrevious` glyphs to `EuiIcon` ([#4810](https://github.com/elastic/eui/pull/4810))
- Added default generic value for `EuiSideNavProps` ([#4802](https://github.com/elastic/eui/pull/4802))
- Added `fullHeight` and `minHeight` props to `EuiPageTemplate` ([#4793](https://github.com/elastic/eui/pull/4793))
- Added `.eui-fullHeight` and `euiFullHeight()` utilities ([#4793](https://github.com/elastic/eui/pull/4793))
- Added `paddingSize` prop to `EuiPageSideBar` ([#4793](https://github.com/elastic/eui/pull/4793))

**Bug fixes**

- Fixed `EuiText` color of `EuiCallout` to `default` ([#4816](https://github.com/elastic/eui/pull/4816))
- Fixed inconsistent width of `EuiRange` and `EuiDualRange` with custom tick values ([#4781](https://github.com/elastic/eui/pull/4781))
- Fixes browser freezing when `EuiDataGrid` is used together with `EuiFlyout` and the user clicks a cell ([4813](https://github.com/elastic/eui/pull/4813))
- Added `flex-shrink: 0` to `EuiTabs`, `EuiSpacer`, and `EuiImage` to fix possible shrunken heights ([#4793](https://github.com/elastic/eui/pull/4793))
- Fixed duplicate `main` aria roles in `EuiPageTemplate` and most common `EuiPage` patterns ([#4793](https://github.com/elastic/eui/pull/4793))
- Fixed text color of `EuiBottomBar` ([#4793](https://github.com/elastic/eui/pull/4793))

## [`v34.0.0`](https://github.com/elastic/eui/releases/tag/v34.0.0)

- Added `textTransform` property to `schemaDetectors` prop of `EuiDataGrid`([#4752](https://github.com/elastic/eui/pull/4752))
- Added `color`, `continuityAbove`, `continuityAboveBelow`, `continuityBelow`, `continuityWithin`, `eraser`, `fullScreenExit`, `function`, `percent`, `wordWrap`, and `wordWrapDisabled` glyphs to `EuiIcon` ([#4779](https://github.com/elastic/eui/pull/4779))
- Added `as`, `role`, `closeButtonProps`, `closeButtonPosition`, `outsideClickCloses`, `side`, `type`, and `pushMinBreakpoint` props to `EuiFlyout` ([#4713](https://github.com/elastic/eui/pull/4713))
- Extended `EuiFlyout` `size` prop to accept any CSS `width` value ([#4713](https://github.com/elastic/eui/pull/4713))
- Extended `EuiFlyout` and most of its props in `EuiCollapsibleNav` ([#4713](https://github.com/elastic/eui/pull/4713))
- Changed `helpText` prop in `EuiFormRow` to accept an array of messages([#4782](https://github.com/elastic/eui/pull/4782))

**Breaking changes**

- Changed the default of `EuiFlyout` `ownFocus` to `true` ([#4713](https://github.com/elastic/eui/pull/4713))
- Wrapped `EuiFlyout` within the `EuiOverlayMask` when `ownFocus=true` ([#4713](https://github.com/elastic/eui/pull/4713))
- Changed `EuiCollapsibleNav` width sizing from a Sass variable to a `size` prop ([#4713](https://github.com/elastic/eui/pull/4713))
- Changed `EuiOverlayMask` z-indexing when positioned `below` header to using `top` offset ([#4713](https://github.com/elastic/eui/pull/4713))

**Bug fixes**

- Fixed `EuiTourStepIndicator` to use `EuiI18n` following the standard way ([#4785](https://github.com/elastic/eui/pull/4785))
- Fixed `euiTourStep.closeTour` default token value in `EuiTourStep` to be more specific ([#4790](https://github.com/elastic/eui/pull/4790))

## [`v33.0.0`](https://github.com/elastic/eui/releases/tag/v33.0.0)

- Added `autoFocus` prop and functionality to `EuiComboBox` ([#4772](https://github.com/elastic/eui/pull/4772))
- Added `inherit` color option to `EuiIcon` to force two-tone (app) icons to inherit their parent's color ([#4760](https://github.com/elastic/eui/pull/4760))
- Updated `EuiBetaBadge, EuiBadge, EuiButtonIcon, EuiButtonContent, EuiCallOut, EuiContextMenuItem, EuiListGroupItem` icon usage to inherit their parent's color ([#4760](https://github.com/elastic/eui/pull/4760))
- Added `iconProps` prop to `EuiListGroupItem` ([#4760](https://github.com/elastic/eui/pull/4760))
- Added `i18ntokens.json` to published package ([#4771](https://github.com/elastic/eui/pull/4771))
- Replaced `highlight.js` with `prism.js`/`refractor` for code syntax highlighting in `EuiCodeBlock` ([#4638](https://github.com/elastic/eui/pull/4638))

**Bug fixes**

- Fixed `initialFocus` prop functionality in `EuiPopover` ([#4768](https://github.com/elastic/eui/pull/4768))
- Fixed `description` prop in `EuiTable`([#4754](https://github.com/elastic/eui/pull/4754))

**Breaking changes**

- Changed some language syntax references in `EuiCodeBlock`, such as `jsx` ([#4638](https://github.com/elastic/eui/pull/4638))
- Removed ability to parse non-string content in `EuiCodeBlock` ([#4638](https://github.com/elastic/eui/pull/4638))

## [`v32.3.0`](https://github.com/elastic/eui/releases/tag/v32.3.0)

- Reduced icon size in `EuiButtonEmpty` of `size` xs. ([#4759](https://github.com/elastic/eui/pull/4759))

**Bug fixes**

- Fixed missing i18n tokens for `EuiFilePicker` ([#4750](https://github.com/elastic/eui/pull/4750))
- Fixed `EuiComboBox` to use correct placeholder text color ([#4744](https://github.com/elastic/eui/pull/4744))

## [`v32.2.0`](https://github.com/elastic/eui/releases/tag/v32.2.0)

- Removed `MutationObserver` fallback from `EuiResizeObserver` ([#4709](https://github.com/elastic/eui/pull/4709))

**Bug fixes**

- Fixed `EuiInMemoryTable` `pagination` prop to update visible items when changed ([#4714](https://github.com/elastic/eui/pull/4714))
- Fixed a bug in `EuiFilePicker` where the HTML input was being shown when `disabled` ([#4738](https://github.com/elastic/eui/pull/4738))
- Fixed inverted asc and desc labels for `EuiDataGrid` `datetime` schema ([#4733](https://github.com/elastic/eui/pull/4733))

## [`v32.1.1`](https://github.com/elastic/eui/releases/tag/v32.1.1)

**Note: this release is a backport containing changes originally made in `33.0.0`**

**Bug fixes**

- Fixed `initialFocus` prop functionality in `EuiPopover` ([#4768](https://github.com/elastic/eui/pull/4768))

## [`v32.1.0`](https://github.com/elastic/eui/releases/tag/v32.1.0)

- Added `readOnly` as a `sorting` option of `EuiBasicTable` and its columns ([#4626](https://github.com/elastic/eui/pull/4626))

**Bug fixes**

- Fixed a bug where on hovering an expandable row cell in `EuiDataGrid` a vertical line would show ([#4689](https://github.com/elastic/eui/pull/4689))
- Fixed a bug in `EuiDataGrid` where key presses in portalled content were being handled by the grid ([#4706](https://github.com/elastic/eui/pull/4706))
- Fixed `EuiDataGrid`'s header content arrangement prevented closing a header cell's popover ([#4706](https://github.com/elastic/eui/pull/4706))
- Fixed a performance issue in `EuiDataGrid` when its `rowCount` changes  ([#4706](https://github.com/elastic/eui/pull/4706))

## [`v32.0.4`](https://github.com/elastic/eui/releases/tag/v32.0.4)

**Bug fixes**

- Removed the restriction on `selectable` `EuiCard` with `layout="horizontal"` ([#4692](https://github.com/elastic/eui/pull/4692))

## [`v32.0.3`](https://github.com/elastic/eui/releases/tag/v32.0.3)

**Bug fixes**

- Exported `EuiAvatarProps` ([#4690](https://github.com/elastic/eui/pull/4690))
- Fixed type overrides in `EuiCard` ([#4690](https://github.com/elastic/eui/pull/4690))

## [`v32.0.2`](https://github.com/elastic/eui/releases/tag/v32.0.2)

**Bug fixes**

- Fixed `htmlIdGenerator` import path in `button_group_button.tsx` ([#4682](https://github.com/elastic/eui/pull/4682))
- Fixed `EuiColorStops` popover failing to close ([#4687](https://github.com/elastic/eui/pull/4687))

## [`v32.0.1`](https://github.com/elastic/eui/releases/tag/v32.0.1)

**Bug fixes**

- Fixed block style of `EuiPanel` when rendered as a `<button>` ([#4681](https://github.com/elastic/eui/pull/4681))

## [`v32.0.0`](https://github.com/elastic/eui/releases/tag/v32.0.0)

- Added `stepNumber` prop and `stepped` as `stopType` option to `EuiColorStops` ([#4613](https://github.com/elastic/eui/pull/4613))
- Expanded `display` prop of `EuiCard` to inherit `color` values from `EuiPanel` ([#4649](https://github.com/elastic/eui/pull/4649))
- Added `element` prop to `EuiPanel` for forcing to `div` or `button` ([#4649](https://github.com/elastic/eui/pull/4649))
- Increased padding on `EuiCheckableCard` with refactor to use `EuiSplitPanel` ([#4649](https://github.com/elastic/eui/pull/4649))
- Added `valueInputProps` prop to `EuiColorStops` ([#4669](https://github.com/elastic/eui/pull/4669))
- Added `position`, `usePortal`, `top`, `right`, `bottom`, and `left` props to `EuiBottomBar` ([#4662](https://github.com/elastic/eui/pull/4662))
- Added `bottomBar` and `bottomBarProps` to `EuiPageTemplate` when `template = 'default'` ([#4662](https://github.com/elastic/eui/pull/4662))
- Added `role="main"` to `EuiPageContent` by default ([#4662](https://github.com/elastic/eui/pull/4662))
- Added `bottomBorder` prop to `EuiPageHeader` ([#4662](https://github.com/elastic/eui/pull/4662))

**Bug fixes**

- Fixed `id` attribute to be unique across `EuiButtonGroupButton` elements ([#4657](https://github.com/elastic/eui/pull/4657))
- Fixed responsive sizing of `EuiModal` ([#4670](https://github.com/elastic/eui/pull/4670))
- Fixed `disabled` interactions of `EuiHeaderSectionItemButton` ([#4670](https://github.com/elastic/eui/pull/4670))
- Hid `of` text on small screens for compressed `EuiPagination`([#4661](https://github.com/elastic/eui/pull/4661))

**Breaking changes**

- Removed `betaBadgeLabel`, `betaBadgeTooltipContent`, and `betaBadgeTitle` props from `EuiPanel` ([#4649](https://github.com/elastic/eui/pull/4649))
- Changed `EuiBottomBar` positioning styles from being applied at the CSS layer to the `style` property  ([#4662](https://github.com/elastic/eui/pull/4662))

## [`v31.12.0`](https://github.com/elastic/eui/releases/tag/v31.12.0)

- Added `indexRuntime` glyph in `EuiIcon` ([#4650](https://github.com/elastic/eui/pull/4650))
- Added `iconType`, `iconColor`, and `iconSize` props to `EuiAvatar` ([#4620](https://github.com/elastic/eui/pull/4620))
- Added `'plain'` and `null` as `color` options of `EuiAvatar` ([#4620](https://github.com/elastic/eui/pull/4620))

## [`v31.11.0`](https://github.com/elastic/eui/releases/tag/v31.11.0)

- Added `EuiNotificationEvent` component ([#4513](https://github.com/elastic/eui/pull/4513))
- Added `euiAnimation()` method on the `EuiHeaderSectionItemButton` ref ([#4513](https://github.com/elastic/eui/pull/4513))
- Made `description` prop of `EuiCard` optional ([#4546](https://github.com/elastic/eui/pull/4582))

## [`v31.10.0`](https://github.com/elastic/eui/releases/tag/v31.10.0)

- Added `panelProps` to `EuiPopover` ([#4573](https://github.com/elastic/eui/pull/4573))
- Updated the default of the `EuiPopover`s `ownFocus` prop from `false` to `true` ([#4551](https://github.com/elastic/eui/pull/4551))
- Added `src` prop to `EuiImage` as an alternative to `url` ([#4611](https://github.com/elastic/eui/pull/4611))
- Added `EuiSplitPanel` component ([#4539](https://github.com/elastic/eui/pull/4539))

**Bug fixes**

- Fixed hover effect of nested clickable rows in `EuiBasicTable` ([#4566](https://github.com/elastic/eui/pull/4566))
- Fixed visual bug in drag&drop sections when nested in an popover ([#4590](https://github.com/elastic/eui/pull/4590))
- Fixed an errant export of `EuiSideNavProps` type from JS code ([#4604](https://github.com/elastic/eui/pull/4604))
- Fixed misaligned `EuiComboBox` options list ([#4607](https://github.com/elastic/eui/pull/4607))
- Fixed missing `forwardRef` on `EuiHeaderSectionItemButton` ([#4631](https://github.com/elastic/eui/pull/4631))

## [`v31.9.1`](https://github.com/elastic/eui/releases/tag/v31.9.1)

**Bug fixes**

- Fixed an errant export of two non-existant values ([#4597](https://github.com/elastic/eui/pull/4597))

## [`v31.9.0`](https://github.com/elastic/eui/releases/tag/v31.9.0)

- Added `EuiComboBoxOptionOption` prop to `EuiComboBox` props table ([#4563](https://github.com/elastic/eui/pull/4563))
- Allowed dynamically changing the `direction` prop on `EuiResizableContainer` ([#4557](https://github.com/elastic/eui/pull/4557))
- Exported `useIsWithinBreakpoints` hook ([#4557](https://github.com/elastic/eui/pull/4557))
- Added focus to `EuiForm` error `EuiCallout` ([#4497](https://github.com/elastic/eui/pull/4497))
- Added a `display` and `size` props to `EuiButtonIcon` ([#4466](https://github.com/elastic/eui/pull/4466))

**Bug fixes**

- Fixed the return type of `getDefaultEuiMarkdownUiPlugins` ([#4567](https://github.com/elastic/eui/pull/4567))
- Fixed inverse handling of boolean sorting in `EuiDataGrid` ([#4561](https://github.com/elastic/eui/pull/4561))

### Feature: EuiPageTemplate ([#4517](https://github.com/elastic/eui/pull/4517))

- Added new `EuiPageTemplate` component as a shortcut for creating the different types of page layout patterns
- Added props `grow` and `direction` to `EuiPage`
- Added props `panelled`, `panelProps`, and `paddingSize` to `EuiPageBody`
- Added props `restrictWidth` and `paddingSize` to `EuiPageBody`
- Added prop `paddingSize` to `EuiPageHeader`
- Updated `tabs` prop of `EuiPageHeaderContent` to render `large` size
- Added prop `sticky` to `EuiPageSideBar`
- Added Sass variable `$euiPageSidebarMinWidth` for changing default `min-width` of `EuiPageSideBar`
- Added `href` and other anchor props to `EuiHeaderSectionItemButton`

**Bug fixes**

- Fixed horizontal overflow of `EuiPageContent`
- Fixed horizontal overflow of `EuiBreadcrumbs`

## [`v31.8.0`](https://github.com/elastic/eui/releases/tag/v31.8.0)

- Reverted part of [#4509](https://github.com/elastic/eui/pull/4509) and returned `EuiDataGrid`'s background content area to an empty shade ([#4542](https://github.com/elastic/eui/pull/4542))
- Added exports for all EUI component props matching `EuiComponentProps` name pattern ([#4517](https://github.com/elastic/eui/pull/4517))
- Added `truncate`, `disabled`, and `emphasize` props to `EuiSideNavItem` ([#4488](https://github.com/elastic/eui/pull/4488))
- Added `truncate` prop to `EuiSideNav` ([#4488](https://github.com/elastic/eui/pull/4488))
- Added support for all `color`s of `EuiPanel` ([#4504](https://github.com/elastic/eui/pull/4504))
- Added `hasBorder` prop to `EuiPanel` ([#4504](https://github.com/elastic/eui/pull/4504))
- Added `labelProps` prop to `EuiRadio`, `EuiSwitch` and `EuiCheckbox` ([#4516](https://github.com/elastic/eui/pull/4516))
- Added `isDisabled` prop to `EuiAvatar` ([#4549](https://github.com/elastic/eui/pull/4549))
- Added `scrollToItem` method on `EuiSelectable` ([#4556](https://github.com/elastic/eui/pull/4562))

**Bug fixes**

- Removed home and end key configured behavior from `EuiSelectable` ([#4560](https://github.com/elastic/eui/pull/4560))
- Fixed nested indicator of last `EuiSideNav` item ([#4488](https://github.com/elastic/eui/pull/4488))
- Fixed override possibility of text `color` in `EuiSideNavItem` ([#4488](https://github.com/elastic/eui/pull/4488))
- Fixed blurry animation of popovers in Chrome ([#4527](https://github.com/elastic/eui/pull/4527))
- Fixed styles of `disabled` times in `EuiDatePicker` ([#4524](https://github.com/elastic/eui/pull/4524))
- Fixed `disabled` text color form fields in Safari ([#4538](https://github.com/elastic/eui/pull/4538))
- Removed static `id` from `EuiQuickSelectPopover` ([#4543](https://github.com/elastic/eui/pull/4543))
- Fixed support sever side rendering for `EuiDataGrid` ([#4540](https://github.com/elastic/eui/pull/4540))

**Theme: Amsterdam**

- Removed letter-spacing from `euiFont` Sass mixin ([#4488](https://github.com/elastic/eui/pull/4488))

## [`v31.7.0`](https://github.com/elastic/eui/releases/tag/v31.7.0)

- Added `whiteSpace` prop to `EuiCodeBlock` ([#4475](https://github.com/elastic/eui/pull/4475))
- Added a light background to `EuiDataGrid` and removed unnecessary height on its container ([#4509](https://github.com/elastic/eui/pull/4509))

**Bug fixes**

- Fixed bug in `EuiDataGrid` where the grid lost height when showing less rows on the last page ([#4509](https://github.com/elastic/eui/pull/4509))
- Updated `euiPaletteForStatus` color sequence to use higher contrast postive and negative colors ([#4508](https://github.com/elastic/eui/pull/4508))

## [`v31.6.0`](https://github.com/elastic/eui/releases/tag/v31.6.0)

- Migrated dependency `axe-puppeteer v1.1.1` to `@axe-core/puppeteer v4.1.1` ([#4482](https://github.com/elastic/eui/pull/4482))
- Added `EuiOverlayMask` directly to `EuiModal` ([#4480](https://github.com/elastic/eui/pull/4480))
- Added `paddingSize` prop to `EuiFlyout` ([#4448](https://github.com/elastic/eui/pull/4448))
- Added `size='l'` prop to `EuiTabs` ([#4501](https://github.com/elastic/eui/pull/4501))
- Added content-specific props (`pageTitle`, `description`, `tabs`, `rightSideItems`) to `EuiPageHeader` by creating a new `EuiPageHeaderContent` component ([#4451](https://github.com/elastic/eui/pull/4451))
- Added `isActive` parameter to the `useIsWithinBreakpoints` hook ([#4451](https://github.com/elastic/eui/pull/4451))
- Added `buttonProps` prop to `EuiAccordion` ([#4510](https://github.com/elastic/eui/pull/4510))

**Bug fixes**

- Fixed `onClose` invoking with unexpected parameter in `EuiFlyout` ([#4505](https://github.com/elastic/eui/pull/4505))
- Fixed invalid color entry passed to `EuiBadge` color prop ([#4481](https://github.com/elastic/eui/pull/4481))
- Fixed `EuiCodeBlock` focus-state if content overflows [#4463](https://github.com/elastic/eui/pull/4463)
- Fixed issues in `EuiDataGrid` around unnecessary scroll bars and container heights not updating ([#4468](https://github.com/elastic/eui/pull/4468))

**Theme: Amsterdam**

- Increased `EuiPage`'s default `restrictWidth` size to `1200px` (extra large breakpoint) ([#4451](https://github.com/elastic/eui/pull/4451))
- Reduced size of `euiBottomShadowSmall` by one layer ([#4451](https://github.com/elastic/eui/pull/4451))

## [`v31.5.0`](https://github.com/elastic/eui/releases/tag/v31.5.0)

- Added `isLoading` prop and added `EuiOverlayMask` directly to `EuiConfirmModal` ([#4421](https://github.com/elastic/eui/pull/4421))
- Added `wrapWithTableRow` to remove `<tr>` in `EuiTableHeader`([#4465](https://github.com/elastic/eui/pull/4465))

**Bug fixes**

- Fixed `id` usage throughout `EuiTreeView` to respect custom ids and stop conflicts in generated ids ([#4435](https://github.com/elastic/eui/pull/4435))
- Fixed `EuiTabs` `role` if no tabs are passed in ([#4435](https://github.com/elastic/eui/pull/4435))
- Fixed issue in `EuiDataGrid` where the horizontal scrollbar was hidden behind pagination ([#4477](https://github.com/elastic/eui/pull/4477))
- Fixed `EuiPopover` with initial `isOpen` working with `EuiOutsideClickDetector` ([#4461](https://github.com/elastic/eui/pull/4461))
- Fixed `EuiDataGridCellPopover` needing 2 state updates to close ([#4461](https://github.com/elastic/eui/pull/4461))
- Fixed `EuiBadge` with `iconOnClick` from catching form submit events ([#4479](https://github.com/elastic/eui/pull/4479))

## [`v31.4.0`](https://github.com/elastic/eui/releases/tag/v31.4.0)

- Added `getDefaultEuiMarkdownProcessingPlugins` method for better control over `EuiMarkdownEditor`'s toolbar UI ([#4383](https://github.com/elastic/eui/pull/4383))
- Changed `EuiOutsideClickDetector` events to be standard event types ([#4434](https://github.com/elastic/eui/pull/4434))
- Added `EuiFieldTextProps` in type definitions for `EuiSuggestInput` ([#4452](https://github.com/elastic/eui/pull/4452))
- Added virtualized cell rendering to `EuiDataGrid` ([#4170](https://github.com/elastic/eui/pull/4170))

**Bug fixes**

- Fixed heights of `append` and `prepend` in `EuiComboBox` ([#4410](https://github.com/elastic/eui/pull/4410))
- Fixed `EuiResizableContainer` initialization timing based on DOM readiness ([#4447](https://github.com/elastic/eui/pull/4447))

## [`v31.3.0`](https://github.com/elastic/eui/releases/tag/v31.3.0)

- Added a `size` prop to `EuiContextMenu` and added a smaller size ([#4409](https://github.com/elastic/eui/pull/4409))
- Added a `textSize` prop to `EuiHealth` ([#4420](https://github.com/elastic/eui/pull/4420))
- Removed selected item of `EuiSelect` when `hasNoInitialSelection=true` and value reset to `undefined` ([#4428](https://github.com/elastic/eui/pull/4428))

## [`v31.2.0`](https://github.com/elastic/eui/releases/tag/v31.2.0)

- Added support for adjusting `buffer` for individual window sides of `EuiPopover` ([#4417](https://github.com/elastic/eui/pull/4417))
- Added `'full'` option to the `height` prop of `EuiMarkdownEditor`. Added `autoExpandPreview` and `maxHeight` props to `EuiMarkdownEditor` ([#4245](https://github.com/elastic/eui/pull/4245))

## [`v31.1.0`](https://github.com/elastic/eui/releases/tag/v31.1.0)

- Reduced the size of the icons and clear button for compressed `EuiFormControlLayout` ([#4374](https://github.com/elastic/eui/pull/4374))
- Added ability for text input updates in `EuiDatePicker` ([#4243](https://github.com/elastic/eui/pull/4243))
- **[REVERTED in 31.3.0]** Fixed heights of `append` and `prepend` in `EuiFormControlLayout` ([#4410](https://github.com/elastic/eui/pull/4410))

**Bug fixes**

- Fixed `EuiSuperDatePicker` extra margin when `showUpdateButton` and `isAutoRefreshOnly` are active ([#4406](https://github.com/elastic/eui/pull/4406))
