## [`v91.0.0`](https://github.com/elastic/eui/releases/tag/v91.0.0)

- Updated the background color of `EuiPopover`s in dark mode to increase visibility & contrast against other page/panel backgrounds ([#7310](https://github.com/elastic/eui/pull/7310))
- Memoized `EuiDataGrid` to prevent unneeded re-renders ([#7324](https://github.com/elastic/eui/pull/7324))
- Added a configurable `role` prop to `EuiAccordion` ([#7326](https://github.com/elastic/eui/pull/7326))
- Added a configurable `role` prop to `EuiGlobalToastList` ([#7328](https://github.com/elastic/eui/pull/7328))
- For greater flexibility, `EuiSuperDatePicker` now allows users to paste ISO 8601, RFC 2822, and Unix timestamps in the `Absolute` tab input, in addition to timestamps in the `dateFormat` prop ([#7331](https://github.com/elastic/eui/pull/7331))
- Plain text `EuiComboBox`es now behave more like a normal text field/input. Backspacing will no longer delete the entire value, and selected values can now be double clicked and copied. ([#7332](https://github.com/elastic/eui/pull/7332))
- `EuiDataGrid`'s display settings popover now allows users to clear the "Lines per row" input before typing in a new number ([#7338](https://github.com/elastic/eui/pull/7338))
- Improved the UX of `EuiSuperDatePicker`'s Absolute tab for users manually typing in timestamps ([#7341](https://github.com/elastic/eui/pull/7341))
- Updated `EuiI18n`s with multiple `tokens` to accept dynamic `values` ([#7341](https://github.com/elastic/eui/pull/7341))

**Bug fixes**

- Fixed `EuiComboBox`'s `onSearchChange` callback to pass the correct `hasMatchingOptions` value ([#7334](https://github.com/elastic/eui/pull/7334))
- Fixed an `EuiSelectableTemplateSitewide` bug where the `popoverButton` behavior would break if passed a non-DOM React wrapper ([#7339](https://github.com/elastic/eui/pull/7339))

**Deprecations**

- `EuiPopover`: deprecated `anchorClassName`. Use `className` instead ([#7311](https://github.com/elastic/eui/pull/7311))
- `EuiPopover`: deprecated `buttonRef`. Use `popoverRef` instead ([#7311](https://github.com/elastic/eui/pull/7311))
- `EuiPopover`: removed extra `.euiPopover__anchor` div wrapper. Target `.euiPopover` instead if necessary ([#7311](https://github.com/elastic/eui/pull/7311))
- Deprecated `EuiButtonGroup`'s `name` prop. This can safely be removed. ([#7325](https://github.com/elastic/eui/pull/7325))

**Breaking changes**

- Removed deprecated `euiPaletteComplimentary` - use `euiPaletteComplementary` Instead ([#7333](https://github.com/elastic/eui/pull/7333))

**Accessibility**

- Updated `type="single"` `EuiButtonGroup`s to render standard buttons instead of radio buttons under the hood, per recent a11y recommendations ([#7325](https://github.com/elastic/eui/pull/7325))
- `EuiAccordion` now defaults to a less screenreader-noisy `group` role instead of `region`. If your accordion contains significant enough content to be a document landmark role, you may re-configure it back to `region`. ([#7326](https://github.com/elastic/eui/pull/7326))
- Reduced screen reader noisiness when sorting `EuiDataGrid` columns via toolbar ([#7327](https://github.com/elastic/eui/pull/7327))
- `EuiGlobalToastList` now defaults to a `log` role. If your toasts will always require immediate user action, consider (with caution) using the `alert` role instead. ([#7328](https://github.com/elastic/eui/pull/7328))

**CSS-in-JS conversions**

- Updated `$euiFontFamily` and `$euiCodeFontFamily` to match Emotion fonts ([#7332](https://github.com/elastic/eui/pull/7332))

## [`v90.0.0`](https://github.com/elastic/eui/releases/tag/v90.0.0)

- Updated the `eventColor` prop on `EuiCommentEvent` to apply the color to the entire comment header. ([#7288](https://github.com/elastic/eui/pull/7288))
- Updated `EuiBasicTable` and `EuiInMemoryTable` to support a new controlled selection API: `selection.selected` ([#7321](https://github.com/elastic/eui/pull/7321))

**Bug fixes**

- Fixed controlled `EuiFieldNumbers` not correctly updating native validity state ([#7291](https://github.com/elastic/eui/pull/7291))
- Fixed `EuiListGroupItem` to pass `style` props to the wrapping `<li>` element alongside `className` and `css`. All other props will be passed to the underlying content. ([#7298](https://github.com/elastic/eui/pull/7298))
- Fixed `EuiListGroupItem`'s non-transitioned transform on hover/focus ([#7298](https://github.com/elastic/eui/pull/7298))
- Fixed `EuiDataGrid`s with `gridStyle.stripes` sometimes showing buggy row striping after being sorted ([#7301](https://github.com/elastic/eui/pull/7301))
- Fixed `EuiDataGrid`'s `gridStyle.rowClasses` API to not conflict with `gridStyle.stripes` if dynamically updated ([#7301](https://github.com/elastic/eui/pull/7301))
- Fixed `EuiDataGrid`'s `gridStyle.rowClasses` API to support multiple space-separated classes ([#7301](https://github.com/elastic/eui/pull/7301))
- Fixed `EuiInputPopover` not calling `onPanelResize` callback prop ([#7305](https://github.com/elastic/eui/pull/7305))
- Fixed `EuiDualRange` incorrectly positioning highlights when rendered with `showInput="inputWithPopover"` ([#7305](https://github.com/elastic/eui/pull/7305))
- Fixed `EuiTabs` incorrectly wrapping text when it should instead either scroll or truncate ([#7309](https://github.com/elastic/eui/pull/7309))
- `EuiContextMenu` now renders text colors correctly when used within an `EuiBottomBar` ([#7312](https://github.com/elastic/eui/pull/7312))
- Fixed the width of `EuiSuperDatePicker`'s Absolute date picker ([#7313](https://github.com/elastic/eui/pull/7313))
- Fixed `EuiDataGrid` cells visually cutting off overflowing content a little too quickly ([#7320](https://github.com/elastic/eui/pull/7320))

**Deprecations**

- Deprecated `EuiBasicTable` and `EuiInMemoryTable`'s ref `setSelection` API. Use the new `selection.selected` API instead. ([#7321](https://github.com/elastic/eui/pull/7321))

**Breaking changes**

- Removed `EuiPageTemplate_Deprecated`, `EuiPageSideBar_Deprecated`, and `EuiPageContent*_Deprecated` ([#7265](https://github.com/elastic/eui/pull/7265))
- Removed the `ghost` color option from `EuiButton`, `EuiButtonEmpty`, and `EuiButtonIcon`. Use an `<EuiThemeProvider colorMode="dark">` wrapper and `color="text"` instead. ([#7296](https://github.com/elastic/eui/pull/7296))

**Dependency updates**

- Updated `refractor` to v3.6.0 ([#7127](https://github.com/elastic/eui/pull/7127))
- Updated `rehype-raw` to v5.1.0 ([#7127](https://github.com/elastic/eui/pull/7127))
- Updated `vfile` to v4.2.1 ([#7127](https://github.com/elastic/eui/pull/7127))

**Accessibility**

- `EuiContextMenu` now correctly respects reduced motion preferences ([#7312](https://github.com/elastic/eui/pull/7312))
- `EuiAccordion`s no longer attempt to focus child content when the accordion is externally opened via `forceState`, but will continue to focus expanded content when users click the toggle button. ([#7314](https://github.com/elastic/eui/pull/7314))

**CSS-in-JS conversions**

- Converted `EuiContextMenu`, `EuiContextMenuPanel`, and `EuiContextMenuItem` to Emotion; Removed `$euiContextMenuWidth` ([#7312](https://github.com/elastic/eui/pull/7312))

## [`v89.1.0`](https://github.com/elastic/eui/releases/tag/v89.1.0)

- Added `tokenVectorSparse` token and updated `tokenDenseVector` token (now named `tokenVectorDense`). ([#7282](https://github.com/elastic/eui/pull/7282))

**CSS-in-JS conversions**

- Reduced default CSS prefixes generated by Emotion to only browsers supported by EUI (latest evergreen browsers). This can be customized by passing your own Emotion cache to `EuiProvider`. ([#7272](https://github.com/elastic/eui/pull/7272))

## [`v89.0.0`](https://github.com/elastic/eui/releases/tag/v89.0.0)

- Added new `pushAnimation` prop to push `EuiFlyout`s, which enables a slide in animation ([#7239](https://github.com/elastic/eui/pull/7239))
- Updated `EuiComboBox` to use `EuiInputPopover` under the hood ([#7246](https://github.com/elastic/eui/pull/7246))
- Added `inputPopoverProps` to `EuiComboBox`, which allows customizing the underlying popover ([#7246](https://github.com/elastic/eui/pull/7246))
- Added a new beta `EuiTextBlockTruncate` component for multi-line truncation ([#7250](https://github.com/elastic/eui/pull/7250))
- Updated `EuiBasicTable` and `EuiInMemoryTable` to support multi-line truncation. This can be set via `truncateText.lines` in the `columns` prop. ([#7254](https://github.com/elastic/eui/pull/7254))

**Bug fixes**

- Fixed `EuiFlexGroup` and `EuiFlexGrid's `m` gutter size ([#7251](https://github.com/elastic/eui/pull/7251))
- Fixed focus trap rerender issues in `EuiFlyout` with memoization ([#7259](https://github.com/elastic/eui/pull/7259))
- Fixed a visual bug with `EuiContextMenu`'s animation between panels ([#7268](https://github.com/elastic/eui/pull/7268))

**Breaking changes**

- EUI's global body font-size now respects the `font.defaultUnits` token. This means that the global font size will use the `rem` unit by default, instead of `px`. ([#7182](https://github.com/elastic/eui/pull/7182))
- Removed exported `accessibleClickKeys`, `comboBoxKeys`, and `cascadingMenuKeys` services. Use the generic `keys` service instead ([#7256](https://github.com/elastic/eui/pull/7256))
- Removed `EuiColorStops` due to low usage ([#7262](https://github.com/elastic/eui/pull/7262))
- Removed `EuiSuggest`. We recommend using `EuiSelectable` or `EuiComboBox` instead ([#7263](https://github.com/elastic/eui/pull/7263))
- Removed `euiHeaderAffordForFixed` Sass mixin, and  `$euiHeaderHeight` and `$euiHeaderHeightCompensation` Sass variables. Use the CSS variable `--var(euiFixedHeadersOffset, 0)` instead. ([#7264](https://github.com/elastic/eui/pull/7264))

**Accessibility**

- When using `rem` or `em` font units, EUI now respects, instead of ignoring, browser default font sizes set by end users. ([#7182](https://github.com/elastic/eui/pull/7182))

## [`v88.5.4`](https://github.com/elastic/eui/releases/tag/v88.5.4)

- This release contains internal changes to a beta component needed by Kibana.

## [`v88.5.3`](https://github.com/elastic/eui/releases/tag/v88.5.3)

**Bug fixes**

- Fixed `EuiComboBox` search input width not resetting correctly on selection ([#7240](https://github.com/elastic/eui/pull/7240))

## [`v88.5.2`](https://github.com/elastic/eui/releases/tag/v88.5.2)

**Bug fixes**

- Fixed broken `EuiTextTruncate` testenv mocks ([#7234](https://github.com/elastic/eui/pull/7234))

## [`v88.5.1`](https://github.com/elastic/eui/releases/tag/v88.5.1)

- Improved the performance of `EuiComboBox` by removing the `react-autosizer-input` dependency ([#7215](https://github.com/elastic/eui/pull/7215))

**Dependency updates**

- Updated `react-element-to-jsx-string` to v5.0.0 ([#7214](https://github.com/elastic/eui/pull/7214))
- Removed unused `@types/vfile-message` dependency ([#7214](https://github.com/elastic/eui/pull/7214))

## [`v88.5.0`](https://github.com/elastic/eui/releases/tag/v88.5.0)

- Updated `EuiCallOut` with a new `onDismiss` prop ([#7156](https://github.com/elastic/eui/pull/7156))
- Added a new `renderCustomToolbar` prop to `EuiDataGrid`, which allows custom rendering of the toolbar. ([#7190](https://github.com/elastic/eui/pull/7190))
- Added a new `allowResetButton` prop to `toolbarVisibility.showDisplaySelector` of `EuiDataGrid`, which allows hiding the "Reset to default" button from the display settings popover. ([#7190](https://github.com/elastic/eui/pull/7190))
- Added a new `additionalDisplaySettings` prop to `toolbarVisibility.showDisplaySelector` of `EuiDataGrid`, which allows rendering extra settings inside the display settings popover. ([#7190](https://github.com/elastic/eui/pull/7190))
- Updated `EuiDataGrid`'s toolbar display settings button icon ([#7190](https://github.com/elastic/eui/pull/7190))
- Updated `EuiTextTruncate` with significantly improved iteration performance. Removed `measurementRenderAPI` prop, as `EuiTextTruncation` now only uses more performant canvas render API ([#7210](https://github.com/elastic/eui/pull/7210))
- Updated `EuiPopover` with a new configurable `repositionToCrossAxis` prop ([#7211](https://github.com/elastic/eui/pull/7211))
- Updated `EuiDatePicker` to support `compressed` input styling ([#7218](https://github.com/elastic/eui/pull/7218))
- Added `gradient` and `palette` icon glyphs. ([#7220](https://github.com/elastic/eui/pull/7220))

**Bug fixes**

- Fixed `EuiPopover`'s missing animations on popover close ([#7211](https://github.com/elastic/eui/pull/7211))
- Fixed `EuiInputPopover` anchoring to the wrong side and missing shadows on smaller screens ([#7211](https://github.com/elastic/eui/pull/7211))
- Fixed `EuiSuperDatePicker` icon spacing on the quick select button ([#7217](https://github.com/elastic/eui/pull/7217))
- Fixed a missing type in `EuiMarkdownEditor`'s default processing plugins ([#7221](https://github.com/elastic/eui/pull/7221))

## [`v88.4.1`](https://github.com/elastic/eui/releases/tag/v88.4.1)

**Bug fixes**

- Fixed missing `className`s on `EuiTextTruncate` ([#7212](https://github.com/elastic/eui/pull/7212))
- Fixed `title`s on `EuiComboBox` dropdown options to always be present ([#7212](https://github.com/elastic/eui/pull/7212))
- Fixed `EuiComboBox` truncation issues when search is an empty space ([#7212](https://github.com/elastic/eui/pull/7212))

## [`v88.4.0`](https://github.com/elastic/eui/releases/tag/v88.4.0)

- Updated `EuiComboBox` to allow configuring text truncation behavior via `truncationProps`. These props can be set on the entire combobox as well as on on individual dropdown options. ([#7028](https://github.com/elastic/eui/pull/7028))
- Updated `EuiInMemoryTable` with a new `searchFormat` prop (defaults to `eql`). When setting this prop to `text`, the built-in search bar will ignore EQL syntax and allow searching for plain strings with special characters and symbols. ([#7175](https://github.com/elastic/eui/pull/7175))

**Bug fixes**

- `EuiComboBox` now always shows the highlighted search text, even on truncated text ([#7028](https://github.com/elastic/eui/pull/7028))
- Fixed missing i18n in `EuiSearchBar`'s default placeholder and aria-label text ([#7175](https://github.com/elastic/eui/pull/7175))
- Fixed the inline compressed styles of `EuiDescriptionListTitle` to use a taller line-height for readability ([#7185](https://github.com/elastic/eui/pull/7185))
- Fixed `EuiComboBox` to correctly truncate selected items when displayed as pills and plain text ([#7193](https://github.com/elastic/eui/pull/7193))

**Accessibility**

- Added `aria-current` attribute to `EuiTablePagination` ([#7186](https://github.com/elastic/eui/pull/7186))

**CSS-in-JS conversions**

- Converted `EuiDroppable` and `EuiDraggable` to Emotion; Removed `$euiDragAndDropSpacing` Sass variables ([#7187](https://github.com/elastic/eui/pull/7187))

## [`v88.3.0`](https://github.com/elastic/eui/releases/tag/v88.3.0)

- `EuiGlobalToastList` now shows a "Clear all" button by default once above a certain number of toasts (defaults to 3). This threshold is configurable with the `showClearAllButtonAt` prop ([#7111](https://github.com/elastic/eui/pull/7111))
- Added an optional `onClearAllToasts` callback to `EuiGlobalToastList` ([#7111](https://github.com/elastic/eui/pull/7111))
- Added the `value`, `onChange`, and `onCancel` props that allow `EuiInlineEdit` to be used as a controlled component ([#7157](https://github.com/elastic/eui/pull/7157))
- Added `grabOmnidirectional`, `transitionLeftIn`, `transitionLeftOut`, `transitionTopIn`, and `transitionTopOut` icon glyphs. ([#7168](https://github.com/elastic/eui/pull/7168))

**Bug fixes**

- Fixed `EuiInlineEdit` components to correctly spread `...rest` attributes to the parent wrapper ([#7157](https://github.com/elastic/eui/pull/7157))
- Fixed `EuiListGroupItem` to correctly render the `extraAction` button when `showToolTip` is also passed ([#7159](https://github.com/elastic/eui/pull/7159))

**Dependency updates**

- Updated `@hello-pangea/dnd` to v16.3.0 ([#7125](https://github.com/elastic/eui/pull/7125))
- Updated `@types/lodash` to v4.14.198 ([#7126](https://github.com/elastic/eui/pull/7126))

**Accessibility**

- `EuiAccordion` now correctly respects reduced motion settings ([#7161](https://github.com/elastic/eui/pull/7161))
- `EuiAccordion` now shows a focus outline to keyboard users around its revealed children on open ([#7161](https://github.com/elastic/eui/pull/7161))

**CSS-in-JS conversions**

- Converted `EuiSplitPanel` to Emotion ([#7172](https://github.com/elastic/eui/pull/7172))

## [`v88.2.0`](https://github.com/elastic/eui/releases/tag/v88.2.0)

- Added a new `EuiTextTruncate` component, which provides custom truncation options beyond native CSS ([#7116](https://github.com/elastic/eui/pull/7116))
- Fixed-positioned `EuiHeader`s now set a global CSS `--euiFixedHeadersOffset` variable, which updates dynamically based on the number of fixed headers on the page. ([#7144](https://github.com/elastic/eui/pull/7144))
- `EuiFlyout`s now dynamically set their position, height, and mask based on the number of fixed headers on the page. ([#7144](https://github.com/elastic/eui/pull/7144))
- Sticky-positioned `EuiPageSidebar`s now dynamically set their position and height based on the number of fixed headers on the page. This can still be overridden via the `sticky.offset` prop if needed. ([#7144](https://github.com/elastic/eui/pull/7144))
- `EuiPageTemplate` now dynamically offsets content from any fixed headers on the page. This can still be overridden via the `offset` prop if needed. ([#7144](https://github.com/elastic/eui/pull/7144))
- Updated `EuiAccordion` with a new `borders` prop ([#7154](https://github.com/elastic/eui/pull/7154))
- Updated `EuiAccordion` with a new `buttonProps.paddingSize` prop ([#7154](https://github.com/elastic/eui/pull/7154))

**Deprecations**

- Deprecated the Sass `euiHeaderAffordForFixed` mixin. Use the new global CSS `var(--euiFixedHeadersOffset)` variable instead. ([#7144](https://github.com/elastic/eui/pull/7144))

**CSS-in-JS conversions**

- Except for generic CSS utilities, EUI is moving away from providing global `classNames` that are component-specific. As part of this effort, we have removed the following `EuiAccordion`-specific classes: ([#7154](https://github.com/elastic/eui/pull/7154))
  - Removed `.euiAccordionForm` styles. Use the `borders="horizontal"` prop instead
  - Removed `.euiAccordionForm__button` styles. Use the `buttonProps={{ paddingSize: 'm' }}` prop instead
  - Removed `.euiAccordionForm__extraAction` styles. Convert this to your own custom CSS if necessary.
  - Removed `.euiAccordionForm__title` styles. Convert this to your own custom CSS if necessary.

## [`v88.1.0`](https://github.com/elastic/eui/releases/tag/v88.1.0)

- Added `font.defaultUnits` theme token. EUI component font sizes default to `rem` units - this token allows consumers to configure this to `px` or `em` ([#7133](https://github.com/elastic/eui/pull/7133))
- Updated `EuiDescriptionList` with new `columnWidths` prop ([#7146](https://github.com/elastic/eui/pull/7146))

**Bug fixes**

- Fixed `EuiDataGrid`'s keyboard shortcuts popover display ([#7146](https://github.com/elastic/eui/pull/7146))

**CSS-in-JS conversions**

- Renamed `useEuiFontSize()`'s `measurement` option to `unit` for clarity ([#7133](https://github.com/elastic/eui/pull/7133))

## [`v88.0.0`](https://github.com/elastic/eui/releases/tag/v88.0.0)

- Updated `EuiDescriptionList` with a new `columnGutterSize` prop ([#7062](https://github.com/elastic/eui/pull/7062))

**Deprecations**

- Deprecated `EuiSuggest`. We recommend using `EuiSelectable` or `EuiComboBox` instead ([#7122](https://github.com/elastic/eui/pull/7122))
- Deprecated `EuiControlBar`. We recommend using `EuiBottomBar` instead ([#7122](https://github.com/elastic/eui/pull/7122))
- Deprecated `EuiColorStops`. We recommend copying the component to your application if necessary ([#7122](https://github.com/elastic/eui/pull/7122))
- Deprecated `EuiNotificationEvent`. We recommend copying the component to your application if necessary ([#7122](https://github.com/elastic/eui/pull/7122))

**Breaking changes**

- Renamed `EuiDescriptionList`'s `gutterSize` prop to `rowGutterSize` ([#7062](https://github.com/elastic/eui/pull/7062))
- `EuiDescriptionList`'s `rowGutterSize` prop now defaults to a size of `s` (was previously `m`) ([#7062](https://github.com/elastic/eui/pull/7062))

**Accessibility**

- Fixed the dark mode colors of inline `EuiDescriptionListTitle`s to meet WCAG color contrast requirements ([#7062](https://github.com/elastic/eui/pull/7062))

**CSS-in-JS conversions**

- Converted `EuiKeyPadMenuItem` to Emotion; Removed `$euiKeyPadMenuSize` and `$euiKeyPadMenuMarginSize` ([#7118](https://github.com/elastic/eui/pull/7118))

## [`v87.2.0`](https://github.com/elastic/eui/releases/tag/v87.2.0)

- `EuiResizableButton` is now available as a generic top-level export ([#7087](https://github.com/elastic/eui/pull/7087))
- Added new `alignIndicator` prop to `EuiResizableButton`. Defaults to `center`, and can now additionally be configured to `start` and `end` ([#7087](https://github.com/elastic/eui/pull/7087))
- Updated `useGeneratedHtmlId` hook to use `React.useId` as the source of unique identifiers when available ([#7095](https://github.com/elastic/eui/pull/7095))

**CSS-in-JS conversions**

- Converted `EuiResizableButton` to Emotion; Removed `$euiResizableButtonTransitionSpeed` and `$euiResizableButtonSize` ([#7081](https://github.com/elastic/eui/pull/7081))
- Converted `EuiResizableCollapseButton` to Emotion ([#7091](https://github.com/elastic/eui/pull/7091))

## [`v87.1.0`](https://github.com/elastic/eui/releases/tag/v87.1.0)

- Updated the underlying library powering `EuiAutoSizer`. This primarily affects typing around the `disableHeight` and `disableWidth` props ([#6798](https://github.com/elastic/eui/pull/6798))
- Added new `EuiAutoSize`, `EuiAutoSizeHorizontal`, and `EuiAutoSizeVertical` types to support `EuiAutoSizer`'s now-stricter typing ([#6798](https://github.com/elastic/eui/pull/6798))
- Updated `EuiDatePickerRange` to support `compressed` display ([#7058](https://github.com/elastic/eui/pull/7058))
- Updated `EuiFlyoutBody` with a new `scrollableTabIndex` prop ([#7061](https://github.com/elastic/eui/pull/7061))
- Added a new `panelMinWidth` prop to `EuiInputPopover` ([#7071](https://github.com/elastic/eui/pull/7071))
- Added a new `inputPopoverProps` prop for `EuiRange`s and `EuiDualRange`s with `showInput="inputWithPopover"` set ([#7082](https://github.com/elastic/eui/pull/7082))

**Bug fixes**

- Fixed `EuiToolTip` overriding instead of merging its `aria-describedby` tooltip ID with any existing `aria-describedby`s ([#7055](https://github.com/elastic/eui/pull/7055))
- Fixed `EuiSuperDatePicker`'s `compressed` display ([#7058](https://github.com/elastic/eui/pull/7058))
- Fixed `EuiAccordion` to remove tabbable children from sequential keyboard navigation when the accordion is closed ([#7064](https://github.com/elastic/eui/pull/7064))
- Fixed `EuiFlyout`s to accept custom `aria-describedby` IDs ([#7065](https://github.com/elastic/eui/pull/7065))

**Accessibility**

- Removed the default `dialog` role and `tabIndex` from push `EuiFlyout`s. Push flyouts, compared to overlay flyouts, require manual accessibility management. ([#7065](https://github.com/elastic/eui/pull/7065))

## [`v87.0.0`](https://github.com/elastic/eui/releases/tag/v87.0.0)

- Added beta `componentDefaults` prop to `EuiProvider`, which will allow configuring certain default props globally. This list of components and defaults is still under consideration. ([#6923](https://github.com/elastic/eui/pull/6923))
- `EuiPortal`'s `insert` prop can now be configured globally via `EuiProvider.componentDefaults` ([#6941](https://github.com/elastic/eui/pull/6941))
- `EuiFocusTrap`'s `crossFrame` and `gapMode` props can now be configured globally via `EuiProvider.componentDefaults` ([#6942](https://github.com/elastic/eui/pull/6942))
- `EuiTablePagination`'s `itemsPerPage`, `itemsPerPageOptions`, and `showPerPageOptions` props can now be configured globally via `EuiProvider.componentDefaults` ([#6951](https://github.com/elastic/eui/pull/6951))
- `EuiBasicTable`, `EuiInMemoryTable`, and `EuiDataGrid` now allow `pagination.pageSize` to be undefined. If undefined, `pageSize` defaults to `EuiTablePagination`'s `itemsPerPage` component default. ([#6993](https://github.com/elastic/eui/pull/6993))
- `EuiBasicTable`, `EuiInMemoryTable`, and `EuiDataGrid`'s `pagination.pageSizeOptions` will now fall back to `EuiTablePagination`'s `itemsPerPageOptions` component default. ([#6993](https://github.com/elastic/eui/pull/6993))
- Updated `EuiHeaderLinks`'s `gutterSize` spacings ([#7005](https://github.com/elastic/eui/pull/7005))
- Updated `EuiHeaderAlert`'s stacking styles ([#7005](https://github.com/elastic/eui/pull/7005))
- Added `toolTipProps` to `EuiListGroupItem` that allows customizing item tooltips. ([#7018](https://github.com/elastic/eui/pull/7018))
- Updated `EuiBreadcrumbs` to support breadcrumbs that toggle popovers via `popoverContent` and `popoverProps` ([#7031](https://github.com/elastic/eui/pull/7031))
- Improved the contrast ratio of disabled titles within `EuiSteps` and `EuiStepsHorizontal` to meet WCAG AA guidelines. ([#7032](https://github.com/elastic/eui/pull/7032))
- Updated `EuiSteps` and `EuiStepsHorizontal` to highlight and provide a more clear visual indication of the current step ([#7048](https://github.com/elastic/eui/pull/7048))

**Bug fixes**

- Single uses of `<EuiHeaderSectionItem side="right" />` now align right as expected without needing a previous `side="left"` sibling. ([#7005](https://github.com/elastic/eui/pull/7005))
- `EuiPageTemplate` now correctly displays `panelled={true}` ([#7044](https://github.com/elastic/eui/pull/7044))

**Breaking changes**

- `EuiTablePagination`'s default `itemsPerPage` is now `10` (was previously `50`). This can be configured through `EuiProvider.componentDefaults`. ([#6993](https://github.com/elastic/eui/pull/6993))
- `EuiTablePagination`'s default `itemsPerPageOptions` is now `[10, 25, 50]` (was previously `[10, 20, 50, 100]`). This can be configured through `EuiProvider.componentDefaults`. ([#6993](https://github.com/elastic/eui/pull/6993))
- Removed `border` prop from `EuiHeaderSectionItem` (unused since Amsterdam theme) ([#7005](https://github.com/elastic/eui/pull/7005))
- Removed `borders` object configuration from `EuiHeader.sections` ([#7005](https://github.com/elastic/eui/pull/7005))

**CSS-in-JS conversions**

- Converted `EuiHeaderAlert` to Emotion; Removed unused `.euiHeaderAlert__dismiss` CSS ([#7005](https://github.com/elastic/eui/pull/7005))
- Converted `EuiHeaderSection`, `EuiHeaderSectionItem`, and `EuiHeaderSectionItemButton` to Emotion ([#7005](https://github.com/elastic/eui/pull/7005))
- Converted `EuiHeaderLinks` and `EuiHeaderLink` to Emotion; Removed `$euiHeaderLinksGutterSizes` Sass variables ([#7005](https://github.com/elastic/eui/pull/7005))
- Removed `$euiHeaderBackgroundColor` Sass variable; use `$euiColorEmptyShade` instead ([#7005](https://github.com/elastic/eui/pull/7005))
- Removed `$euiHeaderChildSize` Sass variable; use `$euiSizeXXL` instead ([#7005](https://github.com/elastic/eui/pull/7005))

## [`v86.0.0`](https://github.com/elastic/eui/releases/tag/v86.0.0)

- Added React 18 support (StrictMode not yet supported). ([#7012](https://github.com/elastic/eui/pull/7012))

**Deprecations**

- Deprecated `euiPaletteComplimentary`; Use `euiPaletteComplementary` instead. ([#6992](https://github.com/elastic/eui/pull/6992))

**Breaking changes**

- Replaced the underlying drag-and-drop library from `react-beautiful-dnd` to its fork `@hello-pangea/dnd` ([#7012](https://github.com/elastic/eui/pull/7012)) ([#7012](https://github.com/elastic/eui/pull/7012))
  - No code updates are needed if using only `<EuiDragDropContext>`, `<EuiDroppable>` and `<EuiDraggable>` with no direct imports from `react-beautiful-dnd`. In case you were importing things from `react-beautiful-dnd` and using them together with EUI components, you need to switch to `@hello-pangea/dnd` which has cross-compatible API.

## [`v85.1.0`](https://github.com/elastic/eui/releases/tag/v85.1.0)

- Updated `EuiComboBox`'s `options` to accept `option.append` and `option.prepend` props ([#6953](https://github.com/elastic/eui/pull/6953))
- Updated deprecated `.substr()` usages to `.substring()` ([#6954](https://github.com/elastic/eui/pull/6954))
- Updated `EuiInlineEdit`'s read mode button to include a title tooltip, increasing readability of truncated text ([#6966](https://github.com/elastic/eui/pull/6966))

**Bug fixes**

- Fixed `EuiFilterGroup`'s responsive styles ([#6983](https://github.com/elastic/eui/pull/6983))

**Deprecations**

- Deprecated `EuiFilterSelectItem`; Use `EuiSelectable` instead ([#6982](https://github.com/elastic/eui/pull/6982))

**CSS-in-JS conversions**

- Converted `EuiFilterSelectItem` to Emotion ([#6982](https://github.com/elastic/eui/pull/6982))
- Removed `.euiFilterSelect__items` CSS; Use `EuiSelectable` instead ([#6982](https://github.com/elastic/eui/pull/6982))
- Removed `.euiFilterSelect__note` and `.euiFilterSelect__noteContent` CSS; Use `EuiSelectableMessage` instead ([#6982](https://github.com/elastic/eui/pull/6982))
- Added `focus.transparency` and `focus.backgroundColor` theme tokens ([#6984](https://github.com/elastic/eui/pull/6984))

## [`v85.0.0`](https://github.com/elastic/eui/releases/tag/v85.0.0)

- Updated `EuiThemeProvider` to set an Emotion theme context that returns the values of `useEuiTheme()` ([#6913](https://github.com/elastic/eui/pull/6913))
- Added `size` prop to `EuiStepsHorizontal`, defaulting to the previous size of `m` ([#6928](https://github.com/elastic/eui/pull/6928))
- Added new `s` sizing to `EuiStepsHorizontal` ([#6928](https://github.com/elastic/eui/pull/6928))
- Added `at` and `key` icon glyphs. ([#6934](https://github.com/elastic/eui/pull/6934))
- Added a new `cloneElementWithCss` Emotion utility ([#6939](https://github.com/elastic/eui/pull/6939))
- Updated `EuiPopover` to allow consumer control of all `focusTrapProps` ([#6955](https://github.com/elastic/eui/pull/6955))

**Bug fixes**

- Fixed `EuiDataGrid` height calculation bug when browser zoom levels are not 100% ([#6895](https://github.com/elastic/eui/pull/6895))
- Fixed `EuiTab` not correctly passing selection color state to `prepend` and `append` children ([#6938](https://github.com/elastic/eui/pull/6938))
- Fixed `EuiInputPopover` to allow consumer control of its focus trap via `focusTrapProps` ([#6955](https://github.com/elastic/eui/pull/6955))

**Breaking changes**

- `EuiProvider` will no longer render multiple or duplicate nested instances of itself. If a nested `EuiProvider` is detected, that instance will return early without further processing, and will warn if configured to do so via `setEuiDevProviderWarning`. For nested theming, use `EuiThemeProvider` instead. ([#6949](https://github.com/elastic/eui/pull/6949))
- Removed `onTrapDeactivation` prop from `EuiPopover`. Use `focusTrapProps.onDeactivation` instead ([#6955](https://github.com/elastic/eui/pull/6955))

**CSS-in-JS conversions**

- Converted `EuiFilterGroup` and `EuiFilterButton` to Emotion; Removed styles attached to `.euiFilterGroup__popoverPanel` ([#6957](https://github.com/elastic/eui/pull/6957))

## [`v84.0.0`](https://github.com/elastic/eui/releases/tag/v84.0.0)

- Updated `EuiDualRange`'s `minInputProps` and `maxInputProps` to support passing more props to underlying inputs ([#6902](https://github.com/elastic/eui/pull/6902))
- `EuiFocusTrap` now supports configuring cross-iframe focus trapping via the `crossFrame` prop ([#6908](https://github.com/elastic/eui/pull/6908))

**Bug fixes**

- Fixed `EuiFilterButton` icon display ([#6900](https://github.com/elastic/eui/pull/6900))
- Fixed `EuiCombobox` compressed plain text display ([#6910](https://github.com/elastic/eui/pull/6910))
- Fixed visual appearance of collapse buttons on collapsible `EuiResizablePanel`s ([#6926](https://github.com/elastic/eui/pull/6926))

**Breaking changes**

- `EuiFocusTrap` now defaults to *not* trapping focus across iframes ([#6908](https://github.com/elastic/eui/pull/6908))

## [`v83.1.0`](https://github.com/elastic/eui/releases/tag/v83.1.0)

- Added `placeholder` prop to `EuiInlineEdit` ([#6883](https://github.com/elastic/eui/pull/6883))
- Added `sparkles` glyph to `EuiIcon` ([#6898](https://github.com/elastic/eui/pull/6898))

**Bug fixes**

- Fixed Safari-only bug for single-line row `EuiDataGrid`s, where cell actions on hover would overlap instead of pushing content to the left ([#6881](https://github.com/elastic/eui/pull/6881))
- Fixed `EuiButton` not correctly merging in passed `className`s with its base `.euiButton` class ([#6887](https://github.com/elastic/eui/pull/6887))
- Fixed `EuiIcon` not correctly passing the `style` prop custom `img` icons ([#6888](https://github.com/elastic/eui/pull/6888))
- Fixed multiple components with child props (e.g. `buttonProps`, `iconProps`, etc.) unsetting EUI's Emotion styling if custom `css` was passed to the child props object ([#6896](https://github.com/elastic/eui/pull/6896))

**CSS-in-JS conversions**

- Converted `EuiHeader` and `EuiHeaderLogo` to Emotion ([#6878](https://github.com/elastic/eui/pull/6878))
- Removed Sass variables `$euiHeaderDarkBackgroundColor`, `$euiHeaderBorderColor`, and `$euiHeaderBreadcrumbColor` ([#6878](https://github.com/elastic/eui/pull/6878))
- Removed Sass mixin `@euiHeaderDarkTheme` ([#6878](https://github.com/elastic/eui/pull/6878))

## [`v83.0.0`](https://github.com/elastic/eui/releases/tag/v83.0.0)

**Bug fixes**

- Fixed `EuiPaginationButton` styling affected by `EuiButtonEmpty`'s Emotion conversion ([#6893](https://github.com/elastic/eui/pull/6893))

**Breaking changes**

- Removed `isPlaceholder` prop from `EuiPaginationButton` ([#6893](https://github.com/elastic/eui/pull/6893))

## [`v82.2.1`](https://github.com/elastic/eui/releases/tag/v82.2.1)

- Updated supported Node engine versions to allow Node 16, 18 and >=20 ([#6884](https://github.com/elastic/eui/pull/6884))

## [`v82.2.0`](https://github.com/elastic/eui/releases/tag/v82.2.0)

- Updated EUI's SVG icons library to use latest SVGO v3 optimization ([#6843](https://github.com/elastic/eui/pull/6843))
- Added success color `EuiNotificationBadge` ([#6864](https://github.com/elastic/eui/pull/6864))
- Added `badgeColor` prop to `EuiFilterButton` ([#6864](https://github.com/elastic/eui/pull/6864))
- Updated `EuiBadge` to use CSS-in-JS for named colors instead of inline styles. Custom colors will still use inline styles. ([#6864](https://github.com/elastic/eui/pull/6864))

**CSS-in-JS conversions**

- Converted `EuiButtonGroup` and `EuiButtonGroupButton` to Emotion ([#6841](https://github.com/elastic/eui/pull/6841))
- Converted `EuiButtonIcon` to Emotion ([#6844](https://github.com/elastic/eui/pull/6844))
- Converted `EuiButtonEmpty` to Emotion ([#6863](https://github.com/elastic/eui/pull/6863))
- Converted `EuiCollapsibleNav` and `EuiCollapsibleNavGroup` to Emotion ([#6865](https://github.com/elastic/eui/pull/6865))
- Removed Sass variables `$euiCollapsibleNavGroupLightBackgroundColor`, `$euiCollapsibleNavGroupDarkBackgroundColor`, and `$euiCollapsibleNavGroupDarkHighContrastColor` ([#6865](https://github.com/elastic/eui/pull/6865))

## [`v82.1.0`](https://github.com/elastic/eui/releases/tag/v82.1.0)

- Added ability for `EuiMarkdownEditor` plugins to disable toolbar buttons ([#6840](https://github.com/elastic/eui/pull/6840))

## [`v82.0.0`](https://github.com/elastic/eui/releases/tag/v82.0.0)

**Bug fixes**

- Fixed `EuiPopover`'s types to omit `panelProps.hasBorder` and `panelProps.hasShadow` - these props are not customizable on popovers for visual consistency ([#6836](https://github.com/elastic/eui/pull/6836))

**Breaking changes**

- `EuiRange` & `EuiDualRange` no longer have a hard limit of 20 displayed ticks. The component now instead detects the width available, and throws an error if each tick has less than 5 pixels of width. We recommend testing your tick usage at smaller screens to ensure they always display legibly to users. ([#6829](https://github.com/elastic/eui/pull/6829))

## [`v81.3.0`](https://github.com/elastic/eui/releases/tag/v81.3.0)

- Added `timelineWithArrow` glyph to `EuiIcon` ([#6822](https://github.com/elastic/eui/pull/6822))

**Bug fixes**

- Fixed `EuiCodeBlock` potentially incorrectly ignoring lines ending with a question mark when using the Copy button. ([#6794](https://github.com/elastic/eui/pull/6794))
- Fixed `EuiCodeBlock` to not include line numbers when copying content ([#6824](https://github.com/elastic/eui/pull/6824))
- Fixed the expanded row animation on `EuiBasicTable` causing cross-browser Safari issues ([#6826](https://github.com/elastic/eui/pull/6826))

## [`v81.2.0`](https://github.com/elastic/eui/releases/tag/v81.2.0)

- Updated `EuiSuperDatePicker` to accept an object configuration for `isDisabled` ([#6821](https://github.com/elastic/eui/pull/6821))

**Bug fixes**

- Fixed broken `EuiSuperDatePicker` styles ([#6821](https://github.com/elastic/eui/pull/6821))

## [`v81.1.0`](https://github.com/elastic/eui/releases/tag/v81.1.0)

- Added `EuiInlineEditText` and `EuiInlineEditTitle` components ([#6757](https://github.com/elastic/eui/pull/6757))
- Updated `EuiDatePickerRange` to support `inline` display ([#6795](https://github.com/elastic/eui/pull/6795))
- Added an `onError` callback prop to `EuiErrorBoundary` ([#6810](https://github.com/elastic/eui/pull/6810))
- Updated `EuiDataGrid` to only render screen reader text announcing cell position if the cell is currently focused. This should improve the ability to copy and paste multiple cells without SR text. ([#6817](https://github.com/elastic/eui/pull/6817))

**Bug fixes**

- Fixed `EuiDatePicker`'s `inline` display to correctly render and prevent user interaction when `disabled` or `readOnly` ([#6795](https://github.com/elastic/eui/pull/6795))
- Fixed `EuiDatePicker`'s `inline` display to correctly render `isInvalid` and `isLoading` icons ([#6795](https://github.com/elastic/eui/pull/6795))

**CSS-in-JS conversions**

- Converted `EuiDatePickerRange` to Emotion ([#6795](https://github.com/elastic/eui/pull/6795))

## [`v81.0.0`](https://github.com/elastic/eui/releases/tag/v81.0.0)

- Added ability to set `options.checked` to "mixed" in `EuiSelectable` ([#6774](https://github.com/elastic/eui/pull/6774))

**Bug fixes**

- Portalled components (e.g. `EuiPopover`, `EuiModal`, `EuiFlyout`) will correctly inherit text color from its nearest `EuiThemeProvider` parent. `<EuiText color="default">` is no longer needed. ([#6775](https://github.com/elastic/eui/pull/6775))

**Breaking changes**

- `EuiSelectable` no longer renders a `data-test-selected` attribute on its list items. Use the `aria-checked` property instead ([#6774](https://github.com/elastic/eui/pull/6774))
- Nested `EuiThemeProvider`s now render a wrapping `<span>` element in order to correctly set the inherited text `color` of all descendants. `<EuiText color="default">` is no longer needed. ([#6775](https://github.com/elastic/eui/pull/6775))

## [`v80.0.0`](https://github.com/elastic/eui/releases/tag/v80.0.0)

- Improved the contrast ratio of meta labels within `EuiSelectableTemplateSitewide` to meet WCAG AA guidelines. ([#6761](https://github.com/elastic/eui/pull/6761))
- Added `vulnerabilityManagementApp` glyph to `EuiIcon` ([#6762](https://github.com/elastic/eui/pull/6762))
- Added `logoVulnerabilityManagement` icon to `EuiIcon` ([#6763](https://github.com/elastic/eui/pull/6763))
- Added `onPanelChange` callback to `EuiContextMenu` to provide consumer access to `panelId` and `direction`. ([#6767](https://github.com/elastic/eui/pull/6767))

**Bug fixes**

- Fixed `EuiComboBox` so `append` and `prepend` icon buttons are full height and vertically centered. ([#6766](https://github.com/elastic/eui/pull/6766))
- Improved the uniformity of dropdown components by hiding the dropdown icon of disabled `EuiComboBox`s. ([#6768](https://github.com/elastic/eui/pull/6768))

**Breaking changes**

- `EuiFieldNumber` now defaults the `step` prop to `"any"` ([#6760](https://github.com/elastic/eui/pull/6760))
- EUI now globally resets a default Chromium browser style that was decreasing the opacity of disabled `select` items. ([#6768](https://github.com/elastic/eui/pull/6768))

## [`v79.0.1`](https://github.com/elastic/eui/releases/tag/v79.0.1)

**Bug fixes**

- Fixed broken push `EuiFlyout` behavior ([#6764](https://github.com/elastic/eui/pull/6764))

## [`v79.0.0`](https://github.com/elastic/eui/releases/tag/v79.0.0)

- Updated all `EuiSkeleton` components with new props that allow for more control over screen reader live announcements: `announceLoadingStatus`, `announceLoadedStatus`, and `ariaLiveProps` ([#6752](https://github.com/elastic/eui/pull/6752))
- Improved keyboard accessibility in `EuiPageHeader` by ensuring the right side menu items come into focus from left to right. ([#6753](https://github.com/elastic/eui/pull/6753))

**Breaking changes**

- Removed deprecated `EuiLoadingContent`. Use the `EuiSkeleton` components instead. ([#6754](https://github.com/elastic/eui/pull/6754))

## [`v78.0.0`](https://github.com/elastic/eui/releases/tag/v78.0.0)

- Improved the contrast ratio of `EuiCheckbox`, `EuiRadio`, and `EuiSwitch` in their unchecked states to meet WCAG AA guidelines. ([#6729](https://github.com/elastic/eui/pull/6729))
- Added React Testing Library `*ByTestSubject` custom commands to `within()`. RTL utilities can be imported from `@elastic/eui/lib/test/rtl`. ([#6737](https://github.com/elastic/eui/pull/6737))
- Updated `EuiAvatar` to support a new letter `casing` prop that allow customizing text capitalization ([#6739](https://github.com/elastic/eui/pull/6739))
- Updated `EuiFocusTrap` to support the `gapMode` prop configuration (now defaults to `padding`) ([#6744](https://github.com/elastic/eui/pull/6744))

**Bug fixes**

- Fixed inconsistency in `EuiSearchBar`'s AND/OR semantics between DSL and query string generation ([#6717](https://github.com/elastic/eui/pull/6717))
- Fixed `EuiFieldNumber`'s native browser validity detection causing extra unnecessary rerenders ([#6741](https://github.com/elastic/eui/pull/6741))
- Fixed the `scrollLock` property on `EuiFocusTrap` (and other components using `EuiFocusTrap`, such as `EuiFlyout` and `EuiModal`) to no longer block scrolling on nested portalled content, such as combobox dropdowns ([#6744](https://github.com/elastic/eui/pull/6744))

**Breaking changes**

- `EuiAvatar`s with the default `user` type will now default to capitalizing all initials in uppercase ([#6739](https://github.com/elastic/eui/pull/6739))

## [`v77.2.0`](https://github.com/elastic/eui/releases/tag/v77.2.0)

- Updated `EuiFieldNumber` to detect native browser invalid state and show an invalid icon ([#6704](https://github.com/elastic/eui/pull/6704))
- Improved the input widths of `EuiRange` and `EuiDualRange` when `showInput={true}` to account for invalid icons ([#6704](https://github.com/elastic/eui/pull/6704))
- Improved the `isInvalid` styling of `EuiDualRange` when `showInput="inputWithPopover"` ([#6704](https://github.com/elastic/eui/pull/6704))
- Updated `EuiFormControlLayoutIcons` to render left icons in expected DOM order ([#6705](https://github.com/elastic/eui/pull/6705))
- Updated `EuiDatePickerRange`'s `isInvalid` state to match other range inputs ([#6705](https://github.com/elastic/eui/pull/6705))
- Updated `EuiSuperDatePicker`'s `isInvalid` state to match other range inputs ([#6705](https://github.com/elastic/eui/pull/6705))

**Bug fixes**

- Fixed `EuiValidatableControl` to correctly display `isInvalid` states on mount ([#6705](https://github.com/elastic/eui/pull/6705))
- Fixed an issue with `EuiSearchBar` where quoted phrases were not quoted when generating an Elasticsearch query. ([#6714](https://github.com/elastic/eui/pull/6714))

## [`v77.1.1`](https://github.com/elastic/eui/releases/tag/v77.1.1)

- Reverted an accidental merge not intended to be in the prior release

## [`v77.1.0`](https://github.com/elastic/eui/releases/tag/v77.1.0)

- Updated `EuiDatePicker` to display a warning icon and correctly set `aria-invalid` when `isInvalid` is passed ([#6677](https://github.com/elastic/eui/pull/6677))
- Updated `EuiFilePicker` to display an alert icon when `isInvalid` ([#6678](https://github.com/elastic/eui/pull/6678))
- Updated `EuiTextArea` to display an alert icon when `isInvalid` ([#6679](https://github.com/elastic/eui/pull/6679))
- Updated `EuiTextArea` to support the `isLoading` prop ([#6679](https://github.com/elastic/eui/pull/6679))
- Updated `EuiComboBox` to display a warning icon and correctly set `aria-invalid` when `isInvalid` is passed ([#6680](https://github.com/elastic/eui/pull/6680))

**Bug fixes**

- Fixed `EuiAccordion` to not set an `aria-expanded` attribute on non-interactive `buttonElement`s ([#6694](https://github.com/elastic/eui/pull/6694))
- Fixed an `EuiPopoverFooter` bug causing nested popovers within popovers (note: not a recommended use-case) to unintentionally override its panel padding size inherited from context ([#6698](https://github.com/elastic/eui/pull/6698))
- Fixed `EuiComboBox` to only delete the last selected item on backspace if the input caret is present ([#6699](https://github.com/elastic/eui/pull/6699))

## [`v77.0.0`](https://github.com/elastic/eui/releases/tag/v77.0.0)

**Bug fixes**

- Fixed named `EuiBadge` colors to reflect custom theme overrides ([#6659](https://github.com/elastic/eui/pull/6659))
- Fixed user-defined SCSS variables failing to override variables defined in Amsterdam typography overrides. ([#6665](https://github.com/elastic/eui/pull/6665))
- Fixed bold `EuiCode` tokens to actually be bold ([#6666](https://github.com/elastic/eui/pull/6666))

**Breaking changes**

- Success- and accent-colored `EuiBadge`s and `EuiButton`s have had their fill colors tinted slightly on light mode to be more readable ([#6659](https://github.com/elastic/eui/pull/6659))

## [`v76.4.0`](https://github.com/elastic/eui/releases/tag/v76.4.0)

**CSS-in-JS conversions**

- Converted `EuiKeyPadMenu` (Menu component only) to Emotion ([#6636](https://github.com/elastic/eui/pull/6636))

## [`v76.3.0`](https://github.com/elastic/eui/releases/tag/v76.3.0)

- Updated `EuiSkipLink`'s `fallbackDestination` prop to support an array of query selector strings ([#6646](https://github.com/elastic/eui/pull/6646))

**Bug fixes**

- Fixed `EuiFlyout` to preserve body scrollbar width on open ([#6645](https://github.com/elastic/eui/pull/6645))
- Fixed `EuiImage`'s full screen mode to not scroll jump & to preserve body scrollbar width on open ([#6645](https://github.com/elastic/eui/pull/6645))
- Fixed `EuiCodeBlock`'s full screen mode to not scroll jump & to preserve body scrollbar width on open ([#6645](https://github.com/elastic/eui/pull/6645))

## [`v76.2.0`](https://github.com/elastic/eui/releases/tag/v76.2.0)

- Added new `renderCustomGridBody` escape hatch rendering prop to `EuiDataGrid` ([#6624](https://github.com/elastic/eui/pull/6624))

**Bug fixes**

- Fixed visual listbox focus ring bug on non-searchable `EuiSelectable`s ([#6637](https://github.com/elastic/eui/pull/6637))
- Added a legacy `alert` alias for the `warning` `EuiIcon` type ([#6640](https://github.com/elastic/eui/pull/6640))
- Fixed a type definition incorrectly coming from a dev dependency, which was causing issues for some consuming projects ([#6643](https://github.com/elastic/eui/pull/6643))

## [`v76.1.0`](https://github.com/elastic/eui/releases/tag/v76.1.0)

- Added more detailed screen reader instructions to `EuiSelectable`, `EuiSuggest`, `EuiSelectableTemplateSitewide`, `EuiRange`, and `EuiDualRange`. ([#6589](https://github.com/elastic/eui/pull/6589))
- Added new `placeholder` prop to `EuiSuperSelect` ([#6630](https://github.com/elastic/eui/pull/6630))
- Added new `setCellPopoverProps` parameter callback to `EuiDataGrid`'s `renderCellPopover` prop ([#6632](https://github.com/elastic/eui/pull/6632))

**Bug fixes**

- Fixed an ARIA attribute in `EuiSelectableList` ([#6589](https://github.com/elastic/eui/pull/6589))
- Fixed `EuiSelectable` to no longer show active selection state or respond to the Up/Down arrow keys when focus is inside the selectable container, but not on the searchbox or listbox. ([#6631](https://github.com/elastic/eui/pull/6631))

## [`v76.0.1`](https://github.com/elastic/eui/releases/tag/v76.0.1)

**Bug fixes**

- Fixed broken icons on all `isInvalid` form controls ([#6629](https://github.com/elastic/eui/pull/6629))

## [`v76.0.0`](https://github.com/elastic/eui/releases/tag/v76.0.0)

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

## [`v75.1.2`](https://github.com/elastic/eui/releases/tag/v75.1.2)

**Bug fixes**

- Fixed bug in `EuiPopover` where multiple filter `drop-shadow()` were causing inner shadows in Safari ([#6604](https://github.com/elastic/eui/pull/6604))

## [`v75.1.1`](https://github.com/elastic/eui/releases/tag/v75.1.1)

- Updated `EuiCodeBlock` annotation popovers to have an anchor position of `downLeft` ([#6600](https://github.com/elastic/eui/pull/6600))

**Bug fixes**

- (Documentation only) Fixed a negative lookbehind regex causing our docs to crash when viewed in Safari ([#6603](https://github.com/elastic/eui/pull/6603))

## [`v75.1.0`](https://github.com/elastic/eui/releases/tag/v75.1.0)

- Added padding to `EuiStep` title to better align with icon ([#6555](https://github.com/elastic/eui/pull/6555))
- Added a new `lineNumbers.annotations` API to `EuiCodeBlock`. This new feature displays an informational icon next to the specified line number(s), providing more context via popover ([#6580](https://github.com/elastic/eui/pull/6580))

**Bug fixes**

- Fixed bug in `EuiRange` where styles were applied incorrectly when custom ticks were passed but `showTicks` were false ([#6588](https://github.com/elastic/eui/pull/6588))
- Fixed `fleetApp` and `agentApp` icons that were swapped ([#6590](https://github.com/elastic/eui/pull/6590))

**CSS-in-JS conversions**

- Converted `EuiSteps` to Emotion; Removed `$euiStepStatusColorsToFade`, `$euiStepNumberSize`, `$euiStepNumberSmallSize`, and `$euiStepNumberMargin` ([#6555](https://github.com/elastic/eui/pull/6555))

## [`v75.0.0`](https://github.com/elastic/eui/releases/tag/v75.0.0)

- `EuiFlyout`s now automatically shard all fixed `EuiHeader`s on the page. This means that interactions (mouse & keyboard) with items inside `EuiHeader`s when flyouts are open will no longer trigger focus fighting ([#6566](https://github.com/elastic/eui/pull/6566))
- `EuiFlyout`s now read out detailed screen reader dialog instructions and hints on open ([#6566](https://github.com/elastic/eui/pull/6566))

**Bug fixes**

- Fixed `EuiSelectable` options with incorrect `aria-posinset` indices when rendered with group labels not at the start of the array ([#6571](https://github.com/elastic/eui/pull/6571))
- Fixed a bug with `EuiSearchBar` where filters with `multiSelect: false` were not able to select a new option when an option was already selected ([#6577](https://github.com/elastic/eui/pull/6577))

**Breaking changes**

- Removed the ability to customize the `role` prop of `EuiFlyout`s. `EuiFlyout`s should always be dialog roles for screen reader consistency. ([#6566](https://github.com/elastic/eui/pull/6566))
- Removed `closeButtonAriaLabel` prop from `EuiFlyout` - use `closeButtonProps['aria-label']` instead ([#6566](https://github.com/elastic/eui/pull/6566))

## [`v74.1.0`](https://github.com/elastic/eui/releases/tag/v74.1.0)

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

## [`v74.0.1`](https://github.com/elastic/eui/releases/tag/v74.0.1)

**Bug fixes**

- Fixed `EuiModalHeaderTitle` type errors when passed `EuiTitle` props ([#6547](https://github.com/elastic/eui/pull/6547))

## [`v74.0.0`](https://github.com/elastic/eui/releases/tag/v74.0.0)

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

## [`v73.0.0`](https://github.com/elastic/eui/releases/tag/v73.0.0)

**Bug fixes**

- Fixed `EuiDataGrid` a11y errors within toolbar popovers containing draggable elements with interactive children ([#6517](https://github.com/elastic/eui/pull/6517))
- Fixed several styling bugs within `EuiDataGrid`'s sorting toolbar popover ([#6517](https://github.com/elastic/eui/pull/6517))

**Breaking changes**

- `EuiToolTip`s now internally enforce only showing **one** tooltip at a time (the most recently triggered tooltip). This primarily affects scenarios where users are focused on a tooltip toggle via click, and then hover onto another tooltip toggle. ([#6520](https://github.com/elastic/eui/pull/6520))

## [`v72.2.0`](https://github.com/elastic/eui/releases/tag/v72.2.0)

- Added `onFullScreen` callback to expose the `isFullScreen` state of the `EuiImage` ([#6504](https://github.com/elastic/eui/pull/6504))
- Added an extra spacing between the title and subtitle to `EuiTour` ([#6512](https://github.com/elastic/eui/pull/6512))
- Updated `EuiText.blockquote` styles to match the `EuiMarkdownFormat.blockquote` styles ([#6514](https://github.com/elastic/eui/pull/6514))
- Added the `repositionOnScroll` prop to `EuiToolTip` ([#6515](https://github.com/elastic/eui/pull/6515))

## [`v72.1.0`](https://github.com/elastic/eui/releases/tag/v72.1.0)

- Changed design of empty ranges in `EuiColorStops` to have diagonal gray stripes instead of a solid light gray color ([#6489](https://github.com/elastic/eui/pull/6489))
- Changed popover in `EuiColorStops` to not appear when dragging/moving a color stop ([#6489](https://github.com/elastic/eui/pull/6489))
- `EuiPopover` now supports overriding `focusTrapProps.onClickOutside`, which allows customization of auto-close behavior on outside click. ([#6500](https://github.com/elastic/eui/pull/6500))

**CSS-in-JS conversions**

- Converted `EuiColorStops` to Emotion ([#6489](https://github.com/elastic/eui/pull/6489))
- Added `brighten` service to manipulate CSS-in-JS colors ([#6489](https://github.com/elastic/eui/pull/6489))
