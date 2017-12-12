# [`master`](https://github.com/elastic/eui/tree/master)

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
