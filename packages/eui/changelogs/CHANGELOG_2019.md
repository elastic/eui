## [`v17.3.1`](https://github.com/elastic/eui/releases/tag/v17.3.1)

**Bug fixes**

- Fixed TS types and exports for `EuiTextArea` and `EuiFieldNumber` ([#2703](https://github.com/elastic/eui/pull/2703))

## [`v17.3.0`](https://github.com/elastic/eui/releases/tag/v17.3.0)

- Converted `EuiFieldNumber` to Typescript ([#2685](https://github.com/elastic/eui/pull/2685))
- Converted `EuiFieldPassword` to Typescript ([#2683](https://github.com/elastic/eui/pull/2683))
- Converted `EuiHighlight` to Typescript ([#2681](https://github.com/elastic/eui/pull/2681))
- Added `data-test-subj` property to the `EuiCodeEditor` component ([#2689](https://github.com/elastic/eui/pull/2689))
- Converted `EuiTextArea` to Typescript ([#2695](https://github.com/elastic/eui/pull/2695))
- Converted `EuiPage` and related child components to  TypeScript ([#2669](https://github.com/elastic/eui/pull/2669))
- Added `annotation` glyph ([#2691](https://github.com/elastic/eui/pull/2691))
- Added `initialWidth` and `isResizable` configurations to `EuiDataGrid`'s columns ([#2696](https://github.com/elastic/eui/pull/2696))

**Bug fixes**

- Reverted removal of `toggleOpen` method from `EuiNavDrawer` ([#2682](https://github.com/elastic/eui/pull/2682))
- Improved `EuiDataGrid` update performance ([#2676](https://github.com/elastic/eui/pull/2676))
- Fixed `EuiDatagrid` header top border when configured to have no toolbar ([#2619](https://github.com/elastic/eui/pull/#2619))

## [`v17.2.1`](https://github.com/elastic/eui/releases/tag/v17.2.1)

**Bug fixes**

- Changed package.json version to match sure our build scripts release the correct sequential number ([#2674](https://github.com/elastic/eui/pull/2674))

## [`v17.1.3`](https://github.com/elastic/eui/releases/tag/v17.1.3)

**NOTE: This release came out of order due to a release script error. It actually came after 17.2.0 and can be ignored in favor of 17.2.1**

- Reverted docs changes in `17.2.0` that caused the build script to die ([#2672](https://github.com/elastic/eui/pull/2672))

**Bug fixes**

- Removed TypeScript definitions in `*.test.tsx?` files from _eui.d.ts_ ([#2673](https://github.com/elastic/eui/pull/2673))

## [`v17.2.0`](https://github.com/elastic/eui/releases/tag/v17.2.0)

**NOTE: This release had an error in our documentation layer. Use 17.2.1 instead**

- Improved a11y of `EuiNavDrawer` lock button state via `aria-pressed` ([#2643](https://github.com/elastic/eui/pull/2643))
- Added new stylesheets for the EUI Amsterdam theme ([#2633](https://github.com/elastic/eui/pull/2633))
- Added exports for available types related to `EuiDataGrid` ([#2640](https://github.com/elastic/eui/pull/2640))

**Bug fixes**

- Improved `EuiDataGrid` update performance ([#2638](https://github.com/elastic/eui/pull/2638))
- Fixed `EuiDroppable` not accepting multiple children when using TypeScript ([#2634](https://github.com/elastic/eui/pull/2634))
- Fixed `EuiComboBox` from submitting parent `form` element when selecting options via `Enter` key ([#2642](https://github.com/elastic/eui/pull/2642))
- Fixed `EuiNavDrawer` expand button from losing focus after click ([#2643](https://github.com/elastic/eui/pull/2643))
- Fixed instances of potentially duplicate `EuiPopover` `id` attributes ([#2667](https://github.com/elastic/eui/pull/2667))

## [`v17.1.2`](https://github.com/elastic/eui/releases/tag/v17.1.2)

**Bug fixes**

- Fixed `EuiCodeEditor` custom mode file error by initializing with existing mode ([#2616](https://github.com/elastic/eui/pull/2616))
- Removed `EuiIcon` default titles ([#2632](https://github.com/elastic/eui/pull/2632))

## [`v17.1.1`](https://github.com/elastic/eui/releases/tag/v17.1.1)

**Bug fixes**

- Fixed screenreader text in `EuiTreeView` and added truncation ([#2627](https://github.com/elastic/eui/pull/2627))

## [`v17.1.0`](https://github.com/elastic/eui/releases/tag/v17.1.0)

- Added an optional `key` property inside the `options` prop in `EuiSelectableList` component ([#2608](https://github.com/elastic/eui/pull/2608))
- Added `toolbarAdditionalControls` prop to `EuiDataGrid` to allow for custom buttons in the toolbar ([#2594](https://github.com/elastic/eui/pull/2594))
- Added TypeScript definitions for `EuiBasicTable`, `EuiInMemoryTable`, and related components ([#2428](https://github.com/elastic/eui/pull/2428))
- Updated `logoSecurity` and `appSecurityAnalytics` icons ([#2613](https://github.com/elastic/eui/pull/2613))
- Added support for `.gif` base64 images in the webpack.config

**Bug fixes**

- Fixed UX/focus bug in `EuiDataGrid` when using keyboard shortcuts to paginate ([#2602](https://github.com/elastic/eui/pull/2602))
- Fixed `EuiIcon` accessibility by adding a `title` prop and a default `aria-label` ([#2554](https://github.com/elastic/eui/pull/2554))
- Fixed `EuiDataGrid`'s in-memory sorting of numeric columns when the cell data contains multiple digit groups ([#2603](https://github.com/elastic/eui/pull/2603))
- Improved pagination in `EuiBasicTable`. `paginationBar` is hidden when there is no data and `EuiPagination` is displayed even when there is only one page ([#2598](https://github.com/elastic/eui/pull/#2598))
- Fixed react-dom warning when `EuiPopover` was unmounted before calls to setState ([#2614](https://github.com/elastic/eui/pull/2614))

## [`v17.0.0`](https://github.com/elastic/eui/releases/tag/v17.0.0)

**Breaking changes**

- Moved any shared component-level Sass variables and mixins into the `global_styling` directory ([#2551](https://github.com/elastic/eui/pull/2551))
- Reworked `euiPanel()` mixin to require the entirety of a selector (i.e. require the '.' in addition to the string) ([#2551](https://github.com/elastic/eui/pull/2551))
- Updated React peerDependencies to version 16.12 ([#2571](https://github.com/elastic/eui/pull/2571))
- Changed to generated `id` value for `EuiFormRow` to ensure uniqueness  ([#2588](https://github.com/elastic/eui/pull/2588))

## [`v16.2.1`](https://github.com/elastic/eui/releases/tag/v16.2.1)

**Bug fixes**

- Fixed label wrapping of `EuiSwitch` ([#2585](https://github.com/elastic/eui/pull/2585))
- Replaced `<p>` tag surrounding the label with a `<span>` tag in `EuiSwitch` to fix any inherited margin ([#2585](https://github.com/elastic/eui/pull/2585))
- Added the same padding from `EuiSelectableListItem` to the heading to fix alignment ([#2585](https://github.com/elastic/eui/pull/2585))
- Added exports for `EuiCheckboxType`, `EuiCheckboxGroupOption`, and `EuiCheckboxGroupIdToSelectedMap` types ([#2593](https://github.com/elastic/eui/pull/2593))
- Fixed `.euiHeaderLinks__mobileList` in `EuiHeaderLinks` to only display it on mobile ([#2590](https://github.com/elastic/eui/pull/#2590))
- Fixed `EuiAccordion` icon rotation when it is a child of another accordion so it doesn't inherit the rotation state of the parent ([#2595](https://github.com/elastic/eui/pull/#2595))

## [`v16.2.0`](https://github.com/elastic/eui/releases/tag/v16.2.0)

- Added `EuiCheckableCard` component, for radio buttons or checkboxes with complex child content ([#2555](https://github.com/elastic/eui/pull/2555))
- Updated `EuiCheckbox` and `EuiCheckboxGroup` to TypeScript ([#2555](https://github.com/elastic/eui/pull/2555))

**Bug fixes**

- Fixed `EuiSwitch` clicking on disabled label ([#2575](https://github.com/elastic/eui/pull/2575))
- Fixed `EuiComboBox` options list closing when clicking outside the component after scrolling ([#2589](https://github.com/elastic/eui/pull/2589))

## [`v16.1.0`](https://github.com/elastic/eui/releases/tag/v16.1.0)

- Updated compressed styles for `EuiButtonGroup` to include a background color ([#2568](https://github.com/elastic/eui/pull/2568))
- Added `heading` prop to `EuiCallOut` to allow for variance in the title tag ([#2357](https://github.com/elastic/eui/pull/2357))
- Added `badge` prop and new styles `EuiHeaderAlert` ([#2506](https://github.com/elastic/eui/pull/2506))
- Added new keyboard shortcuts for the data grid component: `Home` (same row, first column), `End` (same row, last column), `Ctrl+Home` (first row, first column), `Ctrl+End` (last row, last column), `Page Up` (next page) and `Page Down` (previous page) ([#2519](https://github.com/elastic/eui/pull/2519))
- Added `disabled` prop to the `EuiCheckboxGroup` definition ([#2545](https://github.com/elastic/eui/pull/2545))
- Added `disabled` option to the `option` attribute of the `options` object that is passed to the `EuiCheckboxGroup` so that checkboxes in a group can be individually disabled ([#2548](https://github.com/elastic/eui/pull/2548))
- Added `EuiAspectRatio` component that allows for responsively resizing embeds ([#2535](https://github.com/elastic/eui/pull/2535))
- Added `display` and `titleSize` props to `EuiCard` ([#2566](https://github.com/elastic/eui/pull/2566))
- Added `accessibility` glyph to `EuiIcon` ([#2566](https://github.com/elastic/eui/pull/2566))

**Bug fixes**

- Fixed `EuiDataGrid` schema detection on already defined column schemas ([#2550](https://github.com/elastic/eui/pull/2550))
- Added `euiTextBreakWord()` to `EuiToast` header ([#2549](https://github.com/elastic/eui/pull/2549))
- Fixed `.eui-textBreakAll` on Firefox ([#2549](https://github.com/elastic/eui/pull/2549))
- Fixed `EuiBetaBadge` accessibility with `tab-index=0` ([#2559](https://github.com/elastic/eui/pull/2559))
- Improved `EuiIcon` loading performance ([#2565](https://github.com/elastic/eui/pull/2565))

## [`v16.0.1`](https://github.com/elastic/eui/releases/tag/v16.0.1)

**Bug fixes**

- `EuiSwitch` now passes `name` attribute into underlying `button` ([#2533](https://github.com/elastic/eui/pull/2533))

## [`v16.0.0`](https://github.com/elastic/eui/releases/tag/v16.0.0)

- Made `EuiCard` more accessible ([#2521](https://github.com/elastic/eui/pull/2521))
- Added ability to pass `children` to `EuiCard` ([#2521](https://github.com/elastic/eui/pull/2521))
- Replaced root element in `EuiFlyout`, switching from `span` to `Fragment` ([#2527](https://github.com/elastic/eui/pull/2527))
- Upgraded `react-virtualized` to `9.21.2` ([#2531](https://github.com/elastic/eui/pull/2531))

**Bug fixes**

- Added support for `timeFormat` formatting in `EuiSuperDatePicker` and fixed some formatting inconsistencies ([#2518](https://github.com/elastic/eui/pull/2518))
- Added support for `locale` in `EuiSuperDatePicker` and `EuiDatePicker` both as a prop and from `EuiContext` ([#2518](https://github.com/elastic/eui/pull/2518))

**Breaking changes**

- Removed `EuiCardGraphic` ([#2521](https://github.com/elastic/eui/pull/2521))

## [`v15.0.0`](https://github.com/elastic/eui/releases/tag/v15.0.0)

- Converted `EuiShowFor` and `EuiHideFor` to TS ([#2503](https://github.com/elastic/eui/pull/2503))
- Upgraded `react-ace` to `7.0.5` ([#2526](https://github.com/elastic/eui/pull/2526))

**Bug fixes**
- Fixed `EuiButton` disabled text color ([#2534](lhttps://github.com/elastic/eui/pull/2534))
- Created `.euiTableCaption` with `position: relative` to avoid double border under header row ([#2484](https://github.com/elastic/eui/pull/2484))
- Fixed `EuiSwitch` to use `aria-labelledby` ([#2522](https://github.com/elastic/eui/pull/2522))
- Fixed `EuiPanelProps` type definition ([#2516](https://github.com/elastic/eui/pull/2516))

**Breaking changes**

- Added `display` modifier to `EuiShowFor` ([#2503](https://github.com/elastic/eui/pull/2503))
- Updated minimum TypeScript version to 3.5.3 ([#2510](https://github.com/elastic/eui/pull/2510))
- Removed `Omit` type in favor of TypeScript's built-in ([#2510](https://github.com/elastic/eui/pull/2510))

## [`v14.10.0`](https://github.com/elastic/eui/releases/tag/v14.10.0)

- Added new `euiControlBar` component for bottom-of-screen navigational elements ([#2204](https://github.com/elastic/eui/pull/2204))
- Converted `EuiFlyout` to TypeScript ([#2500](https://github.com/elastic/eui/pull/2500))
- Added an animation to the arrow on `EuiAccordion` as it opens / closes ([#2507](https://github.com/elastic/eui/pull/2507))
- Upgraded `react-input-autosize` to `2.2.2` ([#2514](https://github.com/elastic/eui/pull/2514))

**Bug fixes**

- Simplified `EuiColorStops` popover toggling ([#2505](https://github.com/elastic/eui/pull/2505))

## [`v14.9.0`](https://github.com/elastic/eui/releases/tag/v14.9.0)

- Added new `euiTreeView` component for rendering recursive objects such as folder structures ([#2409](https://github.com/elastic/eui/pull/2409))
- Added `euiXScrollWithShadows()` mixin and `.eui-xScrollWithShadows` utility class ([#2458](https://github.com/elastic/eui/pull/2458))
- Fixed `EuiColorStops` where empty string values would cause range min or max to be NaN ([#2496](https://github.com/elastic/eui/pull/2496))
- Improved `EuiSwitch` a11y by aligning to aria roles ([#2491](https://github.com/elastic/eui/pull/2491))
- Converted `EuiSwitch` to TypeScript ([#2491](https://github.com/elastic/eui/pull/2491))
- Added an accessible label-less `EuiSwitch` variation ([#2491](https://github.com/elastic/eui/pull/2491))

**Bug fixes**

- Normalized button `moz-focus-inner` ([#2445](https://github.com/elastic/eui/pull/2445))
- Fixed typo to correct `aria-modal` attribute in`EuiPopover` ([#2488](https://github.com/elastic/eui/pull/2488))
- Fixed position of `EuiCodeBlock` controls and added more tests ([#2459](https://github.com/elastic/eui/pull/2459))
- Changed `EuiCodeBlock` so that `overflowHeight` now applies a `maxHeight` instead of a `height` on the block ([#2487](https://github.com/elastic/eui/pull/2487))
- Fixed potentially inconsistent state update ([#2481](https://github.com/elastic/eui/pull/2481))
- Fixed `EuiSwitch` form behavior by adding a default button `type` of 'button' ([#2491](https://github.com/elastic/eui/pull/2491))

## [`v14.8.0`](https://github.com/elastic/eui/releases/tag/v14.8.0)

* `EuiButtonGroup` and `EuiButtonToggle` now accept `ReactNode` for their label prop instead of string ([#2392](https://github.com/elastic/eui/pull/2392))
* Added `useRenderToText` to `inner_text` service suite to render `ReactNode`s into label text ([#2392](https://github.com/elastic/eui/pull/2392))
* Added icons `tableDensityExpanded`, `tableDensityCompact`, `tableDensityNormal` to `EuiIcon` ([#2230](https://github.com/elastic/eui/pull/2230))
* Added `!important` to the animation of `EuiFocusRing` animation to make sure it is always used ([#2230](https://github.com/elastic/eui/pull/2230))
* Added `expandMini` icon to `EuiIcon` ([#2207](https://github.com/elastic/eui/pull/2366))
* Changed `EuiPopover` to use `role="dialog"` for better screen-reader announcements ([#2207](https://github.com/elastic/eui/pull/2366))
* Added function callback `onTrapDeactivation` to `EuiPopover` for when a focus trap is deactivated ([#2366](https://github.com/elastic/eui/pull/2366))
* Added logic for rendering of focus around `EuiPopover` to counteract a race condition ([#2366](https://github.com/elastic/eui/pull/2366))
* Added `EuiDataGrid` ([#2165](https://github.com/elastic/eui/pull/2165))

**Bug fixes**

* Corrected `lockProps` passdown in `EuiFocusTrap`, specifically to allows `style` to be passed down ([#2230](https://github.com/elastic/eui/pull/2230))
* Changed `children` property on `I18nTokensShape` type from a single `ReactChild` to now accept an `array` ([#2230](https://github.com/elastic/eui/pull/2230))
* Adjusted the color of `$euiColorHighlight` in dark mode ([#2176](https://github.com/elastic/eui/pull/2176))
* Changed `EuiPopoverFooter` padding to uniformly adjust with the size of the popover ([#2207](https://github.com/elastic/eui/pull/2207))
* Fixed `isDragDisabled` prop usage in `EuiDraggable` ([#2207](https://github.com/elastic/eui/pull/2366))
* Fixed `EuiMutationObserver`'s handling of`onMutation` when that prop's value changes ([#2421](https://github.com/elastic/eui/pull/2421))

## [`v14.7.0`](https://github.com/elastic/eui/releases/tag/v14.7.0)

- Converted `EuiRadio` and `EuiRadioGroup` to TypeScript ([#2438](https://github.com/elastic/eui/pull/2438))
- Improved a11y in `EuiImage` ([#2447](https://github.com/elastic/eui/pull/2447))
- Made EuiIcon a PureComponent, to speed up React re-render performance ([#2448](https://github.com/elastic/eui/pull/2448))
- Added ability for `EuiColorStops` to accept user-defined range bounds ([#2396](https://github.com/elastic/eui/pull/2396))
- Added `external` prop to `EuiLink` ([#2442](https://github.com/elastic/eui/pull/2442))
- Added disabled state to `EuiBadge` ([#2440](https://github.com/elastic/eui/pull/2440))
- Changed `EuiLink` to appear non interactive when passed the `disabled` prop and an `onClick` handler ([#2423](https://github.com/elastic/eui/pull/2423))
- Added `minimize` glyph to `EuiIcon` ([#2457](https://github.com/elastic/eui/pull/2457))

**Bug fixes**

- Re-enabled `width` property for `EuiTable` cell components ([#2452](https://github.com/elastic/eui/pull/2452))
- Fixed `EuiNavDrawer` collapse/expand button height issue
 ([#2463](https://github.com/elastic/eui/pull/2463))

## [`v14.6.0`](https://github.com/elastic/eui/releases/tag/v14.6.0)

- Added new updated `infraApp` and `logsApp` icons ([#2430](https://github.com/elastic/eui/pull/2430))

**Bug fixes**

- Fixed missing misc. button and link type definition exports ([#2434](https://github.com/elastic/eui/pull/2434))
- Strip custom semantics from `EuiSideNav` ([#2429](https://github.com/elastic/eui/pull/2429))

## [`v14.5.1`](https://github.com/elastic/eui/releases/tag/v14.5.1)

**Note: this release is a backport containing changes originally made in `14.6.0` and `14.7.0`**

- Added new updated `infraApp` and `logsApp` icons ([#2430](https://github.com/elastic/eui/pull/2430))
- Made EuiIcon a PureComponent, to speed up React re-render performance ([#2448](https://github.com/elastic/eui/pull/2448))

**Bug fixes**

- Fixed `EuiNavDrawer` collapse/expand button height issue ([#2463](https://github.com/elastic/eui/pull/2463))

## [`v14.5.0`](https://github.com/elastic/eui/releases/tag/v14.5.0)

- Update Elastic-Charts to version 13.0.0 and updated the theme object accordingly ([#2381](https://github.com/elastic/eui/pull/2381))
- Added new `EuiColorStops` component ([#2360](https://github.com/elastic/eui/pull/2360))
- Added `currency` glyph to 'EuiIcon' ([#2398](https://github.com/elastic/eui/pull/2398))
- Migrate `EuiBreadcrumbs`, `EuiHeader` etc, and `EuiLink` to TypeScript ([#2391](https://github.com/elastic/eui/pull/2391))
- Added `hasChildLabel` prop to `EuiFormRow` to avoid duplicate labels ([#2411](https://github.com/elastic/eui/pull/2411))
- Added `component` prop to `EuiPageBody`, switching the default from `div` to `main` ([#2410](https://github.com/elastic/eui/pull/2410))
- Added focus state to `EuiListGroupItem` ([#2406](https://github.com/elastic/eui/pull/2406))
- Added `keyboardShortcut` glyph to 'EuiIcon ([#2413](https://github.com/elastic/eui/pull/2413))
- Improved a11y in `EuiNavDrawer` ([#2417](https://github.com/elastic/eui/pull/2417))
- Improved a11y in `EuiSuperDatePicker` ([#2426](https://github.com/elastic/eui/pull/2426))

**Bug fixes**

- Fixed `EuiSelectable` to accept programmatic updates to its `options` prop ([#2390](https://github.com/elastic/eui/pull/2390))
- Fixed poor labeling in `EuiSuperDatePicker` ([#2411](https://github.com/elastic/eui/pull/2411))
- Fixed `EuiCodeEditor`'s ID to be dynamic between renders ([#2411](https://github.com/elastic/eui/pull/2411))
- Fixed `EuiCodeEditor` to not render multiple labels for some inputs ([#2411](https://github.com/elastic/eui/pull/2411))
- Fixed `EuiBreadcrumbs` improper use of `useInnerText` hook ([#2425](https://github.com/elastic/eui/pull/2425))

## [`v14.4.0`](https://github.com/elastic/eui/releases/tag/v14.4.0)

- Migrate `EuiEmptyPrompt`and `EuiCard` to TS ([#2387](https://github.com/elastic/eui/pull/2387))
- Added Lens app `lensApp` icon ([#2389](https://github.com/elastic/eui/pull/2389))
- Made `EuiKeyPadMenuItem` beta badge smaller ([#2388](https://github.com/elastic/eui/pull/2388))

## [`v14.3.0`](https://github.com/elastic/eui/releases/tag/v14.3.0)

- Added `package` icon to glyph set ([#2378](https://github.com/elastic/eui/pull/2378))
- Modified `EuiFacetButton` to use `$euiFocusBackgroundColor` for `:focus` state ([2365](https://github.com/elastic/eui/pull/2365))
- Added a `showMaxPopover` option for `EuiBreadcrumbs` to display all items when a `max` is set ([#2342](https://github.com/elastic/eui/pull/2342))
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

## [`v14.2.0`](https://github.com/elastic/eui/releases/tag/v14.2.0)

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

## [`v14.1.1`](https://github.com/elastic/eui/releases/tag/v14.1.1)

**Bug fixes**

- Fixed accidental removal of Elastic Charts from dependencies ([#2348](https://github.com/elastic/eui/pull/2348))

## [`v14.1.0`](https://github.com/elastic/eui/releases/tag/v14.1.0)

- Created `EuiSuggest` component ([#2270](https://github.com/elastic/eui/pull/2270))
- Added missing `compressed` styling to `EuiSwitch` ([#2327](https://github.com/elastic/eui/pull/2327))
- Migrate `EuiBottomBar`, `EuiHealth` and `EuiImage` to TS ([#2328](https://github.com/elastic/eui/pull/2328))
- Added hover and focus states when `allowFullScreen` is true in `EuiImage`([#2287](https://github.com/elastic/eui/pull/2287))
- Converted `EuiColorPicker` to TypeScript ([#2340](https://github.com/elastic/eui/pull/2340))
- Added inline rendering option to `EuiColorPicker` ([#2340](https://github.com/elastic/eui/pull/2340))

## [`v14.0.0`](https://github.com/elastic/eui/releases/tag/v14.0.0)

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

- Fixed `EuiColorPicker` padding on right to accommodate down caret
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

## [`v13.8.2`](https://github.com/elastic/eui/releases/tag/v13.8.2)

**Bug fixes**

- Corrected `EuiCodeBlock`'s proptype for `children` to be string or array of strings ([#2324](https://github.com/elastic/eui/pull/2324))
- Fixed `onClick` TypeScript definition for `EuiPanel` ([#2330](https://github.com/elastic/eui/pull/2330))
- Fixed `EuiComboBox` list reopening after closing on option selection in IE11 ([#2326](https://github.com/elastic/eui/pull/2326))

## [`v13.8.1`](https://github.com/elastic/eui/releases/tag/v13.8.1)

**Bug fixes**

- Updated TS def for `EuiFilterSelect` ([#2291](https://github.com/elastic/eui/pull/2291))
- Fixed alignment of icons and label in `EuiSideNavItem` ([#2297](https://github.com/elastic/eui/pull/2297))
- Fixed logic in `EuiContextMenu` to account for index of `0` ([#2304](https://github.com/elastic/eui/pull/2304))

## [`v13.8.0`](https://github.com/elastic/eui/releases/tag/v13.8.0)

- Added href prop to `EuiTab` and converted to TypeScript ([#2275](https://github.com/elastic/eui/pull/2275))
- Created `EuiInputPopover` component (formally) ([#2269](https://github.com/elastic/eui/pull/2269))
- Added docs for using [Elastic Charts](https://elastic.github.io/elastic-charts) with EUI ([#2209](https://github.com/elastic/eui/pull/2209))
- Improved fix for `EuiSuperDatePicker` to update `asyncInterval.isStopped` on a `isPaused` prop change ([#2298](https://github.com/elastic/eui/pull/2298))

**Bug fixes**

- Removed extra right side margin in `EuiSuperDatePicker` ([#2236](https://github.com/elastic/eui/pull/2236))
- Fixed incorrect `onClick` type for `EuiButtonEmpty` ([#2282](https://github.com/elastic/eui/pull/2282))
- Fixed compilation script to remove all TypeScript definition exports from built JS assets ([#2279](https://github.com/elastic/eui/pull/2279))
- Fixed output extension for `dist` charts theme module ([#2294](https://github.com/elastic/eui/pull/2294))

## [`v13.7.0`](https://github.com/elastic/eui/releases/tag/v13.7.0)

- Allow `EuiFlexGroup` to accept a `ref` ([#2223](https://github.com/elastic/eui/pull/2223))

**Bug fixes**

- Fixed `EuiSuperDatePicker` to update `asyncInterval.isStopped` on a `isPaused` prop change ([#2250](https://github.com/elastic/eui/pull/2250))
- Converted table, popover, buttons, pagination, outside click detector, focus trap, context menu, and panel to TypeScript ([#2212](https://github.com/elastic/eui/pull/2212))
- Fixed `EuiStat` invalid DOM nesting due to a `<p>` tag nested within another `<p>` tag ([#2229](https://github.com/elastic/eui/pull/2229))
- Fixed title text of dock/undock icon in `EuiNavDrawer` ([#2261](https://github.com/elastic/eui/pull/2261))

**Reverts**

- Revert conversion of `EuiSwitch` to `button[role=switch]` and TypeScript ([#2255](https://github.com/elastic/eui/pull/2255))

## [`v13.6.1`](https://github.com/elastic/eui/releases/tag/v13.6.1)

**Note: this release is a backport containing changes originally made in `13.7.0`**

**Bug fixes**

- Fixed title text of dock/undock icon in `EuiNavDrawer` ([#2261](https://github.com/elastic/eui/pull/2261))

## [`v13.6.0`](https://github.com/elastic/eui/releases/tag/v13.6.0)

**Note: this contains a reversion backported for targeted release**

- Revert conversion of `EuiSwitch` to `button[role=switch]` and TypeScript ([#2255](https://github.com/elastic/eui/pull/2255))

## [`v13.5.0`](https://github.com/elastic/eui/releases/tag/v13.5.0)

**Note: this contains component code that was reverted in the next release. Use `13.6.0` instead**

- Fixed `logoCloudEnterprise`, `logoLogging`, and `logoSecurity` SVGs in `EuiIcon` to be center aligned ([#2246](https://github.com/elastic/eui/pull/2246))
- Added locking behavior of `EuiNavDrawer` expanded state including the following props `isLocked`, `onIsLockedUpdate` ([#2247](https://github.com/elastic/eui/pull/2247))

## [`v13.4.1`](https://github.com/elastic/eui/releases/tag/v13.4.1)

**Note: this contains component code that was later reverted. Use `13.6.0` instead**

- Converted `EuiSwitch` to TypeScript ([#2243](https://github.com/elastic/eui/pull/2243))

**Bug fixes**

- Added missing `viewBox` attribute to Docker, Kubernetes, and Redis logos ([#2240](https://github.com/elastic/eui/pull/2240))

## [`v13.4.0`](https://github.com/elastic/eui/releases/tag/v13.4.0)

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

## [`v13.3.0`](https://github.com/elastic/eui/releases/tag/v13.3.0)

- Added i18n tokens to `EuiSuperDatePicker` and `EuiSuperUpdateButton`

## [`v13.2.0`](https://github.com/elastic/eui/releases/tag/v13.2.0)

- Converted `EuiStep`, `EuiSteps`, `EuiStepHorizontal`, `EuiStepsHorizontal`, and `EuiSubSteps` to Typescript ([#2186](https://github.com/elastic/eui/pull/2186))

**Bug fixes**

- Fixed `EuiBadge` truncation and auto-applied `title` attribute with `innerText` ([#2190](https://github.com/elastic/eui/pull/2190))
- Remove exported TypeScript type and interface exports from built artifacts when they originate from `node_modules` ([#2191](https://github.com/elastic/eui/pull/2191))
- Fixed `EuiBadge` truncation in IE and for the global filters pattern ([#2194](https://github.com/elastic/eui/pull/2194))
- Fixed alignment of long titles in `EuiStep` ([#2186](https://github.com/elastic/eui/pull/2186))
- Fixed the TS defs for EuiFilterSelectItem ([#2192](https://github.com/elastic/eui/pull/2192))
- Added missing TS defs for EuiTextArea ([#2201](https://github.com/elastic/eui/pull/2201))

## [`v13.1.1`](https://github.com/elastic/eui/releases/tag/v13.1.1)

**Bug fixes**

- Fixed `EuiMutationObserver` errors in IE11 by conditionally setting the `attributes` observer option according to the new spec ([#2180](https://github.com/elastic/eui/pull/2180))
- Fixed error message when an I18n mapping is a formatting function with no values provided ([#2182](https://github.com/elastic/eui/pull/2182))

## [`v13.1.0`](https://github.com/elastic/eui/releases/tag/v13.1.0)

- Added `partial` glyph to `EuiIcon` ([#2152](https://github.com/elastic/eui/pull/2152))
- Added `tall`, `fullWidth`, and `isInvalid` props to `EuiFilePicker` ([#2145](https://github.com/elastic/eui/pull/2145))
- Added exports for `react-beautiful-dnd` interfaces used by EUI components ([#2173](https://github.com/elastic/eui/pull/2173))
- Added `isDisabled` prop & styles to `EuiSuperDatePicker` ([#2139](https://github.com/elastic/eui/pull/2139))
- Added `responsiveColumn` option to `type` prop of `EuiDescriptionList` ([#2166](https://github.com/elastic/eui/pull/2166))
- Removed `<use>` and `<def>` from svg icons ([#2162](https://github.com/elastic/eui/pull/2162))

**Bug fixes**

- Fixed invalid `aria-describedby` values set by `EuiToolTip` ([#2156](https://github.com/elastic/eui/pull/2156))
- Added `"center"` as an acceptable value to `EuiBasicTable`'s `align` proptype ([#2158](https://github.com/elastic/eui/pull/2158))
- Fixed `.eui-textBreakWord` utility class to be cross-browser compatible ([#2157](https://github.com/elastic/eui/pull/2157))
- Fixed truncation and z-index of `EuiFilePicker` ([#2145](https://github.com/elastic/eui/pull/2145))
- Fixed `EuiNavDrawer`'s support for flyout groups in production/minified builds ([#2178](https://github.com/elastic/eui/pull/2178))
- Fixed width overflow of `EuiModal` ([#2164](https://github.com/elastic/eui/pull/2164))

## [`v13.0.0`](https://github.com/elastic/eui/releases/tag/v13.0.0)

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

- Removed `EuiSeriesChart` and related components. Please look to [Elastic Charts](https://github.com/elastic/elastic-charts) for a replacement ([#2135](https://github.com/elastic/eui/pull/2108))
- Removed `eui_k6_theme` related Sass and JSON files ([#2135](https://github.com/elastic/eui/pull/2108))
- Removed no longer used Sass mixins and variables in `EuiForm`, `EuiCallOut`, and `EuiRange` components ([#2135](https://github.com/elastic/eui/pull/2108))

## [`v12.4.0`](https://github.com/elastic/eui/releases/tag/v12.4.0)

- Centered the square of the `popout` glyph in the artboard ([#2120](https://github.com/elastic/eui/pull/2120))
- Added `useInnerText` and `EuiInnerText` component utilities for retrieving text content of elements ([#2100](https://github.com/elastic/eui/pull/2100))
- Converted `EuiRangeHighlight`, `EuiRangeLabel`, `EuiRangeLevels`, `EuiRangeSlider`, `EuiRangeThumb`, `EuiRangeTicks`, `EuiRangeTrack`, and `EuiRangeWrapper` to TypeScript ([#2124](https://github.com/elastic/eui/pull/2124))
- Converted `EuiAccordion` to TypeScript ([#2128](https://github.com/elastic/eui/pull/2128))

**Bug fixes**

- Fixed `EuiComboBox`'s options list from staying open when scrolled in a container by auto-closing the list on scroll ([#2106](https://github.com/elastic/eui/pull/2106))
- Fixed content provided to `EuiListGroupItem` and `EuiFilterButton` `title` attribute to prevent unreadable popover ([#2100](https://github.com/elastic/eui/pull/2100))
- Fixed a nearly infinite `requestAnimationFrame` loop caused by `focus` state changes in nested `EuiPopover` components ([#2110](https://github.com/elastic/eui/pull/2110))
- Fixed incorrect ES Query DSL generated by `EuiSearchBar` when an OR clause is present ([#2133](https://github.com/elastic/eui/pull/2133))

## [`v12.3.1`](https://github.com/elastic/eui/releases/tag/v12.3.1)

**Bug fixes**

- Restored missing scss and react-datepicker files to the npm-published packaged ([#2119](https://github.com/elastic/eui/pull/2119))

## [`v12.3.0`](https://github.com/elastic/eui/releases/tag/v12.3.0)

**Note: this release contained a change which prevented necessary files from being published to npm, this was fixed in 12.3.1**

- Added `logoSecurity`, `logoCode`, `logoMaps`, `logoUptime` and `logoLogging` to `EuiIcon` types ([#2111](https://github.com/elastic/eui/pull/2111))
- Added a `column` direction option to `EuiFlexGrid` ([#2073](https://github.com/elastic/eui/pull/2073))
- Updated `EuiSuperDatePicker`'s  commonly used date/times to display as columns ([#2073](https://github.com/elastic/eui/pull/2073))
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

## [`v12.2.1`](https://github.com/elastic/eui/releases/tag/v12.2.1)

**Note: this release is a backport containing changes originally made in `12.4.0`**

**Bug fixes**

- Fixed a nearly infinite `requestAnimationFrame` loop caused by `focus` state changes in nested `EuiPopover` components ([#2110](https://github.com/elastic/eui/pull/2110))

## [`v12.2.0`](https://github.com/elastic/eui/releases/tag/v12.2.0)

- Made `aria-label` attribute equal to `title` of the the selection checkbox in table items (for each row) in `EuiBasicTable` ([#2043](https://github.com/elastic/eui/pull/2043))
- Updated `appApm` and `logoAPM` with new updated icons ([#2084](https://github.com/elastic/eui/pull/2084))

**Bug fixes**

- Added requirement that `EuiFormRow` has exactly one child element [#2054](https://github.com/elastic/eui/pull/2054)

## [`v12.1.0`](https://github.com/elastic/eui/releases/tag/v12.1.0)

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

## [`v12.0.0`](https://github.com/elastic/eui/releases/tag/v12.0.0)

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

## [`v11.3.2`](https://github.com/elastic/eui/releases/tag/v11.3.2)

**Note: this release is a backport containing changes originally made in `12.0.0`**

**Bug fixes**

- Fixed `EuiInMemoryTable` sort value persistence through lifecycle updates ([#2035](https://github.com/elastic/eui/pull/2035))
- Fixed `EuiColorPicker` positioning and keyboard navigation in certain portal contexts ([#2038](https://github.com/elastic/eui/pull/2038))

## [`v11.3.1`](https://github.com/elastic/eui/releases/tag/v11.3.1)

**Bug fixes**

- Fixed `EuiBadge` conflicts with providing both `iconOnClick` and `onClick` ([#1994](https://github.com/elastic/eui/pull/1994))
- Fixed optional TS definitions for `EuiColorPicker` `onBlur` and `onFocus` callbacks ([#1993](https://github.com/elastic/eui/pull/1993))
- Fixed `EuiIcon` again so that webpack can build dynamic require contexts ([#1998](https://github.com/elastic/eui/pull/1998))
- Fixed double borders on prepend/append items in `EuiFormControlLayout` ([#1996](https://github.com/elastic/eui/pull/1996))
- Fixed `EuiSuperSelect` TS definitions ([#1995](https://github.com/elastic/eui/pull/1995))

## [`v11.3.0`](https://github.com/elastic/eui/releases/tag/v11.3.0)

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

## [`v11.2.1`](https://github.com/elastic/eui/releases/tag/v11.2.1)

**Bug fixes**

- Fixed type mismatch between PropType and TypeScript def for `EuiToast` `title` ([#1962](https://github.com/elastic/eui/pull/1962))

## [`v11.2.0`](https://github.com/elastic/eui/releases/tag/v11.2.0)

- Converted `EuiFormControlLayoutCustomIcon` to TS ([#1956](https://github.com/elastic/eui/pull/1956))
- Converted `EuiStepNumber` to TS ([#1893](https://github.com/elastic/eui/pull/1893))
- Converted `EuiFormControlLayoutClearButton` to TS ([#1922](https://github.com/elastic/eui/pull/1922))
- Added `data-test-subj` property to `EuiDraggable` and `EuiDroppable` ([#1943](https://github.com/elastic/eui/pull/1943))
- Added type definitions to `EuiSuperSelect` ([#1907](https://github.com/elastic/eui/pull/1907))
- Updated `EuiIcon` to use Slack's updated branding ([#1954](https://github.com/elastic/eui/pull/1954))
- Updated `compile-icons` script to format icon components with Prettier ([#1955](https://github.com/elastic/eui/pull/1955))

**Bug fixes**

- Addressed a chrome issue where negative letter-spacing can reverse RTL text in SVGs ([#1960](https://github.com/elastic/eui/pull/1960))

## [`v11.1.0`](https://github.com/elastic/eui/releases/tag/v11.1.0)

- Converted `pretty_interval` to TS ([#1920](https://github.com/elastic/eui/pull/1920))
- Converted `relative_options` to TS ([#1921](https://github.com/elastic/eui/pull/1921))
- Added width to `EuiFlexItem` when gutter in `EuiFlexGrid` is set to none ([#1941](https://github.com/elastic/eui/pull/1941))
- Format all JavaScript files with Prettier through ESLint ([#1906](https://github.com/elastic/eui/pull/1906))
- Replaced `appSecurityAnalytics` in `EuiIcon` with an updated SVG ([#1948](https://github.com/elastic/eui/pull/1948))

**Bug fixes**

- Removed unused prop enum of `l` in `EuiButton` ([#1936](https://github.com/elastic/eui/pull/1936))
- Fixed `EuiSelect` browser event inconsistencies by normalizing `mouseup` propagation ([#1926](https://github.com/elastic/eui/pull/1926))
- Removed `children` as a required prop for `EuiOverlayMask` ([#1937](https://github.com/elastic/eui/pull/1937))

## [`v11.0.1`](https://github.com/elastic/eui/releases/tag/v11.0.1)

**Bug fixes**

- Fixed `EuiIconTip`'s typescript definition ([#1934](https://github.com/elastic/eui/pull/1934))
- Reinstated `EuiIcon` component ability to handle `type` prop updates ([#1935](https://github.com/elastic/eui/pull/1935))

## [`v11.0.0`](https://github.com/elastic/eui/releases/tag/v11.0.0)

- Added support for custom React SVG elements and external SVG URLs to `EuiIcon` ([#1924](https://github.com/elastic/eui/pull/1924))

**Bug fixes**

- Fixed Firefox flash of unstyled select dropdown ([#1927](https://github.com/elastic/eui/pull/1927))

**Breaking changes**

- Split `EuiIcon` icon loading into dynamic imports ([#1924](https://github.com/elastic/eui/pull/1924))

## [`v10.4.2`](https://github.com/elastic/eui/releases/tag/v10.4.2)

**Note: this release is a backport containing changes originally made in `11.2.0`**

**Bug fixes**

- Addressed a chrome issue where negative letter-spacing can reverse RTL text in SVGs ([#1960](https://github.com/elastic/eui/pull/1960))

## [`v10.4.1`](https://github.com/elastic/eui/releases/tag/v10.4.1)

**Note: this release is a backport containing changes originally made in `11.1.0`**

- Replaced `appSecurityAnalytics` in `EuiIcon` with an updated SVG ([#1948](https://github.com/elastic/eui/pull/1948))

## [`v10.4.0`](https://github.com/elastic/eui/releases/tag/v10.4.0)

- Added `display` prop to `EuiTabs` and `EuiTabbedContent` components for ability to use an alternative `condensed` style ([#1904](https://github.com/elastic/eui/pull/1904))

## [`v10.3.1`](https://github.com/elastic/eui/releases/tag/v10.3.1)

**Bug fixes**

- Fixed a regression where `EuiStat` reported accepting `string` for `title`, `description`, even though `ReactNode` is acceptable ([#1910](https://github.com/elastic/eui/pull/1910))

## [`v10.3.0`](https://github.com/elastic/eui/releases/tag/v10.3.0)

- Added support for `href` on the last item in `EuiBreadcrumbs` ([#1905](https://github.com/elastic/eui/pull/1905))
- Added `selectable` prop to `EuiCard` ([#1895](https://github.com/elastic/eui/pull/1895))
- Converted `EuiValidatableControl` to TS ([#1879](https://github.com/elastic/eui/pull/1879))

**Bug fixes**

- Fixed prompt text rendering in `EuiFilePicker` when a React element is passed ([#1903](https://github.com/elastic/eui/pull/1903))
- Fixed overflow scrolling of `EuiModal` and `EuiConfirmModal` for Chrome and Safari ([#1902](https://github.com/elastic/eui/pull/1902))
- Fixed `EuiOverlayMask` `children` element mismatch TS error ([#1900](https://github.com/elastic/eui/pull/1900))

## [`v10.2.1`](https://github.com/elastic/eui/releases/tag/v10.2.1)

**Bug fixes**

- Fixed responsiveness of `EuiFilterGroup` ([#1849](https://github.com/elastic/eui/pull/1849))

**Deprecations**

- Replaced `EuiFilterButton`'s `noDivider` prop with `withNext` ([#1849](https://github.com/elastic/eui/pull/1849))

## [`v10.2.0`](https://github.com/elastic/eui/releases/tag/v10.2.0)

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

## [`v10.1.0`](https://github.com/elastic/eui/releases/tag/v10.1.0)

- Added `tokenModule` and `tokenNamespace` icons to `EuiToken` ([#1839](https://github.com/elastic/eui/pull/1839))
- Used `cache-loader` to speed up development docs site build ([#1841](https://github.com/elastic/eui/pull/1841)
- Converted `matching_options` to TS ([#1828](https://github.com/elastic/eui/pull/1828))
- Converted `EuiFormHelpText` to TS ([#1852](https://github.com/elastic/eui/pull/1852))
- Added `onSearch` to `EuiFieldSearchProps`'s type definition ([#1627](https://github.com/elastic/eui/pull/1627))
- Added `moon` glyph to `EuiIcon` ([#1859](https://github.com/elastic/eui/pull/1859))
- Added `logoAzure` and `logoAzureMono` logos to `EuiIcon` ([#1859](https://github.com/elastic/eui/pull/1859))
- Added exact-text matching operator to `EuiSearchBar` / `Query` and allow empty phrases, e.g. `""` ([#1843](https://github.com/elastic/eui/pull/1843))
- Allow forward-slash character in `EuiSearchBar` / `Query` search values ([#1843](https://github.com/elastic/eui/pull/1843))
- Changed `EuiLoadingKibana`, `EuiLoadingSpinner`, `EuiLoadingChart` and `EuiLoadingContent` components to use spans instead of divs  ([#1845](https://github.com/elastic/eui/pull/1845))

**Bug fixes**

- Added `toastLifeTimeMs` typescript definition for individual toasts in `EuiGlobalToastList` ([#1846](https://github.com/elastic/eui/pull/1846))
- Added logic to prevent refocusing `EuiComboBox` input after container blur event ([#1863](https://github.com/elastic/eui/pull/1863))
- Changed `EuiLoadingKibana` so it could better nest within `EuiFlexItem`  ([#1845](https://github.com/elastic/eui/pull/1845))

## [`v10.0.1`](https://github.com/elastic/eui/releases/tag/v10.0.1)

- Converted `EuiText`, `EuiTextColor` and `EuiTextAlign` to TS ([#1791](https://github.com/elastic/eui/pull/1791))
- Updated `IconColor` type to better distinguish between accepted types ([#1842](https://github.com/elastic/eui/pull/1842))

## [`v10.0.0`](https://github.com/elastic/eui/releases/tag/v10.0.0)

- Converted `EuiTitle` to TS ([#1810](https://github.com/elastic/eui/pull/1810))
- Added `adjustDateOnChange` prop to date pickers, enabling month and year changes to trigger `onChange` ([#1817](https://github.com/elastic/eui/pull/1817))
- Updated the overflow shadows for `EuiModal` and `EuiFlyout` ([#1829](https://github.com/elastic/eui/pull/1829))
- Added `confirmButtonDisabled` prop to `EuiConfirmModal` ([#1829](https://github.com/elastic/eui/pull/1829))
- Fixed `EuiNavDrawer` overflow scroll behavior on Firefox ([#1837](https://github.com/elastic/eui/pull/1837))

**Bug fixes**

- Fixed mobile layout for `EuiConfirmModal` ([#1829](https://github.com/elastic/eui/pull/1829))

**Deprecations**

- Replaced the following SASS mixins `euiOverflowShadowTop`, `euiOverflowShadowBottom` with `euiOverflowShadow` ([#1829](https://github.com/elastic/eui/pull/1829))


**Breaking changes**

- Removed transitional `keyOfStringsOnly` option from TypeScript configuration ([#1814](https://github.com/elastic/eui/pull/1814))

## [`v9.9.1`](https://github.com/elastic/eui/releases/tag/v9.9.1)

- Re-enabled installation of `@elastic/eui` via npm ([#1811](https://github.com/elastic/eui/pull/1811))

**Bug fixes**

- Added `isLoading` prop typedef to `EuiSuperDatePickerProps` ([#1812](https://github.com/elastic/eui/pull/1812))
- Fixed `EuiSearchBox` query input resetting on prop updates ([#1823](https://github.com/elastic/eui/pull/1823))
- Fixed `EuiSearchBar` filter button highlighting ([#1824](https://github.com/elastic/eui/pull/1824))

## [`v9.9.0`](https://github.com/elastic/eui/releases/tag/v9.9.0)

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

## [`v9.8.0`](https://github.com/elastic/eui/releases/tag/v9.8.0)

- **[Beta]** Added new `EuiSelectable` component  ([#1699](https://github.com/elastic/eui/pull/1699))
- **[Beta]** Added new drag and drop components: `EuiDragDropContext`, `EuiDraggable`, and `EuiDroppable` ([#1733](https://github.com/elastic/eui/pull/1733))

## [`v9.7.2`](https://github.com/elastic/eui/releases/tag/v9.7.2)

- Converted `EuiFormErrorText` to TS ([#1772](https://github.com/elastic/eui/pull/1772))
- Added `data-test-subj`s to `EuiSuperDatePicker`'s `EuiRelativeTab` inputs  ([#1782](https://github.com/elastic/eui/pull/1782))

**Bug fixes**

- Update ButtonIconColor type to provide all available options ([#1783](https://github.com/elastic/eui/pull/1783))
- Prevent calculation on `null` ref during `EuiResizeObserver` observation ([#1784](https://github.com/elastic/eui/pull/1784))

## [`v9.7.1`](https://github.com/elastic/eui/releases/tag/v9.7.1)

**Bug fixes**

- Fixed heading and paragraph tag font style inherits ([#1776](https://github.com/elastic/eui/pull/1776))

## [`v9.7.0`](https://github.com/elastic/eui/releases/tag/v9.7.0)

- Changed `EuiNavDrawer` to close on any link click ([#1773](https://github.com/elastic/eui/pull/1773))

## [`v9.6.0`](https://github.com/elastic/eui/releases/tag/v9.6.0)

- Converted `makeId` to TS ([#1759](https://github.com/elastic/eui/pull/1759))
- Converted `EuiCardGraphic` to TS ([#1751](https://github.com/elastic/eui/pull/1751))
- Enhanced the build process to emit TypeScript types for the variables extracted from the themes ([#1750](https://github.com/elastic/eui/pull/1750))

**Bug fixes**

**Note: this release creates a minor regression to text scales where paragraph and heading tags were no longer inheriting from their container. This is fixed in `9.7.1`.**

- Set `h1 through h6, p` tags font reset based on family, size, and weight ([#1760](https://github.com/elastic/eui/pull/1760))
- Fixed `EuiButton` font size inheritance ([#1760](https://github.com/elastic/eui/pull/1760))
- Updated button elements in `EuiFilePicker`, `EuiFormControlLayoutClearButton`, `EuiFormControlLayoutCustomIcon`, `EuiListGroupItem`, and `EuiSideNavItem` to type=button ([#1764](https://github.com/elastic/eui/pull/1764))
- Fixed outside click detection inconsistencies by comparing `mouseup` and `mousedown` event targets rather than using `click` event target ([#1761](https://github.com/elastic/eui/pull/1761))

## [`v9.5.0`](https://github.com/elastic/eui/releases/tag/v9.5.0)

- Changed `EuiSuperDatePicker` to call `onRefresh` instead of `onTimeChanged` when user clicks "Refresh" button ([#1745](https://github.com/elastic/eui/pull/1745))
- Added a new `EuiLoadingContent` component that displays blocks as placeholders for text ([#1730](https://github.com/elastic/eui/pull/1730))
- Added documentation entry in `EuiPagination` for `activePage` prop ([#1740](https://github.com/elastic/eui/pull/1740))
- Changed `EuiButton` to use "m" as it's default `size` prop ([#1742](https://github.com/elastic/eui/pull/1742))
- Adds type definitions for `EuiListGroup` and `EuiListGroupItem` ([#1737](https://github.com/elastic/eui/pull/1737))

**Bug fixes**

- Fixed `EuiToolTip` potentially having incorrect position calculations near the window edge  ([#1744](https://github.com/elastic/eui/pull/1744))

## [`v9.4.2`](https://github.com/elastic/eui/releases/tag/v9.4.2)

**Bug fixes**

- Fixed `hexToRgb` from erroring on an incorrect string input ([#1741](https://github.com/elastic/eui/pull/1741))
- Fixed `EuiBadge` custom `color` prop type ([#1741](https://github.com/elastic/eui/pull/1741))
- Fixed inaccurately required `onRefresh` prop (should be optional) that was introduced in types in version 9.4.1 ([#1743](https://github.com/elastic/eui/pull/1743))

## [`v9.4.1`](https://github.com/elastic/eui/releases/tag/v9.4.1)

**Bug fixes**

- Adds missing type and fixes closure-scope problem for `SuperDatePicker`'s `onRefresh` callback ([#1732](https://github.com/elastic/eui/pull/1732))
- Changed `EuiBottomBar` to refer to the end of document ([#1727](https://github.com/elastic/eui/pull/1727))
- Fixed `EuiComboBox`'s calls to its `onBlur` prop ([#1739](https://github.com/elastic/eui/pull/1739))

## [`v9.4.0`](https://github.com/elastic/eui/releases/tag/v9.4.0)

- Allow toasts in `EuiGlobalToastList` to override `toastLifeTimeMs` ([#1720](https://github.com/elastic/eui/pull/1720))
- Allow `EuiListGroupItem` to pass a custom element as the `icon` ([#1726](https://github.com/elastic/eui/pull/1726))
- Added default icon for `EuiListGroupItem` if one is not passed ([#1729](https://github.com/elastic/eui/pull/1729))
- Added `toInitials` string service ([#1729](https://github.com/elastic/eui/pull/1729))

**Bug fixes**

- Removed all `lodash` imports in `eui.d.ts` to avoid namespace pollution ([#1723](https://github.com/elastic/eui/pull/1723))
- Prevent `EuiComboBox` from creating a custom option value when user clicks on a value in the dropdown ([#1728](https://github.com/elastic/eui/pull/1728))

## [`v9.3.0`](https://github.com/elastic/eui/releases/tag/v9.3.0)

- Added `footerLink` and `showToolTips` to `EuiNavDrawer` and added `EuiNavDrawerGroup` ([#1701](https://github.com/elastic/eui/pull/1701))

**Bug fixes**

- Fixed `EuiSuperDatePicker` time selection jumping on focus ([#1704](https://github.com/elastic/eui/pull/1704))

## [`v9.2.1`](https://github.com/elastic/eui/releases/tag/v9.2.1)

**Bug fixes**

- Make `EuiPopover`'s repositionOnScroll prop optional in TS ([#1705](https://github.com/elastic/eui/pull/1705))

## [`v9.2.0`](https://github.com/elastic/eui/releases/tag/v9.2.0)

- Adjusted the dark theme palette a bit more and adjusted a few components ([#1700](https://github.com/elastic/eui/pull/1700))

## [`v9.1.0`](https://github.com/elastic/eui/releases/tag/v9.1.0)

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
- Fixed `EuiComboBox` `activeOptionIndex` error with empty search results ([#1695](https://github.com/elastic/eui/pull/1695))
- Fixed IE11 rendering issue in `EuiLoadingKibana` ([#1683](https://github.com/elastic/eui/pull/1683))

## [`v9.0.2`](https://github.com/elastic/eui/releases/tag/v9.0.2)

**Note: this release is a backport containing changes originally made in `9.1.0`**

**Bug fixes**

- Fixed floating point arithmetic bug in `EuiRangeTrack`'s value validation ([#1687](https://github.com/elastic/eui/pull/1687))

## [`v9.0.1`](https://github.com/elastic/eui/releases/tag/v9.0.1)

**Bug fixes**

- Fixed definition exports for converted Typescript components ([#1633](https://github.com/elastic/eui/pull/1633))

## [`v9.0.0`](https://github.com/elastic/eui/releases/tag/v9.0.0)

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

## [`v8.0.0`](https://github.com/elastic/eui/releases/tag/v8.0.0)

**Breaking changes**

- Upgraded TypeScript to 3.3 ([#1583](https://github.com/elastic/eui/pull/1583))
- Upgraded React to 16.8 ([#1583](https://github.com/elastic/eui/pull/1583))
- Upgraded Jest to 24.1 ([#1583](https://github.com/elastic/eui/pull/1583))
- Upgraded Enzyme to 3.9 ([#1583](https://github.com/elastic/eui/pull/1583))

## [`v7.3.0`](https://github.com/elastic/eui/releases/tag/v7.3.0)

- Added `onRefresh` option for `EuiSuperDatePicker` ([#1577](https://github.com/elastic/eui/pull/1577))
- Converted `EuiToggle` to TypeScript ([#1570](https://github.com/elastic/eui/pull/1570))
- Added type definitions for `EuiButtonGroup`,`EuiButtonToggle`, `EuiFilterButton`, `EuiFilterGroup`, and `EuiFilterSelectItem` ([#1570](https://github.com/elastic/eui/pull/1570))
- Added `displayOnly` prop to EuiFormRow ([#1582](https://github.com/elastic/eui/pull/1582))
- Added an index.d.ts file for the date picker components, including `EuiDatePicker`, `EuiDatePickerRange`, and `EuiSuperDatePicker` ([#1574](https://github.com/elastic/eui/pull/1574))

**Bug fixes**

- Fixed several bugs with `EuiRange` and `EuiDualRange` including sizing of inputs, tick placement, and the handling of invalid values ([#1580](https://github.com/elastic/eui/pull/1580))

## [`v7.2.0`](https://github.com/elastic/eui/releases/tag/v7.2.0)

- Added `text` as a color option for `EuiLink` ([#1571](https://github.com/elastic/eui/pull/1571))
- Added `EuiResizeObserver` to expose ResizeObserver API to React components; falls back to MutationObserver API in unsupported browsers ([#1559](https://github.com/elastic/eui/pull/1559))
- Added `EuiFocusTrap` as a wrapper around `react-focus-lock` to enable trapping focus in more cases, including React portals ([#1550](https://github.com/elastic/eui/pull/1550))

**Bug fixes**

- Fixed content cut off in `EuiContextMenuPanel` when height changes dynamically ([#1559](https://github.com/elastic/eui/pull/1559))
- Fixed `EuiComboBox` to allow keyboard tab to exit single selection box ([#1576](https://github.com/elastic/eui/pull/1576))
- Various fixes related to focus order and focus trapping as they relate to content in React portals ([#1550](https://github.com/elastic/eui/pull/1550))

## [`v7.1.0`](https://github.com/elastic/eui/releases/tag/v7.1.0)

- Added `append` prop to `EuiFieldText` ([#1567](https://github.com/elastic/eui/pull/1567))
- Adjusted set of Elastic Logos in `EuiIcon` to look better in dark mode ([#1462](https://github.com/elastic/eui/pull/1562))
- Added `isCopyable` prop to `EuiCodeBlock` ([#1556](https://github.com/elastic/eui/pull/1556))
- Added optional `Snippet` tab to docs and renamed demo tabs ([#1556](https://github.com/elastic/eui/pull/1556))
- Expanded `getSecureRelForTarget` to handle elastic.co domains as a referrer whitelist ([#1565](https://github.com/elastic/eui/pull/1565))
- New `url` utility for verifying if a URL is a referrer whitelist ([#1565](https://github.com/elastic/eui/pull/1565))
- Add iconSize to ButtonIcon type definition ([#1568](https://github.com/elastic/eui/pull/1568))

## [`v7.0.0`](https://github.com/elastic/eui/releases/tag/v7.0.0)

- Created `EuiDualRange` using components from modularized, refactored `EuiRange`. New util service `isWithinRange` is the first in the number category ([#1485](https://github.com/elastic/eui/pull/1485))
- Upgraded `lodash` to v4, taking advantage of modular imports ([#1534](https://github.com/elastic/eui/pull/1534))
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

## [`v6.10.9`](https://github.com/elastic/eui/releases/tag/v6.10.9)

**Bug fixes**

- Bumped `lodash` version to `elastic/lodash@3.10.1-kibana3` ([#2280](https://github.com/elastic/eui/issues/2280))

## [`v6.10.8`](https://github.com/elastic/eui/releases/tag/v6.10.8)

**Note: this release is a backport containing changes originally made in `11.2.0`**

**Bug fixes**

- Addressed a chrome issue where negative letter-spacing can reverse RTL text in SVGs ([#1960](https://github.com/elastic/eui/pull/1960))

## [`v6.10.7`](https://github.com/elastic/eui/releases/tag/v6.10.7)

**Note: this release is a backport containing changes originally made in `9.7.0`**

- Changed `EuiNavDrawer` to close on any link click ([#1773](https://github.com/elastic/eui/pull/1773))

## [`v6.10.6`](https://github.com/elastic/eui/releases/tag/v6.10.6)

**Note: this release is a backport containing changes originally made in `9.6.0`**

**Bug fixes**

- Fixed outside click detection inconsistencies by comparing `mouseup` and `mousedown` event targets rather than using `click` event target ([#1761](https://github.com/elastic/eui/pull/1761))

## [`v6.10.5`](https://github.com/elastic/eui/releases/tag/v6.10.5)

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
- Fixed `EuiComboBox` `activeOptionIndex` error with empty search results ([#1695](https://github.com/elastic/eui/pull/1695))
- Prevent `EuiComboBox` from creating a custom option value when user clicks on a value in the dropdown ([#1728](https://github.com/elastic/eui/pull/1728))
- Fixed `EuiSuperDatePicker` time selection jumping on focus ([#1704](https://github.com/elastic/eui/pull/1704))

## [`v6.10.4`](https://github.com/elastic/eui/releases/tag/v6.10.4)

**Note: this release is a backport containing changes originally made in `7.3.0`**

- Added an index.d.ts file for the date picker components, including `EuiDatePicker`, `EuiDatePickerRange`, and `EuiSuperDatePicker` ([#1574](https://github.com/elastic/eui/pull/1574))

## [`v6.10.3`](https://github.com/elastic/eui/releases/tag/v6.10.3)

**Note: this release is a backport containing changes originally made in `7.1.0`**

- Added `append` prop to `EuiFieldText` ([#1567](https://github.com/elastic/eui/pull/1567))

## [`v6.10.2`](https://github.com/elastic/eui/releases/tag/v6.10.2)

**Note: this release is a backport containing changes originally made in `7.1.0`**

- Adjusted set of Elastic Logos in `EuiIcon` to look better in dark mode ([#1562](https://github.com/elastic/eui/pull/1562))
- Expanded `getSecureRelForTarget` to handle elastic.co domains as a referrer whitelist ([#1565](https://github.com/elastic/eui/pull/1565))
- New `url` utility for verifying if a URL is a referrer whitelist ([#1565](https://github.com/elastic/eui/pull/1565))

## [`v6.10.1`](https://github.com/elastic/eui/releases/tag/v6.10.1)

**Note: this release is a backport containing changes originally made in `7.0.0`**

**Bug fixes**

- Fixed `EuiSuperDatePicker` crashing with negative relative value ([#1537](https://github.com/elastic/eui/pull/1537))
- Fixed `EuiSuperDatePicker` crashing with invalid start and end prop values ([#1544](https://github.com/elastic/eui/pull/1544))

## [`v6.10.0`](https://github.com/elastic/eui/releases/tag/v6.10.0)

- Adjust dark mode background color ([#1530](https://github.com/elastic/eui/pull/1530))
- TypeScript are now formatted with Prettier ([#1529](https://github.com/elastic/eui/pull/1529))
- Updated `EuiPopover` and `EuiColorPicker` to pause `EuiOutsideClickDetector` in when not open ([#1527](https://github.com/elastic/eui/pull/1527))

## [`v6.9.0`](https://github.com/elastic/eui/releases/tag/v6.9.0)

- Changed animation settings for `EuiNavDrawer` ([#1524](https://github.com/elastic/eui/pull/1524))
- Converted a number of components to support text localization ([#1504](https://github.com/elastic/eui/pull/1504))
- Updated `app_ems.svg` ([#1517](https://github.com/elastic/eui/pull/1517))

**Bug fixes**

- Updated `EuiPage` background color to match body background color ([#1513](https://github.com/elastic/eui/pull/1513))
- Fixed React key usage in `EuiPagination` ([#1514](https://github.com/elastic/eui/pull/1514))
- Fixed bug which prevented `EuiSwitch` with generated ID from having its label announced by VoiceOver ([#1519](https://github.com/elastic/eui/pull/1519))
- Fixed `EuiFilterButton` handling `numFilters` when `0` was specified ([#1510](https://github.com/elastic/eui/pull/1510))

## [`v6.8.0`](https://github.com/elastic/eui/releases/tag/v6.8.0)

- Changed `flex-basis` value on `EuiPageBody` for better cross-browser support ([#1497](https://github.com/elastic/eui/pull/1497))
- Converted a number of components to support text localization ([#1450](https://github.com/elastic/eui/pull/1450))
- Added a seconds option to the refresh interval selection in `EuiSuperDatePicker`  ([#1503](https://github.com/elastic/eui/pull/1503))
- Changed to conditionally render `EuiModalBody` if `EuiConfirmModal` has no `children` ([#1500](https://github.com/elastic/eui/pull/1500))


**Bug fixes**

- Remove `font-features` setting on `@euiFont` mixin to prevent breaks in ACE editor ([#1505](https://github.com/elastic/eui/pull/1505))

## [`v6.7.4`](https://github.com/elastic/eui/releases/tag/v6.7.4)

- Added `textAlign` property to TypeScript definition for `EuiText` ([#1487](https://github.com/elastic/eui/pull/1487))
- Added missing `'m'` option for text `size` for `EuiText`'s TypeScript definition ([#1487](https://github.com/elastic/eui/pull/1487))
- Added missing TypeScript definition for `EuiTextAlign` ([#1487](https://github.com/elastic/eui/pull/1487))

**Bug fixes**

- Fixed popover & tooltip positioning to properly account for arrow buffer ([#1490](https://github.com/elastic/eui/pull/1490))
- Fixed `EuiSuperDatePicker` unexpectedly closing start and end date popovers ([#1494](https://github.com/elastic/eui/pull/1494))

## [`v6.7.3`](https://github.com/elastic/eui/releases/tag/v6.7.3)

- `EuiHeader` no longer reduces height at mobile sizes ([#1480](https://github.com/elastic/eui/pull/1480))

**Bug fixes**

- Fixed `EuiSuperDatePicker` not updating derived `isInvalid` state on prop update ([#1483](https://github.com/elastic/eui/pull/1483))
- Fixed `logoAPM` ([#1489](https://github.com/elastic/eui/pull/1489))
- Remove Typescript type and interface definitions from ES and CJS exports ([#1486](https://github.com/elastic/eui/pull/1486))

## [`v6.7.2`](https://github.com/elastic/eui/releases/tag/v6.7.2)

- Default light theme now comes with an empty light variables file to make theme switching easier ([#1479](https://github.com/elastic/eui/pull/1479))

**Bug fixes**

- `EuiSuperDatePicker` always trigger `onTimeChange` when time changes and prop `showUpdateButton` is false ([#1477](https://github.com/elastic/eui/pull/1477))
- Fixed font rendering in italics only in Safari ([#1481](https://github.com/elastic/eui/pull/1481))

## [`v6.7.1`](https://github.com/elastic/eui/releases/tag/v6.7.1)

**Bug fixes**

- Fixed an issue with font family inheritance by changing the CSS reset ([#1474](https://github.com/elastic/eui/pull/1474))

## [`v6.7.0`](https://github.com/elastic/eui/releases/tag/v6.7.0)

- Added `z-index` to `EuiProgress` and example usage with `EuiHeader` ([#1471](https://github.com/elastic/eui/pull/1471))
- Added a new app icon for Code ([#1467](https://github.com/elastic/eui/pull/1467))
- Re-added EuiI18n, EuiI18nNumber, and EuiContext for localization ([#1466](https://github.com/elastic/eui/pull/1466))
- Expose `EuiSuperUpdateButton` component from `EuiSuperDatePicker` ([#1470](https://github.com/elastic/eui/pull/1470))
- Set `type="button"` on accordion buttons ([#1468](https://github.com/elastic/eui/pull/1468))

**Bug fixes**

- Fixed `EuiSuperDatePicker` not updating derived `showPrettyDuration` state on prop update ([#1464](https://github.com/elastic/eui/pull/1464))
- Fixed `EuiSuperDatePicker` not passing `refreshInterval` to callback when refresh interval start/stop toggle button clicked ([#1464](https://github.com/elastic/eui/pull/1464))
- Fixed `EuiSuperDatePicker` `refreshInterval` input not allowing decimals ([#1464](https://github.com/elastic/eui/pull/1464))

## [`v6.6.0`](https://github.com/elastic/eui/releases/tag/v6.6.0)

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

## [`v6.5.1`](https://github.com/elastic/eui/releases/tag/v6.5.1)

**Reverts**

- Reverts EuiI18n commit from previous release ([#1453](https://github.com/elastic/eui/pull/1453))

## [`v6.5.0`](https://github.com/elastic/eui/releases/tag/v6.5.0)

**Note: this contains some i18n work that we reverted in the next release. Use the patch release above instead**

- Added Inter UI to the font family stack ([#1402](https://github.com/elastic/eui/pull/1402))
- Changed padding on `EuiHeaderLogo` and updated `EuiNavDrawer` example ([#1448](https://github.com/elastic/eui/pull/1448))
- Updated `EuiNavDrawer` docs example and adjusted `EuiHeaderLogo` padding ([#1449](https://github.com/elastic/eui/pull/1449))
- Added EuiI18n, EuiI18nNumber, and EuiContext for localization ([#1404](https://github.com/elastic/eui/pull/1404))

**Bug fixes**

- Added `legend` for accessibility of `EuiButtonGroup` and fixed opacity of disabled input ([#1444](https://github.com/elastic/eui/pull/1444))

## [`v6.4.0`](https://github.com/elastic/eui/releases/tag/v6.4.0)

- Added `EuiNavDrawer` side nav component ([#1427](https://github.com/elastic/eui/pull/1427))
- Added `inputRef` prop to `EuiComboBox` ([#1433](https://github.com/elastic/eui/pull/1433))
- Added custom date string formatting for series charts crosshair overlay ([#1429](https://github.com/elastic/eui/pull/1429))
- Added new icons for `symlink` and `submodule` ([#1439](https://github.com/elastic/eui/pull/1439))

**Bug fixes**

- Fix mouse interaction with `EuiComboBox` in IE11 ([#1437](https://github.com/elastic/eui/pull/1437))

## [`v6.3.1`](https://github.com/elastic/eui/releases/tag/v6.3.1)

**Bug fixes**

- Downgraded `@types/react` and `@types/prop-types` versions to align with Kibana ([#1435](https://github.com/elastic/eui/pull/1435))

## [`v6.3.0`](https://github.com/elastic/eui/releases/tag/v6.3.0)

- Added `onBlur` prop to `EuiComboBox` ([#1400](https://github.com/elastic/eui/pull/1400))
- Added `initialFocus` prop typedefs to `EuiModal` and `EuiPopover` ([#1410](https://github.com/elastic/eui/pull/1410))
- Updated `gisApp` icon ([#1413](https://github.com/elastic/eui/pull/1413))
- Added `isAutoRefreshOnly` prop to `EuiSuperDatePicker` ([#1412](https://github.com/elastic/eui/pull/1412))
- Migrate remaining files in `accessibility/` to TS ([#1408](https://github.com/elastic/eui/pull/1408))
- Added `titleProps` and `descriptionProps` to `EuiDescriptionList` ([#1419](https://github.com/elastic/eui/pull/1419))
- Propagate `className` on `EuiCodeBlock` in fullscreen mode ([#1422](https://github.com/elastic/eui/pull/1422))
- Added `iconProps` prop to `EuiIconTip` ([#1420](https://github.com/elastic/eui/pull/1420))
- Added ability to pass `isDisabled` to individual `EuiButtonGroup` items ([#1424](https://github.com/elastic/eui/pull/1424))
- Changed `EuiRange` PropType for `value` to allow `number` (in addition to `string`) ([#1421](hhttps://github.com/elastic/eui/pull/1421))

**Bug fixes**

- Support extended characters (e.g. non-latin, unicode) in `EuiSearchBar` and `EuiQuery` ([#1415](https://github.com/elastic/eui/pull/1415))
- Fixed line-heights of the differently sized `EuiDescriptionList` alternates ([#1419](https://github.com/elastic/eui/pull/1419))
- Updated `EuiIconTip` TS definitions to inherit those from `EuiToolTip` as well ([#1420](https://github.com/elastic/eui/pull/1420))

## [`v6.2.0`](https://github.com/elastic/eui/releases/tag/v6.2.0)

- Added `logoCodesandbox` and updated `apmApp` icons ([#1407](https://github.com/elastic/eui/pull/1407))
- Changed `EuiListGroup` PropType for `extraAction` to remove console warning ([#1405](hhttps://github.com/elastic/eui/pull/1405))

**Bug fixes**

- Account for `min` attribute when determining `EuiRange` input width ([#1406](https://github.com/elastic/eui/pull/1406))

## [`v6.1.0`](https://github.com/elastic/eui/releases/tag/v6.1.0)

- Added `EuiListGroup` and `EuiListGroupItem` components ([#1377](https://github.com/elastic/eui/pull/1377))
- Convert the other of the services to TypeScript ([#1392](https://github.com/elastic/eui/pull/1392))
- Changed single selection to select existing option in the list ([#1391](https://github.com/elastic/eui/pull/1391))
- Added `showUpdateButton` prop to `EuiSuperDatePicker` ([#1399](https://github.com/elastic/eui/pull/1399))
