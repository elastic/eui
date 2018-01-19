# [`master`](https://github.com/elastic/eui/tree/master)

No public interface changes since `0.0.14`.

# [`0.0.14`](https://github.com/elastic/eui/tree/v0.0.14)

- Added `isColorDark` color util [(#311)](https://github.com/elastic/eui/pull/311)
- EuiButton, EuiButtonEmpty and EuiButtonIcon can now take an `href` [(#316)](https://github.com/elastic/eui/pull/316)
- In `EuiSideNav`, allow a callback to be passed that renders the individual items in the navigation. This makes interoperability with e.g. `react-router` easier. [#310](https://github.com/elastic/eui/pull/310)

**Bug fixes**

- Set `EuiFlexGroup` to `flex-grow: 1` to be more friendly with IE11 [(#315)](https://github.com/elastic/eui/pull/315)

# [`0.0.13`](https://github.com/elastic/eui/tree/v0.0.13)

- Added index management icons. [(#307)](https://github.com/elastic/eui/pull/307)

**Breaking changes**

- Revert test helper for async functions that throw exceptions [#306](https://github.com/elastic/eui/pull/306). See PR for details on how this can be handled in Jest 22.

**Bug fixes**

- Adjust toast z-index to show over modals [(#296)](https://github.com/elastic/eui/pull/296)
- Fix nested `<EuiFlexItem>` collapse issue in IE [(#308)](https://github.com/elastic/eui/pull/308)

# [`0.0.12`](https://github.com/elastic/eui/tree/v0.0.12)

- Minor style-only changes to `EuiPagination`, button reset, `EuiTableHeaderCell`, and `EuiCodeBlock`  [(#298)](https://github.com/elastic/eui/pull/298)
- All NPM dependencies now use ^ to install the latest minor version.
- Added Apache, Nginx, MySQL logos [(#270)](https://github.com/elastic/eui/pull/270)
- Added small version of `EuiCallOut` [(#269)](https://github.com/elastic/eui/pull/269)
- Added first batch of TypeScript type definitions for components and services [(#252)](https://github.com/elastic/eui/pull/252)
- Added button for expanding `<EuiCodeBlock>` instances to be full-screen. [(#259)](https://github.com/elastic/eui/pull/259)
- Add test helper for async functions that throw exceptions [#301](https://github.com/elastic/eui/pull/301)

**Bug fixes**

- Removed padding on `<EuiPage>` mobile breakpoint. [(#282)](https://github.com/elastic/eui/pull/282)
- Fixed some `<EuiIcon>` `type`s not setting their `viewBox` attribute, which caused them to not honor the `size` properly. [(#277)](https://github.com/elastic/eui/pull/277)
- Fixed `<EuiContextMenu>` to pass the `event` argument to a `<EuiContextMenuItem>`'s `onClick` handler even when a panel is defined. [(#265)](https://github.com/elastic/eui/pull/265)

**Breaking changes**

- Removed `color` prop from `<EuiCodeBlock>`. This component's highlighting now matches whichever theme is currently active. See PR for details on SCSS breaking changes. [(#259)](https://github.com/elastic/eui/pull/259)

# [`0.0.11`](https://github.com/elastic/eui/tree/v0.0.11)

- Added `<EuiImage>` component to allow for image sizing and zooms. [(#262)](https://github.com/elastic/eui/pull/262)
- Updated `<EuiOverlayMask>` to append `<div>` to body. [(#254)](https://github.com/elastic/eui/pull/254)

**Bug fixes**

- Disabled tab styling. [(#258)[https://github.com/elastic/eui/pull/258]]
- Proper classname for flexGroup alignItems prop. [(#257)[https://github.com/elastic/eui/pull/257]]
- Clicking the downArrow icon in `EuiSelect` now triggers selection. [(#255)[https://github.com/elastic/eui/pull/255]]
- Fixed `euiFormRow` id's from being the same as the containing input and label. [(#251)[https://github.com/elastic/eui/pull/251]]

**Breaking changes**

- `{rest}` prop attacmhment moved from wrapping div to the input on checkboxes and switches. [(#246)](https://github.com/elastic/eui/pull/246)

# [`0.0.10`](https://github.com/elastic/eui/tree/v0.0.10)

- Updated `euiPopover` to propagate `panelPaddingSize` padding values to content only (title does inherit horizontal values) via CSS. [(#229)](https://github.com/elastic/eui/pull/229)
- Updated `<EuiErrorBoundary>` to preserve newlines in error. [(#238)[https://github.com/elastic/eui/pull/238]]
- Added more icons and fixed a few for dark mode [(#228)](https://github.com/elastic/eui/pull/228)
- Added `EuiFlyout` component. [(#227)](https://github.com/elastic/eui/pull/227)

**Breaking changes**

- Renamed `EuiModalOverlay` to `EuiOverlayMask`. [(#227)](https://github.com/elastic/eui/pull/227)

**Bug fixes**

- Fix bug in `Pager` service which occurred when there were no items. [(#237)[https://github.com/elastic/eui/pull/237]]
- Add `isPageable` method to `Pager` service and set first and last page index to -1 when there are no pages. [(#242)[https://github.com/elastic/eui/pull/242]]

# [`0.0.9`](https://github.com/elastic/eui/tree/v0.0.9)

**Breaking changes**

- Renamed `euiFlexGroup--alignItemsEnd` class to `euiFlexGroup--alignItemsFlexEnd`.
- Remove support for `primary` color from `<EuiTextColor>` because it looked too much like a link.

**Bug fixes**

- Give `<EuiFormErrorText>` and `<EuiFormHelpText>` proper line-height. [(#234)](https://github.com/elastic/eui/pull/234)

# [`0.0.8`](https://github.com/elastic/eui/tree/v0.0.8)

**Bug fixes**

- Fix button vertical alignment. [(#232)](https://github.com/elastic/eui/pull/232)

# [`0.0.7`](https://github.com/elastic/eui/tree/v0.0.7)

- Added `EuiSteps` component ([(#202)](https://github.com/elastic/eui/pull/202), [(#208)](https://github.com/elastic/eui/pull/208))

**Breaking changes**

- Test helpers now published at `@elastic/eui/lib/test`

**Bug fixes**

- Case sensitive file name fix for Kibana dark theme. [(#216)](https://github.com/elastic/eui/pull/216)

# [`0.0.6`](https://github.com/elastic/eui/tree/v0.0.6)

- `justify` prop of `<EuiFlexGroup>` now accepts `spaceEvenly` [(#205)](https://github.com/elastic/eui/pull/205)
- Increase size of  `<EuiTitle size="s">` so that it's distinguishable as a title [(#204)](https://github.com/elastic/eui/pull/204)

# [`0.0.5`](https://github.com/elastic/eui/tree/v0.0.5)

**Bug fixes**

- Fixed import paths for `EuiTable`, `EuiHealth`, and `EuiPopover` which prevented dependents of EUI from being able to compile when importing components from the `lib` directory  [(#203)](https://github.com/elastic/eui/pull/203)

# [`0.0.4`](https://github.com/elastic/eui/tree/v0.0.4)

- Added `EuiHealth` components for status checks [(#158)](https://github.com/elastic/eui/pull/158)
- Cleaned up styling for checkboxes, switches, and radios [(#158)](https://github.com/elastic/eui/pull/158)
- Form `disabled` states are now more consistant [(#158)](https://github.com/elastic/eui/pull/158)
- Page and title padding adjusted to be more compact [(#158)](https://github.com/elastic/eui/pull/158)
- Table spacing is now smaller [(#158)](https://github.com/elastic/eui/pull/158)
- Dark theme forms now have better contrast with their borders [(#158)](https://github.com/elastic/eui/pull/158)
- Added icons to match Kibana's app directory [(#162)](https://github.com/elastic/eui/pull/162)
- Convert icons from SVG to React component during the build and stop using
  sprites [(#160)](https://github.com/elastic/eui/pull/160)
- Add `isReadOnly`, `setOptions`, and `cursorStart` props to  `<EuiCodeEditor>` ([#169](https://github.com/elastic/eui/pull/169))
- Add `wrap` prop to `<EuiFlexGroup>` ([#170](https://github.com/elastic/eui/pull/170))
- Add `scope` prop to `<EuiTableHeaderCell>` and `<EuiTableHeaderCellCheckbox>` ([#171](https://github.com/elastic/eui/pull/171))
- Add `disabled` prop to `<EuiContextMenuItem>` ([#172](https://github.com/elastic/eui/pull/172))
- Add `<EuiTablePagination>` component and `Pager` service ([#178](https://github.com/elastic/eui/pull/178))
- Add `<Tooltip>` component ([#174](https://github.com/elastic/eui/pull/174), [#193](https://github.com/elastic/eui/pull/193))
- Add a bold weight of 700 and apply it to `<strong>` elements by default ([#193](https://github.com/elastic/eui/pull/193))
- Icon size prop now accepts `s`. Adjusted coloring of sidenav arrows ([#178](https://github.com/elastic/eui/pull/197))
- Add `<EuiErrorBoundary>` ([#198](https://github.com/elastic/eui/pull/198))
- Export `test` module, which includes `findTestSubject`, `startThrowingReactWarnings`, `stopThrowingReactWarnings`, `requiredProps`, and `takeMountedSnapshot` helpers ([#198](https://github.com/elastic/eui/pull/198))
- Added a more systematic way to add themes; includes a new K6 theme for Kibana. [(#191)](https://github.com/elastic/eui/pull/191)

**Bug fixes**

- Fixed bug where screen-reader styles weren't being imported [(#103)](https://github.com/elastic/eui/pull/103)
- Fixed a bug where `<progress>` wasn't being rendered under `block` display [(#166)](https://github.com/elastic/eui/pull/166)
- Fixed a bug that caused `<EuiPageSideBar>` width to change when the width of its content changed [(#181)](https://github.com/elastic/eui/pull/181)

**Breaking**

- Fixed a bug where table cell classes were being applied twice [(#167)](https://github.com/elastic/eui/pull/167)
- React ^16.0 is now a peer dependency ([#198](https://github.com/elastic/eui/pull/198))

# [`0.0.3`](https://github.com/elastic/eui/tree/v0.0.3)

- `<EuiFlexItem>` now accepts integers between 1 and 10 for the `grow` prop. [(#144)](https://github.com/elastic/eui/pull/144)
- `<EuiFlexItem>` and `<EuiFlexGrow>` now accept a `component` prop which you can set to `span` or `div` (default). [(#141)](https://github.com/elastic/eui/pull/141)
- Add `isLoading` prop to form inputs to allow for a loading state [(#150)](https://github.com/elastic/eui/pull/150)

**Breaking**

- `<EuiSideNav>` now accepts a tree data structure via the `items` prop [(#141)](https://github.com/elastic/eui/pull/141)
- `<EuiSideNavGroup>`, `<EuiSideNavItem>`, and `<EuiSideNavTitle>` have been removed from the public API [(#141)](https://github.com/elastic/eui/pull/141)

# [`0.0.2`](https://github.com/elastic/eui/tree/v0.0.2)

- Changed the hover states of `<EuiButtonEmpty>` to look more like links [(#135)](https://github.com/elastic/eui/pull/135)
- `<EuiCode>` now wraps `<EuiCodeBlock>`, so it can do everything `<EuiCodeBlock>` could, but inline [(#138)](https://github.com/elastic/eui/pull/138)
- Added `transparentBackground` prop to `<EuiCodeBlock>` [(#138)](https://github.com/elastic/eui/pull/138)
- `<EuiCodeBlock>` now uses the `light` theme by default [(#138)](https://github.com/elastic/eui/pull/138)
- `<EuiFormRow>` generates its own unique `id` prop if none is provided [(#130)](https://github.com/elastic/eui/pull/130)
- `<EuiFormRow>` associates help text and errors with the field element via ARIA attributes [(#130)](https://github.com/elastic/eui/pull/130)

# [`0.0.1`](https://github.com/elastic/eui/tree/v0.0.1) Initial Release

- Initial public release
