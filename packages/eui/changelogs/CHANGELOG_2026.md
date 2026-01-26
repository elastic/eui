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

