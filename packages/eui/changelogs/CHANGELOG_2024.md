## [`v94.5.1`](https://github.com/elastic/eui/releases/v94.5.1)

**Bug fixes**

- Fixed an `EuiDualRange`s with `showInput` bug, where `min`/`max` values and invalid states were not being correctly set if values were empty strings ([#7767](https://github.com/elastic/eui/pull/7767))

**Accessibility**

- Improved `EuiDatePicker` and `EuiSuperDatePicker`'s time selection screen reader UX ([#7726](https://github.com/elastic/eui/pull/7726))
- Improved the accessibility of `EuiDatePicker` by providing full screen-reader-only week day names to the calendar header ([#7748](https://github.com/elastic/eui/pull/7748))
- Improved `EuiBadge`'s ability to tell when text within the badge is selected/highlighted and selection color contrast ([#7752](https://github.com/elastic/eui/pull/7752))

## [`v94.5.0`](https://github.com/elastic/eui/releases/v94.5.0)

- `EuiFlyoutResizable` now respects `size` prop updates, allowing for controlled `size` usage ([#7759](https://github.com/elastic/eui/pull/7759))

**Bug fixes**

- Restored a removed `setTimeout` in `EuiInputPopover` to reduce flaky Cypress failures ([#7760](https://github.com/elastic/eui/pull/7760))

**Accessibility**

- `EuiToolTip`s can now additionally be dismissed via `Escape` keypress as well as on focus blur. ([#7751](https://github.com/elastic/eui/pull/7751))

## [`v94.4.1`](https://github.com/elastic/eui/releases/v94.4.1)

- Added support for `toolTipContent` and `toolTipProps` props on `EuiSelectable` options ([#7715](https://github.com/elastic/eui/pull/7715))
- Updated `EuiSuperDatePicker`'s absolute tab UX to support setting manual timestamps via mouse click as well as enter key ([#7732](https://github.com/elastic/eui/pull/7732))

**Bug fixes**

- Fixed issue with unmounted component state updates on requestAnimationFrame for `EuiSelectable` ([#7715](https://github.com/elastic/eui/pull/7715))
- Fixed `EuiMarkdownEditor` not disabling the upload dropzone when in `readOnly` mode ([#7738](https://github.com/elastic/eui/pull/7738))
- Fixed `EuiMarkdownEditor` not showing an invalid underline on the editor when `errors` are present ([#7738](https://github.com/elastic/eui/pull/7738))

**CSS-in-JS conversions**

- Converted `EuiMarkdownEditor` to Emotion; Removed `$euiMarkdownEditorMinHeight` ([#7738](https://github.com/elastic/eui/pull/7738))
- Fully converted `EuiMarkdownFormat` to Emotion ([#7738](https://github.com/elastic/eui/pull/7738))

**Accessibility**

- Updated `EuiCollapsedNavButton` with improved context for screen reader navigation ([#7740](https://github.com/elastic/eui/pull/7740))

## [`v94.3.0`](https://github.com/elastic/eui/releases/v94.3.0)

- Updated `launch` glyph for `EuiIcon` ([#7670](https://github.com/elastic/eui/pull/7670))
- Updated `EuiComboBox`'s `options` to support including tooltip details for selectable options. Use `toolTipContent` to render tooltip information, and `toolTipProps` to optionally customize the tooltip rendering behavior ([#7700](https://github.com/elastic/eui/pull/7700))
- Updated the following existing glyphs in `EuiIcon`: ([#7727](https://github.com/elastic/eui/pull/7727))
  - `error` (now an outlined version instead of filled) 
  - `tokenMetricCounter`
  - `tokenMetricGauge` 
- Added the following new glyphs to `EuiIcon`: ([#7727](https://github.com/elastic/eui/pull/7727))
  - `tokenDimension`
  - `clickLeft`
  - `clickRight`
  - `clockCounter`
  - `errorFilled` (the previous `error` glyph design)
  - `warningFilled`

**Bug fixes**

- Fixed a visual layout bug for `EuiComboBox` with `isLoading` in mobile views ([#7700](https://github.com/elastic/eui/pull/7700))
- Fixed missing styles on header cells of `EuiDataGrid` that prevented content text alignment styles to apply ([#7720](https://github.com/elastic/eui/pull/7720))
- Fixed `EuiFlexGroup` and `EuiFlexItem` `ref` prop typing to support refs of the same type as the passed `component` type and allow `displayName` to be defined for easy component naming when using component wrappers like `styled()` ([#7724](https://github.com/elastic/eui/pull/7724))

## [`v94.2.1`](https://github.com/elastic/eui/releases/v94.2.1)

**Bug fixes**

- Fixed an `EuiTabbedContent` edge case bug that occurred when updated with a completely different set of `tabs` ([#7713](https://github.com/elastic/eui/pull/7713))
- Fixed the `@storybook/test` dependency to be listed in `devDependencies` and not `dependencies` ([#7719](https://github.com/elastic/eui/pull/7719))

## [`v94.2.0`](https://github.com/elastic/eui/releases/v94.2.0)

- Updated `getDefaultEuiMarkdownPlugins()` to allow excluding the following plugins in addition to `tooltip`: ([#7676](https://github.com/elastic/eui/pull/7676))
  - `checkbox`
  - `linkValidator`
  - `lineBreaks`
  - `emoji`
- Updated `EuiSelectable`'s `isPreFiltered` prop to allow passing a configuration object, which allows disabling search highlighting in addition to search filtering ([#7683](https://github.com/elastic/eui/pull/7683))
- Updated `EuiFlexGroup` and `EuiFlexItem` prop types to support passing any valid React component type to the `component` prop and ensure proper type checking of the extra props forwarded to the `component`. ([#7688](https://github.com/elastic/eui/pull/7688))
- Updated `EuiSearchBar` to allow the `@` special character in query string searches ([#7702](https://github.com/elastic/eui/pull/7702))
- Added a new, optional `optionMatcher` prop to `EuiSelectable` and `EuiComboBox` allowing passing a custom option matcher function to these components and controlling option filtering for given search string ([#7709](https://github.com/elastic/eui/pull/7709))

**Bug fixes**

- Fixed an `EuiPageTemplate` bug where prop updates would not cascade down to child sections ([#7648](https://github.com/elastic/eui/pull/7648))
  - To cascade props down to the sidebar, `EuiPageTemplate` now explicitly requires using the `EuiPageTemplate.Sidebar` rather than `EuiPageSidebar`
- Fixed `EuiFieldNumber`'s typing to accept an icon configuration shape ([#7666](https://github.com/elastic/eui/pull/7666))
- Fixed `EuiFieldText` and `EuiFieldNumber` to render the correct paddings for icon shapes set to `side: 'right'` ([#7666](https://github.com/elastic/eui/pull/7666))
- Fixed `EuiFieldText` and `EuiFieldNumber` to fully ignore `icon`/`prepend`/`append` when `controlOnly` is set to true ([#7666](https://github.com/elastic/eui/pull/7666))
- Fixed `EuiColorPicker`'s input not setting the correct right padding for the number of icons displayed ([#7666](https://github.com/elastic/eui/pull/7666))
- Visual fixes for `EuiRange`s with `showInput`: ([#7678](https://github.com/elastic/eui/pull/7678))
  - Longer `append`/`prepend` labels no longer cause a background bug
  - Inputs can no longer overwhelm the actual range in width
- Fixed a visual text alignment regression in `EuiTableRowCell`s with the `row` header scope ([#7681](https://github.com/elastic/eui/pull/7681))
- Fixed `toolTipProps` type on `EuiSuperUpdateButton` to use `Partial<EuiToolTipProps>` ([#7692](https://github.com/elastic/eui/pull/7692))
- Fixes missing prop type for `popperProps` on `EuiDatePicker` ([#7694](https://github.com/elastic/eui/pull/7694))
- Fixed a focus bug with `EuiDataGrid`s with `leadingControlColumns` when moving columns to the left/right ([#7701](https://github.com/elastic/eui/pull/7701)) ([#7698](https://github.com/elastic/eui/pull/7698))
- Fixed `EuiSuperDatePicker` to validate date string with respect of locale on `EuiAbsoluteTab`. ([#7705](https://github.com/elastic/eui/pull/7705))
- Fixed a visual bug with `EuiSuperDatePicker`'s absolute tab on small mobile screens ([#7708](https://github.com/elastic/eui/pull/7708))
- Fixed i18n of empty and loading state messages for the `FieldValueSelectionFilter` component ([#7718](https://github.com/elastic/eui/pull/7718))

**Dependency updates**

- Updated `@hello-pangea/dnd` to v16.6.0 ([#7599](https://github.com/elastic/eui/pull/7599))
- Updated `remark-rehype` to v8.1.0 ([#7601](https://github.com/elastic/eui/pull/7601))

**Accessibility**

- Improved `EuiBasicTable` and `EuiInMemoryTable`'s selection checkboxes to have unique aria-labels per row ([#7672](https://github.com/elastic/eui/pull/7672))
- Added `aria-valuetext` attributes to `EuiRange`s with tick labels for improved screen reader UX ([#7675](https://github.com/elastic/eui/pull/7675))
- Updated `EuiAccordion` to keep focus on accordion trigger instead of moving to content on click/keypress ([#7696](https://github.com/elastic/eui/pull/7696))
- Added `aria-disabled` attribute to `EuiHorizontalSteps` when status is "disabled" ([#7699](https://github.com/elastic/eui/pull/7699))

## [`v94.1.0`](https://github.com/elastic/eui/releases/v94.1.0)

- Updated `EuiTableHeaderCell` to show a subdued `sortable` icon for columns that are not currently sorted but can be ([#7656](https://github.com/elastic/eui/pull/7656))
- Updated `EuiBasicTable` and `EuiInMemoryTable`'s `columns[].actions[]`'s to pass back click events to `onClick` callbacks as the second callback ([#7667](https://github.com/elastic/eui/pull/7667))

## [`v94.0.0`](https://github.com/elastic/eui/releases/v94.0.0)

- Updated `EuiTable`, `EuiBasicTable`, and `EuiInMemoryTable` with a new `responsiveBreakpoint` prop, which allows customizing the point at which the table collapses into a mobile-friendly view with cards ([#7625](https://github.com/elastic/eui/pull/7625))
- Updated `EuiProvider`'s `componentDefaults` prop to allow configuring `EuiTable.responsiveBreakpoint` ([#7625](https://github.com/elastic/eui/pull/7625))

**Bug fixes**

- `EuiBasicTable` & `EuiInMemoryTable` `isPrimary` actions are now correctly shown on mobile views ([#7640](https://github.com/elastic/eui/pull/7640))
- Table `mobileOptions`: ([#7642](https://github.com/elastic/eui/pull/7642))
  - `mobileOptions.align` is now respected instead of all cells being forced to left alignment
  - `textTruncate` and `textOnly` are now respected even if a `render` function is not passed

**Breaking changes**

- Removed unused `EuiTableHeaderButton` component ([#7621](https://github.com/elastic/eui/pull/7621))
- Removed the `responsive` prop from `EuiTable`, `EuiBasicTable`, and `EuiInMemoryTable`. Use the new `responsiveBreakpoint` prop instead ([#7625](https://github.com/elastic/eui/pull/7625))
- The following props are no longer needed by `EuiBasicTable` or `EuiInMemoryTable` for responsive table behavior to work correctly, and can be removed: ([#7632](https://github.com/elastic/eui/pull/7632))
  - `isSelectable`
  - `isExpandable`
  - `hasActions`
- Removed the `showOnHover` prop from `EuiTableRowCell` / `EuiBasicTable`/`EuiInMemoryTable`'s `columns` API. Use the new actions `columns[].actions[].showOnHover` API instead. ([#7640](https://github.com/elastic/eui/pull/7640))
- Removed top-level `textOnly` prop from `EuiBasicTable` and `EuiInMemoryTable`. Use `columns[].textOnly` instead. ([#7642](https://github.com/elastic/eui/pull/7642))

**DOM changes**

- `EuiTable` mobile headers no longer render in the DOM when not visible (previously rendered with `display: none`). This may affect DOM testing assertions. ([#7625](https://github.com/elastic/eui/pull/7625))
- `EuiTableRowCell` now applies passed `className`s to the parent `<td>` element, instead of to the inner cell content `<div>`. ([#7631](https://github.com/elastic/eui/pull/7631))
- `EuiTableRow`s rendered by basic and memory tables now only render a `.euiTableRow-isSelectable` className if the selection checkbox is not disabled ([#7632](https://github.com/elastic/eui/pull/7632))
- `EuiTableRowCell`s with `textOnly` set to `false` will no longer attempt to apply the `.euiTableCellContent__text` className to child elements. ([#7641](https://github.com/elastic/eui/pull/7641))
- `EuiTableRowCell` no longer renders mobile headers to the DOM unless the current table is displaying its responsive view. ([#7642](https://github.com/elastic/eui/pull/7642))
- `EuiTableHeaderCell` and `EuiTableRowCell` will no longer render in the DOM at all on mobile if their columns' `mobileOptions.show` is set to `false`. ([#7642](https://github.com/elastic/eui/pull/7642))
- `EuiTableHeaderCell` and `EuiTableRowCell` will no longer render in the DOM at all on desktop if their columns' `mobileOptions.only` is set to `true`. ([#7642](https://github.com/elastic/eui/pull/7642))

**CSS-in-JS conversions**

- Converted `EuiTable`, `EuiTableRow`, `EuiTableRowCell`, and all other table subcomponents to Emotion ([#7654](https://github.com/elastic/eui/pull/7654))
- Removed the following `EuiTable` Sass variables: ([#7654](https://github.com/elastic/eui/pull/7654))
  - `$euiTableCellContentPadding`
  - `$euiTableCellContentPaddingCompressed`
  - `$euiTableCellCheckboxWidth`
  - `$euiTableHoverColor`
  - `$euiTableSelectedColor`
  - `$euiTableHoverSelectedColor`
  - `$euiTableActionsBorderColor`
  - `$euiTableHoverClickableColor`
  - `$euiTableFocusClickableColor`
- Removed the following `EuiTable` Sass mixins: ([#7654](https://github.com/elastic/eui/pull/7654))
  - `euiTableActionsBackgroundMobile`
  - `euiTableCellCheckbox`
  - `euiTableCell`

## [`v93.6.0`](https://github.com/elastic/eui/releases/v93.6.0)

- Updated `EuiBreadcrumb` styles to improve visual distinction of clickable breadcrumbs ([#7615](https://github.com/elastic/eui/pull/7615))

**Deprecations**

- Deprecated `color` prop on `EuiBreadcrumb` ([#7615](https://github.com/elastic/eui/pull/7615))

**Bug fixes**

- Fixed `EuiComboBox` to correctly select full matches within groups via the `Enter` key ([#7658](https://github.com/elastic/eui/pull/7658))

**Accessibility**

- Updated `EuiHeaderBreadcrumb` styles to ensure min. required color contrast ([#7643](https://github.com/elastic/eui/pull/7643))
- `EuiSuperSelect` now correctly reads out parent `EuiFormRow` labels to screen readers ([#7650](https://github.com/elastic/eui/pull/7650))
- `EuiSuperSelect` now more closely mimics native `<select>` behavior in its keyboard behavior and navigation ([#7650](https://github.com/elastic/eui/pull/7650))
- `EuiSuperSelect` no longer strands keyboard focus on close ([#7650](https://github.com/elastic/eui/pull/7650))
- `EuiSuperSelect` now correctly allows keyboard navigating past disabled options in the middle of the options list ([#7650](https://github.com/elastic/eui/pull/7650))

## [`v93.5.2`](https://github.com/elastic/eui/releases/v93.5.2)

**Dependency updates**

- Updated `react-virtualized-auto-sizer` to 1.0.24 ([#7598](https://github.com/elastic/eui/pull/7598))
- Updated `react-window` to 1.8.10 ([#7600](https://github.com/elastic/eui/pull/7600))

**CSS-in-JS conversions**

- Updated EUI's internal style memoization/performance utility to have configurable error/warning levels via `setEuiDevProviderWarning` ([#7626](https://github.com/elastic/eui/pull/7626))

## [`v93.5.1`](https://github.com/elastic/eui/releases/v93.5.1)

**Bug fixes**

- Fixed unvirtualized `EuiSelectable`s to not cause Jest/jsdom errors on active option change ([#7618](https://github.com/elastic/eui/pull/7618))

## [`v93.5.0`](https://github.com/elastic/eui/releases/v93.5.0)

- `EuiHeaderLinks` now accepts a `children` render function that will be passed a `closeMobilePopover` callback, allowing consumers to close the mobile popover by its content ([#7603](https://github.com/elastic/eui/pull/7603))
- Updated `EuiSelectable` to support scrolling list containers when `listProps.isVirtualization` is set to `false` ([#7609](https://github.com/elastic/eui/pull/7609))

**Bug fixes**

- Fixed `EuiIconTip`'s default `aria-label` text to be i18n tokenizable ([#7606](https://github.com/elastic/eui/pull/7606))
- Fixed `EuiTextArea`'s CSS box model to no longer render a few extra pixels of strut height ([#7607](https://github.com/elastic/eui/pull/7607))

**Dependency updates**

- Updated `@types/refractor` to v3.4.0 ([#7590](https://github.com/elastic/eui/pull/7590))
- Updated `@types/lodash` to v4.14.202 ([#7591](https://github.com/elastic/eui/pull/7591))
- Removed `@types/resize-observer-browser` dependency. `ResizeObserver` types should already be baked in to Typescript as of 4.2+ ([#7592](https://github.com/elastic/eui/pull/7592))
- Updated `classnames` to v2.5.1 ([#7593](https://github.com/elastic/eui/pull/7593))
- Updated `@types/numeral` to v2.0.5 ([#7594](https://github.com/elastic/eui/pull/7594))
- Updated `@types/react-window` to 1.8.8 ([#7597](https://github.com/elastic/eui/pull/7597))
- Updated `prop-types` to v15.18.1 ([#7602](https://github.com/elastic/eui/pull/7602))
- Removed `prop-types` as a peer dependency, per package recommendation ([#7602](https://github.com/elastic/eui/pull/7602))

**Accessibility**

- `EuiIcons` no longer apply `aria-hidden` to empty icons, as long as a valid title or label is provided to the icon. In particular, this is intended to improve the accessibility of loading `EuiIconTip`s. ([#7606](https://github.com/elastic/eui/pull/7606))

## [`v93.4.0`](https://github.com/elastic/eui/releases/v93.4.0)

- Added the following properties to `EuiButtonGroup`'s `options` configs: `toolTipContent`, `toolTipProps`, and `title`. These new properties allow wrapping buttons in `EuiToolTips`, and additionally customizing or disabling the native browser `title` tooltip. ([#7461](https://github.com/elastic/eui/pull/7461))
- Enhanced `EuiResizeObserver` and `useResizeObserver`'s performance to not trigger page reflows on resize event ([#7575](https://github.com/elastic/eui/pull/7575))
- Updated `EuiSuperUpdateButton` to support custom button text via an optional `children` prop ([#7576](https://github.com/elastic/eui/pull/7576))

**Bug fixes**

- Fixed `EuiFlyout` to not repeatedly remove/add a body class on resize ([#7462](https://github.com/elastic/eui/pull/7462))
- Fixed `EuiToast` title text to wrap instead of overflowing out of the container ([#7568](https://github.com/elastic/eui/pull/7568))
- Fixed a visual bug with `EuiHeaderBreadcrumbs` with popovers ([#7580](https://github.com/elastic/eui/pull/7580))

**Deprecations**

- Deprecated `euiPalettePositive` and `euiPaletteNegative` in favour of a more culturally inclusive `euiPaletteGreen` and `euiPaletteRed` ([#7570](https://github.com/elastic/eui/pull/7570))
- Deprecated all charts theme exports in favor of `@elastic/charts` exports: ([#7572](https://github.com/elastic/eui/pull/7572))
  - Deprecated `EUI_CHARTS_THEME_<DARK|LIGHT>` in favor of `<DARK|LIGHT>_THEME` from `@elastic/charts`. ([#7572](https://github.com/elastic/eui/pull/7572))
  - Deprecated `EUI_SPARKLINE_THEME_PARTIAL` in favor of `useSparklineOverrides` theme from the kibana `charts` plugin `theme` service.

**Accessibility**

- Updated `EuiModal` to set an `aria-modal` attribute and a default `dialog` role ([#7564](https://github.com/elastic/eui/pull/7564))
- Updated `EuiConfirmModal` to set a default `alertdialog` role ([#7564](https://github.com/elastic/eui/pull/7564))
- Fixed `EuiModal` and `EuiConfirmModal` to properly trap Safari+VoiceOver's virtual cursor ([#7564](https://github.com/elastic/eui/pull/7564))

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

