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

