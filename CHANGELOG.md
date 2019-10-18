## [`master`](https://github.com/elastic/eui/tree/master)

- Converted `EuiRadio` and `EuiRadioGroup` to TypeScript ([#2438](https://github.com/elastic/eui/pull/2438))
- Improved a11y in `EuiImage` ([#2447](https://github.com/elastic/eui/pull/2447))
- Made EuiIcon a PureComponent, to speed up React re-render performance ([#2448](https://github.com/elastic/eui/pull/2448))
- Added ability for `EuiColorStops` to accept user-defined range bounds ([#2396](https://github.com/elastic/eui/pull/2396))
- Added `external` prop to `EuiLink` ([#2442](https://github.com/elastic/eui/pull/2442))
- Added disabled state to `EuiBadge` ([#2440](https://github.com/elastic/eui/pull/2440))

**Bug fixes**

- Reenabled `width` property for `EuiTable` cell components ([#2452](https://github.com/elastic/eui/pull/2452))

## [`14.6.0`](https://github.com/elastic/eui/tree/v14.6.0)

- Added new updated `infraApp` and `logsApp` icons. ([#2430](https://github.com/elastic/eui/pull/2430))

**Bug fixes**

- Fixed missing misc. button and link type definition exports ([#2434](https://github.com/elastic/eui/pull/2434))
- Strip custom semantics from `EuiSideNav` ([#2429](https://github.com/elastic/eui/pull/2429))

## [`14.5.0`](https://github.com/elastic/eui/tree/v14.5.0)

- Update Elastic-Charts to version 13.0.0 and updated the theme object accordingly ([#2381](https://github.com/elastic/eui/pull/2381))
- Added new `EuiColorStops` component ([#2360](https://github.com/elastic/eui/pull/2360))
- Added `currency` glyph to 'EuiIcon' ([#2398](https://github.com/elastic/eui/pull/2398))
- Migrate `EuiBreadcrumbs`, `EuiHeader` etc, and `EuiLink` to TypeScript ([#2391](https://github.com/elastic/eui/pull/2391))
- Added `hasChildLabel` prop to `EuiFormRow` to avoid duplicate labels ([#2411](https://github.com/elastic/eui/pull/2411))
- Added `component` prop to `EuiPageBody`, switching the default from `div` to `main` ([#2410](https://github.com/elastic/eui/pull/2410))
- Added focus state to `EuiListGroupItem` ([#2406](https://github.com/elastic/eui/pull/2406))
- Added `keyboardShorcut` glyph to 'EuiIcon ([#2413](https://github.com/elastic/eui/pull/2413))
- Improved a11y in `EuiNavDrawer` ([#2417](https://github.com/elastic/eui/pull/2417))
- Improved a11y in `EuiSuperDatePicker` ([#2426](https://github.com/elastic/eui/pull/2426))

**Bug fixes**

- Fixed `EuiSelectable` to accept programmatic updates to its `options` prop ([#2390](https://github.com/elastic/eui/pull/2390))
- Fixed poor labeling in `EuiSuperDatePicker` ([#2411](https://github.com/elastic/eui/pull/2411))
- Fixed `EuiCodeEditor`'s ID to be dynamic between renders ([#2411](https://github.com/elastic/eui/pull/2411))
- Fixed `EuiCodeEditor` to not render multiple labels for some inputs ([#2411](https://github.com/elastic/eui/pull/2411))
- Fixed `EuiBreadcrumbs` improper use of `useInnerText` hook ([#2425](https://github.com/elastic/eui/pull/2425))

## [`14.4.0`](https://github.com/elastic/eui/tree/v14.4.0)

- Migrate `EuiEmptyPrompt`and `EuiCard` to TS ([#2387](https://github.com/elastic/eui/pull/2387))
- Added Lens app `lensApp` icon ([#2389](https://github.com/elastic/eui/pull/2389))
- Made `EuiKeyPadMenuItem` beta badge smaller ([#2388](https://github.com/elastic/eui/pull/2388))

## [`14.3.0`](https://github.com/elastic/eui/tree/v14.3.0)

- Added `package` icon to glyph set ([#2378](https://github.com/elastic/eui/pull/2378))
- Modified `EuiFacetButton` to use `$euiFocusBackgroundColor` for `:focus` state ([2365](https://github.com/elastic/eui/pull/2365))
- Added a `showMaxPopover` option for `EuiBreadcrumbs` to display all items when a `max` is set. ([#2342](https://github.com/elastic/eui/pull/2342))
- Added `data-test-subj` support for basic and in-memory tables' actions ([#2353](https://github.com/elastic/eui/pull/2353))
- Added `ip` icon to glyph set ([#2371](https://github.com/elastic/eui/pull/2371))
- Set `textOnly={true}` for expanded rows in `EuiBasicTable` ([#2376](https://github.com/elastic/eui/pull/2376))
- Added `visAreaStacked`, `visBarVerticalStacked`, and `visBarHorizontalStacked` icons to glyph set ([#2379](https://github.com/elastic/eui/pull/2379))
- Adjusted style of beta badge on `EuiKeyPadMenuItem` ([#2375](https://github.com/elastic/eui/pull/2375))
- Migrate `EuiFacetGroup`, `EuiKeyPadMenu` and `EuiCallOut` to TS ([#2382](https://github.com/elastic/eui/pull/2382))

**Bug fixes**

- Fixed spacing of `EuiFormErrorText` to match `EuiFormHelpText` ([#2354](https://github.com/elastic/eui/pull/2354))
- Fixed bug in `EuiPopover` where Array.prototype.slice() may have been called on 'undefined' ([#2369](https://github.com/elastic/eui/pull/2369))
- Properly exported `copy`, `move`, and `reorder` drag-and-drop service methods ([#2377](https://github.com/elastic/eui/pull/2377))

## [`14.2.0`](https://github.com/elastic/eui/tree/v14.2.0)

- Added `compressed` option to `buttonSize` prop of EuiButtonGroup ([#2343](https://github.com/elastic/eui/pull/2343))
- Added disabled states to `EuiCard`, `EuiKeyPadMenuItem` and `EuiKeyPadMenuItemButton`
 ([#2333](https://github.com/elastic/eui/pull/2340))
- Added missing `compressed` TS definitions to `EuiComboBox`, `EuiCheckboxGroup`, `EuiCheckbox`, `EuiFieldSearch`, `EuiRadioGroup`, `EuiSwitch` ([#2338](https://github.com/elastic/eui/pull/2338))
- Added auto-margin between `EuiFormRow` and `EuiButton` ([#2338](https://github.com/elastic/eui/pull/2338))
- Added border to `[readOnly]` inputs ([#2338](https://github.com/elastic/eui/pull/2338))

**Bug fixes**

- Fixed `onChange` TS defs for EuiRange ([#2349](https://github.com/elastic/eui/pull/2349))
- Fixed default z-index of `EuiPopover` ([#2341](https://github.com/elastic/eui/pull/2341))
- Fixed styling for `prepend` and `append` nodes that may be popovers or tooltips ([#2338](https://github.com/elastic/eui/pull/2338))

## [`14.1.1`](https://github.com/elastic/eui/tree/v14.1.1)

**Bug fixes**

- Fixed accidental removal of Elastic Charts from dependencies ([#2348](https://github.com/elastic/eui/pull/2348))

## [`14.1.0`](https://github.com/elastic/eui/tree/v14.1.0)

- Created `EuiSuggest` component ([#2270](https://github.com/elastic/eui/pull/2270))
- Added missing `compressed` styling to `EuiSwitch` ([#2327](https://github.com/elastic/eui/pull/2327))
- Migrate `EuiBottomBar`, `EuiHealth` and `EuiImage` to TS ([#2328](https://github.com/elastic/eui/pull/2328))
- Added hover and focus states when `allowFullScreen` is true in `EuiImage`([#2287](https://github.com/elastic/eui/pull/2287))
- Converted `EuiColorPicker` to TypeScript ([#2340](https://github.com/elastic/eui/pull/2340))
- Added inline rendering option to `EuiColorPicker` ([#2340](https://github.com/elastic/eui/pull/2340))

## [`14.0.0`](https://github.com/elastic/eui/tree/v14.0.0)

### Feature: Compressed Form Controls ([#2167](https://github.com/elastic/eui/pull/2167))

- Altered the look of `compressed` form controls to look more subtle
- Created `EuiFormControlLayoutDelimited` for dual inputs indicating a range
- Added compressed and column style layouts to `EuiFormRow` via `display` prop
- Reduced overall height of `compressed` `EuiRange` and `EuiDualRange`
- Added `showInput = 'inputWithPopover'` option for `compressed` `EuiRange` and `EuiDualRange` to display the slider in a popover

- Made all inputs in the `EuiSuperDatePicker` popover `compressed`
- Added `controlOnly` prop to `EuiFieldText` and `EuiFieldNumber`
- Allow `style` prop to be passed down in `EuiColorPickerSwatch`
- `EuiFilePicker` now has `default` and `large` display sizes that both have `compressed` alternatives
- Allow strings to be passed as `append`/`prepend` props and added a11y support
- Added a max height with overflow to `EuiSuperSelect`

**Bug fixes**

- Fixed `EuiColorPicker` padding on right to accomodate down caret
- Fixed sizings of `EuiComboBox` and pills
- Fixed truncation on `EuiContextMenuItem`
- Fixed style of more `append`/`prepend` options of `EuiFormControlLayout`

**Deprecations**

- `EuiFormRow`'s `compressed` prop deprecated in favor of `display: rowCompressed`
- `EuiFormRow`'s `displayOnly` prop deprecated in favor of `display: center`

**Breaking changes**

- SASS mixin `euiTextOverflowWrap()` has been removed in favor of `euiTextBreakWord()`
- `EuiFormLabel` no longer has a bottom margin
- `EuiFormRow` no longer has bottom padding, nor does it add margin to any `+ *` siblings only sibling `EuiFormRow`s

## [`13.8.2`](https://github.com/elastic/eui/tree/v13.8.2)

**Bug fixes**

- Corrected `EuiCodeBlock`'s proptype for `children` to be string or array of strings. ([#2324](https://github.com/elastic/eui/pull/2324))
- Fixed `onClick` TypeScript definition for `EuiPanel` ([#2330](https://github.com/elastic/eui/pull/2330))
- Fixed `EuiComboBox` list reopening after closing on option selection in IE11 ([#2326](https://github.com/elastic/eui/pull/2326))

## [`13.8.1`](https://github.com/elastic/eui/tree/v13.8.1)

**Bug fixes**

- Updated TS def for `EuiFilterSelect` ([#2291](https://github.com/elastic/eui/pull/2291))
- Fixed alignment of icons and label in `EuiSideNavItem` ([#2297](https://github.com/elastic/eui/pull/2297))
- Fixed logic in `EuiContextMenu` to account for index of `0` ([#2304](https://github.com/elastic/eui/pull/2304))

## [`13.8.0`](https://github.com/elastic/eui/tree/v13.8.0)

- Added href prop to `EuiTab` and converted to TypeScript ([#2275](https://github.com/elastic/eui/pull/2275))
- Created `EuiInputPopover` component (formally) ([#2269](https://github.com/elastic/eui/pull/2269))
- Added docs for using [Elastic Charts](https://elastic.github.io/elastic-charts) with EUI ([#2209](https://github.com/elastic/eui/pull/2209))
- Improved fix for `EuiSuperDatePicker` to update `asyncInterval.isStopped` on a `isPaused` prop change. ([#2298](https://github.com/elastic/eui/pull/2298))

**Bug fixes**

- Removed extra right side margin in `EuiSuperDatePicker` ([#2236](https://github.com/elastic/eui/pull/2236))
- Fixed incorrect `onClick` type for `EuiButtonEmpty` ([#2282](https://github.com/elastic/eui/pull/2282))
- Fixed compilation script to remove all TypeScript definition exports from built JS assets ([#2279](https://github.com/elastic/eui/pull/2279))
- Fixed output extension for `dist` charts theme module ([#2294](https://github.com/elastic/eui/pull/2294))

## [`13.7.0`](https://github.com/elastic/eui/tree/v13.7.0)

- Allow `EuiFlexGroup` to accept a `ref` ([#2223](https://github.com/elastic/eui/pull/2223))

**Bug fixes**

- Fixed `EuiSuperDatePicker` to update `asyncInterval.isStopped` on a `isPaused` prop change. ([#2250](https://github.com/elastic/eui/pull/2250))
- Converted table, popover, buttons, pagination, outside click detector, focus trap, context menu, and panel to TypeScript ([#2212](https://github.com/elastic/eui/pull/2212))
- Fixed `EuiStat` invalid DOM nesting due to a `<p>` tag nested within another `<p>` tag ([#2229](https://github.com/elastic/eui/pull/2229))
- Fixed title text of dock/undock icon in `EuiNavDrawer` ([#2261](https://github.com/elastic/eui/pull/2261))

**Reverts**

- Revert conversion of `EuiSwitch` to `button[role=switch]` and TypeScript ([#2255](https://github.com/elastic/eui/pull/2255))

## [`13.6.1`](https://github.com/elastic/eui/tree/v13.6.1)

**Note: this release is a backport containing changes originally made in `13.7.0`**

**Bug fixes**

- Fixed title text of dock/undock icon in `EuiNavDrawer` ([#2261](https://github.com/elastic/eui/pull/2261))

## [`13.6.0`](https://github.com/elastic/eui/tree/v13.6.0)

**Note: this contains a reversion backported for targeted release**

- Revert conversion of `EuiSwitch` to `button[role=switch]` and TypeScript ([#2255](https://github.com/elastic/eui/pull/2255))

## [`13.5.0`](https://github.com/elastic/eui/tree/v13.5.0)

**Note: this contains component code that was reverted in the next release. Use `13.6.0` instead**

- Fixed `logoCloudEnterprise`, `logoLogging`, and `logoSecurity` SVGs in `EuiIcon` to be center aligned ([#2246](https://github.com/elastic/eui/pull/2246))
- Added locking behavior of `EuiNavDrawer` expanded state inluding the following props `isLocked`, `onIsLockedUpdate` ([#2247](https://github.com/elastic/eui/pull/2247))

## [`13.4.1`](https://github.com/elastic/eui/tree/v13.4.1)

**Note: this contains component code that was later reverted. Use `13.6.0` instead**

- Converted `EuiSwitch` to TypeScript ([#2243](https://github.com/elastic/eui/pull/2243))

**Bug fixes**

- Added missing `viewBox` attribute to Docker, Kubernetes, and Redis logos ([#2240](https://github.com/elastic/eui/pull/2240))

## [`13.4.0`](https://github.com/elastic/eui/tree/v13.4.0)

**Note: this contains component code that was later reverted. Use `13.6.0` instead**

- Converted `EuiFacetButton` to TypeScript ([#2226](https://github.com/elastic/eui/pull/2226))
- Added an optional `onClear` prop to the the `EuiDatePicker` component ([#2235](https://github.com/elastic/eui/pull/2235))
- Added support for `onClick` and `href` props on `EuiListGroupItem` and converted to TypeScript ([#1933](https://github.com/elastic/eui/pull/1933))

**Bug fixes**

- Fixed `EuiSwitch` semantics to align with aria roles ([#2193](https://github.com/elastic/eui/pull/2193))
- Removed Firefox's focus ring to match other browsers ([#2193](https://github.com/elastic/eui/pull/2193))
- Added missing `onChange` TS defs for EuiRange ([#2211](https://github.com/elastic/eui/pull/2211))
- Fixed `EuiBadge` text cursor to default pointer ([#2234](https://github.com/elastic/eui/pull/2234))
- Fixed `EuiPageContent` className prop to allow the passed-in className to take cascade precedence over classes generated by the component ([#2237](https://github.com/elastic/eui/pull/2237))

## [`13.3.0`](https://github.com/elastic/eui/tree/v13.3.0)

- Added i18n tokens to `EuiSuperDatePicker` and `EuiSuperUpdateButton`

## [`13.2.0`](https://github.com/elastic/eui/tree/v13.2.0)

- Converted `EuiStep`, `EuiSteps`, `EuiStepHorizontal`, `EuiStepsHorizontal`, and `EuiSubSteps` to Typescript ([#2186](https://github.com/elastic/eui/pull/2186))

**Bug fixes**

- Fixed `EuiBadge` truncation and auto-applied `title` attribute with `innerText` ([#2190](https://github.com/elastic/eui/pull/2190))
- Remove exported TypeScript type and interface exports from built artifacts when they originate from `node_modules` ([#2191](https://github.com/elastic/eui/pull/2191))
- Fixed `EuiBadge` truncation in IE and for the global filters pattern ([#2194](https://github.com/elastic/eui/pull/2194))
- Fixed alignment of long titles in `EuiStep` ([#2186](https://github.com/elastic/eui/pull/2186))
- Fixed the TS defs for EuiFilterSelectItem ([#2192](https://github.com/elastic/eui/pull/2192))
- Added missing TS defs for EuiTextArea ([#2201](https://github.com/elastic/eui/pull/2201))

## [`13.1.1`](https://github.com/elastic/eui/tree/v13.1.1)

**Bug fixes**

- Fixed `EuiMutationObserver` errors in IE11 by conditionally setting the `attributes` observer option according to the new spec ([#2180](https://github.com/elastic/eui/pull/2180))
- Fixed error message when an I18n mapping is a formatting function with no values provided. ([#2182](https://github.com/elastic/eui/pull/2182))

## [`13.1.0`](https://github.com/elastic/eui/tree/v13.1.0)

- Added `partial` glyph to `EuiIcon` ([#2152](https://github.com/elastic/eui/pull/2152))
- Added `tall`, `fullWidth`, and `isInvalid` props to `EuiFilePicker` ([#2145](https://github.com/elastic/eui/pull/2145))
- Added exports for `react-beautiful-dnd` interfaces used by EUI components ([#2173](https://github.com/elastic/eui/pull/2173))
- Added `isDisabled` prop & styles to `EuiSuperDatePicker` ([#2139](https://github.com/elastic/eui/pull/2139))
- Added `responsiveColumn` option to `type` prop of `EuiDescriptionList` ([#2166](https://github.com/elastic/eui/pull/2166))
- Removed `<use>` and `<def>` from svg icons ([#2162](https://github.com/elastic/eui/pull/2162))

**Bug fixes**

- Fixed invalid `aria-desribedby` values set by `EuiToolTip` ([#2156](https://github.com/elastic/eui/pull/2156))
- Added `"center"` as an acceptable value to `EuiBasicTable`'s `align` proptype ([#2158](https://github.com/elastic/eui/pull/2158))
- Fixed `.eui-textBreakWord` utility class to be cross-browser compatible ([#2157](https://github.com/elastic/eui/pull/2157))
- Fixed truncation and z-index of `EuiFilePicker` ([#2145](https://github.com/elastic/eui/pull/2145))
- Fixed `EuiNavDrawer`'s support for flyout groups in production/minified builds ([#2178](https://github.com/elastic/eui/pull/2178))
- Fixed width overflow of `EuiModal` ([#2164](https://github.com/elastic/eui/pull/2164))

## [`13.0.0`](https://github.com/elastic/eui/tree/v13.0.0)

- Added `EuiSuggestItem` component ([#2090](https://github.com/elastic/eui/pull/2090))
- Added support for negated or clauses to `EuiSearchBar` ([#2140](https://github.com/elastic/eui/pull/2140))
- Added `transition` utility services to help create timeouts that account for CSS transition durations and delays ([#2136](https://github.com/elastic/eui/pull/2136))
- Removed `EuiFlexGroup` dependency from `EuiAccordion` ([#2143](https://github.com/elastic/eui/pull/2143))
- Exported `prettyDuration` and `commonDurationRanges` for pretty printing date ranges outside `EuiSuperDatePicker` ([#2132](https://github.com/elastic/eui/pull/2132))

**Bug fixes**

- Fixed `EuiComboBox`'s padding on the right ([#2135](https://github.com/elastic/eui/pull/2135))
- Fixed `EuiAccordion` to correctly account for changing computed height of child elements ([#2136](https://github.com/elastic/eui/pull/2136))
- Fixed some `EuiFlyout` sizing ([#2125](https://github.com/elastic/eui/pull/2125))

**Breaking changes**

- Removed `EuiSeriesChart` and related components. Please look to [Elastic Charts](https://github.com/elastic/elastic-charts) for a replacement. ([#2135](https://github.com/elastic/eui/pull/2108))
- Removed `eui_k6_theme` related Sass and JSON files ([#2135](https://github.com/elastic/eui/pull/2108))
- Removed no longer used Sass mixins and variables in `EuiForm`, `EuiCallOut`, and `EuiRange` components ([#2135](https://github.com/elastic/eui/pull/2108))

## [`12.4.0`](https://github.com/elastic/eui/tree/v12.4.0)

- Centered the square of the `popout` glyph in the artboard ([#2120](https://github.com/elastic/eui/pull/2120))
- Added `useInnerText` and `EuiInnerText` component utilities for retrieving text content of elements ([#2100](https://github.com/elastic/eui/pull/2100))
- Converted `EuiRangeHightlight`, `EuiRangeLabel`, `EuiRangeLevels`, `EuiRangeSlider`, `EuiRangeThumb`, `EuiRangeTicks`, `EuiRangeTrack`, and `EuiRangeWrapper` to TypeScript ([#2124](https://github.com/elastic/eui/pull/2124))
- Converted `EuiAccordion` to TypeScript ([#2128](https://github.com/elastic/eui/pull/2128))

**Bug fixes**

- Fixed `EuiComboBox`'s options list from staying open when scrolled in a container by auto-closing the list on scroll ([#2106](https://github.com/elastic/eui/pull/2106))
- Fixed content provided to `EuiListGroupItem` and `EuiFilterButton` `title` attribute to prevent unreadable popover ([#2100](https://github.com/elastic/eui/pull/2100))
- Fixed a nearly infinite `requestAnimationFrame` loop caused by `focus` state changes in nested `EuiPopover` components ([#2110](https://github.com/elastic/eui/pull/2110))
- Fixed incorrect ES Query DSL generated by `EuiSearchBar` when an OR clause is present ([#2133](https://github.com/elastic/eui/pull/2133))

## [`12.3.1`](https://github.com/elastic/eui/tree/v12.3.1)

**Bug fixes**

- Restored missing scss and react-datepicker files to the npm-published packaged ([#2119](https://github.com/elastic/eui/pull/2119))

## [`12.3.0`](https://github.com/elastic/eui/tree/v12.3.0)

**Note: this release contained a change which prevented necessary files from being published to npm, this was fixed in 12.3.1**

- Added `logoSecurity`, `logoCode`, `logoMaps`, `logoUptime` and `logoLogging` to `EuiIcon` types ([#2111](https://github.com/elastic/eui/pull/2111))
- Added a `column` direction option to `EuiFlexGrid` ([#2073](https://github.com/elastic/eui/pull/2073))
- Updated `EuiSuperDatePicker`'s  commonly used date/times to display as columns. ([#2073](https://github.com/elastic/eui/pull/2073))
- Added TypeScript definition for `EuiFormControlLayout` ([#2086](https://github.com/elastic/eui/pull/2086))
- Changed SASS mixin `euiOverflowShadow()` to use `mask-image` instead of `box-shadow` ([#2088](https://github.com/elastic/eui/pull/2088))
- Added SASS mixin and CSS utility `euiYScrollWithShadows` ([#2088](https://github.com/elastic/eui/pull/2088))
- Added `cloudDrizzle`, `cloudStormy`, `cloudSunny`, `documents`, `documentEdit`, `training` and `videoPlayer` glyphs to `EuiIcon` ([#2102](https://github.com/elastic/eui/pull/2102))
- Added `display` prop to `EuiPopover` ([#2112](https://github.com/elastic/eui/pull/2112))

**Bug fixes**

- Widened `EuiComboBox`'s `options[].value` / `EuiComboBoxOptionProps.value` TypeScript definition ([#2080](https://github.com/elastic/eui/pull/2080))
- Added TS defs for `EuiComboBox`'s props spreading onto a `div` ([#2080](https://github.com/elastic/eui/pull/2080))
- Fixed responsive display of inline `EuiDatePicker` ([#1820](https://github.com/elastic/eui/pull/1820))
- Removed time from default `dateFormat` of `EuiDatePicker` ([#1820](https://github.com/elastic/eui/pull/1820))
- Fixed `EuiPopover` from catching and preventing propagation of keydown events when closed ([#2089](https://github.com/elastic/eui/pull/2089))
- Fixed padding sizes between `EuiModal` header, body, and footer ([#2088](https://github.com/elastic/eui/pull/2088))
- Fixed placeholder text color for more browsers ([#2113](https://github.com/elastic/eui/pull/2113))

**Deprecations**

- Removed `logoXpack`from `EuiIcon` types ([#2111](https://github.com/elastic/eui/pull/2111))

## [`12.2.1`](https://github.com/elastic/eui/tree/v12.2.1)

**Note: this release is a backport containing changes originally made in `12.4.0`**

**Bug fixes**

- Fixed a nearly infinite `requestAnimationFrame` loop caused by `focus` state changes in nested `EuiPopover` components ([#2110](https://github.com/elastic/eui/pull/2110))

## [`12.2.0`](https://github.com/elastic/eui/tree/v12.2.0)

- Made `aria-label` attribute equal to `title` of the the selection checkbox in table items (for each row) in `EuiBasicTable` ([#2043](https://github.com/elastic/eui/pull/2043))
- Updated `appApm` and `logoAPM` with new updated icons ([#2084](https://github.com/elastic/eui/pull/2084))

**Bug fixes**

- Added requirement that `EuiFormRow` has exactly one child element [#2054](https://github.com/elastic/eui/pull/2054)

## [`12.1.0`](https://github.com/elastic/eui/tree/v12.1.0)

- Changed `EuiNavDrawerFlyout` title from `h5` to `div` ([#2040](https://github.com/elastic/eui/pull/2040))
- Converted `EuiGlobalToastList` into ARIA live region by adding `role="region"` attribute to add NVDA/JAWS support ([#2055](https://github.com/elastic/eui/pull/2055))
- Added `magnifyWithMinus` and `magnifyWithPlus` glyphs to `EuiIcon` ([2056](https://github.com/elastic/eui/pull/2056))
- Added a fully black (no matter the theme) color SASS variable `$euiColorInk` ([2060](https://github.com/elastic/eui/pull/2060))
- Added `autoFocus` prop to `EuiTabbedContent` ([2062](https://github.com/elastic/eui/pull/2062))
- Changed `popout` glyph in `EuiIcon` to look more like external link ([2064](https://github.com/elastic/eui/pull/2064))
- Tweaked `SuperDatePicker` to make the start/end date selection more obvious ([#2049](https://github.com/elastic/eui/pull/2049))
- Added `toSentenceCase` string service ([#2049](https://github.com/elastic/eui/pull/2049))
- Pass `EuiSuperSelect`'s `popoverClassName` to the popover's panel ([#2068](https://github.com/elastic/eui/pull/2068))
- Added `editorItemAlignLeft`, `editorItemAlignCenter`, `editorItemRight`, `editorItemAlignTop`, `editorItemAlignMiddle`, `editorItemAlignBottom`, `editorDistributeHorizontal`, `editorDistributeVertical`, `editorPositionTopLeft`, `editorPositionTopRight`, `editorPositionBottomRight`, and `editorPositionBottomLeft` glyphs to `EuiIcon` ([2070](https://github.com/elastic/eui/pull/2070))
- Added missing TS definitions for `EuiRange` ([#2072](https://github.com/elastic/eui/pull/2072))

**Bug fixes**

- Fixed proptype for `EuiCopy`'s `children` ([#2048](https://github.com/elastic/eui/pull/2048))
- Fixed `EuiInMemoryTable` to allow sorting on computed columns ([#2044](https://github.com/elastic/eui/pull/2044))
- Fixed TypeScript `Toast` member export ([#2052](https://github.com/elastic/eui/pull/2052))
- Fixed style of readOnly input groups via `EuiFormControlLayout` and `prepend`/`append` ([#2057](https://github.com/elastic/eui/pull/2057))
- Removed TS types from ES exports when the exported name differs from the imported one ([#2069](https://github.com/elastic/eui/pull/2069))
- Fixed TypeScript definitions and type exports for `EuiBadge` and `EuiCopy` ([#2052](https://github.com/elastic/eui/pull/2052))

## [`12.0.0`](https://github.com/elastic/eui/tree/v12.0.0)

- Attached `noreferrer` also to links without `target="_blank"` ([#2008](https://github.com/elastic/eui/pull/2008))
- Converted observer utility components to TypeScript ([#2009](https://github.com/elastic/eui/pull/2009))
- Converted tool tip components to TypeScript ([#2013](https://github.com/elastic/eui/pull/2013))
- Converted `EuiCopy` to TypeScript ([#2016](https://github.com/elastic/eui/pull/2016))
- Converted badge and token components to TypeScript ([#2026](https://github.com/elastic/eui/pull/2026))
- Added `magnet` glyph to `EuiIcon` ([2010](https://github.com/elastic/eui/pull/2010))
- Changed `logoAWS` SVG in `EuiIcon` to work better in dark mode ([#2036](https://github.com/elastic/eui/pull/2036))
- Converted toast components to TypeScript ([#2032](https://github.com/elastic/eui/pull/2032))

**Bug fixes**

- Fixed `EuiFlyout` scrolling in Safari ([#2033](https://github.com/elastic/eui/pull/2033))
- Fixed `EuiCallOut` header icon alignment ([#2006](https://github.com/elastic/eui/pull/2006))
- Fixed `EuiInMemoryTable` sort value persistence through lifecycle updates ([#2035](https://github.com/elastic/eui/pull/2035))
- Fixed `EuiColorPicker` positioning and keyboard navigation in certain portal contexts ([#2038](https://github.com/elastic/eui/pull/2038))

**Breaking changes**

- Removed explicit dependency on `core-js`, but a global polyfill like `core-js@3` is still required ([#1982](https://github.com/elastic/eui/pull/1982))

## [`11.3.2`](https://github.com/elastic/eui/tree/v11.3.2)

**Note: this release is a backport containing changes originally made in `12.0.0`**

**Bug fixes**

- Fixed `EuiInMemoryTable` sort value persistence through lifecycle updates ([#2035](https://github.com/elastic/eui/pull/2035))
- Fixed `EuiColorPicker` positioning and keyboard navigation in certain portal contexts ([#2038](https://github.com/elastic/eui/pull/2038))

## [`11.3.1`](https://github.com/elastic/eui/tree/v11.3.1)

**Bug fixes**

- Fixed `EuiBadge` conflicts with providing both `iconOnClick` and `onClick` ([#1994](https://github.com/elastic/eui/pull/1994))
- Fixed optional TS definitions for `EuiColorPicker` `onBlur` and `onFocus` callbacks ([#1993](https://github.com/elastic/eui/pull/1993))
- Fixed `EuiIcon` again so that webpack can build dynamic require contexts ([#1998](https://github.com/elastic/eui/pull/1998))
- Fixed double borders on prepend/append items in `EuiFormControlLayout` ([#1996](https://github.com/elastic/eui/pull/1996))
- Fixed `EuiSuperSelect` TS definitions ([#1995](https://github.com/elastic/eui/pull/1995))

## [`11.3.0`](https://github.com/elastic/eui/tree/v11.3.0)

- Converted `EuiTableRowHeaderCheckbox` to TS ([#1973](https://github.com/elastic/eui/pull/1973))
- Added missing TypeScript definition for `EuiFieldText`'s `compressed` prop ([#1977](https://github.com/elastic/eui/pull/1977))
- Converted `EuiTableRowCellCheckbox` to TS ([#1964](https://github.com/elastic/eui/pull/1964))
- Updated `caniuse-lite` version resolution ([#1970](https://github.com/elastic/eui/pull/1970))
- Added a webpack directive for naming icon chunks ([#1944](https://github.com/elastic/eui/pull/1944))
- Added ability to update `EuiInMemoryTable` `sorting` prop and remove columns after sorting is applied ([#1972](https://github.com/elastic/eui/pull/1972))
- Added `onToggle` callback to `EuiAccordion` ([#1974](https://github.com/elastic/eui/pull/1974))
- Removed `options` `defaultProps` value from `EuiSuperSelect` ([#1975](https://github.com/elastic/eui/pull/1975))
- Removed TSlint and will perform all linting through ESLint ([#1950](https://github.com/elastic/eui/pull/1950))
- Added new component `EuiDelayRender` ([#1876](https://github.com/elastic/eui/pull/1876))
- Replaced `EuiColorPicker` with custom, customizable component ([#1914](https://github.com/elastic/eui/pull/1914))
- Added `jsx-a11y` `eslint` plugin and rules to match Kibana ([#1952](https://github.com/elastic/eui/pull/1952))
- Changed `EuiCopy` `beforeMessage` prop to accept `node` instead of just `string` ([#1952](https://github.com/elastic/eui/pull/1952))

**Bug fixes**

- Fixed environment setup for running `test-unit` script on Windows ([#1971](https://github.com/elastic/eui/pull/1971))
- Fixed focus on single selection of EuiComboBox ([#1965](https://github.com/elastic/eui/pull/1965))
- Fixed type mismatch between PropType and TypeScript def for `EuiGlobalToastList` toast `title` ([#1978](https://github.com/elastic/eui/pull/1978))
- Fixed missing Typescript definition for `EuiButton`'s `color="text"` option ([#1980](https://github.com/elastic/eui/pull/1980))
- Fixed Prettier formatting lint error in `EuiTable` TS def file ([#1986](https://github.com/elastic/eui/pull/1986))
- Fixed not clickable button with svg in Safari ([#1985](https://github.com/elastic/eui/pull/1985))
- Fixed `EuiToggle` pointer events for those using icons only ([#1991](https://github.com/elastic/eui/pull/1991))

## [`11.2.1`](https://github.com/elastic/eui/tree/v11.2.1)

**Bug fixes**

- Fixed type mismatch between PropType and TypeScript def for `EuiToast` `title` ([#1962](https://github.com/elastic/eui/pull/1962))

## [`11.2.0`](https://github.com/elastic/eui/tree/v11.2.0)

- Converted `EuiFormControlLayoutCustomIcon` to TS ([#1956](https://github.com/elastic/eui/pull/1956))
- Converted `EuiStepNumber` to TS ([#1893](https://github.com/elastic/eui/pull/1893))
- Converted `EuiFormControlLayoutClearButton` to TS ([#1922](https://github.com/elastic/eui/pull/1922))
- Added `data-test-subj` property to `EuiDraggable` and `EuiDroppable` ([#1943](https://github.com/elastic/eui/pull/1943))
- Added type definitions to `EuiSuperSelect` ([#1907](https://github.com/elastic/eui/pull/1907))
- Updated `EuiIcon` to use Slack's updated branding ([#1954](https://github.com/elastic/eui/pull/1954))
- Updated `compile-icons` script to format icon components with Prettier ([#1955](https://github.com/elastic/eui/pull/1955))

**Bug fixes**

- Addressed a chrome issue where negative letter-spacing can reverse RTL text in SVGs ([#1960](https://github.com/elastic/eui/pull/1960))

## [`11.1.0`](https://github.com/elastic/eui/tree/v11.1.0)

- Converted `pretty_interval` to TS ([#1920](https://github.com/elastic/eui/pull/1920))
- Converted `relative_options` to TS ([#1921](https://github.com/elastic/eui/pull/1921))
- Added width to `EuiFlexItem` when gutter in `EuiFlexGrid` is set to none. ([#1941](https://github.com/elastic/eui/pull/1941))
- Format all JavaScript files with Prettier through ESLint ([#1906](https://github.com/elastic/eui/pull/1906))
- Replaced `appSecurityAnalytics` in `EuiIcon` with an updated SVG ([#1948](https://github.com/elastic/eui/pull/1948))

**Bug fixes**

- Removed unused prop enum of `l` in `EuiButton` ([#1936](https://github.com/elastic/eui/pull/1936))
- Fixed `EuiSelect` browser event inconsistencies by normalizing `mouseup` propagation ([#1926](https://github.com/elastic/eui/pull/1926))
- Removed `children` as a required prop for `EuiOverlayMask` ([#1937](https://github.com/elastic/eui/pull/1937))

## [`11.0.1`](https://github.com/elastic/eui/tree/v11.0.1)

**Bug fixes**

- Fixed `EuiIconTip`'s typescript definition ([#1934](https://github.com/elastic/eui/pull/1934))
- Reinstated `EuiIcon` component ability to handle `type` prop updates ([#1935](https://github.com/elastic/eui/pull/1935))

## [`11.0.0`](https://github.com/elastic/eui/tree/v11.0.0)

- Added support for custom React SVG elements and external SVG URLs to `EuiIcon` ([#1924](https://github.com/elastic/eui/pull/1924))

**Bug fixes**

- Fixed Firefox flash of unstyled select dropdown ([#1927](https://github.com/elastic/eui/pull/1927))

**Breaking changes**

- Split `EuiIcon` icon loading into dynamic imports ([#1924](https://github.com/elastic/eui/pull/1924))

## [`10.4.2`](https://github.com/elastic/eui/tree/v10.4.2)

**Note: this release is a backport containing changes originally made in `11.2.0`**

**Bug fixes**

- Addressed a chrome issue where negative letter-spacing can reverse RTL text in SVGs ([#1960](https://github.com/elastic/eui/pull/1960))

## [`10.4.1`](https://github.com/elastic/eui/tree/v10.4.1)

**Note: this release is a backport containing changes originally made in `11.1.0`**

- Replaced `appSecurityAnalytics` in `EuiIcon` with an updated SVG ([#1948](https://github.com/elastic/eui/pull/1948))

## [`10.4.0`](https://github.com/elastic/eui/tree/v10.4.0)

- Added `display` prop to `EuiTabs` and `EuiTabbedContent` components for ability to use an alternative `condensed` style ([#1904](https://github.com/elastic/eui/pull/1904))

## [`10.3.1`](https://github.com/elastic/eui/tree/v10.3.1)

**Bug fixes**

- Fixed a regression where `EuiStat` reported accepting `string` for `title`, `description`, even though `ReactNode` is acceptable ([#1910](https://github.com/elastic/eui/pull/1910))

## [`10.3.0`](https://github.com/elastic/eui/tree/v10.3.0)

- Added support for `href` on the last item in `EuiBreadcrumbs` ([#1905](https://github.com/elastic/eui/pull/1905))
- Added `selectable` prop to `EuiCard` ([#1895](https://github.com/elastic/eui/pull/1895))
- Converted `EuiValidatableControl` to TS ([#1879](https://github.com/elastic/eui/pull/1879))

**Bug fixes**

- Fixed prompt text rendering in `EuiFilePicker` when a React element is passed ([#1903](https://github.com/elastic/eui/pull/1903))
- Fixed overflow scrolling of `EuiModal` and `EuiConfirmModal` for Chrome and Safari ([#1902](https://github.com/elastic/eui/pull/1902))
- Fixed `EuiOverlayMask` `children` element mismatch TS error ([#1900](https://github.com/elastic/eui/pull/1900))

## [`10.2.1`](https://github.com/elastic/eui/tree/v10.2.1)

**Bug fixes**

- Fixed responsiveness of `EuiFilterGroup` ([#1849](https://github.com/elastic/eui/pull/1849))

**Deprecations**

- Replaced `EuiFilterButton`'s `noDivider` prop with `withNext` ([#1849](https://github.com/elastic/eui/pull/1849))

## [`10.2.0`](https://github.com/elastic/eui/tree/v10.2.0)

- Converted `EuiGlobalToastListItem` to TS ([#1880](https://github.com/elastic/eui/pull/1880))
- Converted `token_map` to TS ([#1870](https://github.com/elastic/eui/pull/1870))
- Converted `EuiOverlayMask` to TS ([#1858](https://github.com/elastic/eui/pull/1858))
- Converted `EuiStat` to TS ([#1848](https://github.com/elastic/eui/pull/1848))
- Added `isLoading` prop to `EuiStat` ([#1848](https://github.com/elastic/eui/pull/1848))
- Added `roundUp` prop to relative tab of `EuiSuperDatePicker` ([#1827](https://github.com/elastic/eui/pull/1827))
- Changed position of `EuiSwitch` for date rounding used at relative tab of `EuiSuperDatePicker` ([#1827](https://github.com/elastic/eui/pull/1827))
- Added `bug`, `flag`, and `heart` glyphs to `EuiIcon` ([#1887](https://github.com/elastic/eui/pull/1887))
- Updated `alert` glyph in `EuiIcon` ([#1887](https://github.com/elastic/eui/pull/1887))

**Bug fixes**

- Fixed `EuiComboBox` to not pass its `inputRef` prop down to the DOM ([#1867](https://github.com/elastic/eui/pull/1867))
- Fixed `euiBreakpoint()` warning to give accurate feedback ([#1874](https://github.com/elastic/eui/pull/1874))
- Fixed type definitions around `EuiI18n`'s `default` prop to better support use cases ([#1861](https://github.com/elastic/eui/pull/1861))
- Localized `EuiTablePagination`'s row count selection ([#1883](https://github.com/elastic/eui/pull/1883))
- Fixed EuiComboBox's internal tracking of its focus state ([#1796](https://github.com/elastic/eui/pull/1796))
- Fixed `EuiComboBox` with `singleSelection` and `onAddCustomOption` reopening the options list after adding a custom option ([#1882](https://github.com/elastic/eui/pull/1882))
- Fixed `EuiComboBox` reopening the options list in Firefox when closing via the dropdown arrow button ([#1885](https://github.com/elastic/eui/pull/1885))
- Fixed running the dev server and building on Windows ([#1891](https://github.com/elastic/eui/pull/1891))

## [`10.1.0`](https://github.com/elastic/eui/tree/v10.1.0)

- Added `tokenModule` and `tokenNamespace` icons to `EuiToken` ([#1839](https://github.com/elastic/eui/pull/1839))
- Used `cache-loader` to speed up development docs site build ([#1841](https://github.com/elastic/eui/pull/1841)
- Converted `matching_options` to TS ([#1828](https://github.com/elastic/eui/pull/1828))
- Converted `EuiFormHelpText` to TS ([#1852](https://github.com/elastic/eui/pull/1852))
- Added `onSearch` to `EuiFieldSearchProps`'s type defintion ([#1627](https://github.com/elastic/eui/pull/1627))
- Added `moon` glyph to `EuiIcon` ([#1859](https://github.com/elastic/eui/pull/1859))
- Added `logoAzure` and `logoAzureMono` logos to `EuiIcon` ([#1859](https://github.com/elastic/eui/pull/1859))
- Added exact-text matching operator to `EuiSearchBar` / `Query` and allow empty phrases, e.g. `""` ([#1843](https://github.com/elastic/eui/pull/1843))
- Allow forward-slash character in `EuiSearchBar` / `Query` search values ([#1843](https://github.com/elastic/eui/pull/1843))
- Changed `EuiLoadingKibana`, `EuiLoadingSpinner`, `EuiLoadingChart` and `EuiLoadingContent` components to use spans instead of divs  ([#1845](https://github.com/elastic/eui/pull/1845))

**Bug fixes**

- Added `toastLifeTimeMs` typescript definition for individual toasts in `EuiGlobalToastList` ([#1846](https://github.com/elastic/eui/pull/1846))
- Added logic to prevent refocusing `EuiComboBox` input after container blur event ([#1863](https://github.com/elastic/eui/pull/1863))
- Changed `EuiLoadingKibana` so it could better nest within `EuiFlexItem`  ([#1845](https://github.com/elastic/eui/pull/1845))

## [`10.0.1`](https://github.com/elastic/eui/tree/v10.0.1)

- Converted `EuiText`, `EuiTextColor` and `EuiTextAlign` to TS ([#1791](https://github.com/elastic/eui/pull/1791))
- Updated `IconColor` type to better distinguish between accepted types ([#1842](https://github.com/elastic/eui/pull/1842))

## [`10.0.0`](https://github.com/elastic/eui/tree/v10.0.0)

- Converted `EuiTitle` to TS ([#1810](https://github.com/elastic/eui/pull/1810))
- Added `adjustDateOnChange` prop to date pickers, enabling month and year changes to trigger `onChange` ([#1817](https://github.com/elastic/eui/pull/1817))
- Updated the overflow shadows for `EuiModal` and `EuiFlyout` ([#1829](https://github.com/elastic/eui/pull/1829))
- Added `confirmButtonDisabled` prop to `EuiConfirmModal` ([#1829](https://github.com/elastic/eui/pull/1829))
- Fixed `EuiNavDrawer` overflow scroll behavior on Firefox ([#1837](https://github.com/elastic/eui/pull/1837))

**Bug fixes**

- Fixed mobile layout for `EuiConfirmModal` ([#1829](https://github.com/elastic/eui/pull/1829))

**Deprecations**

- Replaced the following SASS mixins `euiOverflowShadowTop`, `euiOverflowShadowBottom` with `euiOverflowShadow`. ([#1829](https://github.com/elastic/eui/pull/1829))


**Breaking changes**

- Removed transitional `keyOfStringsOnly` option from TypeScript configuration ([#1814](https://github.com/elastic/eui/pull/1814))

## [`9.9.1`](https://github.com/elastic/eui/tree/v9.9.1)

- Re-enabled installation of `@elastic/eui` via npm ([#1811](https://github.com/elastic/eui/pull/1811))

**Bug fixes**

- Added `isLoading` prop typedef to `EuiSuperDatePickerProps` ([#1812](https://github.com/elastic/eui/pull/1812))
- Fixed `EuiSearchBox` query input resetting on prop updates ([#1823](https://github.com/elastic/eui/pull/1823))
- Fixed `EuiSearchBar` filter button highlighting ([#1824](https://github.com/elastic/eui/pull/1824))

## [`9.9.0`](https://github.com/elastic/eui/tree/v9.9.0)

- Added `initialPageIndex` pagination prop to `EuiInMemoryTable` ([#1798](https://github.com/elastic/eui/pull/1798))
- Converted `EuiToolTipPopover` to TS ([#1800](https://github.com/elastic/eui/pull/1800))
- Converted `EuiTableHeaderMobile` to TS ([#1786](https://github.com/elastic/eui/pull/1786))
- Added `menuLeft` and `menuRight` icons ([#1797](https://github.com/elastic/eui/pull/1797))
- Updated EuiNavDrawer’s collapse/expand button to use `menuLeft` and `menuRight` icons ([#1797](https://github.com/elastic/eui/pull/1797))
- Added `isInvalid` prop to `EuiSuperSelect` ([#1804](https://github.com/elastic/eui/pull/1804))
- Added `cut` glyph to `EuiIcon` ([#1802](https://github.com/elastic/eui/pull/1802))
- Added `glasses` glyph to `EuiIcon` ([#1813](https://github.com/elastic/eui/pull/1813))

**Bug fixes**

- Fixed issue where toasts would dismiss when they have focus ([#1803](https://github.com/elastic/eui/pull/1803))
- Fixed issue where `EuiComboBox` placeholder was not read by screen readers ([#1803](https://github.com/elastic/eui/pull/1803))

## [`9.8.0`](https://github.com/elastic/eui/tree/v9.8.0)

- **[Beta]** Added new `EuiSelectable` component  ([#1699](https://github.com/elastic/eui/pull/1699))
- **[Beta]** Added new drag and drop components: `EuiDragDropContext`, `EuiDraggable`, and `EuiDroppable` ([#1733](https://github.com/elastic/eui/pull/1733))

## [`9.7.2`](https://github.com/elastic/eui/tree/v9.7.2)

- Converted `EuiFormErrorText` to TS ([#1772](https://github.com/elastic/eui/pull/1772))
- Added `data-test-subj`s to `EuiSuperDatePicker`'s `EuiRelativeTab` inputs  ([#1782](https://github.com/elastic/eui/pull/1782))

**Bug fixes**

- Update ButtonIconColor type to provide all available options ([#1783](https://github.com/elastic/eui/pull/1783))
- Prevent calculation on `null` ref during `EuiResizeObserver` observation ([#1784](https://github.com/elastic/eui/pull/1784))

## [`9.7.1`](https://github.com/elastic/eui/tree/v9.7.1)

**Bug fixes**

- Fixed heading and paragraph tag font style inherits ([#1776](https://github.com/elastic/eui/pull/1776))

## [`9.7.0`](https://github.com/elastic/eui/tree/v9.7.0)

- Changed `EuiNavDrawer` to close on any link click ([#1773](https://github.com/elastic/eui/pull/1773))

## [`9.6.0`](https://github.com/elastic/eui/tree/v9.6.0)

- Converted `makeId` to TS ([#1759](https://github.com/elastic/eui/pull/1759))
- Converted `EuiCardGraphic` to TS ([#1751](https://github.com/elastic/eui/pull/1751))
- Enhanced the build process to emit TypeScript types for the variables extracted from the themes ([#1750](https://github.com/elastic/eui/pull/1750))

**Bug fixes**

**Note: this release creates a minor regression to text scales where paragraph and heading tags were no longer inheriting from their container. This is fixed in `9.7.1`.**

- Set `h1 through h6, p` tags font reset based on family, size, and weight ([#1760](https://github.com/elastic/eui/pull/1760))
- Fixed `EuiButton` font size inheritence ([#1760](https://github.com/elastic/eui/pull/1760))
- Updated button elements in `EuiFilePicker`, `EuiFormControlLayoutClearButton`, `EuiFormControlLayoutCustomIcon`, `EuiListGroupItem`, and `EuiSideNavItem` to type=button ([#1764](https://github.com/elastic/eui/pull/1764))
- Fixed outside click detection inconsistencies by comparing `mouseup` and `mousedown` event targets rather than using `click` event target ([#1761](https://github.com/elastic/eui/pull/1761))

## [`9.5.0`](https://github.com/elastic/eui/tree/v9.5.0)

- Changed `EuiSuperDatePicker` to call `onRefresh` instead of `onTimeChanged` when user clicks "Refresh" button ([#1745](https://github.com/elastic/eui/pull/1745))
- Added a new `EuiLoadingContent` component that displays blocks as placeholders for text. ([#1730](https://github.com/elastic/eui/pull/1730))
- Added documentation entry in `EuiPagination` for `activePage` prop. ([#1740](https://github.com/elastic/eui/pull/1740))
- Changed `EuiButton` to use "m" as it's default `size` prop ([#1742](https://github.com/elastic/eui/pull/1742))
- Adds type definitions for `EuiListGroup` and `EuiListGroupItem` ([#1737](https://github.com/elastic/eui/pull/1737))

**Bug fixes**

- Fixed `EuiToolTip` potentially having incorrect position calculations near the window edge  ([#1744](https://github.com/elastic/eui/pull/1744))

## [`9.4.2`](https://github.com/elastic/eui/tree/v9.4.2)

**Bug fixes**

- Fixed `hexToRgb` from erroring on an incorrect string input ([#1741](https://github.com/elastic/eui/pull/1741))
- Fixed `EuiBadge` custom `color` prop type ([#1741](https://github.com/elastic/eui/pull/1741))
- Fixed inaccurately required `onRefresh` prop (should be optional) that was introduced in types in version 9.4.1 ([#1743](https://github.com/elastic/eui/pull/1743))

## [`9.4.1`](https://github.com/elastic/eui/tree/v9.4.1)

**Bug fixes**

- Adds missing type and fixes closure-scope problem for `SuperDatePicker`'s `onRefresh` callback ([#1732](https://github.com/elastic/eui/pull/1732))
- Changed `EuiBottomBar` to refer to the end of document ([#1727](https://github.com/elastic/eui/pull/1727))
- Fixed `EuiComboBox`'s calls to its `onBlur` prop ([#1739](https://github.com/elastic/eui/pull/1739))

## [`9.4.0`](https://github.com/elastic/eui/tree/v9.4.0)

- Allow toasts in `EuiGlobalToastList` to override `toastLifeTimeMs` ([#1720](https://github.com/elastic/eui/pull/1720))
- Allow `EuiListGroupItem` to pass a custom element as the `icon` ([#1726](https://github.com/elastic/eui/pull/1726))
- Added default icon for `EuiListGroupItem` if one is not passed ([#1729](https://github.com/elastic/eui/pull/1729))
- Added `toInitials` string service ([#1729](https://github.com/elastic/eui/pull/1729))

**Bug fixes**

- Removed all `lodash` imports in `eui.d.ts` to avoid namespace pollution ([#1723](https://github.com/elastic/eui/pull/1723))
- Prevent `EuiComboBox` from creating a custom option value when user clicks on a value in the dropdown ([#1728](https://github.com/elastic/eui/pull/1728))

## [`9.3.0`](https://github.com/elastic/eui/tree/v9.3.0)

- Added `footerLink` and `showToolTips` to `EuiNavDrawer` and added `EuiNavDrawerGroup` ([#1701](https://github.com/elastic/eui/pull/1701))

**Bug fixes**

- Fixed `EuiSuperDatePicker` time selection jumping on focus ([#1704](https://github.com/elastic/eui/pull/1704))

## [`9.2.1`](https://github.com/elastic/eui/tree/v9.2.1)

**Bug fixes**

- Make `EuiPopover`'s repositionOnScroll prop optional in TS ([#1705](https://github.com/elastic/eui/pull/1705))

## [`9.2.0`](https://github.com/elastic/eui/tree/v9.2.0)

- Adjusted the dark theme palette a bit more and adjusted a few components ([#1700](https://github.com/elastic/eui/pull/1700))

## [`9.1.0`](https://github.com/elastic/eui/tree/v9.1.0)

- Adjusted the dark theme palette to have a slight blue tint ([#1691](https://github.com/elastic/eui/pull/1691))
- Added `repositionOnScroll` property to the `EuiPopoverProps` type definition ([#1628](https://github.com/elastic/eui/pull/1628))
- Added support to `findTestSubject` for an optional `matcher` argument, which defaults to `~=`, enabling it to identify an element based on one of multiple space-separated values within its `data-test-subj` attribute ([#1587](https://github.com/elastic/eui/pull/1587))
- Converted `EuiFlexGrid`, `EuiFlexGroup`, `EuiFlexItem`, `EuiDescriptionList`, `EuiDescriptionListTitle`, and `EuiDescriptionListDescription` to TypeScript ([#1365](https://github.com/elastic/eui/pull/1365))
- Converted `EuiAvatar` to Typescript ([#1654](https://github.com/elastic/eui/pull/1654))
- Added missing `anchorClassName` prop to `EuiToolTip` definition ([#1657](https://github.com/elastic/eui/pull/1657))
- Added `fullWidth` prop to `EuiButton` ([#1665](https://github.com/elastic/eui/pull/1665))
- Added `.eui-fullWidth` utility class ([#1665](https://github.com/elastic/eui/pull/1665))
- Added `EuiPopoverFooter` and converted `EuiPopoverTitle` to TS ([#1666](https://github.com/elastic/eui/pull/1666))
- Converted `EuiLoadingSpinner`, `EuiLoadingKibana`, and `EuiLoadingChart` to TS ([#1683](https://github.com/elastic/eui/pull/1683))

**Bug fixes**

- Added button to `EuiSuperDatePicker`'s “Now” tab to trigger the "now" time selection ([#1620](https://github.com/elastic/eui/pull/1620))
- Fixed floating point arithmetic bug in `EuiRangeTrack`'s value validation ([#1687](https://github.com/elastic/eui/pull/1687))
- Fixed `EuiComboBox` `activeOptonIndex` error with empty search results ([#1695](https://github.com/elastic/eui/pull/1695))
- Fixed IE11 rendering issue in `EuiLoadingKibana` ([#1683](https://github.com/elastic/eui/pull/1683))

## [`9.0.2`](https://github.com/elastic/eui/tree/v9.0.2)

**Note: this release is a backport containing changes originally made in `9.1.0`**

**Bug fixes**

- Fixed floating point arithmetic bug in `EuiRangeTrack`'s value validation ([#1687](https://github.com/elastic/eui/pull/1687))

## [`9.0.1`](https://github.com/elastic/eui/tree/v9.0.1)

**Bug fixes**

- Fixed definition exports for converted Typescript components ([#1633](https://github.com/elastic/eui/pull/1633))

## [`9.0.0`](https://github.com/elastic/eui/tree/v9.0.0)

- Added `allowNeutralSort` prop to `EuiInMemoryTable` to support unsorting table columns ([#1591](https://github.com/elastic/eui/pull/1591))
- Added `mobileOptions` object prop for handling of all the mobile specific options of `EuiBasicTable` ([#1462](https://github.com/elastic/eui/pull/1462))
- Table headers now accept `React.node` types ([#1462](https://github.com/elastic/eui/pull/1462))
- Added `displayOnly` prop to `EuiFormRow` ([#1582](https://github.com/elastic/eui/pull/1582))
- Added `numActiveFilters` prop to `EuiFilterButton` ([#1589](https://github.com/elastic/eui/pull/1589))
- Updated style of `EuiFilterButton` to match `EuiFacetButton` ([#1589](https://github.com/elastic/eui/pull/1589))
- Added `size` and `color` props to `EuiNotificationBadge` ([#1589](https://github.com/elastic/eui/pull/1589))
- Allow `EuiDescribedFormGroup` to exist as a description-only row ([#1522](https://github.com/elastic/eui/pull/1522))
- Added `type` prop for `EuiFormLabel` for the option to make it a `legend` ([#1613](https://github.com/elastic/eui/pull/1613))
- Added `labelAppend` and `labelType` props to `EuiFormRow` ([#1613](https://github.com/elastic/eui/pull/1613))
- Aligned text styles of table headers and form labels ([#1613](https://github.com/elastic/eui/pull/1613))
- Converted `EuiModalBody`, `EuiModalFooter`, `EuiModalHeader`, `EuiModalHeaderTitle`, `EuiFlyoutBody`, `EuiFlyoutFooter`, `EuiFlyoutHeader`, `EuiPortal`, and `EuiProgress` to Typescript ([#1621](https://github.com/elastic/eui/pull/1621))

**Bug fixes**

- Fixed keyboard navigation and UI of `EuiComboBox` items in single selection mode ([#1619](https://github.com/elastic/eui/pull/1619))
- `EuiBasicTable` select all shows up on mobile ([#1462](https://github.com/elastic/eui/pull/1462))
- Adds missing `hasActiveFilters` prop for `EuiFilterButton` type and fixes `onChange` signature for `EuiButtonGroup` ([#1603](https://github.com/elastic/eui/pull/1603))
- Included `react-datepicker` TS types in EUI itself to avoid outside dependency ([#1618](https://github.com/elastic/eui/pull/1618))
- Prevent `EuiGlobalToastList` from attempting calculations on `null` DOM elements ([#1606](https://github.com/elastic/eui/pull/1606))
- Fixed `EuiFormRow` errors from the possibility of having duplicate `key` values ([#1522](https://github.com/elastic/eui/pull/1522))

**Breaking changes**

- `EuiBasicTable`'s select all checkbox appends a `makeId` string to the id ([#1462](https://github.com/elastic/eui/pull/1462))
- Remove camel casing from exported JSON variables and preserve hex values instead of converting to rgb ([#1590](https://github.com/elastic/eui/pull/1590))
- Added `@types/react-dom` to `peerDependencies` ([#1621](https://github.com/elastic/eui/pull/1621))

## [`8.0.0`](https://github.com/elastic/eui/tree/v8.0.0)

**Breaking changes**

- Upgraded TypeScript to 3.3 ([#1583](https://github.com/elastic/eui/pull/1583))
- Upgraded React to 16.8 ([#1583](https://github.com/elastic/eui/pull/1583))
- Upgraded Jest to 24.1 ([#1583](https://github.com/elastic/eui/pull/1583))
- Upgraded Enzyme to 3.9 ([#1583](https://github.com/elastic/eui/pull/1583))

## [`7.3.0`](https://github.com/elastic/eui/tree/v7.3.0)

- Added `onRefresh` option for `EuiSuperDatePicker` ([#1577](https://github.com/elastic/eui/pull/1577))
- Converted `EuiToggle` to TypeScript ([#1570](https://github.com/elastic/eui/pull/1570))
- Added type definitions for `EuiButtonGroup`,`EuiButtonToggle`, `EuiFilterButton`, `EuiFilterGroup`, and `EuiFilterSelectItem` ([#1570](https://github.com/elastic/eui/pull/1570))
- Added `displayOnly` prop to EuiFormRow ([#1582](https://github.com/elastic/eui/pull/1582))
- Added an index.d.ts file for the date picker components, including `EuiDatePicker`, `EuiDatePickerRange`, and `EuiSuperDatePicker` ([#1574](https://github.com/elastic/eui/pull/1574))

**Bug fixes**

- Fixed several bugs with `EuiRange` and `EuiDualRange` including sizing of inputs, tick placement, and the handling of invalid values ([#1580](https://github.com/elastic/eui/pull/1580))

## [`7.2.0`](https://github.com/elastic/eui/tree/v7.2.0)

- Added `text` as a color option for `EuiLink` ([#1571](https://github.com/elastic/eui/pull/1571))
- Added `EuiResizeObserver` to expose ResizeObserver API to React components; falls back to MutationObserver API in unsupported browsers ([#1559](https://github.com/elastic/eui/pull/1559))
- Added `EuiFocusTrap` as a wrapper around `react-focus-lock` to enable trapping focus in more cases, including React portals ([#1550](https://github.com/elastic/eui/pull/1550))

**Bug fixes**

- Fixed content cut off in `EuiContextMenuPanel` when height changes dynamically ([#1559](https://github.com/elastic/eui/pull/1559))
- Fixed `EuiComboBox` to allow keyboard tab to exit single selection box ([#1576](https://github.com/elastic/eui/pull/1576))
- Various fixes related to focus order and focus trapping as they relate to content in React portals ([#1550](https://github.com/elastic/eui/pull/1550))

## [`7.1.0`](https://github.com/elastic/eui/tree/v7.1.0)

- Added `append` prop to `EuiFieldText` ([#1567](https://github.com/elastic/eui/pull/1567))
- Adjusted set of Elastic Logos in `EuiIcon` to look better in dark mode. ([#1462](https://github.com/elastic/eui/pull/1562))
- Added `isCopyable` prop to `EuiCodeBlock` ([#1556](https://github.com/elastic/eui/pull/1556))
- Added optional `Snippet` tab to docs and renamed demo tabs ([#1556](https://github.com/elastic/eui/pull/1556))
- Expanded `getSecureRelForTarget` to handle elastic.co domains as a referrer whitelist ([#1565](https://github.com/elastic/eui/pull/1565))
- New `url` utility for verifying if a URL is a referrer whitelist ([#1565](https://github.com/elastic/eui/pull/1565))
- Add iconSize to ButtonIcon type definition ([#1568](https://github.com/elastic/eui/pull/1568))

## [`7.0.0`](https://github.com/elastic/eui/tree/v7.0.0)

- Created `EuiDualRange` using components from modularized, refactored `EuiRange`. New util service `isWithinRange` is the first in the number category. ([#1485](https://github.com/elastic/eui/pull/1485))
- Upgraded `lodash` to v4, taking advantage of modular imports. ([#1534](https://github.com/elastic/eui/pull/1534))
- Added pseudo-localization mode to docs ([#1541](https://github.com/elastic/eui/pull/1541))
- New docs page listing localization tokens ([#1541](https://github.com/elastic/eui/pull/1541))
- Added support for OR group clauses in `EuiQuery` and `EuiSearchBar` ([#1204](https://github.com/elastic/eui/pull/1204))
- Added `customQuickSelectPanels` prop to `EuiSuperDatePicker` ([#1549](https://github.com/elastic/eui/pull/1549))

**Bug fixes**

- Fixed `EuiSearchBar.Query` match_all query string must be `*` ([#1521](https://github.com/elastic/eui/pull/1521))
- Fixed `EuiSuperDatePicker` crashing with negative relative value ([#1537](https://github.com/elastic/eui/pull/1537))
- Fixed `EuiSuperDatePicker` crashing with invalid start and end prop values ([#1544](https://github.com/elastic/eui/pull/1544))
- Make TSLint issues be warnings, not errors, when running `src-docs` ([#1537](https://github.com/elastic/eui/pull/1537))

**Breaking changes**

- Made `or` a reserved keyword in `EuiQuery`'s syntax ([#1204](https://github.com/elastic/eui/pull/1204))

## [`6.10.9`](https://github.com/elastic/eui/tree/v6.10.9)

**Bug fixes**

- Bumped `lodash` version to `elastic/lodash@3.10.1-kibana3` ([#2280](https://github.com/elastic/eui/issues/2280))

## [`6.10.8`](https://github.com/elastic/eui/tree/v6.10.8)

**Note: this release is a backport containing changes originally made in `11.2.0`**

**Bug fixes**

- Addressed a chrome issue where negative letter-spacing can reverse RTL text in SVGs ([#1960](https://github.com/elastic/eui/pull/1960))

## [`6.10.7`](https://github.com/elastic/eui/tree/v6.10.7)

**Note: this release is a backport containing changes originally made in `9.7.0`**

- Changed `EuiNavDrawer` to close on any link click ([#1773](https://github.com/elastic/eui/pull/1773))

## [`6.10.6`](https://github.com/elastic/eui/tree/v6.10.6)

**Note: this release is a backport containing changes originally made in `9.6.0`**

**Bug fixes**

- Fixed outside click detection inconsistencies by comparing `mouseup` and `mousedown` event targets rather than using `click` event target ([#1761](https://github.com/elastic/eui/pull/1761))

## [`6.10.5`](https://github.com/elastic/eui/tree/v6.10.5)

**Note: this release is a backport containing changes originally made in `9.0.0`, `9.1.0`, `9.3.0`, and `9.4.0`**

- Adjusted the dark theme palette to have a slight blue tint ([#1691](https://github.com/elastic/eui/pull/1691))
- Added button to `EuiSuperDatePicker`'s “Now” tab to trigger the "now" time selection ([#1620](https://github.com/elastic/eui/pull/1620))
- Added `footerLink` and `showToolTips` to `EuiNavDrawer` and added `EuiNavDrawerGroup` ([#1701](https://github.com/elastic/eui/pull/1701))
- Allow `EuiListGroupItem` to pass a custom element as the `icon` ([#1726](https://github.com/elastic/eui/pull/1726))
- Added `toInitials` string service ([#1729](https://github.com/elastic/eui/pull/1729))
- Added `fullWidth` prop to `EuiButton` ([#1665](https://github.com/elastic/eui/pull/1665))
- Added `.eui-fullWidth` utility class ([#1665](https://github.com/elastic/eui/pull/1665))

**Bug fixes**

- Fixed keyboard navigation and UI of `EuiComboBox` items in single selection mode ([#1619](https://github.com/elastic/eui/pull/1619))
- Fixed `EuiComboBox` `activeOptonIndex` error with empty search results ([#1695](https://github.com/elastic/eui/pull/1695))
- Prevent `EuiComboBox` from creating a custom option value when user clicks on a value in the dropdown ([#1728](https://github.com/elastic/eui/pull/1728))
- Fixed `EuiSuperDatePicker` time selection jumping on focus ([#1704](https://github.com/elastic/eui/pull/1704))

## [`6.10.4`](https://github.com/elastic/eui/tree/v6.10.4)

**Note: this release is a backport containing changes originally made in `7.3.0`**

- Added an index.d.ts file for the date picker components, including `EuiDatePicker`, `EuiDatePickerRange`, and `EuiSuperDatePicker` ([#1574](https://github.com/elastic/eui/pull/1574))

## [`6.10.3`](https://github.com/elastic/eui/tree/v6.10.3)

**Note: this release is a backport containing changes originally made in `7.1.0`**

- Added `append` prop to `EuiFieldText` ([#1567](https://github.com/elastic/eui/pull/1567))

## [`6.10.2`](https://github.com/elastic/eui/tree/v6.10.2)

**Note: this release is a backport containing changes originally made in `7.1.0`**

- Adjusted set of Elastic Logos in `EuiIcon` to look better in dark mode. ([#1562](https://github.com/elastic/eui/pull/1562))
- Expanded `getSecureRelForTarget` to handle elastic.co domains as a referrer whitelist ([#1565](https://github.com/elastic/eui/pull/1565))
- New `url` utility for verifying if a URL is a referrer whitelist ([#1565](https://github.com/elastic/eui/pull/1565))

## [`6.10.1`](https://github.com/elastic/eui/tree/v6.10.1)

**Note: this release is a backport containing changes originally made in `7.0.0`**

**Bug fixes**

- Fixed `EuiSuperDatePicker` crashing with negative relative value ([#1537](https://github.com/elastic/eui/pull/1537))
- Fixed `EuiSuperDatePicker` crashing with invalid start and end prop values ([#1544](https://github.com/elastic/eui/pull/1544))

## [`6.10.0`](https://github.com/elastic/eui/tree/v6.10.0)

- Adjust dark mode background color ([#1530](https://github.com/elastic/eui/pull/1530))
- TypeScript are now formatted with Prettier ([#1529](https://github.com/elastic/eui/pull/1529))
- Updated `EuiPopover` and `EuiColorPicker` to pause `EuiOutsideClickDetector` in when not open ([#1527](https://github.com/elastic/eui/pull/1527))

## [`6.9.0`](https://github.com/elastic/eui/tree/v6.9.0)

- Changed animation settings for `EuiNavDrawer` ([#1524](https://github.com/elastic/eui/pull/1524))
- Converted a number of components to support text localization ([#1504](https://github.com/elastic/eui/pull/1504))
- Updated `app_ems.svg` ([#1517](https://github.com/elastic/eui/pull/1517))

**Bug fixes**

- Updated `EuiPage` background color to match body background color ([#1513](https://github.com/elastic/eui/pull/1513))
- Fixed React key usage in `EuiPagination` ([#1514](https://github.com/elastic/eui/pull/1514))
- Fixed bug which prevented `EuiSwitch` with generated ID from having its label announced by VoiceOver ([#1519](https://github.com/elastic/eui/pull/1519))
- Fixed `EuiFilterButton` handling `numFilters` when `0` was specified ([#1510](https://github.com/elastic/eui/pull/1510))

## [`6.8.0`](https://github.com/elastic/eui/tree/v6.8.0)

- Changed `flex-basis` value on `EuiPageBody` for better cross-browser support ([#1497](https://github.com/elastic/eui/pull/1497))
- Converted a number of components to support text localization ([#1450](https://github.com/elastic/eui/pull/1450))
- Added a seconds option to the refresh interval selection in `EuiSuperDatePicker`  ([#1503](https://github.com/elastic/eui/pull/1503))
- Changed to conditionally render `EuiModalBody` if `EuiConfirmModal` has no `children` ([#1500](https://github.com/elastic/eui/pull/1500))


**Bug fixes**

- Remove `font-features` setting on `@euiFont` mixin to prevent breaks in ACE editor ([#1505](https://github.com/elastic/eui/pull/1505))

## [`6.7.4`](https://github.com/elastic/eui/tree/v6.7.4)

- Added `textAlign` property to TypeScript definition for `EuiText` ([#1487](https://github.com/elastic/eui/pull/1487))
- Added missing `'m'` option for text `size` for `EuiText`'s TypeScript definition ([#1487](https://github.com/elastic/eui/pull/1487))
- Added missing TypeScript definition for `EuiTextAlign` ([#1487](https://github.com/elastic/eui/pull/1487))

**Bug fixes**

- Fixed popover & tooltip positioning to properly account for arrow buffer ([#1490](https://github.com/elastic/eui/pull/1490))
- Fixed `EuiSuperDatePicker` unexpectedly closing start and end date popovers ([#1494](https://github.com/elastic/eui/pull/1494))

## [`6.7.3`](https://github.com/elastic/eui/tree/v6.7.3)

- `EuiHeader` no longer reduces height at mobile sizes ([#1480](https://github.com/elastic/eui/pull/1480))

**Bug fixes**

- Fixed `EuiSuperDatePicker` not updating derived `isInvalid` state on prop update ([#1483](https://github.com/elastic/eui/pull/1483))
- Fixed `logoAPM` ([#1489](https://github.com/elastic/eui/pull/1489))
- Remove Typescript type and interface definitions from ES and CJS exports ([#1486](https://github.com/elastic/eui/pull/1486))

## [`6.7.2`](https://github.com/elastic/eui/tree/v6.7.2)

- Default light theme now comes with an empty light variables file to make theme switching easier ([#1479](https://github.com/elastic/eui/pull/1479))

**Bug fixes**

- `EuiSuperDatePicker` always trigger `onTimeChange` when time changes and prop `showUpdateButton` is false ([#1477](https://github.com/elastic/eui/pull/1477))
- Fixed font rendering in italics only in Safari ([#1481](https://github.com/elastic/eui/pull/1481))

## [`6.7.1`](https://github.com/elastic/eui/tree/v6.7.1)

**Bug fixes**

- Fixed an issue with font family inheritance by changing the CSS reset ([#1474](https://github.com/elastic/eui/pull/1474))

## [`6.7.0`](https://github.com/elastic/eui/tree/v6.7.0)

- Added `z-index` to `EuiProgress` and example usage with `EuiHeader` ([#1471](https://github.com/elastic/eui/pull/1471))
- Added a new app icon for Code ([#1467](https://github.com/elastic/eui/pull/1467))
- Re-added EuiI18n, EuiI18nNumber, and EuiContext for localization ([#1466](https://github.com/elastic/eui/pull/1466))
- Expose `EuiSuperUpdateButton` component from `EuiSuperDatePicker` ([#1470](https://github.com/elastic/eui/pull/1470))
- Set `type="button"` on accordion buttons ([#1468](https://github.com/elastic/eui/pull/1468))

**Bug fixes**

- Fixed `EuiSuperDatePicker` not updating derived `showPrettyDuration` state on prop update ([#1464](https://github.com/elastic/eui/pull/1464))
- Fixed `EuiSuperDatePicker` not passing `refreshInterval` to callback when refresh internval start/stop toggle button clicked ([#1464](https://github.com/elastic/eui/pull/1464))
- Fixed `EuiSuperDatePicker` `refreshInterval` input not allowing decimals ([#1464](https://github.com/elastic/eui/pull/1464))

## [`6.6.0`](https://github.com/elastic/eui/tree/v6.6.0)

- Added `uptimeApp` icon ([#1445](https://github.com/elastic/eui/pull/1463))
- Added `wrapText` prop that enables `EuiListGroupItem` text to wrap ([#1459](https://github.com/elastic/eui/pull/1459))
- Added `inputRef` prop to `EuiFieldNumber` and updated `EuiFieldText`'s to a Ref type ([#1434](https://github.com/elastic/eui/pull/1434))
- Added `snowflake` icon ([#1445](https://github.com/elastic/eui/pull/1445))
- Added `bell` icon ([#1447](https://github.com/elastic/eui/pull/1447))
- Improved screen reader behavior for table header cell content, especially in sortable columns ([#1426](https://github.com/elastic/eui/pull/1426))

**Bug fixes**

- Fixed `textProps` and `contentProps` of `EuiButton` and `EuiButtonEmpty` so they don’t override classes ([#1455](https://github.com/elastic/eui/pull/1455))
- Fixed `closeButtonProps` of `EuiBadge` so it doesn't override classes ([#1455](https://github.com/elastic/eui/pull/1455))
- Fixed font weight shift of `EuiFilterButton` when notification is present ([#1455](https://github.com/elastic/eui/pull/1455))
- Fixed `$euiCodeFontFamily` monospace font stack and subsequent JSON asset build ([#1465](https://github.com/elastic/eui/pull/1465))

## [`6.5.1`](https://github.com/elastic/eui/tree/v6.5.1)

**Reverts**

- Reverts EuiI18n commit from previous release ([#1453](https://github.com/elastic/eui/pull/1453))

## [`6.5.0`](https://github.com/elastic/eui/tree/v6.5.0)

**Note: this contains some i18n work that we reverted in the next release. Use the patch release above instead**

- Added Inter UI to the font family stack ([#1402](https://github.com/elastic/eui/pull/1402))
- Changed padding on `EuiHeaderLogo` and updated `EuiNavDrawer` example ([#1448](https://github.com/elastic/eui/pull/1448))
- Updated `EuiNavDrawer` docs example and adjusted `EuiHeaderLogo` padding ([#1449](https://github.com/elastic/eui/pull/1449))
- Added EuiI18n, EuiI18nNumber, and EuiContext for localization ([#1404](https://github.com/elastic/eui/pull/1404))

**Bug fixes**

- Added `legend` for accessibility of `EuiButtonGroup` and fixed opacity of disabled input ([#1444](https://github.com/elastic/eui/pull/1444))

## [`6.4.0`](https://github.com/elastic/eui/tree/v6.4.0)

- Added `EuiNavDrawer` side nav component ([#1427](https://github.com/elastic/eui/pull/1427))
- Added `inputRef` prop to `EuiComboBox` ([#1433](https://github.com/elastic/eui/pull/1433))
- Added custom date string formatting for series charts crosshair overlay ([#1429](https://github.com/elastic/eui/pull/1429))
- Added new icons for `symlink` and `submodule` ([#1439](https://github.com/elastic/eui/pull/1439))

**Bug fixes**

- Fix mouse interaction with `EuiComboBox` in IE11 ([#1437](https://github.com/elastic/eui/pull/1437))

## [`6.3.1`](https://github.com/elastic/eui/tree/v6.3.1)

**Bug fixes**

- Downgraded `@types/react` and `@types/prop-types` verisons to align with Kibana ([#1435](https://github.com/elastic/eui/pull/1435))

## [`6.3.0`](https://github.com/elastic/eui/tree/v6.3.0)

- Added `onBlur` prop to `EuiComboBox` ([#1400](https://github.com/elastic/eui/pull/1400))
- Added `initialFocus` prop typedefs to `EuiModal` and `EuiPopover` ([#1410](https://github.com/elastic/eui/pull/1410))
- Updated `gisApp` icon ([#1413](https://github.com/elastic/eui/pull/1413))
- Added `isAutoRefreshOnly` prop to `EuiSuperDatePicker` ([#1412](https://github.com/elastic/eui/pull/1412))
- Migrate remaining files in `accessiblity/` to TS ([#1408](https://github.com/elastic/eui/pull/1408))
- Added `titleProps` and `descriptionProps` to `EuiDescriptionList` ([#1419](https://github.com/elastic/eui/pull/1419))
- Propagate `className` on `EuiCodeBlock` in fullscreen mode ([#1422](https://github.com/elastic/eui/pull/1422))
- Added `iconProps` prop to `EuiIconTip` ([#1420](https://github.com/elastic/eui/pull/1420))
- Added ability to pass `isDisabled` to individual `EuiButtonGroup` items ([#1424](https://github.com/elastic/eui/pull/1424))
- Changed `EuiRange` PropType for `value` to allow `number` (in addition to `string`) ([#1421](hhttps://github.com/elastic/eui/pull/1421))

**Bug fixes**

- Support extended characters (e.g. non-latin, unicode) in `EuiSearchBar` and `EuiQuery` ([#1415](https://github.com/elastic/eui/pull/1415))
- Fixed line-heights of the differently sized `EuiDescriptionList` alternates ([#1419](https://github.com/elastic/eui/pull/1419))
- Updated `EuiIconTip` TS definitions to inherit those from `EuiToolTip` as well ([#1420](https://github.com/elastic/eui/pull/1420))

## [`6.2.0`](https://github.com/elastic/eui/tree/v6.2.0)

- Added `logoCodesandbox` and updated `apmApp` icons ([#1407](https://github.com/elastic/eui/pull/1407))
- Changed `EuiListGroup` PropType for `extraAction` to remove console warning ([#1405](hhttps://github.com/elastic/eui/pull/1405))

**Bug fixes**

- Account for `min` attribute when determining `EuiRange` input width ([#1406](https://github.com/elastic/eui/pull/1406))

## [`6.1.0`](https://github.com/elastic/eui/tree/v6.1.0)

- Added `EuiListGroup` and `EuiListGroupItem` components ([#1377](https://github.com/elastic/eui/pull/1377))
- Convert the other of the services to TypeScript ([#1392](https://github.com/elastic/eui/pull/1392))
- Changed single selection to select existing option in the list ([#1391](https://github.com/elastic/eui/pull/1391))
- Added `showUpdateButton` prop to `EuiSuperDatePicker` ([#1399](https://github.com/elastic/eui/pull/1399))

## [`6.0.1`](https://github.com/elastic/eui/tree/v6.0.1)

**Bug fixes**

- `EuiColorPicker` align color picker popup with color selector when page is scrolled ([#1397](https://github.com/elastic/eui/pull/1397))

## [`6.0.0`](https://github.com/elastic/eui/tree/v6.0.0)

- Added `onFocus` prop to `EuiComboBox` ([#1375](https://github.com/elastic/eui/pull/1375))
- Added `DisambiguateSet` and `ExclusiveUnion` utility types ([#1368](https://github.com/elastic/eui/pull/1368))
- Added `EuiSuperDatePicker` component ([#1351](https://github.com/elastic/eui/pull/1351))
- Fixed up styles for `EuiSuperDatePicker` ([#1389](https://github.com/elastic/eui/pull/1389))
- Altered a few icons and added more: `crossInACircleFilled`, `editorRedo`, `editorUndo`, `grabHorizontal`, `minusInCircleFilled`, `plusInCircleFilled`, `sortable`, `starEmptySpace`, `starFilledSpace`, `starFilled`, `starMinusEmpty`, `starMinusFilled`, `starPlusEmpty`, `pinFilled` ([#1374](https://github.com/elastic/eui/pull/1374))
- Exclude `custom_typings` from `eui.d.ts` ([#1395](https://github.com/elastic/eui/pull/1395))


**Bug fixes**

- Only style anchor tags in `EuiText` that have no class attribute ([#1373](https://github.com/elastic/eui/pull/1373))
- Fixed some EUI services' TS definitions ([#1380](https://github.com/elastic/eui/pull/1380))

**Breaking changes**

- Moved `EuiExpressionButton` contents to `EuiExpression` and deleted `EuiExpressionButton`. Also added support for `color` and `uppercase` props as well as made `onClick` optional to support read only expressions. ([#1368](https://github.com/elastic/eui/pull/1368))

## [`5.8.2`](https://github.com/elastic/eui/tree/v5.8.2)

**Note: this release is a backport containing fixes made in `6.4.0`**

**Bug fixes**

- Fix mouse interaction with `EuiComboBox` in IE11 ([#1437](https://github.com/elastic/eui/pull/1437))

## [`5.8.1`](https://github.com/elastic/eui/tree/v5.8.1)

**Note: this release is a backport containing fixes made in `6.0.0`**

**Bug fixes**

- Fixed some EUI services' TS definitions ([#1380](https://github.com/elastic/eui/pull/1380))

## [`5.8.0`](https://github.com/elastic/eui/tree/v5.8.0)

**Note: this release broke some of the exported TypeScript definitions.**

- Reinstate ([#1353](https://github.com/elastic/eui/pull/1353)) `onBlur` action on `EuiComboBox` ([#1364](https://github.com/elastic/eui/pull/1364))
- Convert roughly half of the services to TypeScript ([#1360](https://github.com/elastic/eui/pull/1360))

**Bug fixes**

- Fixed `onCreateOption` callback of `EuiComboBox` so it isn't called when the input is empty ([#1364](https://github.com/elastic/eui/pull/1364))
- Added `anchorClassName` prop to `EuiPopover` ([#1367](https://github.com/elastic/eui/pull/1367))
- Added support for `fullWidth` on `EuiSuperSelect` ([#1367](https://github.com/elastic/eui/pull/1367))
- Applied new scrollbar customization for Firefox ([#1367](https://github.com/elastic/eui/pull/1367))
- Fixed `EuiSuperSelect` from accessing ref when unmounted ([1369](https://github.com/elastic/eui/pull/1369))
- Allow any color value to be passed to `EuiIcon` ([#1370](https://github.com/elastic/eui/pull/1370))

## [`5.7.0`](https://github.com/elastic/eui/tree/v5.7.0)

- Adjust EUI coloring to better match brand guidelines from Creative Services ([#1356](https://github.com/elastic/eui/pull/1356))

## [`5.6.2`](https://github.com/elastic/eui/tree/v5.6.2)

**Note: this release is a backport**

- Reinstate ([#1353](https://github.com/elastic/eui/pull/1353)) `onBlur` action on `EuiComboBox` ([#1364](https://github.com/elastic/eui/pull/1364))

**Bug fixes**

- Fixed `onCreateOption` callback of `EuiComboBox` so it isn't called when the input is empty ([#1364](https://github.com/elastic/eui/pull/1364))

## [`5.6.1`](https://github.com/elastic/eui/tree/v5.6.1)

**Note: this release is a backport containing changes originally made in `5.8.0`**

**Bug fixes**

- Allow any color value to be passed to `EuiIcon` ([#1370](https://github.com/elastic/eui/pull/1370))

## [`5.6.0`](https://github.com/elastic/eui/tree/v5.6.0)

- Convert `EuiIcon` to TypeScript ([#1355](https://github.com/elastic/eui/pull/1355))
- Add support for `aria-label`, `aria-labelledby` and `aria-describedby` to `EuiCodeEditor` ([#1354](https://github.com/elastic/eui/pull/1354))

**Bug fixes**

- `react-datepicker` set milliseconds to zero when selecting time ([#1361](https://github.com/elastic/eui/pull/1361))
- Revert ([#1353](https://github.com/elastic/eui/pull/1353)) `onBlur` action on `EuiComboBox`. It caused regressions on Kibana. ([#1363](https://github.com/elastic/eui/pull/1363))

## [`5.5.1`](https://github.com/elastic/eui/tree/v5.5.1)

**Bug fixes**

- Fixed TypeScript definitions in `eui.d.ts` ([#1359](https://github.com/elastic/eui/pull/1359))

## [`5.5.0`](https://github.com/elastic/eui/tree/v5.5.0)

**Note: this release broke the exported TypeScript definitions and `EuiComboBox` in certain situations. These are both fixed in `5.6.0`.**

- Altered functionality of `truncate` on `EuiBreadcrumbs` and added `truncate` ability on breadcrumb item ([#1346](https://github.com/elastic/eui/pull/1346))
- Altered `EuiHeader`'s location of `EuiHeaderBreadcrumbs` based on the new `truncate` ability ([#1346](https://github.com/elastic/eui/pull/1346))
- Added support for `href` and `target` props in `EuiBasicTable` actions ([#1347](https://github.com/elastic/eui/pull/1347))
- Added `.eui-textBreakWord` CSS utility class  ([#1349](https://github.com/elastic/eui/pull/1349))
- Added support for `EuiComboBox` converting entered text into a custom option when the user removes focus, e.g. by tabbing to another element. This prevents the `EuiComboBox` from being mistaken for an `EuiInputText`. ([#1353](https://github.com/elastic/eui/pull/1353))

**Bug fixes**

- Fixed word-breaks in table cells for Firefox ([#1349](https://github.com/elastic/eui/pull/1349))
- Fixed EUI when used in an environment lacking ES Modules support, e.g. Jest ([#1358](https://github.com/elastic/eui/pull/1358))

## [`5.4.0`](https://github.com/elastic/eui/tree/v5.4.0)

**Note: this release broke usage of EUI in non-ES Module compatible environments. This is fixed in `5.5.0`.**

- Added 3 new icons — `folderOpen`, `folderClosed`, and `crosshairs` ([#1350](https://github.com/elastic/eui/pull/1350))
- Added `bottomGraphic` prop to `EuiCard` for Kibana home page ([#1338](https://github.com/elastic/eui/pull/1338))
- Added keyboard and screenreader support to `EuiDatePicker` ([#1337](https://github.com/elastic/eui/pull/1337))

**Bug fixes**

- Fixed bug in exporting `CommonProps` in TypeScript definitions ([#1341](https://github.com/elastic/eui/pull/1341))

## [`5.3.0`](https://github.com/elastic/eui/tree/v5.3.0)

- Introduced TypeScript support, converted `EuiSpacer` and `EuiHorizontalRule` ([#1317](https://github.com/elastic/eui/pull/1317))

## [`5.2.0`](https://github.com/elastic/eui/tree/v5.2.0)

- Added `email` icon to `EuiIcon` ([#1331](https://github.com/elastic/eui/pull/1331))
- Added IBM logo in colour and mono
([#1321](https://github.com/elastic/eui/pull/1321))
- Added support for nodes as "Action" column headers in `EuiBasicTable`, which was overlooked in the original change in `4.5.0` ([#1312](https://github.com/elastic/eui/pull/1312))
- Updated `GlobalDatePicker` example to include all Kibana features ([#1219](https://github.com/elastic/eui/pull/1219))
- Adjusted `EuiDatePickerRange` to allow for deeper customization ([#1219](https://github.com/elastic/eui/pull/1219))
- Added `contentProps` and `textProps` to `EuiButton` and `EuiButtonEmpty` ([#1219](https://github.com/elastic/eui/pull/1219))
- TypeScript types are now published to a `eui.d.ts` top-level file ([#1304](https://github.com/elastic/eui/pull/1304))
- Added `filterWith` option for `EuiSearchBar` filters of type `field_value_selection` ([#1328](https://github.com/elastic/eui/pull/1328))

**Bug fixes**

- `EuiBasicTable` now converts the `EuiTableRowCell` `header` into `undefined` if it's been provided as a non-string node, hiding the header and preventing the node from being rendered as `[object Object]` on narrow screens ([#1312](https://github.com/elastic/eui/pull/1312))
- Fixed `fullWidth` size of `EuiComboBox`, a regression introduced in `4.7.0` ([#1314](https://github.com/elastic/eui/pull/1314))
- Fixed error when passing empty string as `value` prop for `EuiSuperSelect` ([#1319](https://github.com/elastic/eui/pull/1319))
- `EuiExpressionButton` now shows focus state when user tabs to it ([#1326](https://github.com/elastic/eui/pull/1326))
- Added `baseline` as a possible value to `EuiFlexGroup`'s `FlexGroupAlignItems` type ([#1329](https://github.com/elastic/eui/pull/1329))

## [`5.1.0`](https://github.com/elastic/eui/tree/v5.1.0)

- `EuiToken` now exports enumerated constants for `SHAPES` and `COLORS` ([#1301](https://github.com/elastic/eui/pull/1301))
- Added mixins for `EuiCallOut` coloring and `EuiTooltip` styles ([#1305](https://github.com/elastic/eui/pull/1305))
- Improve TypeScript definitions for `EuiTableRowCellProps` ([#1310](https://github.com/elastic/eui/pull/1310))

## [`5.0.1`](https://github.com/elastic/eui/tree/v5.0.1)

**Bug fixes**

- Fixed size of `EuiSuperSelect`'s dropdown menu when there is no initial selection ([#1295](https://github.com/elastic/eui/pull/1295))
- Added TypeScript definitions for `EuiPopoverTitle` and the beta and notification badges. Ensure tab TS definitions are included in the main definition index. Fix typo in icon types ([#1299](https://github.com/elastic/eui/pull/1299))

## [`5.0.0`](https://github.com/elastic/eui/tree/v5.0.0)

- Added `EuiToken` component ([#1270](https://github.com/elastic/eui/pull/1270))
- Added `beaker` icon to `EuiIcon` and updated the `EuiBetaBadge` styling ([#1291](https://github.com/elastic/eui/pull/1291/))
- Removed calls to deprecated `findDOMNode` ([#1285](https://github.com/elastic/eui/pull/1285))

**Breaking changes**

- Changed `EuiMutationObserver` to a render prop component ([#1285](https://github.com/elastic/eui/pull/1285))
- `EuiPortal` no longer accepts a React node for `insert.sibling` value ([#1285](https://github.com/elastic/eui/pull/1285))
- `popover_positioning` service's methods no longer accept React node values ([#1285](https://github.com/elastic/eui/pull/1285))

**Bug fixes**

- Added TypeScript definitions for tab components ([#1288](https://github.com/elastic/eui/pull/1288))

## [`4.8.0`](https://github.com/elastic/eui/tree/v4.8.0)

- Added `branch` icon to `EuiIcon` ([#1249](https://github.com/elastic/eui/pull/1249/))
- Added and updated new product logos to `EuiIcon` ([#1279](https://github.com/elastic/eui/pull/1279))

**Bug fixes**

- Added TypeScript definitions for `EuiToolTip`'s `delay` prop. ([#1284](https://github.com/elastic/eui/pull/1284))
- Added TypeScript definitions for step components, and some checkbox definition fixes ([#1263](https://github.com/elastic/eui/pull/1263))

**Framer X**

- Added Framer component for `EuiDescirptionList` ([#1276](https://github.com/elastic/eui/pull/1276))

## [`4.7.0`](https://github.com/elastic/eui/tree/v4.7.0)

- Added `apmTrace` icon to `EuiIcon` set ([#1263](https://github.com/elastic/eui/pull/1263))
- Added [Framer X](http://www.framer.com) component source files under the `src-framer` directory ([#1263](https://github.com/elastic/eui/pull/1263))
- Added `compressed` prop to `EuiComboBox` ([#1258](https://github.com/elastic/eui/pull/1258))
- Added guidelines for Sass usage. ([#1257](https://github.com/elastic/eui/pull/1257))

**Bug fixes**

- `EuiComboBox` no longer throws a _Maximum update depth exceeded_ error when used in popovers/modals ([#1258](https://github.com/elastic/eui/pull/1258))
- `Escape` key now closes `EuiComboBox` options list ([#1258](https://github.com/elastic/eui/pull/1258))
- Fixed margin issue around `EuiFlexGrid` in mobile displays ([#1257](https://github.com/elastic/eui/pull/1257))
- Fixed positioning and padding display issue in `EuiRange` ([#1257](https://github.com/elastic/eui/pull/1257))
- Fixed `highContrastTextColor` SASS function to account for background lightness and exit possible infinite loops ([#1275](https://github.com/elastic/eui/pull/1275))

## [`4.6.1`](https://github.com/elastic/eui/tree/v4.6.1)

**Bug fixes**

- Added TypeScript definitions for `EuiFieldPassword`. ([#1255](https://github.com/elastic/eui/pull/1255))
- Added TypeScript definitions for `EuiConfirmModal`, remove `AnyProps`, and several definition fixes ([#1260](https://github.com/elastic/eui/pull/1260))

## [`4.6.0`](https://github.com/elastic/eui/tree/v4.6.0)

- Increased default font size of tabs in K6 theme ([#1244](https://github.com/elastic/eui/pull/1244))

**Bug fixes**

- Fixed select warning on falsy value in EuiSelect ([#1254](https://github.com/elastic/eui/pull/1254))

**Bug fixes**

- Add TypeScript definitions for `EuiRange` and `EuiRadio`, and correct the definitions for `EuiRadioGroup` ([#1253](https://github.com/elastic/eui/pull/1253))

## [`4.5.2`](https://github.com/elastic/eui/tree/v4.5.2)

**Bug fixes**

- TypeScript definition changes for `EuiAccordion`, `EuiDescriptionList`, `EuiForm`, `EuiFormHelpText` and the accessibility services, plus a number of other TS fixes ([#1247](https://github.com/elastic/eui/pull/1247))

## [`4.5.1`](https://github.com/elastic/eui/tree/v4.5.1)

**Bug fixes**

- Changed names of `*beatApp` types in `EuiIcon` to follow a consistent naming pattern ([#1243](https://github.com/elastic/eui/pull/1238))

## [`4.5.0`](https://github.com/elastic/eui/tree/v4.5.0)

- Added export for `TYPES` to `EuiAvatar` ([#1238](https://github.com/elastic/eui/pull/1238))
- Updated node-sass dependency to support OSX Mojave ([#1238](https://github.com/elastic/eui/pull/1238))
- Added TypeScript definitions for `EuiFieldNumber`, `EuiFormLabel` and `EuiSelect`, and fix the `EuiTextColor` definition. ([#1240](https://github.com/elastic/eui/pull/1240))
- Added support for nodes as column headers in `EuiBasicTable` for supporting things like tooltips and localized text. ([#1234](https://github.com/elastic/eui/pull/1234))

## [`4.4.1`](https://github.com/elastic/eui/tree/v4.4.1)

**Bug fixes**

- Fixes TypeScript definitions for `EuiKeyPadMenuItem` and `EuiKeyPadMenuItemButton` ([#1232](https://github.com/elastic/eui/pull/1232))

## [`4.4.0`](https://github.com/elastic/eui/tree/v4.4.0)

- Added TypeScript typings for `EuiKeyPadMenu` ([#1229](https://github.com/elastic/eui/pull/1229))
- Forced `EuiPopover` contents to stick to its initial position when the content changes ([#1199](https://github.com/elastic/eui/pull/1199))
- Updated `EuiIcon` app icon set and allow them to adjust colorschemes ([#1225](https://github.com/elastic/eui/pull/1225))

**Bug fixes**

- Fixed EuiToolTip to show tooltips on disabled elements ([#1222](https://github.com/elastic/eui/pull/1222))
- Fixed EuiAvatar when name is composed entirely of whitespace ([#1231](https://github.com/elastic/eui/pull/1231))

## [`4.3.0`](https://github.com/elastic/eui/tree/v4.3.0)

- Added a new `colorPalette` service for retrieving and generating color arrays for use in charts ([#1209](https://github.com/elastic/eui/pull/1209))
- Added `1` as a valid value for the `columns` prop in `EuiFlexGrid` ([#1210](https://github.com/elastic/eui/pull/1210))
- Make `htmlIdGenerator` only return valid HTML4 ids ([#637](https://github.com/elastic/eui/pull/637))
- Use `cursor: pointer` to indicate clickable `EuiTable` rows ([#1213](https://github.com/elastic/eui/pull/1213))
- Add `lockOpen` icon ([#1215](https://github.com/elastic/eui/pull/1215))

## [`4.2.0`](https://github.com/elastic/eui/tree/v4.2.0)

- Added some opacity options to `EuiLineSeries` and `EuiAreaSeries` ([#1198](https://github.com/elastic/eui/pull/1198))
- Added `initialFocus` prop for focus trapping to `EuiPopover` and `EuiModal` ([#1099](https://github.com/elastic/eui/pull/1099))
- Added table footer support with `EuiTableFooter` and `EuiTableFooterCell` ([#1202](https://github.com/elastic/eui/pull/1202))

## [`4.1.0`](https://github.com/elastic/eui/tree/v4.1.0)

- Added `direction` to `EuiFlexGroup` prop types interface ([#1196](https://github.com/elastic/eui/pull/1196))
- Made `description` prop optional for `EuiDescribedFormGroup` ([#1191](https://github.com/elastic/eui/pull/1191))
- Fixed issue with unselected tabs and aria-controls attribute in EuiTabbedContent
- Added `tag` icon ([#1188](https://github.com/elastic/eui/pull/1188))
- Replaced `logging` app icon ([#1194](https://github.com/elastic/eui/pull/1194))
- Made `EuiBasicTable` rows keyboard-accessibile when they are clickable ([#1206](https://github.com/elastic/eui/pull/1206))

**Bug fixes**

- Fixed cross-axis alignment bug when positioning EuiPopover ([#1197](https://github.com/elastic/eui/pull/1197))
- Added background to `readOnly` inputs ([#1188](https://github.com/elastic/eui/pull/1188))
- Fixed some modal default and responsive sizing ([#1188](https://github.com/elastic/eui/pull/1188))
- Fixed z-index issue of `EuiComboBoxOptionsList` especially inside modals ([#1192](https://github.com/elastic/eui/pull/1192))

## [`4.0.1`](https://github.com/elastic/eui/tree/v4.0.1)

**Bug fixes**

- Fixed an issue in `EuiTooltip` because IE1 didn't support `document.contains()` ([#1190](https://github.com/elastic/eui/pull/1190))
- Fixed some issues around parsing string values in `EuiSearchBar` and `EuiQuery` ([#1189](https://github.com/elastic/eui/pull/1189))

## [`4.0.0`](https://github.com/elastic/eui/tree/v4.0.0)

- Added `delay` prop to `EuiToolTip` ([#1103](https://github.com/elastic/eui/pull/1103))

**Breaking changes**

- `EuiBasicTable` now shows up to 2 actions before condensing to all popover, but still displaying the top/primary 2 actions as well ([#1103](https://github.com/elastic/eui/pull/1103))
- `EuiBasicTable` will automatically add `hasActions` and `isSelectable` to allow proper responsive style handling, but are still overridable ([#1103](https://github.com/elastic/eui/pull/1103))

## [`3.11.0`](https://github.com/elastic/eui/tree/v3.11.0)

- Decorated `pagination` _next_ and _previous_ buttons with `data-test-subj`. ([#1182](https://github.com/elastic/eui/pull/1182))
- Added `euiFacetButton` and `euiFacetGroup` ([#1167](https://github.com/elastic/eui/pull/1167))
- Added `width` prop to `EuiContextMenu` panels ([#1173](https://github.com/elastic/eui/pull/1173))
- Added patterns for global query and filters ([#1137](https://github.com/elastic/eui/pull/1137))

**Bug fixes**

- Fixed `onClickAriaLabel` console error stemming from `EuiComboBoxPill`  ([#1183](https://github.com/elastic/eui/pull/1183))

## [`3.10.0`](https://github.com/elastic/eui/tree/v3.10.0)

- Added `maxWidth` prop to `EuiModal` ([#1165](https://github.com/elastic/eui/pull/1165))
- Support field names with `_` characters in search queries ([#1180](https://github.com/elastic/eui/pull/1180))
- Added ability to include multiple fields in a value selection filter for `EuiSearchBar` ([#1179](https://github.com/elastic/eui/pull/1179))

**Bug fixes**

- Fixed an IE11 `EuiModal` width issue by changing the `min-width` to a pixel value ([#1174](https://github.com/elastic/eui/pull/1174))

## [`3.9.0`](https://github.com/elastic/eui/tree/v3.9.0)

- Added `infraApp` icon ([#1161](https://github.com/elastic/eui/pull/1161))
- Added sizes to `EuiButtonIcon` ([#1145](https://github.com/elastic/eui/pull/1145))
- Added `singleSelection.asPlainText` prop to `EuiComboBox` ([#1139](https://github.com/elastic/eui/pull/1139))
- Added proper aria labeling to `EuiSearchBar` and `EuiBasicTable` so searching is properly announced ([#1181](https://github.com/elastic/eui/pull/1181))

**Bug fixes**

- Fixed `makeHighContrastColor` sass mixin to properly output an accessible color contrast ([#1158](https://github.com/elastic/eui/pull/1158))
- Fixed `EuiTooltip` to interact correctly when the anchor is a disabled form element ([#1158](https://github.com/elastic/eui/pull/1158))
- Fixed `EuiButton` (with icon) and `EuiButtonEmpty` truncation ([#1145](https://github.com/elastic/eui/pull/1145))
- Fixed alignment and coloring of form control clear button ([#1145](https://github.com/elastic/eui/pull/1145))
- Fixed `EuiToolTip` from setting state after component unmounts ([#1163](https://github.com/elastic/eui/pull/1163))

## [`3.8.0`](https://github.com/elastic/eui/tree/v3.8.0)

- Added a new `EuiStat` component for displaying prominent stats ([#1146](https://github.com/elastic/eui/pull/1146))
- Added color and monotone icons for AWS and GCP. ([#1135](https://github.com/elastic/eui/pull/1135))
- Added TypeScript definition for `EuiComboBox` ([#1115](https://github.com/elastic/eui/pull/1115))

**Bug fixes**

- Fixed `EuiSearchBar` when used as a controlled component in React 16.4 ([#1153](https://github.com/elastic/eui/pull/1153))
- Fixed `onChange` typedef on `EuiSwitch` ([#1144](https://github.com/elastic/eui/pull/1144)
- Fixed `EuiToolTip`'s inability to update its position when tooltip content changes ([#1116](https://github.com/elastic/eui/pull/1116))
- Fixed `EuiSearchBar`'s syntax parsing to allow multiple escaped characters in a single field value

## [`3.7.0`](https://github.com/elastic/eui/tree/v3.7.0)

- Added `zIndexAdjustment` to `EuiPopover` which allows tweaking the popover content's `z-index` ([#1097](https://github.com/elastic/eui/pull/1097))
- Added new `EuiSuperSelect` component and `hasArrow` prop to `EuiPopover` ([#921](https://github.com/elastic/eui/pull/921))
- Added a new `EuiWindowEvent` component for declarative, safe management of `window` event listeners ([#1127](https://github.com/elastic/eui/pull/1127))
- Changed `Flyout` component to close on ESC keypress even if the flyout does not have focus, using new Window Event component ([#1127](https://github.com/elastic/eui/pull/1127))
- Added TypeScript definitions for `EuiAvatar` component and the `color` services ([#1120](https://github.com/elastic/eui/pull/1120))

**Bug fixes**

- `EuiFlyout` responsive mode now gracefully overrides a custom `maxWidth` ([#1124](https://github.com/elastic/eui/pull/1124)

## [`3.6.1`](https://github.com/elastic/eui/tree/v3.6.1)

- Added TypeScript definition for `findTestSubject` test util ([#1106](https://github.com/elastic/eui/pull/1106))

**Bug fixes**

- Fixed bug where `EuiToolTip` content wasn't removed if its anchor is removed from the document ([#1119](https://github.com/elastic/eui/pull/1119))

## [`3.6.0`](https://github.com/elastic/eui/tree/v3.6.0)

- Added `EuiCopy` ([#1112](https://github.com/elastic/eui/pull/1112))
- Added `disabled` to `EuiRadioGroup.options` ([#1111](https://github.com/elastic/eui/pull/1111))

**Bug fixes**

- `EuiWrappingPopover` only re-attach anchor element on unmount if anchor element is still attached to DOM
([#1114](https://github.com/elastic/eui/pull/1114))

- Fixed `EuiSeriesChart` overrides `react-vis` classes.([#1123](https://github.com/elastic/eui/pull/1123))

## [`3.5.1`](https://github.com/elastic/eui/tree/v3.5.1)

- Fixed a bug around `indeterminate` checkboxes ([#1110](https://github.com/elastic/eui/pull/1110))

## [`3.5.0`](https://github.com/elastic/eui/tree/v3.5.0)

- Added support for `indeterminate` to `EuiCheckbox` ([#1108](https://github.com/elastic/eui/pull/1108))

## [`3.4.0`](https://github.com/elastic/eui/tree/v3.4.0)

- Added typings for `EuiToolTip` and `EuiIconTip` ([#1087](https://github.com/elastic/eui/pull/1087))
- Added `spacesApp` logo to `EuiIcon` set ([#1065](https://github.com/elastic/eui/pull/1065))
- Added `!default` to border SASS props ([#1079](https://github.com/elastic/eui/pull/1079))
- Added `repositionOnScroll` prop to `EuiPopover` which enables repositioning the popover when the window is scrolled. ([#1064](https://github.com/elastic/eui/pull/1064))
- Allow `_` and `*` characters to be used in `EuiSearchBar` query terms ([#1058](https://github.com/elastic/eui/pull/1058))
- Added more `status` options for `EuiSteps` ([#1088](https://github.com/elastic/eui/pull/1088))
- Added `maxWidth` prop `EuiFlyout` ([#1090](https://github.com/elastic/eui/pull/1090))
- Added `string` to allowed `restrictWidth` prop type of `EuiPage` and `EuiPageBody` ([#1090](https://github.com/elastic/eui/pull/1090))
- Added `.eui-textBreakNormal` and `@mixin euiTextTruncate` as CSS/SASS utilities ([#1092](https://github.com/elastic/eui/pull/1092))
- Added `fullWidth` support to `EuiComboBox` ([#1095](https://github.com/elastic/eui/pull/1095))

**Bug fixes**

- `EuiMutationObserver`'s `children` prop is no longer marked as required ([#1076](https://github.com/elastic/eui/pull/1076))
- Fixed large drop shadows so they work on darker backgrounds ([#1079](https://github.com/elastic/eui/pull/1079))
- Added `resize-observer-polyfill` as a dependency (was previously a devDependency) ([#1085](https://github.com/elastic/eui/pull/1085))
- Fixed `EuiBasicTable` to inform its parent about a selection change triggered by a different set of `items` ([#1086](https://github.com/elastic/eui/pull/1086))
- Fixed width of `EuiFilterGroup`'s popover ([#1078](https://github.com/elastic/eui/pull/1078))
- Fixed `EuiStepsHorizontal`'s title wrapping in IE ([#1088](https://github.com/elastic/eui/pull/1088))
- Fixed wrong class name being added to `EuiPageBody` when `restrictWidth !== false` ([#1090](https://github.com/elastic/eui/pull/1090))

## [`3.3.0`](https://github.com/elastic/eui/tree/v3.3.0)

- Added `onTableChange` callback to `EuiInMemoryTable` which notifies on sorting and pagination changes. ([#1060](https://github.com/elastic/eui/pull/1060))
- `EuiComboBox` now applies the provided `data-test-subj` to its options list element with the suffix `-optionsList` so you can find a specific combo box instance's options list. This wasn't previously possible because the options list is attached to the body element, not the combo box element. This is in addition to the existing `data-test-subj="comboBoxOptionsList"`. ([#1054](https://github.com/elastic/eui/pull/1054))
- EUI now provides minified versions of the themes' CSS files. ([#1070](https://github.com/elastic/eui/pull/1070))

**Bug fixes**

- Fixed `EuiSeriesChart` (previously `EuiXYChart`) responsive resize in a flexbox layout ([#1041](https://github.com/elastic/eui/pull/1041))
- `EuiInMemoryTable` no longer mutates the `items` prop array when sorting, adding deterministic sorting ([#1057](https://github.com/elastic/eui/pull/1057))
- `EuiBasicTable` actions now close their context menu when clicked ([#1069](https://github.com/elastic/eui/pull/1069))

**Experimental breaking change**

 - Renamed `EuiXYChart` to `EuiSeriesChart`, `EuiXYChartUtils` to `EuiSeriesChartUtils`, `EuiXYChartAxisUtils` to `EuiSeriesChartAxisUtils`, and  `EuiXYChartTextUtils` to `EuiSeriesChartTextUtils` ([#1066](https://github.com/elastic/eui/pull/1066))

## [`3.2.1`](https://github.com/elastic/eui/tree/v3.2.1)

- Added `closeButtonAriaLabel` property to `EuiFlyout` ([#1031](https://github.com/elastic/eui/pull/1031))
- Added types for `EuiToast`, `EuiGlobalToastList`, and `EuiGlobalToastListItem` ([#1045](https://github.com/elastic/eui/pull/1045))
- Added a handful of third-party logos to `EuiIcon` ([#1033](https://github.com/elastic/eui/pull/1033))

**Bug fixes**

- Removed IE flex column fix in favor of forcing the consumer to add a `grow` prop. ([#1044](https://github.com/elastic/eui/pull/1044))
- Removed max-width to children of `EuiPopover`. ([#1044](https://github.com/elastic/eui/pull/1044))

## [`3.2.0`](https://github.com/elastic/eui/tree/v3.2.0)

**Note: this release creates a minor regression to the display of `EuiFlexItem`s inside a `column` `EuiFlexGroup`. This is fixed in `3.2.1`.**
**Note: this release creates a minor regression to the display of `EuiPopoverTitle`. This is fixed in `3.2.1`.**

- Added typings for 'EuiBadge' ([#1034](https://github.com/elastic/eui/pull/1034))
- Added a visual pattern for Kibana's Global Date Picker ([#1026](https://github.com/elastic/eui/pull/1026))
- Added `responsive` prop to `EuiFlexGrid` ([#1026](https://github.com/elastic/eui/pull/1026))
- Added `expand` prop to `EuiTabs` and `EuiTabbedContent` ([#1026](https://github.com/elastic/eui/pull/1026))
- Allow `titleElement` to be passed to `EuiCard` ([#1032](https://github.com/elastic/eui/pull/1032))

**Bug fixes**

- Fixed `EuiContextMenuPanel` calling `ref` after being unmounted ([#1038](https://github.com/elastic/eui/pull/1038))
- `EuiOutsideClickDetector` supports nested detectors in the DOM tree ([#1039](https://github.com/elastic/eui/pull/1039))
- To make it more accessible, added a random id to `EuiSwitch`'s id prop if none is passed.  ([#779](https://github.com/elastic/eui/pull/779))
- `BetaBadge` now shows outside of `EuiPanel` bounds in IE ([#1032](https://github.com/elastic/eui/pull/1032))

## [`3.1.0`](https://github.com/elastic/eui/tree/v3.1.0)

- Added `EuiMutationObserver` to expose Mutation Observer API to React components ([#966](https://github.com/elastic/eui/pull/966))
- Added `EuiWrappingPopover` which allows existing non-React elements to be popover anchors ([#966](https://github.com/elastic/eui/pull/966))
- `EuiPopover` accepts a `container` prop to further restrict popover placement ([#966](https://github.com/elastic/eui/pull/966))
- `EuiPortal` can inject content at arbitrary DOM locations, added `portalRef` prop ([#966](https://github.com/elastic/eui/pull/966))

**Bug fixes**

- `EuiPopover` re-positions with dynamic content (including CSS height/width transitions) ([#966](https://github.com/elastic/eui/pull/966))

## [`3.0.5`](https://github.com/elastic/eui/tree/v3.0.5)

**Note: this release is a backport containing changes originally made in `3.6.1`**

**Bug fixes**

- Fixed bug where `EuiToolTip` content wasn't removed if its anchor is removed from the document ([#1119](https://github.com/elastic/eui/pull/1119))

## [`3.0.4`](https://github.com/elastic/eui/tree/v3.0.4)

**Note: this release is a backport containing changes originally made in `3.4.0`**

- Allow `_` and `*` characters to be used in `EuiSearchBar` query terms ([#1058](https://github.com/elastic/eui/pull/1058))

## [`3.0.3`](https://github.com/elastic/eui/tree/v3.0.3)

**Note: this release is a backport bugfix release containing changes originally made in `3.2.0`**

**Bug fixes**

- Fixed `EuiContextMenuPanel` calling `ref` after being unmounted ([#1038](https://github.com/elastic/eui/pull/1038))

## [`3.0.2`](https://github.com/elastic/eui/tree/v3.0.2)

- Added `restrictWidth` option to `EuiPageBody` ([#1024](https://github.com/elastic/eui/pull/1024))

**Bug fixes**

- Fixed `EuiPageContent` centered layouts ([#1024](https://github.com/elastic/eui/pull/1024))

## [`3.0.1`](https://github.com/elastic/eui/tree/v3.0.1)

- Added typings for `EuiEmptyPrompt`, `EuiCode`, `EuiCodeBlock`, and `EuiCallOut` ([#1010](https://github.com/elastic/eui/pull/1010))
- Make utility type `Omit` compatible with new `keyof` behaviour introduced in TypeScript 2.9 ([#1017](https://github.com/elastic/eui/pull/1017))
- Added visualization chart type icons ([#1020](https://github.com/elastic/eui/pull/1020))

**Bug fixes**

- Fixed `EuiContextMenu` causing scroll-jumps because of premature browser focus. ([#1018](https://github.com/elastic/eui/pull/1018))

## [`3.0.0`](https://github.com/elastic/eui/tree/v3.0.0)

- Fixed `EuiHeader` responsive styles ([#1009](https://github.com/elastic/eui/pull/1009))
- Added `prepend` and `append` props to `EuiFormControlLayout` ([#961](https://github.com/elastic/eui/pull/961))
- Updated style implementation of `EuiFilterGroup` and `EuiFilterGroupButton` ([#961](https://github.com/elastic/eui/pull/961))
- Added `EuiDatePickerRange` as a way to layout two `EuiDatePicker`s. ([#961](https://github.com/elastic/eui/pull/961))
- Temporarily removed `EuiPage` responsive styles ([#1014](https://github.com/elastic/eui/pull/1014))

**Breaking changes**

- Moved `EuiHeaderNotification` to a generic `EuiNotificationBadge` component ([#1009](https://github.com/elastic/eui/pull/1009))

**Bug fixes**

- `EuiInMemoryTable` no longer resets to the first page on prop update when `items` remains the same ([#1008](https://github.com/elastic/eui/pull/1008))
- Fixed css selector for hiding responsive `EuiBreadcrumb`'s ([#1009](https://github.com/elastic/eui/pull/1009))
- Fixed responsive utility classes for IE ([#1009](https://github.com/elastic/eui/pull/1009))
- Fixed syntax errors in `keyCodes`'s and `EuiContextMenu`'s typescript definition ([#1012](https://github.com/elastic/eui/pull/1012))

## [`2.0.0`](https://github.com/elastic/eui/tree/v2.0.0)

- Added more typings to `EuiContextMenuItemProps` ([#1006](https://github.com/elastic/eui/pull/1006))
- Made some properties of `EuiFlyout` optional ([#1003](https://github.com/elastic/eui/pull/1003))
- Added typings for `EuiFlyout`, `EuiFlyoutBody`, `EuiFlyoutHeader`, and `EuiFlyoutFooter` ([#1001](https://github.com/elastic/eui/pull/1001))
- Gave `EuiFlyout` close button a data-test-subj ([#1000](https://github.com/elastic/eui/pull/1000))
- Updated `react-vis` version to `1.10.2` ([#999](https://github.com/elastic/eui/pull/999))
- Added `component` prop to `EuiTextColor` ([#1011](https://github.com/elastic/eui/pull/1011))

**Breaking changes**

- Altered `EuiPage` and sub-component layout ([#998](https://github.com/elastic/eui/pull/998))
  - `EuiPageHeader` must now be contained within `EuiPageBody`
  - `EuiPageSideBar` must now be **outside** of `EuiPageBody`

**Bug fixes**

- `EuiDescribedFormGroup` now renders its `description` inside of a `div` instead of a `span` ([#1011](https://github.com/elastic/eui/pull/1011))

## [`1.2.1`](https://github.com/elastic/eui/tree/v1.2.1)

**Bug fixes**

- Removed global manipulation of `EuiTitle` sizing in XYCharts ([#997](https://github.com/elastic/eui/pull/997))

## [`1.2.0`](https://github.com/elastic/eui/tree/v1.2.0)

**Note: this release creates a minor regression to the sizing of `EuiTitle`s. This is fixed in `1.2.1`.**

- Added typings for keyCodes ([#988](https://github.com/elastic/eui/pull/988))
- Changed `EuiXYChart` components exports to `/experimental` subfolder ([#975](https://github.com/elastic/eui/pull/975))
- Added beta version of `EuiXYChart` and associated components ([#309](https://github.com/elastic/eui/pull/309))
- Added `size` prop to `EuiIconTip` ([987](https://github.com/elastic/eui/pull/987))
- Added `database`, `filter`, `globe`, and `save` icons ([990](https://github.com/elastic/eui/pull/990))
- Updated typings for `EuiButton`, `EuiButtonEmpty`, and `EuiButtonIcon` to include `<a>` tag attributes like `href` ([#992](https://github.com/elastic/eui/pull/992))

**Bug fixes**

- Fixed some IE11 flex box bugs and documented others (modal overflowing, image shrinking, and flex group wrapping) ([#973](https://github.com/elastic/eui/pull/973))
- Fixed white square that show in double scollbar via `euiScrollBar()` ([989](https://github.com/elastic/eui/pull/989))
- Fixed issue with Accordion would attempt to use properties and accessors on null ([#982](https://github.com/elastic/eui/pull/982))

## [`1.1.0`](https://github.com/elastic/eui/tree/v1.1.0)

- Added more (mainly style) options to `EuiRange` ([#932](https://github.com/elastic/eui/pull/932))
- Cleaned up some `EuiPopover` styles ([#969](https://github.com/elastic/eui/pull/969))
- Added `inputRef` prop to `EuiFieldPassword` ([#970](https://github.com/elastic/eui/pull/970))

**Bug fixes**

- Fixed disabled states of icon buttons ([#963](https://github.com/elastic/eui/pull/963))
- Added word-break fallback for FF & IE in table cell ([#962](https://github.com/elastic/eui/pull/962))
- Fixed `EuiPopover` to show content over modals, flyouts, etc ([#967](https://github.com/elastic/eui/pull/967))
- Fixed background transition on inputs ([#969](https://github.com/elastic/eui/pull/969))

## [`1.0.1`](https://github.com/elastic/eui/tree/v1.0.1)

- `EuiAccordion` use MutationObserver to re-calculate height when children DOM changes ([#947](https://github.com/elastic/eui/pull/947))
- Add `inspect` type option to icon typedef file. ([#952](https://github.com/elastic/eui/pull/952))
- Simplified form control styles. ([#954](https://github.com/elastic/eui/pull/954))

**Bug fixes**

- `EuiPopover` now positions popover content over all other elements, instead of sometimes clipping ([#948](https://github.com/elastic/eui/pull/948))
- `EuiOnClickOutside` works with child components rendered via React portals ([#948](https://github.com/elastic/eui/pull/948))

**Deprecations**

- Replaced the following SASS variables have been replaced `$euiFormControlHeight--compressed`, `$euiFormControlPadding--compressed`, `euiFormBorderColor--disabled`. ([#954](https://github.com/elastic/eui/pull/954))

## [`1.0.0`](https://github.com/elastic/eui/tree/v1.0.0)

- Reduced font sizes of `EuiAvatar` ([#945](https://github.com/elastic/eui/pull/945))
- Changed release process to be fully automated by script ([#944](https://github.com/elastic/eui/pull/944))

**Bug fixes**

- `EuiTooltip` re-positions content correctly after the window is resized ([#936](https://github.com/elastic/eui/pull/936))
- `EuiComboBox` list is positioned correctly in IE ([#946](https://github.com/elastic/eui/pull/946))

## [`0.0.55`](https://github.com/elastic/eui/tree/v0.0.55)

- Added `getPopoverScreenCoordinates` service function for positioining popover/tooltip content, updated `EuiToolTip` to use it ([#924](https://github.com/elastic/eui/pull/924))
- Allow `mode` prop in `EuiCodeEditor` to take custom mode object ([#935](https://github.com/elastic/eui/pull/935))
- `EuiCodeEditor` is now decorated with a `data-test-subj` selector (`codeEditorContainer`) ([#939](https://github.com/elastic/eui/pull/939))
- `EuiCodeEditor` no longer automatically scrolls cursor into view on selection change ([#940](https://github.com/elastic/eui/pull/940))

## [`0.0.54`](https://github.com/elastic/eui/tree/v0.0.54)

**Bug fixes**

- `EuiTabbedContent` now updates dynamic tab content when used as an uncontrolled component ([#931](https://github.com/elastic/eui/pull/931))

## [`0.0.53`](https://github.com/elastic/eui/tree/v0.0.53)

- `EuiComboBox` is now decorated with `data-test-subj` selectors for the search input (`comboxBoxSearchInput`), toggle button (`comboBoxToggleListButton`), and clear button (`comboBoxClearButton`) ([#918](https://github.com/elastic/eui/pull/918))
- `EuiComboBox` now gives focus to the search input when the user clicks the clear button, to prevent focus from defaulting to the body ([#918](https://github.com/elastic/eui/pull/918))
- Fixed visual size of inputs by setting the box-shadow border to `inset` ([#928](https://github.com/elastic/eui/pull/928))
- Per-column custom sort values added to `EuiInMemoryTable` ([#929](https://github.com/elastic/eui/pull/929))

**Non-breaking major changes**

- Added close (`cross`) button as default way to close to `EuiFlyout` when `onClose` is provided ([#925](https://github.com/elastic/eui/pull/925))
- Fleshed out `EuiFlyoutHeader` for consistency (see docs) ([#925](https://github.com/elastic/eui/pull/925))

**Bug fixes**

- Added `role="dialog"` to `EuiFlyout` to improve screen reader accessibility ([#916](https://github.com/elastic/eui/pull/916))
- Default sort comparator (used by `EuiInMemoryTable`) now handles `null` and `undefined` values ([#922](https://github.com/elastic/eui/pull/922))

## [`0.0.52`](https://github.com/elastic/eui/tree/v0.0.52)

- Added updated logos for Cloud and Cloud ECE ([#906](https://github.com/elastic/eui/pull/906))
- Added the ability for `EuiBetaBadge` to appear on `EuiPanel` similar to `EuiCard` ([#885](https://github.com/elastic/eui/pull/888))
- Added `restrictWidth` to `EuiPage` ([#896](https://github.com/elastic/eui/pull/896))
- Added `resize` prop to `EuiTextArea` that defaults to ‘vertical’ (only height) ([#894](https://github.com/elastic/eui/pull/894))
- Added multiple style-only adjustments to `EuiFormControlLayout` buttons/icons ([#894](https://github.com/elastic/eui/pull/894))
- Shifted `readOnly` inputs to not have left padding unless it has an icon ([#894](https://github.com/elastic/eui/pull/894))
- Added more customization options to `EuiAvatar` ([#903](https://github.com/elastic/eui/pull/903))
- Added more color options to `EuiButtonIcon` ([#907](https://github.com/elastic/eui/pull/907))
- Added icon for EMS (Elastic Map Service) (`emsApp`) ([#914](https://github.com/elastic/eui/pull/914))
- Added support for `href`, `target`, and `rel` properties for `EuiContextMenu` items ([#911](https://github.com/elastic/eui/pull/911))
- Added responsive helpers in the form of `EuiShowFor` and `EuiHideFor` components and corresponding CSS classes. ([#909](https://github.com/elastic/eui/pull/909))

**Deprecations**

- Replaced `$breakpoints` in favor of better named `$euiBreakpoints` ([#909](https://github.com/elastic/eui/pull/909))
- Replaced the following mixin `screenXSmall()`, `screenSmall()`, `screenMedium()`, `screenLarge()`, `screenSmallMediumLarge()` in favor of a single `euiBreakpoint()`. ([#909](https://github.com/elastic/eui/pull/909))

**Bug fixes**

- Removed `.nvmrc` file from published npm package ([#892](https://github.com/elastic/eui/pull/892))
- `EuiComboBox` no longer shows the _clear_ icon when it's a no-op ([#890](https://github.com/elastic/eui/pull/890))
- `EuiIcon` no longer takes focus in Edge and IE unless `tabIndex` is defined as a value other than `"-1"` ([#900](https://github.com/elastic/eui/pull/900))
- Fixed regression introduced in `0.0.50` in which the form control icons blocked users from clicking the control ([#898](https://github.com/elastic/eui/pull/898))
- Fixed `EuiSwitch` background in case it’s been placed on a gray background ([#894](https://github.com/elastic/eui/pull/894))
- Fixed `EuiComboBox` hidden input focus styles ([#894](https://github.com/elastic/eui/pull/894))
- Fixed responsive widths of `EuiDescribedFormGroup` ([#894](https://github.com/elastic/eui/pull/894))
- Fixed descenders being cut off in `EuiSelect` ([#894](https://github.com/elastic/eui/pull/894))
- Fixed extra spacing applied by Safari to `EuiFieldSearch` ([#894](https://github.com/elastic/eui/pull/894))
- Fixed contrast issues in dark theming ([#907](https://github.com/elastic/eui/pull/907))

## [`0.0.51`](https://github.com/elastic/eui/tree/v0.0.51)

- Added `textStyle="reverse"` prop to `EuiDescriptionList` as well as a class (`.eui-definitionListReverse`) for `dl`'s within `EuiText` ([#882](https://github.com/elastic/eui/pull/882))
- Added `inspect` icon ([#886](https://github.com/elastic/eui/pull/886))
- Added `layout` prop to `EuiCard` ([#885](https://github.com/elastic/eui/pull/885))

**Bug fixes**

- Moved `EuiFieldSearch`'s and `EuiValidateControl`'s ref out of render into `setRef` methods ([#883](https://github.com/elastic/eui/pull/883))

## [`0.0.50`](https://github.com/elastic/eui/tree/v0.0.50)

**Note: this release creates a minor regression to form controls containing icons, in which the icon blocks the user from clicking the control. This is fixed in `0.0.52`.**

- Created `EuiToggle`, `EuiButtonToggle`, and `EuiButtonGroup` ([#872](https://github.com/elastic/eui/pull/872))
- `EuiBasicTable` and `EuiInMemoryTable` now accept `rowProps` and `cellProps` callbacks, which let you apply custom props to rows and props ([#869](https://github.com/elastic/eui/pull/869))
- Added `offine` and `online` icons ([#881](https://github.com/elastic/eui/pull/881))

**Bug fixes**

- `EuiContextMenuPanel` now updates appropriately if its items are modified ([#887](https://github.com/elastic/eui/pull/887))
- `EuiComboBox` is no longer a focus trap, the clear button is now keyboard-accessible, and the virtualized list no longer interferes with the tab order ([#866](https://github.com/elastic/eui/pull/866))
- `EuiButton`, `EuiButtonEmpty`, and `EuiButtonIcon` now look and behave disabled when `isDisabled={true}` ([#862](https://github.com/elastic/eui/pull/862))
- `EuiGlobalToastList` no longer triggers `Uncaught TypeError: _this.callback is not a function`  ([#865](https://github.com/elastic/eui/pull/865))
- `EuiGlobalToastList` checks to see if it has dismissed a toast before re-dismissing it ([#868](https://github.com/elastic/eui/pull/868))
- Added FF/IE fallback for `.eui-textBreakWord` ([#864](https://github.com/elastic/eui/pull/864))
- Fixed `EuiCard` description text color when used in/as an anchor tag ([#864](https://github.com/elastic/eui/pull/864))
- Fixed `EuiCard` IE bugs ([#864](https://github.com/elastic/eui/pull/864))
- Fixed button labeling for `EuiFormControlLayout` and `EuiComboBox` accessibility ([#876](https://github.com/elastic/eui/pull/876))
- Fixed `EuiBreadcrumb` slash alignment when truncating ([#878](https://github.com/elastic/eui/pull/878))

**Breaking changes**

- `EuiSearchBar` no longer has an `onParse` callback, and now passes an object to `onChange` with the shape `{ query, queryText, error }` ([#863](https://github.com/elastic/eui/pull/863))
- `EuiInMemoryTable`'s `search.onChange` callback now passes an object with `{ query, queryText, error }` instead of only the query ([#863](https://github.com/elastic/eui/pull/863))
- `EuiFormControlLayout` no longer has `onClear`, `iconSide`, or `onIconClick` props. Instead of `onClear` it now accepts a `clear` object of the shape `{ onClick }`. Instead of the icon props, it now accepts a single `icon` prop which be either a string or an object of the shape `{ type, side, onClick }`. ([#866](https://github.com/elastic/eui/pull/866))
- `EuiBasicTable` and `EuiInMemoryTable` pass-through cell props (defined by the `columns` prop and the `cellProps` prop) used to be applied to the `div` inside of the `td` element. They're now applied directly to the `td` element. ([#869](https://github.com/elastic/eui/pull/869))

## [`0.0.49`](https://github.com/elastic/eui/tree/v0.0.49)

**Bug fixes**

- `EuiInMemoryTable` now applies its search filter ([#851](https://github.com/elastic/eui/pull/851))
- `EuiInMemoryTable` and `EuiBasicTable` now pass unknown props through to their child ([#836](https://github.com/elastic/eui/pull/836))
- Added `EuiHeaderLinks` which allow you to construct navigation in the header in place of the app menu. ([#844](https://github.com/elastic/eui/pull/844))
- `EuiPopover` will use an alert to warn the user it traps focus ([#844](https://github.com/elastic/eui/pull/844))

**Breaking changes**

- EUI requires React `16.3` or higher ([#849](https://github.com/elastic/eui/pull/849))
- `EuiHeaderBreadcrumbs` refactored to use `EuiBreadcrumbs`. This removed all child components of `EuiHeaderBreadcrumbs`. ([#844](https://github.com/elastic/eui/pull/844))

## [`0.0.48`](https://github.com/elastic/eui/tree/v0.0.48)

**Bug fixes**

- `EuiComboBox` does not pass `isDisabled` prop to `EuiComboBoxOptionsList` to avoid "React does not recognize the 'isDisabled' prop on a DOM element" console warning ([#838](https://github.com/elastic/eui/pull/838))
- `EuiComboBox` does not display clear icon when `isClearable` prop is set to false and `selectedOptions` prop is provided ([#838](https://github.com/elastic/eui/pull/838))

**Breaking changes**

- Move `EuiBasicTable`'s `itemId` prop from `selection` to a top-level property ([#830](https://github.com/elastic/eui/pull/830))
- Renamed/refactored `requiresAriaLabel` prop validator to a more general `withRequiredProp` ([#830](https://github.com/elastic/eui/pull/830))

## [`0.0.47`](https://github.com/elastic/eui/tree/v0.0.47)

- Added utility CSS classes for text and alignment concerns ([#774](https://github.com/elastic/eui/pull/774))
- Added `compressed` versions of `EuiFormRow` and all form controls ([#800](https://github.com/elastic/eui/pull/800))
- Removed pointer cursor on `EuiFormLabel` when a `for` property is not set ([#825](https://github.com/elastic/eui/pull/825))
- Added the ability to add tooltips to `EuiContextMenuItem`s ([#817](https://github.com/elastic/eui/pull/817))
- Added `EuiBreadcrumbs` ([#815](https://github.com/elastic/eui/pull/815))

**Bug fixes**

- Fixes height calculation error on `EuiAccordion` when it starts loads in an open state. ([#816](https://github.com/elastic/eui/pull/816))
- Added aria-invalid labeling on `EuiFormRow` ([#777](https://github.com/elastic/eui/pull/799))
- Added aria-live labeling for `EuiToasts` ([#777](https://github.com/elastic/eui/pull/777))
- Added aria labeling requirements for `EuiBadge` , as well as a generic prop_type function `requiresAriaLabel` in `utils` to check for it. ([#777](https://github.com/elastic/eui/pull/777)) ([#802](https://github.com/elastic/eui/pull/802))
- Ensure switches’ inputs are still hidden when `[disabled]` ([#778](https://github.com/elastic/eui/pull/778))
- Made boolean matching in `EuiSearchBar` more exact so it doesn't match words starting with booleans, like "truest" or "offer" ([#776](https://github.com/elastic/eui/pull/776))
- `EuiComboBox` do not setState or call refs once component is unmounted ([807](https://github.com/elastic/eui/pull/807) and [#813](https://github.com/elastic/eui/pull/813))
- Added better accessibility labeling to `EuiPagination`, `EuiSideNav`, `EuiPopover`, `EuiBottomBar` and `EuiBasicTable`.  ([#821](https://github.com/elastic/eui/pull/821))
- Added `isDisabled` to `EuiComboBox`  ([#829](https://github.com/elastic/eui/pull/829))

## [`0.0.46`](https://github.com/elastic/eui/tree/v0.0.46)

- Added `EuiDescribedFormGroup` component, a wrapper around `EuiFormRow`(s) ([#707](https://github.com/elastic/eui/pull/707))
- Added `describedByIds` prop to `EuiFormRow` to help with accessibility ([#707](https://github.com/elastic/eui/pull/707))
- Added `isLoading` prop to `EuiButtonEmpty` ([#768](https://github.com/elastic/eui/pull/768))
- Removed individual badge cross icon when `EuiComboBox` has `singleSelection` prop enabled. ([#769](https://github.com/elastic/eui/pull/769))

**Bug fixes**

- Removed specificity on `EuiText` that was causing cascade conflicts around text coloring. ([#770](https://github.com/elastic/eui/pull/770))

## [`0.0.45`](https://github.com/elastic/eui/tree/v0.0.45)

***NOTE v0.0.45 has a bug causing it to fail during installation, please use v0.0.46***

- Added `EuiBetaBadge` for non-GA labelling including options to add it to `EuiCard` and `EuiKeyPadMenuItem` ([#705](https://github.com/elastic/eui/pull/705))
- Added `direction` prop to EuiFlexGroup ([#711](https://github.com/elastic/eui/pull/711))
- Added `EuiEmptyPrompt` which can be used as a placeholder over empty tables and lists ([#711](https://github.com/elastic/eui/pull/711))
- Added `EuiTabbedContent` ([#737](https://github.com/elastic/eui/pull/737))
- `EuiComboBox` added buttons for clearing and opening/closing the combo box ([#698](https://github.com/elastic/eui/pull/698))

**Bug fixes**

- Fixed `EuiTableRowCell` from overwriting its child element's `className` [#709](https://github.com/elastic/eui/pull/709)
- Allow `EuiContextMenuPanel`s to update when their `children` changes ([#710](https://github.com/elastic/eui/pull/710))
- `EuiInMemoryTable` now passes `itemIdToExpandedRowMap` prop to `EuiBasicTable` ([#759](https://github.com/elastic/eui/pull/759))
- Expanded table rows in paginated data no longer leak to other pages ([#761](https://github.com/elastic/eui/pull/761))

**Breaking changes**

- Rename `logoElasticSearch` to `logoElasticsearch` [#755](https://github.com/elastic/eui/pull/755)

## [`0.0.44`](https://github.com/elastic/eui/tree/v0.0.44)

- Reduced `EuiToast` title size ([#703](https://github.com/elastic/eui/pull/703))

**Bug fixes**

- Fixed inherited `line-height` of inputs and buttons ([#702](https://github.com/elastic/eui/pull/702))
- Fixed card title sizing in K6 theme. ([#704](https://github.com/elastic/eui/pull/704))

## [`0.0.43`](https://github.com/elastic/eui/tree/v0.0.43)

- Added `status` prop to `EuiStep` for additional styling ([#673](https://github.com/elastic/eui/pull/673))
- `EuiForm` and `EuiFormRow` now accept nodes for `errors` prop ([#685](https://github.com/elastic/eui/pull/685))
- Removed the default `max-width` from `EuiText`. This can still be applied by setting `grow={false}` ([#683](https://github.com/elastic/eui/pull/683))
- Added support for text alignment with `EuiTextAlign` ([#683](https://github.com/elastic/eui/pull/683))
- `EuiBasicTable` added the `compressed` prop to allow for tables with smaller fonts and padding ([#687](https://github.com/elastic/eui/pull/687))

**Bug fixes**

- Added a `paddingSize` prop to `EuiAccordion` to better mitigate situations where a nested `EuiFlexGroup` causes scrollbars ([#701](https://github.com/elastic/eui/pull/701))
- Fixed `EuiCard` `icon` prop to include user provided className ([#684](https://github.com/elastic/eui/pull/684))
- `EuiInMemoryTable` pagination state is now reset automatically when a search is executed ([#686](https://github.com/elastic/eui/pull/686))
- Fixed slow performance of `EuiComboBox` when there are hundreds or thousands of options by virtualizing `EuiComboBoxOptionsList` ([#670](https://github.com/elastic/eui/pull/670))
- Fixed some text styles ([#683](https://github.com/elastic/eui/pull/683))
    - Fixed font-family of input, textarea, select, and buttons
    - Fixed style of code, pre, and dl’s inside `EuiText`
    - Fixed ghost text color which was being set to a dark gray

**Breaking changes**

- Added responsive support for tables. This isn't technically a breaking change, but you will need to apply some new props (`hasActions`, `isSelectable`) for certain tables to make them look their best in mobile. **Responsive table views are on by default.** ([#584](https://github.com/elastic/eui/pull/584))

## [`0.0.42`](https://github.com/elastic/eui/tree/v0.0.42)

- Added `EuiDatePicker` component for date/time input ([#644](https://github.com/elastic/eui/pull/644))
- Added editor icon set to `EuiIcon` ([#671](https://github.com/elastic/eui/pull/671))

## [`0.0.41`](https://github.com/elastic/eui/tree/v0.0.41)

- Added `grow` prop to `EuiText` ([#662](https://github.com/elastic/eui/pull/662))
- Added `disabled` prop to `EuiComboBoxOption` ([#650](https://github.com/elastic/eui/pull/650))
- Added support for `<pre>` and `<code>` tags to `<EuiText>` ([#654](https://github.com/elastic/eui/pull/654))
- Added export of SASS theme variables in JSON format during compilation ([#642](https://github.com/elastic/eui/pull/642))
- Close `EuiComboBox` `singleSelection` options list when option is choosen ([#645](https://github.com/elastic/eui/pull/645))
- Wrap `EuiStepHorizontal` text instead of truncating it ([#653](https://github.com/elastic/eui/pull/653))
- Fixed a bug where `EuiSideNavItem` wouldn't pass an `onClick` handler down to `<a>` tags if they also had an `href`. ([#664](https://github.com/elastic/eui/pull/664))
- Updated existing and added additional TypeScript definitions ([#666](https://github.com/elastic/eui/pull/666))

**Bug fixes**

- Fixed `EuiBasicTable` re-rendering on hover of table rows ([#665](https://github.com/elastic/eui/pull/665))

**Breaking changes**

- `EuiStepsHorizontal` now requires an `onClick` prop be provided for each step configuration object ([#653](https://github.com/elastic/eui/pull/653))

## [`0.0.40`](https://github.com/elastic/eui/tree/v0.0.40)

- Tweaked sizing, weights, color, line-heights, and added more levels to `EuiTitle` and `EuiText` ([#627](https://github.com/elastic/eui/pull/627))
- Added TypeScript type defitions for `EuiPortal`, `EuiText` and `EuiTitle` as well as the `calculatePopoverPosition` service ([#638](https://github.com/elastic/eui/pull/638))
- Grayed out labels for `disabled` controls ([#648](https://github.com/elastic/eui/pull/648))

**Bug fixes**

- Fix visual shadow glitch on hover of `EuiToast` ([#632](https://github.com/elastic/eui/pull/632))

**Breaking changes**

- **Note: This breaking change is reversed in 0.0.43.** Added a default `max-width` to `EuiText`. ([#627](https://github.com/elastic/eui/pull/627))

## [`0.0.39`](https://github.com/elastic/eui/tree/v0.0.39)

**Bug fixes**

- Allow accordions to dynamically change height, and support values on radio inputs ([#613](https://github.com/elastic/eui/pull/613))
- Accordion toggle layout is no longer flagged responsive, in order to prevent unwanted stacking on mobile ([#613](https://github.com/elastic/eui/pull/613))

**Breaking changes**

- Support values on radio inputs. This is breaking because now the second argument to the radio `onChange` callback is the value, which bumps the change event to the third argument ([#613](https://github.com/elastic/eui/pull/613))

## [`0.0.38`](https://github.com/elastic/eui/tree/v0.0.38)

- Modified drop shadow intensities and color. ([#607](https://github.com/elastic/eui/pull/607))
- Added SASS color functions. Made `$euiColorWarning` color usage more accessible while still being "yellow". ([#628](https://github.com/elastic/eui/pull/628))
- Removed extraneous `global_styling/mixins/_forms.scss` file and importing the correct files in the `filter_group.scss` and `combo_box.scss` files. ([#609](https://github.com/elastic/eui/pull/609))
- Added `isInvalid` prop to `EuiComboBox` ([#631](https://github.com/elastic/eui/pull/631))
- Added support for rejecting user input by returning `false` from the `onCreateOption` prop of `EuiComboBox` ([#631](https://github.com/elastic/eui/pull/631))

**Bug fixes**

- Visual fix for the focus state of disabled `EuiButton` ([#603](https://github.com/elastic/eui/pull/603))
- `EuiSelect` can pass any node as a value rather than just a string ([#603](https://github.com/elastic/eui/pull/603))
- Fixed a typo in the flex TypeScript definition ([#629](https://github.com/elastic/eui/pull/629))
- Fixed `EuiComboBox` bug in which the options list wouldn't always match the width of the input ([#611](https://github.com/elastic/eui/pull/611))
- Fixed `EuiComboBox` bug in which opening the combo box when there's no scrollbar on the window would result in the list being positioned incorrectly ([#631](https://github.com/elastic/eui/pull/631))
- Fixed `EuiComboBox` bug in which clicking a pill's close button would close the list ([#631](https://github.com/elastic/eui/pull/631))
- Fixed `EuiComboBox` bug in which moving focus from one combo box to another would remove the `euiBody-hasPortalContent` class from the body. ([#631](https://github.com/elastic/eui/pull/631))

## [`0.0.37`](https://github.com/elastic/eui/tree/v0.0.37)

- Added `EuiComboBox` for selecting many options from a list of options ([#567](https://github.com/elastic/eui/pull/567))
- Added `EuiHighlight` for highlighting a substring within text ([#567](https://github.com/elastic/eui/pull/567))
- `calculatePopoverPosition` service now accepts a `positions` argument so you can specify which positions are acceptable ([#567](https://github.com/elastic/eui/pull/567))
- Added `closeButtonProps` prop to `EuiBadge`, `hollow` badge type, and support for arbitrary hex color ([#567](https://github.com/elastic/eui/pull/567))
- Added support for arbitrary hex color to `EuiIcon` ([#567](https://github.com/elastic/eui/pull/567))

**Breaking changes**

- Renamed `euiBody-hasToolTip` class to `euiBody-hasPortalContent` ([#567](https://github.com/elastic/eui/pull/567))

## [`0.0.36`](https://github.com/elastic/eui/tree/v0.0.36)

- Added support for range queries in `EuiSearchBar` (works for numeric and date values) ([#485](https://github.com/elastic/eui/pull/485))
- Added support for emitting a `EuiSearchBar` query to an Elasticsearch query string ([#598](https://github.com/elastic/eui/pull/598))
- Added support for expandable rows to `EuiBasicTable` ([#585](https://github.com/elastic/eui/pull/585))

**Bug fixes**

- Relaxed query syntax of `EuiSearchBar` to allow usage of hyphens without escaping ([#581](https://github.com/elastic/eui/pull/581))
- Fixed font-weight issue in K6 theme ([#596](https://github.com/elastic/eui/pull/596))

## [`0.0.35`](https://github.com/elastic/eui/tree/v0.0.35)

- Modified `EuiLink` and all buttons to support both href and onClick ([#554](https://github.com/elastic/eui/pull/554))
- Added `color` prop to `EuiIconTip` ([#580](https://github.com/elastic/eui/pull/580))

## [`0.0.34`](https://github.com/elastic/eui/tree/v0.0.34)

- Adjust `EuiCallOut` and dark theme warning coloring ([#563](https://github.com/elastic/eui/pull/563))
- Added a `buttonColor` prop to `EuiConfirmModal` ([#546](https://github.com/elastic/eui/pull/546))
- Added 'baseline' as option to `EuiFlexGroup`'s `alignItems` prop ([#546](https://github.com/elastic/eui/pull/546))

**Bug fixes**

- Fixed `EuiToolTip` bug which caused the tooltip to hide when moving the mouse around inside of the trigger element ([#557](https://github.com/elastic/eui/pull/557), [#564](https://github.com/elastic/eui/pull/564))
- Fixed a bug where `EuiButtonEmpty` would offer a white background on hover when it was disabled, even when there was no such background transition on hover when the buttons are not disabled ([#561](https://github.com/elastic/eui/pull/561))
- Fixed table cell bugs ([#565](https://github.com/elastic/eui/pull/565))
  - `EuiBasicTable` now supports explicitly setting `truncateText` and `textOnly` on column definitions, and supports passing through unrecognized props to the cell (e.g. `data-test-subj`).
  - Updated table cell CSS so that long single-word cell content will break and wrap mid-word.

## [`0.0.33`](https://github.com/elastic/eui/tree/v0.0.33)

- Added initial sorting option to `EuiInMemoryTable` ([#547](https://github.com/elastic/eui/pull/547))
- Horizontally scrolling `EuiTabs` ([#546](https://github.com/elastic/eui/pull/546))
- Remove padding from both sides of `EuiEmptyButton` ([#546](https://github.com/elastic/eui/pull/546))
- Added `disabled` prop to placeholder (ellipses) button in pagination ([#546](https://github.com/elastic/eui/pull/546))
- Converted `.euiHeader__notification` into `EuiHeaderNotification` ([#546](https://github.com/elastic/eui/pull/546))

**Bug fixes**

- `EuiConfirmModal` will now check for the presence of confirm and cancel buttons before trying to focus them ([#555](https://github.com/elastic/eui/pull/555))

## [`0.0.32`](https://github.com/elastic/eui/tree/v0.0.32)

- Updated `EuiDescriptionList` to accept nodes for the titles and descriptions ([#552](https://github.com/elastic/eui/pull/552))
- Added `stop` and `stopFilled` icons ([#543](https://github.com/elastic/eui/pull/543))

**Bug fixes**

- Fixed `EuiToolTip` smart positioning to prevent tooltip from being clipped by the window where possible ([#550](https://github.com/elastic/eui/pull/550))

## [`0.0.31`](https://github.com/elastic/eui/tree/v0.0.31)

- Made `<EuiProgress>` TypeScript types more specific ([#518](https://github.com/elastic/eui/pull/518))
- Removed `font-smoothing` from our reset css for better text legibility ([#539](https://github.com/elastic/eui/pull/539))

**Bug fixes**

- Made `EuiIconTip` screen reader accessible ([#534](https://github.com/elastic/eui/pull/534))
- Fixed a sorting issue in `EuiInMemoryTable` ([#453](https://github.com/elastic/eui/pull/453))
- Fixed checkbox click for `EuiCheckbox` and `EuiRadio` without a label ([#541](https://github.com/elastic/eui/pull/541))

## [`0.0.30`](https://github.com/elastic/eui/tree/v0.0.30)

- Add ability to force `EuiSideNav` items open by setting `item.forceOpen`. ([#515](https://github.com/elastic/eui/pull/515))

## [`0.0.29`](https://github.com/elastic/eui/tree/v0.0.29)

- Added `EuiIconTip` to make it easier to display icons with tooltips ([#528](https://github.com/elastic/eui/pull/528))
- Added `buttonRef` prop to `EuiButton`, `EuiButtonEmpty`, and `EuiButtonIcon` ([#529](https://github.com/elastic/eui/pull/529))

**Bug fixes**

- `EuiHealth` no longer stacks flex items on small screens ([#530](https://github.com/elastic/eui/pull/530))
- Fixed `EuiPageContent` centering within `EuiPage` issue ([#527](https://github.com/elastic/eui/pull/527))
- `EuiConfirmModal` will now correctly auto-focus on its confirm and cancel buttons ([#529](https://github.com/elastic/eui/pull/529))

## [`0.0.28`](https://github.com/elastic/eui/tree/v0.0.28)

- `EuiInMemoryTable` pass items to BasicTable when message is provided ([#517](https://github.com/elastic/eui/pull/517)).
- `EuiSearchBox` now passes unused props through to `EuiFieldSearch` ([#514](https://github.com/elastic/eui/pull/514))
- Change `EuiBasicTable` `noItemsMessage` and `EuiInMemoryTable` `messgae` propType to node
instead of just string ([#516](https://github.com/elastic/eui/pull/516))

## [`0.0.27`](https://github.com/elastic/eui/tree/v0.0.27)

- Don't propagate a null `onClick` on EuiPanels ([#473](https://github.com/elastic/eui/pull/473))
- Use 1.1px for the `EuiHorizontalRule` height, in order to work around strange Chrome height calculations ([#473](https://github.com/elastic/eui/pull/473))
- New icons for `logoGithub` and `logoSketch` ([#494](https://github.com/elastic/eui/pull/494))
- `EuiCard` now has an `href` and `isClickable` prop for better handling hover animations. ([#494](https://github.com/elastic/eui/pull/494))
- Added `calculateContrast` and `rgbToHex` to services ([#494](https://github.com/elastic/eui/pull/494))

**Bug fixes**

- `EuiModal` is now responsive on mobile screens ([#512](https://github.com/elastic/eui/pull/512))
- `EuiFlexGrid` now collapses down in mobile layouts properly. ([#515](https://github.com/elastic/eui/pull/515))
- Made `EuiCard` proptypes more permission by changing strings to nodes. ([#515](https://github.com/elastic/eui/pull/515))
- Fixed `reponsive={false}` prop not working when flex groups were nested. ([#494](https://github.com/elastic/eui/pull/494))
- `EuiBadge` wrapping element changed from a `div` to `span` so it can be nested in text blocks ([#494](https://github.com/elastic/eui/pull/494))

## [`0.0.26`](https://github.com/elastic/eui/tree/v0.0.26)

**Bug fixes**

- `EuiSelect` do not set `defaultValue` property when `value` property is provided ([#504](https://github.com/elastic/eui/pull/504)).
- `EuiBottomBar` now uses `EuiPortal` to avoid zindex conflicts ([#487](https://github.com/elastic/eui/pull/487))
- Upped dark theme contrast on disabled buttons ([#487](https://github.com/elastic/eui/pull/487))

**Breaking changes**

- Removed `EuiTableOfRecords` ([#490](https://github.com/elastic/eui/pull/490))

## [`0.0.25`](https://github.com/elastic/eui/tree/v0.0.25)

- `EuiSearchBar` accepts `toolsLeft` and `toolsRight` props ([#458](https://github.com/elastic/eui/pull/458))
- Added `search.onChange` callback to `EuiInMemoryTable` ([#469](https://github.com/elastic/eui/pull/469))
- Added `initialPageSize` option to `EuiInMemoryTable` ([#477](https://github.com/elastic/eui/pull/477))
- Added design guidelines for button and toast usage ([#371](https://github.com/elastic/eui/pull/371))

**Breaking changes**

- Complete refactor of `EuiToolTip`. They now work. Only a breaking change if you were using them. ([#484](https://github.com/elastic/eui/pull/484))

## [`0.0.24`](https://github.com/elastic/eui/tree/v0.0.24)

- Removed hover and focus states from non-selectable `EuiSideNavItem`s ([#434](https://github.com/elastic/eui/pull/434))
- Added `Ast` and `Query` services ([#454](https://github.com/elastic/eui/pull/454))
- Added icons for Kibana query language ([#455](https://github.com/elastic/eui/pull/455))

**Bug fixes**

- Fix error stemming from `selected` prop on `EuiSelect` ([#436](https://github.com/elastic/eui/pull/436))

**Breaking changes**

- The `Random` service's `oneOf` method now only accepts an array ([#454](https://github.com/elastic/eui/pull/454))

## [`0.0.23`](https://github.com/elastic/eui/tree/v0.0.23)

- Added `EuiInMemoryTable`, which encapsulates sorting, searching, selection, and pagination state and logic ([#390](https://github.com/elastic/eui/pull/390))
- Added stack trace information to `EuiErrorBoundary` ([#428](https://github.com/elastic/eui/pull/428))
- Make full screen code block use the same font-size on the original code block. ([#447](https://github.com/elastic/eui/pull/447))

**Bug fixes**

- Fixed `EuiContextMenu` bug when using the keyboard to navigate up, which was caused by unnecessarily re-rendering the items, thus losing references to them ([#431](https://github.com/elastic/eui/pull/431))

## [`0.0.22`](https://github.com/elastic/eui/tree/v0.0.22)

- Added `EuiDelayHide` component. ([#412](https://github.com/elastic/eui/pull/412))
- Decreased overall size of checkbox, radio, and switches as well as better styles for the different states. ([#407](https://github.com/elastic/eui/pull/407))
- Added `EuiFilePicker` component for `input type="file"` needs. ([#402](https://github.com/elastic/eui/pedull/402))
- Added `isLoading` prop to `EuiButton` ([#427](https://github.com/elastic/eui/pull/427))
- Added icons: `eye`, `eyeClosed`, `grab`, `heatmap`, `vector` ([#427](https://github.com/elastic/eui/pull/427))
- Added `hasNoInitialSelection` option to `EuiSelect`. ([#422](https://github.com/elastic/eui/pull/422))

**Bug fixes**

- Fixed appearance of checked checkeboxes and radios in IE ([#407](https://github.com/elastic/eui/pull/407))
- Fixed disabled vs enabled appearance of checked checkeboxes and radios ([#407](https://github.com/elastic/eui/pull/407))
- Fixed disabled & checked state of switches ([#407](https://github.com/elastic/eui/pull/407))
- Fixed `EuiCard` content alignment when content is short. ([#415](https://github.com/elastic/eui/pull/415))
- Only apply the `$euiCodeBlockSelectedBackgroundColor` variable if it is a color ([#427](https://github.com/elastic/eui/pull/427))
- No margins for `<hr>` ([#427](https://github.com/elastic/eui/pull/427))
- Fixed `EuiButton` truncation ([#427](https://github.com/elastic/eui/pull/427))

**Breaking changes**

- Changed `EuiAccordion`’s method of `onToggleOpen` to `onToggle` ([#427](https://github.com/elastic/eui/pull/427))

## [`0.0.21`](https://github.com/elastic/eui/tree/v0.0.21)

- Logstash icon set. [#399](https://github.com/elastic/eui/pull/399)
- Added support for `disabled` options in `EuiSelect`. [#324](https://github.com/elastic/eui/pull/324)
- Badges can now accept onClicks and custom colors. They were changed stylistically to be bolder and smaller by default. ([#381](https://github.com/elastic/eui/pull/381))
- Added component to wrap blocks of substeps `EuiSubSteps` in a shaded container. ([#375](https://github.com/elastic/eui/pull/375))
- Added horizontal steps component ([#375](https://github.com/elastic/eui/pull/375))
- Changed look and feel of pagination. Added `compressed` prop for smaller footprint pagination. ([#380](https://github.com/elastic/eui/pull/380))
- Added `EuiBasicTable` as an opinionated, high level component for constructing tables. Its addition deprecates `EuiTableOfRecords` which is still avaiable, but now marked for removal. ([#377](https://github.com/elastic/eui/pull/377))
- Added styles for `readOnly` states of form controls. ([#391](https://github.com/elastic/eui/pull/391))
- Added importAction and exportAction icons ([#394](https://github.com/elastic/eui/pull/394))
- Added `EuiCard` for UI patterns that need an icon/image, title and description with some sort of action. ([#380](https://github.com/elastic/eui/pull/380))
- Added TypeScript definitions for the `EuiHealth` component. ([#403](https://github.com/elastic/eui/pull/403))
- Added `SearchBar` component - introduces a simple yet rich query language to search for objects + search box and filter controls to construct/manipulate it. ([#379](https://github.com/elastic/eui/pull/379))

**Bug fixes**

- Tables now default to `table-layout: fixed` to avoid some collapsing cell problems. [#398](https://github.com/elastic/eui/pull/398)
- Wrap long lines of text within the body of `EuiToast` instead of letting text overflow ([#392](https://github.com/elastic/eui/pull/392))
- Fixed dark theme coloring of Substeps ([#396](https://github.com/elastic/eui/pull/396))
- Reorder selectors to fix fixed progress bar in Firefox ([#404](https://github.com/elastic/eui/pull/404))

## [`0.0.20`](https://github.com/elastic/eui/tree/v0.0.20)

- Renamed class from `euiFlexGroup--alignItemsStart` to `euiFlexGroup--alignItemsFlexStart` ([#378](https://github.com/elastic/eui/pull/378))

## [`0.0.19`](https://github.com/elastic/eui/tree/v0.0.19)

- `EuiGlobalToastList` now prevents toasts from disappearing while the user's mouse is over the list. Added `timer/Timer` service. ([#370](https://github.com/elastic/eui/pull/370))

**Bug fixes**

- **Note: This is deprecated in 0.0.21 and removed in 0.0.26.** `EuiTableOfRecords` selection bugs ([#365](https://github.com/elastic/eui/pull/365))
  - Deleting selected items now resets the select all checkbox to an unchecked state
  - The select all checkbox only becomes checked when all selectable rows are checked, not just some of them

**Breaking changes**

- Changed `EuiGlobalToastList` to be responsible for instantiating toasts, tracking their lifetimes, and dismissing them. It now acepts `toasts`, `dismissToast`, and `toastLifeTimeMs` props. It no longer accepts `children`. ([#370](https://github.com/elastic/eui/pull/370))

## [`0.0.18`](https://github.com/elastic/eui/tree/v0.0.18)

**Bug fixes**

- Fixed `EuiCodeEditor` bug in which hitting ESCAPE to close the autocompletion suggestions menu would also exit editing mode. ([#363](https://github.com/elastic/eui/pull/363))

## [`0.0.17`](https://github.com/elastic/eui/tree/v0.0.17)

**Bug fixes**

- Downgraded `lodash` version to `3.10.0` to align it with Kibana. ([#359](https://github.com/elastic/eui/pull/359))

## [`0.0.16`](https://github.com/elastic/eui/tree/v0.0.16)

- `EuiRadio` now supports the `input` tag's `name` attribute. `EuiRadioGroup` accepts a `name` prop that will propagate to its `EuiRadio`s. ([#348](https://github.com/elastic/eui/pull/348))
- Added Machine Learning create jobs icon set. ([#338](https://github.com/elastic/eui/pull/338))
- **Note: This is deprecated in 0.0.21 and removed in 0.0.26.** Added `EuiTableOfRecords`, a higher level table component to take away all your table listings frustrations. ([#250](https://github.com/elastic/eui/pull/250))

**Bug fixes**

- Added `react-color` as a dependency (was previously a devDependency) ([#354](https://github.com/elastic/eui/pull/354))
- Stop propagation and prevent default when closing components. Otherwise the same Escape keypress could close the parent component(s) as well as the one you intend to close. ([#344](https://github.com/elastic/eui/pull/344))

## [`0.0.15`](https://github.com/elastic/eui/tree/v0.0.15)

- Added `EuiColorPicker`. ([#328](https://github.com/elastic/eui/pull/328))
- `EuiCodeBlock` now only shows fullscreen icons if `overflowHeight` prop is set. Also forces large fonts and padding while expanded. ([#325](https://github.com/elastic/eui/pull/325))
- Exported `VISUALIZATION_COLORS` from services ([#329](https://github.com/elastic/eui/pull/329))
- Added typescript definitions for `EuiFormRow`, `EuiRadioGroup`, `EuiSwitch`, `EuiLoadingSpinner`, `EuiLoadingChart` and `EuiProgress`. ([#326](https://github.com/elastic/eui/pull/326))
- Added `checkHrefAndOnClick` and `getSecureRelForTarget` to services.

**Breaking changes**

- `EuiCodeBlock` now only shows fullscreen icons if `overflowHeight` prop is set. Also forces large fonts and padding while expanded. ([#325](https://github.com/elastic/eui/pull/325))
- React ^16.2 is now a peer dependency ([#264](https://github.com/elastic/eui/pull/264))
- `EuiProgress` no longer accepts the `indeterminate` property, which never had any effect. ([#326](https://github.com/elastic/eui/pull/326))

**Bug fixes**

- Fix TypeScript definitions such that optional and readonly properties survive being passed through `Omit` ([#322](https://github.com/elastic/eui/pull/322))

## [`0.0.14`](https://github.com/elastic/eui/tree/v0.0.14)

- Added `isColorDark` color util ([#311](https://github.com/elastic/eui/pull/311))
- EuiButton, EuiButtonEmpty and EuiButtonIcon can now take an `href` ([#316](https://github.com/elastic/eui/pull/316))
- In `EuiSideNav`, allow a callback to be passed that renders the individual items in the navigation. This makes interoperability with e.g. `react-router` easier. ([#310](https://github.com/elastic/eui/pull/310))
- Add new icon types to `EuiIcon` TypeScript definitions ([#323](https://github.com/elastic/eui/pull/323)).

**Bug fixes**

- Set `EuiFlexGroup` to `flex-grow: 1` to be more friendly with IE11 ([#315](https://github.com/elastic/eui/pull/315))

## [`0.0.13`](https://github.com/elastic/eui/tree/v0.0.13)

- Added index management icons. ([#307](https://github.com/elastic/eui/pull/307))

**Breaking changes**

- Reverted test helper for async functions that throw exceptions. See PR for details on how this can be handled in Jest 22. ([#306](https://github.com/elastic/eui/pull/306))

**Bug fixes**

- Adjust toast z-index to show over modals ([#296](https://github.com/elastic/eui/pull/296))
- Fix nested `EuiFlexItem` collapse issue in IE ([#308](https://github.com/elastic/eui/pull/308))

## [`0.0.12`](https://github.com/elastic/eui/tree/v0.0.12)

- Minor style-only changes to `EuiPagination`, button reset, `EuiTableHeaderCell`, and `EuiCodeBlock`. ([#298](https://github.com/elastic/eui/pull/298))
- All NPM dependencies now use ^ to install the latest minor version.
- Added Apache, Nginx, MySQL logos ([#270](https://github.com/elastic/eui/pull/270))
- Added small version of `EuiCallOut` ([#269](https://github.com/elastic/eui/pull/269))
- Added first batch of TypeScript type definitions for components and services ([#252](https://github.com/elastic/eui/pull/252))
- Added button for expanding `EuiCodeBlock` instances to be full-screen. ([#259](https://github.com/elastic/eui/pull/259))
- Add test helper for async functions that throw exceptions ([#301](https://github.com/elastic/eui/pull/301))

**Bug fixes**

- Removed padding on `EuiPage` mobile breakpoint. ([#282](https://github.com/elastic/eui/pull/282))
- Fixed some `EuiIcon` `type`s not setting their `viewBox` attribute, which caused them to not honor the `size` properly. ([#277](https://github.com/elastic/eui/pull/277))
- Fixed `EuiContextMenu` to pass the `event` argument to a `EuiContextMenuItem`'s `onClick` handler even when a panel is defined. ([#265](https://github.com/elastic/eui/pull/265))

**Breaking changes**

- Removed `color` prop from `EuiCodeBlock`. This component's highlighting now matches whichever theme is currently active. See PR for details on SCSS breaking changes. ([#259](https://github.com/elastic/eui/pull/259))

## [`0.0.11`](https://github.com/elastic/eui/tree/v0.0.11)

- Added `EuiImage` component to allow for image sizing and zooms. ([#262](https://github.com/elastic/eui/pull/262))
- Updated `EuiOverlayMask` to append `<div>` to body. ([#254](https://github.com/elastic/eui/pull/254))

**Bug fixes**

- Disabled tab styling. ([#258](https://github.com/elastic/eui/pull/258))
- Proper classname for flexGroup alignItems prop. ([#257](https://github.com/elastic/eui/pull/257))
- Clicking the downArrow icon in `EuiSelect` now triggers selection. ([#255](https://github.com/elastic/eui/pull/255))
- Fixed `euiFormRow` id's from being the same as the containing input and label. ([#251](https://github.com/elastic/eui/pull/251))

**Breaking changes**

- `{rest}` prop attachment moved from wrapping div to the input on checkboxes and switches. ([#246](https://github.com/elastic/eui/pull/246))

## [`0.0.10`](https://github.com/elastic/eui/tree/v0.0.10)

- Updated `euiPopover` to propagate `panelPaddingSize` padding values to content only (title does inherit horizontal values) via CSS. ([#229](https://github.com/elastic/eui/pull/229))
- Updated `EuiErrorBoundary` to preserve newlines in error. ([#238](https://github.com/elastic/eui/pull/238))
- Added more icons and fixed a few for dark mode ([#228](https://github.com/elastic/eui/pull/228))
- Added `EuiFlyout` component. ([#227](https://github.com/elastic/eui/pull/227))

**Breaking changes**

- Renamed `EuiModalOverlay` to `EuiOverlayMask`. ([#227](https://github.com/elastic/eui/pull/227))

**Bug fixes**

- Fixed bug in `Pager` service which occurred when there were no items. ([#237](https://github.com/elastic/eui/pull/237))
- Added `isPageable` method to `Pager` service and set first and last page index to -1 when there are no pages. ([#242](https://github.com/elastic/eui/pull/242))

## [`0.0.9`](https://github.com/elastic/eui/tree/v0.0.9)

**Breaking changes**

- Renamed `euiFlexGroup--alignItemsEnd` class to `euiFlexGroup--alignItemsFlexEnd`.
- Remove support for `primary` color from `EuiTextColor` because it looked too much like a link.

**Bug fixes**

- Give `EuiFormErrorText` and `EuiFormHelpText` proper line-height. ([#234](https://github.com/elastic/eui/pull/234))

## [`0.0.8`](https://github.com/elastic/eui/tree/v0.0.8)

**Bug fixes**

- Fix button vertical alignment. ([#232](https://github.com/elastic/eui/pull/232))

## [`0.0.7`](https://github.com/elastic/eui/tree/v0.0.7)

- Added `EuiSteps` component ([#202](https://github.com/elastic/eui/pull/202), [#208](https://github.com/elastic/eui/pull/208))

**Breaking changes**

- Test helpers now published at `@elastic/eui/lib/test`

**Bug fixes**

- Case sensitive file name fix for Kibana dark theme. ([#216](https://github.com/elastic/eui/pull/216))

## [`0.0.6`](https://github.com/elastic/eui/tree/v0.0.6)

- `justify` prop of `EuiFlexGroup` now accepts `spaceEvenly` ([#205](https://github.com/elastic/eui/pull/205))
- Increased size of `<EuiTitle size="s">` so that it's distinguishable as a title ([#204](https://github.com/elastic/eui/pull/204))

## [`0.0.5`](https://github.com/elastic/eui/tree/v0.0.5)

**Bug fixes**

- Fixed import paths for `EuiTable`, `EuiHealth`, and `EuiPopover` which prevented dependents of EUI from being able to compile when importing components from the `lib` directory ([#203](https://github.com/elastic/eui/pull/203))

## [`0.0.4`](https://github.com/elastic/eui/tree/v0.0.4)

- Added `EuiHealth` components for status checks ([#158](https://github.com/elastic/eui/pull/158))
- Cleaned up styling for checkboxes, switches, and radios ([#158](https://github.com/elastic/eui/pull/158))
- Form `disabled` states are now more consistent ([#158](https://github.com/elastic/eui/pull/158))
- Page and title padding adjusted to be more compact ([#158](https://github.com/elastic/eui/pull/158))
- Table spacing is now smaller ([#158](https://github.com/elastic/eui/pull/158))
- Dark theme forms now have better contrast with their borders ([#158](https://github.com/elastic/eui/pull/158))
- Added icons to match Kibana's app directory ([#162](https://github.com/elastic/eui/pull/162))
- Converted icons from SVG to React component during the build and stop using sprites ([#160](https://github.com/elastic/eui/pull/160))
- Added `isReadOnly`, `setOptions`, and `cursorStart` props to `EuiCodeEditor` ([#169](https://github.com/elastic/eui/pull/169))
- Added `wrap` prop to `EuiFlexGroup` ([#170](https://github.com/elastic/eui/pull/170))
- Added `scope` prop to `EuiTableHeaderCell` and `EuiTableHeaderCellCheckbox` ([#171](https://github.com/elastic/eui/pull/171))
- Added `disabled` prop to `EuiContextMenuItem` ([#172](https://github.com/elastic/eui/pull/172))
- Added `EuiTablePagination` component and `Pager` service ([#178](https://github.com/elastic/eui/pull/178))
- **Note: This is broken until 0.0.25.** Added `EuiTooltip` component ([#174](https://github.com/elastic/eui/pull/174), [#193](https://github.com/elastic/eui/pull/193))
- Added a bold weight of 700 and apply it to `<strong>` elements by default ([#193](https://github.com/elastic/eui/pull/193))
- Icon size prop now accepts `s`. Adjusted coloring of sidenav arrows ([#178](https://github.com/elastic/eui/pull/197))
- Added `EuiErrorBoundary` ([#198](https://github.com/elastic/eui/pull/198))
- Exported `test` module, which includes `findTestSubject`, `startThrowingReactWarnings`, `stopThrowingReactWarnings`, `requiredProps`, and `takeMountedSnapshot` helpers ([#198](https://github.com/elastic/eui/pull/198))
- Added a more systematic way to add themes; includes a new K6 theme for Kibana. ([#191](https://github.com/elastic/eui/pull/191))

**Bug fixes**

- Fixed bug where screen-reader styles weren't being imported ([#103](https://github.com/elastic/eui/pull/103))
- Fixed a bug where `<progress>` wasn't being rendered under `block` display ([#166](https://github.com/elastic/eui/pull/166))
- Fixed a bug that caused `EuiPageSideBar` width to change when the width of its content changed ([#181](https://github.com/elastic/eui/pull/181))

**Breaking changes**

- Fixed a bug where table cell classes were being applied twice ([#167](https://github.com/elastic/eui/pull/167))
- React ^16.0 is now a peer dependency ([#198](https://github.com/elastic/eui/pull/198))

## [`0.0.3`](https://github.com/elastic/eui/tree/v0.0.3)

- `EuiFlexItem` now accepts integers between 1 and 10 for the `grow` prop. ([#144](https://github.com/elastic/eui/pull/144))
- `EuiFlexItem` and `EuiFlexGrow` now accept a `component` prop which you can set to `span` or `div` (default). ([#141](https://github.com/elastic/eui/pull/141))
- Added `isLoading` prop to form inputs to allow for a loading state ([#150](https://github.com/elastic/eui/pull/150))

**Breaking changes**

- `EuiSideNav` now accepts a tree data structure via the `items` prop ([#141](https://github.com/elastic/eui/pull/141))
- `EuiSideNavGroup`, `EuiSideNavItem`, and `EuiSideNavTitle` have been removed from the public API ([#141](https://github.com/elastic/eui/pull/141))

## [`0.0.2`](https://github.com/elastic/eui/tree/v0.0.2)

- Changed the hover states of `EuiButtonEmpty` to look more like links ([#135](https://github.com/elastic/eui/pull/135))
- `EuiCode` now wraps `EuiCodeBlock`, so it can do everything `EuiCodeBlock` could, but inline ([#138](https://github.com/elastic/eui/pull/138))
- Added `transparentBackground` prop to `EuiCodeBlock` ([#138](https://github.com/elastic/eui/pull/138))
- `EuiCodeBlock` now uses the `light` theme by default ([#138](https://github.com/elastic/eui/pull/138))
- `EuiFormRow` generates its own unique `id` prop if none is provided ([#130](https://github.com/elastic/eui/pull/130))
- `EuiFormRow` associates help text and errors with the field element via ARIA attributes ([#130](https://github.com/elastic/eui/pull/130))

## [`0.0.1`](https://github.com/elastic/eui/tree/v0.0.1) Initial Release

- Initial public release
