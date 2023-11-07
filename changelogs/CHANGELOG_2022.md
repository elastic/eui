## [`v72.0.0`](https://github.com/elastic/eui/releases/tag/v72.0.0)

- Added the `customQuickSelectRender` render prop to `EuiSuperDatePicker`, which allows customizing the Quick Select popover ([#6382](https://github.com/elastic/eui/pull/6382))
- `EuiFilePicker` styles have been updated to look more like an interactive element. ([#6479](https://github.com/elastic/eui/pull/6479))
- Added a third argument to `EuiSelectable`'s `onChange` callback. The single `option` object that triggered the `onChange` event is now also passed to consumers with its most recent `checked` state ([#6487](https://github.com/elastic/eui/pull/6487))

**Bug fixes**

- `EuiTabs` now passes `size` and `expand` to all children using a React context provider. ([#6478](https://github.com/elastic/eui/pull/6478))
- Fixed security warnings caused by `trim@0.0.1` sub-dependency ([#6482](https://github.com/elastic/eui/pull/6482))

**Breaking changes**

- Removed `size` and `expand` props from `EuiTab` ([#6478](https://github.com/elastic/eui/pull/6478))

## [`v71.1.0`](https://github.com/elastic/eui/releases/tag/v71.1.0)

**Deprecations**

- Renamed `EuiPageSideBarProps` to `EuiPageSideBarProps_Deprecated`, to reduce usage/confusion with `EuiPageSidebar` ([#6468](https://github.com/elastic/eui/pull/6468))

## [`v71.0.0`](https://github.com/elastic/eui/releases/tag/v71.0.0)

- Implemented new `EuiRange` and `EuiDualRange` designs where the `levels` are now on top of the tracks ([#6092](https://github.com/elastic/eui/pull/6092))
- Added `discuss` and `dotInCircle` glyphs to `EuiIcon` ([#6434](https://github.com/elastic/eui/pull/6434))
- Added `article` glyph to `EuiIcon` ([#6437](https://github.com/elastic/eui/pull/6437))
- Changed the `EuiProvider` usage warnings to not rely on development mode. ([#6451](https://github.com/elastic/eui/pull/6451))

**Breaking changes**

- `EuiDualRange` now explicitly requires both `min` and `max` via props types, to match `EuiRange` ([#6092](https://github.com/elastic/eui/pull/6092))
- `EuiRange` and `EuiDualRange`'s `compressed` size no longer impacts track or level sizes, but continues to compress tick and input sizes. ([#6092](https://github.com/elastic/eui/pull/6092))
- Removed all variables for the following components from EUI's theme JSON files: ([#6443](https://github.com/elastic/eui/pull/6443))
  - `euiCollapsibleNav*`
  - `euiColorPicker*`
  - `euiContextMenu*`
  - `euiControlBar*`
  - `euiDataGrid* `(except for z-indices and cell padding sizes)
  - `euiDatePicker*`
  - `euiSuperDatePicker*`
  - `euiDragAndDrop*`
  - `euiEuiEmptyPrompt*`
  - `euiFilePicker*`
  - `euiRange*`
  - `euiHeaderLinks*`
  - `euiKeyPad*`
  - `euiMarkdownEditor*`
  - `euiResizable*`
  - `euiSelectable*`
  - `euiSideNav*`
  - `euiStep*`
  - `euiSuggest*`
  - `euiTable*` (except for color variables)
  - `euiTooltip*`
  - `euiButtonFontWeight`, `euiButtonDefaultTransparency`, and `euiButtonMinWidth`
- If you were importing any of the above removed JSON variables, we strongly recommend using generic color or sizing variables from `useEuiTheme()` instead. ([#6443](https://github.com/elastic/eui/pull/6443))

**CSS-in-JS conversions**

- Converted `EuiRange` and `EuiDualRange` to Emotion; Removed `$euiRangeThumbRadius` ([#6092](https://github.com/elastic/eui/pull/6092))
- Added a new `logicalStyles` utility that automatically converts all non-logical properties in a `style` object to their corresponding logical properties ([#6426](https://github.com/elastic/eui/pull/6426))
- Added a new `logicalShorthandCSS` utility that automatically converts `margin`, `padding`, and other 4-sided shorthands to their corresponding logical properties ([#6429](https://github.com/elastic/eui/pull/6429))
- Added a new `logicalBorderRadiusCSS` utility that automatically converts `border-radius` to corresponding logical properties ([#6429](https://github.com/elastic/eui/pull/6429))

## [`v70.4.0`](https://github.com/elastic/eui/releases/tag/v70.4.0)

- Updated `EuiTourStep.footerAction` type to accept `ReactNode[]` ([#6384](https://github.com/elastic/eui/pull/6384))
- Vertically aligned all footer content so that `euiTourStepIndicator` is always centered ([#6384](https://github.com/elastic/eui/pull/6384))
- Added `filterInCircle` glyph to `EuiIcon` ([#6385](https://github.com/elastic/eui/pull/6385))
- Added `color` prop to `EuiBeacon` ([#6420](https://github.com/elastic/eui/pull/6420))
- Added the `euiMaxBreakpoint` and `euiMinBreakpoint` CSS-in-JS utilities for creating min/max-width media queries ([#6431](https://github.com/elastic/eui/pull/6431))

**Bug fixes**

- Restores the previous match operator behaviour when the query value is split into multiple terms after analysis. ([#6409](https://github.com/elastic/eui/pull/6409))
- Fixed missing slide-in animation on `EuiCollapsibleNav`s and left-side `EuiFlyout`s ([#6422](https://github.com/elastic/eui/pull/6422))
- Fix bug in `EuiCard` where footer were not aligned to the bottom of the card ([#6424](https://github.com/elastic/eui/pull/6424))
- Fixed multiple component media queries for consumers with custom theme breakpoints ([#6431](https://github.com/elastic/eui/pull/6431))

## [`v70.3.0`](https://github.com/elastic/eui/releases/tag/v70.3.0)

- `EuiSearchBar` now automatically wraps special characters not used by query syntax in quotes ([#6356](https://github.com/elastic/eui/pull/6356))
- Added `alignment` prop to `EuiBetaBadge` ([#6361](https://github.com/elastic/eui/pull/6361))
- `EuiButton` now accepts `minWidth={false}` ([#6373](https://github.com/elastic/eui/pull/6373))

**Bug fixes**

- Fixed `EuiPageTemplate` not correctly passing the `component` prop to the inner main content wrapper. ([#6352](https://github.com/elastic/eui/pull/6352))
- `EuiSkipLink` now correctly calls `onClick` even when `fallbackDestination` is invalid ([#6355](https://github.com/elastic/eui/pull/6355))
- Permanently fixed `EuiModal` to not cause scroll-jumping issues on modal open ([#6360](https://github.com/elastic/eui/pull/6360))
- Re-fixed `EuiPageSection` not correctly merging `contentProps.css` ([#6365](https://github.com/elastic/eui/pull/6365))
- Fixed `EuiTab` not defaulting to size `m` ([#6366](https://github.com/elastic/eui/pull/6366))
- Fixed the shadow sizes of `.eui-yScrollWithShadows` and `.eui-xScrollWithShadows` ([#6374](https://github.com/elastic/eui/pull/6374))
- Fixed bug in `EuiCard` where the inner content in vertical cards was not growing 100% in width ([#6377](https://github.com/elastic/eui/pull/6377))
- Fixed incorrect margins in `EuiSuperDatePicker` caused by `EuiFlex` CSS gap change ([#6380](https://github.com/elastic/eui/pull/6380))
- Fixed visual bug in nested `EuiFlexGroup`s, where the parent `EuiFlexGroup` is responsive but a child `EuiFlexGroup` is not ([#6381](https://github.com/elastic/eui/pull/6381))

**CSS-in-JS conversions**

- Converted `EuiModal` to Emotion ([#6321](https://github.com/elastic/eui/pull/6321))

**Fixes**

- `EuiButton` no longer outputs unnecessary inline styles for `minWidth={0}` or `minWidth={false}` ([#6373](https://github.com/elastic/eui/pull/6373))
- `EuiFacetButton` no longer reports type issues when passing props accepted by `EuiButton` ([#6373](https://github.com/elastic/eui/pull/6373))

## [`v70.2.0`](https://github.com/elastic/eui/releases/tag/v70.2.0)

- Added a keyboard shortcuts popover to `EuiDataGrid`'s toolbar. This can be visually hidden via `toolbarVisibility.showKeyboardShortcuts`, but will always remain accessible to keyboard and screen reader users. ([#6036](https://github.com/elastic/eui/pull/6036))
- `EuiScreenReaderOnly`'s `showOnFocus` prop now also shows on focus within its children ([#6036](https://github.com/elastic/eui/pull/6036))
- Added `onFocus` prop callback to `EuiSuperDatePicker` ([#6320](https://github.com/elastic/eui/pull/6320))

**Bug fixes**

- Fixed `EuiSelectable` to ensure the full options list is re-displayed when the search bar is controlled and cleared using `searchProps.value` ([#6317](https://github.com/elastic/eui/pull/6317))
- Fixed incorrect padding on `xl`-sized `EuiTabs` ([#6336](https://github.com/elastic/eui/pull/6336))
- Fixed `EuiCard` not correctly merging `css` on its child `icon`s ([#6341](https://github.com/elastic/eui/pull/6341))
- Fixed `EuiCheckableCard` not setting `css` on the correct DOM node ([#6341](https://github.com/elastic/eui/pull/6341))
- Fixed a webkit rendering issue with `EuiModal`s containing `EuiBasicTable`s tall enough to scroll ([#6343](https://github.com/elastic/eui/pull/6343))
- Fixed bug in `to_initials` that truncates custom initials ([#6346](https://github.com/elastic/eui/pull/6346))
- Fix bug in `EuiCard` where layout breaks when `horizontal` and `selectable` are both passed ([#6348](https://github.com/elastic/eui/pull/6348))

## [`v70.1.0`](https://github.com/elastic/eui/releases/tag/v70.1.0)

- Added the `hint` prop to the `<EuiSearchBar />`. This prop lets the consumer render a hint below the search bar that will be displayed on focus. ([#6319](https://github.com/elastic/eui/pull/6319))
- Added the `hasDragDrop` prop to `EuiPopover`. Use this prop if your popover contains `EuiDragDropContext`. ([#6329](https://github.com/elastic/eui/pull/6329))

**Bug fixes**

- Fixed `EuiButton`'s cursor style when the button is disabled ([#6323](https://github.com/elastic/eui/pull/6323))
- Fixed `EuiPageTemplate` not recognizing child `EuiPageSidebar`s/`EuiPageTemplate.Sidebar`s with `css` props ([#6324](https://github.com/elastic/eui/pull/6324))
- Fixed `EuiBetaBadge` to always respect its `anchorProps` values, including when there is no tooltip content ([#6326](https://github.com/elastic/eui/pull/6326))
- Temporarily patched `EuiModal` to not cause scroll-jumping issues on modal open ([#6327](https://github.com/elastic/eui/pull/6327))
- Fixed buggy drag & drop behavior within `EuiDataGrid`'s columns & sorting toolbar popovers ([#6329](https://github.com/elastic/eui/pull/6329))
- Fixed `EuiButton` not correctly passing `textProps` for children inside fragments or i18n components ([#6332](https://github.com/elastic/eui/pull/6332))
- Fixed `EuiButton` not correctly respecting `minWidth={0}` ([#6332](https://github.com/elastic/eui/pull/6332))

**CSS-in-JS conversions**

- Converted `EuiTabs` to Emotion ([#6311](https://github.com/elastic/eui/pull/6311))

## [`v70.0.0`](https://github.com/elastic/eui/releases/tag/v70.0.0)

- Added the `enabled` option to the `<EuiInMemoryTable />` `executeQueryOptions` prop. This option prevents the Query from being executed when controlled by the consumer. ([#6284](https://github.com/elastic/eui/pull/6284))

**Bug fixes**

- Fixed `EuiOverlayMask` to set a `[data-relative-to-header=above|below]` attribute to replace the `--aboveHeader` and `--belowHeader` classNames removed in its Emotion conversion ([#6289](https://github.com/elastic/eui/pull/6289))
- Fixed `EuiHeader` CSS using removed `EuiOverlayMask` class modifiers ([#6293](https://github.com/elastic/eui/pull/6293))
- Fixed `EuiToolTip` not respecting reduced motion preferences ([#6295](https://github.com/elastic/eui/pull/6295))
- Fixed a bug with `EuiTour` where passing any `panelProps` would cause the beacon to disappear ([#6298](https://github.com/elastic/eui/pull/6298))

**Breaking changes**

- `@emotion/css` is now a required peer dependency, alongside `@emotion/react` ([#6288](https://github.com/elastic/eui/pull/6288))
- `@emotion/cache` is no longer required peer dependency, although your project must still use it if setting custom cache/injection locations ([#6288](https://github.com/elastic/eui/pull/6288))

**CSS-in-JS conversions**

- Converted `EuiCode` and `EuiCodeBlock` to Emotion; Removed `euiCodeSyntaxTokens` Sass mixin and `$euiCodeBlockPaddingModifiers`; ([#6263](https://github.com/elastic/eui/pull/6263))
- Converted `EuiResizableContainer` and `EuiResizablePanel` to Emotion ([#6287](https://github.com/elastic/eui/pull/6287))

## [`v69.0.0`](https://github.com/elastic/eui/releases/tag/v69.0.0)

- Added support for `fullWidth` prop on EuiForm, which will be the default for all rows/controls within ([#6229](https://github.com/elastic/eui/pull/6229))
- Added support for `onResizeStart` and `onResizeEnd` callbacks to `EuiResizableContainer` ([#6236](https://github.com/elastic/eui/pull/6236))
- Added optional case sensitive option matching to `EuiComboBox` with the `isCaseSensitive` prop ([#6268](https://github.com/elastic/eui/pull/6268))
- `EuiFlexItem` now supports `grow={0}` ([#6270](https://github.com/elastic/eui/pull/6270))
- Added the `alignItems` prop to `EuiFlexGrid` ([#6281](https://github.com/elastic/eui/pull/6281))
- Added `filter`, `filterExclude`, `filterIgnore`, `filterInclude`, `indexTemporary`, `infinity`, `sortAscending`, and `sortDescending` glyphs to `EuiIcon` ([#6282](https://github.com/elastic/eui/pull/6282))

**Bug fixes**

- Fixed `EuiTextProps` to show the `color` type option `inherit` as default ([#6267](https://github.com/elastic/eui/pull/6267))
- `EuiFlexGroup` now correctly respects `gutterSize` when responsive ([#6270](https://github.com/elastic/eui/pull/6270))
- Fixed the last breadcrumb in `EuiBreadcrumbs`'s `breadcrumbs` array not respecting `truncate` overrides ([#6280](https://github.com/elastic/eui/pull/6280))

**Breaking changes**

- `EuiFlexGrid` no longer supports `columns={0}`. Use `EuiFlexGroup` instead for normal flex display ([#6270](https://github.com/elastic/eui/pull/6270))
- `EuiFlexGrid` now uses modern `display: grid` CSS ([#6270](https://github.com/elastic/eui/pull/6270))
- `EuiFlexGroup`, `EuiFlexGrid`, and `EuiFlexItem` now use modern `gap` CSS instead of margins and negative margins ([#6270](https://github.com/elastic/eui/pull/6270))
- `EuiFlexGroup` no longer applies responsive styles to `column` or `columnReverse` directions ([#6270](https://github.com/elastic/eui/pull/6270))

**CSS-in-JS conversions**

- Converted `EuiFlexGroup`, `EuiFlexGrid`, and `EuiFlexItem` to Emotion ([#6270](https://github.com/elastic/eui/pull/6270))

## [`v68.0.0`](https://github.com/elastic/eui/releases/tag/v68.0.0)

- Added `beta` glyph to `EuiIcon` ([#6250](https://github.com/elastic/eui/pull/6250))
- Added `launch` and `spaces` glyphs to `EuiIcon` ([#6260](https://github.com/elastic/eui/pull/6260))
- Added the `fallbackDestination` prop to `EuiSkipLink`, which accepts a string of query selectors to fall back to if the `destinationId` does not have a valid target. Defaults to `main` ([#6261](https://github.com/elastic/eui/pull/6261))
- `EuiSkipLink` is now always an `a` tag to ensure that it is always placed within screen reader link menus. ([#6261](https://github.com/elastic/eui/pull/6261))

**Bug fixes**

- Fixed `EuiSuperDatePicker` not correctly merging passed `className`s ([#6253](https://github.com/elastic/eui/pull/6253))
- Fixed `EuiColorStops` not correctly merging in passed `data-test-subj`s, `style`s, or `...rest` ([#6255](https://github.com/elastic/eui/pull/6255))
- Fixed `EuiResizablePanel` incorrectly passing `style` to the wrapper instead of the panel. Use `wrapperProps.style` to pass styles to the wrapper. ([#6255](https://github.com/elastic/eui/pull/6255))
- Fixed custom `onClick`s passed to `EuiSkipLink` overriding `overrideLinkBehavior` ([#6261](https://github.com/elastic/eui/pull/6261))

**Breaking changes**

- Removed `inherit` and `ghost` color from `EuiListGroupItem` ([#6207](https://github.com/elastic/eui/pull/6207))
- Changed default color to `text` instead of `inherit` ([#6207](https://github.com/elastic/eui/pull/6207))

**CSS-in-JS conversions**

- Converted `EuiListGroup` and `EuiListGroupItem` to Emotion; Removed `$euiListGroupGutterTypes`, `$euiListGroupItemColorTypes` and `$euiListGroupItemSizeTypes`; ([#6207](https://github.com/elastic/eui/pull/6207))
- Converted `EuiBadgeGroup` to Emotion ([#6258](https://github.com/elastic/eui/pull/6258))
- Converted `EuiBetaBadge` to Emotion ([#6258](https://github.com/elastic/eui/pull/6258))
- Converted `EuiNotificationBadge` to Emotion ([#6258](https://github.com/elastic/eui/pull/6258))

## [`v67.1.2`](https://github.com/elastic/eui/releases/tag/v67.1.2)

**Bug fixes**

- Fixed `EuiFlyout` not correctly merging passed `css` ([#6248](https://github.com/elastic/eui/pull/6248))
- Fixed `EuiNotificationEvent` not correctly merging passed `className`s ([#6248](https://github.com/elastic/eui/pull/6248))
- Fixed `EuiAvatar` to no longer mutate the object passed to its `style` prop ([#6251](https://github.com/elastic/eui/pull/6251))

## [`v67.1.1`](https://github.com/elastic/eui/releases/tag/v67.1.1)

**Bug fixes**

- Fixed `EuiDataGrid`'s broken fullscreen mode when nested within an `EuiAccordion` ([#6235](https://github.com/elastic/eui/pull/6235))
- Fixed `EuiPageSection` not correctly merging `contentProps.css` ([#6239](https://github.com/elastic/eui/pull/6239))
- Fixed `EuiPageHeaderContent` not correctly merging passed `className`s ([#6239](https://github.com/elastic/eui/pull/6239))
- Fixed `EuiAccordion` not correctly merging `buttonProps.css` and `arrowProps.css` ([#6239](https://github.com/elastic/eui/pull/6239))
- Fixed `EuiProgress` not correctly merging `labelProps.css` ([#6239](https://github.com/elastic/eui/pull/6239))
- Fixed `EuiImage` not correctly merging `wrapperProps.css` ([#6239](https://github.com/elastic/eui/pull/6239))

**CSS-in-JS conversions**

- Converted `EuiFlyout` to Emotion; Removed `$euiFlyoutBorder` and `$euiFlyoutPaddingModifiers` ([#6213](https://github.com/elastic/eui/pull/6213))

## [`v67.1.0`](https://github.com/elastic/eui/releases/tag/v67.1.0)

- Added an optional dev-mode check to log, warn, or error if a component is rendered outside of `EuiProvider` ([#6216](https://github.com/elastic/eui/pull/6216))
- Updated `EuiBadge`'s disabled styling to match `EuiButton` ([#6224](https://github.com/elastic/eui/pull/6224))
- Added the `custom_component` search filter type for the EuiSearchBar. This new type gives the consumer control to render the search filter dropdown. ([#6226](https://github.com/elastic/eui/pull/6226))

**Bug fixes**

- Fixed `Query.toESQuery()` to generate bool queries instead of relying on match query logic, to work with non-text fields ([#6220](https://github.com/elastic/eui/pull/6220))
- Fixed `EuiInMemoryTable`'s internal state tracking to include changes of `sorting.sort` values ([#6228](https://github.com/elastic/eui/pull/6228))
- Fixed bug in `EuiButton` where `iconSize` was not being applied ([#6230](https://github.com/elastic/eui/pull/6230))

**CSS-in-JS conversions**

- Converted `EuiBadge` to Emotion ([#6224](https://github.com/elastic/eui/pull/6224))

## [`v67.0.0`](https://github.com/elastic/eui/releases/tag/v67.0.0)

- Updated `EuiSuggest` to accept the `isPreFiltered` prop ([#5930](https://github.com/elastic/eui/pull/5930))
- Updated `EuiOverlayMask` to use `EuiPortal` ([#6090](https://github.com/elastic/eui/pull/6090))
- Updated `EuiToolTipPopover` to be a function component ([#6104](https://github.com/elastic/eui/pull/6104))
- Added `EuiToolTipAnchor` and `EuiToolTipArrow` components ([#6104](https://github.com/elastic/eui/pull/6104))
- Added a new `component` prop to `EuiPageSection`, allowing overriding of the default `section` tag ([#6192](https://github.com/elastic/eui/pull/6192))

**Bug fixes**

- Fixed global styles being inserted into the wrong location when a `EuiProvider` cache is not configured. ([#6202](https://github.com/elastic/eui/pull/6202))
- Fixed bug where `className` and `rest` props were not being passed to the `EuiNotificationEvent` ([#6208](https://github.com/elastic/eui/pull/6208))
- Fixed various nested `componentProps` throwing type errors on the `css` prop ([#6211](https://github.com/elastic/eui/pull/6211))

**Deprecations**

- Added `@deprecated` flags to `EuiPageContent_Deprecated`, `EuiPageContentBody_Deprecated`, `EuiPageContentHeader_Deprecated`, `EuiPageContentHeaderSection_Deprecated`, `EuiPageSideBar_Deprecated` and `EuiPageTemplate_Deprecated`, which will provide helpful hints to IDEs that support jsdoc flags. Consumers will have until August 2023 to migrate from these deprecated components. ([#6194](https://github.com/elastic/eui/pull/6194))

**Breaking changes**

- Removed `onClick` prop from `EuiOverlayMask`. Use a nested `EuiFocusTrap` instead. ([#6090](https://github.com/elastic/eui/pull/6090))
- Removed `euiCallOutColor` Sass mixin ([#6201](https://github.com/elastic/eui/pull/6201))

**CSS-in-JS conversions**

- Converted `EuiOverlayMask` to Emotion ([#6090](https://github.com/elastic/eui/pull/6090))
- Converted `EuiToolTip` to Emotion styling ([#6104](https://github.com/elastic/eui/pull/6104))
- Converted `EuiPagination`, `EuiPaginationButton`, and `EuiPaginationButtonArrow` to Emotion ([#6109](https://github.com/elastic/eui/pull/6109))

## [`v66.0.0`](https://github.com/elastic/eui/releases/tag/v66.0.0)

- Added the `gutterSize` prop to `EuiDescriptionList` ([#6175](https://github.com/elastic/eui/pull/6175))
- Added `tooltipText` as an optional prop on `EuiListGroupItem` ([#6186](https://github.com/elastic/eui/pull/6186))

**Bug fixes**

- Updated the `EuiHeaderSectionItem` to not render if empty ([#6158](https://github.com/elastic/eui/pull/6158))
- Added memoization to `useEuiTheme`'s return value, supporting React's shallow prop comparison optimizations ([#6165](https://github.com/elastic/eui/pull/6165))
- Fixed an `EuiPageSidebar` bug where inline styles were not correctly updating ([#6191](https://github.com/elastic/eui/pull/6191))

**Breaking changes**

- Removed `.euiIEFlexWrapFix` global className and `internetExplorerOnly()` Sass mixin, as IE is no longer a supported browser ([#6154](https://github.com/elastic/eui/pull/6154))
- Removed all IE fixes/fallbacks in EUI CSS ([#6161](https://github.com/elastic/eui/pull/6161))
- Removed all IE fixes/fallbacks in EUI JS ([#6162](https://github.com/elastic/eui/pull/6162))

## [`v65.0.2`](https://github.com/elastic/eui/releases/tag/v65.0.2)

**Bug fixes**

- Fixed missing `EuiDataGrid` cell popover shadows in Safari ([#6163](https://github.com/elastic/eui/pull/6163))
- Fixed a bug in some development environments which prevented `EuiIcon` from loading icons asynchronously ([#6166](https://github.com/elastic/eui/pull/6166))
- Updated the build process to include json files, fixing imports from the @elastic/eui package ([#6172](https://github.com/elastic/eui/pull/6172))

## [`v65.0.1`](https://github.com/elastic/eui/releases/tag/v65.0.1)

**Note: this version contains a bug preventing its usage, fixed in `65.0.2`**

**Bug fixes**

- Fixed the text size of `EuiDescriptionListTitle` when `EuiDescriptionList` is compressed ([#6160](https://github.com/elastic/eui/pull/6160))

## [`v65.0.0`](https://github.com/elastic/eui/releases/tag/v65.0.0)

**Note: this version contains a bug preventing its usage, fixed in `65.0.2`**

- Added `anchorProps` to allow passing more props to the anchoring wrapper in `EuiToolTip` and `EuiBetaBadge` ([#6110](https://github.com/elastic/eui/pull/6110))
- Added an empty shade background color to `hollow` style `EuiBetaBadge` ([#6110](https://github.com/elastic/eui/pull/6110))
- Changed design of select button in `selectable` `EuiCard`s ([#6110](https://github.com/elastic/eui/pull/6110))
- Updated button `ghost` colors to be `colorMode = 'dark'` themed `text` buttons ([#6150](https://github.com/elastic/eui/pull/6150))
- Renamed `ButtonColor` and `ButtonSize` types to prefixed versions `EuiButtonColor` and `EuiButtonSize` ([#6150](https://github.com/elastic/eui/pull/6150))

**Deprecations**

- Deprecated `ghost` color for `EuiButton`, `EuiButtonIcon`, `EuiButtonEmpty` ([#6150](https://github.com/elastic/eui/pull/6150))

**Breaking changes**

- Removed `EuiButtonIconColor` and `EuiButtonEmptyColor` types, use `EuiButtonIconProps['color']` and `EuiButtonEmptyProps['color']` instead ([#6150](https://github.com/elastic/eui/pull/6150))
- Removed support for `ghost` color from `EuiButtonGroup` ([#6150](https://github.com/elastic/eui/pull/6150))

**CSS-in-JS conversions**

- Removed `euiHasBetaBadge()` Sass mixin ([#6110](https://github.com/elastic/eui/pull/6110))
- Converted `EuiCard`, `EuiCheckableCard` to Emotion, removed `$euiCheckableCardPadding`, `$euiCardSpacing`, `$euiCardBottomNodeHeight`, `$euiCardSelectButtonBorders`, `$euiCardSelectButtonBackgrounds`, and `$euiCardPaddingModifiers` ([#6110](https://github.com/elastic/eui/pull/6110))
- Converted `EuiButton` to Emotion ([#6150](https://github.com/elastic/eui/pull/6150))
- Converted color styles of `EuiButtonIcon`, `EuiButtonEmpty`, `EuiButtonGroup` ([#6150](https://github.com/elastic/eui/pull/6150))

## [`v64.0.5`](https://github.com/elastic/eui/releases/tag/v64.0.5)

**Note: this release is a backport containing changes originally made in `67.1.0`, `67.1.1`, and `67.1.2`**

**Bug fixes**

- Fixed `EuiInMemoryTable`'s internal state tracking to include changes of `sorting.sort` values ([#6228](https://github.com/elastic/eui/pull/6228))
- Fixed `EuiDataGrid`'s broken fullscreen mode when nested within an `EuiAccordion` ([#6235](https://github.com/elastic/eui/pull/6235))
- Fixed `EuiAvatar` to no longer mutate the object passed to its `style` prop ([#6251](https://github.com/elastic/eui/pull/6251))

## [`v64.0.4`](https://github.com/elastic/eui/releases/tag/v64.0.4)

**Note: this release is a backport containing changes originally made in `67.2.0`**

- Added the `custom_component` search filter type for the EuiSearchBar. This new type gives the consumer control to render the search filter dropdown. ([#6226](https://github.com/elastic/eui/pull/6226))

**Bug fixes**

- Fixed `EuiPageSection` not correctly merging `contentProps.css` ([#6239](https://github.com/elastic/eui/pull/6239))
- Fixed `EuiPageHeaderContent` not correctly merging passed `className`s ([#6239](https://github.com/elastic/eui/pull/6239))
- Fixed `EuiAccordion` not correctly merging `buttonProps.css` and `arrowProps.css` ([#6239](https://github.com/elastic/eui/pull/6239))
- Fixed `EuiProgress` not correctly merging `labelProps.css` ([#6239](https://github.com/elastic/eui/pull/6239))
- Fixed `EuiImage` not correctly merging `wrapperProps.css` ([#6239](https://github.com/elastic/eui/pull/6239))

## [`v64.0.3`](https://github.com/elastic/eui/releases/tag/v64.0.3)

**Note: this release is a backport containing changes originally made in `66.0.0`**

**Bug fixes**

- Updated the `EuiHeaderSectionItem` to not render if empty ([#6158](https://github.com/elastic/eui/pull/6158))

## [`v64.0.2`](https://github.com/elastic/eui/releases/tag/v64.0.2)

**Note: this release is a backport containing changes originally made in `65.0.0` to `67.0.0`**

**Bug fixes**

- Fixed missing `EuiDataGrid` cell popover shadows in Safari ([#6163](https://github.com/elastic/eui/pull/6163))
- Added memoization to `useEuiTheme`'s return value, supporting React's shallow prop comparison optimizations ([#6165](https://github.com/elastic/eui/pull/6165))
- Fixed global styles being inserted into the wrong location when a `EuiProvider` cache is not configured. ([#6202](https://github.com/elastic/eui/pull/6202))
- Fixed various nested `componentProps` throwing type errors on the `css` prop ([#6211](https://github.com/elastic/eui/pull/6211))

**Note: The below are backport changes already present in `63.x`**

- Added a new `component` prop to `EuiPageSection`, allowing overriding of the default `section` tag ([#6192](https://github.com/elastic/eui/pull/6192))

**Bug fixes**

- Fixed the text size of `EuiDescriptionListTitle` when `EuiDescriptionList` is compressed ([#6160](https://github.com/elastic/eui/pull/6160))
- Fixed an `EuiPageSidebar` bug where inline styles were not correctly updating ([#6191](https://github.com/elastic/eui/pull/6191))

**Deprecations**

- Added `@deprecated` flags to `EuiPageContent_Deprecated`, `EuiPageContentBody_Deprecated`, `EuiPageContentHeader_Deprecated`, `EuiPageContentHeaderSection_Deprecated`, `EuiPageSideBar_Deprecated` and `EuiPageTemplate_Deprecated`, which will provide helpful hints to IDEs that support jsdoc flags. Consumers will have until August 2023 to migrate from these deprecated components. ([#6194](https://github.com/elastic/eui/pull/6194))

## [`v64.0.1`](https://github.com/elastic/eui/releases/tag/v64.0.1)

**Bug fixes**

- Fixed `CollapsedItemActions` ref callback not accounting for `null` value ([#6145](https://github.com/elastic/eui/pull/6145))

**CSS-in-JS conversions**

- Added `logicalCSSWithFallback()` utility for logical properties without full browser support ([#6124](https://github.com/elastic/eui/pull/6124))
- Converted `euiFullHeight()` Sass mixin to Emotion  ([#6124](https://github.com/elastic/eui/pull/6124))
- Converted all global CSS utility classes to Emotion ([#6124](https://github.com/elastic/eui/pull/6124))

## [`v64.0.0`](https://github.com/elastic/eui/releases/tag/v64.0.0)

- Added `onPositionChange` callback prop to `EuiPopover` for when the popover positon changes ([#6087](https://github.com/elastic/eui/pull/6087))
- Added `isDisabled` prop to `EuiAccordion` ([#6095](https://github.com/elastic/eui/pull/6095))
- Added `css` prop to `CommonProps` interface ([#6118](https://github.com/elastic/eui/pull/6118))
- Added new `useIsWithinMaxBreakpoint` and `useIsWithinMinBreakpoint` service hooks ([#6119](https://github.com/elastic/eui/pull/6119))

**Bug fixes**

- Fixed the `steps` prop type for `useEuiTour` to not require `onFinish` ([#6087](https://github.com/elastic/eui/pull/6087))
- Fixed JS breakpoint hooks (`useCurrentEuiBreakpoint`, `useIsWithinBreakpoints`, and `euiBreakpoint`) to correctly handle custom theme breakpoint keys ([#6111](https://github.com/elastic/eui/pull/6111))
- Fixed `:first-child/:nth-child` console warnings for consumers not passing in a `cache` to `EuiProvider` ([#6126](https://github.com/elastic/eui/pull/6126))
- Fixed `EuiScreenReaderLive` double announcements on VO when `focusRegionOnTextChange` is not set ([#6133](https://github.com/elastic/eui/pull/6133))
- Fixed `onBlur` and `onFocus` handlers from `EuiDatePickerRange` being incorrectly applied to wrapping element rather than the start/end control datepickers. ([#6136](https://github.com/elastic/eui/pull/6136))
- Fixed missing `data-fixed-headers` property in some layout configurations using `EuiPageTemplate`. ([#6140](https://github.com/elastic/eui/pull/6140))
- Fixed `EuiAspectRatio` sometimes incorrectly inheriting its height from parent containers as opposed to from its aspect ratio ([#6141](https://github.com/elastic/eui/pull/6141))
- Fixed `EuiAspectRatio` to allow custom `style`s to be passed by consumers ([#6141](https://github.com/elastic/eui/pull/6141))
- Fixed `eui.d.ts` containing `@testing-library` type definitions ([#6142](https://github.com/elastic/eui/pull/6142))

**Breaking changes**

- Removed `getBreakpoint`. Use `useCurrentEuiBreakpoint` instead ([#6119](https://github.com/elastic/eui/pull/6119))
- Removed `BREAKPOINTS` and `BREAKPOINT_KEYS`. Use `euiTheme.breakpoint` instead ([#6119](https://github.com/elastic/eui/pull/6119))
- Removed `isWithinBreakpoints`. Use `useIsWithinBreakpoints` instead ([#6119](https://github.com/elastic/eui/pull/6119))
- Removed `isWithinMaxBreakpoint`. Use `useIsWithinMaxBreakpoint` instead ([#6119](https://github.com/elastic/eui/pull/6119))
- Removed `isWithinMinBreakpoint`. Use `useIsWithinMinBreakpoint` instead ([#6119](https://github.com/elastic/eui/pull/6119))
- `EuiFlyout` now only accepts a named breakpoint size for its `pushMinBreakpoint` prop ([#6119](https://github.com/elastic/eui/pull/6119))
- `EuiCollapsibleNav` now only accepts a named breakpoint size for its `dockedBreakpoint` prop ([#6119](https://github.com/elastic/eui/pull/6119))
- `@emotion/cache` is now a required peer dependency, alongside `@emotion/react` ([#6126](https://github.com/elastic/eui/pull/6126))

**CSS-in-JS conversions**

- Converted `EuiTour` to Emotion ([#6087](https://github.com/elastic/eui/pull/6087))

## [`v63.0.6`](https://github.com/elastic/eui/releases/tag/v63.0.6)

**Note: this release is a backport containing changes originally made in `66.1.0`**

- Added a new `component` prop to `EuiPageSection`, allowing overriding of the default `section` tag ([#6192](https://github.com/elastic/eui/pull/6192))

**Deprecations**

- Added `@deprecated` flags to `EuiPageContent_Deprecated`, `EuiPageContentBody_Deprecated`, `EuiPageContentHeader_Deprecated`, `EuiPageContentHeaderSection_Deprecated`, `EuiPageSideBar_Deprecated` and `EuiPageTemplate_Deprecated`, which will provide helpful hints to IDEs that support jsdoc flags. Consumers will have until August 2023 to migrate from these deprecated components. ([#6194](https://github.com/elastic/eui/pull/6194))

## [`v63.0.5`](https://github.com/elastic/eui/releases/tag/v63.0.5)

**Note: this release is a backport containing changes originally made in `64.0.0`**

**Bug fixes**

- Fixed missing `data-fixed-headers` property in some layout configurations using `EuiPageTemplate`. ([#6140](https://github.com/elastic/eui/pull/6140))
- Fixed an `EuiPageSidebar` bug where inline styles were not correctly updating ([#6191](https://github.com/elastic/eui/pull/6191))

## [`v63.0.4`](https://github.com/elastic/eui/releases/tag/v63.0.4)

**Note: this release is a backport containing changes originally made in `65.0.1`**

**Bug fixes**

- Fixed the text size of `EuiDescriptionListTitle` when `EuiDescriptionList` is compressed ([#6160](https://github.com/elastic/eui/pull/6160))

## [`v63.0.3`](https://github.com/elastic/eui/releases/tag/v63.0.3)

**Note: this release is a backport containing changes originally made in `64.0.1`**

**Bug fixes**

- Fixed `CollapsedItemActions` ref callback not accounting for `null` value ([#6145](https://github.com/elastic/eui/pull/6145))

## [`v63.0.2`](https://github.com/elastic/eui/releases/tag/v63.0.2)

**Note: this release is a backport containing changes originally made in `64.0.0`**

**Bug fixes**

- Fixed `eui.d.ts` containing `@testing-library` type definitions ([#6142](https://github.com/elastic/eui/pull/6142))

## [`v63.0.1`](https://github.com/elastic/eui/releases/tag/v63.0.1)

**Bug fixes**

- Fixed server-side rendering and test-env errors caused by `useCurrentEuiBreakpoint` ([#6117](https://github.com/elastic/eui/pull/6117))

## [`v63.0.0`](https://github.com/elastic/eui/releases/tag/v63.0.0)

- Added new `EuiPageTemplate` namespaced component that uses context to pass through props ([#5768](https://github.com/elastic/eui/pull/5768))
- Added `EuiPageSection` component for easier section stacking ([#5768](https://github.com/elastic/eui/pull/5768))
- Added `EuiPageSidebar` component that is an upgrade to `EuiPageSideBar` ([#5768](https://github.com/elastic/eui/pull/5768))
- Extended `bottomBorder` prop to add `'extended'` on `EuiPageHeader` ([#5768](https://github.com/elastic/eui/pull/5768))
- Added `paddingSize` and `restrictWidth` directly on `EuiPageHeaderContent` ([#5768](https://github.com/elastic/eui/pull/5768))
- Added `data-fixed-headers` attribute to `<body>` with the count of fixed `EuiHeader` components ([#5768](https://github.com/elastic/eui/pull/5768))
- Extended `usePortal` prop on `EuiBottomBar` to accept `EuiPortalProps` ([#5768](https://github.com/elastic/eui/pull/5768))
- Increased `paddingSize` support by `EuiPage` for `xl` and `xs` sizes ([#5768](https://github.com/elastic/eui/pull/5768))
- Moved `restrictWidth` default `true` style to `style` attribute on `EuiPage` and `EuiPageBody` ([#5768](https://github.com/elastic/eui/pull/5768))
- Added optional `height` parameter to `euiYScroll()`, `useEuiYScroll`, `euiYScrollWithShadows()`, and `useEuiYScrollWithShadows` ([#5768](https://github.com/elastic/eui/pull/5768))
- Added `repositionOnScroll` directly to `EuiPopover` rendered by mobile version of `EuiHeaderLinks` ([#5768](https://github.com/elastic/eui/pull/5768))

**Bug fixes**

- Fixed missing render of `breadcrumbs` on `EuiPageHeader` when `alignItems = 'top'` ([#5768](https://github.com/elastic/eui/pull/5768))
- Fixed `logicalStyle()` to return the same value type as was passed in (instead of converting to string) ([#5768](https://github.com/elastic/eui/pull/5768))

**Deprecations**

- Deprecated the old `EuiPageTemplate` component and renamed to `EuiPageTemplate_Deprecated` ([#5768](https://github.com/elastic/eui/pull/5768))
- Deprecated `EuiPageContent` and `EuiPageContentBody` in favor of new `EuiPageSection` ([#5768](https://github.com/elastic/eui/pull/5768))
- Deprecated `EuiPageContent` and renamed to `EuiPageContent_Deprecated` ([#5768](https://github.com/elastic/eui/pull/5768))
- Deprecated `EuiPageContentBody` and renamed to `EuiPageContentBody_Deprecated` ([#5768](https://github.com/elastic/eui/pull/5768))
- Deprecated `EuiPageContentHeader` and renamed to `EuiPageContentHeader_Deprecated` ([#5768](https://github.com/elastic/eui/pull/5768))
- Deprecated `EuiPageContentHeaderSection` and renamed to `EuiPageContentHeaderSection_Deprecated` ([#5768](https://github.com/elastic/eui/pull/5768))
- Deprecated `EuiPageSideBar` and renamed to `EuiPageSideBar_Deprecated` ([#5768](https://github.com/elastic/eui/pull/5768))

**Breaking changes**

- Removed nested `EuiPageHeader` styles when a child of `EuiPageBody` ([#5768](https://github.com/elastic/eui/pull/5768))
- Changed default `paddingSize` of `EuiPage` from `m` to `none` ([#5768](https://github.com/elastic/eui/pull/5768))

**CSS-in-JS conversion**

- Converted `EuiPage` and `EuiPageBody` to Emotion ([#5768](https://github.com/elastic/eui/pull/5768))
- Converted `EuiPageHeader` and `EuiPageHeaderContent` to Emotion ([#5768](https://github.com/elastic/eui/pull/5768))
- Removed `euiPageRestrictWidth()` Sass mixin ([#5768](https://github.com/elastic/eui/pull/5768))

## [`v62.2.4`](https://github.com/elastic/eui/releases/tag/v62.2.4)

**Note: this release is a backport containing changes originally made in `65.0.1`**

**Bug fixes**

- Fixed the text size of `EuiDescriptionListTitle` when `EuiDescriptionList` is compressed ([#6160](https://github.com/elastic/eui/pull/6160))

## [`v62.2.3`](https://github.com/elastic/eui/releases/tag/v62.2.3)

**Note: this release is a backport containing changes originally made in `64.0.1`**

**Bug fixes**

- Fixed `CollapsedItemActions` ref callback not accounting for `null` value ([#6145](https://github.com/elastic/eui/pull/6145))

## [`v62.2.2`](https://github.com/elastic/eui/releases/tag/v62.2.2)

**Note: this release is a backport containing changes originally made in `64.0.0`**

**Bug fixes**

- Fixed `eui.d.ts` containing `@testing-library` type definitions ([#6142](https://github.com/elastic/eui/pull/6142))

## [`v62.2.1`](https://github.com/elastic/eui/releases/tag/v62.2.1)

**Note: this release is a backport containing changes originally made in `63.0.1`**

**Bug fixes**

- Fixed server-side rendering and test-env errors caused by `useCurrentEuiBreakpoint` ([#6117](https://github.com/elastic/eui/pull/6117))

## [`v62.2.0`](https://github.com/elastic/eui/releases/tag/v62.2.0)

- The `EuiDataGrid`'s `rowHeightOptions` now contain an optional `scrollAnchorRow` property, which enables vertical layout shift compensation when rendering `auto`-sized rows. ([#6070](https://github.com/elastic/eui/pull/6070))
- Added new React Testing Library EuiToolTip helpers, `waitForEuiToolTipVisible` and `waitForEuiToolTipClose` ([#6106](https://github.com/elastic/eui/pull/6106))

**Bug fixes**

- Fixed EuiPortal changes causing rerender issues in test environments ([#6105](https://github.com/elastic/eui/pull/6105))

## [`v62.1.0`](https://github.com/elastic/eui/releases/tag/v62.1.0)

- Updated `tokenFile`, `tokenSymbol` and `tokenRepo` default shapes to `square` instead of `rectangle` ([#6067](https://github.com/elastic/eui/pull/6067))
- Updated `EuiGlobalToastList` to be a function component ([#6068](https://github.com/elastic/eui/pull/6068))
- Added new `useCurrentEuiBreakpoint` hook, which returns the current browser window width as a named EUI breakpoint size (e.g. `xl`) ([#6079](https://github.com/elastic/eui/pull/6079))

**Bug fixes**

- Fixed unintentional subcomponent remounting in `EuiCodeBlock` during rerenders ([#6077](https://github.com/elastic/eui/pull/6077))
- Fixed `useIsWithinBreakpoints` hook not correctly respecting consumer theme breakpoint overrides ([#6079](https://github.com/elastic/eui/pull/6079))

**CSS-in-JS conversions**

- Converted `EuiBreadcrumbs` and `EuiHeaderBreadcrumbs` to Emotion; removed `$euiBreadcrumbSpacing` and `$euiBreadcrumbTruncateWidth` ([#5934](https://github.com/elastic/eui/pull/5934))
- Converted `EuiDescriptionList` to Emotion ([#5971](https://github.com/elastic/eui/pull/5971))
- Converted `EuiToken` to Emotion ([#6067](https://github.com/elastic/eui/pull/6067))
- Converted `EuiToast`, `EuiGlobalToastList`, and `EuiGlobalToastListItem` to Emotion ([#6068](https://github.com/elastic/eui/pull/6068))
- Moved `.euiBody-hasPortalContent` styles that used to live in `_portal.scss` to Emotion `EuiGlobalStyles` ([#6075](https://github.com/elastic/eui/pull/6075))

## [`v62.0.3`](https://github.com/elastic/eui/releases/tag/v62.0.3)

**Bug fixes**

- Fixed EuiPortal changes causing rerender issues in test environments ([#6105](https://github.com/elastic/eui/pull/6105))

## [`v62.0.2`](https://github.com/elastic/eui/releases/tag/v62.0.2)

- Added new React Testing Library `ByDataTestSubj` utilities for targeting EUI's `data-test-subj` attributes. These can be accessed by importing custom RTL `render` and `screen` utils from `@elastic/eui/lib/test/rtl`. ([#6091](https://github.com/elastic/eui/pull/6091))
- Added new React Testing Library EuiPopover helpers, `waitForEuiPopoverOpen` and `waitForEuiPopoverClose` ([#6091](https://github.com/elastic/eui/pull/6091))

**Bug fixes**

- Restored non-Emotion classNames to `EuiCommentEvent`'s children ([#6089](https://github.com/elastic/eui/pull/6089))

## [`v62.0.1`](https://github.com/elastic/eui/releases/tag/v62.0.1)

**Bug fixes**

- Fixed a bug preventing `EuiPortal` from working in server-side rendering ([#6055](https://github.com/elastic/eui/pull/6055))
- Fixed an `EuiFilterButton` accessibility error ([#6076](https://github.com/elastic/eui/pull/6076))
- Fixed `EuiImage` rendering empty captions  ([#6081](https://github.com/elastic/eui/pull/6081))
- Fixed `EuiImage` not respecting `text-align` on parents ([#6081](https://github.com/elastic/eui/pull/6081))

## [`v62.0.0`](https://github.com/elastic/eui/releases/tag/v62.0.0)

- Updated `EuiText.img` styles to prevent images from growing full width ([#5969](https://github.com/elastic/eui/pull/5969))
- Improved `EuiImage`'s `allowFullScreen` screen reader experience ([#5969](https://github.com/elastic/eui/pull/5969))
- Updated `EuiImage`'s full screen mode to use the `fullScreenExit` icon ([#5969](https://github.com/elastic/eui/pull/5969))
- Updated `EuiPopover`'s `display` prop to accept any CSS `display` value ([#5977](https://github.com/elastic/eui/pull/5977))
- Added `data-popover-open` attribute to `EuiPopover`'s panel ([#5977](https://github.com/elastic/eui/pull/5977))
- Changed `EuiPopover`'s `box-shadow` to `filter` ([#5977](https://github.com/elastic/eui/pull/5977))
- Added `logicalSizeCSS` and `logicalSizeStyle` for quickly producing `width` and `height` styles ([#5977](https://github.com/elastic/eui/pull/5977))
- Increased the opacity of the shadow color in dark mode ([#5977](https://github.com/elastic/eui/pull/5977))
- Improved screen reader accessibility for `EuiDataGrid` column headers ([#6034](https://github.com/elastic/eui/pull/6034))
- Added `tokenMetricCounter` and `tokenMetricGauge` to `EuiToken` ([#6064](https://github.com/elastic/eui/pull/6064))
- Removed the nested `aria-label` on the `EuiAvatar` icon to simplify a11y ([#6071](https://github.com/elastic/eui/pull/6071))
- Added `timelineAvatarAriaLabel` to `EuiComment` ([#6071](https://github.com/elastic/eui/pull/6071))

**Bug fixes**

- Reverted the change `EuiCommentEvent.username` type from `ReactNode` to `string` ([#6071](https://github.com/elastic/eui/pull/6071))
- Fixed searchable single selection `EuiSelectable`s not correctly highlighting the checked option on initial render ([#6072](https://github.com/elastic/eui/pull/6072))

**Breaking changes**

- Updated `EuiImage.className` to be applied to the `img` instead of the parent wrapper `figure` and added `wrapperProps` prop so that consumers can apply props to the `figure` element ([#5969](https://github.com/elastic/eui/pull/5969))
- Renamed `EuiPopover`'s `display` prop value `inlineBlock` to `inline-block` ([#5977](https://github.com/elastic/eui/pull/5977))
- `EuiPopover`: Removed `false` as an option from `initialFocus` ([#6044](https://github.com/elastic/eui/pull/6044))
- Renamed `timelineIcon` on `EuiComment` to `timelineAvatar` ([#6071](https://github.com/elastic/eui/pull/6071))

**CSS-in-JS conversions**

- Converted `EuiErrorBoundary` to Emotion ([#6053](https://github.com/elastic/eui/pull/6053))
- Converted `EuiTextDiff` to Emotion ([#6056](https://github.com/elastic/eui/pull/6056))
- Converted `euiBreakpoint` mixin to Emotion. ([#6057](https://github.com/elastic/eui/pull/6057))
- Converted `EuiImage` to Emotion ([#5969](https://github.com/elastic/eui/pull/5969))
- Converted `EuiPopover`, `EuiPopoverTitle`, `EuiPopoverFooter`, `EuiInputPopover` ([#5977](https://github.com/elastic/eui/pull/5977))

## [`v61.0.0`](https://github.com/elastic/eui/releases/tag/v61.0.0)

- Added `eventIcon`, `eventIconAriaLabel`, and `eventColor` props to `EuiComment` ([#6030](https://github.com/elastic/eui/pull/6030))
- Updated `EuiComment.actions` type to accept `ReactNode[]` ([#6030](https://github.com/elastic/eui/pull/6030))
- Updated `.euiMarkdownEditor` display to `flex` to prevent display issues when the markdown editor is inside a `EuiComment` ([#6030](https://github.com/elastic/eui/pull/6030))
- Added styles for `kbd`'s within `EuiText` ([#6049](https://github.com/elastic/eui/pull/6049))
- Added `keyboard` glyph to `EuiIcon` ([#6058](https://github.com/elastic/eui/pull/6058))

**Bug fixes**

- Fixed bug in `EuiTimelineItem` where `className`s were not being applied ([#6030](https://github.com/elastic/eui/pull/6030))
- Fixed multiple missing CSS logical properties within `EuiText` children ([#6059](https://github.com/elastic/eui/pull/6059))

**Deprecations**

- Deprecated `EuiIcon`'s `keyboardShortcut` in favor of `keyboard` ([#6058](https://github.com/elastic/eui/pull/6058))

**Breaking changes**

- Changed `EuiCommentEvent.username` type from `ReactNode` to `string` ([#6030](https://github.com/elastic/eui/pull/6030))
- Updated `EuiCommentList` and `EuiComment` to use `EuiTimeline` and `EuiTimelineItem` respectively. This change makes the `EuiCommentList` to be always required ([#6030](https://github.com/elastic/eui/pull/6030))
- Removed `EuiComment.type` ([#6030](https://github.com/elastic/eui/pull/6030))

**CSS-in-JS conversions**

- Converted `EuiComment` to Emotion ([#6030](https://github.com/elastic/eui/pull/6030))

## [`v60.3.0`](https://github.com/elastic/eui/releases/tag/v60.3.0)

- `EuiDataGrid`'s imperative API now exposes the `scrollTo` and `scrollToItem` APIs of `react-window`. ([#6042](https://github.com/elastic/eui/pull/6042))

**Bug fixes**

- Fixed drag and drop interactions on EuiAccordion elements ([#6031](https://github.com/elastic/eui/pull/6031))
- Fixed `EuiDataGrid`'s row count/indices announced to screen readers when virtualized ([#6033](https://github.com/elastic/eui/pull/6033))
- Fixed `EuiDataGrid`'s current cell row/column position announced to screen readers when sorted and paginated, and also improved column identification and announcement cadence ([#6033](https://github.com/elastic/eui/pull/6033))
- Fixed `EuiContextMenuPanelDescriptor`'s `width` prop type to correctly reflect that it allows all CSS width values, not just numbers ([#6043](https://github.com/elastic/eui/pull/6043))
- Fixed `EuiSelectable` onChange keyboard events not being correctly passed back on React v16 ([#6045](https://github.com/elastic/eui/pull/6045))

## [`v60.2.0`](https://github.com/elastic/eui/releases/tag/v60.2.0)

- Added `cluster`,  `container`, `kubernetesNode`, `kubernetesPod` and `namespace` glyphs to `EuiIcon` ([#6001](https://github.com/elastic/eui/pull/6001))
- Added a default `title` to `EuiDataGrid`'s column headers, allowing header text to remain visible if truncated due to column widths ([#6013](https://github.com/elastic/eui/pull/6013))
- Added a `popoverScreenReaderText` prop to `EuiPopover` that allows customizing screen reader instructions when a popover first opens ([#6017](https://github.com/elastic/eui/pull/6017))
- Enhanced `EuiDataGrid`'s column header actions popover to be keyboard navigable via up/down arrow keys ([#6017](https://github.com/elastic/eui/pull/6017))
- `EuiDataGrid` now accepts a `virtualizationOptions.onItemsRendered` callback, as well as `virtualizationOptions.className` ([#6019](https://github.com/elastic/eui/pull/6019))

**Bug fixes**

- Fixed the focus context of `EuiDataGrid` to ensure that focusedCell maintains it's referential integrity. This ensures that React hooks can use this safely as a dependency. ([#6007](https://github.com/elastic/eui/pull/6007))
- Fixed buggy `EuiDataGrid` column header display on sorted columns with no actions ([#6014](https://github.com/elastic/eui/pull/6014))
- Fixed `EuiPopover` unintentionally passing the `offset` prop as an HTML attribute to its div wrapper ([#6017](https://github.com/elastic/eui/pull/6017))
- Fixed `EuiDataGrid` focus/scroll jumping occurring when the first interaction the user had with the grid was the scrollbar(s) ([#6018](https://github.com/elastic/eui/pull/6018))

## [`v60.1.2`](https://github.com/elastic/eui/releases/tag/v60.1.2)

**Bug fixes**

- Fixed EuiSelectable's `onChange` callback not passing back a persisted event on React 16 ([#6026](https://github.com/elastic/eui/pull/6026))
- Fixed `EuiText` not correctly inheriting `className`s when both the `color` and `textAlign` props were passed ([#6027](https://github.com/elastic/eui/pull/6027))

## [`v60.1.1`](https://github.com/elastic/eui/releases/tag/v60.1.1)

**Bug fixes**

Fixed issue with `EuiPanel` where the `Emotion` styles were not being passed when it was rendered as a button ([#6010](https://github.com/elastic/eui/pull/6010))

## [`v60.1.0`](https://github.com/elastic/eui/releases/tag/v60.1.0)

- Added `focusRegionOnTextChange` prop to `EuiScreenReaderLive` ([#5995](https://github.com/elastic/eui/pull/5995))
- Enhanced `EuiSkipLink`'s `overrideLinkBehavior` scroll and focus UX ([#5996](https://github.com/elastic/eui/pull/5996))

**Bug fixes**

- Fixed `EuiAccordion` props type not being correctly inferred ([#5974](https://github.com/elastic/eui/pull/5974))

**CSS-in-JS conversions**

- Converted `EuiScreenReaderOnly` to Emotion ([#5846](https://github.com/elastic/eui/pull/5846))
- Converted `EuiIcon` to Emotion; removed `$euiIconLoadingOpacity`, `$euiIconColors`, and `$euiIconSizes` ([#5967](https://github.com/elastic/eui/pull/5967))
- Converted `EuiProgress` to Emotion and removed `$euiProgressColors` and `$euiProgressSizes` ([#5986](https://github.com/elastic/eui/pull/5986))

## [`v60.0.0`](https://github.com/elastic/eui/releases/tag/v60.0.0)

- Added configuration options to `EuiProvider.cache` to enable more granular style insertion ([#5853](https://github.com/elastic/eui/pull/5853))
- Added a utility classes component ([#5853](https://github.com/elastic/eui/pull/5853))
- Added utility classes configuration options to `EuiProvider` ([#5853](https://github.com/elastic/eui/pull/5853))
- Added `gutterSize` prop to `EuiTimeline` ([#5955](https://github.com/elastic/eui/pull/5955))
- Added optional `onActiveOptionChange` callback to `EuiSelectable` ([#5978](https://github.com/elastic/eui/pull/5978))

**Bug fixes**

- Fixed bug in `EuiTimelineItem` where the vertical line was not showing on the last item when `verticalAlign` was set to `center` ([#5955](https://github.com/elastic/eui/pull/5955))
- Fixed bug in `logicalCSS()` where the left and right `logicalPosition`s were wrong ([#5955](https://github.com/elastic/eui/pull/5955))
- Fixed a maximum call stack error in `EuiComboBox` when an option group contains hundreds of thousands of options ([#5976](https://github.com/elastic/eui/pull/5976))

**Breaking changes**

- Removed `component` prop from `EuiTimelineItem`, which now defaults to `li`. Consequently, a `EuiTimeline` (`ol`) is required to wrap the timeline items ([#5955](https://github.com/elastic/eui/pull/5955))

**CSS-in-JS conversions**

- Converted `EuiStat` to Emotion ([#5968](https://github.com/elastic/eui/pull/5968))

## [`v59.1.0`](https://github.com/elastic/eui/releases/tag/v59.1.0)

- Added new `color` prop to `EuiLoadingSpinner` ([#5878](https://github.com/elastic/eui/pull/5878))
- Added the `overrideLinkBehavior` prop to `EuiSkipLink` for applications that use hash routers ([#5957](https://github.com/elastic/eui/pull/5957))

**Bug fixes**

- Fixed `EuiSelectableMessage` flex layout when containing multiple children nodes ([#5966](https://github.com/elastic/eui/pull/5966))
- Fixed export location of JS based shadow mixins ([#5970](https://github.com/elastic/eui/pull/5970))

**CSS-in-JS**

- Converted `EuiFacetGroup` and `EuiFacetButton` to Emotion and removed `$euiFacetGutterSizes` ([#5878](https://github.com/elastic/eui/pull/5878))

## [`v59.0.1`](https://github.com/elastic/eui/releases/tag/v59.0.1)

**Bug fixes**

- Fixed custom styles from being overridden in `EuiText` and `EuiTextColor` ([#5960](https://github.com/elastic/eui/pull/5960))
- Fixed `EuiCallOut` from consuming all available vertical height with `flex-grow` ([#5963](https://github.com/elastic/eui/pull/5963))

## [`v59.0.0`](https://github.com/elastic/eui/releases/tag/v59.0.0)

- Added a new optional `cloneElement` prop to `EuiTextAlign` and `EuiTextColor` ([#5895](https://github.com/elastic/eui/pull/5895))
- Added all `border` logical properties to the `logicalCSS` utility ([#5895](https://github.com/elastic/eui/pull/5895))
- Added `euiTheme.font.familySerif` ([#5895](https://github.com/elastic/eui/pull/5895))
- Updated API pattern for style mixin functions ([#5904](https://github.com/elastic/eui/pull/5904))
- Added `isInvalid` and `disabled` as top level props on `EuiDatePickerRange` ([#5918](https://github.com/elastic/eui/pull/5918))
- Updated `EuiDatePickerRange` delimiter to a `sortRight` icon which is swapped for `alert` when `isInvalid` ([#5918](https://github.com/elastic/eui/pull/5918))
- Updated `isInvalid` and `disabled` visual states `EuiSuperDatePicker` ([#5918](https://github.com/elastic/eui/pull/5918))
- Added the click/keydown event as an argument to `EuiSelectable`/`EuiSelectableTemplateSitewide`'s `onChange` prop ([#5926](https://github.com/elastic/eui/pull/5926))
- Updated `euiTheme.colors.lightestShade` to be slightly less blue and `euiTheme.colors.body` to be slightly darker ([#5939](https://github.com/elastic/eui/pull/5939))
- Updated `euiBackgroundColor()` to accept an optional `method` property ([#5939](https://github.com/elastic/eui/pull/5939))
- Removed duplicated yarn.lock dependencies ([#5947](https://github.com/elastic/eui/pull/5947))

**Bug fixes**

- Fixed visual indicator of invalid `EuiDatePickerRange` and `EuiSuperDatePicker` ([#5918](https://github.com/elastic/eui/pull/5918))
Fixed `EuiCollapsibleNavGroup` TypeScript error where `title` definition was being overridden by an extended `div` element ([#5935](https://github.com/elastic/eui/pull/5935))
- Fixed `EuiGlobalToastList`/`EuiToast`s disappearing immediately when given an Infinity timeout ([#5954](https://github.com/elastic/eui/pull/5954))

**Breaking changes**

- Renamed `euiTheme.colors.subdued` to `euiTheme.colors.subduedText` ([#5895](https://github.com/elastic/eui/pull/5895))

**CSS-in-JS conversions**

- Converted `EuiText`, `EuiTextAlign`, and `EuiTextColor`, and removed their corresponding CSS modifier classes ([#5895](https://github.com/elastic/eui/pull/5895))
- Partially converted `EuiMarkdownFormat`'s text size scaling styles ([#5895](https://github.com/elastic/eui/pull/5895))
- Removed `$euiTextColors`, `euiScaleText()`, and `$euiTextConstrainedMaxWidth` Sass utilities ([#5895](https://github.com/elastic/eui/pull/5895))
- Converted `EuiExpression` to Emotion ([#5941](https://github.com/elastic/eui/pull/5941))

## [`v58.1.1`](https://github.com/elastic/eui/releases/tag/v58.1.1)

**Bug fixes**

- Fixed `EuiPopover` padding by reverting removal of `EuiPanel` padding classes ([#5927](https://github.com/elastic/eui/pull/5927))
- Updated `EuiAccordion` to show loading spinner instead of extra actions when `isLoading` ([#5896](https://github.com/elastic/eui/pull/5896))

## [`v58.1.0`](https://github.com/elastic/eui/releases/tag/v58.1.0)

- Updated `useEuiPaddingCSS()` and `useEuiBackgroundColorCSS()` to render `css` blocks so consuming components render the key name in the class ([#5891](https://github.com/elastic/eui/pull/5891))
- Added padding sizes `xs` and `xl` to `EuiPanel` ([#5891](https://github.com/elastic/eui/pull/5891))

**Bug fixes**

- Fixed `EuiSplitPanel` contained border radius by setting `overflow: hidden` ([#5891](https://github.com/elastic/eui/pull/5891))
- Fixed `EuiCallOut` description top margin when only child ([#5891](https://github.com/elastic/eui/pull/5891))
- Fixed height stretching of `EuiEmptyPrompt` by setting `grow=false` on the nested panel ([#5907](https://github.com/elastic/eui/pull/5907))
- Fixed `EuiInMemoryTable`'s loading state from shifting layout ([#5914](https://github.com/elastic/eui/pull/5914))
- Fixed accessibility errors with `EuiDataGrid`'s column sorting drag & drop handles ([#5916](https://github.com/elastic/eui/pull/5916))
- Fixed `EuiMark`'s screen reader helpers causing scroll issues in Chrome ([#5921](https://github.com/elastic/eui/pull/5921))

**CSS-in-JS conversions**

- Converted `EuiAccordion` to Emotion; Removed `$paddingSizes` ([#5826](https://github.com/elastic/eui/pull/5826))
- Converted `EuiPanel` to Emotion ([#5891](https://github.com/elastic/eui/pull/5891))
- Renamed `euiScreenReaderOnlyStyles()` mixin to `euiScreenReaderOnly()` ([#5921](https://github.com/elastic/eui/pull/5921))

## [`v58.0.0`](https://github.com/elastic/eui/releases/tag/v58.0.0)

- Updated `EuiForm` to use `forwardRef` ([#5866](https://github.com/elastic/eui/pull/5866))
- Updated all CSS-in-JS shadow functions parameters to match a `(euiTheme, { color? })` order ([#5892](https://github.com/elastic/eui/pull/5892))
- Updated `euiShadow()` parameters to `(euiTheme, size, { color? })` ([#5892](https://github.com/elastic/eui/pull/5892))

**Bug fixes**

- Fixed `EuiContextMenuPanel` (when used within an `EuiPopover`) to correctly return focus to its popover toggle in all scenarios, not just keyboard Escape press ([#5880](https://github.com/elastic/eui/pull/5880))
- Fixed `EuiSelectableTemplateSitewide` to allow re-opening the search popover (if closed via Escape key) via the Enter key ([#5886](https://github.com/elastic/eui/pull/5886))
- Fixed `EuiComboBox` by centering the enter badge in the list options. ([#5890](https://github.com/elastic/eui/pull/5890))
- Fixed `EuiTour` position calculation issues caused by popover width styles ([#5897](https://github.com/elastic/eui/pull/5897))
- Fixed `EuiIcon` from producing console warning in `React.StrictMode` ([#5899](https://github.com/elastic/eui/pull/5899))

**Breaking changes**

- Removed `watchedItemProps` from `EuiContextMenuPanel`, which now updates like a standard component and no longer needs this logic ([#5880](https://github.com/elastic/eui/pull/5880))
- Removed `dist/eui.js` and `dist/eui.min.js` webpack bundles. Use the CommonJS (`dist/lib`) or ESM (`dist/es`) distributions instead. ([#5898](https://github.com/elastic/eui/pull/5898))

## [`v57.0.0`](https://github.com/elastic/eui/releases/tag/v57.0.0)

- Updated `EuiMarkdownFormat` to allow `mailto:` links by default ([#5790](https://github.com/elastic/eui/pull/5790))
- Updated `EuiMarkdownEditor`'s `euiMarkdownLinkValidator` parsing plugin to allow customization of link validation ([#5790](https://github.com/elastic/eui/pull/5790))
- Added `logicals{}`, `logicalCSS()`, `logicalStyle()`, `logicalTextAlignCSS()`, and `logicalTextAlignSTyle()` CSS property utilities ([#5850](https://github.com/elastic/eui/pull/5850))
- Added `euiPaddingSize()`, `useEuiPaddingSize()`, and `useEuiPaddingCSS()` sizing utilities ([#5850](https://github.com/elastic/eui/pull/5850))
- Added `euiBackgroundColor()`, `useEuiBackgroundColor()` and `useEuiBackgroundColorCSS()` color utilities ([#5850](https://github.com/elastic/eui/pull/5850))
- Changed default `EuiCallOut` `heading` element from `span` to `p` ([#5870](https://github.com/elastic/eui/pull/5870))
- Updated `EuiOverlayMask` to accept a React ref ([#5876](https://github.com/elastic/eui/pull/5876))
- Renamed `user` glyph to `userAvatar` in `EuiIcon` ([#5877](https://github.com/elastic/eui/pull/5877))
- Added new `user` glyph in `EuiIcon` ([#5877](https://github.com/elastic/eui/pull/5877))

**Bug fixes**

- Fixed alignment of `EuiCallOut` icon with the heading text ([#5870](https://github.com/elastic/eui/pull/5870))
- Fixed `EuiFlyout` `outsideClickCloses` not being scoped to overlay mask when `ownFocus=true` ([#5876](https://github.com/elastic/eui/pull/5876))

**Deprecations**

- Sass mixin `euiCallOutColor()` deprecated in favor of using `EuiCallOut` directly ([#5870](https://github.com/elastic/eui/pull/5870))

**Breaking changes**

- Removed deprecated options for `EuiDatePicker`'s `popoverPosition` props - use `EuiPopover` values going forward ([#5868](https://github.com/elastic/eui/pull/5868))
- Removed `partition` prop from EuiCharts theme configuration - use `theme.partition` instead ([#5868](https://github.com/elastic/eui/pull/5868))
- Removed `data-grid-cell-id` attribute from `EuiDataGrid` cells - use separate `data-gridcell-column-id` & `data-gridcell-row-index` attributes instead ([#5868](https://github.com/elastic/eui/pull/5868))
- Removed `noDivider` prop from `EuiFilterButton` - use `withNext` prop instead ([#5868](https://github.com/elastic/eui/pull/5868))
- Removed `isSelected` and `isComplete` props from `EuiHorizontalStep` - use `status` prop instead ([#5868](https://github.com/elastic/eui/pull/5868))
- Removed `isHollow` prop from `EuiStep` - this visual appearance is no longer used in Amsterdam ([#5868](https://github.com/elastic/eui/pull/5868))
- Removed condensed `display` prop from `EuiTabs` & `EuiTabbedContent` - this visual appearance is no longer used in Amsterdam ([#5868](https://github.com/elastic/eui/pull/5868))
- Removed `descriptionDisplay` and `labelDisplay` props from `EuiSuggestItem` - use `truncate` and `labelWidth` instead, respectively ([#5868](https://github.com/elastic/eui/pull/5868))
- Removed `.euiButton---subdued` className and `$euiButtonTypes.subdued` Sass variable - use `text` color instead ([#5868](https://github.com/elastic/eui/pull/5868))
- Removed `.eui-textOverflowWrap` - use `.eui-textBreakWord` instead ([#5868](https://github.com/elastic/eui/pull/5868))
- Removed `.euiYScrollWithShadows` - use `.eui-yScrollWithShadows` instead ([#5868](https://github.com/elastic/eui/pull/5868))
- `EuiMarkdownEditor` no longer automatically includes the tooltip plugin in custom plugin arrays passed to `uiPlugins`. To use EUI's tooltip plugin, use `getDefaultEuiMarkdownPlugins()` ([#5868](https://github.com/elastic/eui/pull/5868))

**CSS-in-JS conversions**

- Converted `EuiLink` to Emotion and removed `$euiLinkColors` ([#5856](https://github.com/elastic/eui/pull/5856))
- Converted `EuiCallOut` to Emotion ([#5870](https://github.com/elastic/eui/pull/5870))

## [`v56.0.0`](https://github.com/elastic/eui/releases/tag/v56.0.0)

- Increased weight of `EuiLoadingSpinner` border ([#5845](https://github.com/elastic/eui/pull/5845))
- Added `role` and default `aria-label` to `EuiLoadingLogo`, `EuiLoadingContent`, `EuiLoadingElastic`, and `EuiLoadingSpinner` ([#5845](https://github.com/elastic/eui/pull/5845))
- Added `euiTextTruncate`, `euiTextWordBreak`, and `euiNumberFormat` CSS-in-JS text utilities ([#5854](https://github.com/elastic/eui/pull/5854))
- Added `focus` token to global `EuiTheme` ([#5855](https://github.com/elastic/eui/pull/5855))
- Added `euiFocusRing()` and `useEuiFocusRing()` function/hook for customizing focus outline ([#5855](https://github.com/elastic/eui/pull/5855))
- Added the `focusTrapProps` prop to `EuiFlyout` to aid outside click detection and closing event ([#5860](https://github.com/elastic/eui/pull/5860))

**Bug fixes**

- Fixed a number of `EuiMarkdownEditor`'s default toolbar buttons to highlight when the text cursor is in a related location ([#5840](https://github.com/elastic/eui/pull/5840))
- Fixed allotted animation size of `EuiLoadingLogo` ([#5845](https://github.com/elastic/eui/pull/5845))
- Fixed `EuiLoadingElastic` in dark mode ([#5845](https://github.com/elastic/eui/pull/5845))
- Fixed border-radius of nested `EuiSplitPanel`s ([#5855](https://github.com/elastic/eui/pull/5855))
- Fixed `offset` of global focus `outline` ([#5855](https://github.com/elastic/eui/pull/5855))
- Fixed `EuiCollapsibleNav` failing to close when the button is clicked ([#5860](https://github.com/elastic/eui/pull/5860))

**CSS-in-JS conversions**

- Converted `EuiBottomBar` to Emotion ([#5823](https://github.com/elastic/eui/pull/5823))
- Converted `EuiHealth` to Emotion ([#5832](https://github.com/elastic/eui/pull/5832))
- Converted `EuiTitle` to Emotion ([#5842](https://github.com/elastic/eui/pull/5842))
- Converted `EuiLoadingLogo`, `EuiLoadingContent`, `EuiLoadingElastic`, and `EuiLoadingSpinner`; Removed `$euiLoadingSpinnerSizes`, `$euiGradientStartStop`, and `$euiGradientMiddle` ([#5845](https://github.com/elastic/eui/pull/5845))
- Converted `EuiSkipLink` to Emotion ([#5851](https://github.com/elastic/eui/pull/5851))

**Breaking change**

- As part of `EuiTitle`'s Emotion conversion, the line-height of `s` and `xxs` sized `EuiTitle`s have been slightly reduced ([#5842](https://github.com/elastic/eui/pull/5842))

## [`v55.1.4`](https://github.com/elastic/eui/releases/tag/v55.1.4)

**Note: this release is a backport containing changes originally made in `58.1.0`**

**Bug fixes**

- Fixed `EuiMark`'s screen reader helpers causing scroll issues in Chrome ([#5921](https://github.com/elastic/eui/pull/5921))

**CSS-in-JS conversions**

- Renamed `euiScreenReaderOnlyStyles()` mixin to `euiScreenReaderOnly()` ([#5921](https://github.com/elastic/eui/pull/5921))

## [`v55.1.3`](https://github.com/elastic/eui/releases/tag/v55.1.3)

**Note: this release is a backport containing changes originally made in `58.0.0`**

**Bug fixes**

- Fixed `EuiContextMenuPanel` (when used within an `EuiPopover`) to correctly return focus to its popover toggle in all scenarios, not just keyboard Escape press ([#5880](https://github.com/elastic/eui/pull/5880))

**Breaking changes**

- Removed `watchedItemProps` from `EuiContextMenuPanel`, which now updates like a standard component and no longer needs this logic ([#5880](https://github.com/elastic/eui/pull/5880))

## [`v55.1.2`](https://github.com/elastic/eui/releases/tag/v55.1.2)

**Note: this release is a backport containing changes originally made in `57.0.0`**

- Updated `EuiOverlayMask` to accept a React ref ([#5876](https://github.com/elastic/eui/pull/5876))

**Bug fixes**

- Fixed `EuiFlyout` `outsideClickCloses` not being scoped to overlay mask when `ownFocus=true` ([#5876](https://github.com/elastic/eui/pull/5876))

## [`v55.1.1`](https://github.com/elastic/eui/releases/tag/v55.1.1)

**Note: this release is a backport containing changes originally made in `56.0.0`**

- Added the `focusTrapProps` prop to `EuiFlyout` to aid outside click detection and closing event ([#5860](https://github.com/elastic/eui/pull/5860))

## [`v55.1.0`](https://github.com/elastic/eui/releases/tag/v55.1.0)

- Improved `EuiTimeline` a11y by using better semantic elements ([#5791](https://github.com/elastic/eui/pull/5791))
- Replaced sass usage in `EuiAspectRatio` with inline styles using `aspect-ratio` property of css ([#5818](https://github.com/elastic/eui/pull/5818))
- Improved accessibility of `EuiLoadingChart` ([#5821](https://github.com/elastic/eui/pull/5821))
- Added `euiFontSize()` and `useEuiFontSize()` JS function and React hook for font sizing ([#5822](https://github.com/elastic/eui/pull/5822))
- Added `levels` object to `EuiTheme` ([#5827](https://github.com/elastic/eui/pull/5827))
- Updated the use of `@emotion/cache` to include all `@emotion` styles ([#5831](https://github.com/elastic/eui/pull/5831))

**Bug fixes**

- Fixed layout bug in `EuiAccordion` children that use `position: fixed;` ([#5806](https://github.com/elastic/eui/pull/5806))
- Fixed `EuiFlyout` so that it no longer closes when a click starts inside the flyout but completes outside ([#5810](https://github.com/elastic/eui/pull/5810))
- Fixed `EuiBasicTable` mobile styles being in sync between JS and Sass ([#5822](https://github.com/elastic/eui/pull/5822))

**CSS-in-JS conversions**

- Converted `EuiSpacer` to Emotion; Removed `$spacerSizes` ([#5812](https://github.com/elastic/eui/pull/5812))
- Converted `EuiBeacon` to Emotion ([#5814](https://github.com/elastic/eui/pull/5814))
- Changed `euiCanAnimate` to a constant ([#5814](https://github.com/elastic/eui/pull/5814))
- Converted `EuiHorizontalRule` to emotion; Removed `$ruleMargins` ([#5815](https://github.com/elastic/eui/pull/5815))
- Converted `EuiLoadingChart` to Emotion ([#5821](https://github.com/elastic/eui/pull/5821))

## [`v55.0.1`](https://github.com/elastic/eui/releases/tag/v55.0.1)

**Bug fixes**

- Fixed missing Sass variable file import ([#5820](https://github.com/elastic/eui/pull/5820))

## [`v55.0.0`](https://github.com/elastic/eui/releases/tag/v55.0.0)

- Added JS function versions of Sass style mixins (a11y, animation, scroll, shadows) ([#5754](https://github.com/elastic/eui/pull/5754))
- Added a `<p />` wrapper around `description` of `EuiDescribedFormGroup` when provided as a string ([#5756](https://github.com/elastic/eui/pull/5756))
- Added a `ratio` prop to `EuiDescribedFormGroup` to control the column width ratio ([#5756](https://github.com/elastic/eui/pull/5756))

**Bug fixes**

- Fixed margin calculation of `hasEmptyLabelSpace` on `EuiFormRow` ([#5756](https://github.com/elastic/eui/pull/5756))
- Fixed vertical alignment between `EuiDescribedFormGroup` columns ([#5756](https://github.com/elastic/eui/pull/5756))
- Fixed `EuiContextMenu` stranding keyboard focus when pressing the left/right arrow keys quickly between more than 2 panels ([#5783](https://github.com/elastic/eui/pull/5783))
- Fixed `EuiContextMenu` to enable up/down arrow key navigation to all focusable `items` ([#5783](https://github.com/elastic/eui/pull/5783))
- Fixed `EuiContextMenu` to enable using the up/down arrow keys to navigate to the panel title back button (which takes the user to the previous panel), and focus this button if `initialFocusedItemIndex` has not been set ([#5783](https://github.com/elastic/eui/pull/5783))
- Fixed `EuiComboBox` losing focus when a disabled option is clicked ([#5795](https://github.com/elastic/eui/pull/5795))
- Fixed an `EuiDataGrid` bug occurring when closing cell popovers on clicking the originating cell. The original fix was unintentionally affecting cell popovers with nested modals, popovers, etc. ([#5797](https://github.com/elastic/eui/pull/5797))

**Breaking changes**

- `EuiPopover`s will no longer focus the first tabbable child by default - instead, the popover panel will be focused. This change should be a better experience for both keyboard and screen reader users. Consumers who want to set an initial focus on specific popover element should use the `initialFocus` prop. ([#5784](https://github.com/elastic/eui/pull/5784))

## [`v54.1.0`](https://github.com/elastic/eui/releases/tag/v54.1.0)

- Added `EuiTimeline` component ([#5730](https://github.com/elastic/eui/pull/5730))
- Added a `"subdued"` color option to `EuiAvatar` ([#5730](https://github.com/elastic/eui/pull/5730))
- Added internationalized screen reader helpers to `EuiMark` ([#5739](https://github.com/elastic/eui/pull/5739))
- Added `casesApp` feature icon type to `EuiIcon` ([#5779](https://github.com/elastic/eui/pull/5779))

**Bug fixes**

- Fixed keyboard focus being stranded on `EuiContextMenu` popover close ([#5760](https://github.com/elastic/eui/pull/5760))
- Fixed bug in `EuiEmptyPrompt` where a `min-height` was unnecessarily being applied for vertical layouts ([#5763](https://github.com/elastic/eui/pull/5763))

## [`v54.0.0`](https://github.com/elastic/eui/releases/tag/v54.0.0)

- `EuiDataGrid` now allows limiting the number of visible cell actions with a new `columns.visibleCellActions` prop (defaults to 2). All additional actions will be shown in the cell expansion popover. ([#5675](https://github.com/elastic/eui/pull/5675))
- Added a new `gridStyle.rowClasses` API to `EuiDataGrid`, which allows adding custom classes/styling to specific row indices, primarily for the purpose of highlighting rows ([#5732](https://github.com/elastic/eui/pull/5732))
- Added `alert` icon indicator and `aria-invalid` when the following form controls are `isInvalid`: `EuiFieldNumber`, `EuiFieldPassword`, `EuiFieldText`, `EuiSelect`, `EuiSuperSelect`, `EuiFieldSearch`, `EuiColorPicker` ([#5738](https://github.com/elastic/eui/pull/5738))
- Added `isInvalid` prop to `EuiFormControlLayout` to render the `alert` icon ([#5738](https://github.com/elastic/eui/pull/5738))
- Added `isDropdown` prop to `EuiFormControlLayout` to create and control an `arrowDown` icon ([#5738](https://github.com/elastic/eui/pull/5738))
- Added `color` as to `EuiFormControlLayout`'s `icon` object ([#5738](https://github.com/elastic/eui/pull/5738))

**Bug fixes**

- Fixed `EuiSuperSelect` border-radius with `append` or `prepend` ([#5738](https://github.com/elastic/eui/pull/5738))
- Fixed `EuiSuperSelect` not respecting `readOnly` ([#5738](https://github.com/elastic/eui/pull/5738))
- Fixed `EuiDataGrid` cell focus sometimes not being restored for keyboard users when cell expansion popovers were closed ([#5761](https://github.com/elastic/eui/pull/5761))

**Breaking changes**

- Removed the `closePopover()` callback passed to `EuiDataGrid`'s `cellActions` render functions. Use `closeCellPopover()` passed by `EuiDataGrid`'s `ref` prop instead. ([#5734](https://github.com/elastic/eui/pull/5734))

**CSS-in-JS conversions**

- Converted `EuiAvatar` to CSS-in-JS styling ([#5670](https://github.com/elastic/eui/pull/5670))

## [`v53.0.2`](https://github.com/elastic/eui/releases/tag/v53.0.2)

**Note: this release is a backport containing changes originally made in `55.0.0`**

**Bug fixes**

- Fixed an `EuiDataGrid` bug occurring when closing cell popovers on clicking the originating cell. The original fix was unintentionally affecting cell popovers with nested modals, popovers, etc. ([#5797](https://github.com/elastic/eui/pull/5797))

## [`v53.0.1`](https://github.com/elastic/eui/releases/tag/v53.0.1)

**Bug fixes**

- Fixed `EuiContext.i18n`'s `mappingFunc` not being called for `EuiI18n`s with multiple tokens or function callbacks ([#5748](https://github.com/elastic/eui/pull/5748))
- Fixed poor rendering performance of `EuiIcon` when using a custom data URI `type` ([#5751](https://github.com/elastic/eui/pull/5751))

## [`v53.0.0`](https://github.com/elastic/eui/releases/tag/v53.0.0)

- Added all remaining missing i18n tokens for `EuiSuperDatePicker` ([#5743](https://github.com/elastic/eui/pull/5743))

**Breaking changes**

- Removed `prettyDuration` utility exported by `EuiSuperDatePicker` - this util was converted to a `PrettyDuration` component and `usePrettyDuration` hook which should be used instead ([#5743](https://github.com/elastic/eui/pull/5743))
- Removed `commonDurationRanges` exported by `EuiSuperDatePicker`. The new pretty duration utils will fall back to `commonDurationRanges` by default if no `quickRanges` are passed ([#5743](https://github.com/elastic/eui/pull/5743))

## [`v52.2.0`](https://github.com/elastic/eui/releases/tag/v52.2.0)

- Added `branchUser`, `desktop` and `sessionViewer` glyphs to `EuiIcon` ([#5740](https://github.com/elastic/eui/pull/5740))

## [`v52.1.0`](https://github.com/elastic/eui/releases/tag/v52.1.0)

- Added `anchor` prop to `EuiTourStep` to allow for DOM selector attachment ([#5696](https://github.com/elastic/eui/pull/5696))
- `EuiDataGrid` now forces `isExpandable` to be true if any `cellActions` are passed, as keyboard users are otherwise unable to access cell actions without the expansion popover ([#5710](https://github.com/elastic/eui/pull/5710))

**Bug fixes**

- Fixed EuiDataGrid not rerendering correctly on row heights change ([#5712](https://github.com/elastic/eui/pull/5712))
- Fixed `EuiContextMenu` requiring two tab keypresses to advance to the next focusable menu item ([#5719](https://github.com/elastic/eui/pull/5719))
- Fixed `EuiDataGrid` footer cell focus bugging out after moving its column ([#5720](https://github.com/elastic/eui/pull/5720))

## [`v52.0.0`](https://github.com/elastic/eui/releases/tag/v52.0.0)

- Added `editorChecklist` glyph to `EuiIcon` ([#5705](https://github.com/elastic/eui/pull/5705))
- Updated `testenv` mock for `EuiIcon` to render `aria-label` as text ([#5709](https://github.com/elastic/eui/pull/5709))
- Added `compressed` prop to `EuiFilterGroup` and reduced the size of the `EuiFilterButton` notification badge ([#5717](https://github.com/elastic/eui/pull/5717))
- Increased contrast of `EuiSelectableTemplateSitewide` input text when in dark header ([#5724](https://github.com/elastic/eui/pull/5724))

**Breaking changes**

- Removed Legacy theme including compiled CSS ([#5688](https://github.com/elastic/eui/pull/5688))
- Removed `flush` and `size` props in `EuiFilterButtonProps` ([#5717](https://github.com/elastic/eui/pull/5717))

**CSS-in-JS conversions**

- Converted `EuiMark` to CSS-in-JS styling ([#4575](https://github.com/elastic/eui/pull/4575))

## [`v51.1.0`](https://github.com/elastic/eui/releases/tag/v51.1.0)

- Updated `testenv` mock for `EuiFlyout` to include default `aria-label` on the close button ([#5702](https://github.com/elastic/eui/pull/5702))
- Changed the I18n token `euiDataGridToolbar.fullScreenButton` to `euiFullscreenSelector.fullscreenButton`, and its text to `Enter fullscreen` (with no space) ([#5680](https://github.com/elastic/eui/pull/5680))
- Changed the I18n token `euiDataGridToolbar.fullScreenButtonActive` to `euiFullscreenSelector.fullscreenButtonActive`, and its text to `Exit fullscreen` (with no space) ([#5680](https://github.com/elastic/eui/pull/5680))

**Bug fixes**

- Fixed type of `SharedRenderCellElementProps.schema` to be optional ([#5704](https://github.com/elastic/eui/pull/5704))
- Fixed generated type definition file referencing nonexistant Jest util ([#5704](https://github.com/elastic/eui/pull/5704))

## [`v51.0.0`](https://github.com/elastic/eui/releases/tag/v51.0.0)

- Enhanced `EuiSuggest` to fire the `onItemClick` callback on Enter key press as well as clicks ([#5693](https://github.com/elastic/eui/pull/5693))

**Bug fixes**

- Fixed non-searchable `EuiSelectable`s not selecting items with the Enter & Space keys ([#5693](https://github.com/elastic/eui/pull/5693))

**Breaking changes**

- Removed the `'all'` option in `EuiTablePagination.itemsPerPage` and `itemsPerPageOptions` in `EuiBasicTable` and `EuiDataGrid` due to Typescript issues. Use `0` instead to represent a "Show all" option ([#5699](https://github.com/elastic/eui/issues/5699))

## [`v50.0.0`](https://github.com/elastic/eui/releases/tag/v50.0.0)

- Updated `EuiComboBox` to WAI-ARIA 1.2 pattern and improved keyboard navigation ([#5636](https://github.com/elastic/eui/pull/5636))
- Added `readOnly` prop to `EuiMarkdownEditor` ([#5627](https://github.com/elastic/eui/pull/5627))
- Added support for supplying `breadcrumbs` and `breadcrumbProps` directly to `EuiPageHeader` ([#5634](https://github.com/elastic/eui/pull/5634))
- Extended props of `EuiBreadcrumb` to include `HTMLElement` and `color` inherited from `EuiLink` ([#5634](https://github.com/elastic/eui/pull/5634))
- Added `"xxl"` size to `EuiLoadingSpinner` ([#5668](https://github.com/elastic/eui/pull/5668))
- Added `isLoading` prop to `EuiButtonIcon` ([#5668](https://github.com/elastic/eui/pull/5668))
- Updated `EuiDataGrid` to allow setting individual cell `isExpandable` state via `setCellProps` ([#5667](https://github.com/elastic/eui/pull/5667))
- Added the ability for `EuiSelectable` and `EuiSuggest` to accept controlled `value` props ([#5658](https://github.com/elastic/eui/pull/5658))
- Added `textWrap` to `EuiSelectableListItem`, `EuiSelectableList`, and `EuiSelectable.listOptions` ([#5679](https://github.com/elastic/eui/issues/5679))
- Forced `truncation` on `EuiSuggest` items when `isVirtualize` ([#5679](https://github.com/elastic/eui/issues/5679))
- Changed proportion handling between content and image in `horizontal` `EuiEmptyPrompt` and added spacing between ([#5663](https://github.com/elastic/eui/pull/5663))
- Reduced SASS compilation time using a different math `pow` implementation ([#5674](https://github.com/elastic/eui/pull/5674))

**Bug fixes**

- Fixed `EuiDataGrid` cell props not resetting on column sort ([#5665](https://github.com/elastic/eui/issues/5665))
- Fixed `EuiDataGrid` not correctly closing cell popovers when the originating cell is clicked ([#5681](https://github.com/elastic/eui/pull/5681))
- Fixed `EuiSuggest` not correctly passing props to the search input ([#5658](https://github.com/elastic/eui/pull/5658))
- Fixed `EuiSelectable` incorrectly rendering the passed `id` prop on the listbox instead of the parent wrapper ([#5658](https://github.com/elastic/eui/pull/5658))
- Fixed `EuiSelectable` to no longer call `searchProps.onChange` when list items are clicked ([#5658](https://github.com/elastic/eui/pull/5658))
- Fixed `EuiSelectable` not respecting `searchProps.inputRef` ([#5658](https://github.com/elastic/eui/pull/5658))
- Fixed render of `EuiSelectableListItem` when no icons are present ([#5679](https://github.com/elastic/eui/issues/5679))
- Fixed render of `EuiSelectableTemplateSitewide` items when no icons are present ([#5679](https://github.com/elastic/eui/issues/5679))

**Breaking changes**

- Removed the `incremental` prop from `EuiSuggest` and `EuiSelectable`'s `searchProps` ([#5658](https://github.com/elastic/eui/pull/5658))
- Removed `EuiSelectable`'s `searchProps.onSearch` prop (since Enter keypresses do not trigger a search callback) - use `searchProps.onChange` instead ([#5658](https://github.com/elastic/eui/pull/5658))
- Renamed `EuiSuggest`'s `onInputChange` and `onSearchChange` callbacks to `onInput`/`onSearch` respectively, for consistency with our existing callback naming conventions ([#5658](https://github.com/elastic/eui/pull/5658))
- Removed `EuiSuggest`'s `isLoading` prop - use `status.loading` instead ([#5658](https://github.com/elastic/eui/pull/5658))

## [`v49.0.0`](https://github.com/elastic/eui/releases/tag/v49.0.0)

- Added new `renderCellPopover` prop to `EuiDataGrid` ([#5640](https://github.com/elastic/eui/pull/5640))
- Added cell `schema` info to `EuiDataGrid`'s `renderCellValue` props ([#5640](https://github.com/elastic/eui/pull/5640))
- Added `isLoading` prop to `EuiDualRange` ([#5648](https://github.com/elastic/eui/pull/5648))
- Added an `'all'` option to `EuiTablePagination.itemsPerPage` and `itemsPerPageOptions` to render a "Show all" option and updated `EuiBasicTable` and `EuiDataGrid` usages ([#5547](https://github.com/elastic/eui/issues/5547))

**Bug fixes**

- Fixed `EuiImage` images' width in small containers by adding `max-width: 100%` ([#5547](https://github.com/elastic/eui/issues/5547))
- Fixed `EuiTablePagination` layout in small containers by adding `wrap` ([#5547](https://github.com/elastic/eui/issues/5547))
- Fixed `EuiDataGrid` throwing a console error when grids without trailing control columns are sorted and then all columns are hidden ([#5635](https://github.com/elastic/eui/issues/5635))

**Breaking changes**

- Removed `popoverContents` props from `EuiDataGrid` (use new `renderCellPopover` instead) ([#5640](https://github.com/elastic/eui/pull/5640))
- Changed the `EuiTablePagination` prop `hidePerPageOptions` to the positive form `showPerPageOptions` ([#5547](https://github.com/elastic/eui/issues/5547))

## [`v48.1.1`](https://github.com/elastic/eui/releases/tag/v48.1.1)

- Added a `data-test-subj` attribute to `EuiDataGrid` cell expansion buttons ([#5643](https://github.com/elastic/eui/pull/5643))
- Added a `data-test-selected` attribute to `EuiSelectable` list options ([#5643](https://github.com/elastic/eui/pull/5643))

## [`v48.1.0`](https://github.com/elastic/eui/releases/tag/v48.1.0)

- Improved `EuiSelectable` keypress scenarios ([#5613](https://github.com/elastic/eui/pull/5613))
- Converted `FieldValueSelectionFilter` in `EuiSearchBar` to use `EuiSelectable` ([#5387](https://github.com/elastic/eui/issues/5387))
- Added `lineDashed`, `lineDotted`, and `lineSolid` glyphs to `EuiIcon` ([#5633](https://github.com/elastic/eui/pull/5633))
- Updated `colorMode` return type in theme context utilities ([#5639](https://github.com/elastic/eui/issues/5639))

## [`v48.0.0`](https://github.com/elastic/eui/releases/tag/v48.0.0)

- Refactored `EuiSuggest` to use `EuiSelectable` ([#5157](https://github.com/elastic/eui/pull/5157))
- Added a return type to `EuiTable` `resolveWidthAsStyle` util ([#5615](https://github.com/elastic/eui/pull/5615))
- Added a return type to `euiSelectableTemplateSitewideFormatOptions` util ([#5620](https://github.com/elastic/eui/pull/5620))

**Bug fixes**

- Fixed `EuiDataGrid` to correctly remove the cell expansion action button when a column sets both `cellActions` and `isExpandable` to false ([#5592](https://github.com/elastic/eui/pull/5592))
- Fixed `EuiDataGrid` re-playing the cell actions animation when hovering over an already-focused cell ([#5592](https://github.com/elastic/eui/pull/5592))
- Fixed `EuiDataGrid` auto row heights bugging out when cell popovers are opened ([#5622](https://github.com/elastic/eui/pull/5622))

**Breaking changes**

- Removed `EuiSuggestInput` ([#5157](https://github.com/elastic/eui/pull/5157))
- Required `aria-label` or `aria-labelledby` for `EuiSuggest` ([#5157](https://github.com/elastic/eui/pull/5157))
- Renamed `sendValue` prop to `onSearchChange` for `EuiSuggest` ([#5157](https://github.com/elastic/eui/pull/5157))

## [`v47.0.0`](https://github.com/elastic/eui/releases/tag/v47.0.0)

- Added support for React 17 (this is a backwards compatible change - React 16.12+ is still supported for consuming applications) ([#5584](https://github.com/elastic/eui/pull/5584))
- Added the ability to control internal `EuiDataGrid` fullscreen, cell focus, and cell popover state via the `ref` prop ([#5590](https://github.com/elastic/eui/pull/5590))
- Added `paddingSize` prop to `EuiSelectableList` ([#5581](https://github.com/elastic/eui/pull/5581))
- Added `errorMessage` prop to `EuiSelectable` ([#5581](https://github.com/elastic/eui/pull/5581))
- Refactored `EuiSelectable` accessibility ([#5581](https://github.com/elastic/eui/pull/5581))
- Updated `tokenTag` design to look more like a tag ([#5553](https://github.com/elastic/eui/pull/5553))
- Lowered border radius of `.euiToken--square` to look more like a square ([#5553](https://github.com/elastic/eui/pull/5553))

**Bug fixes**

- Fixed `EuiInMemoryTable`'s `onTableChange` callback not returning the correct `sort.field` value on pagination ([#5588](https://github.com/elastic/eui/pull/5588))
- Fixed `EuiFilePicker` allowing files to be removed when `disabled` ([#5603](https://github.com/elastic/eui/pull/5603))

**Breaking changes**

- Upgraded TypeScript version to ~4.5.3 ([#5591](https://github.com/elastic/eui/pull/5591))

## [`v46.2.0`](https://github.com/elastic/eui/releases/tag/v46.2.0)

- Updated `EuiDataGrid`s with scrolling content to always have a border around the grid body and any scrollbars ([#5563](https://github.com/elastic/eui/pull/5563))
- Updated `EuiDataGrid`'s body to a light gray background, which primarily shows when scrolling through virtualized content ([#5562](https://github.com/elastic/eui/pull/5562))
- Added referenceable `id` for the generated label in `EuiFormRow` ([#5574](https://github.com/elastic/eui/pull/5574))
- Addeed optional attribute configurations in `EuiPopover` to aid screen reader announcements ([#5574](https://github.com/elastic/eui/pull/5574))
- Added `ref` passthroughs to `EuiIputPopover` subcomponents ([#5574](https://github.com/elastic/eui/pull/5574))
- Added `EuiScreenReaderLive` component for updateable `aria-live` regions ([#5567](https://github.com/elastic/eui/pull/5567))

**Bug fixes**

- Fixed an accessibility issue where `EuiComboBoxPill` close button had a nested interactive element ([#5560](https://github.com/elastic/eui/pull/5560))
- Fixed EuiDataGrid height issue when in full-screen mode and with scrolling content ([#5557](https://github.com/elastic/eui/pull/5557))
- Fixed an accessibility issue in custom and interactive Drag and Drop patterns ([#5568](https://github.com/elastic/eui/pull/5568))
- Fixed a focus bug in `EuiDataGrid` when clicking another cell header with an already-open cell header popover ([#5556](https://github.com/elastic/eui/pull/5556))
- Fixed `EuiDataGrid` to always focus back into the grid on pagination ([#5587](https://github.com/elastic/eui/pull/5587))
- Fixed `EuiDataGrid` and `EuiTable` pagination potentially rendering out view on narrow tables with many pages ([#5561](https://github.com/elastic/eui/pull/5561))

## [`v46.1.1`](https://github.com/elastic/eui/releases/tag/v46.1.1)

**Note: this release is a backport containing changes originally made in `46.2.0`**

**Bug fixes**

- Fixed `EuiDataGrid` height issue when in full-screen mode and with scrolling content ([#5557](https://github.com/elastic/eui/pull/5557))
- Fixed a focus bug in `EuiDataGrid` when clicking another cell header with an already-open cell header popover ([#5556](https://github.com/elastic/eui/pull/5556))
- Fixed `EuiDataGrid` to always focus back into the grid on pagination ([#5587](https://github.com/elastic/eui/pull/5587))
- Fixed `EuiDataGrid` and `EuiTable` pagination potentially rendering out view on narrow tables with many pages ([#5561](https://github.com/elastic/eui/pull/5561))

## [`v46.1.0`](https://github.com/elastic/eui/releases/tag/v46.1.0)

- Added `sun` glyph to `EuiIcon` ([#5548](https://github.com/elastic/eui/pull/5548))
- Updated styles in `EuiDescriptionList` of `type` inline ([#5534](https://github.com/elastic/eui/pull/5534))

## [`v46.0.0`](https://github.com/elastic/eui/releases/tag/v46.0.0)

- **[Beta]** Added `optimize` build as a lighter weight option more suited to production environments ([#5527](https://github.com/elastic/eui/pull/5527))
- Added `lettering` glyph to `EuiIcon` ([#5525](https://github.com/elastic/eui/pull/5525))
- Updated the outline color in `euiCustomControlFocused` mixin to use `$euiFocusRingColor` instead of `currentColor` ([#5479](https://github.com/elastic/eui/pull/5479))
- Added `betaBadgeTooltipProps` to `EuiKeyPadMenuItem` to extend the wrapping `EuiToolTip` ([#5541](https://github.com/elastic/eui/pull/5541))
- Added `globalStyles` prop to `EuiProvider` to allow for global style customization ([#5497](https://github.com/elastic/eui/pull/5497))
- Exported `EuiGlobalStyles` component ([#5497](https://github.com/elastic/eui/pull/5497))

**Bug fixes**

- Updated the outline color in `euiCustomControlFocused` mixin to use `$euiFocusRingColor` instead of `currentColor` ([#5479](https://github.com/elastic/eui/pull/5479))
- Fixed keyboard navigation in `EuiDataGrid` not fully scrolling cells into view ([#5515](https://github.com/elastic/eui/pull/5515))
- Fixed `EuiKeyPadMenuItem` accessibility issue where there was a nested focusable element ([#5541](https://github.com/elastic/eui/pull/5541))

**Deprecations**

- Deprecated `data-gridcell-id` from `EuiDataGrid` in favor of 4 new and more flexible props - `data-gridcell-column-id`, `data-gridcell-column-index`, `data-gridcell-row-index`, and `data-gridcell-visible-row-index` ([#5515](https://github.com/elastic/eui/pull/5515))

**Breaking changes**

- `EuiKeyPadMenuItem` now wraps itself with `EuiToolTip` when `betaBadgeLabel` is supplied forcing top element style props to be passed via `betaBadgeTooltipProps` ([#5541](https://github.com/elastic/eui/pull/5541))
- Changed `data-gridcell-id` in `EuiDataGrid` to the inverse index order: `[columnIndex],[rowIndex]` ([#5515](https://github.com/elastic/eui/pull/5515))

## [`v45.0.0`](https://github.com/elastic/eui/releases/tag/v45.0.0)

- Added virtulized rendering option to `EuiSelectableList` with `isVirtualized` ([#5521](https://github.com/elastic/eui/pull/5521))
- Added expanded option properties to `EuiSelectableOption` with `data` ([#5521](https://github.com/elastic/eui/pull/5521))

**Bug fixes**

- Fixed multiple bugs with `EuiDataGrid` keyboard focus restoration ([#5530](https://github.com/elastic/eui/pull/5530))
- Fixed `EuiDataGrid`'s display toolbar control to update initial UI state when developer `gridStyle` or `rowHeightsOptions` props are updated ([#5525](https://github.com/elastic/eui/pull/5525))

**Breaking changes**

- Changed `EuiSearchBar` to preserve phrases with leading and trailing spaces, instead of dropping surrounding whitespace ([#5514](https://github.com/elastic/eui/pull/5514))
- Removed `data-test-subj="dataGridWrapper"`  from `EuiDataGrid` in favor of `data-test-subj="euiDataGridBody"` ([#5506](https://github.com/elastic/eui/pull/5506))

## [`v44.0.0`](https://github.com/elastic/eui/releases/tag/v44.0.0)

**Bug fixes**

- Fixed a `EuiDataGrid` sizing bug which didn't account for a horizontal scrollbar ([#5478](https://github.com/elastic/eui/pull/5478))
- Fixed a `EuiDatePicker` a11y bug where axe-core reported missing ARIA and role attributes ([#5501](https://github.com/elastic/eui/pull/5501))
- Fixed `EuiModalHeaderTitle` to conditionally wrap title strings in an H1 ([#5494](https://github.com/elastic/eui/pull/5494))
- Fixed a `EuiDataGrid` issue where a focused cell would lose focus when scrolled out of and back into view ([#5488](https://github.com/elastic/eui/pull/5488))
- Fixed an `EuiDatePicker` accessibility issue where `tabindex` was not applied to a listbox element ([#5509](https://github.com/elastic/eui/pull/5509))

**Deprecations**

- Deprecated `PartitionConfig` in favor of inclusion in Charts `theme.partition` ([#5492](https://github.com/elastic/eui/pull/5492))

**Breaking changes**

- Removed `popoverClassName` and `repositionOnScroll` props from `EuiSuperSelect` (use `popoverProps` instead) ([#5512](https://github.com/elastic/eui/pull/5512))
