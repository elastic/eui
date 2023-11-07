## [`v31.0.0`](https://github.com/elastic/eui/releases/tag/v31.0.0)

- Added collapsble behavior to `EuiResizableContainer` panels ([#3978](https://github.com/elastic/eui/pull/3978))
- Updated `EuiResizablePanel` to use `EuiPanel` ([#3978](https://github.com/elastic/eui/pull/3978))
- Changed `showTimeSelect` prop to true when `showTimeSelectOnly` prop is set to true ([#4372](https://github.com/elastic/eui/pull/4372))
- Updated `EuiSuperSelect` recently used list to render as `<ol>` and `<li>` elements ([#4370](https://github.com/elastic/eui/pull/4370))

**Bug fixes**

- Fixed `EuiSuggest` popover opening when an empty array is passed into the `suggestions` prop ([#4349](https://github.com/elastic/eui/pull/4349))

**Breaking changes**

- Removed `size` prop from `EuiResizableButton` ([#3978](https://github.com/elastic/eui/pull/3978))
- Upgraded to TypeScript v4.0 ([#4296](https://github.com/elastic/eui/pull/4296))

## [`v30.6.1`](https://github.com/elastic/eui/releases/tag/v30.6.1)

**Note: this release is a backport containing changes originally made in `31.5.0`**

**Bug fixes**

- Fixed `EuiBadge` with `iconOnClick` from catching form submit events ([#4479](https://github.com/elastic/eui/pull/4479))

## [`v30.6.0`](https://github.com/elastic/eui/releases/tag/v30.6.0)

- Adjusted the shadow in `EuiComment` ([#4321](https://github.com/elastic/eui/pull/4321))
- Added `success` and `warning` colors to `EuiButtonEmpty` ([#4325](https://github.com/elastic/eui/pull/4325))
- Added a sorting indicator on the `EuiDataGridColumn` ([#4343](https://github.com/elastic/eui/pull/4343))
- Added `disabled` and `loading` `status` to `EuiStep` ([#4338](https://github.com/elastic/eui/pull/4338))
- Added `closePopover` prop to `EuiDataGridColumnCellActionProps` ([#4346](https://github.com/elastic/eui/pull/4346))

**Bug fixes**

- Fixed `EuiErrorBoundary` error message not showing in non-Chromium browsers ([#4324](https://github.com/elastic/eui/pull/4324))
- Fixed `EuiToolTip` closing during initial positioning period ([#4327](https://github.com/elastic/eui/pull/4327))
- Added `!default` to SASS variables of `EuiCollapsibleNav` ([#4335](https://github.com/elastic/eui/pull/4335))
- Fixed `EuiDataGrid` column property `displayAsText` ([#4351](https://github.com/elastic/eui/pull/4351))
- Fixed propagation of `esc` key presses closing parent popovers ([#4336](https://github.com/elastic/eui/pull/4336))
- Fixed overwritten `isDisabled` prop on `EuiListGroupItem` `extraAction` config ([#4359](https://github.com/elastic/eui/pull/4359))
- Fixed `inputRef` for `EuiCheckbox` ([#4298](https://github.com/elastic/eui/pull/4298))
- Limited the links allowed in `EuiMarkdownEditor` to http, https, or starting with a forward slash ([#4362](https://github.com/elastic/eui/pull/4362))
- Aligned components with an `href` prop to React's practice of disallowing `javascript:` protocols ([#4362](https://github.com/elastic/eui/pull/4362))
- Fixed form submit bug in `EuiButtonGroup` by adding an optional `type` prop for `EuiButtonGroupOption` ([#4368](https://github.com/elastic/eui/pull/4368))
- Changed `label` type from `string` to `ReactNode` in `EuiTreeViewNode` ([#4352](https://github.com/elastic/eui/pull/4352))

**Theme: Amsterdam**

- Removed the shadow in `EuiComment` ([#4321](https://github.com/elastic/eui/pull/4321))
- Reduced font size for `xs` size in `EuiButtonEmpty` ([#4325](https://github.com/elastic/eui/pull/4325))
- Increased font size for `m` size of `EuiListGroupItem` ([#4340](https://github.com/elastic/eui/pull/4340))
- Reduced padding in `EuiToolTip` ([#4353](https://github.com/elastic/eui/pull/4353))
- Reduced border-radius in `EuiRange`'s tooltip ([#4353](https://github.com/elastic/eui/pull/4353))
- Consolidated `EuiStepNumber` indicators for `EuiSteps` and `EuiHorizontalSteps` ([#4338](https://github.com/elastic/eui/pull/4338))

## [`v30.5.1`](https://github.com/elastic/eui/releases/tag/v30.5.1)

- Upgraded `highlight.js` to 9.18.5 ([#4313](https://github.com/elastic/eui/pull/4313))

## [`v30.5.0`](https://github.com/elastic/eui/releases/tag/v30.5.0)

- Export `euiSelectableTemplateSitewideRenderOptions` ([#4305](https://github.com/elastic/eui/pull/4305))

**Bug fixes**

- Expose `isPreFiltered` in `EuiSelectable` props fixing consumer-side searching ([#4305](https://github.com/elastic/eui/pull/4305))
- Fixed stale state argument passed to `searchProps.onChange` in an `EuiSelectable`([#4292](https://github.com/elastic/eui/pull/4292))
- Fixed initial focus of an `EuiButtonGroup` when first item in a popover ([#4288](https://github.com/elastic/eui/pull/4288))
- Fixed visible scrollbar in `EuiComboBox` list ([#4301](https://github.com/elastic/eui/pull/4301))
- Removed hiding of time select on small screens for `EuiDatePicker` ([#4301](https://github.com/elastic/eui/pull/4301))
- Fixed wrong columns assigned to `EuiDataGrid` leadingControlColumns ([#4269](https://github.com/elastic/eui/pull/4269))

**Theme: Amsterdam**

- Fixed styles for `EuiMarkdownEditor` ([#4289](https://github.com/elastic/eui/pull/4289))
- Rounded all corners of dropdown type of inputs ([#4301](https://github.com/elastic/eui/pull/4301))

## [`v30.4.2`](https://github.com/elastic/eui/releases/tag/v30.4.2)

**Bug fixes**

- Reverted changing of `EuiPopover`s `ownFocus` default from `false` to `true` ([#4228](https://github.com/elastic/eui/pull/4228))

## [`v30.4.1`](https://github.com/elastic/eui/releases/tag/v30.4.1)

- Exported `useDataGridColumnSelector`, `useDataGridColumnSorting`, and `useDataGridStyleSelector` hooks ([#4271](https://github.com/elastic/eui/pull/4271))

**Theme: Amsterdam**

- Unify colors with the Elastic brand ([#4284](https://github.com/elastic/eui/pull/4284))
- Created one consistent look for disabled `EuiButton` ([#4284](https://github.com/elastic/eui/pull/4284))

## [`v30.4.0`](https://github.com/elastic/eui/releases/tag/v30.4.0)

- Added `eql` glyph in `EuiIcon` ([#4110](https://github.com/elastic/eui/pull/4110))
- Added `testenv` mock for `htmlIdGenerator` ([#4212](https://github.com/elastic/eui/pull/4212))
- Added several Sass mixins for handling of unified focus/hover states ([#4242](https://github.com/elastic/eui/pull/4242))

**Bug fixes**

- Fixed cell resizer overlapping of `EuiDataGrid` rightmost header cell ([#4071](https://github.com/elastic/eui/pull/4268))


**Theme: Amsterdam**

- Unify focus states by leaning into `outline` and restricting to keyboard navigation ([#4242](https://github.com/elastic/eui/pull/4242))
- Removed faux border from `EuiAvatar` ([#4255](https://github.com/elastic/eui/pull/4255))
- Changed the color and font-weight of inline code block ([#4272](https://github.com/elastic/eui/pull/4272))

## [`v30.3.0`](https://github.com/elastic/eui/releases/tag/v30.3.0)

- Added `EuiColorPaletteDisplay` component ([#3865](https://github.com/elastic/eui/pull/3865))
- Added `initialFocusedItemIndex` support to `EuiContextMenuPanelDescriptor` ([#4223](https://github.com/elastic/eui/pull/4223))
- Updated the default of the `EuiPopover`s `ownFocus` prop from `false` to `true` ([#4228](https://github.com/elastic/eui/pull/4228))
- Added `role="alert"` and `aria-live="assertive"` to `EuiForm`'s `EuiCallOut` for the errors ([#4238](https://github.com/elastic/eui/pull/4238))
- Added `menuDown` and `menuUp` glyphs to `EuiIcon` ([#4244](https://github.com/elastic/eui/pull/4244))
- Removed spacer after `childrenBetween` in `EuiInMemoryTable` ([#4248](https://github.com/elastic/eui/pull/4248))
- Changed `clickOutsideDisables` to `true` when `ownFocus={false}` in `EuiFlyout` ([#4236](https://github.com/elastic/eui/pull/4236))

**Bug fixes**

- Fixed focus trap + `EuiPopover` bug which prevented the anchor from receiving focus when the popover closes ([#4071](https://github.com/elastic/eui/pull/4071))
- Fixed focus trap error & performance impact when one focus trap is deactivated and another becomes enabled ([#4071](https://github.com/elastic/eui/pull/4071))
- Fixed a condition in `EuiInMemoryTable` to avoid mistaken assignment of `sortName` ([#4138](https://github.com/elastic/eui/pull/4138))
- Fixed bug in small `EuiImage`'s not respecting the optional sizes when `allowFullScreen` is set to true ([#4207](https://github.com/elastic/eui/pull/4207))
- Fixed incorrect initial rendering of `EuiDualRange` thumbs when element width is 0 ([#4230](https://github.com/elastic/eui/pull/4230))
- Fixed bug in `EuiSelectable` to call `searchProps.onChange` and `searchProps.onSearch` calls in `EuiSelectable` ([#4153](https://github.com/elastic/eui/pull/4153))
- Fixed truncation of the `EuiComboBox` `placeholder` text ([#4210](https://github.com/elastic/eui/pull/4210))

**Theme: Amsterdam**

- Fixed base `line-heights` for within `euiFontSize[size]()` SASS mixins ([#4229](https://github.com/elastic/eui/pull/4229))

## [`v30.2.0`](https://github.com/elastic/eui/releases/tag/v30.2.0)

- Added `labelWidth` and `descriptionDisplay` props to `EuiSuggestItem` ([#4180](https://github.com/elastic/eui/pull/4180))
- Added screen reader notification if `EuiLink` opens in a new window ([#4172](https://github.com/elastic/eui/pull/4172))
- Set `external` prop to true if `EuiLink` opens in a new window ([#4172](https://github.com/elastic/eui/pull/4172))
- Added `float` and `margin` props to `EuiImage` ([#4209](https://github.com/elastic/eui/pull/4209))
- Added `color` and `borderRadius` props to `EuiPanel` ([#4194](https://github.com/elastic/eui/pull/4194))
- Updated the use case for the `EuiPanel` prop `hasShadow` ([#4194](https://github.com/elastic/eui/pull/4194))
- Deprecated the `onClick`, `betaBadgeLabel`, `betaBadgeTooltipContent`, and `betaBadgeTitle` props of `EuiPanel` ([#4194](https://github.com/elastic/eui/pull/4194))

**Bug fixes**

- Fixed issue with `labelDisplay` not being passed to `EuiSuggestItem` ([#4180](https://github.com/elastic/eui/pull/4180))
- Fixed copy in `EuiDataGrid`'s header menu's sort actions ([#4199](https://github.com/elastic/eui/pull/4199))

**Theme: Amsterdam**

- Fixed `border-radius` in `EuiFormControlLayout` ([#4196](https://github.com/elastic/eui/pull/4196))

## [`v30.1.1`](https://github.com/elastic/eui/releases/tag/v30.1.1)

- Added more exports for `EuiInMemoryTable` types ([#4179](https://github.com/elastic/eui/pull/4179))

**Bug fixes**

- Removed unnecessary shadow on hover of `EuiButtonGroup` ([#4186](https://github.com/elastic/eui/pull/4186))
- Fixed position of `EuiScreenReaderOnly` elements within `EuiButtonGroup` ([#4189](https://github.com/elastic/eui/pull/4189))

## [`v30.1.0`](https://github.com/elastic/eui/releases/tag/v30.1.0)

- Improved `EuiButtonGroup` focus, hover, selected and disabled states ([#4142](https://github.com/elastic/eui/pull/4142))
- Added `display` prop to `EuiToolTip` for common display block needs ([#4148](https://github.com/elastic/eui/pull/4148))
- Added support for more colors in `EuiProgress` such as `vis0` through `vis9`, `warning`, `success`  and custom colors ([#4130](https://github.com/elastic/eui/pull/4130))
- Added `affordForDisplacement` prop to `EuiBottomBar` ([#4156](https://github.com/elastic/eui/pull/4156))
- Added `width` property to `mobileOptions` prop of `EuiTableRowCell` ([#4169](https://github.com/elastic/eui/issues/4169))

**Bug fixes**

- Fixed issue with duplicate checkmarks in `EuiComboBox` ([#4162](https://github.com/elastic/eui/pull/4162))
- Reinstated base element type extensions for `EuiStepHorizontal` and `EuiStepsHorizontal` ([4166](https://github.com/elastic/eui/pull/4166))

## [`v30.0.0`](https://github.com/elastic/eui/releases/tag/v30.0.0)

- Deprecated `EuiKeyboardAccessible` ([#4135](https://github.com/elastic/eui/pull/4135))
- Refactored `EuiStep`, `EuiHorizontalSteps`, and `EuiCodeEditor` for better accessibility ([#4135](https://github.com/elastic/eui/pull/4135))
- Added `minWidth` prop to `EuiButton` ([#4056](https://github.com/elastic/eui/pull/4056))
- Added `isSelected` prop to easily turn `EuiButton`, `EuiButtonEmpty`, and `EuiButtonIcon` into toggle buttons ([#4056](https://github.com/elastic/eui/pull/4056))
- Updated `EuiButtonGroup` props and render for better accessibility ([#4056](https://github.com/elastic/eui/pull/4056))
- Added `paddingSize` prop to `EuiPopoverTitle` and `EuiPopoverFooter` ([#4133](https://github.com/elastic/eui/pull/4133))
- Added more exports for `EuiBasicTable` types ([#4125](https://github.com/elastic/eui/pull/4125))
- Updated types associated with `EuiMarkdownEditor` plugin dependencies ([#4124](https://github.com/elastic/eui/pull/4124))
- Upgraded dependencies related to `EuiMarkdownEditor`: `react-dropzone`, `rehype-*`, `remark-*`, and `unified` ([#4124](https://github.com/elastic/eui/pull/4124))
- Added `cellActions` to `EuiDataGrid` ([#3668](https://github.com/elastic/eui/pull/3668))

**Bug fixes**

- Fixed focus management bug in `EuiSelectable` ([#4152](https://github.com/elastic/eui/pull/4152))

**Breaking changes**

- Removed `EuiToggle` and `EuiButtonToggle` in favor of `aria-pressed` ([#4056](https://github.com/elastic/eui/pull/4056))
- Updated `legend` and `idSelected` props of `EuiButtonGroup` to be required ([#4056](https://github.com/elastic/eui/pull/4056))
- Removed `logoAPM` in favor of `logoObservability` ([#4065](https://github.com/elastic/eui/pull/4065))
- Removed `.euiHeaderNotification` CSS class ([#4065](https://github.com/elastic/eui/pull/4065))
- Removed `EuiNavDrawer` in favor of `EuiCollapsibleNav` ([#4065](https://github.com/elastic/eui/pull/4065))
- Removed `compressed` and `displayOnly` props from `EuiFormRow` in favor of the `display` prop ([#4065](https://github.com/elastic/eui/pull/4065))
- Removed `EuiPopover`'s `withTitle` prop ([#4065](https://github.com/elastic/eui/pull/4065))

**Theme: Amsterdam**

- Tightened `line-height` for some `EuiTitle` sizes ([#4133](https://github.com/elastic/eui/pull/4133))
- Removed uppercase from `EuiPopoverTitle` and fixed inherited padding from `EuiPopover` ([#4146](https://github.com/elastic/eui/pull/4146))
- Fixed `EuiFilterGroup` and `EuiFilterButton` styles ([#4151](https://github.com/elastic/eui/pull/4151))

## [`v29.5.0`](https://github.com/elastic/eui/releases/tag/v29.5.0)

- Added `plus` and `minus` glyphs to `EuiIcon` ([#4111](https://github.com/elastic/eui/pull/4111))

**Bug fixes**

- Fixed custom color render of `EuiIcon` app (two-tone) icons ([#4104](https://github.com/elastic/eui/pull/4104))
- Changed `iconType` prop to be `required` in `EuiButtonIcon` ([#4106](https://github.com/elastic/eui/pull/4106))

## [`v29.4.0`](https://github.com/elastic/eui/releases/tag/v29.4.0)

- Added `childrenBetween` prop to `EuiInMemoryTable` to add content between search bar and table ([#4103](https://github.com/elastic/eui/pull/4103))
- Added `max-width: 100%` to `EuiKeyPadMenu` to allow it to shrink when its container is smaller than its fixed width ([ #4092](https://github.com/elastic/eui/pull/4092))
- Added `key` to `EuiComboBoxOptionOption` to allow duplicate labels ([#4048](https://github.com/elastic/eui/pull/4048))
- Changed `EuiIcon` test mock to render as `span` instead of `div` ([#4099](https://github.com/elastic/eui/pull/4099))
- Added `scripts/docker-puppeteer` as the new home for test-related Docker images ([#4062](https://github.com/elastic/eui/pull/4062))

**Bug fixes**

- Fixed `EuiFieldSearch` padding when `isClearable` but has no `value` ([#4089](https://github.com/elastic/eui/pull/4089))

## [`v29.3.2`](https://github.com/elastic/eui/releases/tag/v29.3.2)

**Note: this release is a backport containing changes originally made in `30.6.0`**

**Bug fixes**

- Upgraded `highlight.js` to 9.18.5 ([#4313](https://github.com/elastic/eui/pull/4313))
- Limited the links allowed in `EuiMarkdownEditor` to http, https, or starting with a forward slash ([#4362](https://github.com/elastic/eui/pull/4362))
- Aligned components with an `href` prop to React's practice of disallowing `javascript:` protocols ([#4362](https://github.com/elastic/eui/pull/4362))

## [`v29.3.1`](https://github.com/elastic/eui/releases/tag/v29.3.1)

**Note: this release is a backport containing changes originally made in `30.0.0`**

**Bug fixes**

- Fixed focus management bug in `EuiSelectable` ([#4152](https://github.com/elastic/eui/pull/4152))

## [`v29.3.0`](https://github.com/elastic/eui/releases/tag/v29.3.0)

- Added `both` option to `flush` prop of `EuiButtonEmpty` ([#4084](https://github.com/elastic/eui/pull/4084))

## [`v29.3.0`](https://github.com/elastic/eui/releases/tag/v29.3.0)

- Added `both` option to `flush` prop of `EuiButtonEmpty` ([#4084](https://github.com/elastic/eui/pull/4084))

**Bug fixes**

- Fixed `EuiRange` and `EuiDualRange` display of internal spacer ([#4084](https://github.com/elastic/eui/pull/4084))
- Fixed `EuiFieldSearch` padding for the different states ([#4084](https://github.com/elastic/eui/pull/4084))
- Fixed `EuiCheckableCard` disabled but checked styles ([#4084](https://github.com/elastic/eui/pull/4084))

**Theme: Amsterdam**

- Fixed `line-height` on `EuiTitle` ([#4079](https://github.com/elastic/eui/pull/4079))

## [`v29.2.0`](https://github.com/elastic/eui/releases/tag/v29.2.0)

- Improved contrast for `EuiIcon` and `EuiButtonIcon` named colors. This affects `EuiHealth` which uses the `EuiIcon` colors ([#4049](https://github.com/elastic/eui/pull/4049))
- Added color `accent` to `EuiButtonIcon` ([#4049](https://github.com/elastic/eui/pull/4049))

**Bug fixes**

- Fixed `EuiComboBox` `rowHeight` prop causing the height of the option list to be miscalculated ([#4072](https://github.com/elastic/eui/pull/4072))
- Fixed `EuiComboBox` not focusing on the selected option if `selectedOptions` was set without reference to `options` ([#4072](https://github.com/elastic/eui/pull/4072))

**Theme: Amsterdam**

- Removed `border-radius` from `EuiCallout` ([#4066](https://github.com/elastic/eui/pull/4066))
- Updated styles for `EuiToast` ([#4076](https://github.com/elastic/eui/pull/4076))

## [`v29.1.0`](https://github.com/elastic/eui/releases/tag/v29.1.0)

- Added footer row to `EuiDataGrid` via the `renderFooterCellValue` prop ([#3770](https://github.com/elastic/eui/pull/3770))
- Added column header menu to `EuiDataGrid` ([#3087](https://github.com/elastic/eui/pull/3087))
- Added horizontal line separator to `EuiContextMenu` ([#4018](https://github.com/elastic/eui/pull/4018))
- Added controlled pagination props to `EuiInMemoryTablee` ([#4038](https://github.com/elastic/eui/pull/4038))
- Added `gutterSize`, `popoverBreakpoints`, `popoverButtonProps`, and `popoverProps` props to `EuiHeaderLinks` ([#4046](https://github.com/elastic/eui/pull/4046))
- Added `'all'` and `'none'` options to the `sizes` prop of `EuiHideFor` and `EuiShowFor` ([#4046](https://github.com/elastic/eui/pull/4046))

**Bug fixes**

- Fixed `EuiTextColor` playground error due to `color` prop not getting captured by the documentation generator ([#4058](https://github.com/elastic/eui/pull/4058))

## [`v29.0.0`](https://github.com/elastic/eui/releases/tag/v29.0.0)

- Added `.browserslistrc` for global browser support reference ([#4022](https://github.com/elastic/eui/pull/4022))
- Added ability to specify `color` of `EuiHeaderLink` ([#4008](https://github.com/elastic/eui/pull/4008))
- Added `boolean` type to the `notification` prop of `EuiHeaderSectionItemButton` to show a simple dot ([#4008](https://github.com/elastic/eui/pull/4008))
- Added `popoverButton` and `popoverButtonBreakpoints` props to `EuiSelectableTemplateSitewide` for responsive capabilities ([#4008](https://github.com/elastic/eui/pull/4008))
- Added `isWithinMaxBreakpoint` service ([#4008](https://github.com/elastic/eui/pull/4008))

**Bug fixes**

- Fixed `EuiSuperDatePicker` got stuck in update mode if the value is not changed ([#4025](https://github.com/elastic/eui/pull/4025))
- Fixed ref not being handled properly in `EuiValidatableControl` when used with [react-hook-form](https://react-hook-form.com/) ([#4001](https://github.com/elastic/eui/pull/4001))
- Fixed `EuiNotificationBadge` `color` prop type ([#4008](https://github.com/elastic/eui/pull/4008))
- Fixed z-index of `EuiBottomBar` to stay under header ([#4008](https://github.com/elastic/eui/pull/4008))
- Fixed regression of `EuiSelectable` not abiding by the `showIcons` prop ([#4008](https://github.com/elastic/eui/pull/4008))
- Fixed contrast of search input of `EuiSelectableTemplateSitewide` in dark header ([#4008](https://github.com/elastic/eui/pull/4008))
- Fixed `EuiImage` unable to deactivate the full screen mode using the close icon ([#4033](https://github.com/elastic/eui/pull/4033))
- Allowed `onClick` prop when `href` prop is provided in `EuiBadge` ([#4035](https://github.com/elastic/eui/pull/4035))

**Breaking changes**

- Changed `EuiHideFor` and `EuiShowFor` from using media queries to hide content to not rendering the content. Children are now required and `display` has been removed ([#4008](https://github.com/elastic/eui/pull/4008))

## [`v28.4.0`](https://github.com/elastic/eui/releases/tag/v28.4.0)

- Added `loading` icon to `EuiComboBox` input when `isLoading` is `true` ([#4015](https://github.com/elastic/eui/pull/4015))
- Changed `value` prop in `EuiExpression` to not required ([#4014](https://github.com/elastic/eui/pull/4014))
- Added `fold` and `unfold` glyphs to `EuiIcon` ([#3994](https://github.com/elastic/eui/pull/3994))

**Bug fixes**

- Fix incorrect `euiCodeBlockNameColor` variable usage for `.hljs-name` in SCSS ([#3991](https://github.com/elastic/eui/pull/3991))
- Fixed bug in `EuiAccordion` where the `arrowDisplay="right"` is ignored when `extraAction` is configured ([#3971](https://github.com/elastic/eui/pull/3971))

**Theme: Amsterdam**

- Updated form control styles to use a uniform border-radius ([#3741](https://github.com/elastic/eui/pull/3741))

## [`v28.3.1`](https://github.com/elastic/eui/releases/tag/v28.3.1)

**Bug fixes**

- Fixed `EuiFieldSearch`'s clear button covering the `value` of the input ([#3936](https://github.com/elastic/eui/pull/3936))
- Fixed bug in `EuiComboBox` where the input was dropping to the next line when a `EuiBadge` had a very long text ([#3968](https://github.com/elastic/eui/pull/3968))
- Fixed type mismatch between `EuiSelectable` options extended via `EuiSelectableOption` and internal option types ([#3983](https://github.com/elastic/eui/pull/3983))
- Fixed `EuiButton` CSS for RTL languages by using `margin-inline-[pos]` instead of `margin-[pos]` ([#3974](https://github.com/elastic/eui/pull/3974))
- Fixed server-side rendering of `EuiBreadcrumbs` and `EuiCollapsibleNav` ([#3970](https://github.com/elastic/eui/pull/3970))

## [`v28.3.0`](https://github.com/elastic/eui/releases/tag/v28.3.0)

- Adjusted coloring of `EuiSideNav` to be more consistent across open states ([#3926](https://github.com/elastic/eui/pull/3926))
- Added build-specific babel configurations for docs and tests ([#3911](https://github.com/elastic/eui/pull/3911))
- Updated browserslist configuration to remove IE accommodations ([#3911](https://github.com/elastic/eui/pull/3911))
- Removed docgenInfo from non-docs production builds ([#3911](https://github.com/elastic/eui/pull/3911))
- Added `regressionJob`, `outlierDetectionJob` and `classificationJob` icons to Machine Learning icon set, updated others ([#3931](https://github.com/elastic/eui/pull/3931))
- Added `operator` field to `EuiSearchBar`'s `field_value_selection` filter configuration ([#3922](https://github.com/elastic/eui/pull/3922))

**Bug fixes**

- Fixed bug in `EuiBasicTable` not fully expanding tall rows (height > 1000px) ([#3855](https://github.com/elastic/eui/pull/3855))
- Fixed bug in `EuiDataGrid` which sometimes prevented header cells from being focusabled ([#3943](https://github.com/elastic/eui/pull/3943))
- Fixed bug in `EuiFieldSearch` where a default value would not include the clear button ([#3958](https://github.com/elastic/eui/pull/3958))
- Fixed focus fighting bug when `EuiDataGrid` cell content manages its own popover ([#3951](https://github.com/elastic/eui/pull/3951))
- Fixed `valueText` getting cut off in `EuiProgress` ([#3948](https://github.com/elastic/eui/pull/3948))

## [`v28.2.0`](https://github.com/elastic/eui/releases/tag/v28.2.0)

- Added `EuiSelectableTemplateSitewide` as wrapper of `EuiSelectable` for Elastic's global search component ([#3800](https://github.com/elastic/eui/pull/3800))
- Updated styles of `EuiMark` to override browser default ([#3800](https://github.com/elastic/eui/pull/3800))
- Updated `EuiHighlight` to use `EuiMark` as matching element wrapper ([#3800](https://github.com/elastic/eui/pull/3800))
- Enhanced `EuiSelectable`'s `option` type to allow for a separate `searchableLabel` and any generic keys ([#3800](https://github.com/elastic/eui/pull/3800))
- Added `listProps.onFocusBadge`, `loadingMessage`, `noMatchesMessage`, and `emptyMessage` props to `EuiSelectable` ([#3800](https://github.com/elastic/eui/pull/3800))
- Added `bordered` prop to `EuiSelectableMessage` ([#3800](https://github.com/elastic/eui/pull/3800))

**Bug fixes**

- Fixed display of `EuiBadge` if only the `iconType` is passed ([#3800](https://github.com/elastic/eui/pull/3800))
- Fixed accessibility error in `EuiSelectable` when the `list` isn't on the page ([#3800](https://github.com/elastic/eui/pull/3800))
- Fixed accessibility error in `EuiPopover` when `ownFocus = false` ([#3800](https://github.com/elastic/eui/pull/3800))

## [`v28.1.0`](https://github.com/elastic/eui/releases/tag/v28.1.0)

- Added `isLoading` and `isLoadingMessage` props to `EuiAccordion` ([#3879](https://github.com/elastic/eui/pull/3879))
- Added `testenv` mock for `EuiFocusTrap` ([#3930](https://github.com/elastic/eui/pull/3930))

**Bug fixes**

- Fixed bug in `EuiCodeBlock` content overlapping with control buttons when `whiteSpace` was set to `"pre"` ([#3853](https://github.com/elastic/eui/pull/3853))
- Fixed `EuiFocusTrap` not applying provided `style` prop ([#3916](https://github.com/elastic/eui/pull/3916))
- Fixed bug in `EuiDataGrid` when a new pagination object would cause every cell to render ([#3919](https://github.com/elastic/eui/pull/3919))

## [`v28.0.0`](https://github.com/elastic/eui/releases/tag/v28.0.0)

- Update `createTheme` to apply latest changes to elastic charts `Theme` ([#3792](https://github.com/elastic/eui/pull/3792))
- Added icons for `appSearchApp` and `workplaceSearchApp` to `EuiIcon` ([#3859](https://github.com/elastic/eui/pull/3859))
- Added `unlink` glyph to `EuiIcon` ([#3869](https://github.com/elastic/eui/pull/3869))
- Added `EuiMarkdownEditor` and `EuiMarkdownFormat` components ([#3522](https://github.com/elastic/eui/pull/3522))

**Bug fixes**

- Fixed `EuiFacetGroup` container expansion due to negative margin value ([#3871](https://github.com/elastic/eui/pull/3871))
- Fixed `EuiComboBox` delimeter-separated option creation and empty state prompt text ([#3841](https://github.com/elastic/eui/pull/3841))
- Fixed `EuiDataGrid` not properly resizing within a fixed height container ([#3894](https://github.com/elastic/eui/pull/3894))
- Fixed bug in `EuiFieldPassword` where an edge case mutated its `append` prop  ([#3884](https://github.com/elastic/eui/pull/3884))

**Breaking changes**

- Requires `@elastic/charts` version `20.0.0` and above for chart theming utils.

## [`v27.4.1`](https://github.com/elastic/eui/releases/tag/v27.4.1)

**Note: this release is a backport containing changes originally made in `28.1.0`**

- Added `testenv` mock for `EuiFocusTrap` ([#3930](https://github.com/elastic/eui/pull/3930))

## [`v27.4.0`](https://github.com/elastic/eui/releases/tag/v27.4.0)

- Added `customOptionText` prop to `EuiComboBox` ([#3811](https://github.com/elastic/eui/pull/3811))

**Bug fixes**

- Improve `EuiDataGrid` Chrome rendering performance in full screen ([#3726](https://github.com/elastic/eui/issues/3726))
- Removed `@elastic/eui/src-docs` entries from published _eui.d.ts_ ([#3856](https://github.com/elastic/eui/pull/3856))

## [`v27.3.1`](https://github.com/elastic/eui/releases/tag/v27.3.1)

**Bug fixes**

- Fixed bug in all input fields placeholders in Safari that weren't vertically centered ([#3809](https://github.com/elastic/eui/pull/3809))
- Removed `pointer-events: none` in both `EuiButton` & `EuiButtonEmpty` to not override the `pointer-events: auto` in the button mixin `euiButtonContentDisabled` ([#3824](https://github.com/elastic/eui/pull/3824))
- Fixed bug in `EuiPagination` showing wrong page count when `compressed` prop is true ([#3827](https://github.com/elastic/eui/pull/3827))
- Fixed bug in EUI's input field components where their `inputRef` couldn't be a `RefObject` ([#3822](https://github.com/elastic/eui/pull/3822))
- Moved `react-view` and `html-format` to be `devDependencies` ([#3828](https://github.com/elastic/eui/pull/3828))
- Fixed `EuiComboBox` keyboard selection when `sortMatchesBy=startsWith` ([#3823](https://github.com/elastic/eui/pull/3823))
- Fixed `EuiCodeEditor` not exiting edit mode with `esc` when `enableLiveAutocompletion=true` ([#3833](https://github.com/elastic/eui/pull/3833))
- Fixed issue where `EuiDataGrid`'s cell expansion popover would sometimes render as a scrollable element ([#3832](https://github.com/elastic/eui/pull/3832))

## [`v27.3.0`](https://github.com/elastic/eui/releases/tag/v27.3.0)

- Added possibility to hide "Rows per page" select in `EuiDataGrid` ([#3700](https://github.com/elastic/eui/pull/3700))
- Updated lodash to `v4.17.19` ([#3764](https://github.com/elastic/eui/pull/3764))
- Added `returnKey` glyph to `EuiIcon` ([#3783](https://github.com/elastic/eui/pull/3783))
- Added `type` prop to `EuiFieldPassword` to support toggling of obfuscation ([#3751](https://github.com/elastic/eui/pull/3751))

**Bug fixes**

- Fixed bug in `EuiDataGrid` not calculating the width correctly ([#3789](https://github.com/elastic/eui/pull/3789))
- Fixed `EuiComboBox` marking some very long inputs as invalid ([#3797](https://github.com/elastic/eui/pull/3797))

## [`v27.2.0`](https://github.com/elastic/eui/releases/tag/v27.2.0)

- Added `analyzeEvent` glyph in `EuiIcon` ([#3729](https://github.com/elastic/eui/pull/3729))
- Updated `EuiComboBox` to allow the options list to open for single selection custom options ([#3706](https://github.com/elastic/eui/pull/3706))
- Added `useEuiI18n` hook for localization ([#3749](https://github.com/elastic/eui/pull/3749))
- Added a hit enter badge to `EuiComboBox` when focusing an option and for empty states that allow pressing enter ([#3782](https://github.com/elastic/eui/pull/3782))

**Bug fixes**

- Fixed `EuiComboBox` always showing a scrollbar ([#3744](https://github.com/elastic/eui/pull/3744))
- Replaced `react-focus-lock` with `react-focus-on` ([#3631](https://github.com/elastic/eui/pull/3631))
- Fixed errors in `EuiSuperDatePicker` related to invalid and `null` date formatting ([#3750](https://github.com/elastic/eui/pull/3750))
- Fixed type definitions for `findTestSubject` and `takeMountedSnapshot` ([#3763](https://github.com/elastic/eui/pull/3763))
- Fixed `EuiComboBox` not allowing clicks on previously virtualized items when inside of `EuiFormRow` ([#3784](https://github.com/elastic/eui/pull/3784))
- Removed `[Space]` as a way to select options in `EuiSelectable` ([#3784](https://github.com/elastic/eui/pull/3784))
- Fixed type definition for `windowProps` in `EuiSelectable` ([#3787](https://github.com/elastic/eui/pull/3787))

## [`v27.1.0`](https://github.com/elastic/eui/releases/tag/v27.1.0)

- Added `titleElement` and `descriptionElement` props to `EuiStat` ([#3693](https://github.com/elastic/eui/pull/3693))
- Updated `securityAnalyticsApp` app icon ([#3720](https://github.com/elastic/eui/pull/3720))
- Removed `src/test` and `@types/enzyme` references from `eui.d.ts` ([#3715](https://github.com/elastic/eui/pull/3715))
- Added `index.d.ts` file to `lib/test`  and `es/test` ([#3715](https://github.com/elastic/eui/pull/3715))
- Added `descriptionFlexItemProps` and `fieldFlexItemProps` props to `EuiDescribedFormGroup` ([#3717](https://github.com/elastic/eui/pull/3717))
- Expanded `EuiBasicTable`'s default action's name configuration to accept a function that returns a React node ([#3739](https://github.com/elastic/eui/pull/3739))
- Added internal use only button building blocks for reusability in other button components ([#3730](https://github.com/elastic/eui/pull/3730))

## [`v27.0.0`](https://github.com/elastic/eui/releases/tag/v27.0.0)
- Added `paddingSize` prop to `EuiCard` ([#3638](https://github.com/elastic/eui/pull/3638))
- Added `isClearable` and `placeholder` options to `EuiColorPicker` ([#3689](https://github.com/elastic/eui/pull/3689))
- Added SASS helper files for EUI theme globals ([#3691](https://github.com/elastic/eui/pull/3691))
- Add `label`, `labelProps` and `valueText` props to `EuiProgress` ([#3661](https://github.com/elastic/eui/pull/3661))

**Bug fixes**

- Fixed a bug in `EuiResizableContainer` preventing nested containers ([#3699](https://github.com/elastic/eui/pull/3699))
- Fixed a bug in `EuiResizableContainer` preventing resizing by arrow keys in some cases ([#3699](https://github.com/elastic/eui/pull/3699))
- Fixed `EuiHorizontalSteps` rendering over `EuiHeader` ([#3707](https://github.com/elastic/eui/pull/3707))
- Fixed bug where `EuiSuperSelect` lost focus after a value selection ([#3734](https://github.com/elastic/eui/pull/3734))

**Breaking changes**

- Significant accessibility refactor of `EuiSelectable` ([#3169](https://github.com/elastic/eui/pull/3169))
  - `react-virtualized` replaced with `react-window`
  - `virtualizedProps` on `EuiSelectableOptionsList` renamed to `windowProps`
  - Removed `rootId` and added `makeOptionId`, `listId`, and `setActiveOptionIndex` to `EuiSelectableList`
  - Added `listId` to `EuiSelectableSearch`
  - `options` passed into `EuiSelectable` cannot have an `id`
  - Requires an `onChange` to be passed into `EuiSelectableSearch`

## [`v26.3.4`](https://github.com/elastic/eui/releases/tag/v26.3.4)

**Note: this release is a backport containing changes originally made in `27.2.0`**

**Bug fixes**

- Fixed errors in `EuiSuperDatePicker` related to invalid and `null` date formatting ([#3750](https://github.com/elastic/eui/pull/3750))

## [`v26.3.3`](https://github.com/elastic/eui/releases/tag/v26.3.3)

**Note: this release is a backport containing changes originally made in `27.3.1`**

**Bug fixes**

- Fixed bug in `EuiPagination` showing wrong page count when `compressed` prop is true ([#3827](https://github.com/elastic/eui/pull/3827))

## [`v26.3.2`](https://github.com/elastic/eui/releases/tag/v26.3.2)

**Note: this release is a backport containing changes originally made in `27.1.0`**

- Updated `securityAnalyticsApp` app icon ([#3720](https://github.com/elastic/eui/pull/3720))

## [`v26.3.1`](https://github.com/elastic/eui/releases/tag/v26.3.1)

**Note: this release is a backport containing changes originally made in `27.0.0`**

- Added `isClearable` and `placeholder` options to `EuiColorPicker` ([#3689](https://github.com/elastic/eui/pull/3689))

## [`v26.3.0`](https://github.com/elastic/eui/releases/tag/v26.3.0)

- Expanded `EuiBasicTable`'s default action's name configuration to accept any React node ([#3688](https://github.com/elastic/eui/pull/3688))

## [`v26.2.0`](https://github.com/elastic/eui/releases/tag/v26.2.0)

- Added `background.color` to `EUI_CHARTS_THEME_LIGHT/DARK.theme` ([#3669](https://github.com/elastic/eui/pull/3669))
- Added `gutterSize` prop to `EuiFacetGroup` ([#3639](https://github.com/elastic/eui/pull/3639))
- Updated props of `EuiCode` and `EuiCodeBlock` to reflect only functional props ([#3647](https://github.com/elastic/eui/pull/3647))
- Updated `EuiResizableContainer` `onPanelWidthChange` callback method to include all panel widths ([#3630](https://github.com/elastic/eui/pull/3630))
- Extended `Query` / `EuiSearchBar` to allow any character inside double-quoted phrases ([#3432](https://github.com/elastic/eui/pull/3432))
- Added `headerZindexLocation` prop to `EuiOverlayMask` ([#3655](https://github.com/elastic/eui/pull/3655))
- Added `maskProps` prop to `EuiFlyout` and `EuiCollapsibleNav` ([#3655](https://github.com/elastic/eui/pull/3655))

**Bug fixes**

- Fixed `EuiContextMenu` panel `onAnimationEnd` transition bug in Chrome ([#3656](https://github.com/elastic/eui/pull/3656))
- Fixed `EuiSkipLink` interactive props and Safari click issue ([#3665](https://github.com/elastic/eui/pull/3665))
- Fixed `z-index` issues with `EuiHeader`, `EuiFlyout`, and other portal content ([#3655](https://github.com/elastic/eui/pull/3655))
- Fixed `color` prop error in `EuiBadge` to be more flexible with what format it accepts ([#3655](https://github.com/elastic/eui/pull/3655))
- Fixed `EuiSuperSelect` popover from moving 16px horizontally when it's close to a window edge ([#3685](https://github.com/elastic/eui/pull/3685))

**Theme: Amsterdam**

- Fixed `EuiHeaderBreadcrumb` height, `onClick`, border-radius, and single item display ([#3655](https://github.com/elastic/eui/pull/3655))

## [`v26.1.0`](https://github.com/elastic/eui/releases/tag/v26.1.0)

- Optimized in-memory datagrid mount performance ([#3628](https://github.com/elastic/eui/pull/3628))
- Exported `EuiCardProps` and `EuiCheckableCardProps` types ([#3640](https://github.com/elastic/eui/pull/3640))

## [`v26.0.1`](https://github.com/elastic/eui/releases/tag/v26.0.1)

**Bug fixes**

- Fixed fullscreen render issue in `EuiCode` ([#3633](https://github.com/elastic/eui/pull/3633))

## [`v26.0.0`](https://github.com/elastic/eui/releases/tag/v26.0.0)

- Added `useEuiTextDiff` react hook utility ([#3288](https://github.com/elastic/eui/pull/3288))
- Converted `EuiOverlayMask` to be a React functional component ([#3555](https://github.com/elastic/eui/pull/3555))
- Changed `responsive` and `max` behavior of `EuiBreadcrumbs` to always display collapsed items in popover [#3578](https://github.com/elastic/eui/pull/3578))
- Added `BREAKPOINTS` and `getBreakpoint` utilities [#3578](https://github.com/elastic/eui/pull/3578))
- Added `'any'` option to the `step` prop of the `EuiFieldNumber` ([#3562](https://github.com/elastic/eui/pull/3562))
- Moved all `EuiHeader` SASS variables to `global_styles` ([#3592](https://github.com/elastic/eui/pull/3592))
- Added `side` prop to `EuiGlobalToastList` for choosing which window side to display toasts ([#3600](https://github.com/elastic/eui/pull/3600))
- Default `titleSize` get's implicitly set to 'm' for `EuiEmptyPrompt` ([#3598](https://github.com/elastic/eui/pull/3598))
- Updated `logoElastic` to meet brand guidelines ([#3613](https://github.com/elastic/eui/pull/3613))
- Allowed user to enter hexcode for colors in `EuiStat` ([#3617](https://github.com/elastic/eui/pull/3617))
- Extended `CommonProps` in `EuiColorPalettePickerPaletteTextProps`, `EuiColorPalettePickerPaletteFixedProps` and `EuiColorPalettePickerPaletteGradientProps` types ([#3616](https://github.com/elastic/eui/pull/3616))
- Updated `onToggle` callback in `EuiAccordion` to  allow for external state control ([#3614](https://github.com/elastic/eui/pull/3614))

**Bug fixes**

- Added `display` prop to `EuiDataGridColumnSortingDraggable` to pass` displayAsText` prop correctly to the column sorting popover ([#3574](https://github.com/elastic/eui/pull/3574))
- Fixed `EuiCodeBlockImpl` testenv mock pass-through of `data-test-subj` attribute ([#3560](https://github.com/elastic/eui/pull/3560))
- Fixed DOM element creation issues in `EuiOverlayMask` by using lifecycle methods ([#3555](https://github.com/elastic/eui/pull/3555))
- Fixed `EuiComboBox`'s options list `zIndex` positioning when nested in other `zIndex` contexts ([#3551](https://github.com/elastic/eui/pull/3551))
- Fixed `euiHeaderAffordForFixed` mixin's use of header SASS variable ([#3592](https://github.com/elastic/eui/pull/3592))
- Included `onClick` as a valid prop for `EuiControlBar` **icon** controls ([#3581](https://github.com/elastic/eui/pull/3581))
- Fixed poor performance of `EuiToolTip` during frequent mouesover/mouseout events ([#3596](https://github.com/elastic/eui/pull/3596))
- Fixed `EuiBasicTable` custom actions popover from remaining open after click ([#3619](https://github.com/elastic/eui/pull/3619))

**Breaking changes**

- Changed `breadcrumb` TS type exported name from `Breadcrumb` to `EuiBreadcrumb` ([#3578](https://github.com/elastic/eui/pull/3578))
- Removed `$euiZComboBox` SCSS variable (value was 8001) ([#3551](https://github.com/elastic/eui/pull/3551))

**Theme: Amsterdam**

- Updated `EuiCallout` by removing left border, adding border radius and increasing font weight on titles ([#3557](https://github.com/elastic/eui/pull/3557/))
- Updated `EuiHeaderBreadcrumbs` style to be more prominent ([#3578](https://github.com/elastic/eui/pull/3578/))
- Fixed `EuiFilterGroup` `border-radius` ([#3591](https://github.com/elastic/eui/pull/3591/))
- Updated `EuiCodeBlock` inline code style to use border radius ([#3599](https://github.com/elastic/eui/pull/3599))

## [`v25.0.0`](https://github.com/elastic/eui/releases/tag/v25.0.0)

- Added conditional rendering of the title element in `EuiCallOut` to avoid usage of additional space caused by the rendered `<div>` element ([#3549](https://github.com/elastic/eui/pull/3549))
- Added `invalidCallout` prop to `EuiForm` to allow conditional rendering of error callout([#3585](https://github.com/elastic/eui/pull/3585))

**Bug fixes**

- Fixed `EuiCard` image corners to be contained within border radius ([#3556](https://github.com/elastic/eui/pull/3556))
- Fixed `EuiKeyPadMenu` and `EuiKeyPadMenuItem` aria roles ([#3502](https://github.com/elastic/eui/pull/3502))
- Fixed `EuiFieldSearch` input clear button doesn't show when external input is passed([#3497](https://github.com/elastic/eui/pull/3497))
- Fixed `EuiBasicTable` footers to always use a unique `key` ([#3559](https://github.com/elastic/eui/pull/3559))
- Fixed `EuiInMemoryTable` by changing the `getDerivedStateFromProps` to not block the updates as soon as it hits a true if condition ([#3579](https://github.com/elastic/eui/pull/3579))

**Breaking changes**

- A fixed `EuiHeader` no longer automatically padding directly to the `<body>` element ([#3538](https://github.com/elastic/eui/pull/3538))
- Improved `EuiPagination`, `EuiDataGrid`, `EuiBasicTable` and `EuiInMemoryTable` accessibility, causing `EuiPaginationButton` to require a new prop `pageIndex` ([#3294](https://github.com/elastic/eui/pull/3294))
- Replaced all usages of [`KeyboardEvent.keyCode`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/keyCode) (deprecated) with [`KeyboardEvent.key`](https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key). From `@elastic/eui/lib/services`, `keyCodes` has been replaced with `keys`, as has `cascadingMenuKeyCodes`->`cascadingMenuKeys`, and `comboBoxKeyCodes`->`comboBoxKeys`.  The implementation of all of those exports (as well as `accessibleClickKeys`) all now use `KeyboardEvent.key` values ([#3517](https://github.com/elastic/eui/pull/3517))

## [`v24.1.0`](https://github.com/elastic/eui/releases/tag/v24.1.0)

- Added `displayAsText` prop to `EuiDataGridColumn` ([#3520](https://github.com/elastic/eui/pull/3520))
- Added `minSizeForControls` prop to `EuiDataGrid` to control the minimum width for showing grid controls ([#3527](https://github.com/elastic/eui/pull/3527))
- Passed `getSelectedOptionForSearchValue` to `EuiComboBoxOptionsList` as prop ([#3501](https://github.com/elastic/eui/pull/3501))
- Added `appendIconComponentCache` function to allow manual pre-emptive loading of source elements into the `EuiIcon` cache ([#3481](https://github.com/elastic/eui/pull/3481))
- Added `initialSelected` to `EuiTableSelectionType` properties to set initial selected checkboxes for `EuiBasicTable` ([#3418](https://github.com/elastic/eui/pull/3418))
- Added exports for `EuiSteps` and related components types ([#3471](https://github.com/elastic/eui/pull/3471))
- Added `displayName` to components using `React.forwardRef` ([#3451](https://github.com/elastic/eui/pull/3451))
- Added event target checker for `EuiOverlayMask`'s `onClick` prop ([#3462](https://github.com/elastic/eui/pull/3462))
- Added `EuiColorPalettePicker` component ([#3192](https://github.com/elastic/eui/pull/3192))
- Added `left-start` popover placement to `EuiDatePicker` ([#3511](https://github.com/elastic/eui/pull/3511))
- Added `theme` prop to `EuiHeader` ([#3524](https://github.com/elastic/eui/pull/3524))
- Added `.euiHeaderLink-isActive` class to `EuiHeaderLink` when `isActive` ([#3524](https://github.com/elastic/eui/pull/3524))
- Added `display`, `descriptionWidth`, `textWrap` and `isInvalid` props to `EuiExpression` ([#3467](https://github.com/elastic/eui/pull/3467))
- Added more exports for `EuiColorPalettePicker` types ([#3542](https://github.com/elastic/eui/pull/3542))

**Bug Fixes**

- Fixed issue where multiple `EuiToolTip` components could be visible when element was focused ([#3335](https://github.com/elastic/eui/pull/3335))
- Fixed `EuiSuperSelect` not rendering full width when `isOpen` is `true` ([#3495](https://github.com/elastic/eui/pull/3495))
- Fixed `EuiBasicTable` shows no items if all items of last page is deleted  ([#3422](https://github.com/elastic/eui/pull/3422))
- Fixed TypeScript module name in generated `eui_charts_theme.d.ts` file  ([#3492](https://github.com/elastic/eui/pull/3492))
- Fixed code highlight color contrast in `EuiCodeBlock` ([#3309](https://github.com/elastic/eui/pull/3309))
- Fixed regression in `EuiComboBox` not triggering its `inputRef` callback ([#3532](https://github.com/elastic/eui/pull/3532))

**Deprecations**

- Added a deprecation notice for `EuiNavDrawer` family of components. Advise usage of `EuiCollapsibleNav` instead ([#3487](https://github.com/elastic/eui/pull/3487))

**Notes**

- Removed `src-framer` files from the repository ([#3487](https://github.com/elastic/eui/pull/3487))

**Theme: Amsterdam**

- Removed borders `EuiModal` ([#3515](https://github.com/elastic/eui/pull/3515))
- Improve `EuiOverlayMask` colors ([#3515](https://github.com/elastic/eui/pull/3515))
- Updated shadow styles to improve smoothness, use black as the base color, and deprecated `opacity` value of shadow mixins ([#3428](https://github.com/elastic/eui/pull/3428))
- Removed borders from `EuiFlyout` and `EuiPopover` ([#3477](https://github.com/elastic/eui/pull/3477))
- Updated `EuiHeader` and components ([#3524](https://github.com/elastic/eui/pull/3524))

## [`v24.0.0`](https://github.com/elastic/eui/releases/tag/v24.0.0)

- Added `null` as acceptable `icon` prop for `EuiCard` ([#3470](https://github.com/elastic/eui/pull/3470))
- Added `sortBy` and `sortShift` props to `euiPaletteColorBlind()` for sorting along the color wheel ([#3387](https://github.com/elastic/eui/pull/3387))
- Added `utcOffset` prop to `EuiSuperDatePicker` ([#3436](https://github.com/elastic/eui/pull/3436))
- Added `partition` key to `EuiChartThemeType` for Partition chart support ([#3387](https://github.com/elastic/eui/pull/3387))
- Updated `EuiImage`'s `caption` prop type from `string` to `ReactNode` ([#3387](https://github.com/elastic/eui/pull/3387))
- Improved contrast for `EuiCollapsibleNav` close button ([#3465](https://github.com/elastic/eui/pull/3465))

**Bug Fixes**

- Fixed `EuiSuperDatePicker` quick selection menu overriding specified time range with default values ([#3446](https://github.com/elastic/eui/pull/3446))
- Fixed `EuiCodeEditor` console error when using the editor without import the default theme ([#3454](https://github.com/elastic/eui/pull/3454))
- Fixed `EuiDatePopoverContent` `onChange` event to only accept `string` date input  ([#3460](https://github.com/elastic/eui/pull/3460))

**Breaking changes**

- Changed parameters for `euiPaletteColorBlind()` to an object ([#3387](https://github.com/elastic/eui/pull/3387))
- Changed the default palette of `EUI_CHARTS_THEME_LIGHT/DARK` themes to the naturally sorted `euiPaletteColorBlind()` ([#3387](https://github.com/elastic/eui/pull/3387))

## [`v23.3.1`](https://github.com/elastic/eui/releases/tag/v23.3.1)

**Note: this release is a backport containing changes originally made in `24.0.0`**

**Bug Fixes**

- Fixed `EuiSuperDatePicker` quick selection menu overriding specified time range with default values ([#3446](https://github.com/elastic/eui/pull/3446))
- Fixed `EuiDatePopoverContent` `onChange` event to only accept `string` date input  ([#3460](https://github.com/elastic/eui/pull/3460))

## [`v23.3.0`](https://github.com/elastic/eui/releases/tag/v23.3.0)

- Added `aria-hidden = true` to `EuiRangeSlider` and `EuiRangeTrack` if `showInput = true` ([#3423](https://github.com/elastic/eui/pull/3423))
- Added `testenv` mock for `EuiCode` and `EuiCodeBlock` ([#3405](https://github.com/elastic/eui/pull/3405))
- Added `displayName` to components using `React.forwardRef` ([#3440](https://github.com/elastic/eui/pull/3440))

**Bug Fixes**

- Fixed `EuiCode` and `EuiCodeBlock` from erroring in environments without a DOM implementation ([#3405](https://github.com/elastic/eui/pull/3405))
- Fixed `ApplyClassComponentDefaults` typescript utility to correctly determine defaulted properties' types ([#3430](https://github.com/elastic/eui/pull/3430))
- Fixed `prettyDuration` return type to be `string`, use fallback value  ([#3438](https://github.com/elastic/eui/pull/3438))

## [`v23.2.0`](https://github.com/elastic/eui/releases/tag/v23.2.0)

- Added `iconType` prop to `EuiDatePicker` ([#3383](https://github.com/elastic/eui/pull/3383))
- Applied `max-width: 100%` to `EuiPageBody` so inner flex-based items don't overflow their containers  ([#3375](https://github.com/elastic/eui/pull/3375))
- Added `titleSize` prop to `EuiStep` and `EuiSteps` ([#3340](https://github.com/elastic/eui/pull/3340))
- Handled `ref` passed to `EuiHeaderSectionItemButton` ([#3378](https://github.com/elastic/eui/pull/3378))
- Added `iconProps` prop to `EuiCollapsibleNavGroup` to extend the props passed to the rendered `EuiIcon` ([#3365](https://github.com/elastic/eui/pull/3365))
- Added `closeButtonProps` to `EuiCollapsibleNav` ([#3398](https://github.com/elastic/eui/pull/3398))
- Added `buffer` prop to `EuiPopover` for altering minimum distance to container edges ([#3398](https://github.com/elastic/eui/pull/3398))
- Allowed `search` prop changes to update `EuiInMemoryTable` internal query state ([#3371](https://github.com/elastic/eui/pull/3371))
- Added `EuiResizableContainer` component ([#2701](https://github.com/elastic/eui/pull/2701))
- Added caching layer on `EuiIcon` to prevent delays and flickering when rendering an already fetched icon ([#3404](https://github.com/elastic/eui/pull/3404))

**Bug Fixes**

- Fixed `EuiFieldSearch` to trigger `onSearch` single time instead of two times ([#3425](https://github.com/elastic/eui/pull/3425))
- Fixed `EuiBasicTable` item selection when `id` is `0` ([#3417](https://github.com/elastic/eui/pull/3417))
- Fixed `EuiNavDrawer` not closing on outside click after being unlocked ([#3415](https://github.com/elastic/eui/pull/3415))
- Fixed `EuiBadge` `iconOnClick` props makes badge text clickable ([#3392](https://github.com/elastic/eui/pull/3392))
- Added `id` requirement if `label` is used in `EuiRadio` ([#3382](https://github.com/elastic/eui/pull/3382))
- Fixed z-index issue in `EuiDatePicker` where it's popover would sit beneath other DOM siblings that had z-index applied ([#3376](https://github.com/elastic/eui/pull/3376))
- Added `download` glyph to `EuiIcon` ([#3364](https://github.com/elastic/eui/pull/3364))
- Applies `max-width: 100%` to `EuiPageBody` so inner flex-based items don't overflow their containers  ([#3375](https://github.com/elastic/eui/pull/3375))
- Added `ReactElement` to `EuiCard` `image` prop type to allow custom component ([#3370](https://github.com/elastic/eui/pull/3370))
- Fixed `EuiCollapsibleNavGroup` `titleSize` prop type to properly exclude `l` and `m` sizes ([#3365](https://github.com/elastic/eui/pull/3365))
- Fixed `EuiDatePickerRange` start date popover to sit left under the icon ([#3383](https://github.com/elastic/eui/pull/3383))
- Fixed `euiFormControlIsLoading` SASS mixin to prevent the loading icon from overlapping with the text when the form control is `compressed` and adjusted the amount of padding ([#3401](https://github.com/elastic/eui/pull/3401)
- Fixed `EuiHeader` `z-index` issues with popovers and added body classes for the presence of `EuiFlyout` and `EuiCollapsibleNav.isOpen` ([#3398](https://github.com/elastic/eui/pull/3398))
- Fixed `EuiInMemoryTable` data reset when filter is set and item is selected ([#3419](https://github.com/elastic/eui/pull/3419))
- Fixed `popoverPlacement` default value for `EuiDatePicker` ([#3427](https://github.com/elastic/eui/pull/3427))

## [`v23.1.0`](https://github.com/elastic/eui/releases/tag/v23.1.0)

- Removed additional padding applied to `$euiHeaderHeightCompensation` when `EuiHeader` is fixed ([#3369](https://github.com/elastic/eui/pull/3369))

**Bug Fixes**

- Fixed `EuiDescribedFormGroup` issue that prevented it from shrinking down properly in smaller viewports ([#3369](https://github.com/elastic/eui/pull/3369))

## [`v23.0.0`](https://github.com/elastic/eui/releases/tag/v23.0.0)

- Added `showCloseButton` and `dockedBreakpoint` flexibility to `EuiCollapsibleNav` ([#3330](https://github.com/elastic/eui/pull/3330))
- Added `panelStyle` prop to `EuiPopover` to distinguish style object configuration ([#3329](https://github.com/elastic/eui/pull/3329))
- Added `popoverPlacement` prop in `EuiDatePicker` ([#3359](https://github.com/elastic/eui/pull/3359))
- Extended `EuiDatePicker`'s `startDate` and `endDate` types to accept `null` values for better interoperability ([#3343](https://github.com/elastic/eui/pull/3343))
- Added `EuiCommentList` component ([#3344](https://github.com/elastic/eui/pull/3344))
- Added secondary color value input element to `EuiColorPicker` ([#3336](https://github.com/elastic/eui/pull/3336))

**Bug Fixes**

- Fixed `EuiInMemoryTable` `isClearable` property to initiate reset ([#3328](https://github.com/elastic/eui/pull/3328))
- Removed `schema` attribute form `<input/>` in `EuiInMemoryTable` ([#3337](https://github.com/elastic/eui/pull/3337))
- Fixed `EuiCollapsibleNav` docked states on mobile ([#3330](https://github.com/elastic/eui/pull/3330))
- Fixed `EuiPopover` positioning from being overridden by `style` prop ([#3329](https://github.com/elastic/eui/pull/3329))
- Fixed `EuiCodeBlock` not copying updated content ([#3351](https://github.com/elastic/eui/pull/3351))
- Fixed alignment of popover of end date of `EuiDatePickerRange` ([#3359](https://github.com/elastic/eui/pull/3359))

**Breaking changes**

- Upgraded `TypeScript` to 3.7.2 ([#3295](https://github.com/elastic/eui/pull/3295))
- Changed `EuiCollapsibleNav` prop name from `hideButtonIfDocked` to `showButtonIfDocked` and flipped default ([#3330](https://github.com/elastic/eui/pull/3330))

## [`v22.6.0`](https://github.com/elastic/eui/releases/tag/v22.6.0)

- Converted `NavDrawer`, `NavDrawerGroup`, and `NavDrawerFlyout` to TypeScript ([#3268](https://github.com/elastic/eui/pull/3268))
- Converted `EuiDatePicker`, `EuiDatePickerRange`, `EuiSuperDatePicker`, and `EuiSuperUpdateButton` to TypeScript ([#2891](https://github.com/elastic/eui/pull/2891))
- Improved condensed `EuiTabs` focus states ([#3299](https://github.com/elastic/eui/pull/3299))
- Added `EuiTour`, `EuiTourStep`, and `useEuiTour` components ([#2766](https://github.com/elastic/eui/pull/2766))
- Added `EuiBeacon` component ([#2766](https://github.com/elastic/eui/pull/2766))
- Added `offset` and `arrowChildren` props to `EuiPopover` for anchor element customization ([#2766](https://github.com/elastic/eui/pull/2766))

**Bug Fixes**

- Fixed `EuiProgress` `max` property to allow `undefined` ([#3198](https://github.com/elastic/eui/pull/3198))


## [`v22.5.0`](https://github.com/elastic/eui/releases/tag/v22.5.0)

- Added `forceState` prop to control `EuiAccordion` state from outside ([#3240](https://github.com/elastic/eui/pull/3240))

**Bug Fixes**

- Fixed EuiI8n hasPropName utility errors on null values ([#3303](https://github.com/elastic/eui/pull/3303))
- Fixed the inline styles being overwritten by consumer-passed inline styles in EuiBadge ([#3284](https://github.com/elastic/eui/pull/3284))

## [`v22.4.0`](https://github.com/elastic/eui/releases/tag/v22.4.0)

- Added support for `href`, `onClick`, and related props in `EuiBasicTable` default actions ([#3115](https://github.com/elastic/eui/pull/3115))
- Added support for `EuiCodeEditor` to set `readonly` and `id` on `<textarea />` ([#3212](https://github.com/elastic/eui/pull/3212))
- Added `EuiComment` component ([#3179](https://github.com/elastic/eui/pull/3179))

**Deprecation**

- Updated makeId to DEPRECATED, shifted all the calls to htmlIdGenerator ([#3129](https://github.com/elastic/eui/pull/3129))

**Bug Fixes**

- Fixed `EuiTabbedContent` focus discrepancy between selected and initialFocus tabs ([#3285](https://github.com/elastic/eui/pull/3285))
- Fixed the `initialSelectedTab` prop of `EuiTabbedContent` to not steal focus from content. Which fixed the bug in `EuiSuperDatePicker` that required two clicks to focus input in relative tab  ([#3154](https://github.com/elastic/eui/pull/3154))
- Fixed the `img` element in `EuiIcon` using custom SVGs to have an `alt` attribute with an empty string, rather than no `alt` attribute at all ([#3245](https://github.com/elastic/eui/pull/3245))
- Added overflows to EuiDataGrid toolbar dropdowns when there are many columns ([#3238](https://github.com/elastic/eui/pull/3238))
- Fixed `EuiIcon`'s icon `type` definition to allow custom React components ([#3252](https://github.com/elastic/eui/pull/3252))
- Fixed `initialSelectedTab` properties used in `EuiDatePopoverContent` ([#3254](https://github.com/elastic/eui/pull/3254))
- Fixed `EuiSideNavItem` overriding custom `className` of item and icon ([#3283](https://github.com/elastic/eui/pull/3283))
- Fixed `EuiFieldSearch` clear button inconsistencies ([#3270](https://github.com/elastic/eui/pull/3270))
- Fixed components with `href` usage of `rel` ([#3258](https://github.com/elastic/eui/pull/3258))

## [`v22.3.1`](https://github.com/elastic/eui/releases/tag/v22.3.1)

**Note: this release is a backport containing changes originally made in `23.0.0`, `23.1.0`, and `23.2.0`**

- Removed additional padding applied to `$euiHeaderHeightCompensation` when `EuiHeader` is fixed ([#3369](https://github.com/elastic/eui/pull/3369))
- Handled `ref` passed to `EuiHeaderSectionItemButton` ([#3378](https://github.com/elastic/eui/pull/3378))
- Added `showCloseButton` and `dockedBreakpoint` flexibility to `EuiCollapsibleNav` ([#3330](https://github.com/elastic/eui/pull/3330))
- Added `closeButtonProps` to `EuiCollapsibleNav` ([#3398](https://github.com/elastic/eui/pull/3398))
- Added `buffer` prop to `EuiPopover` for altering minimum distance to container edges ([#3398](https://github.com/elastic/eui/pull/3398))

**Bug Fixes**

- Fixed `EuiDescribedFormGroup` issue that prevented it from shrinking down properly in smaller viewports ([#3369](https://github.com/elastic/eui/pull/3369))
- Fixed `EuiCollapsibleNav` docked states on mobile ([#3330](https://github.com/elastic/eui/pull/3330))
- Fixed `EuiHeader` `z-index` issues with popovers and added body classes for the presence of `EuiFlyout` and `EuiCollapsibleNav.isOpen` ([#3398](https://github.com/elastic/eui/pull/3398))

**Breaking changes**

- Changed `EuiCollapsibleNav` prop name from `hideButtonIfDocked` to `showButtonIfDocked` and flipped default ([#3330](https://github.com/elastic/eui/pull/3330))

## [`v22.3.0`](https://github.com/elastic/eui/releases/tag/v22.3.0)

- Removed dependency on option list for custom option of `EuiComboBox` ([#3183](https://github.com/elastic/eui/pull/3183))
- Fixed `EuiPopover` arrow position in Android and Linux ([#3188](https://github.com/elastic/eui/pull/3188))
- Improved `htmlIdGenerator` when supplying both `prefix` and `suffix` ([#3076](https://github.com/elastic/eui/pull/3076))
- Updated pagination prop descriptions for `EuiInMemoryTable` ([#3142](https://github.com/elastic/eui/pull/3142))
- Added `title` and `aria` attributes to `EuiToken`'s icon element ([#3195](https://github.com/elastic/eui/pull/3195))
- Added new Elasticsearch token types ([#2758](https://github.com/elastic/eui/pull/2758))

**Bug Fixes**

- Fixed bug in `EuiAccordion` to adjust to the correct height when content height changes ([#3160](https://github.com/elastic/eui/pull/3160))
- Fixed bug in `EuiBasicTable` to handle dynamic icon value properly in collapsed actions ([#3145](https://github.com/elastic/eui/pull/3145))
- Fixed `availability` check for actions in `EuiBasicTable` ([3030](https://github.com/elastic/kibana/issues/3030))

## [`v22.2.0`](https://github.com/elastic/eui/releases/tag/v22.2.0)

- Improved `EuiModal` close button position to prevent from overlapping with the title ([#3176](https://github.com/elastic/eui/pull/3176))

**Bug Fixes**

- Removed outline of `EuiSelect` in Firefox ([#3197] (https://github.com/elastic/eui/pull/3197))
- Fixed EuiBasicTable proptypes of itemId ([#3133](https://github.com/elastic/eui/pull/3133))
- Updated `EuiSuperDatePicker` to inherit the selected value in quick select ([#3105](https://github.com/elastic/eui/pull/3105))

### Feature: EuiCollapsibleNav ([#3019](https://github.com/elastic/eui/pull/3019))

- Added `EuiCollapsibleNav` and `EuiCollapsibleNavGroup` components
- Added `EuiPinnableListGroup`, an extension of `EuiListGroup`
- Added `ghost` colored `EuiListGroupItem`, increased overall large size, and fixed focus states
- Added `color` and `size` props to `EuiListGroup`
- Added `home` and `menu` glyphs to `EuiIcon`
- Added simple `euiXScroll` and `euiYScroll` SASS mixins and CSS utility equivalents

**Bug Fixes**

- Fixed `EuiAccordion` icon margins, focus state, and flex issue in IE
- Fixed `1.1px` height of  `EuiHorizontalRule`

## [`v22.1.1`](https://github.com/elastic/eui/releases/tag/v22.1.1)

**Bug Fixes**

- Fixed infinite call stack in `EuiResizeObserver`'s fallback polyfill ([#3180](https://github.com/elastic/eui/pull/3180))
- Correct `defaultProps` definition in `EuiComboBox` ([#3180](https://github.com/elastic/eui/pull/3180))

## [`v22.1.0`](https://github.com/elastic/eui/releases/tag/v22.1.0)

- Added `delimiter` prop to `EuiComboBox` ([#3104](https://github.com/elastic/eui/pull/3104))
- Added `useColorPickerState` and `useColorStopsState` utilities ([#3067](https://github.com/elastic/eui/pull/3067))
- Fixed `EuiSearchBar` related types ([#3147](https://github.com/elastic/eui/pull/3147))
- Added `prepend` and `append` ability to `EuiSuperSelect` ([#3167](https://github.com/elastic/eui/pull/3167))

**Bug Fixes**

- Fixed `EuiNavDrawer` scrolling issue on mobile ([#3174](https://github.com/elastic/eui/pull/3174))

## [`v22.0.0`](https://github.com/elastic/eui/releases/tag/v22.0.0)

- Replaced various `lodash` functions with native functions ([#3053](https://github.com/elastic/eui/pull/3053))
- Added `whiteSpace ` prop to `EuiCodeBlock` ([#3103](https://github.com/elastic/eui/pull/3103))
- Added `sortMatchesBy` prop for `EuiComboBox` ([#3089](https://github.com/elastic/eui/pull/3089))
- Added `prepend` and `append` ability to `EuiFieldPassword` ([#3122](https://github.com/elastic/eui/pull/3122))
- Added `Enter` key press functionality to `EuiSuperDatePicker` ([#3048](https://github.com/elastic/eui/pull/3048))
- Added `title` to headers of `EuiTable` in case of truncation ([#3094](https://github.com/elastic/eui/pull/3094))
- Added i18n to `EuiTableHeaderCell` ([#3094](https://github.com/elastic/eui/pull/3094))
- Added `number` and `string` to `size` type of `EuiImage` for setting custom sizes ([#3012](https://github.com/elastic/eui/pull/3012))
- Improved `EuiButtonEmpty` focus state when the `color` type is `text` ([#3135](https://github.com/elastic/eui/pull/3135))
- Added `EuiLoadingElastic` component ([#3017](https://github.com/elastic/eui/pull/3017))
- Upgraded `react-beautiful-dnd` to v13 ([#3064](https://github.com/elastic/eui/pull/3064))
- Fixed `EuiPagination` vertical alignment of the text when used as `compressed` ([#3152](https://github.com/elastic/eui/pull/3152))
- Added `showTooltip` prop for `EuiSuperUpdateButton` to show tooltip and showing only once popovers are closed ([#3127](https://github.com/elastic/eui/pull/3127))

**Bug Fixes**

- Fixed bug in `EuiSuperDatePicker` not showing correct values in relative tab of end date ([#3132](https://github.com/elastic/eui/pull/3132))
- Fixed bug in `EuiSuperDatePicker` to show correct values of commonly used values in relative tab ([#3106](https://github.com/elastic/eui/pull/3106))
- Fixed race condition in `EuiIcon` when switching from dynamically fetched components ([#3118](https://github.com/elastic/eui/pull/3118))
- Fixed the issue that `EuiResizeObserver` fallback did not properly listen to pure window resizing ([#3088](https://github.com/elastic/eui/pull/3088))

**Breaking changes**

- Removed `EuiKeyPadMenuItemButton` in favor of just `EuiKeyPadMenuItem` that can also accept an `onClick` ([#3062](https://github.com/elastic/eui/pull/3062))

## [`v21.1.0`](https://github.com/elastic/eui/releases/tag/v21.1.0)

- Updated `EuiFilterSelect` to retain the order of its filters ([#3063](https://github.com/elastic/eui/pull/3063))
- Added `href` prop to `EuiBadge` ([#3009](https://github.com/elastic/eui/pull/3009))
- Added props descriptions for `EuiComboBox` ([#3007](https://github.com/elastic/eui/pull/3007))
- Exported `dateFormatAliases` as a part of the public API ([#3043](https://github.com/elastic/eui/pull/3043))
- Exported `EuiTextProps` type definition ([#3039](https://github.com/elastic/eui/pull/3039))
- Added a `component` prop to `EuiForm` to render a `<form>`([#3010](https://github.com/elastic/eui/pull/3010))
- Removed `role` attribute from `EuiImage`([#3036](https://github.com/elastic/eui/pull/3036))
- Added `prepend` and `append` ability to `EuiComboBox` single selection only ([#3003](https://github.com/elastic/eui/pull/3003))
- Added `onColumnResize` prop to `EuiDataGrid` of type `EuiDataGridOnColumnResizeHandler` that gets called when column changes it's size ([#2963](https://github.com/elastic/eui/pull/2963))
- Added `logoEnterpriseSearch` to `EuiIcon` ([#3066](https://github.com/elastic/eui/pull/3066))
- Added RGB format support to `EuiColorPicker` and `EuiColorStops` ([#2850](https://github.com/elastic/eui/pull/2850))
- Added alpha channel (opacity) support to `EuiColorPicker` and `EuiColorStops` ([#2850](https://github.com/elastic/eui/pull/2850))
- Added `useResizeObserver` hook ([#2991](https://github.com/elastic/eui/pull/2991))
- Added `showColumnSelector.allowHide` and `showColumnSelector.allowReorder` props to `EuiDataGrid` UI configuration ([#2993](https://github.com/elastic/eui/pull/2993))
- Added `EuiMark` component ([#3060](https://github.com/elastic/eui/pull/3060))
- Changed `tabs.name` prop shape in `EuiTabbedContent` to accept a `node`, which aligns it with `EuiTab` ([#3100](https://github.com/elastic/eui/pull/3100))

**Bug Fixes**

- Fixed `EuiFieldNumber` so values of type `number` are now allowed ([#3020](https://github.com/elastic/eui/pull/3020))
- Fixed SASS `contrastRatio()` function in dark mode by fixing the `pow()` math function ([#3013], (https://github.com/elastic/eui/pull/3013))
- Fixed bug preventing `EuiDataGrid` from re-evaluating the default column width on resize ([#2991](https://github.com/elastic/eui/pull/2991))
- Fixed padding in `EuiCallOut` when used as a `banner` for `EuiFlyout` ([#3098](https://github.com/elastic/eui/pull/3098))

## [`v21.0.1`](https://github.com/elastic/eui/releases/tag/v21.0.1)

**Bug Fixes**

- Made `EuiDataGrid`'s `schema.isSortable` value optional ([#2991](https://github.com/elastic/eui/pull/2991))

## [`v21.0.0`](https://github.com/elastic/eui/releases/tag/v21.0.0)

- Added `EuiDataGrid`'s default sort order property ([#2987](https://github.com/elastic/eui/pull/2987))
- Fixed `EuiDataGrid`'s pagination visibility when changing rows per page ([#2978](https://github.com/elastic/eui/pull/2978))
- Added `highlightAll` prop to `EuiHighlight` to highlight all matches ([#2957](https://github.com/elastic/eui/pull/2957))
- Added `showOnFocus` prop to `EuiScreenReaderOnly` to force display on keyboard focus ([#2976](https://github.com/elastic/eui/pull/2976))
- Added `EuiSkipLink` component ([#2976](https://github.com/elastic/eui/pull/2976))
- Created `EuiBadgeGroup` component ([#2921](https://github.com/elastic/eui/pull/2921))
- Added `sections` and `position` props to `EuiHeader` ([#2928](https://github.com/elastic/eui/pull/2928))
- Added `gutterSize` prop to `EuiListGroup` ([#2980](https://github.com/elastic/eui/pull/2980))
- Added `color` prop to `EuiListGroupItem` and updated size style ([#2980](https://github.com/elastic/eui/pull/2980))
- Added `enableAllColumns` to `EuiBasicTable` component ([#2906](https://github.com/elastic/eui/pull/2906))

**Bug Fixes**

- Fixed `EuiDataGrid`'s sort popover to behave properly on mobile screens ([#2979](https://github.com/elastic/eui/pull/2979))
- Fixed `EuiButton` and other textual components' disabled contrast ([#2874](https://github.com/elastic/eui/pull/2874))
- Fixed z-index conflict with cell popovers in `EuiDataGrid` while in full screen mode ([#2959](https://github.com/elastic/eui/pull/2959))
- Adjusted the header on `EuiDataGrid` to fix to the top within constrained containers and full screen mode  ([#2959](https://github.com/elastic/eui/pull/2959))
- Refactored `EuiDescribedFormGroup` to allow the content inside the `EuiTitle` to be accessible to screen reader users ([#2989](https://github.com/elastic/eui/pull/2989))

**Breaking changes**

- Updated `@types/react` and `@types/react-dom` to utilize React.RefCallback type instead of custom implementation ([#2929](https://github.com/elastic/eui/pull/2929))

**Theme: Amsterdam**

- Buttons have a new visual style ([#2874](https://github.com/elastic/eui/pull/2874))

## [`v20.1.0`](https://github.com/elastic/eui/releases/tag/v20.1.0)

- Added `theme` prop to `EuiCodeEditor` in support of `AceEditor` themes ([#2970](https://github.com/elastic/eui/pull/2970))
- `EuiButton` now has a single return statement ([#2954](https://github.com/elastic/eui/pull/2954))
- Added `isSortable` props to `EuiDataGridColumn` and `EuiDataGridSchemaDetector` to mark them as un-sortable ([#2952](https://github.com/elastic/eui/pull/2952))
- Converted `EuiForm` to TypeScript, added many missing `/form` Prop types ([#2896](https://github.com/elastic/eui/pull/2896))
- Empty table th elements replaced with td in `EuiTable` ([#2934](https://github.com/elastic/eui/pull/2934))
- Added default prompt text to `aria-describedby` for `EuiFilePicker` ([#2919](https://github.com/elastic/eui/pull/2919))
- Added SASS variables for text variants of the primary palette `$euiColorPrimaryText`, `$euiColorSecondaryText`, etc... Updated components to use these new variables ([#2873](https://github.com/elastic/eui/pull/2873))
- Updated SASS mixin `makeHighContrastColor()` to default `$background: $euiPageBackgroundColor` and `$ratio: 4.5`. Created `makeGraphicContrastColor()` for graphic specific contrast levels of 3.0 ([#2873](https://github.com/elastic/eui/pull/2873))
- Added `arrowDisplay` prop to `EuiAccordion` for changing side or hiding completely ([#2914](https://github.com/elastic/eui/pull/2914))
- Added `prepend` and `append` ability to `EuiFieldSearch` ([#2914](https://github.com/elastic/eui/pull/2914))
- Added `notification` and `notificationColor` props to `EuiHeaderSectionItemButton` ([#2914](https://github.com/elastic/eui/pull/2914))
- Added `folderCheck`, `folderExclamation`, `push`, `quote`, `reporter` and `users` icons ([#2935](https://github.com/elastic/eui/pull/2935))
- Updated `folderClosed` and `folderOpen` to match new additions and sit better on the pixel grid ([#2935](https://github.com/elastic/eui/pull/2935))
- Converted `EuiSearchBar` to Typescript ([#2909](https://github.com/elastic/eui/pull/2909))

**Bug fixes**

- Fixed `EuiDataGrid` breaking if invalid schema passed ([#2955](https://github.com/elastic/eui/pull/2955))
- Fixed `EuiTitle` not rendering child classes ([#2925](https://github.com/elastic/eui/pull/2925))
- Extended `div` element in `EuiFlyout` type ([#2914](https://github.com/elastic/eui/pull/2914))
- Fixed popover positioning service to be more lenient when positioning 0-width or 0-height content ([#2948](https://github.com/elastic/eui/pull/2948))

**Theme: Amsterdam**

- Text sizes are now based on a 14px base font size. Headings are now bold ([#2936](https://github.com/elastic/eui/pull/2936))
- Altered `secondary`, `accent` colors to be more saturated ([#2873](https://github.com/elastic/eui/pull/2873))

## [`v20.0.2`](https://github.com/elastic/eui/releases/tag/v20.0.2)

**Bug fixes**

- Fixed type definitions for `EuiComboBox` ([#2971](https://github.com/elastic/eui/pull/2971))

## [`v20.0.1`](https://github.com/elastic/eui/releases/tag/v20.0.1)

**Bug fixes**

- Added TypeScript definition for `EuiCodeEditor`'s accepting `react-ace` props ([#2926](https://github.com/elastic/eui/pull/2926))
- Added `@types/react-input-autosize` to project's `dependencies` ([#2930](https://github.com/elastic/eui/pull/2930))

## [`v20.0.0`](https://github.com/elastic/eui/releases/tag/v20.0.0)

- Converted `EuiComboBox`, `EuiComboBoxInput`, `EuiComboBoxPill`, `EuiComboBoxOptionsList`, `EuiComboBoxOption`, and `EuiComboBoxTitle` to TypeScript ([#2838](https://github.com/elastic/eui/pull/2838))
- Converted `EuiCodeEditor` to TypeScript ([#2836](https://github.com/elastic/eui/pull/2836))
- Converted `EuiCode` and `EuiCodeBlock` and to TypeScript ([#2835](https://github.com/elastic/eui/pull/2835))
- Converted `EuiFilePicker` to TypeScript ([#2832](https://github.com/elastic/eui/issues/2832))
- Exported `EuiSelectOptionProps` type ([#2830](https://github.com/elastic/eui/pull/2830))
- Added `paperClip` glyph to `EuiIcon` ([#2845](https://github.com/elastic/eui/pull/2845))
- Added `banner` prop to `EuiFlyoutBody` and updated `euiOverflowShadow` mixin ([#2837](https://github.com/elastic/eui/pull/2837))
- Updated `editorLink` icon ([#2866](https://github.com/elastic/eui/pull/2866))
- Added control columns to `EuiDataGrid` to support non-data columns like row selection and actions ([#2846](https://github.com/elastic/eui/pull/2846))
- Added `image` glyph to `EuiIcon` ([#2870](https://github.com/elastic/eui/pull/2870))
- Exported TS props from top level `EuiListGroupProps`, `EuiListGroupItemProps`, `EuiSelectableProps`,  `EuiSelectableOption`, `EuiSelectableOptionsListProps` ([#2869](https://github.com/elastic/eui/pull/2869))
- Extending `EuiSelectable[options]` type with correct HTML element ([#2869](https://github.com/elastic/eui/pull/2869))
- Added check mark to single selection `EuiComboBox` ([#2890](https://github.com/elastic/eui/pull/2890))
- Added `logoGoogleG` third-party logo to `EuiIcon` ([#2853](https://github.com/elastic/eui/pull/2853))
- Added Jest `modulesNameMapper` alias for `EuiIcon` using test environment mock ([#2878](https://github.com/elastic/eui/pull/2878))
- Removed `sinon` and `@types/sinon` as dependencies, and converted usages to `jest.fn` ([#2885](https://github.com/elastic/eui/pull/2885))

**Bug fixes**

- Fixed building dev & docs on Windows ([#2847](https://github.com/elastic/eui/pull/2847))
- Fixed screen reader discovery issues with `EuiBottomBar` and `EuiControlBar` ([#2861](https://github.com/elastic/eui/pull/2861))
- Fixed a bug in `EuiDataGrid` causing the first cell to autofocus if interactive ([#2872](https://github.com/elastic/eui/pull/2872))

**Breaking changes**

- Removed `visControls` and `visHeatmap` duplicate icons from docs ([#2908](https://github.com/elastic/eui/pull/2908))

## [`v19.0.0`](https://github.com/elastic/eui/releases/tag/v19.0.0)

- Added `cheer` glyph to `EuiIcon` ([#2814](https://github.com/elastic/eui/pull/2814))
- Added `tableCaption` prop to `EuiBasicTable` and improved the default one ([#2782](https://github.com/elastic/eui/pull/2782))
- Converted `EuiDescribedFormGroup` to TypeScript ([#2810](https://github.com/elastic/eui/pull/2810))
- Changed SASS comments to non-compiled comments in invisibles files ([#2807](https://github.com/elastic/eui/pull/2807))
- Optimized the third party logos Ceph, DropWizard, Golang, and Haproxy ([#2812](https://github.com/elastic/eui/pull/2812))
- Added `rowHeader` prop to `EuiBasicTable` to allow consumers to set the identifying cell in a row ([#2802](https://github.com/elastic/eui/pull/2802))
- Added prepend and append to `EuiColorPicker` ([#2819](https://github.com/elastic/eui/pull/2819))
- Improved `EuiDescribedFormGroup` accessibility by avoiding duplicated output in screen readers ([#2783](https://github.com/elastic/eui/pull/2783))
- Added optional `key` attribute to `EuiContextMenu` items and relaxed `name` attribute to allow any React node ([#2817](https://github.com/elastic/eui/pull/2817))
- Converted `EuiColorPicker` color conversion functions to `chroma-js` methods ([#2805](https://github.com/elastic/eui/pull/2805))
- Added `direction` parameter to `euiPaletteColorBlind()` for specifying lighter or darker (or both) alternates ([#2822](https://github.com/elastic/eui/pull/2822))
- Converted `EuiSideNav` to TypeScript ([#2818](https://github.com/elastic/eui/issues/2818))
- Added babel-transformed and partially mocked commonjs build (`test-env/`) to target Kibana's Jest environment ([#2698](https://github.com/elastic/eui/pull/2698))
- Altered styles of `EuiToken` and add added more token types to match ES field types of `tokenAlias`, `tokenDate`, `tokenGeo`, `tokenIP`, `tokenNested`, `tokenRange`, `tokenShape` ([#2758](https://github.com/elastic/eui/pull/2758))

**Bug fixes**

- Exported missing `EuiSelectProps` type ([#2815](https://github.com/elastic/eui/pull/2815))
- Fixed `EuiCode`'s & `EuiCodeBlock`'s ability to accept non-string children ([#2792](https://github.com/elastic/eui/pull/2792)) ([#2820](https://github.com/elastic/eui/pull/2820))
- Fixed `EuiSearchBar`, `Query`, and `AST`'s ability to accept literal parenthesis characters ([#2791](https://github.com/elastic/eui/pull/2791))
- Fixed coloring of input fields when autofill is on in Chrome ([#2798](https://github.com/elastic/eui/pull/2798))
- Moved `@types/enzyme` and `@types/react-virtualized` to `dependencies` status ([#2828](https://github.com/elastic/eui/pull/2828))
- Removed `@elastic/charts` from inclusion in `eui.d.ts` output ([#2828](https://github.com/elastic/eui/pull/2828))

**Breaking changes**

- Removed `idAria` prop from `EuiDescribedFormGroup` ([#2783](https://github.com/elastic/eui/pull/2783))
- Removed `EuiToken`'s `hideBorder` and `displayOptions` prop for applying `color`, `shape`, and `fill` props directly. Changed `fill` prop type from `boolean` to `light | dark | none` ([#2758](https://github.com/elastic/eui/pull/2758))

## [`v18.3.0`](https://github.com/elastic/eui/releases/tag/v18.3.0)

- Converted `EuiModal` and `EuiConfirmModal` to TypeScript ([#2742](https://github.com/elastic/eui/pull/2742))
- Converted `EuiTabs` to TypeScript ([#2717](https://github.com/elastic/eui/pull/2717))
- Converted `EuiFormRow` to TypeScript ([#2712](https://github.com/elastic/eui/pull/2712))
- Updated `logoAPM`, `logoSecurity` and `logoEnterpriseSearch`. Added `logoWorkplaceSearch` and `logoObservability` ([#2769](https://github.com/elastic/eui/pull/2769))
- Converted `EuiFilterButton` to TypeScript ([#2761](https://github.com/elastic/eui/pull/2761))
- Converted `EuiFilterSelectItem` to TypeScript ([#2761](https://github.com/elastic/eui/pull/2761))
- Converted `EuiFieldSearch` to TypeScript ([#2775](https://github.com/elastic/eui/pull/2775))
- Added `data-test-subj` to the `EuiContextMenuItem` in `EuiTablePagination` ([#2778](https://github.com/elastic/eui/pull/2778))
- Improved `EuiIcon` a11y by using a `title` and `aria-labelledby` ([#2786](https://github.com/elastic/eui/pull/2786))
- Improved compressed `EuiPagination` by including active and last page numbers ([#2779](https://github.com/elastic/eui/pull/2779))
- Converted `EuiSuperSelect` to TypeScript ([#2776](https://github.com/elastic/eui/pull/2776))

**Bug fixes**

- Increased column width on `EuiTableHeaderCellCheckbox` to prevent `EuiCheckbox`'s focus ring from getting clipped in `EuiBasicTable` ([#2770](https://github.com/elastic/eui/pull/2770))
- Fixed the display of `EuiButton` within `EuiControlBar` when `fill={true}` to be more consistent with other buttons ([#2781](https://github.com/elastic/eui/pull/2781))
- Fixed `EuiFormControlLayout` from overwriting className for `prepend` nodes.  ([#2796](https://github.com/elastic/eui/pull/2796))
- Fixed `useRenderToText` and `EuiButtonToggle` from attempting state updates on unmounted components ([#2797](https://github.com/elastic/eui/pull/2797))
- Refactored function and hook instantiation to fix drag action sluggishness in `EuiColorStops` ([#2557](https://github.com/elastic/eui/pull/2557))

**Deprecations**

- `EuiIcon`'s `logoEnterpriseSearch` type deprecated in favor of `logoWorkplaceSearch`
- `EuiIcon`'s `logoAPM` type deprecated in favor of `logoObservability`

## [`v18.2.2`](https://github.com/elastic/eui/releases/tag/v18.2.2)

**Note: this release is a backport containing changes originally made in `18.3.0`**

- Updated `logoAPM`, `logoSecurity` and `logoEnterpriseSearch`. Added `logoWorkplaceSearch` and `logoObservability` ([#2769](https://github.com/elastic/eui/pull/2769))

**Bug fixes**

- Fixed `useRenderToText` and `EuiButtonToggle` from attempting state updates on unmounted components ([#2797](https://github.com/elastic/eui/pull/2797))

**Deprecations**

- `EuiIcon`'s `logoEnterpriseSearch` type deprecated in favor of `logoWorkplaceSearch`
- `EuiIcon`'s `logoAPM` type deprecated in favor of `logoObservability`

## [`v18.2.1`](https://github.com/elastic/eui/releases/tag/v18.2.1)

**Bug fixes**

- Fixed `EuiFieldSearch`'s trigger of `onChange` when clearing the field value ([#2764](https://github.com/elastic/eui/pull/2764))

## [`v18.2.0`](https://github.com/elastic/eui/releases/tag/v18.2.0)

- Added `recentlyViewedApp` app icon to `EuiIcon` ([#2755](https://github.com/elastic/eui/pull/2755))

**Bug fixes**

- Fixed `EuiBasicTable` & `EuiInMemoryTable` to not un- and re-mount rows when toggling `loading` prop ([#2754](https://github.com/elastic/eui/pull/2754))

## [`v18.1.0`](https://github.com/elastic/eui/releases/tag/v18.1.0)

- Lightened `EuiBadge` hollow border color in dark mode ([#2746](https://github.com/elastic/eui/pull/2746))
- Added `minInputProps` and `maxInputProps` to supply more props to the inputs of `EuiDualRange` ([#2738](https://github.com/elastic/eui/pull/2738))
- Changed `EuiBadge` to use EUI palette colors ([#2455](https://github.com/elastic/eui/pull/2455))
- Darkened a few `euiPaletteColorBlind` colors ([#2455](https://github.com/elastic/eui/pull/2455))
- Fixed bug in `EuiCard` where button text was not properly aligned ([#2741](https://github.com/elastic/eui/pull/2741))
- Converted `EuiRange` to TypeScript ([#2732](https://github.com/elastic/eui/pull/2732))
- Converted `EuiDualRange` to TypeScript ([#2732](https://github.com/elastic/eui/pull/2732))
- Converted `EuiRangeInput` to TypeScript ([#2732](https://github.com/elastic/eui/pull/2732))
- Added `bellSlash` glyph to `EuiIcon` ([#2714](https://github.com/elastic/eui/pull/2714))
- Added `legend` prop to `EuiCheckboxGroup` and `EuiRadioGroup` to add `EuiFieldset` wrappers for title the groups ([#2739](https://github.com/elastic/eui/pull/2739))
- Changed `EuiNavDrawerFlyout` to close after child nav items are clicked ([#2749](https://github.com/elastic/eui/pull/2749))
- Changed `EuiNavDrawerFlyout` to trap focus while navigating via keyboard ([#2749](https://github.com/elastic/eui/pull/2749))
- Created a `euiPaletteColorBlindBehindText` variant of the color blind palette ([#2750](https://github.com/elastic/eui/pull/2750))
- Improved focus state of `EuiSwitch`, `EuiCheckbox`, `EuiRadio` and `EuiRange` ([#2745](https://github.com/elastic/eui/pull/2745))

**Bug fixes**

- Changed `EuiRadio` and `EuiCheckbox` labels to be `inline-block` ([#2739](https://github.com/elastic/eui/pull/2739))
- Fixed `EuiCheckboxGroup`'s `options` type to fully extend the `EuiCheckbox` type ([#2739](https://github.com/elastic/eui/pull/2739))

## [`v18.0.0`](https://github.com/elastic/eui/releases/tag/v18.0.0)

- Converted `EuiFieldText` to Typescript ([#2688](https://github.com/elastic/eui/pull/2688))
- Added `nested` glyph to `EuiIcon` ([#2707](https://github.com/elastic/eui/pull/2707))
- Added `tableLayout` prop to `EuiTable`, `EuiBasicTable` and `EuiInMemoryTable` to provide the option of auto layout ([#2697](https://github.com/elastic/eui/pull/2697))
- Converted `EuiSuggest` to Typescript ([#2692](https://github.com/elastic/eui/pull/2692))
- Converted `EuiErrorBoundary` to Typescript  ([#2690](https://github.com/elastic/eui/pull/2690))
- Updated `EuiNavDrawer` to accept React fragments ([#2710](https://github.com/elastic/eui/pull/2710))
- Added `EuiFormFieldset` and `EuiFormLegend` components ([#2706](https://github.com/elastic/eui/pull/2706))
- Adjusted colors of color blind viz palette ([#2686](https://github.com/elastic/eui/pull/2686))
- Converted `EuiSelect` to Typescript ([#2694](https://github.com/elastic/eui/pull/2694))
- Added `aggregate`, `pageSelect`, `pagesSelect`, `securitySignal`, `securitySignalDetected`, `securitySignalResolved` and `timeline` icons ([#2704](https://github.com/elastic/eui/pull/2704))
- Added `useDependentState` custom hook ([#2725](https://github.com/elastic/eui/pull/#2725))
- Added `isClearable` prop to `EuiFieldSearch` ([#2723](https://github.com/elastic/eui/pull/2723))

**Bug fixes**

- Fixed `isExpanded` property of nodes from `EuiTreeView` ([#2700](https://github.com/elastic/eui/pull/#2700))
- Added text selection to `EuiLink` button ([#2722](https://github.com/elastic/eui/pull/#2722))
- Fixed bug in `EuiDataGrid` where resizing columns changed the active DOM element ([#2724](https://github.com/elastic/eui/pull/#2724))
- Fixed position of scrollbar in `EuiCodeBlock` ([#2727](https://github.com/elastic/eui/pull/#2727))
- Fixed bug in `EuiDataGrid` that prevented the "Hide fields" popover from showing an updated column list ([#2725](https://github.com/elastic/eui/pull/#2725))

**Breaking changes**

- Changed accepted properties of the `color_palette` method to accept an array of colors ([#2686](https://github.com/elastic/eui/pull/#2686))
- Removed the `palette` export to export each palette function directly ([#2686](https://github.com/elastic/eui/pull/#2686))
- Changed the palette functions to be methods that accept a number of steps and removed `.colors` key ([#2686](https://github.com/elastic/eui/pull/#2686))
