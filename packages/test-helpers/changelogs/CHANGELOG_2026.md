## [`v1.5.0`](https://github.com/elastic/eui/releases/v1.5.0)

- Added `EuiRangeObject`, a Playwright Component Object for `EuiRange`/`EuiDualRange` ([#9957](https://github.com/elastic/eui/pull/9957))
- Added `EuiDraggableObject` with `reorder(steps)` ([#9936](https://github.com/elastic/eui/pull/9936))
- Added `EuiBasicTableObject` with `rows` and `cells(field)` ([#9933](https://github.com/elastic/eui/pull/9933))
- Added `EuiFilterButtonObject`, a Playwright Component Object for `EuiFilterButton` ([#9942](https://github.com/elastic/eui/pull/9942))

## [`v1.4.0`](https://github.com/elastic/eui/releases/v1.4.0)

- Added `EuiSelectableObject` with `options`, `selectOption(label)` and `search(term)` ([#9908](https://github.com/elastic/eui/pull/9908))

## [`v1.3.0`](https://github.com/elastic/eui/releases/v1.3.0)

- Added `EuiDataGridObject` with `rows`, `cell()`, `cells()`, `doActionOnColumn()` and `openFullScreenMode()`/`closeFullScreenMode()` ([#9874](https://github.com/elastic/eui/pull/9874))
- Added `EuiSuperSelectObject` with `selectOptionByValue()`, `selectOptionByLabel()` and `getSelectedValue()` ([#9874](https://github.com/elastic/eui/pull/9874))
- Added `EuiGlobalToastListObject` with a `toasts` locator and `closeAll()` ([#9874](https://github.com/elastic/eui/pull/9874))

## [`v1.2.0`](https://github.com/elastic/eui/releases/v1.2.0)

- Fixed `EuiComboBoxObject.setSelectedOptions()` selecting the wrong option when a label is a substring of another (e.g. `ip` vs `clientip`) by matching options by exact text ([#9838](https://github.com/elastic/eui/pull/9838))
- Fixed `EuiComboBoxObject` timing out when its target element is absent by skipping the component-type guard in that case ([#9838](https://github.com/elastic/eui/pull/9838))
- Fixed `EuiComboBoxObject.setSelectedOptions()` on `asPlainText` combo boxes by not clearing the input before selecting (the replacement is implicit and the input can hold a non-clearable default) ([#9838](https://github.com/elastic/eui/pull/9838))
- Fixed `EuiComboBoxObject.setSelectedOptions()` intermittently losing an `asPlainText` selection by not blurring after selection (the blur could race the consumer's `onChange` commit) ([#9838](https://github.com/elastic/eui/pull/9838))
- Updated Component Objects to run the component-type check automatically before every public method (via a `Proxy` in `BaseObject`), instead of per-method calls ([#9828](https://github.com/elastic/eui/pull/9828))
- Added `EuiComboBoxObject.setCustomSelectedOptions()` and `getAllVisibleOptions()` ([#9809](https://github.com/elastic/eui/pull/9809))
- Added a `timeout` option to `EuiComboBoxObject.setSelectedOptions()` ([#9809](https://github.com/elastic/eui/pull/9809))
- Updated `EuiComboBoxObject.setSelectedOptions()` to type-to-filter, so it works on filterable / virtualized / async combo boxes ([#9809](https://github.com/elastic/eui/pull/9809))
- Updated Component Objects to verify the target element's component type and throw on mismatch ([#9809](https://github.com/elastic/eui/pull/9809))

**Bug fixes**

- Fixed `EuiComboBoxObject.getSelectedOptions()` to read selected pills by class, so combo boxes that set a per-option `data-test-subj` are read correctly ([#9809](https://github.com/elastic/eui/pull/9809))

## [`v1.1.0`](https://github.com/elastic/eui/releases/v1.1.0)

- Prepared `@elastic/eui-test-helpers` for npm publishing (CommonJS + ESM + type declarations) ([#9772](https://github.com/elastic/eui/pull/9772))

