## [`v109.0.0`](https://github.com/elastic/eui/releases/v109.0.0)

- Added color tokens `borderBaseProminent` and `borderInteractiveFormsHoverProminent` ([#9162](https://github.com/elastic/eui/pull/9162))
- Updated `EuiFilePicker` border styles ([#9162](https://github.com/elastic/eui/pull/9162))
- Updated 'paperClip' icon glyph ([#9149](https://github.com/elastic/eui/pull/9149))

**Bug fixes**

- Fixed internal `EuiButtonGroupButton` component so that `aria-pressed` can be omitted when necessary ([#9164](https://github.com/elastic/eui/pull/9164))

**Breaking changes**

- Removed `borderBaseFormsControl` token ([#9162](https://github.com/elastic/eui/pull/9162))

**Accessibility**

- Removed `aria-hidden` on `EuiDataGrid`s column header actions button to prevent accessibility warnings ([#9166](https://github.com/elastic/eui/pull/9166))
- Improved the accessibility experience of `EuiBasicTable` and `EuiInMemoryTable` by ensuring tooltips displayed for action buttons are visual-only whenever the `action.name` and `action.description` are exactly the same ([#9140](https://github.com/elastic/eui/pull/9140))

## [`v108.0.0`](https://github.com/elastic/eui/releases/v108.0.0)

- Updated `EuiModal` to support closing on outside click, via the new `outsideClickCloses` prop ([#9137](https://github.com/elastic/eui/pull/9137))

**Breaking changes**

- Removed all "Amsterdam" theme related code in `src/themes/amsterdam` - EUI now only supports the "Borealis" theme in `eui-theme-borealis` ([#9090](https://github.com/elastic/eui/pull/9090))
- Removed `euiTheme.flags.hasGlobalFocusColor` ([#9090](https://github.com/elastic/eui/pull/9090))
- Removed `euiTheme.flags.hasVisColorAdjustment` ([#9090](https://github.com/elastic/eui/pull/9090))
- Removed `hasVisColorAdjustment` argument from color palettes (used in `euiPaletteColorBlindBehindText`, `euiPaletteForTemperature`, `euiPaletteComplementary`, `euiPaletteCool`) ([#9090](https://github.com/elastic/eui/pull/9090))
- Removed `euiTheme.flags.buttonVariant` and `euiTheme.flags.formVariant` ([#9090](https://github.com/elastic/eui/pull/9090))
- Removed `euiTheme.components.keyPadMenuItemBackgroundDisabledSelect` ([#9090](https://github.com/elastic/eui/pull/9090))
- Removed legacy SCSS files from `src/global_styling/variables`, `src/global_styling/mixins` and `src/global_styling/functions` - if needed, use them from `eui-theme-common` instead ([#9090](https://github.com/elastic/eui/pull/9090))

## [`v107.0.1`](https://github.com/elastic/eui/releases/v107.0.1)

**Bug fixes**

- Fixed `prismjs` theme in `EuiCodeBlock` to improve highlighting for the `yaml` language ([#9089](https://github.com/elastic/eui/pull/9089))
- Fixed a visual bug on `EuiTable` where the border for rows in dark mode wasn't applied correctly ([#9115](https://github.com/elastic/eui/pull/9115))

**Dependency updates**

- Updated `@elastic/prismjs-esql` to v1.1.2 ([#9102](https://github.com/elastic/eui/pull/9102))

**Accessibility**

- Fixed incorrect role attribute on `EuiIcon` and `EuiBetaBadge` ([#9100](https://github.com/elastic/eui/pull/9100))
- Make `EuiBasicTable` respect user's reduced motion setting by not animating when in loading state. ([#9095](https://github.com/elastic/eui/pull/9095))

## [`v107.0.0`](https://github.com/elastic/eui/releases/v107.0.0)

- Added new shadow tokens ([#9088](https://github.com/elastic/eui/pull/9088))
  - `shadows.colors.base`
  - `shadows.xs`
  - `shadows.s`
  - `shadows.m`
  - `shadows.l`
  - `shadows.xl`
  - `shadows.flat`
  - `shadows.hover.base`
  - `shadows.hover.xl`
- Updated shadow utility functions to return new tokens ([#9088](https://github.com/elastic/eui/pull/9088))
  - `euiShadow`
  - `euiShadowXSmall`
  - `euiShadowSmall`
  - `euiShadowMedium`
  - `euiShadowLarge`
  - `euiShadowXLarge`
  - `euiShadowFlat`
  - `euiSlightShadowHover`
- Added shadow hover utility `euiShadowHover` ([#9088](https://github.com/elastic/eui/pull/9088))

**Deprecations**

- Deprecated `euiShadowFlat` and `useEuiShadowFlat` - use `euiShadow`/ `useEuiShadow` (size `xs`) or `euiShadowXSmall` instead ([#9088](https://github.com/elastic/eui/pull/9088))
- Deprecated `euiSlightShadowHover` and `useEuiSlightShadowHover` - use `euiShadowHover` / `useEuiShadowHover` instead ([#9088](https://github.com/elastic/eui/pull/9088))

**Breaking changes**

- Updated shadow utility functions (e.g. `euiShadow`) to apply a floating border style in dark mode. This may lead to visual issues with double borders in dark mode when a regular `border` styling is applied. - Use the `options.border` argument on the utils to adjust or remove the floating border as needed. ([#9088](https://github.com/elastic/eui/pull/9088))

## [`v106.7.0`](https://github.com/elastic/eui/releases/v106.7.0)

- Updated `EuiComboBox` to properly break long strings without spaces when `rowHeight="auto"` ([#9063](https://github.com/elastic/eui/pull/9063))
- Added `data-test-subj` support to `EuiDatePicker` and `EuiDatePickerRange` for improved testability. Propagates to main component wrappers, inputs, clear buttons, calendar navigation, and popover panels. ([#9042](https://github.com/elastic/eui/pull/9042))
- Added streamsClassic and streamsWired icons ([#9017](https://github.com/elastic/eui/pull/9017))
- Updated icons based on feedback: `boxesVertical`, `documentation`, `error`, `export`, `filter`, `filterExclude`, `filterIgnore`, `filterInclude`, `grab`, `grabOmnidirectional`, `grabHorizontal`, `importAction`, `indexTemporary`, `link`, `list`, `magnifyWithExclamation`, `magnifyWithMinus`, `magnifyWithPlus`, `minus`, `minusInCircle`, `pencil`, `pin`, `pinFilled`, `plus`, `plusInCircle`, `question`, `search`, `sortLeft`, `sortRight`, `sortDown`, `sortUp`, `sortable`, `unlink`. ([#9026](https://github.com/elastic/eui/pull/9026))
- Added new icon: `backgroundTask`. ([#9026](https://github.com/elastic/eui/pull/9026))
- Marked icons for deprecation: `boxesHorizontal`, `checkInCircleFilled`, `copyClipboard`, `documentEdit`, `errorFilled`, `expandMini`, `filterInCircle`, `lettering`, `listAdd`, `minusInCircleFilled`, `newChat`, `playFilled`, `plusInCircleFilled`, `submodule`, `tableDensityNormal`, `warningFilled`. ([#9026](https://github.com/elastic/eui/pull/9026))
- Added `workflowsApp` icon ([#9011](https://github.com/elastic/eui/pull/9011))
- Added `EuiFormControlButton` component for usage as input-styled button within `EuiFormControlLayout` ([#9006](https://github.com/elastic/eui/pull/9006))
- Updated `EuiSuperDatePicker` to use `EuiFormControlButton` when a prettified duration button is rendered ([#9006](https://github.com/elastic/eui/pull/9006))

**Bug fixes**

- Fixed `EuiInMemoryTable` not firing the `search.onChange` callback when `searchFormat` equals `text`. ([#9059](https://github.com/elastic/eui/pull/9059))
- Fixed `columns` in `EuiDataGrid` not being rendered in the correct order as defined by `columnVisibility.visibleColumns` which resulted in unexpected updates when reordering columns ([#9030](https://github.com/elastic/eui/pull/9030))

**Accessibility**

- Improved color contrast of non-interactive `EuiBreadcrumbs` items in dark mode ([#9071](https://github.com/elastic/eui/pull/9071))
- Make `EuiProgress` respect user's reduced motion setting by not animating when in indeterminite state. ([#9054](https://github.com/elastic/eui/pull/9054))

## [`v106.6.0`](https://github.com/elastic/eui/releases/v106.6.0)

**Accessibility**

- Removed focus state styles for `iconOnClick` on `EuiBadge` to improve color contrast in dark mode ([#9004](https://github.com/elastic/eui/pull/9004))

## [`v106.5.0`](https://github.com/elastic/eui/releases/v106.5.0)

- Added an optional `offset` prop to `EuiToolTip` to allow customizing the distance (in pixels) between the tooltip and its anchor. ([#8988](https://github.com/elastic/eui/pull/8988))
- Updated `EuiDataGrid` hover styles when `stripes={true}` to ensure a visible background color change on hover ([#8983](https://github.com/elastic/eui/pull/8983))

**Bug fixes**

- Fixed a 1ms time shift on `EuiSuperDatePicker` when using the quick select time window steps ([#8985](https://github.com/elastic/eui/pull/8985))
- Fixed a visual issue in `EuiSuperDatePicker` with `isQuickSelectOnly` enabled, where delimiter padding caused an unexpected empty container ([#8985](https://github.com/elastic/eui/pull/8985))

**Accessibility**

- Changed the close button position in `EuiModal` to allow for the modal title to be perceivable first ([#8954](https://github.com/elastic/eui/pull/8954))
- Added screen reader hint text on `EuiModal` to indicate closing behavior ([#8954](https://github.com/elastic/eui/pull/8954))

## [`v106.4.0`](https://github.com/elastic/eui/releases/v106.4.0)

- Added prop `focusTrapProps` on `EuiModal` ([#8945](https://github.com/elastic/eui/pull/8945))

**Bug fixes**

- Fixed the syntax of the SCSS variable `$euiColorTransparent` to ensure a valid value ([#8966](https://github.com/elastic/eui/pull/8966))
- Fixed `restrictWidth` not applying to `EuiPageHeaderContent` when only `children` are used as content ([#8965](https://github.com/elastic/eui/pull/8965))

**Accessibility**

- Fixed an issue where pressing Shift + Tab on the last tabbable element inside `EuiInputPopover` popover would close the popover unexpectedly ([#8950](https://github.com/elastic/eui/pull/8950))

## [`v106.3.0`](https://github.com/elastic/eui/releases/v106.3.0)

- Added thumbUp and thumbDown icons ([#8937](https://github.com/elastic/eui/pull/8937))
- Removed obsolete IE-specific CSS properties ([#8940](https://github.com/elastic/eui/pull/8940))
- Updated `EuiComboBox` to allow multiline options by disabling virtualization (`rowHeight="auto"`) ([#8934](https://github.com/elastic/eui/pull/8934))

**Bug fixes**

- Fixed interactive content in header cells on `EuiDataGrid` not being correctly removed from the tab order ([#8938](https://github.com/elastic/eui/pull/8938))
- Fixed an issue where the validity state of `EuiFieldNumber` did not update when the `isInvalid` prop value changed ([#8952](https://github.com/elastic/eui/pull/8952))
- Reverted a font-size change for `xs` buttons back to `12px` ([#8930](https://github.com/elastic/eui/pull/8930))
- Fixed unexpected results for the SCSS function `lineHeightFromBaseline` ([#8922](https://github.com/elastic/eui/pull/8922))
- Fixed `euiDataGridRow--selected` not applying on `EuiDataGrid` whith `stripes={true}` ([#8925](https://github.com/elastic/eui/pull/8925))
- Fixed `euiDataGridRow--marked` and `euiDataGridRow--selected` applying hover styling on `EuiDataGrid` when `stripes={true}` ([#8925](https://github.com/elastic/eui/pull/8925))

**Accessibility**

- Added a screen reader help text for entered interactive cells of `EuiDataGrid` to provide information about exiting cells ([#8938](https://github.com/elastic/eui/pull/8938))
- Added a new beta `EuiLiveAnnouncer` component which supports `aria-live` announcements on mount ([#8916](https://github.com/elastic/eui/pull/8916))
- Added `announceOnMount` prop on `EuiCallOut` to support announcing its content on mount ([#8916](https://github.com/elastic/eui/pull/8916))

## [`v106.2.0`](https://github.com/elastic/eui/releases/v106.2.0)

- Enhanced `EuiCheckableCard` to make non-interactive children clickable for card selection ([#8907](https://github.com/elastic/eui/pull/8907))
- Added `showFooter` and `toolbarProps.right` props to `EuiMarkdownEditor` for more flexible layout control. ([#8889](https://github.com/elastic/eui/pull/8889)) ([#8889](https://github.com/elastic/eui/pull/8889))

**Bug fixes**

- Fixed `EuiPopover` not closing on outside click after multiple fast clicks on the trigger element ([#8882](https://github.com/elastic/eui/pull/8882))

**Accessibility**

- Added accessible labels to virtualized `EuiCodeBlock` ([#8887](https://github.com/elastic/eui/pull/8887))

## [`v106.1.0`](https://github.com/elastic/eui/releases/v106.1.0)

- Added `--euiPushFlyoutOffsetInlineStart` and `--euiPushFlyoutOffsetInlineEnd` global CSS variables set by the `EuiFlyout` in `push` mode. ([#8872](https://github.com/elastic/eui/pull/8872))
- Reduced the `min-width` for inputs in `EuiRange` and `EuiDualRange` ([#8866](https://github.com/elastic/eui/pull/8866))
- Added `includeSelectorInFocusTrap` prop for `EuiFlyout` ([#8849](https://github.com/elastic/eui/pull/8849))
- Added component defaults for `EuiFlyout` that include `includeSelectorInFocusTrap` and `includeFixedHeadersInFocusTrap` ([#8849](https://github.com/elastic/eui/pull/8849))

**Bug fixes**

- Fixed flaky manual return focus behavior on `EuiFlyout` by relying on `FocusTrap` returning focus instead ([#8878](https://github.com/elastic/eui/pull/8878))
- Fixed `EuiFlyoutChild` closing its parent `EuiFlyout` on `Escape` keypress ([#8878](https://github.com/elastic/eui/pull/8878))
- Fixed support for `css` key in items object passed to `EuiTreeView` ([#8864](https://github.com/elastic/eui/pull/8864))

**Deprecations**

- Deprecated support for React 16. Please update to a modern version of React or stay on EUI version 106.0.0 if you can't switch right now. ([#8868](https://github.com/elastic/eui/pull/8868))

## [`v106.0.0`](https://github.com/elastic/eui/releases/v106.0.0)

- Added `colorModes` prop to `EuiSelectableTemplateSitewide` to support granular control over the applied `colorMode` for the search and popover components ([#8806](https://github.com/elastic/eui/pull/8806))
- Added high contrast mode specific color values for `colors.vis` and `colors.severity` tokens in light color mode ([#8800](https://github.com/elastic/eui/pull/8800))
- Added new `refresh` design for input styles on form picker components: ([#8778](https://github.com/elastic/eui/pull/8778))
  - `EuiComboBox`
  - `EuiFilePicker`
  - `EuiDatePicker`
  - `EuiSuperDatePicker`
- Updated the font size of `xs` size `EuiButtonEmpty` to `14px` ([#8778](https://github.com/elastic/eui/pull/8778))
- Added a new `backgroundStyle` prop to the `EuiFlyoutChild` component. ([#8847](https://github.com/elastic/eui/pull/8847))
- Updates to `EuiFlyoutSessionProvider` ([#8846](https://github.com/elastic/eui/pull/8846))
  * Remove the onUnmount callbacks from various flyout configurations
  * Consolidate unmount behavior with a single onUnmount prop at the provider level.
  * Removed onCloseFlyout and onCloseChildFlyout from the flyout render context.
  * Fixed the canGoBack logic in packages/eui/src/components/flyout/sessions/use_eui_flyout.ts.
- Added new `refresh` design for input styles and form layout components: ([#8767](https://github.com/elastic/eui/pull/8767))
  - `EuiFieldText`
  - `EuiFieldNumber`
  - `EuiFieldPassword`
  - `EuiFieldSearch`
  - `EuiTextarea`
  - `EuiSelect`
  - `EuiSuperSelect`
  - `EuiFormControlLayout`
  - `EuiFormControlLayoutDelimited`
  - `EuiFormControlLayoutIcons`
  - `EuiFormLabel`
  - `EuiFormErrorText`
- Added semantic tokens:  ([#8767](https://github.com/elastic/eui/pull/8767))
  - `colors.borderInteractiveFormsHoverPlain`
  - `colors.borderInteractiveFormsHoverDanger`
- Added component tokens: ([#8767](https://github.com/elastic/eui/pull/8767))
  - `components.forms.backgroundDropping`
  - `components.forms.borderFocused`
  - `components.forms.borderInvalid`
  - `components.forms.borderHovered`
  - `components.forms.borderInvalidHovered`
  - `components.forms.borderAutofilledHovered`
  - `components.forms.clearButtonBackground`
- Updated values for tokens: ([#8767](https://github.com/elastic/eui/pull/8767))
  - `colors.textWarning`
  - `colors.borderStrongPrimary`
  - `colors.borderStrongAccent`
  - `colors.borderStrongAccentSecondary`
  - `colors.borderStrongNeutral`
  - `colors.borderStrongSuccess`
  - `colors.borderStrongWarning`
  - `colors.borderStrongRisk`
  - `colors.borderStrongDanger`
  - `components.forms.backgroundReadOnly`

**Bug fixes**

- Fixed the screen reader output in `EuiProgress` when a node is passed in the `label` prop ([#8856](https://github.com/elastic/eui/pull/8856))
- Removed unnecessary `title` attributes for `label` and `valueText` in `EuiProgress` ([#8856](https://github.com/elastic/eui/pull/8856))
- Fixed wrong initialization options on `EUI_VIS_COLOR_STORE` which resulted in partially wrong initial color values for static `euiPalette{name}` functions (e.g. `euiPaletteForTemperature`) ([#8844](https://github.com/elastic/eui/pull/8844))

**Breaking changes**

- Removed custom style overrides for `EuiSelectableTemplateSitewide` search inside `EuiHeader` - Use the `colorModes` prop on `EuiSelectableTemplateSitewide` instead to control the color mode output. ([#8806](https://github.com/elastic/eui/pull/8806))

## [`v105.0.0`](https://github.com/elastic/eui/releases/v105.0.0)

- Added marked row styling via the classes `euiDataGridRow--marked` and `euiTableRow--marked` for `EuiDataGrid` and `EuiBasicTable`  ([#8834](https://github.com/elastic/eui/pull/8834))
- Added component tokens: ([#8834](https://github.com/elastic/eui/pull/8834))
  - `dataGridRowBackgroundMarked`
  - `dataGridRowBackgroundMarkedHover`
  - `dataGridRowBorderActive`
  - `dataGridRowBorderHover`
  - `dataGridRowBorderMarked`
  - `tableRowBackgroundMarked`
  - `tableRowBackgroundMarkedHover`
- Added `EuiFlyoutChild` and `EuiFlyoutSessionProvider` ([#8771](https://github.com/elastic/eui/pull/8771))
- Added `setListOptionRefs` prop on `EuiComboBoxList` ([#8829](https://github.com/elastic/eui/pull/8829))

**Breaking changes**

- Removed `iInCircle` icon (use `info` instead) ([#8841](https://github.com/elastic/eui/pull/8841))
- Removed `questionInCircle` icon (use `question` instead) ([#8841](https://github.com/elastic/eui/pull/8841))

**Accessibility**

- Improved the experience of `EuiProgress` by ensuring that determinate updates are read out immediately to screen readers ([#8839](https://github.com/elastic/eui/pull/8839))
- Fixed missing screen reader output for `EuiComboBox` with `options` that have custom `id` attributes ([#8829](https://github.com/elastic/eui/pull/8829))

## [`v104.1.0`](https://github.com/elastic/eui/releases/v104.1.0)

- Added new component token `components.forms.codeInlineBackground` ([#8813](https://github.com/elastic/eui/pull/8813))
- Updated background color for `EuiCode` to use `components.forms.codeInlineBackground` ([#8813](https://github.com/elastic/eui/pull/8813))
- Added `noItemsMessage` prop to `EuiInMemoryTable` ([#8812](https://github.com/elastic/eui/pull/8812))
- Added prop `delimiter` on `EuiDatePickerRange` ([#8810](https://github.com/elastic/eui/pull/8810))

**Bug fixes**

- Fixed an issue with `EuiSuperDatePicker` where toggling `isQuickSelectOnly` would cause a full re-render when the selected range uses absolute dates ([#8810](https://github.com/elastic/eui/pull/8810))

**Deprecations**

- Deprecated `message` prop in `EuiInMemoryTable` in favor of `noItemsMessage` which is a more meaningful prop name; there are no functional changes ([#8812](https://github.com/elastic/eui/pull/8812))

## [`v104.0.2`](https://github.com/elastic/eui/releases/v104.0.2)

**Bug fixes**

- Fixed missing JSON token exports for `euiColorBackgroundBaseInteractiveSelectHover` and `euiColorBorderStrongText` ([#8819](https://github.com/elastic/eui/pull/8819))

## [`v104.0.1`](https://github.com/elastic/eui/releases/v104.0.1)

**Bug fixes**

- Fixed a wrong path in the module declaration for the JSON token exports that would trigger typescript errors ([#8818](https://github.com/elastic/eui/pull/8818))

## [`v104.0.0`](https://github.com/elastic/eui/releases/v104.0.0)

- Added data vis text color tokens: ([#8793](https://github.com/elastic/eui/pull/8793))
  - `colors.vis.euiColorVisText0`
  - `colors.vis.euiColorVisText1`
  - `colors.vis.euiColorVisText2`
  - `colors.vis.euiColorVisText3`
  - `colors.vis.euiColorVisText4`
  - `colors.vis.euiColorVisText5`
  - `colors.vis.euiColorVisText6`
  - `colors.vis.euiColorVisText7`
  - `colors.vis.euiColorVisText8`
  - `colors.vis.euiColorVisText9`
- Updated and aligned background hover styles for `EuiTable` and `EuiDataGrid` ([#8769](https://github.com/elastic/eui/pull/8769))

**Deprecations**

- Deprecated `euiPaletteForLightBackground` and `euiPaletteForDarkBackground` palettes. Use the newly added data vis color tokens instead. ([#8793](https://github.com/elastic/eui/pull/8793))

**Breaking changes**

- Removed tokens: ([#8793](https://github.com/elastic/eui/pull/8793))
  - `colors.vis.euiColorVisAsTextLight1`
  - `colors.vis.euiColorVisAsTextLight0`
  - `colors.vis.euiColorVisAsTextLight2`
  - `colors.vis.euiColorVisAsTextLight3`
  - `colors.vis.euiColorVisAsTextLight4`
  - `colors.vis.euiColorVisAsTextLight5`
  - `colors.vis.euiColorVisAsTextLight6`
  - `colors.vis.euiColorVisAsTextDark1`
  - `colors.vis.euiColorVisAsTextDark0`
  - `colors.vis.euiColorVisAsTextDark2`
  - `colors.vis.euiColorVisAsTextDark3`
  - `colors.vis.euiColorVisAsTextDark4`
  - `colors.vis.euiColorVisAsTextDark5`
  - `colors.vis.euiColorVisAsTextDark6`
- Removed `xl` size from `EuiTabs` ([#8762](https://github.com/elastic/eui/pull/8762))
- Added `tooltipProps` to `EuiCopy` which replaces spreading all props to `EuiToolTip` ([#8758](https://github.com/elastic/eui/pull/8758))

## [`v103.1.0`](https://github.com/elastic/eui/releases/v103.1.0)

- Added `onFullScreenChange` prop to `EuiDataGrid` to handle changes when the component enters or exits fullscreen mode ([#8765](https://github.com/elastic/eui/pull/8765))

**Bug fixes**

- Fixed `onChange` being triggered twice when the checkbox in `EuiCheckableCard` is clicked ([#8786](https://github.com/elastic/eui/pull/8786))
- Fixed a circular import on the legacy Amsterdam theme that would cause the theme usage to break ([#8780](https://github.com/elastic/eui/pull/8780))
- Fixed high contrast theme token overrides not being applied ([#8742](https://github.com/elastic/eui/pull/8742))

**Accessibility**

- Fixed form errors not being read by screen readers for `EuiComboBox` inside of `EuiFormRow` ([#8798](https://github.com/elastic/eui/pull/8798))

## [`v103.0.0`](https://github.com/elastic/eui/releases/v103.0.0)

- Replaced `question` icon glyph ([#8756](https://github.com/elastic/eui/pull/8756))
- Updated `EuiResizableCollapseButton` to use an empty button ([#8736](https://github.com/elastic/eui/pull/8736))
- Added `info` icon glyph ([#8744](https://github.com/elastic/eui/pull/8744))
- Removed uppercase styling from `EuiText` `h6` headings to match `EuiTitle` ([#8732](https://github.com/elastic/eui/pull/8732))
- Removed heavier font weight from `xs` and `s` `EuiListGroupItem` sizes for consistency ([#8732](https://github.com/elastic/eui/pull/8732))
- Updated the `font-weight` of default `EuiFilterButton` and `EuiButtonGroupButton` to `450` ([#8734](https://github.com/elastic/eui/pull/8734))
- Added color pallete functions and related hooks: ([#8725](https://github.com/elastic/eui/pull/8725))
  - `euiPaletteSkyBlue`, `useEuiPaletteSkyBlue`
  - `euiPaletteYellow`, `useEuiPaletteYellow`
  - `euiPaletteOrange`, `useEuiPaletteOrange`
- Added new tokens on `colors.vis`: ([#8725](https://github.com/elastic/eui/pull/8725))
  -  `euiColorVisNeutral0`
  -  `euiColorVisNeutral1`
  -  `euiColorVisWarning1`
  -  `euiColorVisRisk0`
  -  `euiColorVisRisk1`
- Updated the value of token `colors.vis.euiColorVisWarning0` ([#8725](https://github.com/elastic/eui/pull/8725))
- Updated EuiFilterButton's `numActiveFilters` prop to accept percentage values ([#8705](https://github.com/elastic/eui/pull/8705))

**Bug fixes**

- Fixed visual positioning issue for notifications in `EuiHeaderSectionItemButton` ([#8736](https://github.com/elastic/eui/pull/8736))
- Fixed a visual issue where `EuiCollabsibleNavItem` did not have a visible selected state ([#8736](https://github.com/elastic/eui/pull/8736))
- Fixed handling of unregistered code block languages in `EuiMarkdownFormat` ([#8729](https://github.com/elastic/eui/pull/8729))

**Breaking changes**

- Renamed `colors.vis.euiColorVisNeutral0` to `euiColorVisBase0` ([#8725](https://github.com/elastic/eui/pull/8725))

## [`v102.3.0`](https://github.com/elastic/eui/releases/v102.3.0)

- Added support for `focusTrapProps.returnFocus` on `EuiFlyout` ([#8716](https://github.com/elastic/eui/pull/8716))
- Updated `EuiDataGridToolbarControl` hover styles by removing text-decoration and changing the badge background-color to ensure enough contrast ([#8670](https://github.com/elastic/eui/pull/8670))
- Added prop `isToggle` on `EuiFilterButton` to switch between regular and toggle button ([#8652](https://github.com/elastic/eui/pull/8652))
- Updated `hasActiveFilters` on `EuiFilterButton` to only control highlighting filters, not a visual selected state ([#8652](https://github.com/elastic/eui/pull/8652))
- Updated `EuiFilterButton` to ensure `isSelected` prop applies both semantic and visual states ([#8652](https://github.com/elastic/eui/pull/8652))
- Updated visual styling of `EuiButtonGroup`, `EuiFilterGroup` and `EuiFilterButton` ([#8652](https://github.com/elastic/eui/pull/8652))
- Updated `EuiNotificationBadge` border radius to `2px` ([#8652](https://github.com/elastic/eui/pull/8652))
- Updated `EuiBreadcrumbs` text color for `type="application"` ([#8652](https://github.com/elastic/eui/pull/8652))
- Added new `refresh` design variant for button components: ([#8595](https://github.com/elastic/eui/pull/8595))
  - `EuiButton`
  - `EuiButtonEmpty`
  - `EuiButtonIcon`
- Added `flags.buttonVariant` with value `classic` to `euiThemeAmsterdam` ([#8595](https://github.com/elastic/eui/pull/8595))
- Added new button background component tokens to Amsterdam theme: ([#8595](https://github.com/elastic/eui/pull/8595))
  - `background{color}Hover`
  - `background{color}Active`
  - `backgroundFilled{color}Hover`
  - `backgroundFilled{color}Active`
  - `backgroundEmpty{color}Hover`
  - `backgroundEmpty{color}Active`

**Bug fixes**

- Fixed an issue with `EuiDataGrid` where navigating cells with simultaneous key presses would result in a crash in React 18 legacy mode ([#8698](https://github.com/elastic/eui/pull/8698))

**Accessibility**

- Improved the accessibility experience of `EuiMarkdownEditorFooter` by fixing the ARIA attributes of the `syntax help` modal. ([#8702](https://github.com/elastic/eui/pull/8702))

## [`v102.2.0`](https://github.com/elastic/eui/releases/v102.2.0)

- Added `useIsDarkMode` utility ([#8701](https://github.com/elastic/eui/pull/8701))
- Added scroll position data as arguments to `virtualizationOptions.onScroll` for the virtualized `EuiDataGrid` ([#8688](https://github.com/elastic/eui/pull/8688))
- Updated secondary fill to `primary` on `EuiIcon` ([#8687](https://github.com/elastic/eui/pull/8687))
- Added white outline on EuiLoadingElastic to make it compliant with the Brand requirements ([#8684](https://github.com/elastic/eui/pull/8684))

**Bug fixes**

- Fixed `EuiGlobalToastList` toasts not being cleaned properly when they are added and removed at the same time ([#8692](https://github.com/elastic/eui/pull/8692))
- Resolved an issue where the `EuiDataGrid` cell actions menu was hidden by the header when a cell was clicked to scroll into view ([#8640](https://github.com/elastic/eui/pull/8640))

**Accessibility**

- Improved accessibility of `EuiSelect` by removing the empty `<option>` added when `hasNoInitialSelection` is `true` from the DOM, once a user makes a selection. ([#8706](https://github.com/elastic/eui/pull/8706))
- Improved the accessibility of `EuiSuperDatePicker`'s quick select buttons by preventing duplicate screen reader output ([#8686](https://github.com/elastic/eui/pull/8686))

**Dependency updates**

- Updated `typescript` to v5.8.3 ([#8626](https://github.com/elastic/eui/pull/8626))

## [`v102.1.0`](https://github.com/elastic/eui/releases/v102.1.0)

- Update `EuiDataGrid` to use `expand` glyph ([#8646](https://github.com/elastic/eui/pull/8646))

**Accessibility**

- Updated `EuiTableHeaderCell` to output `nameTooltip` directly on sortable cell elements, ensuring tooltips appear on focus ([#8644](https://github.com/elastic/eui/pull/8644))
- Improved the accessibility of `EuiColorPicker` by: ([#8639](https://github.com/elastic/eui/pull/8639))
  - preventing duplicate color output for screen readers
  - adding tooltips with visual color labels for the selected colors on the saturation and hue sliders
  - updated accessible labels and announcements to be more descriptive

**Dependency updates**

- Updated `typescript` to v5.8.3 ([#8626](https://github.com/elastic/eui/pull/8626))

## [`v102.0.0`](https://github.com/elastic/eui/releases/v102.0.0)

- Added semantic severity color tokens: ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.severity.unknown`
    - `colors.severity.neutral`
    - `colors.severity.success`
    - `colors.severity.warning`
    - `colors.severity.risk` 
    - `colors.severity.danger` 
- Added semantic color tokens for variants `neutral` and `risk`: ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.textNeutral`
    - `colors.textRisk`
    - `colors.backgroundBaseNeutral`
    - `colors.backgroundBaseRisk`
    - `colors.backgroundLightNeutral`
    - `colors.backgroundLightRisk`
    - `colors.backgroundFilledNeutral`
    - `colors.backgroundFilledRisk`
    - `colors.borderBaseNeutral`
    - `colors.borderBaseRisk`
    - `colors.borderStrongNeutral`
    - `colors.borderStrongRisk`
- Added semantic color variants `neutral` and `risk` for the following components: ([#8601](https://github.com/elastic/eui/pull/8601))
    - `EuiButton`
    - `EuiButtonEmpty`
    - `EuiButtonIcon`
    - `EuiBadge`
    - `EuiIcon`
    - `EuiPanel`
- Aligned `EuiFormControlLayoutIcons` to the top (instead of center) to improve usability in multi-line form controls like `EuiComboBox` with many selected options ([#8610](https://github.com/elastic/eui/pull/8610))

**Breaking changes**

- Removed numbered severity color tokens: ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.vis.euiColorSeverity0`
    - `colors.vis.euiColorSeverity1`
    - `colors.vis.euiColorSeverity2`
    - `colors.vis.euiColorSeverity3`
    - `colors.vis.euiColorSeverity4`
    - `colors.vis.euiColorSeverity5`
    - `colors.vis.euiColorSeverity6`
    - `colors.vis.euiColorSeverity7`
    - `colors.vis.euiColorSeverity8`
    - `colors.vis.euiColorSeverity9`
    - `colors.vis.euiColorSeverity10`
    - `colors.vis.euiColorSeverity11`
    - `colors.vis.euiColorSeverity12`
    - `colors.vis.euiColorSeverity13`
    - `colors.vis.euiColorSeverity14`

**Accessibility**

- Fixed duplicate screen reader output on `EuiDataGrid` for single sorted header cells with actions ([#8598](https://github.com/elastic/eui/pull/8598))

## [`v101.4.0`](https://github.com/elastic/eui/releases/v101.4.0)

- Spread `labelProps` to the `label` element in `EuiCheckableCard` ([#8586](https://github.com/elastic/eui/pull/8586))
- Add `controls`, `flask`, `comment`, and `readOnly` glyphs to `EuiIcon` ([#8580](https://github.com/elastic/eui/pull/8580))
- Refactored `EuiExpression`, `EuiFacetGroup`, `EuiFacetButton`, `EuiFilterGroup`, `EuiHeader`, `EuiImage` and `EuiListGroup` to memoize their internal Emotion styles ([#8565](https://github.com/elastic/eui/pull/8565))
- Updated global `border.radius.medium` token value for default `Borealis` theme to `4px` ([#8563](https://github.com/elastic/eui/pull/8563))
- Updated `EuiProvider` to build themes including `highContrastMode` ([#8558](https://github.com/elastic/eui/pull/8558))

**Accessibility**

- Removed the `aria-label` attribute from the `ul` element in `EuiPagination` to avoid duplicate screen reader output ([#8597](https://github.com/elastic/eui/pull/8597))
- Set a more specific `aria-current="page"` on list items in `EuiPagination` ([#8597](https://github.com/elastic/eui/pull/8597))
- Added `aria-modal` to `EuiFlyout` with `type="overlay"` ([#8591](https://github.com/elastic/eui/pull/8591))

**Dependency updates**

- Updated `@elastic/prismjs-esql` to v1.1.0 ([#8587](https://github.com/elastic/eui/pull/8587))

## [`v101.3.0`](https://github.com/elastic/eui/releases/v101.3.0)

- Updated 78 existing and added two new glyphs (`code` and `checkCircle`) for `EuiIcon` ([#8530](https://github.com/elastic/eui/pull/8530))
- Changed `gutterSize` to `m` between right side items on `EuiPageHeader` ([#8529](https://github.com/elastic/eui/pull/8529))

**Bug fixes**

- Fixed a visual bug on disabled `EuiButton` in high contrast mode where wrong text colors were applied ([#8550](https://github.com/elastic/eui/pull/8550))

## [`v101.2.0`](https://github.com/elastic/eui/releases/v101.2.0)

- Added `showToolTip` prop on `EuiColorPickerSwatch` ([#8512](https://github.com/elastic/eui/pull/8512))

**Bug fixes**

- Fixed a visual issue of overlapping borders for layered `EuiPanel`s ([#8519](https://github.com/elastic/eui/pull/8519))
- Fixes wrong `colorMode` styling for the search in `EuiHeader` with `theme="dark"` ([#8496](https://github.com/elastic/eui/pull/8496))

**Accessibility**

- Improved the accessibility of `EuiColorPicker` by adding color label tooltips on hover and focus for color swatches ([#8512](https://github.com/elastic/eui/pull/8512))
- Added `disableScreenReaderOutput` prop on `EuiToolTip` to manually control if the tooltip content should be read when focusing the trigger. This prevents duplicate screen reader output when the tooltip content and `aria-label` on the trigger element have the same text content. ([#8508](https://github.com/elastic/eui/pull/8508))
- Improves text color contrast for `EuiButton` with `color="warning"` in high contrast mode ([#8496](https://github.com/elastic/eui/pull/8496))
- Improves contrast and visible distinction of the following components in high contrast mode: ([#8496](https://github.com/elastic/eui/pull/8496))
  - `EuiCode`
  - `EuiBadge`
  - `EuiBetaBadge`
  - `EuiNotificationBadge`

**Dependency updates**

- Updated `prismjs` to v1.30.0 ([#8506](https://github.com/elastic/eui/pull/8506))

## [`v101.1.0`](https://github.com/elastic/eui/releases/v101.1.0)

- Updates `EuiTableRow` styles to check support for `:has(+)` selector ([#8498](https://github.com/elastic/eui/pull/8498))

## [`v101.0.1`](https://github.com/elastic/eui/releases/v101.0.1)

**Bug fixes**

- Resolved an internal issue with linked package versions ([#8490](https://github.com/elastic/eui/pull/8490))

## [`v101.0.0`](https://github.com/elastic/eui/releases/v101.0.0)

- Updated `EuiProvider` and `EuiThemeProvider` with a new `highContrastMode` ([#8444](https://github.com/elastic/eui/pull/8444))
  - This prop allows toggling a higher contrast visual style that primarily affects borders and shadows
  - On `EuiProvider`, if the `highContrastMode` prop is not passed, this setting will inherit from the user's OS/system settings
  - If the user is using a forced colors mode (e.g. Windows' high contrast themes), this system setting will take precedence over any `highContrastMode` or `colorMode` props passed
- Added `highContrastModeStyles` and `preventForcedColors` styling utils ([#8444](https://github.com/elastic/eui/pull/8444))
- Updated `EuiRangeTooltip` to be easier to see in dark mode ([#8444](https://github.com/elastic/eui/pull/8444))
- Updated some deprecated color token usages that have direct substitutes ([#8444](https://github.com/elastic/eui/pull/8444))
  - `text` -> `textParagraph`
  - `title` -> `textHeading`
  - `subduedText` -> `textSubdued`
  - `disabledText` -> `textDisabled`
  - `accentText` -> `textAccent`
  - `dangerText` -> `textDanger`
  - `warningText` -> `textWarning`
- `useEuiShadow()` now accepts a second `options` argument  ([#8234](https://github.com/elastic/eui/pull/8234))
- `useEuiShadowFlat()` now accepts an `options` object instead of only a color ([#8234](https://github.com/elastic/eui/pull/8234))
- Updated `EuiPopover` and `EuiToolTip` to be easier to see in dark mode. ([#8174](https://github.com/elastic/eui/pull/8174))

**Bug fixes**

- Fixed a visual bug where a transparent border would create visible empty space (`LIGHT` mode only) for the components: ([#8427](https://github.com/elastic/eui/pull/8427))
  - `EuiPanel`
  - `EuiPopover`
  - `EuiToolTip`
  - `EuiToast`
  - `EuiTour`

**Breaking changes**

- Removed `EuiLoadingChart` non-mono version, removed `mono` prop ([#8441](https://github.com/elastic/eui/pull/8441))

## [`v100.0.0`](https://github.com/elastic/eui/releases/v100.0.0)

- Added new "Borealis" theme as `@elastic/eui-theme-borealis` package ([#8030](https://github.com/elastic/eui/pull/8030)) ([#8386](https://github.com/elastic/eui/pull/8386))
- Updated the default `theme` value on `EuiProvider` to "Borealis" ([#8288](https://github.com/elastic/eui/pull/8288)) ([#8386](https://github.com/elastic/eui/pull/8386))
- Added shared theme code as `@elastic/eui-theme-common` package ([#8030](https://github.com/elastic/eui/pull/8030)) ([#8386](https://github.com/elastic/eui/pull/8386))
- Added new semantic color tokens on `euiTheme.colors` ([#8097](https://github.com/elastic/eui/pull/8097)) ([#8386](https://github.com/elastic/eui/pull/8386))
  - `textPrimary`
  - `textAccent`
  - `textAccentSecondary`
  - `textSuccess`
  - `textWarning`
  - `textDanger`
  - `textParagraph`
  - `textHeading`
  - `textSubdued`
  - `textDisabled`
  - `textInverse`
  - `backgroundBasePrimary`
  - `backgroundBaseAccent`
  - `backgroundBaseAccentSecondary`
  - `backgroundBaseSuccess`
  - `backgroundBaseWarning`
  - `backgroundBaseDanger`
  - `backgroundBaseSubdued`
  - `backgroundBasePlain`
  - `backgroundBaseDisabled`
  - `backgroundBaseHighlighted`
  - `backgroundBaseFormsPrepend`
  - `backgroundBaseFormsControlDisabled`
  - `backgroundBaseInteractiveHover`
  - `backgroundBaseInteractiveSelect`
  - `backgroundBaseInteractiveOverlay`
  - `backgroundBaseSkeletonEdge`
  - `backgroundBaseSkeletonMiddle`
  - `backgroundLightPrimary`
  - `backgroundLightAccent`
  - `backgroundLightAccentSecondary`
  - `backgroundLightSuccess`
  - `backgroundLightWarning`
  - `backgroundLightDanger`
  - `backgroundLightText`
  - `backgroundFilledPrimary`
  - `backgroundFilledAccent`
  - `backgroundFilledAccentSecondary`
  - `backgroundFilledSuccess`
  - `backgroundFilledWarning`
  - `backgroundFilledDanger`
  - `backgroundFilledText`
  - `borderBasePrimary`
  - `borderBaseAccent`
  - `borderBaseAccentSecondary`
  - `borderBaseSuccess`
  - `borderBaseWarning`
  - `borderBaseDanger`
  - `borderBasePlain`
  - `borderBaseSubdued`
  - `borderBaseDisabled`
  - `borderBaseFloating`
  - `borderBaseFormsColorSwatch`
  - `borderBaseFormsControl`
  - `borderStrongPrimary`
  - `borderStrongAccent`
  - `borderStrongAccentSecondary`
  - `borderStrongSuccess`
  - `borderStrongWarning`
  - `borderStrongDanger`
- Added deprecation for non-semantic color tokens ([#8097](https://github.com/elastic/eui/pull/8097)) ([#8386](https://github.com/elastic/eui/pull/8386))
- Added new component specific tokens on `euiTheme.components` ([#8097](https://github.com/elastic/eui/pull/8097)) ([#8386](https://github.com/elastic/eui/pull/8386))
  - added `components.buttons`, `components.forms` for shared tokens (e.g. `components.forms.maxWidth`)
- Added data vis color tokens on `euiTheme.colors.vis` ([#8112](https://github.com/elastic/eui/pull/8112)) ([#8386](https://github.com/elastic/eui/pull/8386))
  - `euiColorVis0`
  - `euiColorVis1`
  - `euiColorVis2`
  - `euiColorVis3`
  - `euiColorVis4`
  - `euiColorVis5`
  - `euiColorVis6`
  - `euiColorVis7`
  - `euiColorVis8`
  - `euiColorVis9`
  - `euiColorVisBehindText0`
  - `euiColorVisBehindText1`
  - `euiColorVisBehindText2`
  - `euiColorVisBehindText3`
  - `euiColorVisBehindText4`
  - `euiColorVisBehindText5`
  - `euiColorVisBehindText6`
  - `euiColorVisBehindText7`
  - `euiColorVisBehindText8`
  - `euiColorVisBehindText9`
  - `euiColorVisAsTextLight0`
  - `euiColorVisAsTextLight1`
  - `euiColorVisAsTextLight2`
  - `euiColorVisAsTextLight3`
  - `euiColorVisAsTextLight4`
  - `euiColorVisAsTextLight5`
  - `euiColorVisAsTextLight6`
  - `euiColorVisAsTextDark0`
  - `euiColorVisAsTextDark1`
  - `euiColorVisAsTextDark2`
  - `euiColorVisAsTextDark3`
  - `euiColorVisAsTextDark4`
  - `euiColorVisAsTextDark5`
  - `euiColorVisAsTextDark6`
  - `euiColorVisSuccess0`
  - `euiColorVisSuccess1`
  - `euiColorVisWarning0`
  - `euiColorVisDanger0`
  - `euiColorVisDanger1`
  - `euiColorVisNeutral0`
  - `euiColorVisGrey0`
  - `euiColorVisGrey1`
  - `euiColorVisGrey2`
  - `euiColorVisGrey3`
  - `euiColorVisWarm0`
  - `euiColorVisWarm1`
  - `euiColorVisWarm2`
  - `euiColorVisCool0`
  - `euiColorVisCool1`
  - `euiColorVisCool2`
  - `euiColorVisComplementary0`
  - `euiColorVisComplementary1`
- Added severity colors to `euiTheme.colors.vis` ([#8247](https://github.com/elastic/eui/pull/8247)) ([#8386](https://github.com/elastic/eui/pull/8386))
  - `euiColorSeverity0`
  - `euiColorSeverity1`
  - `euiColorSeverity2`
  - `euiColorSeverity3`
  - `euiColorSeverity4`
  - `euiColorSeverity5`
  - `euiColorSeverity6`
  - `euiColorSeverity7`
  - `euiColorSeverity8`
  - `euiColorSeverity9`
  - `euiColorSeverity10`
  - `euiColorSeverity11`
  - `euiColorSeverity12`
  - `euiColorSeverity13`
  - `euiColorSeverity14`
- Updated color palette functions to support multiple themes by retrieving colors from the new `EuiVisColorStore` ([#8112](https://github.com/elastic/eui/pull/8112)) ([#8386](https://github.com/elastic/eui/pull/8386))
- Added new semantic tokens to SCSS variables ([#8097](https://github.com/elastic/eui/pull/8097)) ([#8386](https://github.com/elastic/eui/pull/8386))
- Added new semantic tokens to static JSON exports ([#8115](https://github.com/elastic/eui/pull/8115)) ([#8386](https://github.com/elastic/eui/pull/8386))
- Updated mixin functions `euiBackgroundColor`, `euiBorderColor`, `euiButtonColor`, `euiButtonFilledColor` and `euiButtonEmptyColor` to return tokens ([#8097](https://github.com/elastic/eui/pull/8097)) ([#8386](https://github.com/elastic/eui/pull/8386))
- Updated usages of `transparentize`, `shade` and `tint` with tokens ([#8097](https://github.com/elastic/eui/pull/8097)) ([#8386](https://github.com/elastic/eui/pull/8386))
- Added hooks for color palette functions ([#8284](https://github.com/elastic/eui/pull/8284)) ([#8386](https://github.com/elastic/eui/pull/8386))
  - `useEuiPaletteColorBlind`
  - `useEuiPaletteColorBlindBehindText`
  - `useEuiPaletteForStatus`
  - `useEuiPaletteForTemperature`
  - `useEuiPaletteComplementary`
  - `useEuiPaletteRed`
  - `useEuiPaletteGreen`
  - `useEuiPaletteCool`
  - `useEuiPaletteWarm`
  - `useEuiPaletteGray`
- Updated `EuiPopover`, `EuiToolTip`, `EuiTour` and `EuiRange` with shared popover arrow styles ([#8212](https://github.com/elastic/eui/)pull/8212) ([#8386](https://github.com/elastic/eui/pull/8386))
- Updated border styles on `EuiPanel` to use pseudo element borders ([#8270](https://github.com/elastic/eui/pull/8270)) ([#8386](https://github.com/elastic/eui/pull/8386))

**Bug fixes**

- Fixed `EuiComboBox` by cleaning duplicated values when having a delimiter prop. ([#8335](https://github.com/elastic/eui/pull/8335))

**Breaking changes**

- Renamed `eui_theme_light.json` and `eui_theme_dark.json` to `eui_theme_amsterdam_light.json` and `eui_theme_amsterdam_dark.json` ([#8115](https://github.com/elastic/eui/pull/8115)) ([#8386](https://github.com/elastic/eui/pull/8386))
- Removed `isDefaultTheme` ([#8288](https://github.com/elastic/eui/pull/8288)) ([#8386](https://github.com/elastic/eui/pull/8386))

**Accessibility**

- Updated colors of `EuiToken` to increase contrast ([#8250](https://github.com/elastic/eui/pull/8250)) ([#8386](https://github.com/elastic/eui/pull/8386))
- Added background to hovered `EuiKeypadMenuItem` to increase visibility ([#8294](https://github.com/elastic/eui/pull/8294)) ([#8386](https://github.com/elastic/eui/pull/8386))

## [`v99.4.0`](https://github.com/elastic/eui/releases/v99.4.0)

- Minor design updates to `EuiCollapsibleNavBeta` ([#8332](https://github.com/elastic/eui/pull/8332))
  - Allow section without a title
  - Second-level icons should be horizontally aligned with the top-level icon
  - Turn off text truncation for nav items
- Added `quickSelectButtonProps` to `EuiSuperDatePicker` ([#8380](https://github.com/elastic/eui/pull/8380))

**Bug fixes**

- Fixed a bug in `EuiHeader` where the navigation of `EuiCollapsibleNavBeta` would render below the `EuiFlyout`'s overlay ([#8325](https://github.com/elastic/eui/pull/8325))

**Accessibility**

- Improved the accessibility of `EuiComboBox` by adding `aria-setsize` and `aria-posinset` to ensure correct information is provided for its virtualized listbox ([#8333](https://github.com/elastic/eui/pull/8333))
- Improved the `EuiAccordionTrigger`'s screen reader UX by passed `aria-hidden` to the `EuiAccordionArrow` to avoid duplicated announcements by screen readers. ([#8342](https://github.com/elastic/eui/pull/8342))

## [`v99.3.0`](https://github.com/elastic/eui/releases/v99.3.0)

- Updated table components to support adding tooltips to header cells ([#8273](https://github.com/elastic/eui/pull/8273))
  - Added `columns.nameTooltip` on `EuiBasicTable`
  - Added `tooltipProps` prop on `EuiTableHeaderCell`
- Added `accent` color option to `EuiCallOut` ([#8303](https://github.com/elastic/eui/pull/8303))
- Updated `EuiInlineEditForm`'s `onCancel` prop type to allow uncontrolled mode usage ([#8307](https://github.com/elastic/eui/pull/8307))
- Added ES|QL syntax highlighting for `EuiCode`, `EuiCodeBlock`, `EuiMarkdownFormat`, and `EuiMarkdownEditor` components. ([#8317](https://github.com/elastic/eui/pull/8317))
- Updated `EuiAccordion` to prevent content from being transitioned on initial render when `initialIsOpen=true` ([#8327](https://github.com/elastic/eui/pull/8327))

**Bug fixes**

- Fixed a bug on `EuiSuperDatePicker` where pasting an absolute date would append the date instead of replace it ([#8311](https://github.com/elastic/eui/pull/8311))

## [`v99.2.0`](https://github.com/elastic/eui/releases/v99.2.0)

- Changed `EuiFieldText` styles to prioritize `disabled` styling over `readonly`. ([#8271](https://github.com/elastic/eui/pull/8271))
- Added `plugs` and `web` glyphs to `EuiIcon` ([#8285](https://github.com/elastic/eui/pull/8285))
- Update `title` on `EuiColorPalettePickerPaletteProps` to be optional ([#8289](https://github.com/elastic/eui/pull/8289))

**Bug fixes**

- Fixed an issue with EuiDataGrid with auto row height resulting in a table of 0 height ([#8251](https://github.com/elastic/eui/pull/8251))
- Fixed `disabled` behavior of `EuiFieldText` to  prevent input changes. ([#8271](https://github.com/elastic/eui/pull/8271))

## [`v99.1.0`](https://github.com/elastic/eui/releases/v99.1.0)

- Updated `EuiColorPalettePicker` - adds `append` to `EuiColorPalettePickerPaletteProps` to support appending custom content to the title ([#8208](https://github.com/elastic/eui/pull/8208))
- Updated font-weight and font-size of `EuiBetaBadge`s to improve legibility ([#8255](https://github.com/elastic/eui/pull/8255))
- Added support for `titleColor` variant `warning` on `EuiStat` ([#8278](https://github.com/elastic/eui/pull/8278))

## [`v99.0.0`](https://github.com/elastic/eui/releases/v99.0.0)

- Added two new icons: `createGenericJob` and `createGeoJob` ([#8248](https://github.com/elastic/eui/pull/8248))
- Added new icon `section` ([#8261](https://github.com/elastic/eui/pull/8261))

**Bug fixes**

- Ensures that the `values` of `EuiI18n` used in `EuiPagination` use `key` attributes to prevent potential ["unique key" warnings](https://react.dev/learn/rendering-lists#keeping-list-items-in-order-with-key). ([#8243](https://github.com/elastic/eui/pull/8243))

**Breaking changes**

- Removed `EuiPopover`'s deprecated `hasDragDrop` prop. Use `usePortal` on any child `EuiDraggable` instead ([#8256](https://github.com/elastic/eui/pull/8256))

