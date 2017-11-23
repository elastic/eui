# [`master`](https://github.com/elastic/eui/tree/master)

- Adds `EuiHealth` components for status checks. [(#158)](https://github.com/elastic/eui/pull/158)
- Visual cleanup of checkboxes, switches and radios. [(#158)](https://github.com/elastic/eui/pull/158)
- Form disabled states are much more consistant. [(#158)](https://github.com/elastic/eui/pull/158)
- Page / title padding adjusted to be more compact. [(#158)](https://github.com/elastic/eui/pull/158)
- Table spacing compressed visually. [(#158)](https://github.com/elastic/eui/pull/158)
- Dark theme forms now have better contrast with their borders. [(#158)](https://github.com/elastic/eui/pull/158)
- New app icons added to match Kibana's app directory. [(#162)](https://github.com/elastic/eui/pull/162)

**Bug fixes**

- Fixes bug where screen-reader-only styles weren't being imported.


# [`0.0.3`](https://github.com/elastic/eui/tree/v0.0.3)

- `<EuiFlexItem>` now accepts integers between 1 and 10 for the `grow` prop. [(#144)](https://github.com/elastic/eui/pull/144)
- `<EuiFlexItem>` and `<EuiFlexGrow>` now accept a `component` prop which you can set to `span` or `div` (default). [(#141)](https://github.com/elastic/eui/pull/141)
- Add `isLoading` prop to form inputs to allow for a loading state [(#150)](https://github.com/elastic/eui/pull/150)

**Breaking**
- `<EuiSideNav>` now accepts a tree data structure via the `items` prop. [(#141)](https://github.com/elastic/eui/pull/141)
- `<EuiSideNavGroup>`, `<EuiSideNavItem>`, and `<EuiSideNavTitle>` have been removed from the public API. [(#141)](https://github.com/elastic/eui/pull/141)

# [`0.0.2`](https://github.com/elastic/eui/tree/v0.0.2)

- Changed the hover states of `<EuiButtonEmpty>` to look more like links. [(#135)](https://github.com/elastic/eui/pull/135)
- `<EuiCode>` now wraps `<EuiCodeBlock>`, so it can do everything `<EuiCodeBlock>` could, but inline [(#138)](https://github.com/elastic/eui/pull/138)
- Added `transparentBackground` prop to `<EuiCodeBlock>` [(#138)](https://github.com/elastic/eui/pull/138)
- `<EuiCodeBlock>` now uses the `light` theme by default [(#138)](https://github.com/elastic/eui/pull/138)
- `<EuiFormRow>` generates its own unique `id` prop if none is provided. [(#130)](https://github.com/elastic/eui/pull/130)
- `<EuiFormRow>` associates help text and errors with the field element via ARIA attributes. [(#130)](https://github.com/elastic/eui/pull/130)

# [`0.0.1`](https://github.com/elastic/eui/tree/v0.0.1) Initial Release

- Initial public release
