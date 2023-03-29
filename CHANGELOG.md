## [`76.4.0`](https://github.com/elastic/eui/tree/v76.4.0)

**CSS-in-JS conversions**

- Converted `EuiKeyPadMenu` (Menu component only) to Emotion ([#6636](https://github.com/elastic/eui/pull/6636))

## [`76.3.0`](https://github.com/elastic/eui/tree/v76.3.0)

- Updated `EuiSkipLink`'s `fallbackDestination` prop to support an array of query selector strings ([#6646](https://github.com/elastic/eui/pull/6646))

**Bug fixes**

- Fixed `EuiFlyout` to preserve body scrollbar width on open ([#6645](https://github.com/elastic/eui/pull/6645))
- Fixed `EuiImage`'s full screen mode to not scroll jump & to preserve body scrollbar width on open ([#6645](https://github.com/elastic/eui/pull/6645))
- Fixed `EuiCodeBlock`'s full screen mode to not scroll jump & to preserve body scrollbar width on open ([#6645](https://github.com/elastic/eui/pull/6645))

## [`76.2.0`](https://github.com/elastic/eui/tree/v76.2.0)

- Added new `renderCustomGridBody` escape hatch rendering prop to `EuiDataGrid` ([#6624](https://github.com/elastic/eui/pull/6624))

**Bug fixes**

- Fixed visual listbox focus ring bug on non-searchable `EuiSelectable`s ([#6637](https://github.com/elastic/eui/pull/6637))
- Added a legacy `alert` alias for the `warning` `EuiIcon` type ([#6640](https://github.com/elastic/eui/pull/6640))
- Fixed a type definition incorrectly coming from a dev dependency, which was causing issues for some consuming projects ([#6643](https://github.com/elastic/eui/pull/6643))

## [`76.1.0`](https://github.com/elastic/eui/tree/v76.1.0)

- Added more detailed screen reader instructions to `EuiSelectable`, `EuiSuggest`, `EuiSelectableTemplateSitewide`, `EuiRange`, and `EuiDualRange`. ([#6589](https://github.com/elastic/eui/pull/6589))
- Added new `placeholder` prop to `EuiSuperSelect` ([#6630](https://github.com/elastic/eui/pull/6630))
- Added new `setCellPopoverProps` parameter callback to `EuiDataGrid`'s `renderCellPopover` prop ([#6632](https://github.com/elastic/eui/pull/6632))

**Bug fixes**

- Fixed an ARIA attribute in `EuiSelectableList` ([#6589](https://github.com/elastic/eui/pull/6589))
- Fixed `EuiSelectable` to no longer show active selection state or respond to the Up/Down arrow keys when focus is inside the selectable container, but not on the searchbox or listbox. ([#6631](https://github.com/elastic/eui/pull/6631))

## [`76.0.1`](https://github.com/elastic/eui/tree/v76.0.1)

**Bug fixes**

- Fixed broken icons on all `isInvalid` form controls ([#6629](https://github.com/elastic/eui/pull/6629))

## [`76.0.0`](https://github.com/elastic/eui/tree/v76.0.0)

- Added `pivot` glyph to `EuiIcon` ([#6605](https://github.com/elastic/eui/pull/6605))
- Added the `displayHeaderCellProps` API to `EuiDataGrid`'s columns, which allows passing custom props directly to column header cells ([#6609](https://github.com/elastic/eui/pull/6609))
- Added the new `headerCellProps`/`footerCellProps` APIs to `EuiDataGrid`'s control columns, which allows passing custom props directly to control column header or footer cells ([#6609](https://github.com/elastic/eui/pull/6609))
- Added a new `footerCellRender` API to `EuiDataGrid`'s control columns, which allows completely customizing control column rendering (previously rendered an empty cell) ([#6609](https://github.com/elastic/eui/pull/6609))
- Updated the styling of nested ordered lists in `EuiText` to align with GitHub's list style, which is a popular format used in Markdown or MDX formatting ([#6615](https://github.com/elastic/eui/pull/6615))
- Added a margin-bottom property exclusively to the direct child `ul` and `ol` elements of the `EuiText` component ([#6615](https://github.com/elastic/eui/pull/6615))
- Fix issue with badges appearing within an `EuiBadgeGroup`, where the CSS rule to override the `margin-inline-start` was not being applied correctly due to the order of appearance in the CSS rules ([#6618](https://github.com/elastic/eui/pull/6618))

**Bug fixes**

- Fixed `EuiDataGrid` footer control columns rendering with cell expansion popovers when they should not have been ([#6609](https://github.com/elastic/eui/pull/6609))
- Fixed an `EuiSkipLink` bug where main content loading in progressively/dynamically after the skip link rendered was not being correctly focused ([#6613](https://github.com/elastic/eui/pull/6613))

**Breaking changes**

- Renamed `EuiIcon`'s `alert` to `warning` ([#6608](https://github.com/elastic/eui/pull/6608))
- Removed `EuiIcon`'s `crossInACircleFilled` in favor of `error` ([#6608](https://github.com/elastic/eui/pull/6608))

## [`75.1.2`](https://github.com/elastic/eui/tree/v75.1.2)

**Bug fixes**

- Fixed bug in `EuiPopover` where multiple filter `drop-shadow()` were causing inner shadows in Safari ([#6604](https://github.com/elastic/eui/pull/6604))

## [`75.1.1`](https://github.com/elastic/eui/tree/v75.1.1)

- Updated `EuiCodeBlock` annotation popovers to have an anchor position of `downLeft` ([#6600](https://github.com/elastic/eui/pull/6600))

**Bug fixes**

- (Documentation only) Fixed a negative lookbehind regex causing our docs to crash when viewed in Safari ([#6603](https://github.com/elastic/eui/pull/6603))

## [`75.1.0`](https://github.com/elastic/eui/tree/v75.1.0)

- Added padding to `EuiStep` title to better align with icon ([#6555](https://github.com/elastic/eui/pull/6555))
- Added a new `lineNumbers.annotations` API to `EuiCodeBlock`. This new feature displays an informational icon next to the specified line number(s), providing more context via popover ([#6580](https://github.com/elastic/eui/pull/6580))

**Bug fixes**

- Fixed bug in `EuiRange` where styles were applied incorrectly when custom ticks were passed but `showTicks` were false ([#6588](https://github.com/elastic/eui/pull/6588))
- Fixed `fleetApp` and `agentApp` icons that were swapped ([#6590](https://github.com/elastic/eui/pull/6590))

**CSS-in-JS conversions**

- Converted `EuiSteps` to Emotion; Removed `$euiStepStatusColorsToFade`, `$euiStepNumberSize`, `$euiStepNumberSmallSize`, and `$euiStepNumberMargin` ([#6555](https://github.com/elastic/eui/pull/6555))

## [`75.0.0`](https://github.com/elastic/eui/tree/v75.0.0)

- `EuiFlyout`s now automatically shard all fixed `EuiHeader`s on the page. This means that interactions (mouse & keyboard) with items inside `EuiHeader`s when flyouts are open will no longer trigger focus fighting ([#6566](https://github.com/elastic/eui/pull/6566))
- `EuiFlyout`s now read out detailed screen reader dialog instructions and hints on open ([#6566](https://github.com/elastic/eui/pull/6566))

**Bug fixes**

- Fixed `EuiSelectable` options with incorrect `aria-posinset` indices when rendered with group labels not at the start of the array ([#6571](https://github.com/elastic/eui/pull/6571))
- Fixed a bug with `EuiSearchBar` where filters with `multiSelect: false` were not able to select a new option when an option was already selected ([#6577](https://github.com/elastic/eui/pull/6577))

**Breaking changes**

- Removed the ability to customize the `role` prop of `EuiFlyout`s. `EuiFlyout`s should always be dialog roles for screen reader consistency. ([#6566](https://github.com/elastic/eui/pull/6566))
- Removed `closeButtonAriaLabel` prop from `EuiFlyout` - use `closeButtonProps['aria-label']` instead ([#6566](https://github.com/elastic/eui/pull/6566))

## [`74.1.0`](https://github.com/elastic/eui/tree/v74.1.0)

- Added new `EuiSkeletonText`, `EuiSkeletonTitle`, `EuiSkeletonCircle`, and `EuiSkeletonRectangle` components ([#6502](https://github.com/elastic/eui/pull/6502))
- Updated `EuiSuperSelect` screen reader instructions to be more specific ([#6549](https://github.com/elastic/eui/pull/6549))
- Added `error` and updated `alert` glyphs to `EuiIcon` ([#6550](https://github.com/elastic/eui/pull/6550))
- All `EuiSkeleton` components now accept an `isLoading` flag and `children`, which automatically handles conditionally rendering loading skeletons vs.  loaded content (`children`) ([#6562](https://github.com/elastic/eui/pull/6562))
- All `EuiSkeleton` components now accept a `contentAriaLabel` prop, which more meaningfully describes the loaded content to screen readers ([#6562](https://github.com/elastic/eui/pull/6562))
- Updated `EuiPopover` screen reader instructions for mobile and click behaviors ([#6567](https://github.com/elastic/eui/pull/6567))

**Bug fixes**

- Fixed `EuiCard` to ensure `onClick` method only runs once when `title` contains a React node ([#6551](https://github.com/elastic/eui/pull/6551))

**Deprecations**

- Deprecated `EuiLoadingContent` - use `EuiSkeletonText` instead ([#6557](https://github.com/elastic/eui/pull/6557))

## [`74.0.1`](https://github.com/elastic/eui/tree/v74.0.1)

**Bug fixes**

- Fixed `EuiModalHeaderTitle` type errors when passed `EuiTitle` props ([#6547](https://github.com/elastic/eui/pull/6547))

## [`74.0.0`](https://github.com/elastic/eui/tree/v74.0.0)

- Added the `component` prop to `EuiModalHeaderTitle`, which allows overriding the default `h1` tag ([#6530](https://github.com/elastic/eui/pull/6530))
- Added the `titleProps` prop to `EuiConfirmModal`, which allows overriding the default `h1` tag ([#6530](https://github.com/elastic/eui/pull/6530))

**Bug fixes**

- Fixed slight row height jumping in `EuiBasicTable`s when actions with tooltips became disabled ([#6538](https://github.com/elastic/eui/pull/6538))

**Breaking changes**

- `EuiModalHeaderTitle` now **always** wraps its children in a `h1` tag (previously attempted to conditionally detect whether its children were raw strings or not). To change this tag type to, e.g. a more generic `div`, use  the new `component` prop. ([#6530](https://github.com/elastic/eui/pull/6530))
- `EuiLink` now applies `rel="noreferrer"` to all domains, including `elastic.co` ([#6535](https://github.com/elastic/eui/pull/6535))
- `EuiBasicTable` no longer blocks mouse/keyboard interactions while `loading` ([#6543](https://github.com/elastic/eui/pull/6543))

**CSS-in-JS conversions**

- Converted `EuiBasicTable` to Emotion ([#6539](https://github.com/elastic/eui/pull/6539))
- Added a new `RenderWithEuiTheme` render prop utility ([#6539](https://github.com/elastic/eui/pull/6539))

## [`73.0.0`](https://github.com/elastic/eui/tree/v73.0.0)

**Bug fixes**

- Fixed `EuiDataGrid` a11y errors within toolbar popovers containing draggable elements with interactive children ([#6517](https://github.com/elastic/eui/pull/6517))
- Fixed several styling bugs within `EuiDataGrid`'s sorting toolbar popover ([#6517](https://github.com/elastic/eui/pull/6517))

**Breaking changes**

- `EuiToolTip`s now internally enforce only showing **one** tooltip at a time (the most recently triggered tooltip). This primarily affects scenarios where users are focused on a tooltip toggle via click, and then hover onto another tooltip toggle. ([#6520](https://github.com/elastic/eui/pull/6520))

## [`72.2.0`](https://github.com/elastic/eui/tree/v72.2.0)

- Added `onFullScreen` callback to expose the `isFullScreen` state of the `EuiImage` ([#6504](https://github.com/elastic/eui/pull/6504))
- Added an extra spacing between the title and subtitle to `EuiTour` ([#6512](https://github.com/elastic/eui/pull/6512))
- Updated `EuiText.blockquote` styles to match the `EuiMarkdownFormat.blockquote` styles ([#6514](https://github.com/elastic/eui/pull/6514))
- Added the `repositionOnScroll` prop to `EuiToolTip` ([#6515](https://github.com/elastic/eui/pull/6515))

## [`72.1.0`](https://github.com/elastic/eui/tree/v72.1.0)

- Changed design of empty ranges in `EuiColorStops` to have diagonal gray stripes instead of a solid light gray color ([#6489](https://github.com/elastic/eui/pull/6489))
- Changed popover in `EuiColorStops` to not appear when dragging/moving a color stop ([#6489](https://github.com/elastic/eui/pull/6489))
- `EuiPopover` now supports overriding `focusTrapProps.onClickOutside`, which allows customization of auto-close behavior on outside click. ([#6500](https://github.com/elastic/eui/pull/6500))

**CSS-in-JS conversions**

- Converted `EuiColorStops` to Emotion ([#6489](https://github.com/elastic/eui/pull/6489))
- Added `brighten` service to manipulate CSS-in-JS colors ([#6489](https://github.com/elastic/eui/pull/6489))

## [`72.0.0`](https://github.com/elastic/eui/tree/v72.0.0)

- Added the `customQuickSelectRender` render prop to `EuiSuperDatePicker`, which allows customizing the Quick Select popover ([#6382](https://github.com/elastic/eui/pull/6382))
- `EuiFilePicker` styles have been updated to look more like an interactive element. ([#6479](https://github.com/elastic/eui/pull/6479))
- Added a third argument to `EuiSelectable`'s `onChange` callback. The single `option` object that triggered the `onChange` event is now also passed to consumers with its most recent `checked` state ([#6487](https://github.com/elastic/eui/pull/6487))

**Bug fixes**

- `EuiTabs` now passes `size` and `expand` to all children using a React context provider. ([#6478](https://github.com/elastic/eui/pull/6478))
- Fixed security warnings caused by `trim@0.0.1` sub-dependency ([#6482](https://github.com/elastic/eui/pull/6482))

**Breaking changes**

- Removed `size` and `expand` props from `EuiTab` ([#6478](https://github.com/elastic/eui/pull/6478))

## [`71.1.0`](https://github.com/elastic/eui/tree/v71.1.0)

**Deprecations**

- Renamed `EuiPageSideBarProps` to `EuiPageSideBarProps_Deprecated`, to reduce usage/confusion with `EuiPageSidebar` ([#6468](https://github.com/elastic/eui/pull/6468))

## [`71.0.0`](https://github.com/elastic/eui/tree/v71.0.0)

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

## [`70.4.0`](https://github.com/elastic/eui/tree/v70.4.0)

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

## [`70.3.0`](https://github.com/elastic/eui/tree/v70.3.0)

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

## [`70.2.0`](https://github.com/elastic/eui/tree/v70.2.0)

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

## [`70.1.0`](https://github.com/elastic/eui/tree/v70.1.0)

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

## [`70.0.0`](https://github.com/elastic/eui/tree/v70.0.0)

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

## [`69.0.0`](https://github.com/elastic/eui/tree/v69.0.0)

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

## [`68.0.0`](https://github.com/elastic/eui/tree/v68.0.0)

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

## [`67.1.2`](https://github.com/elastic/eui/tree/v67.1.2)

**Bug fixes**

- Fixed `EuiFlyout` not correctly merging passed `css` ([#6248](https://github.com/elastic/eui/pull/6248))
- Fixed `EuiNotificationEvent` not correctly merging passed `className`s ([#6248](https://github.com/elastic/eui/pull/6248))
- Fixed `EuiAvatar` to no longer mutate the object passed to its `style` prop ([#6251](https://github.com/elastic/eui/pull/6251))

## [`67.1.1`](https://github.com/elastic/eui/tree/v67.1.1)

**Bug fixes**

- Fixed `EuiDataGrid`'s broken fullscreen mode when nested within an `EuiAccordion` ([#6235](https://github.com/elastic/eui/pull/6235))
- Fixed `EuiPageSection` not correctly merging `contentProps.css` ([#6239](https://github.com/elastic/eui/pull/6239))
- Fixed `EuiPageHeaderContent` not correctly merging passed `className`s ([#6239](https://github.com/elastic/eui/pull/6239))
- Fixed `EuiAccordion` not correctly merging `buttonProps.css` and `arrowProps.css` ([#6239](https://github.com/elastic/eui/pull/6239))
- Fixed `EuiProgress` not correctly merging `labelProps.css` ([#6239](https://github.com/elastic/eui/pull/6239))
- Fixed `EuiImage` not correctly merging `wrapperProps.css` ([#6239](https://github.com/elastic/eui/pull/6239))

**CSS-in-JS conversions**

- Converted `EuiFlyout` to Emotion; Removed `$euiFlyoutBorder` and `$euiFlyoutPaddingModifiers` ([#6213](https://github.com/elastic/eui/pull/6213))

## [`67.1.0`](https://github.com/elastic/eui/tree/v67.1.0)

- Added an optional dev-mode check to log, warn, or error if a component is rendered outside of `EuiProvider` ([#6216](https://github.com/elastic/eui/pull/6216))
- Updated `EuiBadge`'s disabled styling to match `EuiButton` ([#6224](https://github.com/elastic/eui/pull/6224))
- Added the `custom_component` search filter type for the EuiSearchBar. This new type gives the consumer control to render the search filter dropdown. ([#6226](https://github.com/elastic/eui/pull/6226))

**Bug fixes**

- Fixed `Query.toESQuery()` to generate bool queries instead of relying on match query logic, to work with non-text fields ([#6220](https://github.com/elastic/eui/pull/6220))
- Fixed `EuiInMemoryTable`'s internal state tracking to include changes of `sorting.sort` values ([#6228](https://github.com/elastic/eui/pull/6228))
- Fixed bug in `EuiButton` where `iconSize` was not being applied ([#6230](https://github.com/elastic/eui/pull/6230))

**CSS-in-JS conversions**

- Converted `EuiBadge` to Emotion ([#6224](https://github.com/elastic/eui/pull/6224))

## [`67.0.0`](https://github.com/elastic/eui/tree/v67.0.0)

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

## [`66.0.0`](https://github.com/elastic/eui/tree/v66.0.0)

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

## [`65.0.2`](https://github.com/elastic/eui/tree/v65.0.2)

**Bug fixes**

- Fixed missing `EuiDataGrid` cell popover shadows in Safari ([#6163](https://github.com/elastic/eui/pull/6163))
- Fixed a bug in some development environments which prevented `EuiIcon` from loading icons asynchronously ([#6166](https://github.com/elastic/eui/pull/6166))
- Updated the build process to include json files, fixing imports from the @elastic/eui package ([#6172](https://github.com/elastic/eui/pull/6172))

## [`65.0.1`](https://github.com/elastic/eui/tree/v65.0.1)

**Note: this version contains a bug preventing its usage, fixed in `65.0.2`**

**Bug fixes**

- Fixed the text size of `EuiDescriptionListTitle` when `EuiDescriptionList` is compressed ([#6160](https://github.com/elastic/eui/pull/6160))

## [`65.0.0`](https://github.com/elastic/eui/tree/v65.0.0)

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

## [`64.0.5`](https://github.com/elastic/eui/tree/v64.0.5)

**Note: this release is a backport containing changes originally made in `67.1.0`, `67.1.1`, and `67.1.2`**

**Bug fixes**

- Fixed `EuiInMemoryTable`'s internal state tracking to include changes of `sorting.sort` values ([#6228](https://github.com/elastic/eui/pull/6228))
- Fixed `EuiDataGrid`'s broken fullscreen mode when nested within an `EuiAccordion` ([#6235](https://github.com/elastic/eui/pull/6235))
- Fixed `EuiAvatar` to no longer mutate the object passed to its `style` prop ([#6251](https://github.com/elastic/eui/pull/6251))

## [`64.0.4`](https://github.com/elastic/eui/tree/v64.0.4)

**Note: this release is a backport containing changes originally made in `67.2.0`**

- Added the `custom_component` search filter type for the EuiSearchBar. This new type gives the consumer control to render the search filter dropdown. ([#6226](https://github.com/elastic/eui/pull/6226))

**Bug fixes**

- Fixed `EuiPageSection` not correctly merging `contentProps.css` ([#6239](https://github.com/elastic/eui/pull/6239))
- Fixed `EuiPageHeaderContent` not correctly merging passed `className`s ([#6239](https://github.com/elastic/eui/pull/6239))
- Fixed `EuiAccordion` not correctly merging `buttonProps.css` and `arrowProps.css` ([#6239](https://github.com/elastic/eui/pull/6239))
- Fixed `EuiProgress` not correctly merging `labelProps.css` ([#6239](https://github.com/elastic/eui/pull/6239))
- Fixed `EuiImage` not correctly merging `wrapperProps.css` ([#6239](https://github.com/elastic/eui/pull/6239))

## [`64.0.3`](https://github.com/elastic/eui/tree/v64.0.3)

**Note: this release is a backport containing changes originally made in `66.0.0`**

**Bug fixes**

- Updated the `EuiHeaderSectionItem` to not render if empty ([#6158](https://github.com/elastic/eui/pull/6158))

## [`64.0.2`](https://github.com/elastic/eui/tree/v64.0.2)

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

## [`64.0.1`](https://github.com/elastic/eui/tree/v64.0.1)

**Bug fixes**

- Fixed `CollapsedItemActions` ref callback not accounting for `null` value ([#6145](https://github.com/elastic/eui/pull/6145))

**CSS-in-JS conversions**

- Added `logicalCSSWithFallback()` utility for logical properties without full browser support ([#6124](https://github.com/elastic/eui/pull/6124))
- Converted `euiFullHeight()` Sass mixin to Emotion  ([#6124](https://github.com/elastic/eui/pull/6124))
- Converted all global CSS utility classes to Emotion ([#6124](https://github.com/elastic/eui/pull/6124))

## [`64.0.0`](https://github.com/elastic/eui/tree/v64.0.0)

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

## [`63.0.6`](https://github.com/elastic/eui/tree/v63.0.6)

**Note: this release is a backport containing changes originally made in `66.1.0`**

- Added a new `component` prop to `EuiPageSection`, allowing overriding of the default `section` tag ([#6192](https://github.com/elastic/eui/pull/6192))

**Deprecations**

- Added `@deprecated` flags to `EuiPageContent_Deprecated`, `EuiPageContentBody_Deprecated`, `EuiPageContentHeader_Deprecated`, `EuiPageContentHeaderSection_Deprecated`, `EuiPageSideBar_Deprecated` and `EuiPageTemplate_Deprecated`, which will provide helpful hints to IDEs that support jsdoc flags. Consumers will have until August 2023 to migrate from these deprecated components. ([#6194](https://github.com/elastic/eui/pull/6194))

## [`63.0.5`](https://github.com/elastic/eui/tree/v63.0.5)

**Note: this release is a backport containing changes originally made in `64.0.0`**

**Bug fixes**

- Fixed missing `data-fixed-headers` property in some layout configurations using `EuiPageTemplate`. ([#6140](https://github.com/elastic/eui/pull/6140))
- Fixed an `EuiPageSidebar` bug where inline styles were not correctly updating ([#6191](https://github.com/elastic/eui/pull/6191))

## [`63.0.4`](https://github.com/elastic/eui/tree/v63.0.4)

**Note: this release is a backport containing changes originally made in `65.0.1`**

**Bug fixes**

- Fixed the text size of `EuiDescriptionListTitle` when `EuiDescriptionList` is compressed ([#6160](https://github.com/elastic/eui/pull/6160))

## [`63.0.3`](https://github.com/elastic/eui/tree/v63.0.3)

**Note: this release is a backport containing changes originally made in `64.0.1`**

**Bug fixes**

- Fixed `CollapsedItemActions` ref callback not accounting for `null` value ([#6145](https://github.com/elastic/eui/pull/6145))

## [`63.0.2`](https://github.com/elastic/eui/tree/v63.0.2)

**Note: this release is a backport containing changes originally made in `64.0.0`**

**Bug fixes**

- Fixed `eui.d.ts` containing `@testing-library` type definitions ([#6142](https://github.com/elastic/eui/pull/6142))

## [`63.0.1`](https://github.com/elastic/eui/tree/v63.0.1)

**Bug fixes**

- Fixed server-side rendering and test-env errors caused by `useCurrentEuiBreakpoint` ([#6117](https://github.com/elastic/eui/pull/6117))

## [`63.0.0`](https://github.com/elastic/eui/tree/v63.0.0)

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

## [`62.2.4`](https://github.com/elastic/eui/tree/v62.2.4)

**Note: this release is a backport containing changes originally made in `65.0.1`**

**Bug fixes**

- Fixed the text size of `EuiDescriptionListTitle` when `EuiDescriptionList` is compressed ([#6160](https://github.com/elastic/eui/pull/6160))

## [`62.2.3`](https://github.com/elastic/eui/tree/v62.2.3)

**Note: this release is a backport containing changes originally made in `64.0.1`**

**Bug fixes**

- Fixed `CollapsedItemActions` ref callback not accounting for `null` value ([#6145](https://github.com/elastic/eui/pull/6145))

## [`62.2.2`](https://github.com/elastic/eui/tree/v62.2.2)

**Note: this release is a backport containing changes originally made in `64.0.0`**

**Bug fixes**

- Fixed `eui.d.ts` containing `@testing-library` type definitions ([#6142](https://github.com/elastic/eui/pull/6142))

## [`62.2.1`](https://github.com/elastic/eui/tree/v62.2.1)

**Note: this release is a backport containing changes originally made in `63.0.1`**

**Bug fixes**

- Fixed server-side rendering and test-env errors caused by `useCurrentEuiBreakpoint` ([#6117](https://github.com/elastic/eui/pull/6117))

## [`62.2.0`](https://github.com/elastic/eui/tree/v62.2.0)

- The `EuiDataGrid`'s `rowHeightOptions` now contain an optional `scrollAnchorRow` property, which enables vertical layout shift compensation when rendering `auto`-sized rows. ([#6070](https://github.com/elastic/eui/pull/6070))
- Added new React Testing Library EuiToolTip helpers, `waitForEuiToolTipVisible` and `waitForEuiToolTipClose` ([#6106](https://github.com/elastic/eui/pull/6106))

**Bug fixes**

- Fixed EuiPortal changes causing rerender issues in test environments ([#6105](https://github.com/elastic/eui/pull/6105))

## [`62.1.0`](https://github.com/elastic/eui/tree/v62.1.0)

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

## [`62.0.3`](https://github.com/elastic/eui/tree/v62.0.3)

**Bug fixes**

- Fixed EuiPortal changes causing rerender issues in test environments ([#6105](https://github.com/elastic/eui/pull/6105))

## [`62.0.2`](https://github.com/elastic/eui/tree/v62.0.2)

- Added new React Testing Library `ByDataTestSubj` utilities for targeting EUI's `data-test-subj` attributes. These can be accessed by importing custom RTL `render` and `screen` utils from `@elastic/eui/lib/test/rtl`. ([#6091](https://github.com/elastic/eui/pull/6091))
- Added new React Testing Library EuiPopover helpers, `waitForEuiPopoverOpen` and `waitForEuiPopoverClose` ([#6091](https://github.com/elastic/eui/pull/6091))

**Bug fixes**

- Restored non-Emotion classNames to `EuiCommentEvent`'s children ([#6089](https://github.com/elastic/eui/pull/6089))

## [`62.0.1`](https://github.com/elastic/eui/tree/v62.0.1)

**Bug fixes**

- Fixed a bug preventing `EuiPortal` from working in server-side rendering ([#6055](https://github.com/elastic/eui/pull/6055))
- Fixed an `EuiFilterButton` accessibility error ([#6076](https://github.com/elastic/eui/pull/6076))
- Fixed `EuiImage` rendering empty captions  ([#6081](https://github.com/elastic/eui/pull/6081))
- Fixed `EuiImage` not respecting `text-align` on parents ([#6081](https://github.com/elastic/eui/pull/6081))

## [`62.0.0`](https://github.com/elastic/eui/tree/v62.0.0)

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

## [`61.0.0`](https://github.com/elastic/eui/tree/v61.0.0)

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

## [`60.3.0`](https://github.com/elastic/eui/tree/v60.3.0)

- `EuiDataGrid`'s imperative API now exposes the `scrollTo` and `scrollToItem` APIs of `react-window`. ([#6042](https://github.com/elastic/eui/pull/6042))

**Bug fixes**

- Fixed drag and drop interactions on EuiAccordion elements ([#6031](https://github.com/elastic/eui/pull/6031))
- Fixed `EuiDataGrid`'s row count/indices announced to screen readers when virtualized ([#6033](https://github.com/elastic/eui/pull/6033))
- Fixed `EuiDataGrid`'s current cell row/column position announced to screen readers when sorted and paginated, and also improved column identification and announcement cadence ([#6033](https://github.com/elastic/eui/pull/6033))
- Fixed `EuiContextMenuPanelDescriptor`'s `width` prop type to correctly reflect that it allows all CSS width values, not just numbers ([#6043](https://github.com/elastic/eui/pull/6043))
- Fixed `EuiSelectable` onChange keyboard events not being correctly passed back on React v16 ([#6045](https://github.com/elastic/eui/pull/6045))

## [`60.2.0`](https://github.com/elastic/eui/tree/v60.2.0)

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

## [`60.1.2`](https://github.com/elastic/eui/tree/v60.1.2)

**Bug fixes**

- Fixed EuiSelectable's `onChange` callback not passing back a persisted event on React 16 ([#6026](https://github.com/elastic/eui/pull/6026))
- Fixed `EuiText` not correctly inheriting `className`s when both the `color` and `textAlign` props were passed ([#6027](https://github.com/elastic/eui/pull/6027))

## [`60.1.1`](https://github.com/elastic/eui/tree/v60.1.1)

**Bug fixes**

Fixed issue with `EuiPanel` where the `Emotion` styles were not being passed when it was rendered as a button ([#6010](https://github.com/elastic/eui/pull/6010))

## [`60.1.0`](https://github.com/elastic/eui/tree/v60.1.0)

- Added `focusRegionOnTextChange` prop to `EuiScreenReaderLive` ([#5995](https://github.com/elastic/eui/pull/5995))
- Enhanced `EuiSkipLink`'s `overrideLinkBehavior` scroll and focus UX ([#5996](https://github.com/elastic/eui/pull/5996))

**Bug fixes**

- Fixed `EuiAccordion` props type not being correctly inferred ([#5974](https://github.com/elastic/eui/pull/5974))

**CSS-in-JS conversions**

- Converted `EuiScreenReaderOnly` to Emotion ([#5846](https://github.com/elastic/eui/pull/5846))
- Converted `EuiIcon` to Emotion; removed `$euiIconLoadingOpacity`, `$euiIconColors`, and `$euiIconSizes` ([#5967](https://github.com/elastic/eui/pull/5967))
- Converted `EuiProgress` to Emotion and removed `$euiProgressColors` and `$euiProgressSizes` ([#5986](https://github.com/elastic/eui/pull/5986))

## [`60.0.0`](https://github.com/elastic/eui/tree/v60.0.0)

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

## [`59.1.0`](https://github.com/elastic/eui/tree/v59.1.0)

- Added new `color` prop to `EuiLoadingSpinner` ([#5878](https://github.com/elastic/eui/pull/5878))
- Added the `overrideLinkBehavior` prop to `EuiSkipLink` for applications that use hash routers ([#5957](https://github.com/elastic/eui/pull/5957))

**Bug fixes**

- Fixed `EuiSelectableMessage` flex layout when containing multiple children nodes ([#5966](https://github.com/elastic/eui/pull/5966))
- Fixed export location of JS based shadow mixins ([#5970](https://github.com/elastic/eui/pull/5970))

**CSS-in-JS**

- Converted `EuiFacetGroup` and `EuiFacetButton` to Emotion and removed `$euiFacetGutterSizes` ([#5878](https://github.com/elastic/eui/pull/5878))

## [`59.0.1`](https://github.com/elastic/eui/tree/v59.0.1)

**Bug fixes**

- Fixed custom styles from being overridden in `EuiText` and `EuiTextColor` ([#5960](https://github.com/elastic/eui/pull/5960))
- Fixed `EuiCallOut` from consuming all available vertical height with `flex-grow` ([#5963](https://github.com/elastic/eui/pull/5963))

## [`59.0.0`](https://github.com/elastic/eui/tree/v59.0.0)

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

## [`58.1.1`](https://github.com/elastic/eui/tree/v58.1.1)

**Bug fixes**

- Fixed `EuiPopover` padding by reverting removal of `EuiPanel` padding classes ([#5927](https://github.com/elastic/eui/pull/5927))
- Updated `EuiAccordion` to show loading spinner instead of extra actions when `isLoading` ([#5896](https://github.com/elastic/eui/pull/5896))

## [`58.1.0`](https://github.com/elastic/eui/tree/v58.1.0)

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

## [`58.0.0`](https://github.com/elastic/eui/tree/v58.0.0)

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

## [`57.0.0`](https://github.com/elastic/eui/tree/v57.0.0)

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

## [`56.0.0`](https://github.com/elastic/eui/tree/v56.0.0)

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

## [`55.1.4`](https://github.com/elastic/eui/tree/v55.1.4)

**Note: this release is a backport containing changes originally made in `58.1.0`**

**Bug fixes**

- Fixed `EuiMark`'s screen reader helpers causing scroll issues in Chrome ([#5921](https://github.com/elastic/eui/pull/5921))

**CSS-in-JS conversions**

- Renamed `euiScreenReaderOnlyStyles()` mixin to `euiScreenReaderOnly()` ([#5921](https://github.com/elastic/eui/pull/5921))

## [`55.1.3`](https://github.com/elastic/eui/tree/v55.1.3)

**Note: this release is a backport containing changes originally made in `58.0.0`**

**Bug fixes**

- Fixed `EuiContextMenuPanel` (when used within an `EuiPopover`) to correctly return focus to its popover toggle in all scenarios, not just keyboard Escape press ([#5880](https://github.com/elastic/eui/pull/5880))

**Breaking changes**

- Removed `watchedItemProps` from `EuiContextMenuPanel`, which now updates like a standard component and no longer needs this logic ([#5880](https://github.com/elastic/eui/pull/5880))

## [`55.1.2`](https://github.com/elastic/eui/tree/v55.1.2)

**Note: this release is a backport containing changes originally made in `57.0.0`**

- Updated `EuiOverlayMask` to accept a React ref ([#5876](https://github.com/elastic/eui/pull/5876))

**Bug fixes**

- Fixed `EuiFlyout` `outsideClickCloses` not being scoped to overlay mask when `ownFocus=true` ([#5876](https://github.com/elastic/eui/pull/5876))

## [`55.1.1`](https://github.com/elastic/eui/tree/v55.1.1)

**Note: this release is a backport containing changes originally made in `56.0.0`**

- Added the `focusTrapProps` prop to `EuiFlyout` to aid outside click detection and closing event ([#5860](https://github.com/elastic/eui/pull/5860))

## [`55.1.0`](https://github.com/elastic/eui/tree/v55.1.0)

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

## [`55.0.1`](https://github.com/elastic/eui/tree/v55.0.1)

**Bug fixes**

- Fixed missing Sass variable file import ([#5820](https://github.com/elastic/eui/pull/5820))

## [`55.0.0`](https://github.com/elastic/eui/tree/v55.0.0)

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

## [`54.1.0`](https://github.com/elastic/eui/tree/v54.1.0)

- Added `EuiTimeline` component ([#5730](https://github.com/elastic/eui/pull/5730))
- Added a `"subdued"` color option to `EuiAvatar` ([#5730](https://github.com/elastic/eui/pull/5730))
- Added internationalized screen reader helpers to `EuiMark` ([#5739](https://github.com/elastic/eui/pull/5739))
- Added `casesApp` feature icon type to `EuiIcon` ([#5779](https://github.com/elastic/eui/pull/5779))

**Bug fixes**

- Fixed keyboard focus being stranded on `EuiContextMenu` popover close ([#5760](https://github.com/elastic/eui/pull/5760))
- Fixed bug in `EuiEmptyPrompt` where a `min-height` was unnecessarily being applied for vertical layouts ([#5763](https://github.com/elastic/eui/pull/5763))

## [`54.0.0`](https://github.com/elastic/eui/tree/v54.0.0)

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

## [`53.0.2`](https://github.com/elastic/eui/tree/v53.0.2)

**Note: this release is a backport containing changes originally made in `55.0.0`**

**Bug fixes**

- Fixed an `EuiDataGrid` bug occurring when closing cell popovers on clicking the originating cell. The original fix was unintentionally affecting cell popovers with nested modals, popovers, etc. ([#5797](https://github.com/elastic/eui/pull/5797))

## [`53.0.1`](https://github.com/elastic/eui/tree/v53.0.1)

**Bug fixes**

- Fixed `EuiContext.i18n`'s `mappingFunc` not being called for `EuiI18n`s with multiple tokens or function callbacks ([#5748](https://github.com/elastic/eui/pull/5748))
- Fixed poor rendering performance of `EuiIcon` when using a custom data URI `type` ([#5751](https://github.com/elastic/eui/pull/5751))

## [`53.0.0`](https://github.com/elastic/eui/tree/v53.0.0)

- Added all remaining missing i18n tokens for `EuiSuperDatePicker` ([#5743](https://github.com/elastic/eui/pull/5743))

**Breaking changes**

- Removed `prettyDuration` utility exported by `EuiSuperDatePicker` - this util was converted to a `PrettyDuration` component and `usePrettyDuration` hook which should be used instead ([#5743](https://github.com/elastic/eui/pull/5743))
- Removed `commonDurationRanges` exported by `EuiSuperDatePicker`. The new pretty duration utils will fall back to `commonDurationRanges` by default if no `quickRanges` are passed ([#5743](https://github.com/elastic/eui/pull/5743))

## [`52.2.0`](https://github.com/elastic/eui/tree/v52.2.0)

- Added `branchUser`, `desktop` and `sessionViewer` glyphs to `EuiIcon` ([#5740](https://github.com/elastic/eui/pull/5740))

## [`52.1.0`](https://github.com/elastic/eui/tree/v52.1.0)

- Added `anchor` prop to `EuiTourStep` to allow for DOM selector attachment ([#5696](https://github.com/elastic/eui/pull/5696))
- `EuiDataGrid` now forces `isExpandable` to be true if any `cellActions` are passed, as keyboard users are otherwise unable to access cell actions without the expansion popover ([#5710](https://github.com/elastic/eui/pull/5710))

**Bug fixes**

- Fixed EuiDataGrid not rerendering correctly on row heights change ([#5712](https://github.com/elastic/eui/pull/5712))
- Fixed `EuiContextMenu` requiring two tab keypresses to advance to the next focusable menu item ([#5719](https://github.com/elastic/eui/pull/5719))
- Fixed `EuiDataGrid` footer cell focus bugging out after moving its column ([#5720](https://github.com/elastic/eui/pull/5720))

## [`52.0.0`](https://github.com/elastic/eui/tree/v52.0.0)

- Added `editorChecklist` glyph to `EuiIcon` ([#5705](https://github.com/elastic/eui/pull/5705))
- Updated `testenv` mock for `EuiIcon` to render `aria-label` as text ([#5709](https://github.com/elastic/eui/pull/5709))
- Added `compressed` prop to `EuiFilterGroup` and reduced the size of the `EuiFilterButton` notification badge ([#5717](https://github.com/elastic/eui/pull/5717))
- Increased contrast of `EuiSelectableTemplateSitewide` input text when in dark header ([#5724](https://github.com/elastic/eui/pull/5724))

**Breaking changes**

- Removed Legacy theme including compiled CSS ([#5688](https://github.com/elastic/eui/pull/5688))
- Removed `flush` and `size` props in `EuiFilterButtonProps` ([#5717](https://github.com/elastic/eui/pull/5717))

**CSS-in-JS conversions**

- Converted `EuiMark` to CSS-in-JS styling ([#4575](https://github.com/elastic/eui/pull/4575))

## [`51.1.0`](https://github.com/elastic/eui/tree/v51.1.0)

- Updated `testenv` mock for `EuiFlyout` to include default `aria-label` on the close button ([#5702](https://github.com/elastic/eui/pull/5702))
- Changed the I18n token `euiDataGridToolbar.fullScreenButton` to `euiFullscreenSelector.fullscreenButton`, and its text to `Enter fullscreen` (with no space) ([#5680](https://github.com/elastic/eui/pull/5680))
- Changed the I18n token `euiDataGridToolbar.fullScreenButtonActive` to `euiFullscreenSelector.fullscreenButtonActive`, and its text to `Exit fullscreen` (with no space) ([#5680](https://github.com/elastic/eui/pull/5680))

**Bug fixes**

- Fixed type of `SharedRenderCellElementProps.schema` to be optional ([#5704](https://github.com/elastic/eui/pull/5704))
- Fixed generated type definition file referencing nonexistant Jest util ([#5704](https://github.com/elastic/eui/pull/5704))

## [`51.0.0`](https://github.com/elastic/eui/tree/v51.0.0)

- Enhanced `EuiSuggest` to fire the `onItemClick` callback on Enter key press as well as clicks ([#5693](https://github.com/elastic/eui/pull/5693))

**Bug fixes**

- Fixed non-searchable `EuiSelectable`s not selecting items with the Enter & Space keys ([#5693](https://github.com/elastic/eui/pull/5693))

**Breaking changes**

- Removed the `'all'` option in `EuiTablePagination.itemsPerPage` and `itemsPerPageOptions` in `EuiBasicTable` and `EuiDataGrid` due to Typescript issues. Use `0` instead to represent a "Show all" option ([#5699](https://github.com/elastic/eui/issues/5699))

## [`50.0.0`](https://github.com/elastic/eui/tree/v50.0.0)

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

## [`49.0.0`](https://github.com/elastic/eui/tree/v49.0.0)

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

## [`48.1.1`](https://github.com/elastic/eui/tree/v48.1.1)

- Added a `data-test-subj` attribute to `EuiDataGrid` cell expansion buttons ([#5643](https://github.com/elastic/eui/pull/5643))
- Added a `data-test-selected` attribute to `EuiSelectable` list options ([#5643](https://github.com/elastic/eui/pull/5643))

## [`48.1.0`](https://github.com/elastic/eui/tree/v48.1.0)

- Improved `EuiSelectable` keypress scenarios ([#5613](https://github.com/elastic/eui/pull/5613))
- Converted `FieldValueSelectionFilter` in `EuiSearchBar` to use `EuiSelectable` ([#5387](https://github.com/elastic/eui/issues/5387))
- Added `lineDashed`, `lineDotted`, and `lineSolid` glyphs to `EuiIcon` ([#5633](https://github.com/elastic/eui/pull/5633))
- Updated `colorMode` return type in theme context utilities ([#5639](https://github.com/elastic/eui/issues/5639))

## [`48.0.0`](https://github.com/elastic/eui/tree/v48.0.0)

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

## [`47.0.0`](https://github.com/elastic/eui/tree/v47.0.0)

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

## [`46.2.0`](https://github.com/elastic/eui/tree/v46.2.0)

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

## [`46.1.1`](https://github.com/elastic/eui/tree/v46.1.1)

**Note: this release is a backport containing changes originally made in `46.2.0`**

**Bug fixes**

- Fixed `EuiDataGrid` height issue when in full-screen mode and with scrolling content ([#5557](https://github.com/elastic/eui/pull/5557))
- Fixed a focus bug in `EuiDataGrid` when clicking another cell header with an already-open cell header popover ([#5556](https://github.com/elastic/eui/pull/5556))
- Fixed `EuiDataGrid` to always focus back into the grid on pagination ([#5587](https://github.com/elastic/eui/pull/5587))
- Fixed `EuiDataGrid` and `EuiTable` pagination potentially rendering out view on narrow tables with many pages ([#5561](https://github.com/elastic/eui/pull/5561))

## [`46.1.0`](https://github.com/elastic/eui/tree/v46.1.0)

- Added `sun` glyph to `EuiIcon` ([#5548](https://github.com/elastic/eui/pull/5548))
- Updated styles in `EuiDescriptionList` of `type` inline ([#5534](https://github.com/elastic/eui/pull/5534))

## [`46.0.0`](https://github.com/elastic/eui/tree/v46.0.0)

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

## [`45.0.0`](https://github.com/elastic/eui/tree/v45.0.0)

- Added virtulized rendering option to `EuiSelectableList` with `isVirtualized` ([#5521](https://github.com/elastic/eui/pull/5521))
- Added expanded option properties to `EuiSelectableOption` with `data` ([#5521](https://github.com/elastic/eui/pull/5521))

**Bug fixes**

- Fixed multiple bugs with `EuiDataGrid` keyboard focus restoration ([#5530](https://github.com/elastic/eui/pull/5530))
- Fixed `EuiDataGrid`'s display toolbar control to update initial UI state when developer `gridStyle` or `rowHeightsOptions` props are updated ([#5525](https://github.com/elastic/eui/pull/5525))

**Breaking changes**

- Changed `EuiSearchBar` to preserve phrases with leading and trailing spaces, instead of dropping surrounding whitespace ([#5514](https://github.com/elastic/eui/pull/5514))
- Removed `data-test-subj="dataGridWrapper"`  from `EuiDataGrid` in favor of `data-test-subj="euiDataGridBody"` ([#5506](https://github.com/elastic/eui/pull/5506))

## [`44.0.0`](https://github.com/elastic/eui/tree/v44.0.0)

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

## [`43.1.1`](https://github.com/elastic/eui/tree/v43.1.1)

**Bug fixes**

- Fixed `EuiDataGrid`'s cell popover overlapping with modals and flyouts ([#5461](https://github.com/elastic/eui/pull/5461))
- Fixed an accessibility issue where `EuiDatePicker` time options did not have unique IDs ([#5466](https://github.com/elastic/eui/pull/5466))
- Fixed global and reset styles when using the legacy theme ([#5473](https://github.com/elastic/eui/pull/5473))
- Fixed `EuiSuperDatePicker` not passing `isDisabled` to `EuiAutoRefresh` ([#5472](https://github.com/elastic/eui/pull/5472))

## [`43.1.0`](https://github.com/elastic/eui/tree/v43.1.0)

- Added `magnifyWithExclamation` icon ([#5455](https://github.com/elastic/eui/pull/5455))

**Bug fixes**

- Reinstated `EuiCode` and `EuiCodeBlock` `testenv` mocking ([#5464](https://github.com/elastic/eui/pull/5464))

## [`43.0.0`](https://github.com/elastic/eui/tree/v43.0.0)

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

## [`42.1.0`](https://github.com/elastic/eui/tree/v42.1.0)

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

## [`42.0.0`](https://github.com/elastic/eui/tree/v42.0.0)

### Feature: CSS-in-JS ([#5121](https://github.com/elastic/eui/pull/5121))

- Added reset and global styles via CSS-in-JS with `@emotion/react/Global`
- Added `EuiProvider`, a React context provider for theming and global styles
- Added `isDefaultTheme` and `isLegacyTheme` utilities

**Breaking changes**

- Added `@emotion/react` to `peerDependencies`
- Amsterdam is now the default theme, deprecated and renamed old theme as "legacy"
- Re-organized Sass files including where the `globals` are imported from

## [`41.4.0`](https://github.com/elastic/eui/tree/v41.4.0)

- Added `payment` glyph to `EuiIcon` ([#5414](https://github.com/elastic/eui/pull/5414))
- Updated `EuiCodeBlock`'s full screen mode to use the `fullScreenExit` icon ([#5421](https://github.com/elastic/eui/pull/5421))

**Bug fixes**

- Fixed an `EuiCodeBlock` bug where empty code blocks could be copyable ([#5421](https://github.com/elastic/eui/pull/5421))
- Fixed an accessibility issue in `EuiAvatar` by adding a meaningful role ([#5423](https://github.com/elastic/eui/pull/5423))

## [`41.3.0`](https://github.com/elastic/eui/tree/v41.3.0)

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

## [`41.2.3`](https://github.com/elastic/eui/tree/v41.2.3)

**Note: this release is a backport containing changes originally made in `42.1.0`**

**Bug fixes**

- Fixed `EuiDatePicker` not correctly handling the `onBlur` callback ([#5441](https://github.com/elastic/eui/pull/5441))
- Fixed `EuiToolTip` not correctly handling child `onBlur` and `onFocus` callbacks ([#5441](https://github.com/elastic/eui/pull/5441))

## [`41.2.2`](https://github.com/elastic/eui/tree/v41.2.2)

**Bug fixes**

- Fixed type exports to not include test mocks & specs ([#5412](https://github.com/elastic/eui/pull/5412))

**Note: this release is a backport containing changes originally made in `41.3.0`**

## [`41.2.1`](https://github.com/elastic/eui/tree/v41.2.1)

**Bug fixes**

- Refactored definition of `isNamedColor` function so it isn't mocked away by the testenv configuration ([#5397](https://github.com/elastic/eui/pull/5397))

**Note: this release is a backport containing changes originally made in `14.6.0` and `14.7.0`**

## [`41.2.0`](https://github.com/elastic/eui/tree/v41.2.0)

- Added `aria-label` and `aria-labelledby` props to `EuiComboBox` ([#5360](https://github.com/elastic/eui/issues/5360))
- Updated `EuiDatePicker` to use `EuiPopover`, `EuiFocusTrap`, and `EuiScreenReaderOnly` ([#5339](https://github.com/elastic/eui/pull/5339))

**Bug fixes**

- Fixed an `EuiDataGrid` row height bug for grids that set a default `lineCount` and also used `rowHeights` to set row-specific `lineCount`s ([#5376](https://github.com/elastic/eui/pull/5376))
- Fixed `EuiComboBox` from allowing keyboard actions when `isDisabled` ([#5373](https://github.com/elastic/eui/pull/5373))
- Fixed an accessibility issue where `EuiSuperSelect` was not creating accessible labels for its listbox ([#5364](https://github.com/elastic/eui/pull/5364))
- Fixed an accessibility issue where `EuiColorPalettePicker` was not creating an accessible label for its button ([#5364](https://github.com/elastic/eui/pull/5364))
- Fixed `EuiDatePicker` being constrained to its parent container by using React portal ([#5339](https://github.com/elastic/eui/pull/5339))

## [`41.1.0`](https://github.com/elastic/eui/tree/v41.1.0)

- Added `layout` and `footer` props to `EuiEmptyPrompt` ([#5275](https://github.com/elastic/eui/pull/5275))
- Updated `EuiEmptyPrompt` to extend `EuiPanelProps` ([#5275](https://github.com/elastic/eui/pull/5275))
- Add `data-icon-type` to `EuiIcon` `<svg>` for easier debugging of `iconType` [#5366](https://github.com/elastic/eui/pull/5366))

**Bug fixes**

- Fixed an `EuiDataGrid` race condition where grid rows had incorrect heights if loaded in before CSS ([#5284](https://github.com/elastic/eui/pull/5284))
- Fixed an accessibility issue where `EuiDataGrid` cells weren't owned by `role=row` elements ([#5285](https://github.com/elastic/eui/pull/5285))
- Fixed `EuiErrorBoundary` overflow scrolling by wrapping contents in `EuiCodeBlock` ([#5359](https://github.com/elastic/eui/pull/5359))
- Fixed `analyzeEvent` icon to be horizontally centered [#5365](https://github.com/elastic/eui/pull/5365))

## [`41.0.0`](https://github.com/elastic/eui/tree/v41.0.0)

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

## [`40.1.1`](https://github.com/elastic/eui/tree/v40.1.0)

**Note: this release is a backport containing changes originally made after `42.0.0`**

**Bug fixes**

- Fixed unremoved event listener memory leak in `EuiPopover` ([#5437](https://github.com/elastic/eui/pull/5437))

## [`40.1.0`](https://github.com/elastic/eui/tree/v40.1.0)

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

## [`40.0.0`](https://github.com/elastic/eui/tree/v40.0.0)

- Updated `tokenKeyword` to match the definition of keyword field type ([#5251](https://github.com/elastic/eui/pull/5251))
- Added `element`, `buttonElement`, and `arrowProps` props to further customize `EuiAccordion` ([#5258](https://github.com/elastic/eui/pull/5258))

**Bug fixes**

- Fixed missing `id` for `EuiCombobox` by generating one if `prepend` or `append` exists ([#5229](https://github.com/elastic/eui/pull/5229))

**Breaking changes**

- Renamed `tokenKeyword` icon to `tokenTag` in `EuiToken` ([#5251](https://github.com/elastic/eui/pull/5251))

## [`39.1.4`](https://github.com/elastic/eui/tree/v39.1.4)

**Note: this release is a backport containing changes originally made in `44.0.0`**

**Deprecations**

- Deprecated `PartitionConfig` in favor of inclusion in Charts `theme.partition` ([#5492](https://github.com/elastic/eui/pull/5492)).

## [`39.1.3`](https://github.com/elastic/eui/tree/v39.1.2)

**Note: this release is a backport containing changes originally made after `42.0.0`**

**Bug fixes**

- Fixed unremoved event listener memory leak in `EuiPopover` ([#5437](https://github.com/elastic/eui/pull/5437))

## [`39.1.2`](https://github.com/elastic/eui/tree/v39.1.2)

**Note: this release is a backport containing changes originally made in `40.1.0`**

**Bug fixes**

- Fixed `EuiDataGrid` to dynamically update row heights when set to `auto` ([#5281](https://github.com/elastic/eui/pull/5281))

## [`39.1.1`](https://github.com/elastic/eui/tree/v39.1.1)

**Bug fixes**

- Fixed `EuiSuperDatePicker` from crashing due to invalid time input ([#5263](https://github.com/elastic/eui/pull/5263))
- Fixed content in `EuiFilterButton` again when `numFilters` is undefined ([#5268](https://github.com/elastic/eui/pull/5268))

## [`39.1.0`](https://github.com/elastic/eui/tree/v39.1.0)

- Added support for `ghost` and `text` `EuiIcon` colors on Elastic logos ([#5245](https://github.com/elastic/eui/pull/5245))
- Added a default `data-test-subj` to `EuiErrorBoundary` ([#5232](https://github.com/elastic/eui/pull/5232))

**Bug fixes**

- Fixed content in `EuiPopover` from being inaccessible during the opening animation ([#5249](https://github.com/elastic/eui/pull/5249))
- Fixed multiple accessibility issues in `EuiBasicTable` and `EuiInMemoryTable` ([#5241](https://github.com/elastic/eui/pull/5241))

## [`39.0.0`](https://github.com/elastic/eui/tree/v39.0.0)

- Added `maxWidth` prop to `EuiTour`, made `subtitle` optional, and fixed heading levels and footer background ([#5225](https://github.com/elastic/eui/pull/5225))
- Updated `tint`, `shade`, `saturate`, `desaturate`, and `makeHighContrastColor` utility functions to maintain color format supplied ([#5230](https://github.com/elastic/eui/pull/5230))
- Converted generated icon files to Typescript, eliminating the last `.js` files in our source files ([#5212](https://github.com/elastic/eui/pull/5212))

**Bug fixes**

- Fixed tick and level alignment in `Eui[Dual]Range` ([#5181](https://github.com/elastic/eui/pull/5181))
- Fixed duplicate IDs on mobile/desktop select all checkboxes in EuiBasicTable ([#5237](https://github.com/elastic/eui/pull/5237))
- Fixed missing i18n token in `EuiBasicTable`'s no items message ([#5242](https://github.com/elastic/eui/pull/5242))

**Breaking changes**

- Removed `boolean` from `EuiTour`'s `minWidth` type ([#5225](https://github.com/elastic/eui/pull/5225))

## [`38.2.0`](https://github.com/elastic/eui/tree/v38.2.0)

- Updated `EuiRangeLevel` `color` property to accept CSS color values ([#5171](https://github.com/elastic/eui/pull/5171))
- Added optional visual line highlighting to `EuiCodeBlock` ([#5207](https://github.com/elastic/eui/pull/5207))
- Added `popoverProps` to `EuiSuperSelect` and deprecated `popoverClassName` & `repositionOnScroll` ([#5214](https://github.com/elastic/eui/pull/5214))
- Added `lineHeight` configuration to `rowHeightsOptions` in `EuiDataGrid` ([#5221](https://github.com/elastic/eui/pull/5221))

**Bug fixes**

- Fixed logo icons with static SVG IDs causing accessibility errors when multiples of the same logo were present ([#5204](https://github.com/elastic/eui/pull/5204))
- Fixed several `EuiDataGrid` console errors that occur on column drag/drop reorder ([#5209](https://github.com/elastic/eui/pull/5209))

**Reverts**

- Reverted `EuiScreenReaderOnly` left positioning change due to Selenium issues ([#5215](https://github.com/elastic/eui/pull/5215))

## [`38.1.0`](https://github.com/elastic/eui/tree/v38.1.0)

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

## [`38.0.1`](https://github.com/elastic/eui/tree/v38.0.1)

- Reverted `EuiScreenReaderOnly` left positioning change due to Selenium issues ([#5215](https://github.com/elastic/eui/pull/5215))

## [`38.0.0`](https://github.com/elastic/eui/tree/v38.0.0)

- Added optional line numbers to `EuiCodeBlock` ([#4993](https://github.com/elastic/eui/pull/4993))
- Removed `emoticon` support and removed rendered `<div>` from `EuiMarkdownFormat` ([#5176](https://github.com/elastic/eui/pull/5176))
- Moved `EuiCheckbox` and `EuiRadio` inputs to always float inline on top of the faux inputs ([#5152](https://github.com/elastic/eui/pull/5152))

**Bug fixes**

- Fixed `EuiDataGrid` stripes not alternating as expected on sort/pagination ([#5070](https://github.com/elastic/eui/pull/5070))

**Breaking changes**

- Upgraded TypeScript version to ~4.1.3 ([#5182](https://github.com/elastic/eui/pull/5182))
- Added `clip` property to `EuiScreenReaderOnly`, to fix positioning issues within scrolling containers ([#5152](https://github.com/elastic/eui/pull/5152))

## [`37.7.0`](https://github.com/elastic/eui/tree/v37.7.0)

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

## [`37.6.2`](https://github.com/elastic/eui/tree/v37.6.2)

**Reverts**

- Reverted `EuiScreenReaderOnly` clip property ([#5150](https://github.com/elastic/eui/pull/5150))

## [`37.6.1`](https://github.com/elastic/eui/tree/v37.6.1)

**Bug fixes**

- **[REVERTED in 37.6.2]** Fixed `EuiScreenReaderOnly` positioning issues within scrolling containers ([#5130](https://github.com/elastic/eui/pull/5130))
- Fixed `EuiDataGrid` cell actions not unmounting from the DOM after mouse interaction ([#5120](https://github.com/elastic/eui/pull/5120))
- Optimized `EuiDataGrid` cell interactions' performance  ([#5136](https://github.com/elastic/eui/pull/5136))

## [`37.6.0`](https://github.com/elastic/eui/tree/v37.6.0)

- Updated `EuiSuperDatePicker` to pass a `data-test-subj` prop ([#5085](https://github.com/elastic/eui/pull/5085))
- Added `euiTextBreakWord()` mixin to the `euiTitle()` mixin to ensure all titles break long words ([#5107](https://github.com/elastic/eui/pull/5107))
- Added `euiTextBreakWord()` to `EuiFormLabels` ([#5107](https://github.com/elastic/eui/pull/5107))

**Bug fixes**

- Fixed `EuiSuperSelect`'s focus keyboard behavior when no initial value is passed, and focus label behavior ([#5097](https://github.com/elastic/eui/pull/5097))
- Fixed `EuiSelectable` sometimes requiring two clicks to change selection ([#5117](https://github.com/elastic/eui/pull/5117))

## [`37.5.0`](https://github.com/elastic/eui/tree/v37.5.0)

### Feature: CSS-in-JS ([#4511](https://github.com/elastic/eui/pull/4511))

- Added `EuiThemeProvider`, a React context provider for theme values and color mode selection
- Added `useEuiTheme` React hook, and `withEuiTheme` React HOC for consuming the EuiTheme
- Added global `EuiTheme` tokens for `colors`, `size`, `font`, `border`, `animation`, and `breakpoint`
- Added color services for `makeHighContrastColor`, `makeDisabledContrastColor`, `shade`, `tint`, `transparentize`, `saturate`, `desaturate`, `lightness`

## [`37.4.0`](https://github.com/elastic/eui/tree/v37.4.0)

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

## [`37.3.1`](https://github.com/elastic/eui/tree/v37.3.1)

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

## [`37.3.0`](https://github.com/elastic/eui/tree/v37.3.0)

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

## [`37.2.0`](https://github.com/elastic/eui/tree/v37.2.0)

- Added `isDisabled` prop to `EuiFormLabel` and passed it down from `EuiFormRow` ([#5009](https://github.com/elastic/eui/pull/#5009))

**Bug fixes**

- Fixed usage of `outsideClickCloses` prop of `EuiFlyout` ([#4986](https://github.com/elastic/eui/pull/4986))
- Fixed `EuiFormRow` ignoring `isDisabled` prop on the child element. ([#5022](https://github.com/elastic/eui/pull/5022))

## [`37.1.4`](https://github.com/elastic/eui/tree/v37.1.4)

**Note: this release is a backport containing changes originally made in `37.7.0`**

**Bug fixes**

- Fixed [de]optimization bug in `EuiDataGrid` when cells are removed from the DOM via virtualization ([#5163](https://github.com/elastic/eui/pull/5163))

## [`37.1.3`](https://github.com/elastic/eui/tree/v37.1.3)

**Note: this release is a backport containing changes originally made in `37.4.0` and `37.6.1`**

**Bug fixes**

- Fixed instance of  `EuiScreenReader` text being exposed in `EuiDataGrid` sorting menu ([#5084](https://github.com/elastic/eui/pull/5084))
- Fixed screen reader text from displaying in some `EuiDataGrid` cell popovers ([#5087](https://github.com/elastic/eui/pull/5087))
- Fixed `EuiDataGrid` cell actions not unmounting from the DOM after mouse interaction ([#5120](https://github.com/elastic/eui/pull/5120))
- Optimized `EuiDataGrid` cell interactions' performance  ([#5136](https://github.com/elastic/eui/pull/5136))

## [`37.1.2`](https://github.com/elastic/eui/tree/v37.1.2)

**Note: this release is a backport containing changes originally made in `37.3.0` and `37.3.1`**

**Bug fixes**

- Fixed `EuiSelectable`'s double click bug ([#5021](https://github.com/elastic/eui/pull/5021))
- Fixed bug in `euiHeaderAffordForFixed` mixin that was not accounting for situations where `EuiDataGrid` was in full screen mode ([#5054](https://github.com/elastic/eui/pull/5054))
- Fixed `z-index` styles that were causing `EuiModal` and `EuiFlyout` components to appear behind `EuiDataGrid` when in full screen mode ([#5054](https://github.com/elastic/eui/pull/5054))

## [`37.1.1`](https://github.com/elastic/eui/tree/v37.1.1)

**Note: this release is a backport containing changes originally made in `37.2.0`**

**Bug fixes**

- Fixed `EuiFormRow` ignoring `isDisabled` prop on the child element. ([#5022](https://github.com/elastic/eui/pull/5022))

## [`37.1.0`](https://github.com/elastic/eui/tree/v37.1.0)

- Added `isDisabled` prop to `EuiFormRow` that disables the child field element ([#4908](https://github.com/elastic/eui/pull/4908

## [`37.0.0`](https://github.com/elastic/eui/tree/v37.0.0)

- Added `fleetApp` and `agentApp` icons ([#4989](https://github.com/elastic/eui/pull/4989))
- Added i18n tokens for `EuiSuperDatePicker` button `title` ([#4998](https://github.com/elastic/eui/pull/4998))

**Bug fixes**

- Fixed incorrect date formatting on `EuiSuperDatePicker` button `title` ([#4998](https://github.com/elastic/eui/pull/4998))

**Breaking changes**

- Removed `EuiKeyboardAccessible` ([#4991](https://github.com/elastic/eui/pull/4991))

## [`36.1.0`](https://github.com/elastic/eui/tree/v36.1.0)

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

## [`36.0.0`](https://github.com/elastic/eui/tree/v36.0.0)

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

## [`35.1.0`](https://github.com/elastic/eui/tree/v35.1.0)

- Improved keyboard and screen reader experience for `EuiColorPicker` ([#4886](https://github.com/elastic/eui/pull/4886))
- Changed `EuiImage` to use `ImgHTMLAttributes` type ([#4865](https://github.com/elastic/eui/pull/4865))

**Bug fixes**

- Fixed focus bug in `EuiColorPicker` which allowed user to break out of focus lock ([#4886](https://github.com/elastic/eui/pull/4886))

## [`35.0.0`](https://github.com/elastic/eui/tree/v35.0.0)

**Breaking changes**

- Changed EUI license from Apache v2 to dual-licensed Elastic v2 and Server Side Public License, v 1 ([#4930](https://github.com/elastic/eui/pull/4930))

## [`34.6.0`](https://github.com/elastic/eui/tree/v34.6.0)

- Updated `EuiContextMenuPanelDescriptor`'s `title` prop type from `string` to `ReactNode` ([#4933](https://github.com/elastic/eui/pull/4933))
- Added `EuiTokensObject` type definition to allow enforcing i18n token coverage in consuming applications ([#4927](https://github.com/elastic/eui/issues/4927))
- Added `rowHeightsOptions` to `EuiDataGrid` to allow configuring row heights ([#4853](https://github.com/elastic/eui/pull/4853))


## [`34.5.3`](https://github.com/elastic/eui/tree/v34.5.3)

**Note: this release is a backport containing changes originally made in `37.3.0`**

**Bug fixes**

- Fixed `EuiSelectable`'s double click bug ([#5021](https://github.com/elastic/eui/pull/5021))

## [`34.5.2`](https://github.com/elastic/eui/tree/v34.5.2)

**Bug fixes**

- Fixed incorrect active filter count badge when `EuiSearchBar` is initialized with a query value ([#4928](https://github.com/elastic/eui/issues/4928))
- Fixed a render-blocking error in `EuiCodeBlock` when certain HTML tags are childless ([#4929](https://github.com/elastic/eui/issues/4929))

## [`34.5.1`](https://github.com/elastic/eui/tree/v34.5.1)

**Bug fixes**

- Fixed bug in `EuiColorStops` where the outline was flashing when clicking or adding stops in Safari ([#4900](https://github.com/elastic/eui/issues/4900))
- Fixed `showIcons` prop in `EuiSelectableListItem` ([#4920](https://github.com/elastic/eui/pull/4920))
- Changed `mobileBreakpoints` prop to optional `EuiSideNav` ([#4921](https://github.com/elastic/eui/pull/4921))

## [`34.5.0`](https://github.com/elastic/eui/tree/v34.5.0)

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

## [`34.4.0`](https://github.com/elastic/eui/tree/v34.4.0)

- Added draggable highlight area to `EuiDualRange` ([#4776](https://github.com/elastic/eui/pull/4776))

**Bug fixes**

- Fixed auto scrolling on update in `EuiComboBox` ([#4879](https://github.com/elastic/eui/pull/4879))

## [`34.3.0`](https://github.com/elastic/eui/tree/v34.3.0)

- Added `testenv` mock for `EuiFlyout` ([#4858](https://github.com/elastic/eui/pull/4858))
- Added `mobile` glyph to `EuiIcon` ([#4827](https://github.com/elastic/eui/pull/4827))
- Reduced display of arrow icon in `EuiSideNav` to only if the item is **not** linked but has children ([#4827](https://github.com/elastic/eui/pull/4827))
- Increased size and prominence of mobile toggle in `EuiSideNav` ([#4827](https://github.com/elastic/eui/pull/4827))
- Added `heading`, `headingProps`, and `mobileBreakpoints` props for better accessibility to `EuiSideNav` ([#4827](https://github.com/elastic/eui/pull/4827))

**Bug fixes**

- Fixed mobile menus styles on `EuiDataGrid` ([#4844](https://github.com/elastic/eui/pull/4844))

**Theme: Amsterdam**

- Decreased spacing and root element size of `EuiSideNav` ([#4827](https://github.com/elastic/eui/pull/4827))

## [`34.2.0`](https://github.com/elastic/eui/tree/v34.2.0)

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

## [`34.1.0`](https://github.com/elastic/eui/tree/v34.1.0)

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

## [`34.0.0`](https://github.com/elastic/eui/tree/v34.0.0)

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

## [`33.0.0`](https://github.com/elastic/eui/tree/v33.0.0)

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

## [`32.3.0`](https://github.com/elastic/eui/tree/v32.3.0)

- Reduced icon size in `EuiButtonEmpty` of `size` xs. ([#4759](https://github.com/elastic/eui/pull/4759))

**Bug fixes**

- Fixed missing i18n tokens for `EuiFilePicker` ([#4750](https://github.com/elastic/eui/pull/4750))
- Fixed `EuiComboBox` to use correct placeholder text color ([#4744](https://github.com/elastic/eui/pull/4744))

## [`32.2.0`](https://github.com/elastic/eui/tree/v32.2.0)

- Removed `MutationObserver` fallback from `EuiResizeObserver` ([#4709](https://github.com/elastic/eui/pull/4709))

**Bug fixes**

- Fixed `EuiInMemoryTable` `pagination` prop to update visible items when changed ([#4714](https://github.com/elastic/eui/pull/4714))
- Fixed a bug in `EuiFilePicker` where the HTML input was being shown when `disabled` ([#4738](https://github.com/elastic/eui/pull/4738))
- Fixed inverted asc and desc labels for `EuiDataGrid` `datetime` schema ([#4733](https://github.com/elastic/eui/pull/4733))

## [`32.1.1`](https://github.com/elastic/eui/tree/v32.1.1)

**Note: this release is a backport containing changes originally made in `33.0.0`**

**Bug fixes**

- Fixed `initialFocus` prop functionality in `EuiPopover` ([#4768](https://github.com/elastic/eui/pull/4768))

## [`32.1.0`](https://github.com/elastic/eui/tree/v32.1.0)

- Added `readOnly` as a `sorting` option of `EuiBasicTable` and its columns ([#4626](https://github.com/elastic/eui/pull/4626))

**Bug fixes**

- Fixed a bug where on hovering an expandable row cell in `EuiDataGrid` a vertical line would show ([#4689](https://github.com/elastic/eui/pull/4689))
- Fixed a bug in `EuiDataGrid` where key presses in portalled content were being handled by the grid ([#4706](https://github.com/elastic/eui/pull/4706))
- Fixed `EuiDataGrid`'s header content arrangement prevented closing a header cell's popover ([#4706](https://github.com/elastic/eui/pull/4706))
- Fixed a performance issue in `EuiDataGrid` when its `rowCount` changes  ([#4706](https://github.com/elastic/eui/pull/4706))

## [`32.0.4`](https://github.com/elastic/eui/tree/v32.0.4)

**Bug fixes**

- Removed the restriction on `selectable` `EuiCard` with `layout="horizontal"` ([#4692](https://github.com/elastic/eui/pull/4692))

## [`32.0.3`](https://github.com/elastic/eui/tree/v32.0.3)

**Bug fixes**

- Exported `EuiAvatarProps` ([#4690](https://github.com/elastic/eui/pull/4690))
- Fixed type overrides in `EuiCard` ([#4690](https://github.com/elastic/eui/pull/4690))

## [`32.0.2`](https://github.com/elastic/eui/tree/v32.0.2)

**Bug fixes**

- Fixed `htmlIdGenerator` import path in `button_group_button.tsx` ([#4682](https://github.com/elastic/eui/pull/4682))
- Fixed `EuiColorStops` popover failing to close ([#4687](https://github.com/elastic/eui/pull/4687))

## [`32.0.1`](https://github.com/elastic/eui/tree/v32.0.1)

**Bug fixes**

- Fixed block style of `EuiPanel` when rendered as a `<button>` ([#4681](https://github.com/elastic/eui/pull/4681))

## [`32.0.0`](https://github.com/elastic/eui/tree/v32.0.0)

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

## [`31.12.0`](https://github.com/elastic/eui/tree/v31.12.0)

- Added `indexRuntime` glyph in `EuiIcon` ([#4650](https://github.com/elastic/eui/pull/4650))
- Added `iconType`, `iconColor`, and `iconSize` props to `EuiAvatar` ([#4620](https://github.com/elastic/eui/pull/4620))
- Added `'plain'` and `null` as `color` options of `EuiAvatar` ([#4620](https://github.com/elastic/eui/pull/4620))

## [`31.11.0`](https://github.com/elastic/eui/tree/v31.11.0)

- Added `EuiNotificationEvent` component ([#4513](https://github.com/elastic/eui/pull/4513))
- Added `euiAnimation()` method on the `EuiHeaderSectionItemButton` ref ([#4513](https://github.com/elastic/eui/pull/4513))
- Made `description` prop of `EuiCard` optional ([#4546](https://github.com/elastic/eui/pull/4582))

## [`31.10.0`](https://github.com/elastic/eui/tree/v31.10.0)

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

## [`31.9.1`](https://github.com/elastic/eui/tree/v31.9.1)

**Bug fixes**

- Fixed an errant export of two non-existant values ([#4597](https://github.com/elastic/eui/pull/4597))

## [`31.9.0`](https://github.com/elastic/eui/tree/v31.9.0)

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

## [`31.8.0`](https://github.com/elastic/eui/tree/v31.8.0)

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

## [`31.7.0`](https://github.com/elastic/eui/tree/v31.7.0)

- Added `whiteSpace` prop to `EuiCodeBlock` ([#4475](https://github.com/elastic/eui/pull/4475))
- Added a light background to `EuiDataGrid` and removed unnecessary height on its container ([#4509](https://github.com/elastic/eui/pull/4509))

**Bug fixes**

- Fixed bug in `EuiDataGrid` where the grid lost height when showing less rows on the last page ([#4509](https://github.com/elastic/eui/pull/4509))
- Updated `euiPaletteForStatus` color sequence to use higher contrast postive and negative colors ([#4508](https://github.com/elastic/eui/pull/4508))

## [`31.6.0`](https://github.com/elastic/eui/tree/v31.6.0)

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

## [`31.5.0`](https://github.com/elastic/eui/tree/v31.5.0)

- Added `isLoading` prop and added `EuiOverlayMask` directly to `EuiConfirmModal` ([#4421](https://github.com/elastic/eui/pull/4421))
- Added `wrapWithTableRow` to remove `<tr>` in `EuiTableHeader`([#4465](https://github.com/elastic/eui/pull/4465))

**Bug fixes**

- Fixed `id` usage throughout `EuiTreeView` to respect custom ids and stop conflicts in generated ids ([#4435](https://github.com/elastic/eui/pull/4435))
- Fixed `EuiTabs` `role` if no tabs are passed in ([#4435](https://github.com/elastic/eui/pull/4435))
- Fixed issue in `EuiDataGrid` where the horizontal scrollbar was hidden behind pagination ([#4477](https://github.com/elastic/eui/pull/4477))
- Fixed `EuiPopover` with initial `isOpen` working with `EuiOutsideClickDetector` ([#4461](https://github.com/elastic/eui/pull/4461))
- Fixed `EuiDataGridCellPopover` needing 2 state updates to close ([#4461](https://github.com/elastic/eui/pull/4461))
- Fixed `EuiBadge` with `iconOnClick` from catching form submit events ([#4479](https://github.com/elastic/eui/pull/4479))

## [`31.4.0`](https://github.com/elastic/eui/tree/v31.4.0)

- Added `getDefaultEuiMarkdownProcessingPlugins` method for better control over `EuiMarkdownEditor`'s toolbar UI ([#4383](https://github.com/elastic/eui/pull/4383))
- Changed `EuiOutsideClickDetector` events to be standard event types ([#4434](https://github.com/elastic/eui/pull/4434))
- Added `EuiFieldTextProps` in type definitions for `EuiSuggestInput` ([#4452](https://github.com/elastic/eui/pull/4452))
- Added virtualized cell rendering to `EuiDataGrid` ([#4170](https://github.com/elastic/eui/pull/4170))

**Bug fixes**

- Fixed heights of `append` and `prepend` in `EuiComboBox` ([#4410](https://github.com/elastic/eui/pull/4410))
- Fixed `EuiResizableContainer` initialization timing based on DOM readiness ([#4447](https://github.com/elastic/eui/pull/4447))

## [`31.3.0`](https://github.com/elastic/eui/tree/v31.3.0)

- Added a `size` prop to `EuiContextMenu` and added a smaller size ([#4409](https://github.com/elastic/eui/pull/4409))
- Added a `textSize` prop to `EuiHealth` ([#4420](https://github.com/elastic/eui/pull/4420))
- Removed selected item of `EuiSelect` when `hasNoInitialSelection=true` and value reset to `undefined` ([#4428](https://github.com/elastic/eui/pull/4428))

## [`31.2.0`](https://github.com/elastic/eui/tree/v31.2.0)

- Added support for adjusting `buffer` for individual window sides of `EuiPopover` ([#4417](https://github.com/elastic/eui/pull/4417))
- Added `'full'` option to the `height` prop of `EuiMarkdownEditor`. Added `autoExpandPreview` and `maxHeight` props to `EuiMarkdownEditor` ([#4245](https://github.com/elastic/eui/pull/4245))

## [`31.1.0`](https://github.com/elastic/eui/tree/v31.1.0)

- Reduced the size of the icons and clear button for compressed `EuiFormControlLayout` ([#4374](https://github.com/elastic/eui/pull/4374))
- Added ability for text input updates in `EuiDatePicker` ([#4243](https://github.com/elastic/eui/pull/4243))
- **[REVERTED in 31.3.0]** Fixed heights of `append` and `prepend` in `EuiFormControlLayout` ([#4410](https://github.com/elastic/eui/pull/4410))

**Bug fixes**

- Fixed `EuiSuperDatePicker` extra margin when `showUpdateButton` and `isAutoRefreshOnly` are active ([#4406](https://github.com/elastic/eui/pull/4406))

## [`31.0.0`](https://github.com/elastic/eui/tree/v31.0.0)

- Added collapsble behavior to `EuiResizableContainer` panels ([#3978](https://github.com/elastic/eui/pull/3978))
- Updated `EuiResizablePanel` to use `EuiPanel` ([#3978](https://github.com/elastic/eui/pull/3978))
- Changed `showTimeSelect` prop to true when `showTimeSelectOnly` prop is set to true ([#4372](https://github.com/elastic/eui/pull/4372))
- Updated `EuiSuperSelect` recently used list to render as `<ol>` and `<li>` elements ([#4370](https://github.com/elastic/eui/pull/4370))

**Bug fixes**

- Fixed `EuiSuggest` popover opening when an empty array is passed into the `suggestions` prop ([#4349](https://github.com/elastic/eui/pull/4349))

**Breaking changes**

- Removed `size` prop from `EuiResizableButton` ([#3978](https://github.com/elastic/eui/pull/3978))
- Upgraded to TypeScript v4.0 ([#4296](https://github.com/elastic/eui/pull/4296))

## [`30.6.1`](https://github.com/elastic/eui/tree/v30.6.1)

**Note: this release is a backport containing changes originally made in `31.5.0`**

**Bug fixes**

- Fixed `EuiBadge` with `iconOnClick` from catching form submit events ([#4479](https://github.com/elastic/eui/pull/4479))

## [`30.6.0`](https://github.com/elastic/eui/tree/v30.6.0)

- Adjusted the shadow in `EuiComment` ([#4321](https://github.com/elastic/eui/pull/4321))
- Added `success` and `warning` colors to `EuiButtonEmpty` ([#4325](https://github.com/elastic/eui/pull/4325))
- Added a sorting indicator on the `EuiDataGridColumn` ([#4343](https://github.com/elastic/eui/pull/4343))
- Added `disabled` and `loading` `status` to `EuiStep` ([#4338](https://github.com/elastic/eui/pull/4338))
- Added `closePopover` prop to `EuiDataGridColumnCellActionProps` ([#4346](https://github.com/elastic/eui/pull/4346))

**Bug fixes**

- Fixed `EuiErrorBoundary` error message not showing in non-Chromium browsers ([#4324](https://github.com/elastic/eui/pull/4324))
- Fixed `EuiToolTip` closing during initial positioning period ([#4327](https://github.com/elastic/eui/pull/4327))
- Added `!default` to SASS variables of `EuiCollapsibleNav` ([#4335](https://github.com/elastic/eui/pull/4335))
- Fixed `EuiDataGrid` column property `displayAsText` ([#4351](https://github.com/elastic/eui/pull/4351))
- Fixed propagation of `esc` key presses closing parent popovers ([#4336](https://github.com/elastic/eui/pull/4336))
- Fixed overwritten `isDisabled` prop on `EuiListGroupItem` `extraAction` config ([#4359](https://github.com/elastic/eui/pull/4359))
- Fixed `inputRef` for `EuiCheckbox` ([#4298](https://github.com/elastic/eui/pull/4298))
- Limited the links allowed in `EuiMarkdownEditor` to http, https, or starting with a forward slash ([#4362](https://github.com/elastic/eui/pull/4362))
- Aligned components with an `href` prop to React's practice of disallowing `javascript:` protocols ([#4362](https://github.com/elastic/eui/pull/4362))
- Fixed form submit bug in `EuiButtonGroup` by adding an optional `type` prop for `EuiButtonGroupOption` ([#4368](https://github.com/elastic/eui/pull/4368))
- Changed `label` type from `string` to `ReactNode` in `EuiTreeViewNode` ([#4352](https://github.com/elastic/eui/pull/4352))

**Theme: Amsterdam**

- Removed the shadow in `EuiComment` ([#4321](https://github.com/elastic/eui/pull/4321))
- Reduced font size for `xs` size in `EuiButtonEmpty` ([#4325](https://github.com/elastic/eui/pull/4325))
- Increased font size for `m` size of `EuiListGroupItem` ([#4340](https://github.com/elastic/eui/pull/4340))
- Reduced padding in `EuiToolTip` ([#4353](https://github.com/elastic/eui/pull/4353))
- Reduced border-radius in `EuiRange`'s tooltip ([#4353](https://github.com/elastic/eui/pull/4353))
- Consolidated `EuiStepNumber` indicators for `EuiSteps` and `EuiHorizontalSteps` ([#4338](https://github.com/elastic/eui/pull/4338))

## [`30.5.1`](https://github.com/elastic/eui/tree/v30.5.1)

- Upgraded `highlight.js` to 9.18.5 ([#4313](https://github.com/elastic/eui/pull/4313))

## [`30.5.0`](https://github.com/elastic/eui/tree/v30.5.0)

- Export `euiSelectableTemplateSitewideRenderOptions` ([#4305](https://github.com/elastic/eui/pull/4305))

**Bug fixes**

- Expose `isPreFiltered` in `EuiSelectable` props fixing consumer-side searching ([#4305](https://github.com/elastic/eui/pull/4305))
- Fixed stale state argument passed to `searchProps.onChange` in an `EuiSelectable`([#4292](https://github.com/elastic/eui/pull/4292))
- Fixed initial focus of an `EuiButtonGroup` when first item in a popover ([#4288](https://github.com/elastic/eui/pull/4288))
- Fixed visible scrollbar in `EuiComboBox` list ([#4301](https://github.com/elastic/eui/pull/4301))
- Removed hiding of time select on small screens for `EuiDatePicker` ([#4301](https://github.com/elastic/eui/pull/4301))
- Fixed wrong columns assigned to `EuiDataGrid` leadingControlColumns ([#4269](https://github.com/elastic/eui/pull/4269))

**Theme: Amsterdam**

- Fixed styles for `EuiMarkdownEditor` ([#4289](https://github.com/elastic/eui/pull/4289))
- Rounded all corners of dropdown type of inputs ([#4301](https://github.com/elastic/eui/pull/4301))

## [`30.4.2`](https://github.com/elastic/eui/tree/v30.4.2)

**Bug fixes**

- Reverted changing of `EuiPopover`s `ownFocus` default from `false` to `true` ([#4228](https://github.com/elastic/eui/pull/4228))

## [`30.4.1`](https://github.com/elastic/eui/tree/v30.4.1)

- Exported `useDataGridColumnSelector`, `useDataGridColumnSorting`, and `useDataGridStyleSelector` hooks ([#4271](https://github.com/elastic/eui/pull/4271))

**Theme: Amsterdam**

- Unify colors with the Elastic brand ([#4284](https://github.com/elastic/eui/pull/4284))
- Created one consistent look for disabled `EuiButton` ([#4284](https://github.com/elastic/eui/pull/4284))

## [`30.4.0`](https://github.com/elastic/eui/tree/v30.4.0)

- Added `eql` glyph in `EuiIcon` ([#4110](https://github.com/elastic/eui/pull/4110))
- Added `testenv` mock for `htmlIdGenerator` ([#4212](https://github.com/elastic/eui/pull/4212))
- Added several Sass mixins for handling of unified focus/hover states ([#4242](https://github.com/elastic/eui/pull/4242))

**Bug fixes**

- Fixed cell resizer overlapping of `EuiDataGrid` rightmost header cell ([#4071](https://github.com/elastic/eui/pull/4268))


**Theme: Amsterdam**

- Unify focus states by leaning into `outline` and restricting to keyboard navigation ([#4242](https://github.com/elastic/eui/pull/4242))
- Removed faux border from `EuiAvatar` ([#4255](https://github.com/elastic/eui/pull/4255))
- Changed the color and font-weight of inline code block ([#4272](https://github.com/elastic/eui/pull/4272))

## [`30.3.0`](https://github.com/elastic/eui/tree/v30.3.0)

- Added `EuiColorPaletteDisplay` component ([#3865](https://github.com/elastic/eui/pull/3865))
- Added `initialFocusedItemIndex` support to `EuiContextMenuPanelDescriptor` ([#4223](https://github.com/elastic/eui/pull/4223))
- Updated the default of the `EuiPopover`s `ownFocus` prop from `false` to `true` ([#4228](https://github.com/elastic/eui/pull/4228))
- Added `role="alert"` and `aria-live="assertive"` to `EuiForm`'s `EuiCallOut` for the errors ([#4238](https://github.com/elastic/eui/pull/4238))
- Added `menuDown` and `menuUp` glyphs to `EuiIcon` ([#4244](https://github.com/elastic/eui/pull/4244))
- Removed spacer after `childrenBetween` in `EuiInMemoryTable` ([#4248](https://github.com/elastic/eui/pull/4248))
- Changed `clickOutsideDisables` to `true` when `ownFocus={false}` in `EuiFlyout` ([#4236](https://github.com/elastic/eui/pull/4236))

**Bug fixes**

- Fixed focus trap + `EuiPopover` bug which prevented the anchor from receiving focus when the popover closes ([#4071](https://github.com/elastic/eui/pull/4071))
- Fixed focus trap error & performance impact when one focus trap is deactivated and another becomes enabled ([#4071](https://github.com/elastic/eui/pull/4071))
- Fixed a condition in `EuiInMemoryTable` to avoid mistaken assignment of `sortName` ([#4138](https://github.com/elastic/eui/pull/4138))
- Fixed bug in small `EuiImage`'s not respecting the optional sizes when `allowFullScreen` is set to true ([#4207](https://github.com/elastic/eui/pull/4207))
- Fixed incorrect initial rendering of `EuiDualRange` thumbs when element width is 0 ([#4230](https://github.com/elastic/eui/pull/4230))
- Fixed bug in `EuiSelectable` to call `searchProps.onChange` and `searchProps.onSearch` calls in `EuiSelectable` ([#4153](https://github.com/elastic/eui/pull/4153))
- Fixed truncation of the `EuiComboBox` `placeholder` text ([#4210](https://github.com/elastic/eui/pull/4210))

**Theme: Amsterdam**

- Fixed base `line-heights` for within `euiFontSize[size]()` SASS mixins ([#4229](https://github.com/elastic/eui/pull/4229))

## [`30.2.0`](https://github.com/elastic/eui/tree/v30.2.0)

- Added `labelWidth` and `descriptionDisplay` props to `EuiSuggestItem` ([#4180](https://github.com/elastic/eui/pull/4180))
- Added screen reader notification if `EuiLink` opens in a new window ([#4172](https://github.com/elastic/eui/pull/4172))
- Set `external` prop to true if `EuiLink` opens in a new window ([#4172](https://github.com/elastic/eui/pull/4172))
- Added `float` and `margin` props to `EuiImage` ([#4209](https://github.com/elastic/eui/pull/4209))
- Added `color` and `borderRadius` props to `EuiPanel` ([#4194](https://github.com/elastic/eui/pull/4194))
- Updated the use case for the `EuiPanel` prop `hasShadow` ([#4194](https://github.com/elastic/eui/pull/4194))
- Deprecated the `onClick`, `betaBadgeLabel`, `betaBadgeTooltipContent`, and `betaBadgeTitle` props of `EuiPanel` ([#4194](https://github.com/elastic/eui/pull/4194))

**Bug fixes**

- Fixed issue with `labelDisplay` not being passed to `EuiSuggestItem` ([#4180](https://github.com/elastic/eui/pull/4180))
- Fixed copy in `EuiDataGrid`'s header menu's sort actions ([#4199](https://github.com/elastic/eui/pull/4199))

**Theme: Amsterdam**

- Fixed `border-radius` in `EuiFormControlLayout` ([#4196](https://github.com/elastic/eui/pull/4196))

## [`30.1.1`](https://github.com/elastic/eui/tree/v30.1.1)

- Added more exports for `EuiInMemoryTable` types ([#4179](https://github.com/elastic/eui/pull/4179))

**Bug fixes**

- Removed unnecessary shadow on hover of `EuiButtonGroup` ([#4186](https://github.com/elastic/eui/pull/4186))
- Fixed position of `EuiScreenReaderOnly` elements within `EuiButtonGroup` ([#4189](https://github.com/elastic/eui/pull/4189))

## [`30.1.0`](https://github.com/elastic/eui/tree/v30.1.0)

- Improved `EuiButtonGroup` focus, hover, selected and disabled states ([#4142](https://github.com/elastic/eui/pull/4142))
- Added `display` prop to `EuiToolTip` for common display block needs ([#4148](https://github.com/elastic/eui/pull/4148))
- Added support for more colors in `EuiProgress` such as `vis0` through `vis9`, `warning`, `success`  and custom colors ([#4130](https://github.com/elastic/eui/pull/4130))
- Added `affordForDisplacement` prop to `EuiBottomBar` ([#4156](https://github.com/elastic/eui/pull/4156))
- Added `width` property to `mobileOptions` prop of `EuiTableRowCell` ([#4169](https://github.com/elastic/eui/issues/4169))

**Bug fixes**

- Fixed issue with duplicate checkmarks in `EuiComboBox` ([#4162](https://github.com/elastic/eui/pull/4162))
- Reinstated base element type extensions for `EuiStepHorizontal` and `EuiStepsHorizontal` ([4166](https://github.com/elastic/eui/pull/4166))

## [`30.0.0`](https://github.com/elastic/eui/tree/v30.0.0)

- Deprecated `EuiKeyboardAccessible` ([#4135](https://github.com/elastic/eui/pull/4135))
- Refactored `EuiStep`, `EuiHorizontalSteps`, and `EuiCodeEditor` for better accessibility ([#4135](https://github.com/elastic/eui/pull/4135))
- Added `minWidth` prop to `EuiButton` ([#4056](https://github.com/elastic/eui/pull/4056))
- Added `isSelected` prop to easily turn `EuiButton`, `EuiButtonEmpty`, and `EuiButtonIcon` into toggle buttons ([#4056](https://github.com/elastic/eui/pull/4056))
- Updated `EuiButtonGroup` props and render for better accessibility ([#4056](https://github.com/elastic/eui/pull/4056))
- Added `paddingSize` prop to `EuiPopoverTitle` and `EuiPopoverFooter` ([#4133](https://github.com/elastic/eui/pull/4133))
- Added more exports for `EuiBasicTable` types ([#4125](https://github.com/elastic/eui/pull/4125))
- Updated types associated with `EuiMarkdownEditor` plugin dependencies ([#4124](https://github.com/elastic/eui/pull/4124))
- Upgraded dependencies related to `EuiMarkdownEditor`: `react-dropzone`, `rehype-*`, `remark-*`, and `unified` ([#4124](https://github.com/elastic/eui/pull/4124))
- Added `cellActions` to `EuiDataGrid` ([#3668](https://github.com/elastic/eui/pull/3668))

**Bug fixes**

- Fixed focus management bug in `EuiSelectable` ([#4152](https://github.com/elastic/eui/pull/4152))

**Breaking changes**

- Removed `EuiToggle` and `EuiButtonToggle` in favor of `aria-pressed` ([#4056](https://github.com/elastic/eui/pull/4056))
- Updated `legend` and `idSelected` props of `EuiButtonGroup` to be required ([#4056](https://github.com/elastic/eui/pull/4056))
- Removed `logoAPM` in favor of `logoObservability` ([#4065](https://github.com/elastic/eui/pull/4065))
- Removed `.euiHeaderNotification` CSS class ([#4065](https://github.com/elastic/eui/pull/4065))
- Removed `EuiNavDrawer` in favor of `EuiCollapsibleNav` ([#4065](https://github.com/elastic/eui/pull/4065))
- Removed `compressed` and `displayOnly` props from `EuiFormRow` in favor of the `display` prop ([#4065](https://github.com/elastic/eui/pull/4065))
- Removed `EuiPopover`'s `withTitle` prop ([#4065](https://github.com/elastic/eui/pull/4065))

**Theme: Amsterdam**

- Tightened `line-height` for some `EuiTitle` sizes ([#4133](https://github.com/elastic/eui/pull/4133))
- Removed uppercase from `EuiPopoverTitle` and fixed inherited padding from `EuiPopover` ([#4146](https://github.com/elastic/eui/pull/4146))
- Fixed `EuiFilterGroup` and `EuiFilterButton` styles ([#4151](https://github.com/elastic/eui/pull/4151))

## [`29.5.0`](https://github.com/elastic/eui/tree/v29.5.0)

- Added `plus` and `minus` glyphs to `EuiIcon` ([#4111](https://github.com/elastic/eui/pull/4111))

**Bug fixes**

- Fixed custom color render of `EuiIcon` app (two-tone) icons ([#4104](https://github.com/elastic/eui/pull/4104))
- Changed `iconType` prop to be `required` in `EuiButtonIcon` ([#4106](https://github.com/elastic/eui/pull/4106))

## [`29.4.0`](https://github.com/elastic/eui/tree/v29.4.0)

- Added `childrenBetween` prop to `EuiInMemoryTable` to add content between search bar and table ([#4103](https://github.com/elastic/eui/pull/4103))
- Added `max-width: 100%` to `EuiKeyPadMenu` to allow it to shrink when its container is smaller than its fixed width ([ #4092](https://github.com/elastic/eui/pull/4092))
- Added `key` to `EuiComboBoxOptionOption` to allow duplicate labels ([#4048](https://github.com/elastic/eui/pull/4048))
- Changed `EuiIcon` test mock to render as `span` instead of `div` ([#4099](https://github.com/elastic/eui/pull/4099))
- Added `scripts/docker-puppeteer` as the new home for test-related Docker images ([#4062](https://github.com/elastic/eui/pull/4062))

**Bug fixes**

- Fixed `EuiFieldSearch` padding when `isClearable` but has no `value` ([#4089](https://github.com/elastic/eui/pull/4089))

## [`29.3.2`](https://github.com/elastic/eui/tree/v29.3.2)

**Note: this release is a backport containing changes originally made in `30.6.0`**

**Bug fixes**

- Upgraded `highlight.js` to 9.18.5 ([#4313](https://github.com/elastic/eui/pull/4313))
- Limited the links allowed in `EuiMarkdownEditor` to http, https, or starting with a forward slash ([#4362](https://github.com/elastic/eui/pull/4362))
- Aligned components with an `href` prop to React's practice of disallowing `javascript:` protocols ([#4362](https://github.com/elastic/eui/pull/4362))

## [`29.3.1`](https://github.com/elastic/eui/tree/v29.3.1)

**Note: this release is a backport containing changes originally made in `30.0.0`**

**Bug fixes**

- Fixed focus management bug in `EuiSelectable` ([#4152](https://github.com/elastic/eui/pull/4152))

## [`29.3.0`](https://github.com/elastic/eui/tree/v29.3.0)

- Added `both` option to `flush` prop of `EuiButtonEmpty` ([#4084](https://github.com/elastic/eui/pull/4084))

## [`29.3.0`](https://github.com/elastic/eui/tree/v29.3.0)

- Added `both` option to `flush` prop of `EuiButtonEmpty` ([#4084](https://github.com/elastic/eui/pull/4084))

**Bug fixes**

- Fixed `EuiRange` and `EuiDualRange` display of internal spacer ([#4084](https://github.com/elastic/eui/pull/4084))
- Fixed `EuiFieldSearch` padding for the different states ([#4084](https://github.com/elastic/eui/pull/4084))
- Fixed `EuiCheckableCard` disabled but checked styles ([#4084](https://github.com/elastic/eui/pull/4084))

**Theme: Amsterdam**

- Fixed `line-height` on `EuiTitle` ([#4079](https://github.com/elastic/eui/pull/4079))

## [`29.2.0`](https://github.com/elastic/eui/tree/v29.2.0)

- Improved contrast for `EuiIcon` and `EuiButtonIcon` named colors. This affects `EuiHealth` which uses the `EuiIcon` colors ([#4049](https://github.com/elastic/eui/pull/4049))
- Added color `accent` to `EuiButtonIcon` ([#4049](https://github.com/elastic/eui/pull/4049))

**Bug fixes**

- Fixed `EuiComboBox` `rowHeight` prop causing the height of the option list to be miscalculated ([#4072](https://github.com/elastic/eui/pull/4072))
- Fixed `EuiComboBox` not focusing on the selected option if `selectedOptions` was set without reference to `options` ([#4072](https://github.com/elastic/eui/pull/4072))

**Theme: Amsterdam**

- Removed `border-radius` from `EuiCallout` ([#4066](https://github.com/elastic/eui/pull/4066))
- Updated styles for `EuiToast` ([#4076](https://github.com/elastic/eui/pull/4076))

## [`29.1.0`](https://github.com/elastic/eui/tree/v29.1.0)

- Added footer row to `EuiDataGrid` via the `renderFooterCellValue` prop ([#3770](https://github.com/elastic/eui/pull/3770))
- Added column header menu to `EuiDataGrid` ([#3087](https://github.com/elastic/eui/pull/3087))
- Added horizontal line separator to `EuiContextMenu` ([#4018](https://github.com/elastic/eui/pull/4018))
- Added controlled pagination props to `EuiInMemoryTablee` ([#4038](https://github.com/elastic/eui/pull/4038))
- Added `gutterSize`, `popoverBreakpoints`, `popoverButtonProps`, and `popoverProps` props to `EuiHeaderLinks` ([#4046](https://github.com/elastic/eui/pull/4046))
- Added `'all'` and `'none'` options to the `sizes` prop of `EuiHideFor` and `EuiShowFor` ([#4046](https://github.com/elastic/eui/pull/4046))

**Bug fixes**

- Fixed `EuiTextColor` playground error due to `color` prop not getting captured by the documentation generator ([#4058](https://github.com/elastic/eui/pull/4058))

## [`29.0.0`](https://github.com/elastic/eui/tree/v29.0.0)

- Added `.browserslistrc` for global browser support reference ([#4022](https://github.com/elastic/eui/pull/4022))
- Added ability to specify `color` of `EuiHeaderLink` ([#4008](https://github.com/elastic/eui/pull/4008))
- Added `boolean` type to the `notification` prop of `EuiHeaderSectionItemButton` to show a simple dot ([#4008](https://github.com/elastic/eui/pull/4008))
- Added `popoverButton` and `popoverButtonBreakpoints` props to `EuiSelectableTemplateSitewide` for responsive capabilities ([#4008](https://github.com/elastic/eui/pull/4008))
- Added `isWithinMaxBreakpoint` service ([#4008](https://github.com/elastic/eui/pull/4008))

**Bug fixes**

- Fixed `EuiSuperDatePicker` got stuck in update mode if the value is not changed ([#4025](https://github.com/elastic/eui/pull/4025))
- Fixed ref not being handled properly in `EuiValidatableControl` when used with [react-hook-form](https://react-hook-form.com/) ([#4001](https://github.com/elastic/eui/pull/4001))
- Fixed `EuiNotificationBadge` `color` prop type ([#4008](https://github.com/elastic/eui/pull/4008))
- Fixed z-index of `EuiBottomBar` to stay under header ([#4008](https://github.com/elastic/eui/pull/4008))
- Fixed regression of `EuiSelectable` not abiding by the `showIcons` prop ([#4008](https://github.com/elastic/eui/pull/4008))
- Fixed contrast of search input of `EuiSelectableTemplateSitewide` in dark header ([#4008](https://github.com/elastic/eui/pull/4008))
- Fixed `EuiImage` unable to deactivate the full screen mode using the close icon ([#4033](https://github.com/elastic/eui/pull/4033))
- Allowed `onClick` prop when `href` prop is provided in `EuiBadge` ([#4035](https://github.com/elastic/eui/pull/4035))

**Breaking changes**

- Changed `EuiHideFor` and `EuiShowFor` from using media queries to hide content to not rendering the content. Children are now required and `display` has been removed ([#4008](https://github.com/elastic/eui/pull/4008))

## [`28.4.0`](https://github.com/elastic/eui/tree/v28.4.0)

- Added `loading` icon to `EuiComboBox` input when `isLoading` is `true` ([#4015](https://github.com/elastic/eui/pull/4015))
- Changed `value` prop in `EuiExpression` to not required ([#4014](https://github.com/elastic/eui/pull/4014))
- Added `fold` and `unfold` glyphs to `EuiIcon` ([#3994](https://github.com/elastic/eui/pull/3994))

**Bug fixes**

- Fix incorrect `euiCodeBlockNameColor` variable usage for `.hljs-name` in SCSS ([#3991](https://github.com/elastic/eui/pull/3991))
- Fixed bug in `EuiAccordion` where the `arrowDisplay="right"` is ignored when `extraAction` is configured ([#3971](https://github.com/elastic/eui/pull/3971))

**Theme: Amsterdam**

- Updated form control styles to use a uniform border-radius ([#3741](https://github.com/elastic/eui/pull/3741))

## [`28.3.1`](https://github.com/elastic/eui/tree/v28.3.1)

**Bug fixes**

- Fixed `EuiFieldSearch`'s clear button covering the `value` of the input ([#3936](https://github.com/elastic/eui/pull/3936))
- Fixed bug in `EuiComboBox` where the input was dropping to the next line when a `EuiBadge` had a very long text ([#3968](https://github.com/elastic/eui/pull/3968))
- Fixed type mismatch between `EuiSelectable` options extended via `EuiSelectableOption` and internal option types ([#3983](https://github.com/elastic/eui/pull/3983))
- Fixed `EuiButton` CSS for RTL languages by using `margin-inline-[pos]` instead of `margin-[pos]` ([#3974](https://github.com/elastic/eui/pull/3974))
- Fixed server-side rendering of `EuiBreadcrumbs` and `EuiCollapsibleNav` ([#3970](https://github.com/elastic/eui/pull/3970))

## [`28.3.0`](https://github.com/elastic/eui/tree/v28.3.0)

- Adjusted coloring of `EuiSideNav` to be more consistent across open states ([#3926](https://github.com/elastic/eui/pull/3926))
- Added build-specific babel configurations for docs and tests ([#3911](https://github.com/elastic/eui/pull/3911))
- Updated browserslist configuration to remove IE accommodations ([#3911](https://github.com/elastic/eui/pull/3911))
- Removed docgenInfo from non-docs production builds ([#3911](https://github.com/elastic/eui/pull/3911))
- Added `regressionJob`, `outlierDetectionJob` and `classificationJob` icons to Machine Learning icon set, updated others ([#3931](https://github.com/elastic/eui/pull/3931))
- Added `operator` field to `EuiSearchBar`'s `field_value_selection` filter configuration ([#3922](https://github.com/elastic/eui/pull/3922))

**Bug fixes**

- Fixed bug in `EuiBasicTable` not fully expanding tall rows (height > 1000px) ([#3855](https://github.com/elastic/eui/pull/3855))
- Fixed bug in `EuiDataGrid` which sometimes prevented header cells from being focusabled ([#3943](https://github.com/elastic/eui/pull/3943))
- Fixed bug in `EuiFieldSearch` where a default value would not include the clear button ([#3958](https://github.com/elastic/eui/pull/3958))
- Fixed focus fighting bug when `EuiDataGrid` cell content manages its own popover ([#3951](https://github.com/elastic/eui/pull/3951))
- Fixed `valueText` getting cut off in `EuiProgress` ([#3948](https://github.com/elastic/eui/pull/3948))

## [`28.2.0`](https://github.com/elastic/eui/tree/v28.2.0)

- Added `EuiSelectableTemplateSitewide` as wrapper of `EuiSelectable` for Elastic's global search component ([#3800](https://github.com/elastic/eui/pull/3800))
- Updated styles of `EuiMark` to override browser default ([#3800](https://github.com/elastic/eui/pull/3800))
- Updated `EuiHighlight` to use `EuiMark` as matching element wrapper ([#3800](https://github.com/elastic/eui/pull/3800))
- Enhanced `EuiSelectable`'s `option` type to allow for a separate `searchableLabel` and any generic keys ([#3800](https://github.com/elastic/eui/pull/3800))
- Added `listProps.onFocusBadge`, `loadingMessage`, `noMatchesMessage`, and `emptyMessage` props to `EuiSelectable` ([#3800](https://github.com/elastic/eui/pull/3800))
- Added `bordered` prop to `EuiSelectableMessage` ([#3800](https://github.com/elastic/eui/pull/3800))

**Bug fixes**

- Fixed display of `EuiBadge` if only the `iconType` is passed ([#3800](https://github.com/elastic/eui/pull/3800))
- Fixed accessibility error in `EuiSelectable` when the `list` isn't on the page ([#3800](https://github.com/elastic/eui/pull/3800))
- Fixed accessibility error in `EuiPopover` when `ownFocus = false` ([#3800](https://github.com/elastic/eui/pull/3800))

## [`28.1.0`](https://github.com/elastic/eui/tree/v28.1.0)

- Added `isLoading` and `isLoadingMessage` props to `EuiAccordion` ([#3879](https://github.com/elastic/eui/pull/3879))
- Added `testenv` mock for `EuiFocusTrap` ([#3930](https://github.com/elastic/eui/pull/3930))

**Bug fixes**

- Fixed bug in `EuiCodeBlock` content overlapping with control buttons when `whiteSpace` was set to `"pre"` ([#3853](https://github.com/elastic/eui/pull/3853))
- Fixed `EuiFocusTrap` not applying provided `style` prop ([#3916](https://github.com/elastic/eui/pull/3916))
- Fixed bug in `EuiDataGrid` when a new pagination object would cause every cell to render ([#3919](https://github.com/elastic/eui/pull/3919))

## [`28.0.0`](https://github.com/elastic/eui/tree/v28.0.0)

- Update `createTheme` to apply latest changes to elastic charts `Theme` ([#3792](https://github.com/elastic/eui/pull/3792))
- Added icons for `appSearchApp` and `workplaceSearchApp` to `EuiIcon` ([#3859](https://github.com/elastic/eui/pull/3859))
- Added `unlink` glyph to `EuiIcon` ([#3869](https://github.com/elastic/eui/pull/3869))
- Added `EuiMarkdownEditor` and `EuiMarkdownFormat` components ([#3522](https://github.com/elastic/eui/pull/3522))

**Bug fixes**

- Fixed `EuiFacetGroup` container expansion due to negative margin value ([#3871](https://github.com/elastic/eui/pull/3871))
- Fixed `EuiComboBox` delimeter-separated option creation and empty state prompt text ([#3841](https://github.com/elastic/eui/pull/3841))
- Fixed `EuiDataGrid` not properly resizing within a fixed height container ([#3894](https://github.com/elastic/eui/pull/3894))
- Fixed bug in `EuiFieldPassword` where an edge case mutated its `append` prop  ([#3884](https://github.com/elastic/eui/pull/3884))

**Breaking changes**

- Requires `@elastic/charts` version `20.0.0` and above for chart theming utils.

## [`27.4.1`](https://github.com/elastic/eui/tree/v27.4.1)

**Note: this release is a backport containing changes originally made in `28.1.0`**

- Added `testenv` mock for `EuiFocusTrap` ([#3930](https://github.com/elastic/eui/pull/3930))

## [`27.4.0`](https://github.com/elastic/eui/tree/v27.4.0)

- Added `customOptionText` prop to `EuiComboBox` ([#3811](https://github.com/elastic/eui/pull/3811))

**Bug fixes**

- Improve `EuiDataGrid` Chrome rendering performance in full screen ([#3726](https://github.com/elastic/eui/issues/3726))
- Removed `@elastic/eui/src-docs` entries from published _eui.d.ts_ ([#3856](https://github.com/elastic/eui/pull/3856))

## [`27.3.1`](https://github.com/elastic/eui/tree/v27.3.1)

**Bug fixes**

- Fixed bug in all input fields placeholders in Safari that weren't vertically centered ([#3809](https://github.com/elastic/eui/pull/3809))
- Removed `pointer-events: none` in both `EuiButton` & `EuiButtonEmpty` to not override the `pointer-events: auto` in the button mixin `euiButtonContentDisabled` ([#3824](https://github.com/elastic/eui/pull/3824))
- Fixed bug in `EuiPagination` showing wrong page count when `compressed` prop is true ([#3827](https://github.com/elastic/eui/pull/3827))
- Fixed bug in EUI's input field components where their `inputRef` couldn't be a `RefObject` ([#3822](https://github.com/elastic/eui/pull/3822))
- Moved `react-view` and `html-format` to be `devDependencies` ([#3828](https://github.com/elastic/eui/pull/3828))
- Fixed `EuiComboBox` keyboard selection when `sortMatchesBy=startsWith` ([#3823](https://github.com/elastic/eui/pull/3823))
- Fixed `EuiCodeEditor` not exiting edit mode with `esc` when `enableLiveAutocompletion=true` ([#3833](https://github.com/elastic/eui/pull/3833))
- Fixed issue where `EuiDataGrid`'s cell expansion popover would sometimes render as a scrollable element ([#3832](https://github.com/elastic/eui/pull/3832))

## [`27.3.0`](https://github.com/elastic/eui/tree/v27.3.0)

- Added possibility to hide "Rows per page" select in `EuiDataGrid` ([#3700](https://github.com/elastic/eui/pull/3700))
- Updated lodash to `v4.17.19` ([#3764](https://github.com/elastic/eui/pull/3764))
- Added `returnKey` glyph to `EuiIcon` ([#3783](https://github.com/elastic/eui/pull/3783))
- Added `type` prop to `EuiFieldPassword` to support toggling of obfuscation ([#3751](https://github.com/elastic/eui/pull/3751))

**Bug fixes**

- Fixed bug in `EuiDataGrid` not calculating the width correctly ([#3789](https://github.com/elastic/eui/pull/3789))
- Fixed `EuiComboBox` marking some very long inputs as invalid ([#3797](https://github.com/elastic/eui/pull/3797))

## [`27.2.0`](https://github.com/elastic/eui/tree/v27.2.0)

- Added `analyzeEvent` glyph in `EuiIcon` ([#3729](https://github.com/elastic/eui/pull/3729))
- Updated `EuiComboBox` to allow the options list to open for single selection custom options ([#3706](https://github.com/elastic/eui/pull/3706))
- Added `useEuiI18n` hook for localization ([#3749](https://github.com/elastic/eui/pull/3749))
- Added a hit enter badge to `EuiComboBox` when focusing an option and for empty states that allow pressing enter ([#3782](https://github.com/elastic/eui/pull/3782))

**Bug fixes**

- Fixed `EuiComboBox` always showing a scrollbar ([#3744](https://github.com/elastic/eui/pull/3744))
- Replaced `react-focus-lock` with `react-focus-on` ([#3631](https://github.com/elastic/eui/pull/3631))
- Fixed errors in `EuiSuperDatePicker` related to invalid and `null` date formatting ([#3750](https://github.com/elastic/eui/pull/3750))
- Fixed type definitions for `findTestSubject` and `takeMountedSnapshot` ([#3763](https://github.com/elastic/eui/pull/3763))
- Fixed `EuiComboBox` not allowing clicks on previously virtualized items when inside of `EuiFormRow` ([#3784](https://github.com/elastic/eui/pull/3784))
- Removed `[Space]` as a way to select options in `EuiSelectable` ([#3784](https://github.com/elastic/eui/pull/3784))
- Fixed type definition for `windowProps` in `EuiSelectable` ([#3787](https://github.com/elastic/eui/pull/3787))

## [`27.1.0`](https://github.com/elastic/eui/tree/v27.1.0)

- Added `titleElement` and `descriptionElement` props to `EuiStat` ([#3693](https://github.com/elastic/eui/pull/3693))
- Updated `securityAnalyticsApp` app icon ([#3720](https://github.com/elastic/eui/pull/3720))
- Removed `src/test` and `@types/enzyme` references from `eui.d.ts` ([#3715](https://github.com/elastic/eui/pull/3715))
- Added `index.d.ts` file to `lib/test`  and `es/test` ([#3715](https://github.com/elastic/eui/pull/3715))
- Added `descriptionFlexItemProps` and `fieldFlexItemProps` props to `EuiDescribedFormGroup` ([#3717](https://github.com/elastic/eui/pull/3717))
- Expanded `EuiBasicTable`'s default action's name configuration to accept a function that returns a React node ([#3739](https://github.com/elastic/eui/pull/3739))
- Added internal use only button building blocks for reusability in other button components ([#3730](https://github.com/elastic/eui/pull/3730))

## [`27.0.0`](https://github.com/elastic/eui/tree/v27.0.0)
- Added `paddingSize` prop to `EuiCard` ([#3638](https://github.com/elastic/eui/pull/3638))
- Added `isClearable` and `placeholder` options to `EuiColorPicker` ([#3689](https://github.com/elastic/eui/pull/3689))
- Added SASS helper files for EUI theme globals ([#3691](https://github.com/elastic/eui/pull/3691))
- Add `label`, `labelProps` and `valueText` props to `EuiProgress` ([#3661](https://github.com/elastic/eui/pull/3661))

**Bug fixes**

- Fixed a bug in `EuiResizableContainer` preventing nested containers ([#3699](https://github.com/elastic/eui/pull/3699))
- Fixed a bug in `EuiResizableContainer` preventing resizing by arrow keys in some cases ([#3699](https://github.com/elastic/eui/pull/3699))
- Fixed `EuiHorizontalSteps` rendering over `EuiHeader` ([#3707](https://github.com/elastic/eui/pull/3707))
- Fixed bug where `EuiSuperSelect` lost focus after a value selection ([#3734](https://github.com/elastic/eui/pull/3734))

**Breaking changes**

- Significant accessibility refactor of `EuiSelectable` ([#3169](https://github.com/elastic/eui/pull/3169))
  - `react-virtualized` replaced with `react-window`
  - `virtualizedProps` on `EuiSelectableOptionsList` renamed to `windowProps`
  - Removed `rootId` and added `makeOptionId`, `listId`, and `setActiveOptionIndex` to `EuiSelectableList`
  - Added `listId` to `EuiSelectableSearch`
  - `options` passed into `EuiSelectable` cannot have an `id`
  - Requires an `onChange` to be passed into `EuiSelectableSearch`

## [`26.3.4`](https://github.com/elastic/eui/tree/v26.3.4)

**Note: this release is a backport containing changes originally made in `27.2.0`**

**Bug fixes**

- Fixed errors in `EuiSuperDatePicker` related to invalid and `null` date formatting ([#3750](https://github.com/elastic/eui/pull/3750))

## [`26.3.3`](https://github.com/elastic/eui/tree/v26.3.3)

**Note: this release is a backport containing changes originally made in `27.3.1`**

**Bug fixes**

- Fixed bug in `EuiPagination` showing wrong page count when `compressed` prop is true ([#3827](https://github.com/elastic/eui/pull/3827))

## [`26.3.2`](https://github.com/elastic/eui/tree/v26.3.2)

**Note: this release is a backport containing changes originally made in `27.1.0`**

- Updated `securityAnalyticsApp` app icon ([#3720](https://github.com/elastic/eui/pull/3720))

## [`26.3.1`](https://github.com/elastic/eui/tree/v26.3.1)

**Note: this release is a backport containing changes originally made in `27.0.0`**

- Added `isClearable` and `placeholder` options to `EuiColorPicker` ([#3689](https://github.com/elastic/eui/pull/3689))

## [`26.3.0`](https://github.com/elastic/eui/tree/v26.3.0)

- Expanded `EuiBasicTable`'s default action's name configuration to accept any React node ([#3688](https://github.com/elastic/eui/pull/3688))

## [`26.2.0`](https://github.com/elastic/eui/tree/v26.2.0)

- Added `background.color` to `EUI_CHARTS_THEME_LIGHT/DARK.theme` ([#3669](https://github.com/elastic/eui/pull/3669))
- Added `gutterSize` prop to `EuiFacetGroup` ([#3639](https://github.com/elastic/eui/pull/3639))
- Updated props of `EuiCode` and `EuiCodeBlock` to reflect only functional props ([#3647](https://github.com/elastic/eui/pull/3647))
- Updated `EuiResizableContainer` `onPanelWidthChange` callback method to include all panel widths ([#3630](https://github.com/elastic/eui/pull/3630))
- Extended `Query` / `EuiSearchBar` to allow any character inside double-quoted phrases ([#3432](https://github.com/elastic/eui/pull/3432))
- Added `headerZindexLocation` prop to `EuiOverlayMask` ([#3655](https://github.com/elastic/eui/pull/3655))
- Added `maskProps` prop to `EuiFlyout` and `EuiCollapsibleNav` ([#3655](https://github.com/elastic/eui/pull/3655))

**Bug fixes**

- Fixed `EuiContextMenu` panel `onAnimationEnd` transition bug in Chrome ([#3656](https://github.com/elastic/eui/pull/3656))
- Fixed `EuiSkipLink` interactive props and Safari click issue ([#3665](https://github.com/elastic/eui/pull/3665))
- Fixed `z-index` issues with `EuiHeader`, `EuiFlyout`, and other portal content ([#3655](https://github.com/elastic/eui/pull/3655))
- Fixed `color` prop error in `EuiBadge` to be more flexible with what format it accepts ([#3655](https://github.com/elastic/eui/pull/3655))
- Fixed `EuiSuperSelect` popover from moving 16px horizontally when it's close to a window edge ([#3685](https://github.com/elastic/eui/pull/3685))

**Theme: Amsterdam**

- Fixed `EuiHeaderBreadcrumb` height, `onClick`, border-radius, and single item display ([#3655](https://github.com/elastic/eui/pull/3655))

## [`26.1.0`](https://github.com/elastic/eui/tree/v26.1.0)

- Optimized in-memory datagrid mount performance ([#3628](https://github.com/elastic/eui/pull/3628))
- Exported `EuiCardProps` and `EuiCheckableCardProps` types ([#3640](https://github.com/elastic/eui/pull/3640))

## [`26.0.1`](https://github.com/elastic/eui/tree/v26.0.1)

**Bug fixes**

- Fixed fullscreen render issue in `EuiCode` ([#3633](https://github.com/elastic/eui/pull/3633))

## [`26.0.0`](https://github.com/elastic/eui/tree/v26.0.0)

- Added `useEuiTextDiff` react hook utility ([#3288](https://github.com/elastic/eui/pull/3288))
- Converted `EuiOverlayMask` to be a React functional component ([#3555](https://github.com/elastic/eui/pull/3555))
- Changed `responsive` and `max` behavior of `EuiBreadcrumbs` to always display collapsed items in popover [#3578](https://github.com/elastic/eui/pull/3578))
- Added `BREAKPOINTS` and `getBreakpoint` utilities [#3578](https://github.com/elastic/eui/pull/3578))
- Added `'any'` option to the `step` prop of the `EuiFieldNumber` ([#3562](https://github.com/elastic/eui/pull/3562))
- Moved all `EuiHeader` SASS variables to `global_styles` ([#3592](https://github.com/elastic/eui/pull/3592))
- Added `side` prop to `EuiGlobalToastList` for choosing which window side to display toasts ([#3600](https://github.com/elastic/eui/pull/3600))
- Default `titleSize` get's implicitly set to 'm' for `EuiEmptyPrompt` ([#3598](https://github.com/elastic/eui/pull/3598))
- Updated `logoElastic` to meet brand guidelines ([#3613](https://github.com/elastic/eui/pull/3613))
- Allowed user to enter hexcode for colors in `EuiStat` ([#3617](https://github.com/elastic/eui/pull/3617))
- Extended `CommonProps` in `EuiColorPalettePickerPaletteTextProps`, `EuiColorPalettePickerPaletteFixedProps` and `EuiColorPalettePickerPaletteGradientProps` types ([#3616](https://github.com/elastic/eui/pull/3616))
- Updated `onToggle` callback in `EuiAccordion` to  allow for external state control ([#3614](https://github.com/elastic/eui/pull/3614))

**Bug fixes**

- Added `display` prop to `EuiDataGridColumnSortingDraggable` to pass` displayAsText` prop correctly to the column sorting popover ([#3574](https://github.com/elastic/eui/pull/3574))
- Fixed `EuiCodeBlockImpl` testenv mock pass-through of `data-test-subj` attribute ([#3560](https://github.com/elastic/eui/pull/3560))
- Fixed DOM element creation issues in `EuiOverlayMask` by using lifecycle methods ([#3555](https://github.com/elastic/eui/pull/3555))
- Fixed `EuiComboBox`'s options list `zIndex` positioning when nested in other `zIndex` contexts ([#3551](https://github.com/elastic/eui/pull/3551))
- Fixed `euiHeaderAffordForFixed` mixin's use of header SASS variable ([#3592](https://github.com/elastic/eui/pull/3592))
- Included `onClick` as a valid prop for `EuiControlBar` **icon** controls ([#3581](https://github.com/elastic/eui/pull/3581))
- Fixed poor performance of `EuiToolTip` during frequent mouesover/mouseout events ([#3596](https://github.com/elastic/eui/pull/3596))
- Fixed `EuiBasicTable` custom actions popover from remaining open after click ([#3619](https://github.com/elastic/eui/pull/3619))

**Breaking changes**

- Changed `breadcrumb` TS type exported name from `Breadcrumb` to `EuiBreadcrumb` ([#3578](https://github.com/elastic/eui/pull/3578))
- Removed `$euiZComboBox` SCSS variable (value was 8001) ([#3551](https://github.com/elastic/eui/pull/3551))

**Theme: Amsterdam**

- Updated `EuiCallout` by removing left border, adding border radius and increasing font weight on titles ([#3557](https://github.com/elastic/eui/pull/3557/))
- Updated `EuiHeaderBreadcrumbs` style to be more prominent ([#3578](https://github.com/elastic/eui/pull/3578/))
- Fixed `EuiFilterGroup` `border-radius` ([#3591](https://github.com/elastic/eui/pull/3591/))
- Updated `EuiCodeBlock` inline code style to use border radius ([#3599](https://github.com/elastic/eui/pull/3599))

## [`25.0.0`](https://github.com/elastic/eui/tree/v25.0.0)

- Added conditional rendering of the title element in `EuiCallOut` to avoid usage of additional space caused by the rendered `<div>` element ([#3549](https://github.com/elastic/eui/pull/3549))
- Added `invalidCallout` prop to `EuiForm` to allow conditional rendering of error callout([#3585](https://github.com/elastic/eui/pull/3585))

**Bug fixes**

- Fixed `EuiCard` image corners to be contained within border radius ([#3556](https://github.com/elastic/eui/pull/3556))
- Fixed `EuiKeyPadMenu` and `EuiKeyPadMenuItem` aria roles ([#3502](https://github.com/elastic/eui/pull/3502))
- Fixed `EuiFieldSearch` input clear button doesn't show when external input is passed([#3497](https://github.com/elastic/eui/pull/3497))
- Fixed `EuiBasicTable` footers to always use a unique `key` ([#3559](https://github.com/elastic/eui/pull/3559))
- Fixed `EuiInMemoryTable` by changing the `getDerivedStateFromProps` to not block the updates as soon as it hits a true if condition ([#3579](https://github.com/elastic/eui/pull/3579))

**Breaking changes**

- A fixed `EuiHeader` no longer automatically padding directly to the `<body>` element ([#3538](https://github.com/elastic/eui/pull/3538))
- Improved `EuiPagination`, `EuiDataGrid`, `EuiBasicTable` and `EuiInMemoryTable` accessibility, causing `EuiPaginationButton` to require a new prop `pageIndex` ([#3294](https://github.com/elastic/eui/pull/3294))
- Replaced all usages of [`KeyboardEvent.keyCode`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode) (deprecated) with [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key). From `@elastic/eui/lib/services`, `keyCodes` has been replaced with `keys`, as has `cascadingMenuKeyCodes`->`cascadingMenuKeys`, and `comboBoxKeyCodes`->`comboBoxKeys`.  The implementation of all of those exports (as well as `accessibleClickKeys`) all now use `KeyboardEvent.key` values ([#3517](https://github.com/elastic/eui/pull/3517))

## [`24.1.0`](https://github.com/elastic/eui/tree/v24.1.0)

- Added `displayAsText` prop to `EuiDataGridColumn` ([#3520](https://github.com/elastic/eui/pull/3520))
- Added `minSizeForControls` prop to `EuiDataGrid` to control the minimum width for showing grid controls ([#3527](https://github.com/elastic/eui/pull/3527))
- Passed `getSelectedOptionForSearchValue` to `EuiComboBoxOptionsList` as prop ([#3501](https://github.com/elastic/eui/pull/3501))
- Added `appendIconComponentCache` function to allow manual pre-emptive loading of source elements into the `EuiIcon` cache ([#3481](https://github.com/elastic/eui/pull/3481))
- Added `initialSelected` to `EuiTableSelectionType` properties to set initial selected checkboxes for `EuiBasicTable` ([#3418](https://github.com/elastic/eui/pull/3418))
- Added exports for `EuiSteps` and related components types ([#3471](https://github.com/elastic/eui/pull/3471))
- Added `displayName` to components using `React.forwardRef` ([#3451](https://github.com/elastic/eui/pull/3451))
- Added event target checker for `EuiOverlayMask`'s `onClick` prop ([#3462](https://github.com/elastic/eui/pull/3462))
- Added `EuiColorPalettePicker` component ([#3192](https://github.com/elastic/eui/pull/3192))
- Added `left-start` popover placement to `EuiDatePicker` ([#3511](https://github.com/elastic/eui/pull/3511))
- Added `theme` prop to `EuiHeader` ([#3524](https://github.com/elastic/eui/pull/3524))
- Added `.euiHeaderLink-isActive` class to `EuiHeaderLink` when `isActive` ([#3524](https://github.com/elastic/eui/pull/3524))
- Added `display`, `descriptionWidth`, `textWrap` and `isInvalid` props to `EuiExpression` ([#3467](https://github.com/elastic/eui/pull/3467))
- Added more exports for `EuiColorPalettePicker` types ([#3542](https://github.com/elastic/eui/pull/3542))

**Bug Fixes**

- Fixed issue where multiple `EuiToolTip` components could be visible when element was focused ([#3335](https://github.com/elastic/eui/pull/3335))
- Fixed `EuiSuperSelect` not rendering full width when `isOpen` is `true` ([#3495](https://github.com/elastic/eui/pull/3495))
- Fixed `EuiBasicTable` shows no items if all items of last page is deleted  ([#3422](https://github.com/elastic/eui/pull/3422))
- Fixed TypeScript module name in generated `eui_charts_theme.d.ts` file  ([#3492](https://github.com/elastic/eui/pull/3492))
- Fixed code highlight color contrast in `EuiCodeBlock` ([#3309](https://github.com/elastic/eui/pull/3309))
- Fixed regression in `EuiComboBox` not triggering its `inputRef` callback ([#3532](https://github.com/elastic/eui/pull/3532))

**Deprecations**

- Added a deprecation notice for `EuiNavDrawer` family of components. Advise usage of `EuiCollapsibleNav` instead ([#3487](https://github.com/elastic/eui/pull/3487))

**Notes**

- Removed `src-framer` files from the repository ([#3487](https://github.com/elastic/eui/pull/3487))

**Theme: Amsterdam**

- Removed borders `EuiModal` ([#3515](https://github.com/elastic/eui/pull/3515))
- Improve `EuiOverlayMask` colors ([#3515](https://github.com/elastic/eui/pull/3515))
- Updated shadow styles to improve smoothness, use black as the base color, and deprecated `opacity` value of shadow mixins ([#3428](https://github.com/elastic/eui/pull/3428))
- Removed borders from `EuiFlyout` and `EuiPopover` ([#3477](https://github.com/elastic/eui/pull/3477))
- Updated `EuiHeader` and components ([#3524](https://github.com/elastic/eui/pull/3524))

## [`24.0.0`](https://github.com/elastic/eui/tree/v24.0.0)

- Added `null` as acceptable `icon` prop for `EuiCard` ([#3470](https://github.com/elastic/eui/pull/3470))
- Added `sortBy` and `sortShift` props to `euiPaletteColorBlind()` for sorting along the color wheel ([#3387](https://github.com/elastic/eui/pull/3387))
- Added `utcOffset` prop to `EuiSuperDatePicker` ([#3436](https://github.com/elastic/eui/pull/3436))
- Added `partition` key to `EuiChartThemeType` for Partition chart support ([#3387](https://github.com/elastic/eui/pull/3387))
- Updated `EuiImage`'s `caption` prop type from `string` to `ReactNode` ([#3387](https://github.com/elastic/eui/pull/3387))
- Improved contrast for `EuiCollapsibleNav` close button ([#3465](https://github.com/elastic/eui/pull/3465))

**Bug Fixes**

- Fixed `EuiSuperDatePicker` quick selection menu overriding specified time range with default values ([#3446](https://github.com/elastic/eui/pull/3446))
- Fixed `EuiCodeEditor` console error when using the editor without import the default theme ([#3454](https://github.com/elastic/eui/pull/3454))
- Fixed `EuiDatePopoverContent` `onChange` event to only accept `string` date input  ([#3460](https://github.com/elastic/eui/pull/3460))

**Breaking changes**

- Changed parameters for `euiPaletteColorBlind()` to an object ([#3387](https://github.com/elastic/eui/pull/3387))
- Changed the default palette of `EUI_CHARTS_THEME_LIGHT/DARK` themes to the naturally sorted `euiPaletteColorBlind()` ([#3387](https://github.com/elastic/eui/pull/3387))

## [`23.3.1`](https://github.com/elastic/eui/tree/v23.3.1)

**Note: this release is a backport containing changes originally made in `24.0.0`**

**Bug Fixes**

- Fixed `EuiSuperDatePicker` quick selection menu overriding specified time range with default values ([#3446](https://github.com/elastic/eui/pull/3446))
- Fixed `EuiDatePopoverContent` `onChange` event to only accept `string` date input  ([#3460](https://github.com/elastic/eui/pull/3460))

## [`23.3.0`](https://github.com/elastic/eui/tree/v23.3.0)

- Added `aria-hidden = true` to `EuiRangeSlider` and `EuiRangeTrack` if `showInput = true` ([#3423](https://github.com/elastic/eui/pull/3423))
- Added `testenv` mock for `EuiCode` and `EuiCodeBlock` ([#3405](https://github.com/elastic/eui/pull/3405))
- Added `displayName` to components using `React.forwardRef` ([#3440](https://github.com/elastic/eui/pull/3440))

**Bug Fixes**

- Fixed `EuiCode` and `EuiCodeBlock` from erroring in environments without a DOM implementation ([#3405](https://github.com/elastic/eui/pull/3405))
- Fixed `ApplyClassComponentDefaults` typescript utility to correctly determine defaulted properties' types ([#3430](https://github.com/elastic/eui/pull/3430))
- Fixed `prettyDuration` return type to be `string`, use fallback value  ([#3438](https://github.com/elastic/eui/pull/3438))

## [`23.2.0`](https://github.com/elastic/eui/tree/v23.2.0)

- Added `iconType` prop to `EuiDatePicker` ([#3383](https://github.com/elastic/eui/pull/3383))
- Applied `max-width: 100%` to `EuiPageBody` so inner flex-based items don't overflow their containers  ([#3375](https://github.com/elastic/eui/pull/3375))
- Added `titleSize` prop to `EuiStep` and `EuiSteps` ([#3340](https://github.com/elastic/eui/pull/3340))
- Handled `ref` passed to `EuiHeaderSectionItemButton` ([#3378](https://github.com/elastic/eui/pull/3378))
- Added `iconProps` prop to `EuiCollapsibleNavGroup` to extend the props passed to the rendered `EuiIcon` ([#3365](https://github.com/elastic/eui/pull/3365))
- Added `closeButtonProps` to `EuiCollapsibleNav` ([#3398](https://github.com/elastic/eui/pull/3398))
- Added `buffer` prop to `EuiPopover` for altering minimum distance to container edges ([#3398](https://github.com/elastic/eui/pull/3398))
- Allowed `search` prop changes to update `EuiInMemoryTable` internal query state ([#3371](https://github.com/elastic/eui/pull/3371))
- Added `EuiResizableContainer` component ([#2701](https://github.com/elastic/eui/pull/2701))
- Added caching layer on `EuiIcon` to prevent delays and flickering when rendering an already fetched icon ([#3404](https://github.com/elastic/eui/pull/3404))

**Bug Fixes**

- Fixed `EuiFieldSearch` to trigger `onSearch` single time instead of two times ([#3425](https://github.com/elastic/eui/pull/3425))
- Fixed `EuiBasicTable` item selection when `id` is `0` ([#3417](https://github.com/elastic/eui/pull/3417))
- Fixed `EuiNavDrawer` not closing on outside click after being unlocked ([#3415](https://github.com/elastic/eui/pull/3415))
- Fixed `EuiBadge` `iconOnClick` props makes badge text clickable ([#3392](https://github.com/elastic/eui/pull/3392))
- Added `id` requirement if `label` is used in `EuiRadio` ([#3382](https://github.com/elastic/eui/pull/3382))
- Fixed z-index issue in `EuiDatePicker` where it's popover would sit beneath other DOM siblings that had z-index applied ([#3376](https://github.com/elastic/eui/pull/3376))
- Added `download` glyph to `EuiIcon` ([#3364](https://github.com/elastic/eui/pull/3364))
- Applies `max-width: 100%` to `EuiPageBody` so inner flex-based items don't overflow their containers  ([#3375](https://github.com/elastic/eui/pull/3375))
- Added `ReactElement` to `EuiCard` `image` prop type to allow custom component ([#3370](https://github.com/elastic/eui/pull/3370))
- Fixed `EuiCollapsibleNavGroup` `titleSize` prop type to properly exclude `l` and `m` sizes ([#3365](https://github.com/elastic/eui/pull/3365))
- Fixed `EuiDatePickerRange` start date popover to sit left under the icon ([#3383](https://github.com/elastic/eui/pull/3383))
- Fixed `euiFormControlIsLoading` SASS mixin to prevent the loading icon from overlapping with the text when the form control is `compressed` and adjusted the amount of padding ([#3401](https://github.com/elastic/eui/pull/3401)
- Fixed `EuiHeader` `z-index` issues with popovers and added body classes for the presence of `EuiFlyout` and `EuiCollapsibleNav.isOpen` ([#3398](https://github.com/elastic/eui/pull/3398))
- Fixed `EuiInMemoryTable` data reset when filter is set and item is selected ([#3419](https://github.com/elastic/eui/pull/3419))
- Fixed `popoverPlacement` default value for `EuiDatePicker` ([#3427](https://github.com/elastic/eui/pull/3427))

## [`23.1.0`](https://github.com/elastic/eui/tree/v23.1.0)

- Removed additional padding applied to `$euiHeaderHeightCompensation` when `EuiHeader` is fixed ([#3369](https://github.com/elastic/eui/pull/3369))

**Bug Fixes**

- Fixed `EuiDescribedFormGroup` issue that prevented it from shrinking down properly in smaller viewports ([#3369](https://github.com/elastic/eui/pull/3369))

## [`23.0.0`](https://github.com/elastic/eui/tree/v23.0.0)

- Added `showCloseButton` and `dockedBreakpoint` flexibility to `EuiCollapsibleNav` ([#3330](https://github.com/elastic/eui/pull/3330))
- Added `panelStyle` prop to `EuiPopover` to distinguish style object configuration ([#3329](https://github.com/elastic/eui/pull/3329))
- Added `popoverPlacement` prop in `EuiDatePicker` ([#3359](https://github.com/elastic/eui/pull/3359))
- Extended `EuiDatePicker`'s `startDate` and `endDate` types to accept `null` values for better interoperability ([#3343](https://github.com/elastic/eui/pull/3343))
- Added `EuiCommentList` component ([#3344](https://github.com/elastic/eui/pull/3344))
- Added secondary color value input element to `EuiColorPicker` ([#3336](https://github.com/elastic/eui/pull/3336))

**Bug Fixes**

- Fixed `EuiInMemoryTable` `isClearable` property to initiate reset ([#3328](https://github.com/elastic/eui/pull/3328))
- Removed `schema` attribute form `<input/>` in `EuiInMemoryTable` ([#3337](https://github.com/elastic/eui/pull/3337))
- Fixed `EuiCollapsibleNav` docked states on mobile ([#3330](https://github.com/elastic/eui/pull/3330))
- Fixed `EuiPopover` positioning from being overridden by `style` prop ([#3329](https://github.com/elastic/eui/pull/3329))
- Fixed `EuiCodeBlock` not copying updated content ([#3351](https://github.com/elastic/eui/pull/3351))
- Fixed alignment of popover of end date of `EuiDatePickerRange` ([#3359](https://github.com/elastic/eui/pull/3359))

**Breaking changes**

- Upgraded `TypeScript` to 3.7.2 ([#3295](https://github.com/elastic/eui/pull/3295))
- Changed `EuiCollapsibleNav` prop name from `hideButtonIfDocked` to `showButtonIfDocked` and flipped default ([#3330](https://github.com/elastic/eui/pull/3330))

## [`22.6.0`](https://github.com/elastic/eui/tree/v22.6.0)

- Converted `NavDrawer`, `NavDrawerGroup`, and `NavDrawerFlyout` to TypeScript ([#3268](https://github.com/elastic/eui/pull/3268))
- Converted `EuiDatePicker`, `EuiDatePickerRange`, `EuiSuperDatePicker`, and `EuiSuperUpdateButton` to TypeScript ([#2891](https://github.com/elastic/eui/pull/2891))
- Improved condensed `EuiTabs` focus states ([#3299](https://github.com/elastic/eui/pull/3299))
- Added `EuiTour`, `EuiTourStep`, and `useEuiTour` components ([#2766](https://github.com/elastic/eui/pull/2766))
- Added `EuiBeacon` component ([#2766](https://github.com/elastic/eui/pull/2766))
- Added `offset` and `arrowChildren` props to `EuiPopover` for anchor element customization ([#2766](https://github.com/elastic/eui/pull/2766))

**Bug Fixes**

- Fixed `EuiProgress` `max` property to allow `undefined` ([#3198](https://github.com/elastic/eui/pull/3198))


## [`22.5.0`](https://github.com/elastic/eui/tree/v22.5.0)

- Added `forceState` prop to control `EuiAccordion` state from outside ([#3240](https://github.com/elastic/eui/pull/3240))

**Bug Fixes**

- Fixed EuiI8n hasPropName utility errors on null values ([#3303](https://github.com/elastic/eui/pull/3303))
- Fixed the inline styles being overwritten by consumer-passed inline styles in EuiBadge ([#3284](https://github.com/elastic/eui/pull/3284))

## [`22.4.0`](https://github.com/elastic/eui/tree/v22.4.0)

- Added support for `href`, `onClick`, and related props in `EuiBasicTable` default actions ([#3115](https://github.com/elastic/eui/pull/3115))
- Added support for `EuiCodeEditor` to set `readonly` and `id` on `<textarea />` ([#3212](https://github.com/elastic/eui/pull/3212))
- Added `EuiComment` component ([#3179](https://github.com/elastic/eui/pull/3179))

**Deprecation**

- Updated makeId to DEPRECATED, shifted all the calls to htmlIdGenerator ([#3129](https://github.com/elastic/eui/pull/3129))

**Bug Fixes**

- Fixed `EuiTabbedContent` focus discrepancy between selected and initialFocus tabs ([#3285](https://github.com/elastic/eui/pull/3285))
- Fixed the `initialSelectedTab` prop of `EuiTabbedContent` to not steal focus from content. Which fixed the bug in `EuiSuperDatePicker` that required two clicks to focus input in relative tab  ([#3154](https://github.com/elastic/eui/pull/3154))
- Fixed the `img` element in `EuiIcon` using custom SVGs to have an `alt` attribute with an empty string, rather than no `alt` attribute at all ([#3245](https://github.com/elastic/eui/pull/3245))
- Added overflows to EuiDataGrid toolbar dropdowns when there are many columns ([#3238](https://github.com/elastic/eui/pull/3238))
- Fixed `EuiIcon`'s icon `type` definition to allow custom React components ([#3252](https://github.com/elastic/eui/pull/3252))
- Fixed `initialSelectedTab` properties used in `EuiDatePopoverContent` ([#3254](https://github.com/elastic/eui/pull/3254))
- Fixed `EuiSideNavItem` overriding custom `className` of item and icon ([#3283](https://github.com/elastic/eui/pull/3283))
- Fixed `EuiFieldSearch` clear button inconsistencies ([#3270](https://github.com/elastic/eui/pull/3270))
- Fixed components with `href` usage of `rel` ([#3258](https://github.com/elastic/eui/pull/3258))

## [`22.3.1`](https://github.com/elastic/eui/tree/v22.3.1)

**Note: this release is a backport containing changes originally made in `23.0.0`, `23.1.0`, and `23.2.0`**

- Removed additional padding applied to `$euiHeaderHeightCompensation` when `EuiHeader` is fixed ([#3369](https://github.com/elastic/eui/pull/3369))
- Handled `ref` passed to `EuiHeaderSectionItemButton` ([#3378](https://github.com/elastic/eui/pull/3378))
- Added `showCloseButton` and `dockedBreakpoint` flexibility to `EuiCollapsibleNav` ([#3330](https://github.com/elastic/eui/pull/3330))
- Added `closeButtonProps` to `EuiCollapsibleNav` ([#3398](https://github.com/elastic/eui/pull/3398))
- Added `buffer` prop to `EuiPopover` for altering minimum distance to container edges ([#3398](https://github.com/elastic/eui/pull/3398))

**Bug Fixes**

- Fixed `EuiDescribedFormGroup` issue that prevented it from shrinking down properly in smaller viewports ([#3369](https://github.com/elastic/eui/pull/3369))
- Fixed `EuiCollapsibleNav` docked states on mobile ([#3330](https://github.com/elastic/eui/pull/3330))
- Fixed `EuiHeader` `z-index` issues with popovers and added body classes for the presence of `EuiFlyout` and `EuiCollapsibleNav.isOpen` ([#3398](https://github.com/elastic/eui/pull/3398))

**Breaking changes**

- Changed `EuiCollapsibleNav` prop name from `hideButtonIfDocked` to `showButtonIfDocked` and flipped default ([#3330](https://github.com/elastic/eui/pull/3330))

## [`22.3.0`](https://github.com/elastic/eui/tree/v22.3.0)

- Removed dependency on option list for custom option of `EuiComboBox` ([#3183](https://github.com/elastic/eui/pull/3183))
- Fixed `EuiPopover` arrow position in Android and Linux ([#3188](https://github.com/elastic/eui/pull/3188))
- Improved `htmlIdGenerator` when supplying both `prefix` and `suffix` ([#3076](https://github.com/elastic/eui/pull/3076))
- Updated pagination prop descriptions for `EuiInMemoryTable` ([#3142](https://github.com/elastic/eui/pull/3142))
- Added `title` and `aria` attributes to `EuiToken`'s icon element ([#3195](https://github.com/elastic/eui/pull/3195))
- Added new Elasticsearch token types ([#2758](https://github.com/elastic/eui/pull/2758))

**Bug Fixes**

- Fixed bug in `EuiAccordion` to adjust to the correct height when content height changes ([#3160](https://github.com/elastic/eui/pull/3160))
- Fixed bug in `EuiBasicTable` to handle dynamic icon value properly in collapsed actions ([#3145](https://github.com/elastic/eui/pull/3145))
- Fixed `availability` check for actions in `EuiBasicTable` ([3030](https://github.com/elastic/kibana/issues/3030))

## [`22.2.0`](https://github.com/elastic/eui/tree/v22.2.0)

- Improved `EuiModal` close button position to prevent from overlapping with the title ([#3176](https://github.com/elastic/eui/pull/3176))

**Bug Fixes**

- Removed outline of `EuiSelect` in Firefox ([#3197] (https://github.com/elastic/eui/pull/3197))
- Fixed EuiBasicTable proptypes of itemId ([#3133](https://github.com/elastic/eui/pull/3133))
- Updated `EuiSuperDatePicker` to inherit the selected value in quick select ([#3105](https://github.com/elastic/eui/pull/3105))

### Feature: EuiCollapsibleNav ([#3019](https://github.com/elastic/eui/pull/3019))

- Added `EuiCollapsibleNav` and `EuiCollapsibleNavGroup` components
- Added `EuiPinnableListGroup`, an extension of `EuiListGroup`
- Added `ghost` colored `EuiListGroupItem`, increased overall large size, and fixed focus states
- Added `color` and `size` props to `EuiListGroup`
- Added `home` and `menu` glyphs to `EuiIcon`
- Added simple `euiXScroll` and `euiYScroll` SASS mixins and CSS utility equivalents

**Bug Fixes**

- Fixed `EuiAccordion` icon margins, focus state, and flex issue in IE
- Fixed `1.1px` height of  `EuiHorizontalRule`

## [`22.1.1`](https://github.com/elastic/eui/tree/v22.1.1)

**Bug Fixes**

- Fixed infinite call stack in `EuiResizeObserver`'s fallback polyfill ([#3180](https://github.com/elastic/eui/pull/3180))
- Correct `defaultProps` definition in `EuiComboBox` ([#3180](https://github.com/elastic/eui/pull/3180))

## [`22.1.0`](https://github.com/elastic/eui/tree/v22.1.0)

- Added `delimiter` prop to `EuiComboBox` ([#3104](https://github.com/elastic/eui/pull/3104))
- Added `useColorPickerState` and `useColorStopsState` utilities ([#3067](https://github.com/elastic/eui/pull/3067))
- Fixed `EuiSearchBar` related types ([#3147](https://github.com/elastic/eui/pull/3147))
- Added `prepend` and `append` ability to `EuiSuperSelect` ([#3167](https://github.com/elastic/eui/pull/3167))

**Bug Fixes**

- Fixed `EuiNavDrawer` scrolling issue on mobile ([#3174](https://github.com/elastic/eui/pull/3174))

## [`22.0.0`](https://github.com/elastic/eui/tree/v22.0.0)

- Replaced various `lodash` functions with native functions ([#3053](https://github.com/elastic/eui/pull/3053))
- Added `whiteSpace ` prop to `EuiCodeBlock` ([#3103](https://github.com/elastic/eui/pull/3103))
- Added `sortMatchesBy` prop for `EuiComboBox` ([#3089](https://github.com/elastic/eui/pull/3089))
- Added `prepend` and `append` ability to `EuiFieldPassword` ([#3122](https://github.com/elastic/eui/pull/3122))
- Added `Enter` key press functionality to `EuiSuperDatePicker` ([#3048](https://github.com/elastic/eui/pull/3048))
- Added `title` to headers of `EuiTable` in case of truncation ([#3094](https://github.com/elastic/eui/pull/3094))
- Added i18n to `EuiTableHeaderCell` ([#3094](https://github.com/elastic/eui/pull/3094))
- Added `number` and `string` to `size` type of `EuiImage` for setting custom sizes ([#3012](https://github.com/elastic/eui/pull/3012))
- Improved `EuiButtonEmpty` focus state when the `color` type is `text` ([#3135](https://github.com/elastic/eui/pull/3135))
- Added `EuiLoadingElastic` component ([#3017](https://github.com/elastic/eui/pull/3017))
- Upgraded `react-beautiful-dnd` to v13 ([#3064](https://github.com/elastic/eui/pull/3064))
- Fixed `EuiPagination` vertical alignment of the text when used as `compressed` ([#3152](https://github.com/elastic/eui/pull/3152))
- Added `showTooltip` prop for `EuiSuperUpdateButton` to show tooltip and showing only once popovers are closed ([#3127](https://github.com/elastic/eui/pull/3127))

**Bug Fixes**

- Fixed bug in `EuiSuperDatePicker` not showing correct values in relative tab of end date ([#3132](https://github.com/elastic/eui/pull/3132))
- Fixed bug in `EuiSuperDatePicker` to show correct values of commonly used values in relative tab ([#3106](https://github.com/elastic/eui/pull/3106))
- Fixed race condition in `EuiIcon` when switching from dynamically fetched components ([#3118](https://github.com/elastic/eui/pull/3118))
- Fixed the issue that `EuiResizeObserver` fallback did not properly listen to pure window resizing ([#3088](https://github.com/elastic/eui/pull/3088))

**Breaking changes**

- Removed `EuiKeyPadMenuItemButton` in favor of just `EuiKeyPadMenuItem` that can also accept an `onClick` ([#3062](https://github.com/elastic/eui/pull/3062))

## [`21.1.0`](https://github.com/elastic/eui/tree/v21.1.0)

- Updated `EuiFilterSelect` to retain the order of its filters ([#3063](https://github.com/elastic/eui/pull/3063))
- Added `href` prop to `EuiBadge` ([#3009](https://github.com/elastic/eui/pull/3009))
- Added props descriptions for `EuiComboBox` ([#3007](https://github.com/elastic/eui/pull/3007))
- Exported `dateFormatAliases` as a part of the public API ([#3043](https://github.com/elastic/eui/pull/3043))
- Exported `EuiTextProps` type definition ([#3039](https://github.com/elastic/eui/pull/3039))
- Added a `component` prop to `EuiForm` to render a `<form>`([#3010](https://github.com/elastic/eui/pull/3010))
- Removed `role` attribute from `EuiImage`([#3036](https://github.com/elastic/eui/pull/3036))
- Added `prepend` and `append` ability to `EuiComboBox` single selection only ([#3003](https://github.com/elastic/eui/pull/3003))
- Added `onColumnResize` prop to `EuiDataGrid` of type `EuiDataGridOnColumnResizeHandler` that gets called when column changes it's size ([#2963](https://github.com/elastic/eui/pull/2963))
- Added `logoEnterpriseSearch` to `EuiIcon` ([#3066](https://github.com/elastic/eui/pull/3066))
- Added RGB format support to `EuiColorPicker` and `EuiColorStops` ([#2850](https://github.com/elastic/eui/pull/2850))
- Added alpha channel (opacity) support to `EuiColorPicker` and `EuiColorStops` ([#2850](https://github.com/elastic/eui/pull/2850))
- Added `useResizeObserver` hook ([#2991](https://github.com/elastic/eui/pull/2991))
- Added `showColumnSelector.allowHide` and `showColumnSelector.allowReorder` props to `EuiDataGrid` UI configuration ([#2993](https://github.com/elastic/eui/pull/2993))
- Added `EuiMark` component ([#3060](https://github.com/elastic/eui/pull/3060))
- Changed `tabs.name` prop shape in `EuiTabbedContent` to accept a `node`, which aligns it with `EuiTab` ([#3100](https://github.com/elastic/eui/pull/3100))

**Bug Fixes**

- Fixed `EuiFieldNumber` so values of type `number` are now allowed ([#3020](https://github.com/elastic/eui/pull/3020))
- Fixed SASS `contrastRatio()` function in dark mode by fixing the `pow()` math function ([#3013], (https://github.com/elastic/eui/pull/3013))
- Fixed bug preventing `EuiDataGrid` from re-evaluating the default column width on resize ([#2991](https://github.com/elastic/eui/pull/2991))
- Fixed padding in `EuiCallOut` when used as a `banner` for `EuiFlyout` ([#3098](https://github.com/elastic/eui/pull/3098))

## [`21.0.1`](https://github.com/elastic/eui/tree/v21.0.1)

**Bug Fixes**

- Made `EuiDataGrid`'s `schema.isSortable` value optional ([#2991](https://github.com/elastic/eui/pull/2991))

## [`21.0.0`](https://github.com/elastic/eui/tree/v21.0.0)

- Added `EuiDataGrid`'s default sort order property ([#2987](https://github.com/elastic/eui/pull/2987))
- Fixed `EuiDataGrid`'s pagination visibility when changing rows per page ([#2978](https://github.com/elastic/eui/pull/2978))
- Added `highlightAll` prop to `EuiHighlight` to highlight all matches ([#2957](https://github.com/elastic/eui/pull/2957))
- Added `showOnFocus` prop to `EuiScreenReaderOnly` to force display on keyboard focus ([#2976](https://github.com/elastic/eui/pull/2976))
- Added `EuiSkipLink` component ([#2976](https://github.com/elastic/eui/pull/2976))
- Created `EuiBadgeGroup` component ([#2921](https://github.com/elastic/eui/pull/2921))
- Added `sections` and `position` props to `EuiHeader` ([#2928](https://github.com/elastic/eui/pull/2928))
- Added `gutterSize` prop to `EuiListGroup` ([#2980](https://github.com/elastic/eui/pull/2980))
- Added `color` prop to `EuiListGroupItem` and updated size style ([#2980](https://github.com/elastic/eui/pull/2980))
- Added `enableAllColumns` to `EuiBasicTable` component ([#2906](https://github.com/elastic/eui/pull/2906))

**Bug Fixes**

- Fixed `EuiDataGrid`'s sort popover to behave properly on mobile screens ([#2979](https://github.com/elastic/eui/pull/2979))
- Fixed `EuiButton` and other textual components' disabled contrast ([#2874](https://github.com/elastic/eui/pull/2874))
- Fixed z-index conflict with cell popovers in `EuiDataGrid` while in full screen mode ([#2959](https://github.com/elastic/eui/pull/2959))
- Adjusted the header on `EuiDataGrid` to fix to the top within constrained containers and full screen mode  ([#2959](https://github.com/elastic/eui/pull/2959))
- Refactored `EuiDescribedFormGroup` to allow the content inside the `EuiTitle` to be accessible to screen reader users ([#2989](https://github.com/elastic/eui/pull/2989))

**Breaking changes**

- Updated `@types/react` and `@types/react-dom` to utilize React.RefCallback type instead of custom implementation ([#2929](https://github.com/elastic/eui/pull/2929))

**Theme: Amsterdam**

- Buttons have a new visual style ([#2874](https://github.com/elastic/eui/pull/2874))

## [`20.1.0`](https://github.com/elastic/eui/tree/v20.1.0)

- Added `theme` prop to `EuiCodeEditor` in support of `AceEditor` themes ([#2970](https://github.com/elastic/eui/pull/2970))
- `EuiButton` now has a single return statement ([#2954](https://github.com/elastic/eui/pull/2954))
- Added `isSortable` props to `EuiDataGridColumn` and `EuiDataGridSchemaDetector` to mark them as un-sortable ([#2952](https://github.com/elastic/eui/pull/2952))
- Converted `EuiForm` to TypeScript, added many missing `/form` Prop types ([#2896](https://github.com/elastic/eui/pull/2896))
- Empty table th elements replaced with td in `EuiTable` ([#2934](https://github.com/elastic/eui/pull/2934))
- Added default prompt text to `aria-describedby` for `EuiFilePicker` ([#2919](https://github.com/elastic/eui/pull/2919))
- Added SASS variables for text variants of the primary palette `$euiColorPrimaryText`, `$euiColorSecondaryText`, etc... Updated components to use these new variables ([#2873](https://github.com/elastic/eui/pull/2873))
- Updated SASS mixin `makeHighContrastColor()` to default `$background: $euiPageBackgroundColor` and `$ratio: 4.5`. Created `makeGraphicContrastColor()` for graphic specific contrast levels of 3.0 ([#2873](https://github.com/elastic/eui/pull/2873))
- Added `arrowDisplay` prop to `EuiAccordion` for changing side or hiding completely ([#2914](https://github.com/elastic/eui/pull/2914))
- Added `prepend` and `append` ability to `EuiFieldSearch` ([#2914](https://github.com/elastic/eui/pull/2914))
- Added `notification` and `notificationColor` props to `EuiHeaderSectionItemButton` ([#2914](https://github.com/elastic/eui/pull/2914))
- Added `folderCheck`, `folderExclamation`, `push`, `quote`, `reporter` and `users` icons ([#2935](https://github.com/elastic/eui/pull/2935))
- Updated `folderClosed` and `folderOpen` to match new additions and sit better on the pixel grid ([#2935](https://github.com/elastic/eui/pull/2935))
- Converted `EuiSearchBar` to Typescript ([#2909](https://github.com/elastic/eui/pull/2909))

**Bug fixes**

- Fixed `EuiDataGrid` breaking if invalid schema passed ([#2955](https://github.com/elastic/eui/pull/2955))
- Fixed `EuiTitle` not rendering child classes ([#2925](https://github.com/elastic/eui/pull/2925))
- Extended `div` element in `EuiFlyout` type ([#2914](https://github.com/elastic/eui/pull/2914))
- Fixed popover positioning service to be more lenient when positioning 0-width or 0-height content ([#2948](https://github.com/elastic/eui/pull/2948))

**Theme: Amsterdam**

- Text sizes are now based on a 14px base font size. Headings are now bold ([#2936](https://github.com/elastic/eui/pull/2936))
- Altered `secondary`, `accent` colors to be more saturated ([#2873](https://github.com/elastic/eui/pull/2873))

## [`20.0.2`](https://github.com/elastic/eui/tree/v20.0.2)

**Bug fixes**

- Fixed type definitions for `EuiComboBox` ([#2971](https://github.com/elastic/eui/pull/2971))

## [`20.0.1`](https://github.com/elastic/eui/tree/v20.0.1)

**Bug fixes**

- Added TypeScript definition for `EuiCodeEditor`'s accepting `react-ace` props ([#2926](https://github.com/elastic/eui/pull/2926))
- Added `@types/react-input-autosize` to project's `dependencies` ([#2930](https://github.com/elastic/eui/pull/2930))

## [`20.0.0`](https://github.com/elastic/eui/tree/v20.0.0)

- Converted `EuiComboBox`, `EuiComboBoxInput`, `EuiComboBoxPill`, `EuiComboBoxOptionsList`, `EuiComboBoxOption`, and `EuiComboBoxTitle` to TypeScript ([#2838](https://github.com/elastic/eui/pull/2838))
- Converted `EuiCodeEditor` to TypeScript ([#2836](https://github.com/elastic/eui/pull/2836))
- Converted `EuiCode` and `EuiCodeBlock` and to TypeScript ([#2835](https://github.com/elastic/eui/pull/2835))
- Converted `EuiFilePicker` to TypeScript ([#2832](https://github.com/elastic/eui/issues/2832))
- Exported `EuiSelectOptionProps` type ([#2830](https://github.com/elastic/eui/pull/2830))
- Added `paperClip` glyph to `EuiIcon` ([#2845](https://github.com/elastic/eui/pull/2845))
- Added `banner` prop to `EuiFlyoutBody` and updated `euiOverflowShadow` mixin ([#2837](https://github.com/elastic/eui/pull/2837))
- Updated `editorLink` icon ([#2866](https://github.com/elastic/eui/pull/2866))
- Added control columns to `EuiDataGrid` to support non-data columns like row selection and actions ([#2846](https://github.com/elastic/eui/pull/2846))
- Added `image` glyph to `EuiIcon` ([#2870](https://github.com/elastic/eui/pull/2870))
- Exported TS props from top level `EuiListGroupProps`, `EuiListGroupItemProps`, `EuiSelectableProps`,  `EuiSelectableOption`, `EuiSelectableOptionsListProps` ([#2869](https://github.com/elastic/eui/pull/2869))
- Extending `EuiSelectable[options]` type with correct HTML element ([#2869](https://github.com/elastic/eui/pull/2869))
- Added check mark to single selection `EuiComboBox` ([#2890](https://github.com/elastic/eui/pull/2890))
- Added `logoGoogleG` third-party logo to `EuiIcon` ([#2853](https://github.com/elastic/eui/pull/2853))
- Added Jest `modulesNameMapper` alias for `EuiIcon` using test environment mock ([#2878](https://github.com/elastic/eui/pull/2878))
- Removed `sinon` and `@types/sinon` as dependencies, and converted usages to `jest.fn` ([#2885](https://github.com/elastic/eui/pull/2885))

**Bug fixes**

- Fixed building dev & docs on Windows ([#2847](https://github.com/elastic/eui/pull/2847))
- Fixed screen reader discovery issues with `EuiBottomBar` and `EuiControlBar` ([#2861](https://github.com/elastic/eui/pull/2861))
- Fixed a bug in `EuiDataGrid` causing the first cell to autofocus if interactive ([#2872](https://github.com/elastic/eui/pull/2872))

**Breaking changes**

- Removed `visControls` and `visHeatmap` duplicate icons from docs ([#2908](https://github.com/elastic/eui/pull/2908))

## [`19.0.0`](https://github.com/elastic/eui/tree/v19.0.0)

- Added `cheer` glyph to `EuiIcon` ([#2814](https://github.com/elastic/eui/pull/2814))
- Added `tableCaption` prop to `EuiBasicTable` and improved the default one ([#2782](https://github.com/elastic/eui/pull/2782))
- Converted `EuiDescribedFormGroup` to TypeScript ([#2810](https://github.com/elastic/eui/pull/2810))
- Changed SASS comments to non-compiled comments in invisibles files ([#2807](https://github.com/elastic/eui/pull/2807))
- Optimized the third party logos Ceph, DropWizard, Golang, and Haproxy ([#2812](https://github.com/elastic/eui/pull/2812))
- Added `rowHeader` prop to `EuiBasicTable` to allow consumers to set the identifying cell in a row ([#2802](https://github.com/elastic/eui/pull/2802))
- Added prepend and append to `EuiColorPicker` ([#2819](https://github.com/elastic/eui/pull/2819))
- Improved `EuiDescribedFormGroup` accessibility by avoiding duplicated output in screen readers ([#2783](https://github.com/elastic/eui/pull/2783))
- Added optional `key` attribute to `EuiContextMenu` items and relaxed `name` attribute to allow any React node ([#2817](https://github.com/elastic/eui/pull/2817))
- Converted `EuiColorPicker` color conversion functions to `chroma-js` methods ([#2805](https://github.com/elastic/eui/pull/2805))
- Added `direction` parameter to `euiPaletteColorBlind()` for specifying lighter or darker (or both) alternates ([#2822](https://github.com/elastic/eui/pull/2822))
- Converted `EuiSideNav` to TypeScript ([#2818](https://github.com/elastic/eui/issues/2818))
- Added babel-transformed and partially mocked commonjs build (`test-env/`) to target Kibana's Jest environment ([#2698](https://github.com/elastic/eui/pull/2698))
- Altered styles of `EuiToken` and add added more token types to match ES field types of `tokenAlias`, `tokenDate`, `tokenGeo`, `tokenIP`, `tokenNested`, `tokenRange`, `tokenShape` ([#2758](https://github.com/elastic/eui/pull/2758))

**Bug fixes**

- Exported missing `EuiSelectProps` type ([#2815](https://github.com/elastic/eui/pull/2815))
- Fixed `EuiCode`'s & `EuiCodeBlock`'s ability to accept non-string children ([#2792](https://github.com/elastic/eui/pull/2792)) ([#2820](https://github.com/elastic/eui/pull/2820))
- Fixed `EuiSearchBar`, `Query`, and `AST`'s ability to accept literal parenthesis characters ([#2791](https://github.com/elastic/eui/pull/2791))
- Fixed coloring of input fields when autofill is on in Chrome ([#2798](https://github.com/elastic/eui/pull/2798))
- Moved `@types/enzyme` and `@types/react-virtualized` to `dependencies` status ([#2828](https://github.com/elastic/eui/pull/2828))
- Removed `@elastic/charts` from inclusion in `eui.d.ts` output ([#2828](https://github.com/elastic/eui/pull/2828))

**Breaking changes**

- Removed `idAria` prop from `EuiDescribedFormGroup` ([#2783](https://github.com/elastic/eui/pull/2783))
- Removed `EuiToken`'s `hideBorder` and `displayOptions` prop for applying `color`, `shape`, and `fill` props directly. Changed `fill` prop type from `boolean` to `light | dark | none` ([#2758](https://github.com/elastic/eui/pull/2758))

## [`18.3.0`](https://github.com/elastic/eui/tree/v18.3.0)

- Converted `EuiModal` and `EuiConfirmModal` to TypeScript ([#2742](https://github.com/elastic/eui/pull/2742))
- Converted `EuiTabs` to TypeScript ([#2717](https://github.com/elastic/eui/pull/2717))
- Converted `EuiFormRow` to TypeScript ([#2712](https://github.com/elastic/eui/pull/2712))
- Updated `logoAPM`, `logoSecurity` and `logoEnterpriseSearch`. Added `logoWorkplaceSearch` and `logoObservability` ([#2769](https://github.com/elastic/eui/pull/2769))
- Converted `EuiFilterButton` to TypeScript ([#2761](https://github.com/elastic/eui/pull/2761))
- Converted `EuiFilterSelectItem` to TypeScript ([#2761](https://github.com/elastic/eui/pull/2761))
- Converted `EuiFieldSearch` to TypeScript ([#2775](https://github.com/elastic/eui/pull/2775))
- Added `data-test-subj` to the `EuiContextMenuItem` in `EuiTablePagination` ([#2778](https://github.com/elastic/eui/pull/2778))
- Improved `EuiIcon` a11y by using a `title` and `aria-labelledby` ([#2786](https://github.com/elastic/eui/pull/2786))
- Improved compressed `EuiPagination` by including active and last page numbers ([#2779](https://github.com/elastic/eui/pull/2779))
- Converted `EuiSuperSelect` to TypeScript ([#2776](https://github.com/elastic/eui/pull/2776))

**Bug fixes**

- Increased column width on `EuiTableHeaderCellCheckbox` to prevent `EuiCheckbox`'s focus ring from getting clipped in `EuiBasicTable` ([#2770](https://github.com/elastic/eui/pull/2770))
- Fixed the display of `EuiButton` within `EuiControlBar` when `fill={true}` to be more consistent with other buttons ([#2781](https://github.com/elastic/eui/pull/2781))
- Fixed `EuiFormControlLayout` from overwriting className for `prepend` nodes.  ([#2796](https://github.com/elastic/eui/pull/2796))
- Fixed `useRenderToText` and `EuiButtonToggle` from attempting state updates on unmounted components ([#2797](https://github.com/elastic/eui/pull/2797))
- Refactored function and hook instantiation to fix drag action sluggishness in `EuiColorStops` ([#2557](https://github.com/elastic/eui/pull/2557))

**Deprecations**

- `EuiIcon`'s `logoEnterpriseSearch` type deprecated in favor of `logoWorkplaceSearch`
- `EuiIcon`'s `logoAPM` type deprecated in favor of `logoObservability`

## [`18.2.2`](https://github.com/elastic/eui/tree/v18.2.2)

**Note: this release is a backport containing changes originally made in `18.3.0`**

- Updated `logoAPM`, `logoSecurity` and `logoEnterpriseSearch`. Added `logoWorkplaceSearch` and `logoObservability` ([#2769](https://github.com/elastic/eui/pull/2769))

**Bug fixes**

- Fixed `useRenderToText` and `EuiButtonToggle` from attempting state updates on unmounted components ([#2797](https://github.com/elastic/eui/pull/2797))

**Deprecations**

- `EuiIcon`'s `logoEnterpriseSearch` type deprecated in favor of `logoWorkplaceSearch`
- `EuiIcon`'s `logoAPM` type deprecated in favor of `logoObservability`

## [`18.2.1`](https://github.com/elastic/eui/tree/v18.2.1)

**Bug fixes**

- Fixed `EuiFieldSearch`'s trigger of `onChange` when clearing the field value ([#2764](https://github.com/elastic/eui/pull/2764))

## [`18.2.0`](https://github.com/elastic/eui/tree/v18.2.0)

- Added `recentlyViewedApp` app icon to `EuiIcon` ([#2755](https://github.com/elastic/eui/pull/2755))

**Bug fixes**

- Fixed `EuiBasicTable` & `EuiInMemoryTable` to not un- and re-mount rows when toggling `loading` prop ([#2754](https://github.com/elastic/eui/pull/2754))

## [`18.1.0`](https://github.com/elastic/eui/tree/v18.1.0)

- Lightened `EuiBadge` hollow border color in dark mode ([#2746](https://github.com/elastic/eui/pull/2746))
- Added `minInputProps` and `maxInputProps` to supply more props to the inputs of `EuiDualRange` ([#2738](https://github.com/elastic/eui/pull/2738))
- Changed `EuiBadge` to use EUI palette colors ([#2455](https://github.com/elastic/eui/pull/2455))
- Darkened a few `euiPaletteColorBlind` colors ([#2455](https://github.com/elastic/eui/pull/2455))
- Fixed bug in `EuiCard` where button text was not properly aligned ([#2741](https://github.com/elastic/eui/pull/2741))
- Converted `EuiRange` to TypeScript ([#2732](https://github.com/elastic/eui/pull/2732))
- Converted `EuiDualRange` to TypeScript ([#2732](https://github.com/elastic/eui/pull/2732))
- Converted `EuiRangeInput` to TypeScript ([#2732](https://github.com/elastic/eui/pull/2732))
- Added `bellSlash` glyph to `EuiIcon` ([#2714](https://github.com/elastic/eui/pull/2714))
- Added `legend` prop to `EuiCheckboxGroup` and `EuiRadioGroup` to add `EuiFieldset` wrappers for title the groups ([#2739](https://github.com/elastic/eui/pull/2739))
- Changed `EuiNavDrawerFlyout` to close after child nav items are clicked ([#2749](https://github.com/elastic/eui/pull/2749))
- Changed `EuiNavDrawerFlyout` to trap focus while navigating via keyboard ([#2749](https://github.com/elastic/eui/pull/2749))
- Created a `euiPaletteColorBlindBehindText` variant of the color blind palette ([#2750](https://github.com/elastic/eui/pull/2750))
- Improved focus state of `EuiSwitch`, `EuiCheckbox`, `EuiRadio` and `EuiRange` ([#2745](https://github.com/elastic/eui/pull/2745))

**Bug fixes**

- Changed `EuiRadio` and `EuiCheckbox` labels to be `inline-block` ([#2739](https://github.com/elastic/eui/pull/2739))
- Fixed `EuiCheckboxGroup`'s `options` type to fully extend the `EuiCheckbox` type ([#2739](https://github.com/elastic/eui/pull/2739))

## [`18.0.0`](https://github.com/elastic/eui/tree/v18.0.0)

- Converted `EuiFieldText` to Typescript ([#2688](https://github.com/elastic/eui/pull/2688))
- Added `nested` glyph to `EuiIcon` ([#2707](https://github.com/elastic/eui/pull/2707))
- Added `tableLayout` prop to `EuiTable`, `EuiBasicTable` and `EuiInMemoryTable` to provide the option of auto layout ([#2697](https://github.com/elastic/eui/pull/2697))
- Converted `EuiSuggest` to Typescript ([#2692](https://github.com/elastic/eui/pull/2692))
- Converted `EuiErrorBoundary` to Typescript  ([#2690](https://github.com/elastic/eui/pull/2690))
- Updated `EuiNavDrawer` to accept React fragments ([#2710](https://github.com/elastic/eui/pull/2710))
- Added `EuiFormFieldset` and `EuiFormLegend` components ([#2706](https://github.com/elastic/eui/pull/2706))
- Adjusted colors of color blind viz palette ([#2686](https://github.com/elastic/eui/pull/2686))
- Converted `EuiSelect` to Typescript ([#2694](https://github.com/elastic/eui/pull/2694))
- Added `aggregate`, `pageSelect`, `pagesSelect`, `securitySignal`, `securitySignalDetected`, `securitySignalResolved` and `timeline` icons ([#2704](https://github.com/elastic/eui/pull/2704))
- Added `useDependentState` custom hook ([#2725](https://github.com/elastic/eui/pull/#2725))
- Added `isClearable` prop to `EuiFieldSearch` ([#2723](https://github.com/elastic/eui/pull/2723))

**Bug fixes**

- Fixed `isExpanded` property of nodes from `EuiTreeView` ([#2700](https://github.com/elastic/eui/pull/#2700))
- Added text selection to `EuiLink` button ([#2722](https://github.com/elastic/eui/pull/#2722))
- Fixed bug in `EuiDataGrid` where resizing columns changed the active DOM element ([#2724](https://github.com/elastic/eui/pull/#2724))
- Fixed position of scrollbar in `EuiCodeBlock` ([#2727](https://github.com/elastic/eui/pull/#2727))
- Fixed bug in `EuiDataGrid` that prevented the "Hide fields" popover from showing an updated column list ([#2725](https://github.com/elastic/eui/pull/#2725))

**Breaking changes**

- Changed accepted properties of the `color_palette` method to accept an array of colors ([#2686](https://github.com/elastic/eui/pull/#2686))
- Removed the `palette` export to export each palette function directly ([#2686](https://github.com/elastic/eui/pull/#2686))
- Changed the palette functions to be methods that accept a number of steps and removed `.colors` key ([#2686](https://github.com/elastic/eui/pull/#2686))

## [`17.3.1`](https://github.com/elastic/eui/tree/v17.3.1)

**Bug fixes**

- Fixed TS types and exports for `EuiTextArea` and `EuiFieldNumber` ([#2703](https://github.com/elastic/eui/pull/2703))

## [`17.3.0`](https://github.com/elastic/eui/tree/v17.3.0)

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

## [`17.2.1`](https://github.com/elastic/eui/tree/v17.2.1)

**Bug fixes**

- Changed package.json version to match sure our build scripts release the correct sequential number ([#2674](https://github.com/elastic/eui/pull/2674))

## [`17.1.3`](https://github.com/elastic/eui/tree/v17.1.3)

**NOTE: This release came out of order due to a release script error. It actually came after 17.2.0 and can be ignored in favor of 17.2.1**

- Reverted docs changes in `17.2.0` that caused the build script to die ([#2672](https://github.com/elastic/eui/pull/2672))

**Bug fixes**

- Removed TypeScript definitions in `*.test.tsx?` files from _eui.d.ts_ ([#2673](https://github.com/elastic/eui/pull/2673))

## [`17.2.0`](https://github.com/elastic/eui/tree/v17.2.0)

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

## [`17.1.2`](https://github.com/elastic/eui/tree/v17.1.2)

**Bug fixes**

- Fixed `EuiCodeEditor` custom mode file error by initializing with existing mode ([#2616](https://github.com/elastic/eui/pull/2616))
- Removed `EuiIcon` default titles ([#2632](https://github.com/elastic/eui/pull/2632))

## [`17.1.1`](https://github.com/elastic/eui/tree/v17.1.1)

**Bug fixes**

- Fixed screenreader text in `EuiTreeView` and added truncation ([#2627](https://github.com/elastic/eui/pull/2627))

## [`17.1.0`](https://github.com/elastic/eui/tree/v17.1.0)

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

## [`17.0.0`](https://github.com/elastic/eui/tree/v17.0.0)

**Breaking changes**

- Moved any shared component-level Sass variables and mixins into the `global_styling` directory ([#2551](https://github.com/elastic/eui/pull/2551))
- Reworked `euiPanel()` mixin to require the entirety of a selector (i.e. require the '.' in addition to the string) ([#2551](https://github.com/elastic/eui/pull/2551))
- Updated React peerDependencies to version 16.12 ([#2571](https://github.com/elastic/eui/pull/2571))
- Changed to generated `id` value for `EuiFormRow` to ensure uniqueness  ([#2588](https://github.com/elastic/eui/pull/2588))

## [`16.2.1`](https://github.com/elastic/eui/tree/v16.2.1)

**Bug fixes**

- Fixed label wrapping of `EuiSwitch` ([#2585](https://github.com/elastic/eui/pull/2585))
- Replaced `<p>` tag surrounding the label with a `<span>` tag in `EuiSwitch` to fix any inherited margin ([#2585](https://github.com/elastic/eui/pull/2585))
- Added the same padding from `EuiSelectableListItem` to the heading to fix alignment ([#2585](https://github.com/elastic/eui/pull/2585))
- Added exports for `EuiCheckboxType`, `EuiCheckboxGroupOption`, and `EuiCheckboxGroupIdToSelectedMap` types ([#2593](https://github.com/elastic/eui/pull/2593))
- Fixed `.euiHeaderLinks__mobileList` in `EuiHeaderLinks` to only display it on mobile ([#2590](https://github.com/elastic/eui/pull/#2590))
- Fixed `EuiAccordion` icon rotation when it is a child of another accordion so it doesn't inherit the rotation state of the parent ([#2595](https://github.com/elastic/eui/pull/#2595))

## [`16.2.0`](https://github.com/elastic/eui/tree/v16.2.0)

- Added `EuiCheckableCard` component, for radio buttons or checkboxes with complex child content ([#2555](https://github.com/elastic/eui/pull/2555))
- Updated `EuiCheckbox` and `EuiCheckboxGroup` to TypeScript ([#2555](https://github.com/elastic/eui/pull/2555))

**Bug fixes**

- Fixed `EuiSwitch` clicking on disabled label ([#2575](https://github.com/elastic/eui/pull/2575))
- Fixed `EuiComboBox` options list closing when clicking outside the component after scrolling ([#2589](https://github.com/elastic/eui/pull/2589))

## [`16.1.0`](https://github.com/elastic/eui/tree/v16.1.0)

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

## [`16.0.1`](https://github.com/elastic/eui/tree/v16.0.1)

**Bug fixes**

- `EuiSwitch` now passes `name` attribute into underlying `button` ([#2533](https://github.com/elastic/eui/pull/2533))

## [`16.0.0`](https://github.com/elastic/eui/tree/v16.0.0)

- Made `EuiCard` more accessible ([#2521](https://github.com/elastic/eui/pull/2521))
- Added ability to pass `children` to `EuiCard` ([#2521](https://github.com/elastic/eui/pull/2521))
- Replaced root element in `EuiFlyout`, switching from `span` to `Fragment` ([#2527](https://github.com/elastic/eui/pull/2527))
- Upgraded `react-virtualized` to `9.21.2` ([#2531](https://github.com/elastic/eui/pull/2531))

**Bug fixes**

- Added support for `timeFormat` formatting in `EuiSuperDatePicker` and fixed some formatting inconsistencies ([#2518](https://github.com/elastic/eui/pull/2518))
- Added support for `locale` in `EuiSuperDatePicker` and `EuiDatePicker` both as a prop and from `EuiContext` ([#2518](https://github.com/elastic/eui/pull/2518))

**Breaking changes**

- Removed `EuiCardGraphic` ([#2521](https://github.com/elastic/eui/pull/2521))

## [`15.0.0`](https://github.com/elastic/eui/tree/v15.0.0)

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

## [`14.10.0`](https://github.com/elastic/eui/tree/v14.10.0)

- Added new `euiControlBar` component for bottom-of-screen navigational elements ([#2204](https://github.com/elastic/eui/pull/2204))
- Converted `EuiFlyout` to TypeScript ([#2500](https://github.com/elastic/eui/pull/2500))
- Added an animation to the arrow on `EuiAccordion` as it opens / closes ([#2507](https://github.com/elastic/eui/pull/2507))
- Upgraded `react-input-autosize` to `2.2.2` ([#2514](https://github.com/elastic/eui/pull/2514))

**Bug fixes**

- Simplified `EuiColorStops` popover toggling ([#2505](https://github.com/elastic/eui/pull/2505))

## [`14.9.0`](https://github.com/elastic/eui/tree/v14.9.0)

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

## [`14.8.0`](https://github.com/elastic/eui/tree/v14.8.0)

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

## [`14.7.0`](https://github.com/elastic/eui/tree/v14.7.0)

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

## [`14.6.0`](https://github.com/elastic/eui/tree/v14.6.0)

- Added new updated `infraApp` and `logsApp` icons ([#2430](https://github.com/elastic/eui/pull/2430))

**Bug fixes**

- Fixed missing misc. button and link type definition exports ([#2434](https://github.com/elastic/eui/pull/2434))
- Strip custom semantics from `EuiSideNav` ([#2429](https://github.com/elastic/eui/pull/2429))

## [`14.5.1`](https://github.com/elastic/eui/tree/v14.5.1)

**Note: this release is a backport containing changes originally made in `14.6.0` and `14.7.0`**

- Added new updated `infraApp` and `logsApp` icons ([#2430](https://github.com/elastic/eui/pull/2430))
- Made EuiIcon a PureComponent, to speed up React re-render performance ([#2448](https://github.com/elastic/eui/pull/2448))

**Bug fixes**

- Fixed `EuiNavDrawer` collapse/expand button height issue ([#2463](https://github.com/elastic/eui/pull/2463))

## [`14.5.0`](https://github.com/elastic/eui/tree/v14.5.0)

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

## [`14.4.0`](https://github.com/elastic/eui/tree/v14.4.0)

- Migrate `EuiEmptyPrompt`and `EuiCard` to TS ([#2387](https://github.com/elastic/eui/pull/2387))
- Added Lens app `lensApp` icon ([#2389](https://github.com/elastic/eui/pull/2389))
- Made `EuiKeyPadMenuItem` beta badge smaller ([#2388](https://github.com/elastic/eui/pull/2388))

## [`14.3.0`](https://github.com/elastic/eui/tree/v14.3.0)

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

## [`13.8.2`](https://github.com/elastic/eui/tree/v13.8.2)

**Bug fixes**

- Corrected `EuiCodeBlock`'s proptype for `children` to be string or array of strings ([#2324](https://github.com/elastic/eui/pull/2324))
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
- Improved fix for `EuiSuperDatePicker` to update `asyncInterval.isStopped` on a `isPaused` prop change ([#2298](https://github.com/elastic/eui/pull/2298))

**Bug fixes**

- Removed extra right side margin in `EuiSuperDatePicker` ([#2236](https://github.com/elastic/eui/pull/2236))
- Fixed incorrect `onClick` type for `EuiButtonEmpty` ([#2282](https://github.com/elastic/eui/pull/2282))
- Fixed compilation script to remove all TypeScript definition exports from built JS assets ([#2279](https://github.com/elastic/eui/pull/2279))
- Fixed output extension for `dist` charts theme module ([#2294](https://github.com/elastic/eui/pull/2294))

## [`13.7.0`](https://github.com/elastic/eui/tree/v13.7.0)

- Allow `EuiFlexGroup` to accept a `ref` ([#2223](https://github.com/elastic/eui/pull/2223))

**Bug fixes**

- Fixed `EuiSuperDatePicker` to update `asyncInterval.isStopped` on a `isPaused` prop change ([#2250](https://github.com/elastic/eui/pull/2250))
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
- Added locking behavior of `EuiNavDrawer` expanded state including the following props `isLocked`, `onIsLockedUpdate` ([#2247](https://github.com/elastic/eui/pull/2247))

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
- Fixed error message when an I18n mapping is a formatting function with no values provided ([#2182](https://github.com/elastic/eui/pull/2182))

## [`13.1.0`](https://github.com/elastic/eui/tree/v13.1.0)

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

- Removed `EuiSeriesChart` and related components. Please look to [Elastic Charts](https://github.com/elastic/elastic-charts) for a replacement ([#2135](https://github.com/elastic/eui/pull/2108))
- Removed `eui_k6_theme` related Sass and JSON files ([#2135](https://github.com/elastic/eui/pull/2108))
- Removed no longer used Sass mixins and variables in `EuiForm`, `EuiCallOut`, and `EuiRange` components ([#2135](https://github.com/elastic/eui/pull/2108))

## [`12.4.0`](https://github.com/elastic/eui/tree/v12.4.0)

- Centered the square of the `popout` glyph in the artboard ([#2120](https://github.com/elastic/eui/pull/2120))
- Added `useInnerText` and `EuiInnerText` component utilities for retrieving text content of elements ([#2100](https://github.com/elastic/eui/pull/2100))
- Converted `EuiRangeHighlight`, `EuiRangeLabel`, `EuiRangeLevels`, `EuiRangeSlider`, `EuiRangeThumb`, `EuiRangeTicks`, `EuiRangeTrack`, and `EuiRangeWrapper` to TypeScript ([#2124](https://github.com/elastic/eui/pull/2124))
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
- Added width to `EuiFlexItem` when gutter in `EuiFlexGrid` is set to none ([#1941](https://github.com/elastic/eui/pull/1941))
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

- Replaced the following SASS mixins `euiOverflowShadowTop`, `euiOverflowShadowBottom` with `euiOverflowShadow` ([#1829](https://github.com/elastic/eui/pull/1829))


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
- Fixed `EuiButton` font size inheritance ([#1760](https://github.com/elastic/eui/pull/1760))
- Updated button elements in `EuiFilePicker`, `EuiFormControlLayoutClearButton`, `EuiFormControlLayoutCustomIcon`, `EuiListGroupItem`, and `EuiSideNavItem` to type=button ([#1764](https://github.com/elastic/eui/pull/1764))
- Fixed outside click detection inconsistencies by comparing `mouseup` and `mousedown` event targets rather than using `click` event target ([#1761](https://github.com/elastic/eui/pull/1761))

## [`9.5.0`](https://github.com/elastic/eui/tree/v9.5.0)

- Changed `EuiSuperDatePicker` to call `onRefresh` instead of `onTimeChanged` when user clicks "Refresh" button ([#1745](https://github.com/elastic/eui/pull/1745))
- Added a new `EuiLoadingContent` component that displays blocks as placeholders for text ([#1730](https://github.com/elastic/eui/pull/1730))
- Added documentation entry in `EuiPagination` for `activePage` prop ([#1740](https://github.com/elastic/eui/pull/1740))
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
- Fixed `EuiComboBox` `activeOptionIndex` error with empty search results ([#1695](https://github.com/elastic/eui/pull/1695))
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
- Adjusted set of Elastic Logos in `EuiIcon` to look better in dark mode ([#1462](https://github.com/elastic/eui/pull/1562))
- Added `isCopyable` prop to `EuiCodeBlock` ([#1556](https://github.com/elastic/eui/pull/1556))
- Added optional `Snippet` tab to docs and renamed demo tabs ([#1556](https://github.com/elastic/eui/pull/1556))
- Expanded `getSecureRelForTarget` to handle elastic.co domains as a referrer whitelist ([#1565](https://github.com/elastic/eui/pull/1565))
- New `url` utility for verifying if a URL is a referrer whitelist ([#1565](https://github.com/elastic/eui/pull/1565))
- Add iconSize to ButtonIcon type definition ([#1568](https://github.com/elastic/eui/pull/1568))

## [`7.0.0`](https://github.com/elastic/eui/tree/v7.0.0)

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
- Fixed `EuiComboBox` `activeOptionIndex` error with empty search results ([#1695](https://github.com/elastic/eui/pull/1695))
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

- Adjusted set of Elastic Logos in `EuiIcon` to look better in dark mode ([#1562](https://github.com/elastic/eui/pull/1562))
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
- Fixed `EuiSuperDatePicker` not passing `refreshInterval` to callback when refresh interval start/stop toggle button clicked ([#1464](https://github.com/elastic/eui/pull/1464))
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

- Downgraded `@types/react` and `@types/prop-types` versions to align with Kibana ([#1435](https://github.com/elastic/eui/pull/1435))

## [`6.3.0`](https://github.com/elastic/eui/tree/v6.3.0)

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

- Moved `EuiExpressionButton` contents to `EuiExpression` and deleted `EuiExpressionButton`. Also added support for `color` and `uppercase` props as well as made `onClick` optional to support read only expressions ([#1368](https://github.com/elastic/eui/pull/1368))

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
- Revert ([#1353](https://github.com/elastic/eui/pull/1353)) `onBlur` action on `EuiComboBox`. It caused regressions on Kibana ([#1363](https://github.com/elastic/eui/pull/1363))

## [`5.5.1`](https://github.com/elastic/eui/tree/v5.5.1)

**Bug fixes**

- Fixed TypeScript definitions in `eui.d.ts` ([#1359](https://github.com/elastic/eui/pull/1359))

## [`5.5.0`](https://github.com/elastic/eui/tree/v5.5.0)

**Note: this release broke the exported TypeScript definitions and `EuiComboBox` in certain situations. These are both fixed in `5.6.0`.**

- Altered functionality of `truncate` on `EuiBreadcrumbs` and added `truncate` ability on breadcrumb item ([#1346](https://github.com/elastic/eui/pull/1346))
- Altered `EuiHeader`'s location of `EuiHeaderBreadcrumbs` based on the new `truncate` ability ([#1346](https://github.com/elastic/eui/pull/1346))
- Added support for `href` and `target` props in `EuiBasicTable` actions ([#1347](https://github.com/elastic/eui/pull/1347))
- Added `.eui-textBreakWord` CSS utility class  ([#1349](https://github.com/elastic/eui/pull/1349))
- Added support for `EuiComboBox` converting entered text into a custom option when the user removes focus, e.g. by tabbing to another element. This prevents the `EuiComboBox` from being mistaken for an `EuiInputText` ([#1353](https://github.com/elastic/eui/pull/1353))

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

- Added TypeScript definitions for `EuiToolTip`'s `delay` prop ([#1284](https://github.com/elastic/eui/pull/1284))
- Added TypeScript definitions for step components, and some checkbox definition fixes ([#1263](https://github.com/elastic/eui/pull/1263))

**Framer X**

- Added Framer component for `EuiDescriptionList` ([#1276](https://github.com/elastic/eui/pull/1276))

## [`4.7.0`](https://github.com/elastic/eui/tree/v4.7.0)

- Added `apmTrace` icon to `EuiIcon` set ([#1263](https://github.com/elastic/eui/pull/1263))
- Added [Framer X](http://www.framer.com) component source files under the `src-framer` directory ([#1263](https://github.com/elastic/eui/pull/1263))
- Added `compressed` prop to `EuiComboBox` ([#1258](https://github.com/elastic/eui/pull/1258))
- Added guidelines for Sass usage ([#1257](https://github.com/elastic/eui/pull/1257))

**Bug fixes**

- `EuiComboBox` no longer throws a _Maximum update depth exceeded_ error when used in popovers/modals ([#1258](https://github.com/elastic/eui/pull/1258))
- `Escape` key now closes `EuiComboBox` options list ([#1258](https://github.com/elastic/eui/pull/1258))
- Fixed margin issue around `EuiFlexGrid` in mobile displays ([#1257](https://github.com/elastic/eui/pull/1257))
- Fixed positioning and padding display issue in `EuiRange` ([#1257](https://github.com/elastic/eui/pull/1257))
- Fixed `highContrastTextColor` SASS function to account for background lightness and exit possible infinite loops ([#1275](https://github.com/elastic/eui/pull/1275))

## [`4.6.1`](https://github.com/elastic/eui/tree/v4.6.1)

**Bug fixes**

- Added TypeScript definitions for `EuiFieldPassword` ([#1255](https://github.com/elastic/eui/pull/1255))
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
- Added TypeScript definitions for `EuiFieldNumber`, `EuiFormLabel` and `EuiSelect`, and fix the `EuiTextColor` definition ([#1240](https://github.com/elastic/eui/pull/1240))
- Added support for nodes as column headers in `EuiBasicTable` for supporting things like tooltips and localized text ([#1234](https://github.com/elastic/eui/pull/1234))

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
- Made `EuiBasicTable` rows keyboard-accessible when they are clickable ([#1206](https://github.com/elastic/eui/pull/1206))

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

- Decorated `pagination` _next_ and _previous_ buttons with `data-test-subj` ([#1182](https://github.com/elastic/eui/pull/1182))
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
- Added color and monotone icons for AWS and GCP ([#1135](https://github.com/elastic/eui/pull/1135))
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

- Fixed `EuiSeriesChart` overrides `react-vis` classes ([#1123](https://github.com/elastic/eui/pull/1123))

## [`3.5.1`](https://github.com/elastic/eui/tree/v3.5.1)

- Fixed a bug around `indeterminate` checkboxes ([#1110](https://github.com/elastic/eui/pull/1110))

## [`3.5.0`](https://github.com/elastic/eui/tree/v3.5.0)

- Added support for `indeterminate` to `EuiCheckbox` ([#1108](https://github.com/elastic/eui/pull/1108))

## [`3.4.0`](https://github.com/elastic/eui/tree/v3.4.0)

- Added typings for `EuiToolTip` and `EuiIconTip` ([#1087](https://github.com/elastic/eui/pull/1087))
- Added `spacesApp` logo to `EuiIcon` set ([#1065](https://github.com/elastic/eui/pull/1065))
- Added `!default` to border SASS props ([#1079](https://github.com/elastic/eui/pull/1079))
- Added `repositionOnScroll` prop to `EuiPopover` which enables repositioning the popover when the window is scrolled ([#1064](https://github.com/elastic/eui/pull/1064))
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

- Added `onTableChange` callback to `EuiInMemoryTable` which notifies on sorting and pagination changes ([#1060](https://github.com/elastic/eui/pull/1060))
- `EuiComboBox` now applies the provided `data-test-subj` to its options list element with the suffix `-optionsList` so you can find a specific combo box instance's options list. This wasn't previously possible because the options list is attached to the body element, not the combo box element. This is in addition to the existing `data-test-subj="comboBoxOptionsList"` ([#1054](https://github.com/elastic/eui/pull/1054))
- EUI now provides minified versions of the themes' CSS files ([#1070](https://github.com/elastic/eui/pull/1070))

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

- Removed IE flex column fix in favor of forcing the consumer to add a `grow` prop ([#1044](https://github.com/elastic/eui/pull/1044))
- Removed max-width to children of `EuiPopover` ([#1044](https://github.com/elastic/eui/pull/1044))

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
- Make utility type `Omit` compatible with new `keyof` behavior introduced in TypeScript 2.9 ([#1017](https://github.com/elastic/eui/pull/1017))
- Added visualization chart type icons ([#1020](https://github.com/elastic/eui/pull/1020))

**Bug fixes**

- Fixed `EuiContextMenu` causing scroll-jumps because of premature browser focus ([#1018](https://github.com/elastic/eui/pull/1018))

## [`3.0.0`](https://github.com/elastic/eui/tree/v3.0.0)

- Fixed `EuiHeader` responsive styles ([#1009](https://github.com/elastic/eui/pull/1009))
- Added `prepend` and `append` props to `EuiFormControlLayout` ([#961](https://github.com/elastic/eui/pull/961))
- Updated style implementation of `EuiFilterGroup` and `EuiFilterGroupButton` ([#961](https://github.com/elastic/eui/pull/961))
- Added `EuiDatePickerRange` as a way to layout two `EuiDatePicker`s ([#961](https://github.com/elastic/eui/pull/961))
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
- Fixed white square that show in double scrollbar via `euiScrollBar()` ([989](https://github.com/elastic/eui/pull/989))
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
- Add `inspect` type option to icon typedef file ([#952](https://github.com/elastic/eui/pull/952))
- Simplified form control styles ([#954](https://github.com/elastic/eui/pull/954))

**Bug fixes**

- `EuiPopover` now positions popover content over all other elements, instead of sometimes clipping ([#948](https://github.com/elastic/eui/pull/948))
- `EuiOnClickOutside` works with child components rendered via React portals ([#948](https://github.com/elastic/eui/pull/948))

**Deprecations**

- Replaced the following SASS variables have been replaced `$euiFormControlHeight--compressed`, `$euiFormControlPadding--compressed`, `euiFormBorderColor--disabled` ([#954](https://github.com/elastic/eui/pull/954))

## [`1.0.0`](https://github.com/elastic/eui/tree/v1.0.0)

- Reduced font sizes of `EuiAvatar` ([#945](https://github.com/elastic/eui/pull/945))
- Changed release process to be fully automated by script ([#944](https://github.com/elastic/eui/pull/944))

**Bug fixes**

- `EuiTooltip` re-positions content correctly after the window is resized ([#936](https://github.com/elastic/eui/pull/936))
- `EuiComboBox` list is positioned correctly in IE ([#946](https://github.com/elastic/eui/pull/946))

## [`0.0.55`](https://github.com/elastic/eui/tree/v0.0.55)

- Added `getPopoverScreenCoordinates` service function for positioning popover/tooltip content, updated `EuiToolTip` to use it ([#924](https://github.com/elastic/eui/pull/924))
- Allow `mode` prop in `EuiCodeEditor` to take custom mode object ([#935](https://github.com/elastic/eui/pull/935))
- `EuiCodeEditor` is now decorated with a `data-test-subj` selector (`codeEditorContainer`) ([#939](https://github.com/elastic/eui/pull/939))
- `EuiCodeEditor` no longer automatically scrolls cursor into view on selection change ([#940](https://github.com/elastic/eui/pull/940))

## [`0.0.54`](https://github.com/elastic/eui/tree/v0.0.54)

**Bug fixes**

- `EuiTabbedContent` now updates dynamic tab content when used as an uncontrolled component ([#931](https://github.com/elastic/eui/pull/931))

## [`0.0.53`](https://github.com/elastic/eui/tree/v0.0.53)

- `EuiComboBox` is now decorated with `data-test-subj` selectors for the search input (`comboBoxSearchInput`), toggle button (`comboBoxToggleListButton`), and clear button (`comboBoxClearButton`) ([#918](https://github.com/elastic/eui/pull/918))
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
- Added responsive helpers in the form of `EuiShowFor` and `EuiHideFor` components and corresponding CSS classes ([#909](https://github.com/elastic/eui/pull/909))

**Deprecations**

- Replaced `$breakpoints` in favor of better named `$euiBreakpoints` ([#909](https://github.com/elastic/eui/pull/909))
- Replaced the following mixin `screenXSmall()`, `screenSmall()`, `screenMedium()`, `screenLarge()`, `screenSmallMediumLarge()` in favor of a single `euiBreakpoint()` ([#909](https://github.com/elastic/eui/pull/909))

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
- Added `offline` and `online` icons ([#881](https://github.com/elastic/eui/pull/881))

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
- `EuiFormControlLayout` no longer has `onClear`, `iconSide`, or `onIconClick` props. Instead of `onClear` it now accepts a `clear` object of the shape `{ onClick }`. Instead of the icon props, it now accepts a single `icon` prop which be either a string or an object of the shape `{ type, side, onClick }` ([#866](https://github.com/elastic/eui/pull/866))
- `EuiBasicTable` and `EuiInMemoryTable` pass-through cell props (defined by the `columns` prop and the `cellProps` prop) used to be applied to the `div` inside of the `td` element. They're now applied directly to the `td` element ([#869](https://github.com/elastic/eui/pull/869))

## [`0.0.49`](https://github.com/elastic/eui/tree/v0.0.49)

**Bug fixes**

- `EuiInMemoryTable` now applies its search filter ([#851](https://github.com/elastic/eui/pull/851))
- `EuiInMemoryTable` and `EuiBasicTable` now pass unknown props through to their child ([#836](https://github.com/elastic/eui/pull/836))
- Added `EuiHeaderLinks` which allow you to construct navigation in the header in place of the app menu ([#844](https://github.com/elastic/eui/pull/844))
- `EuiPopover` will use an alert to warn the user it traps focus ([#844](https://github.com/elastic/eui/pull/844))

**Breaking changes**

- EUI requires React `16.3` or higher ([#849](https://github.com/elastic/eui/pull/849))
- `EuiHeaderBreadcrumbs` refactored to use `EuiBreadcrumbs`. This removed all child components of `EuiHeaderBreadcrumbs` ([#844](https://github.com/elastic/eui/pull/844))

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

- Fixes height calculation error on `EuiAccordion` when it starts loads in an open state ([#816](https://github.com/elastic/eui/pull/816))
- Added aria-invalid labeling on `EuiFormRow` ([#777](https://github.com/elastic/eui/pull/799))
- Added aria-live labeling for `EuiToasts` ([#777](https://github.com/elastic/eui/pull/777))
- Added aria labeling requirements for `EuiBadge` , as well as a generic prop_type function `requiresAriaLabel` in `utils` to check for it ([#777](https://github.com/elastic/eui/pull/777)) ([#802](https://github.com/elastic/eui/pull/802))
- Ensure switches’ inputs are still hidden when `[disabled]` ([#778](https://github.com/elastic/eui/pull/778))
- Made boolean matching in `EuiSearchBar` more exact so it doesn't match words starting with booleans, like "truest" or "offer" ([#776](https://github.com/elastic/eui/pull/776))
- `EuiComboBox` do not setState or call refs once component is unmounted ([807](https://github.com/elastic/eui/pull/807) and [#813](https://github.com/elastic/eui/pull/813))
- Added better accessibility labeling to `EuiPagination`, `EuiSideNav`, `EuiPopover`, `EuiBottomBar` and `EuiBasicTable`.  ([#821](https://github.com/elastic/eui/pull/821))
- Added `isDisabled` to `EuiComboBox`  ([#829](https://github.com/elastic/eui/pull/829))

## [`0.0.46`](https://github.com/elastic/eui/tree/v0.0.46)

- Added `EuiDescribedFormGroup` component, a wrapper around `EuiFormRow`(s) ([#707](https://github.com/elastic/eui/pull/707))
- Added `describedByIds` prop to `EuiFormRow` to help with accessibility ([#707](https://github.com/elastic/eui/pull/707))
- Added `isLoading` prop to `EuiButtonEmpty` ([#768](https://github.com/elastic/eui/pull/768))
- Removed individual badge cross icon when `EuiComboBox` has `singleSelection` prop enabled ([#769](https://github.com/elastic/eui/pull/769))

**Bug fixes**

- Removed specificity on `EuiText` that was causing cascade conflicts around text coloring ([#770](https://github.com/elastic/eui/pull/770))

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
- Fixed card title sizing in K6 theme ([#704](https://github.com/elastic/eui/pull/704))

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
- Close `EuiComboBox` `singleSelection` options list when option is chosen ([#645](https://github.com/elastic/eui/pull/645))
- Wrap `EuiStepHorizontal` text instead of truncating it ([#653](https://github.com/elastic/eui/pull/653))
- Fixed a bug where `EuiSideNavItem` wouldn't pass an `onClick` handler down to `<a>` tags if they also had an `href` ([#664](https://github.com/elastic/eui/pull/664))
- Updated existing and added additional TypeScript definitions ([#666](https://github.com/elastic/eui/pull/666))

**Bug fixes**

- Fixed `EuiBasicTable` re-rendering on hover of table rows ([#665](https://github.com/elastic/eui/pull/665))

**Breaking changes**

- `EuiStepsHorizontal` now requires an `onClick` prop be provided for each step configuration object ([#653](https://github.com/elastic/eui/pull/653))

## [`0.0.40`](https://github.com/elastic/eui/tree/v0.0.40)

- Tweaked sizing, weights, color, line-heights, and added more levels to `EuiTitle` and `EuiText` ([#627](https://github.com/elastic/eui/pull/627))
- Added TypeScript type definitions for `EuiPortal`, `EuiText` and `EuiTitle` as well as the `calculatePopoverPosition` service ([#638](https://github.com/elastic/eui/pull/638))
- Grayed out labels for `disabled` controls ([#648](https://github.com/elastic/eui/pull/648))

**Bug fixes**

- Fix visual shadow glitch on hover of `EuiToast` ([#632](https://github.com/elastic/eui/pull/632))

**Breaking changes**

- **Note: This breaking change is reversed in 0.0.43.** Added a default `max-width` to `EuiText` ([#627](https://github.com/elastic/eui/pull/627))

## [`0.0.39`](https://github.com/elastic/eui/tree/v0.0.39)

**Bug fixes**

- Allow accordions to dynamically change height, and support values on radio inputs ([#613](https://github.com/elastic/eui/pull/613))
- Accordion toggle layout is no longer flagged responsive, in order to prevent unwanted stacking on mobile ([#613](https://github.com/elastic/eui/pull/613))

**Breaking changes**

- Support values on radio inputs. This is breaking because now the second argument to the radio `onChange` callback is the value, which bumps the change event to the third argument ([#613](https://github.com/elastic/eui/pull/613))

## [`0.0.38`](https://github.com/elastic/eui/tree/v0.0.38)

- Modified drop shadow intensities and color ([#607](https://github.com/elastic/eui/pull/607))
- Added SASS color functions. Made `$euiColorWarning` color usage more accessible while still being "yellow" ([#628](https://github.com/elastic/eui/pull/628))
- Removed extraneous `global_styling/mixins/_forms.scss` file and importing the correct files in the `filter_group.scss` and `combo_box.scss` files ([#609](https://github.com/elastic/eui/pull/609))
- Added `isInvalid` prop to `EuiComboBox` ([#631](https://github.com/elastic/eui/pull/631))
- Added support for rejecting user input by returning `false` from the `onCreateOption` prop of `EuiComboBox` ([#631](https://github.com/elastic/eui/pull/631))

**Bug fixes**

- Visual fix for the focus state of disabled `EuiButton` ([#603](https://github.com/elastic/eui/pull/603))
- `EuiSelect` can pass any node as a value rather than just a string ([#603](https://github.com/elastic/eui/pull/603))
- Fixed a typo in the flex TypeScript definition ([#629](https://github.com/elastic/eui/pull/629))
- Fixed `EuiComboBox` bug in which the options list wouldn't always match the width of the input ([#611](https://github.com/elastic/eui/pull/611))
- Fixed `EuiComboBox` bug in which opening the combo box when there's no scrollbar on the window would result in the list being positioned incorrectly ([#631](https://github.com/elastic/eui/pull/631))
- Fixed `EuiComboBox` bug in which clicking a pill's close button would close the list ([#631](https://github.com/elastic/eui/pull/631))
- Fixed `EuiComboBox` bug in which moving focus from one combo box to another would remove the `euiBody-hasPortalContent` class from the body ([#631](https://github.com/elastic/eui/pull/631))

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

- Add ability to force `EuiSideNav` items open by setting `item.forceOpen` ([#515](https://github.com/elastic/eui/pull/515))

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
- Change `EuiBasicTable` `noItemsMessage` and `EuiInMemoryTable` `message` propType to node
instead of just string ([#516](https://github.com/elastic/eui/pull/516))

## [`0.0.27`](https://github.com/elastic/eui/tree/v0.0.27)

- Don't propagate a null `onClick` on EuiPanels ([#473](https://github.com/elastic/eui/pull/473))
- Use 1.1px for the `EuiHorizontalRule` height, in order to work around strange Chrome height calculations ([#473](https://github.com/elastic/eui/pull/473))
- New icons for `logoGithub` and `logoSketch` ([#494](https://github.com/elastic/eui/pull/494))
- `EuiCard` now has an `href` and `isClickable` prop for better handling hover animations ([#494](https://github.com/elastic/eui/pull/494))
- Added `calculateContrast` and `rgbToHex` to services ([#494](https://github.com/elastic/eui/pull/494))

**Bug fixes**

- `EuiModal` is now responsive on mobile screens ([#512](https://github.com/elastic/eui/pull/512))
- `EuiFlexGrid` now collapses down in mobile layouts properly ([#515](https://github.com/elastic/eui/pull/515))
- Made `EuiCard` proptypes more permission by changing strings to nodes ([#515](https://github.com/elastic/eui/pull/515))
- Fixed `responsive={false}` prop not working when flex groups were nested ([#494](https://github.com/elastic/eui/pull/494))
- `EuiBadge` wrapping element changed from a `div` to `span` so it can be nested in text blocks ([#494](https://github.com/elastic/eui/pull/494))

## [`0.0.26`](https://github.com/elastic/eui/tree/v0.0.26)

**Bug fixes**

- `EuiSelect` do not set `defaultValue` property when `value` property is provided ([#504](https://github.com/elastic/eui/pull/504)).
- `EuiBottomBar` now uses `EuiPortal` to avoid z-index conflicts ([#487](https://github.com/elastic/eui/pull/487))
- Upped dark theme contrast on disabled buttons ([#487](https://github.com/elastic/eui/pull/487))

**Breaking changes**

- Removed `EuiTableOfRecords` ([#490](https://github.com/elastic/eui/pull/490))

## [`0.0.25`](https://github.com/elastic/eui/tree/v0.0.25)

- `EuiSearchBar` accepts `toolsLeft` and `toolsRight` props ([#458](https://github.com/elastic/eui/pull/458))
- Added `search.onChange` callback to `EuiInMemoryTable` ([#469](https://github.com/elastic/eui/pull/469))
- Added `initialPageSize` option to `EuiInMemoryTable` ([#477](https://github.com/elastic/eui/pull/477))
- Added design guidelines for button and toast usage ([#371](https://github.com/elastic/eui/pull/371))

**Breaking changes**

- Complete refactor of `EuiToolTip`. They now work. Only a breaking change if you were using them ([#484](https://github.com/elastic/eui/pull/484))

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
- Make full screen code block use the same font-size on the original code block ([#447](https://github.com/elastic/eui/pull/447))

**Bug fixes**

- Fixed `EuiContextMenu` bug when using the keyboard to navigate up, which was caused by unnecessarily re-rendering the items, thus losing references to them ([#431](https://github.com/elastic/eui/pull/431))

## [`0.0.22`](https://github.com/elastic/eui/tree/v0.0.22)

- Added `EuiDelayHide` component ([#412](https://github.com/elastic/eui/pull/412))
- Decreased overall size of checkbox, radio, and switches as well as better styles for the different states ([#407](https://github.com/elastic/eui/pull/407))
- Added `EuiFilePicker` component for `input type="file"` needs ([#402](https://github.com/elastic/eui/pedull/402))
- Added `isLoading` prop to `EuiButton` ([#427](https://github.com/elastic/eui/pull/427))
- Added icons: `eye`, `eyeClosed`, `grab`, `heatmap`, `vector` ([#427](https://github.com/elastic/eui/pull/427))
- Added `hasNoInitialSelection` option to `EuiSelect` ([#422](https://github.com/elastic/eui/pull/422))

**Bug fixes**

- Fixed appearance of checked checkboxes and radios in IE ([#407](https://github.com/elastic/eui/pull/407))
- Fixed disabled vs enabled appearance of checked checkboxes and radios ([#407](https://github.com/elastic/eui/pull/407))
- Fixed disabled & checked state of switches ([#407](https://github.com/elastic/eui/pull/407))
- Fixed `EuiCard` content alignment when content is short ([#415](https://github.com/elastic/eui/pull/415))
- Only apply the `$euiCodeBlockSelectedBackgroundColor` variable if it is a color ([#427](https://github.com/elastic/eui/pull/427))
- No margins for `<hr>` ([#427](https://github.com/elastic/eui/pull/427))
- Fixed `EuiButton` truncation ([#427](https://github.com/elastic/eui/pull/427))

**Breaking changes**

- Changed `EuiAccordion`’s method of `onToggleOpen` to `onToggle` ([#427](https://github.com/elastic/eui/pull/427))

## [`0.0.21`](https://github.com/elastic/eui/tree/v0.0.21)

- Logstash icon set. [#399](https://github.com/elastic/eui/pull/399)
- Added support for `disabled` options in `EuiSelect`. [#324](https://github.com/elastic/eui/pull/324)
- Badges can now accept onClicks and custom colors. They were changed stylistically to be bolder and smaller by default ([#381](https://github.com/elastic/eui/pull/381))
- Added component to wrap blocks of substeps `EuiSubSteps` in a shaded container ([#375](https://github.com/elastic/eui/pull/375))
- Added horizontal steps component ([#375](https://github.com/elastic/eui/pull/375))
- Changed look and feel of pagination. Added `compressed` prop for smaller footprint pagination ([#380](https://github.com/elastic/eui/pull/380))
- Added `EuiBasicTable` as an opinionated, high level component for constructing tables. Its addition deprecates `EuiTableOfRecords` which is still available, but now marked for removal ([#377](https://github.com/elastic/eui/pull/377))
- Added styles for `readOnly` states of form controls ([#391](https://github.com/elastic/eui/pull/391))
- Added importAction and exportAction icons ([#394](https://github.com/elastic/eui/pull/394))
- Added `EuiCard` for UI patterns that need an icon/image, title and description with some sort of action ([#380](https://github.com/elastic/eui/pull/380))
- Added TypeScript definitions for the `EuiHealth` component ([#403](https://github.com/elastic/eui/pull/403))
- Added `SearchBar` component - introduces a simple yet rich query language to search for objects + search box and filter controls to construct/manipulate it ([#379](https://github.com/elastic/eui/pull/379))

**Bug fixes**

- Tables now default to `table-layout: fixed` to avoid some collapsing cell problems. [#398](https://github.com/elastic/eui/pull/398)
- Wrap long lines of text within the body of `EuiToast` instead of letting text overflow ([#392](https://github.com/elastic/eui/pull/392))
- Fixed dark theme coloring of SubSteps ([#396](https://github.com/elastic/eui/pull/396))
- Reorder selectors to fix fixed progress bar in Firefox ([#404](https://github.com/elastic/eui/pull/404))

## [`0.0.20`](https://github.com/elastic/eui/tree/v0.0.20)

- Renamed class from `euiFlexGroup--alignItemsStart` to `euiFlexGroup--alignItemsFlexStart` ([#378](https://github.com/elastic/eui/pull/378))

## [`0.0.19`](https://github.com/elastic/eui/tree/v0.0.19)

- `EuiGlobalToastList` now prevents toasts from disappearing while the user's mouse is over the list. Added `timer/Timer` service ([#370](https://github.com/elastic/eui/pull/370))

**Bug fixes**

- **Note: This is deprecated in 0.0.21 and removed in 0.0.26.** `EuiTableOfRecords` selection bugs ([#365](https://github.com/elastic/eui/pull/365))
  - Deleting selected items now resets the select all checkbox to an unchecked state
  - The select all checkbox only becomes checked when all selectable rows are checked, not just some of them

**Breaking changes**

- Changed `EuiGlobalToastList` to be responsible for instantiating toasts, tracking their lifetimes, and dismissing them. It now accepts `toasts`, `dismissToast`, and `toastLifeTimeMs` props. It no longer accepts `children` ([#370](https://github.com/elastic/eui/pull/370))

## [`0.0.18`](https://github.com/elastic/eui/tree/v0.0.18)

**Bug fixes**

- Fixed `EuiCodeEditor` bug in which hitting ESCAPE to close the autocompletion suggestions menu would also exit editing mode ([#363](https://github.com/elastic/eui/pull/363))

## [`0.0.17`](https://github.com/elastic/eui/tree/v0.0.17)

**Bug fixes**

- Downgraded `lodash` version to `3.10.0` to align it with Kibana ([#359](https://github.com/elastic/eui/pull/359))

## [`0.0.16`](https://github.com/elastic/eui/tree/v0.0.16)

- `EuiRadio` now supports the `input` tag's `name` attribute. `EuiRadioGroup` accepts a `name` prop that will propagate to its `EuiRadio`s ([#348](https://github.com/elastic/eui/pull/348))
- Added Machine Learning create jobs icon set ([#338](https://github.com/elastic/eui/pull/338))
- **Note: This is deprecated in 0.0.21 and removed in 0.0.26.** Added `EuiTableOfRecords`, a higher level table component to take away all your table listings frustrations ([#250](https://github.com/elastic/eui/pull/250))

**Bug fixes**

- Added `react-color` as a dependency (was previously a devDependency) ([#354](https://github.com/elastic/eui/pull/354))
- Stop propagation and prevent default when closing components. Otherwise the same Escape keypress could close the parent component(s) as well as the one you intend to close ([#344](https://github.com/elastic/eui/pull/344))

## [`0.0.15`](https://github.com/elastic/eui/tree/v0.0.15)

- Added `EuiColorPicker` ([#328](https://github.com/elastic/eui/pull/328))
- `EuiCodeBlock` now only shows fullscreen icons if `overflowHeight` prop is set. Also forces large fonts and padding while expanded ([#325](https://github.com/elastic/eui/pull/325))
- Exported `VISUALIZATION_COLORS` from services ([#329](https://github.com/elastic/eui/pull/329))
- Added typescript definitions for `EuiFormRow`, `EuiRadioGroup`, `EuiSwitch`, `EuiLoadingSpinner`, `EuiLoadingChart` and `EuiProgress` ([#326](https://github.com/elastic/eui/pull/326))
- Added `checkHrefAndOnClick` and `getSecureRelForTarget` to services.

**Breaking changes**

- `EuiCodeBlock` now only shows fullscreen icons if `overflowHeight` prop is set. Also forces large fonts and padding while expanded ([#325](https://github.com/elastic/eui/pull/325))
- React ^16.2 is now a peer dependency ([#264](https://github.com/elastic/eui/pull/264))
- `EuiProgress` no longer accepts the `indeterminate` property, which never had any effect ([#326](https://github.com/elastic/eui/pull/326))

**Bug fixes**

- Fix TypeScript definitions such that optional and readonly properties survive being passed through `Omit` ([#322](https://github.com/elastic/eui/pull/322))

## [`0.0.14`](https://github.com/elastic/eui/tree/v0.0.14)

- Added `isColorDark` color util ([#311](https://github.com/elastic/eui/pull/311))
- EuiButton, EuiButtonEmpty and EuiButtonIcon can now take an `href` ([#316](https://github.com/elastic/eui/pull/316))
- In `EuiSideNav`, allow a callback to be passed that renders the individual items in the navigation. This makes interoperability with e.g. `react-router` easier ([#310](https://github.com/elastic/eui/pull/310))
- Add new icon types to `EuiIcon` TypeScript definitions ([#323](https://github.com/elastic/eui/pull/323)).

**Bug fixes**

- Set `EuiFlexGroup` to `flex-grow: 1` to be more friendly with IE11 ([#315](https://github.com/elastic/eui/pull/315))

## [`0.0.13`](https://github.com/elastic/eui/tree/v0.0.13)

- Added index management icons ([#307](https://github.com/elastic/eui/pull/307))

**Breaking changes**

- Reverted test helper for async functions that throw exceptions. See PR for details on how this can be handled in Jest 22 ([#306](https://github.com/elastic/eui/pull/306))

**Bug fixes**

- Adjust toast z-index to show over modals ([#296](https://github.com/elastic/eui/pull/296))
- Fix nested `EuiFlexItem` collapse issue in IE ([#308](https://github.com/elastic/eui/pull/308))

## [`0.0.12`](https://github.com/elastic/eui/tree/v0.0.12)

- Minor style-only changes to `EuiPagination`, button reset, `EuiTableHeaderCell`, and `EuiCodeBlock` ([#298](https://github.com/elastic/eui/pull/298))
- All NPM dependencies now use ^ to install the latest minor version.
- Added Apache, Nginx, MySQL logos ([#270](https://github.com/elastic/eui/pull/270))
- Added small version of `EuiCallOut` ([#269](https://github.com/elastic/eui/pull/269))
- Added first batch of TypeScript type definitions for components and services ([#252](https://github.com/elastic/eui/pull/252))
- Added button for expanding `EuiCodeBlock` instances to be full-screen ([#259](https://github.com/elastic/eui/pull/259))
- Add test helper for async functions that throw exceptions ([#301](https://github.com/elastic/eui/pull/301))

**Bug fixes**

- Removed padding on `EuiPage` mobile breakpoint ([#282](https://github.com/elastic/eui/pull/282))
- Fixed some `EuiIcon` `type`s not setting their `viewBox` attribute, which caused them to not honor the `size` properly ([#277](https://github.com/elastic/eui/pull/277))
- Fixed `EuiContextMenu` to pass the `event` argument to a `EuiContextMenuItem`'s `onClick` handler even when a panel is defined ([#265](https://github.com/elastic/eui/pull/265))

**Breaking changes**

- Removed `color` prop from `EuiCodeBlock`. This component's highlighting now matches whichever theme is currently active. See PR for details on SCSS breaking changes ([#259](https://github.com/elastic/eui/pull/259))

## [`0.0.11`](https://github.com/elastic/eui/tree/v0.0.11)

- Added `EuiImage` component to allow for image sizing and zooms ([#262](https://github.com/elastic/eui/pull/262))
- Updated `EuiOverlayMask` to append `<div>` to body ([#254](https://github.com/elastic/eui/pull/254))

**Bug fixes**

- Disabled tab styling ([#258](https://github.com/elastic/eui/pull/258))
- Proper className for flexGroup alignItems prop ([#257](https://github.com/elastic/eui/pull/257))
- Clicking the downArrow icon in `EuiSelect` now triggers selection ([#255](https://github.com/elastic/eui/pull/255))
- Fixed `euiFormRow` id's from being the same as the containing input and label ([#251](https://github.com/elastic/eui/pull/251))

**Breaking changes**

- `{rest}` prop attachment moved from wrapping div to the input on checkboxes and switches ([#246](https://github.com/elastic/eui/pull/246))

## [`0.0.10`](https://github.com/elastic/eui/tree/v0.0.10)

- Updated `euiPopover` to propagate `panelPaddingSize` padding values to content only (title does inherit horizontal values) via CSS ([#229](https://github.com/elastic/eui/pull/229))
- Updated `EuiErrorBoundary` to preserve newlines in error ([#238](https://github.com/elastic/eui/pull/238))
- Added more icons and fixed a few for dark mode ([#228](https://github.com/elastic/eui/pull/228))
- Added `EuiFlyout` component ([#227](https://github.com/elastic/eui/pull/227))

**Breaking changes**

- Renamed `EuiModalOverlay` to `EuiOverlayMask` ([#227](https://github.com/elastic/eui/pull/227))

**Bug fixes**

- Fixed bug in `Pager` service which occurred when there were no items ([#237](https://github.com/elastic/eui/pull/237))
- Added `isPageable` method to `Pager` service and set first and last page index to -1 when there are no pages ([#242](https://github.com/elastic/eui/pull/242))

## [`0.0.9`](https://github.com/elastic/eui/tree/v0.0.9)

**Breaking changes**

- Renamed `euiFlexGroup--alignItemsEnd` class to `euiFlexGroup--alignItemsFlexEnd`.
- Remove support for `primary` color from `EuiTextColor` because it looked too much like a link.

**Bug fixes**

- Give `EuiFormErrorText` and `EuiFormHelpText` proper line-height ([#234](https://github.com/elastic/eui/pull/234))

## [`0.0.8`](https://github.com/elastic/eui/tree/v0.0.8)

**Bug fixes**

- Fix button vertical alignment ([#232](https://github.com/elastic/eui/pull/232))

## [`0.0.7`](https://github.com/elastic/eui/tree/v0.0.7)

- Added `EuiSteps` component ([#202](https://github.com/elastic/eui/pull/202), [#208](https://github.com/elastic/eui/pull/208))

**Breaking changes**

- Test helpers now published at `@elastic/eui/lib/test`

**Bug fixes**

- Case sensitive file name fix for Kibana dark theme ([#216](https://github.com/elastic/eui/pull/216))

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
- Added a more systematic way to add themes; includes a new K6 theme for Kibana ([#191](https://github.com/elastic/eui/pull/191))

**Bug fixes**

- Fixed bug where screen-reader styles weren't being imported ([#103](https://github.com/elastic/eui/pull/103))
- Fixed a bug where `<progress>` wasn't being rendered under `block` display ([#166](https://github.com/elastic/eui/pull/166))
- Fixed a bug that caused `EuiPageSideBar` width to change when the width of its content changed ([#181](https://github.com/elastic/eui/pull/181))

**Breaking changes**

- Fixed a bug where table cell classes were being applied twice ([#167](https://github.com/elastic/eui/pull/167))
- React ^16.0 is now a peer dependency ([#198](https://github.com/elastic/eui/pull/198))

## [`0.0.3`](https://github.com/elastic/eui/tree/v0.0.3)

- `EuiFlexItem` now accepts integers between 1 and 10 for the `grow` prop ([#144](https://github.com/elastic/eui/pull/144))
- `EuiFlexItem` and `EuiFlexGrow` now accept a `component` prop which you can set to `span` or `div` (default) ([#141](https://github.com/elastic/eui/pull/141))
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
