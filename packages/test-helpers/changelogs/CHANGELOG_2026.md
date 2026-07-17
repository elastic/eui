## Unreleased

- `EuiComboBoxObject.setSelectedOptions()` now types to filter before selecting (matching by accessible name, with a keyboard fallback for duplicates), so it works on filterable / virtualized / suggestion-backed combo boxes ([#9809](https://github.com/elastic/eui/pull/9809))
- `EuiComboBoxObject.setSelectedOptions()` accepts a `timeout` option to bound how long each option is awaited after typing (default `2500`ms), for slow / server-backed combo boxes ([#9809](https://github.com/elastic/eui/pull/9809))
- `EuiComboBoxObject.getSelectedOptions()` now reads selected pills by the `.euiComboBoxPill` class instead of its `data-test-subj`, so combo boxes that stamp a per-option `data-test-subj` (which overrides the pill's own) are read correctly ([#9809](https://github.com/elastic/eui/pull/9809))
- Added `EuiComboBoxObject.setCustomSelectedOptions()` to set free-text values via `onCreateOption`, and `getAvailableOptions()` to read the available (unselected) option labels ([#9809](https://github.com/elastic/eui/pull/9809))
- `EuiComboBoxObject` now verifies the `data-test-subj` element is actually an `EuiComboBox` and throws a clear error otherwise, instead of silently operating on the wrong component ([#9809](https://github.com/elastic/eui/pull/9809))

## [`v1.1.0`](https://github.com/elastic/eui/releases/v1.1.0)

- Prepared `@elastic/eui-test-helpers` for npm publishing (CommonJS + ESM + type declarations) ([#9772](https://github.com/elastic/eui/pull/9772))

