## [`v111.1.0`](https://github.com/elastic/eui/releases/v111.1.0)

- Added `dashedCircle` icon ([#9278](https://github.com/elastic/eui/pull/9278))
- Added `crossProjectSearch` icon ([#9275](https://github.com/elastic/eui/pull/9275))
- Added component token `components.tourStepIndicatorInactiveColor` and `components.tourStepIndicatorActiveColor` ([#9271](https://github.com/elastic/eui/pull/9271))
- Remapped `EuiBeacon` component `success` variant to use `success` color token instead of `accentSecondary` ([#9271](https://github.com/elastic/eui/pull/9271))
- Added `EuiSplitButton` and its respective sub-components `EuiSplitButton.ActionPrimary` and `EuiSplitButton.ActionSecondary` ([#9269](https://github.com/elastic/eui/pull/9269))
- Added `productRobot` icon ([#9259](https://github.com/elastic/eui/pull/9259))
- Added beta `euiContainer()`, `euiContainerCSS()`, and `euiContainerQuery()` Emotion utilities to help work with CSS Container Queries ([#9264](https://github.com/elastic/eui/pull/9264))
- Added `useEuiContainerQuery` hook to observe container query changes in JavaScript ([#9251](https://github.com/elastic/eui/pull/9251))
- Updated EuiFlexGroup's `gutterSize` from `l` to `m` ([#9132](https://github.com/elastic/eui/pull/9132))
- Updated EuiSpacer's `size` from `l` to `m` ([#9132](https://github.com/elastic/eui/pull/9132))
- Updated EuiHorizontalRule's `margin` from `l` to `m` ([#9132](https://github.com/elastic/eui/pull/9132))
- Updated EuiPageHeader's tab `size` from `l` to `m` ([#9132](https://github.com/elastic/eui/pull/9132))
- Updated EuiEmptyPrompt's spacer `size` between title and text from `m` to `s` ([#9132](https://github.com/elastic/eui/pull/9132))
- Updated EuiSearchBar's `gutterSize` from `m` to `s` ([#9132](https://github.com/elastic/eui/pull/9132))

**Bug fixes**

- Fixed flyout overlay masks not being visible for `EuiDataGrid`'s fullscreen mode by reducing the `z-index` of the fullscreen mode overlay ([#9267](https://github.com/elastic/eui/pull/9267))

**Accessibility**

- Added information about the empty state of `EuiBasicTable` in the table caption ([#9265](https://github.com/elastic/eui/pull/9265))
- Improved `EuiBasicTable` accessibility by ensuring  a fallback `tableCaption` is applied if none is provided ([#9254](https://github.com/elastic/eui/pull/9254))

