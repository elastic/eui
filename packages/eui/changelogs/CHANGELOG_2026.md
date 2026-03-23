## [`v114.0.0`](https://github.com/elastic/eui/releases/v114.0.0)

- Fixed the clipping of `EuiFlyout` overlay mask to the container bounds when the `container` prop is provided, so the mask no longer covers the full viewport for app-scoped flyouts. ([#9512](https://github.com/elastic/eui/pull/9512))
- Updated `EuiFlyout` to support `pushAnimation` prop for `type="overlay"` ([#9428](https://github.com/elastic/eui/pull/9428))
- Added `hasAnimation` prop on `EuiFlyout` (replaces `pushAnimation`) ([#9428](https://github.com/elastic/eui/pull/9428))
- Added `hasAnimation` prop on `EuiOverlayMask` to conditionally add animation styles ([#9428](https://github.com/elastic/eui/pull/9428))
- Added `historyKey` prop (type `symbol`) to `EuiFlyout` and the flyout manager API to support scoped flyout history. ([#9413](https://github.com/elastic/eui/pull/9413))
    - Only flyouts sharing the same `Symbol` reference share Back button navigation and history entries; omitting `historyKey` gives each session its own isolated history group.
    - `ACTION_CLOSE_ALL` now closes only the current history group rather than all open flyouts.

**Bug fixes**

- Fixed `EuiTreeView` expanded nodes clipping content and causing sibling overlap when children exceed viewport height ([#9510](https://github.com/elastic/eui/pull/9510))
- Fixed `EuiDataGrid` scroll bouncing back to the focused element in certain cases ([#9453](https://github.com/elastic/eui/pull/9453))
- Fixed support for intraword underscores in `EuiMarkdownFormat` ([#9408](https://github.com/elastic/eui/pull/9408))

**Deprecations**

- Deprecated `pushAnimation` prop on `EuiFlyout`. Use `hasAnimation` instead. ([#9428](https://github.com/elastic/eui/pull/9428))

**Breaking changes**

- Removed `severity.assistance` color token ([#9507](https://github.com/elastic/eui/pull/9507))
- Removed assistance datavis color tokens: ([#9507](https://github.com/elastic/eui/pull/9507))
  - `vis.euiColorVisAssistance`
  - `vis.euiColorVis10`
  - `vis.euiColorVis11`
  - `vis.euiColorVisText10`
  - `vis.euiColorVisText11`
  - `vis.euiColorVisBehindText10`
  - `vis.euiColorVisBehindText11`
- The positional signature of `FlyoutManagerApi.addFlyout` and the flyout store's `addFlyout` now includes `historyKey` before the `iconType`/`minWidth` arguments. Call sites that pass arguments positionally must be updated (or switched to named parameters) to account for this new parameter ordering. ([#9413](https://github.com/elastic/eui/pull/9413))

**Accessibility**

- Fixed `aria-label` not being applied to `EuiColorPicker`'s input element ([#9436](https://github.com/elastic/eui/pull/9436))

## [`v113.3.0`](https://github.com/elastic/eui/releases/v113.3.0)

- Added `color` prop to `EuiContextMenuItem`, accepting all standard button color values ([#9448](https://github.com/elastic/eui/pull/9448))
- Adjusted lightest color tokens to get a more balanced palette and contrast with content over light backgrounds: ([#9432](https://github.com/elastic/eui/pull/9432))
  - `blue10` / `euiColorPrimary10`
  - `sky10` / `euiColorNeutral10`
  - `teal10` / `euiColorAccentSecondary10`
  - `pink10` / `euiColorAccent10`
  - `green10` / `euiColorSuccess10`
  - `yellow10` / `euiColorWarning10`
  - `orange10` / `euiColorRisk10`
  - `red10` / `euiColorDanger10`
  - `purple10` / `euiColorAssistance10`
- Added `flyoutMenuDisplayMode` prop to `EuiFlyout` to control when the flyout menu renders. Defaults to `'auto'`, which hides the menu bar when it only contains a close button. ([#9426](https://github.com/elastic/eui/pull/9426))
- Added `iconType` support to `EuiFlyoutManager` sessions, allowing icons to be displayed in the flyout history popover ([#9412](https://github.com/elastic/eui/pull/9412))
- Child flyout history in the Flyout Manager: sessions now track a stack of child flyouts (`childHistory`) so you can open multiple child flyouts in sequence and navigate back through them ([#9409](https://github.com/elastic/eui/pull/9409))
- Optional `level` argument to `goToFlyout(flyoutId, level?)` — when `level` is `'child'`, navigates to a child in the current session's history (e.g. from the history popover); when `'main'` or omitted, navigates by main session as before ([#9409](https://github.com/elastic/eui/pull/9409))
- `FlyoutSession` now includes `childTitle`, `childIconType`, and `childHistory` so the history popover can show child flyout titles and icons and support jumping back to a previous child ([#9409](https://github.com/elastic/eui/pull/9409))
- Back button now pops child history first (returning to the previous child flyout), then pops the current session when no child history remains ([#9409](https://github.com/elastic/eui/pull/9409))
- Added `files` prop to `EuiFilePicker` to maintain visual state when re-mounting ([#9362](https://github.com/elastic/eui/pull/9362))

**Bug fixes**

- Fixed `DefaultItemAction.color` being ignored in the collapsed overflow menu (`...` popover) of `EuiBasicTable` — it now renders with the correct color, matching the expanded inline action view ([#9448](https://github.com/elastic/eui/pull/9448))
- Fixed `EuiSuperDatePicker`'s time window adding a `1ms` drift for relative date times ([#9434](https://github.com/elastic/eui/pull/9434))
- Fixed cascade close when child flyouts are rendered as siblings of the main (not nested): closing the main now correctly invokes each child's `onClose` so consumer state and DOM stay in sync and children do not remain visible as orphaned flyouts ([#9409](https://github.com/elastic/eui/pull/9409))

**Deprecations**

- Deprecated `hideTitle` prop in `EuiFlyoutMenuProps`. The menu title is now hidden by default for all flyouts. Use `EuiFlyoutHeader` for visible titles instead. ([#9502](https://github.com/elastic/eui/pull/9502))

## [`v113.2.1`](https://github.com/elastic/eui/releases/v113.2.1)

**Bug fixes**

- Fixed `mobileOptions.width` and `mobileOptions.maxWidth` props support in the EuiTableRowCell component ([#9442](https://github.com/elastic/eui/pull/9442))

## [`v113.2.0`](https://github.com/elastic/eui/releases/v113.2.0)

- Added an optional `sticky` option to `EuiBasicTable` and `EuiInMemoryTable` actions columns. This option is currently in beta. ([#9430](https://github.com/elastic/eui/pull/9430))
- Added `minWidth` and `maxWidth` options to `EuiBasicTable` and `EuiInMemoryTable` columns configuration object ([#9422](https://github.com/elastic/eui/pull/9422))
- Added `minWidth` and `maxWidth` props to `EuiTableFooterCell`, `EuiTableHeaderCell`, `EuiTableHeaderCellCheckbox` and `EuiTableRowCell` ([#9422](https://github.com/elastic/eui/pull/9422))
- Updated the gap between action buttons in `EuiTable`, `EuiBasicTable` and `EuiInMemoryTable` to `4px` ([#9423](https://github.com/elastic/eui/pull/9423))
- Updated `EuiBadge` hover styles to match `EuiButton` styles ([#9418](https://github.com/elastic/eui/pull/9418))
- Added `container` prop to `EuiFlyout` for positioning flyouts relative to a container element instead of the viewport, enabling app-scoped flyouts that stay within the container bounds using `position: fixed` and container-derived inline styles ([#9377](https://github.com/elastic/eui/pull/9377)) ([#9377](https://github.com/elastic/eui/pull/9377))
- Added `container` to `EuiFlyout` component defaults configuration in `EuiProvider` ([#9377](https://github.com/elastic/eui/pull/9377)) ([#9377](https://github.com/elastic/eui/pull/9377))
- Added a new optional `scrollableInline` (boolean) prop to EuiTable, EuiBasicTable and EuiInMemoryTable that enables horizontal scrolling on overflow ([#9416](https://github.com/elastic/eui/pull/9416))

**Bug fixes**

- Fixed resizable flyouts to output percentage-based widths relative to the container or viewport, preventing size drift on resize ([#9377](https://github.com/elastic/eui/pull/9377)) ([#9377](https://github.com/elastic/eui/pull/9377))
- Fixed resizable flyout clamping to account for sibling flyout widths in side-by-side layout mode ([#9377](https://github.com/elastic/eui/pull/9377)) ([#9377](https://github.com/elastic/eui/pull/9377))
- Fixed fill-size flyouts incorrectly triggering stacked layout due to combined-width hysteresis deadlock ([#9377](https://github.com/elastic/eui/pull/9377)) ([#9377](https://github.com/elastic/eui/pull/9377))

**Deprecations**

- Deprecated `maskProps` on `EuiFlyout`. Use the `container` prop to scope flyouts to an application area; when `container` is provided, `maskProps` is ignored. For global (viewport-relative) flyouts, use `container={null}` ([#9377](https://github.com/elastic/eui/pull/9377)) ([#9377](https://github.com/elastic/eui/pull/9377))
- Deprecated `includeFixedHeadersInFocusTrap` on `EuiFlyout`. When using the `container` prop, use `includeSelectorInFocusTrap` to include specific elements (e.g. app headers) in the focus trap instead ([#9377](https://github.com/elastic/eui/pull/9377)) ([#9377](https://github.com/elastic/eui/pull/9377))

**Accessibility**

- Improved the accessibility experience of managed flyouts by allowing keyboard navigation between child and parent flyouts. ([#9397](https://github.com/elastic/eui/pull/9397))

## [`v113.1.0`](https://github.com/elastic/eui/releases/v113.1.0)

- Added `data-test-subj` attributes to `EuiFlyoutMenu` elements: back button, history dropdown, and history items. ([#9400](https://github.com/elastic/eui/pull/9400))
- Added new assistance tokens: ([#9383](https://github.com/elastic/eui/pull/9383))
    - `euiTheme.colors.backgroundFilledAssistance`
    - `euiTheme.colors.backgroundLightAssistance`
    - `euiTheme.colors.backgroundBaseAssistance`
    - `euiTheme.components.buttons.backgroundAssistanceHover`,
    - `euiTheme.components.buttons.backgroundFilledAssistanceHover`
    - `euiTheme.colors.backgroundBaseInteractiveHoverAssistance`
    - `euiTheme.colors.borderStrongAssistance`
    - `euiTheme.colors.borderBaseAssistance`
    - `euiTheme.colors.textAssistance`
    - `euiTheme.colors.vis.euiColorVisAssistance`
    - `euiTheme.colors.severity.assistance`
    - `euiTheme.colors.vis.euiColorVis10`
    - `euiTheme.colors.vis.euiColorVis11`
    - `euiTheme.colors.vis.euiColorVisText10`
    - `euiTheme.colors.vis.euiColorVisText11`
- Updated purple color palette shades 30-60 to slightly lighter values ([#9383](https://github.com/elastic/eui/pull/9383))

**Accessibility**

- Adds `aria-expanded` and `aria-controls` to the `EuiPopover` trigger button to improve screen reader context ([#9381](https://github.com/elastic/eui/pull/9381))

## [`v113.0.0`](https://github.com/elastic/eui/releases/v113.0.0)

- Updated `EuiFlyout` manager to close all flyouts when a parent flyout is closed. ([#9378](https://github.com/elastic/eui/pull/9378))
- Added `textInk` and `textGhost` color tokens for text and icon colors that should always remain dark or light regardless of color mode. ([#9379](https://github.com/elastic/eui/pull/9379))
- Added `EuiFormAppend` and `EuiFormPrepend` components ([#9014](https://github.com/elastic/eui/pull/9014))
- Added support for `type="span"` on `EuiFormLabel` for visual-only form labels ([#9014](https://github.com/elastic/eui/pull/9014))
- Updated `EuiFormLabel` to render a `span` if no `htmlFor` is passed ([#9014](https://github.com/elastic/eui/pull/9014))
- Updated `EuiFormControlLayout` to use `EuiFormAppend` and `EuiFormPrepend` ([#9014](https://github.com/elastic/eui/pull/9014))
- Updated `EuiAutoRefresh` and `EuiColorPicker` to use `EuiFormPrepend` ([#9014](https://github.com/elastic/eui/pull/9014))
- Updated `EuiFormAppend`/`EuiFormPrepend` styling ([#9305](https://github.com/elastic/eui/pull/9305))
- Updated `EuiFormAppend`/`EuiFormPrepend` to inherit `isDisabled` state from `EuiFormControlLayout` ([#9305](https://github.com/elastic/eui/pull/9305))
- Updated `EuiFormControlLayout` hover, disabled and readonly styling ([#9305](https://github.com/elastic/eui/pull/9305))
- Updated `EuiFormControlButton` to inherit `isDisabled`, `readOnly` and `isInvalid` states from `EuiFormControlLayout` ([#9305](https://github.com/elastic/eui/pull/9305))
- Added `iconSide` prop on `EuiDatePickerRange` ([#9305](https://github.com/elastic/eui/pull/9305))
- Updated `EuiSuperDatePicker` valid state styling ([#9305](https://github.com/elastic/eui/pull/9305))
- Removed background color transition on `EuiButtonEmpty` (other button variants don't have a transition anymore either) ([#9305](https://github.com/elastic/eui/pull/9305))
- Added `isLoading` prop on `EuiFormControlButton` ([#9328](https://github.com/elastic/eui/pull/9328))
- Updated paddings for `EuiButton`, `EuiButtonEmpty`, `EuiFilterButton` ([#8948](https://github.com/elastic/eui/pull/8948))
- Updated paddings for `append`/`prepend` on `EuiFormControlLayout` ([#8948](https://github.com/elastic/eui/pull/8948))
- Added optional `scrollContainerRef` prop to `EuiFlyoutBody` for accessing the flyout's internal scroll container. ([#9373](https://github.com/elastic/eui/pull/9373))

**Bug fixes**

- Updated `EuiColorPicker` to ensure `id` is correctly passed onto the internal `EuiFormControlLayout` ([#9014](https://github.com/elastic/eui/pull/9014))

**Breaking changes**

- Removed `ink` and `ghost` theme tokens. Use `textInk` / `textGhost` for text and icon colors or `plainDark` /`plainLight` for non-text use cases. ([#9379](https://github.com/elastic/eui/pull/9379))
- Updated `EuiQuickSelectPopover` in `EuiSuperDatePicker` to use `EuiFormPrepend`. This results in more restricted `buttonProps` as they reflect `EuiFormPrepend` instead of generic `EuiButtonEmpty` props. ([#9014](https://github.com/elastic/eui/pull/9014))
- Removed `components.superDatePickerBackgroundSuccees` token ([#9305](https://github.com/elastic/eui/pull/9305))

## [`v112.3.0`](https://github.com/elastic/eui/releases/v112.3.0)

- Added new `server` icon. ([#9355](https://github.com/elastic/eui/pull/9355))
- Added `className` support to `EuiMarkdownEditor`'s `toolbarProps` for custom toolbar styling ([#9349](https://github.com/elastic/eui/pull/9349))
- Updated `EuiFilePicker` to use the `upload` icon to better indicate uploads. ([#9351](https://github.com/elastic/eui/pull/9351))
- Exported the flyout system store singleton and added an event observer for emitting close session events ([#9347](https://github.com/elastic/eui/pull/9347))
- Updated `EuiIcon` to use standard dynamic imports for icon assets, enabling native support for modern bundlers (Rollup, Parcel) and improving initial load performance ([#9342](https://github.com/elastic/eui/pull/9342))

**Bug fixes**

- Fixed a potential crash in the flyout system: due to asynchronous state updates and React's batching behavior, it was possible to experience a crash when closing a managed flyout. ([#9356](https://github.com/elastic/eui/pull/9356))

## [`v112.2.0`](https://github.com/elastic/eui/releases/v112.2.0)

- Updated `documents` `timelineWithArrow` `indexOpen` `indexClose` `indexEdit` `indexRuntime` `indexSettings` `folderOpen` `folderClose` `kubernetesPod` `pagesSelect` `section` `workflow` glyph icons ([#9339](https://github.com/elastic/eui/pull/9339))

**Accessibility**

- Fixed `EuiBasicTable` and `EuiInMemoryTable` empty table announcements to include the expected `noItemsMessage` content ([#9341](https://github.com/elastic/eui/pull/9341))

## [`v112.1.0`](https://github.com/elastic/eui/releases/v112.1.0)

- Updated `timeline` icon glyph ([#9331](https://github.com/elastic/eui/pull/9331))
- Updated `EuiContextMenu` panels to allow passing `data-test-subj`, `aria-label`, `className` and `css` props ([#9323](https://github.com/elastic/eui/pull/9323))
- Added "zoom in" functionality to time window buttons in `EuiSuperDatePicker` ([#9325](https://github.com/elastic/eui/pull/9325))
- Added `displayName` to `EuiButton`, `EuiButtonEmpty`, `EuiDescriptionList` and its sub-components, `EuiEmptyPrompt`, `EuiFlexGrid`, `EuiFlexItem`, `EuiIcon`, `EuiImage`, `EuiLoadingLogo`, `EuiPageSection`, `EuiPageSidebar`, `EuiPageTemplate` and its sub-components and `EuiPanel` ([#9324](https://github.com/elastic/eui/pull/9324))
- Added `fill` prop (defaults to `false`) to `EuiBadge` component that controls whether the badge should use filled or non-filled (less intense) colors. By default, badges will now render as the non-filled variant. ([#9306](https://github.com/elastic/eui/pull/9306))
- Updated EuiBadge design to have rounded corners and improved paddings ([#9302](https://github.com/elastic/eui/pull/9302))

**Bug fixes**

- Fixed non-virtualized `EuiSelectable` throwing SyntaxError when selecting an option ([#9326](https://github.com/elastic/eui/pull/9326))
- Fixed an issue where `push` flyouts in a stacked layout calculated the content offset based on the hidden main flyout's width instead of the visible child flyout's width ([#9322](https://github.com/elastic/eui/pull/9322))

## [`v112.0.0`](https://github.com/elastic/eui/releases/v112.0.0)

- Added `productDiscover` icon ([#9311](https://github.com/elastic/eui/pull/9311))
- Updated `chartGauge` icon glyph ([#9311](https://github.com/elastic/eui/pull/9311))
- Updated icon glyphs `endpoint` `eraser` `errorFill` `error` `eyeSlash` `faceHappy` `faceNeutral` `faceSad` `folder` `fullScreenExit` `fullScreen` `gradient` `grid` `heart` `home` `if` `image` `infinity` `inputOutput` `key` `keyboard` `lineBreakSlash` `lineBreak` `lineDash` `lineDot` `lineSolid` `logOut` `magnifyMinus` `magnifyPlus` `magnify` `mail` `map` `mapping` `menuLeft` `menuRight` `menu` `merge` `minusCircle` `minusSquare` `minus` `money` `moon` `move` `nested` `number` `package` `paintBucket` `palette` `paperClip` `partial` `pattern` `pause` `pencil` `percent` `pinFill` `pin` `pivot` `plusCircle` `plusSquare` `plus` `popper` `presentation` `processor` `productStreamsWired` `queryField` `queryOperand` `querySelector` `queryValue` `query` `question` `quote` `radar` `readOnly` `redo` `reporter` `return` `rocket` `scissors` `send` `shard` `share` `snowflake` `sortAscending` `sortDescending` `starFill` `star` `stop` `sun` `tableInfo` `tableTime` `textAlignCenter` `textAlignLeft` `textAlignRight` `textBold` `textHeading` `textItalic` `textStrike` `textUnderline` `thermometer` `thumbDown` `thumbUp` `timeline` `transitionLeftIn` `transitionLeftOut` `transitionTopIn` `transitionTopOut` `undo` `vectorSquare` `vectorTriangle` `videoPlayer` `warningFill` `waypoint` `wifiSlash` `wifi` ([#9303](https://github.com/elastic/eui/pull/9303))
 ([#9303](https://github.com/elastic/eui/pull/9303))
- Added icons - `archive` `unarchive` `axisX` `axisYLeft` `axisYRight` `bulb` `cloud` `hourglass` `megaphone` `workflow` ([#9303](https://github.com/elastic/eui/pull/9303))
- Added `headerVisibility` prop on `EuiDataGrid` to support rendering the datagrid header element optionally ([#9281](https://github.com/elastic/eui/pull/9281))
- Updated 244 icon definitions to a more consistent naming convention. All 100 renamed icons include a backward-compatible alias in the icon map to support legacy references. ([#9279](https://github.com/elastic/eui/pull/9279))
- Added icons `briefcase`, `productCloudInfra`, `productDashboard`, `productML` ([#9301](https://github.com/elastic/eui/pull/9301))
- Updated glyphs `bullseye`, `bolt` ([#9301](https://github.com/elastic/eui/pull/9301))
- Added `dismissButtonProps` prop to `EuiCallOut` ([#9285](https://github.com/elastic/eui/pull/9285))

**Bug fixes**

- Fixed `EuiFlyout` to properly forward refs when `session` prop is used. ([#9318](https://github.com/elastic/eui/pull/9318))
- Fixed `EuiDataGrid` cells scrolling into view while trying to select text ([#9276](https://github.com/elastic/eui/pull/9276))

**Breaking changes**

- Removed `euiPaletteForLightBackground` and `euiPaletteForDarkBackground` deprecated palette functions. Use `euiTheme.colors.vis.euiColorVisText{NUMBER}` tokens instead. ([#9296](https://github.com/elastic/eui/pull/9296))

**Accessibility**

- Improved the accessibility of `EuiDataGrid`s column selector drag handle buttons by ensuring distinctive labels ([#9282](https://github.com/elastic/eui/pull/9282))

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

