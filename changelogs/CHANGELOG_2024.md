## [`v93.3.0`](https://github.com/elastic/eui/releases/v93.3.0)

- Added new `EuiDataGrid` new prop: `cellContext`, an optional object of additional props passed to the cell render function. ([#7374](https://github.com/elastic/eui/pull/7374))
- `EuiBreadcrumbs`'s `popoverContent` API now accepts a render function that will be passed a `closePopover` callback, allowing consumers to close the breadcrumb popover from their popover content ([#7555](https://github.com/elastic/eui/pull/7555))

**Bug fixes**

- Fixed missing animation on native `EuiProgress` bar update ([#7538](https://github.com/elastic/eui/pull/7538))
- Fixed an `EuiDataGrid` bug with `gridStyle.rowClasses`, where custom consumer classes that began with `euiDataGridRow` would not be correctly removed/reapplied ([#7549](https://github.com/elastic/eui/pull/7549))
- Fixed a visual `EuiDataGrid` bug where `EuiCheckbox`es within control columns were not vertically centered within single height rows ([#7549](https://github.com/elastic/eui/pull/7549))

## [`v93.2.0`](https://github.com/elastic/eui/releases/v93.2.0)

- Added `diff` glyph to `EuiIcon` ([#7520](https://github.com/elastic/eui/pull/7520))
- Updated `EuiPageSidebar` and `EuiPageTemplate.Sidebar` with a new `hasEmbellish` prop (defaults to false) ([#7521](https://github.com/elastic/eui/pull/7521))
- Added `newChat` glyph to `EuiIcon` ([#7524](https://github.com/elastic/eui/pull/7524))

**Bug fixes**

- Fixed `EuiSideNav` not correctly typing the `items` prop as required ([#7521](https://github.com/elastic/eui/pull/7521))
- Fixed the `CSS is not defined` bug in `EuiPageTemplate` when rendering in some SSR environments, particularly Next.js v13 and up ([#7525](https://github.com/elastic/eui/pull/7525))
- Fixed `EuiDataGrid` component to clean up timer from side effect on unmount ([#7534](https://github.com/elastic/eui/pull/7534))

**Accessibility**

- Fixed `EuiSideNav` to render a fallback aria-label on mobile toggles if no heading or mobile title exists ([#7521](https://github.com/elastic/eui/pull/7521))

**CSS-in-JS conversions**

- Converted `EuiSideNav` to Emotion; Removed the following Sass variables: ([#7521](https://github.com/elastic/eui/pull/7521))
  - `$euiSideNavEmphasizedBackgroundColor`
  - `$euiSideNavRootTextcolor`
  - `$euiSideNavBranchTextcolor`
  - `$euiSideNavSelectedTextcolor`
  - `$euiSideNavDisabledTextcolor`
- Removed the `euiSideNavEmbellish` Sass mixin. Use the new `EuiPageSidebar` `hasEmbellish` prop instead ([#7521](https://github.com/elastic/eui/pull/7521))
- Added a new memoization/performance optimization utility for CSS-in-JS styles ([#7529](https://github.com/elastic/eui/pull/7529))

## [`v93.1.1`](https://github.com/elastic/eui/releases/v93.2.0)

**This is a patch release primarily intended for use by Kibana.**

- Added top-level `EuiTreeView.Item` export ([#7526](https://github.com/elastic/eui/pull/7526))

## [`v93.1.0`](https://github.com/elastic/eui/releases/v93.1.0)

- Added `index` glyph to `EuiIcon` ([#7498](https://github.com/elastic/eui/pull/7498))
- Updated `EuiHighlight` to accept an array of `search` strings, which allows highlighting multiple, separate words within its children. This new type and behavior *only* works if `highlightAll` is also set to true. ([#7496](https://github.com/elastic/eui/pull/7496))
- Updated `EuiContextMenu` with a new `panels.items.renderItem` property, which allows rendering completely custom items next to standard `EuiContextMenuItem` objects ([#7510](https://github.com/elastic/eui/pull/7510))
- `EuiSuperDatePicker` updates:
  - Updated `EuiSuperDatePicker` with a new `refreshIntervalUnits` prop. Passing this prop allows controlling and overriding the default unit rounding behavior. ([#7501](https://github.com/elastic/eui/pull/7501))
  - Updated `EuiAutoRefresh` and `EuiRefreshInterval` with a new `intervalUnits` prop. Passing this prop allows controlling and overriding the default unit rounding behavior. ([#7501](https://github.com/elastic/eui/pull/7501))
  - Updated `onRefreshChange` to pass back a new `intervalUnits` key that contains the current interval unit format (seconds, minutes, or hours). ([#7501](https://github.com/elastic/eui/pull/7501))
  - Updated `EuiSuperDatePicker` with a new `canRoundRelativeUnits` prop, which defaults to true (current behavior). To preserve displaying the unit that users select for relative time, set this to false. ([#7502](https://github.com/elastic/eui/pull/7502))
  - Updated `EuiSuperDatePicker` with a new `refreshMinInterval` prop, which accepts a minimum number in milliseconds ([#7516](https://github.com/elastic/eui/pull/7516))
  - Updated `EuiAutoRefresh` and `EuiRefreshInterval` with a new `minInterval` prop, which accepts a minimum number in milliseconds ([#7516](https://github.com/elastic/eui/pull/7516))

**Bug fixes**

- Fixed `EuiHighlight` to not parse `search` strings as regexes ([#7496](https://github.com/elastic/eui/pull/7496))
- Fixed `EuiSuperDatePicker` submit bug when used within `<form>` elements ([#7504](https://github.com/elastic/eui/pull/7504))
- Fixed an `EuiTreeView` bug where `aria-expanded` was being applied to items without expandable children ([#7513](https://github.com/elastic/eui/pull/7513))

**CSS-in-JS conversions**

- Converted `EuiTreeView` to Emotion. Updates as part of the conversion: ([#7513](https://github.com/elastic/eui/pull/7513))
  - Removed `.euiTreeView__wrapper` div node
  - Enforced consistent `icon` size based on `display` size

## [`v93.0.0`](https://github.com/elastic/eui/releases/v93.0.0)

**Bug fixes**

- Fixed `EuiTextTruncate` component to clean up timer from side effect on unmount ([#7495](https://github.com/elastic/eui/pull/7495))

**Breaking changes**

- Removed deprecated `anchorClassName` prop from `EuiPopover`. Use `className` instead ([#7488](https://github.com/elastic/eui/pull/7488))
- Removed deprecated `buttonRef` prop from `EuiPopover`. Use `popoverRef` instead ([#7488](https://github.com/elastic/eui/pull/7488))
- Removed deprecated `toolTipTitle` and `toolTipPosition` props from `EuiContextMenuItem`. Use `toolTipProps.title` and `toolTipProps.position` instead ([#7489](https://github.com/elastic/eui/pull/7489))
- Removed deprecated internal `setSelection` ref method from `EuiInMemoryTable` and `EuiBasicTable`. Use the new controlled `selection.selected` prop API instead. ([#7491](https://github.com/elastic/eui/pull/7491))
- `EuiTourStep`'s `className` and `style` props now apply to the anchoring element instead of to the popover panel, to match `EuiPopover` behavior. ([#7497](https://github.com/elastic/eui/pull/7497))
  - Convert your existing usages to `panelClassName` and `panelStyle` respectively instead.

**Performance**

- Improved the amount of recomputed styles being generated by `EuiCode` and `EuiCodeBlock` ([#7486](https://github.com/elastic/eui/pull/7486))

**CSS-in-JS conversions**

- Converted `EuiSearchBar` to Emotion ([#7490](https://github.com/elastic/eui/pull/7490))
- Converted `EuiEmptyPrompt` to Emotion ([#7494](https://github.com/elastic/eui/pull/7494))
- Added `euiBorderColor` and `useEuiBorderColorCSS` style utilities ([#7494](https://github.com/elastic/eui/pull/7494))

## [`v92.2.1`](https://github.com/elastic/eui/releases/v92.2.1)

**Bug fixes**

- Removed unintentional i18n tokens in prior release that should not have been exported

## [`v92.2.0`](https://github.com/elastic/eui/releases/v92.2.0)

- Updated `EuiFlyoutResizable` with new optional `onResize` callback ([#7464](https://github.com/elastic/eui/pull/7464))

**Bug fixes**

- Fixed an issue in `EuiResizableContainer` where `onResizeEnd` could become a stale closure when renders occured between resize start and end, resulting in an outdated version of a consumer's `onResizeEnd` callback being called ([#7468](https://github.com/elastic/eui/pull/7468))
- Fixed `EuiTextArea` to correctly fire `onChange` callbacks on clear button click ([#7473](https://github.com/elastic/eui/pull/7473))
- Fixed `EuiContextMenu`'s panel titles & items to not show underlines on hover for non-interactive elements ([#7474](https://github.com/elastic/eui/pull/7474))

**Deprecations**

- Remove unused public `EuiHue` and `EuiSaturation` subcomponent exports. Use the parent `EuiColorPicker` component instead ([#7460](https://github.com/elastic/eui/pull/7460))
- Remove unused public `EuiCommentTimeline` subcomponent export. Use the parent `EuiComment` or `EuiCommentList` components instead. ([#7467](https://github.com/elastic/eui/pull/7467))

## [`v92.1.1`](https://github.com/elastic/eui/releases/v92.1.1)

**Bug fixes**

- Minor `EuiDataGrid` cell performance fixes ([#7465](https://github.com/elastic/eui/pull/7465))

## [`v92.1.0`](https://github.com/elastic/eui/releases/v92.1.0)

- Updated `EuiResizableButton` to allow customizing the `indicator` style with either `handle` (default) or `border` ([#7455](https://github.com/elastic/eui/pull/7455))
- Enhanced `EuiResizableContainer` to preserve the drag/resize event when the user's mouse leaves the parent container and re-enters ([#7456](https://github.com/elastic/eui/pull/7456))

**Bug fixes**

- Fixed an `EuiTreeView` JSX Typescript error ([#7452](https://github.com/elastic/eui/pull/7452))
- Fixed a color console warning being generated by disabled `EuiStep`s ([#7454](https://github.com/elastic/eui/pull/7454))

**Accessibility**

- `EuiDataGrid`'s keyboard/screenreader experience has been tweaked to be more consistent for varying complex data: ([#7448](https://github.com/elastic/eui/pull/7448))
  - Headers are now always navigable by arrow key, regardless of whether the header cells contain interactive content
  - Non-expandable cells containing any amount of interactive content now must be entered via Enter or F2 keypress
  - Expandable cells continue to be toggled via Enter or F2 keypress
- `EuiDataGrid` now provides a direct screen reader hint for Enter key behavior for expandable & interactive cells ([#7448](https://github.com/elastic/eui/pull/7448))

## [`v92.0.0`](https://github.com/elastic/eui/releases/v92.0.0)

- Updated generic types of `EuiBasicTable`, `EuiInMemoryTable` and `EuiSearchBar.Query.execute` to add `extends object` constraint ([#7340](https://github.com/elastic/eui/pull/7340))
  - This change should have no impact on your applications since the updated types only affect properties that exclusively accept object values.
- Added a new `EuiFlyoutResizable` component ([#7439](https://github.com/elastic/eui/pull/7439))
- Updated `EuiTextArea` to accept `isClearable` and `icon` as props ([#7449](https://github.com/elastic/eui/pull/7449))

**Bug fixes**

- `EuiRange`/`EuiDualRange`'s track ticks & highlights now update their positions on resize ([#7442](https://github.com/elastic/eui/pull/7442))

**Deprecations**

- Updated `EuiFilterButton` to remove the second `.euiFilterButton__textShift` span wrapper. Target `.euiFilterButton__text` instead ([#7444](https://github.com/elastic/eui/pull/7444))

**Breaking changes**

- Removed deprecated `EuiNotificationEvent`. We recommend copying the component to your application if necessary ([#7434](https://github.com/elastic/eui/pull/7434))
- Removed deprecated `EuiControlBar`. We recommend using `EuiBottomBar` instead ([#7435](https://github.com/elastic/eui/pull/7435))

