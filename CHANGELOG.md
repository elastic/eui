# [`master`](https://github.com/elastic/eui/tree/master)

No public interface changes since `0.0.38`.

# [`0.0.38`](https://github.com/elastic/eui/tree/v0.0.38)

- Modifying drop shadow intensities and color. ([607](https://github.com/elastic/eui/pull/607))
- Add Sass color functions. Make `$euiColorWarning` color usage more accessible while still being "yellow". ([628](https://github.com/elastic/eui/pull/628))
- Removed extraneous `global_styling/mixins/_forms.scss` file and importing the correct files in the `filter_group.scss` and `combo_box.scss` files. ([#609](https://github.com/elastic/eui/pull/609))
- Added `isInvalid` prop to `EuiComboBox` ([#631](https://github.com/elastic/eui/pull/631))
- Added support for rejecting user input by returning `false` from the `onCreateOption` prop of `EuiComboBox` ([#631](https://github.com/elastic/eui/pull/631))

**Bug fixes**

- Visual fix for the focus state of disabled `EuiButton` ([#603](https://github.com/elastic/eui/pull/603))
- `EuiSelect` can pass any node as a value rather than just a string ([#603](https://github.com/elastic/eui/pull/603))
- Fixed a typo in the flex TypeScript definition ([#629](https://github.com/elastic/eui/pull/629))
- Fixed `EuiComboBox` bug in which the options list wouldn't always match the width of the input ([#611](https://github.com/elastic/eui/pull/611))
- Fixed `EuiComboBox` bug in which opening the combo box when there's no scrollbar on the window would result in the list being positioned incorrectly ([#631](https://github.com/elastic/eui/pull/631))
- Fixed `EuiComboBox` bug in which clicking a pill's close button would close the list ([#631](https://github.com/elastic/eui/pull/631))
- Fixed `EuiComboBox` bug in which moving focus from one combo box to another would remove the `euiBody-hasPortalContent` class from the body. ([#631](https://github.com/elastic/eui/pull/631))
- `EuiGlobalToastList` no longer triggers `Uncaught TypeError: _this.callback is not a function`  ([#865](https://github.com/elastic/eui/pull/865))
- `EuiGlobalToastList` checks to see if it has dismissed a toast before re-dismissing it ([#868](https://github.com/elastic/eui/pull/868))

# [`0.0.37`](https://github.com/elastic/eui/tree/v0.0.37)

- Added `EuiComboBox` for selecting many options from a list of options ([#567](https://github.com/elastic/eui/pull/567))
- Added `EuiHighlight` for highlighting a substring within text ([#567](https://github.com/elastic/eui/pull/567))
- `calculatePopoverPosition` service now accepts a `positions` argument so you can specify which positions are acceptable ([#567](https://github.com/elastic/eui/pull/567))
- Added `closeButtonProps` prop to `EuiBadge`, `hollow` badge type, and support for arbitrary hex color ([#567](https://github.com/elastic/eui/pull/567))
- Added support for arbitrary hex color to `EuiIcon` ([#567](https://github.com/elastic/eui/pull/567))

**Breaking changes**

- Renamed `euiBody-hasToolTip` class to `euiBody-hasPortalContent` ([#567](https://github.com/elastic/eui/pull/567))

# [`0.0.36`](https://github.com/elastic/eui/tree/v0.0.36)

- Added support for range queries in `EuiSearchBar` (works for numeric and date values) ([#485](https://github.com/elastic/eui/pull/485))
- Added support for emitting a `EuiSearchBar` query to an Elasticsearch query string ([#598](https://github.com/elastic/eui/pull/598))
- Added support for expandable rows to `EuiBasicTable` ([#585](https://github.com/elastic/eui/pull/585))

**Bug fixes**

- Relaxed query syntax of `EuiSearchBar` to allow usage of hyphens without escaping ([#581](https://github.com/elastic/eui/pull/581))
- Fixed font-weight issue in K6 theme ([#596](https://github.com/elastic/eui/pull/596))

# [`0.0.35`](https://github.com/elastic/eui/tree/v0.0.35)

- Modified `EuiLink` and all buttons to support both href and onClick ([#554](https://github.com/elastic/eui/pull/554))
- Added `color` prop to `EuiIconTip` ([#580](https://github.com/elastic/eui/pull/580))

# [`0.0.34`](https://github.com/elastic/eui/tree/v0.0.34)

- Adjust `EuiCallOut` and dark theme warning coloring ([#563](https://github.com/elastic/eui/pull/563))
- Added a `buttonColor` prop to `EuiConfirmModal` ([#546](https://github.com/elastic/eui/pull/546))
- Added 'baseline' as option to `EuiFlexGroup`'s `alignItems` prop ([#546](https://github.com/elastic/eui/pull/546))

**Bug fixes**

- Fixed `EuiToolTip` bug which caused the tooltip to hide when moving the mouse around inside of the trigger element ([#557](https://github.com/elastic/eui/pull/557), [#564](https://github.com/elastic/eui/pull/564))
- Fixed a bug where `EuiButtonEmpty` would offer a white background on hover when it was disabled, even when there was no such background transition on hover when the buttons are not disabled ([#561](https://github.com/elastic/eui/pull/561))
- Fixed table cell bugs ([#565](https://github.com/elastic/eui/pull/565))
  - `EuiBasicTable`  now supports explicitly setting `truncateText` and `textOnly` on column definitions, and supports passing through unrecognized props to the cell (e.g. `data-test-subj`).
  - Updated table cell CSS so that long single-word cell content will break and wrap mid-word.

# [`0.0.33`](https://github.com/elastic/eui/tree/v0.0.33)

- Added initial sorting option to `EuiInMemoryTable` ([#547](https://github.com/elastic/eui/pull/547))
- Horizontally scrolling `EuiTabs` ([#546](https://github.com/elastic/eui/pull/546))
- Remove padding from both sides of `EuiEmptyButton` ([#546](https://github.com/elastic/eui/pull/546))
- Added `disabled` prop to placeholder (ellipses) button in pagination ([#546](https://github.com/elastic/eui/pull/546))
- Converted `.euiHeader__notification` into `EuiHeaderNotification` ([#546](https://github.com/elastic/eui/pull/546))

**Bug fixes**

- `EuiConfirmModal` will now check for the presence of confirm and cancel buttons before trying to focus them ([#555](https://github.com/elastic/eui/pull/555))

# [`0.0.32`](https://github.com/elastic/eui/tree/v0.0.32)

- Updated `EuiDescriptionList` to accept nodes for the titles and descriptions ([#552](https://github.com/elastic/eui/pull/552))
- Added `stop` and `stopFilled` icons ([#543](https://github.com/elastic/eui/pull/543))

**Bug fixes**

- Fixed `EuiToolTip` smart positioning to prevent tooltip from being clipped by the window where possible ([#550]https://github.com/elastic/eui/pull/550)

# [`0.0.31`](https://github.com/elastic/eui/tree/v0.0.31)

- Made `<EuiProgress>` TypeScript types more specific ([#518](https://github.com/elastic/eui/pull/518))
- Removed `font-smoothing` from our reset css for better text legibility ([#539](https://github.com/elastic/eui/pull/539))

**Bug fixes**

- Made `EuiIconTip` screen reader accessible ([#534](https://github.com/elastic/eui/pull/534))
- Fixed a sorting issue in `EuiInMemoryTable` ([#453](https://github.com/elastic/eui/pull/453))
- Fixed checkbox click for `EuiCheckbox` and `EuiRadio` without a label ([#541](https://github.com/elastic/eui/pull/541))

# [`0.0.30`](https://github.com/elastic/eui/tree/v0.0.30)

- Add ability to force `EuiSideNav` items open by setting `item.forceOpen`. ([#515](https://github.com/elastic/eui/pull/515))

# [`0.0.29`](https://github.com/elastic/eui/tree/v0.0.29)

- Added `EuiIconTip` to make it easier to display icons with tooltips ([#528](https://github.com/elastic/eui/pull/528))
- Added `buttonRef` prop to `EuiButton`, `EuiButtonEmpty`, and `EuiButtonIcon` ([#529](https://github.com/elastic/eui/pull/529))

**Bug fixes**

- `EuiHealth` no longer stacks flex items on small screens ([#530](https://github.com/elastic/eui/pull/530))
- Fixed `EuiPageContent` centering within `EuiPage` issue ([#527](https://github.com/elastic/eui/pull/527))
- `EuiConfirmModal` will now correctly auto-focus on its confirm and cancel buttons (#529[](https://github.com/elastic/eui/pull/529))

# [`0.0.28`](https://github.com/elastic/eui/tree/v0.0.28)

- `EuiInMemoryTable` pass items to BasicTable when message is provided ([#517](https://github.com/elastic/eui/pull/517)).
- `EuiSearchBox` now passes unused props through to `EuiFieldSearch` ([#514](https://github.com/elastic/eui/pull/514))
- Change `EuiBasicTable` `noItemsMessage` and `EuiInMemoryTable` `messgae` propType to node
instead of just string ([#516](https://github.com/elastic/eui/pull/516))

# [`0.0.27`](https://github.com/elastic/eui/tree/v0.0.27)

- Don't propagate a null `onClick` on EuiPanels ([#473](https://github.com/elastic/eui/pull/473))
- Use 1.1px for the `EuiHorizontalRule` height, in order to work around strange Chrome height calculations ([#473](https://github.com/elastic/eui/pull/473))
- New icons for `logoGithub` and `logoSketch` ([#494](https://github.com/elastic/eui/pull/494))
- `EuiCard` now has an `href` and `isClickable` prop for better handling hover animations. ([#494](https://github.com/elastic/eui/pull/494))
- Added `calculateContrast` and `rgbToHex` to services ([#494](https://github.com/elastic/eui/pull/494))

**Bug fixes**

- `EuiModal` is now responsive on mobile screens ([#512](https://github.com/elastic/eui/pull/512))
- `EuiFlexGrid` now collapses down in mobile layouts properly. ([#515](https://github.com/elastic/eui/pull/515))
- Made `EuiCard` proptypes more permission by changing strings to nodes. ([#515](https://github.com/elastic/eui/pull/515))
- Fixed `reponsive={false}` prop not working when flex groups were nested. ([#494](https://github.com/elastic/eui/pull/494))
- `EuiBadge` wrapping element changed from a `div` to `span` so it can be nested in text blocks ([#494](https://github.com/elastic/eui/pull/494))

# [`0.0.26`](https://github.com/elastic/eui/tree/v0.0.26)

**Bug fixes**

- `EuiSelect` do not set `defaultValue` property when `value` property is provided ([#504](https://github.com/elastic/eui/pull/504)).
- `EuiBottomBar` now uses `EuiPortal` to avoid zindex conflicts ([#487](https://github.com/elastic/eui/pull/487))
- Upped dark theme contrast on disabled buttons  ([#487](https://github.com/elastic/eui/pull/487))

**Breaking changes**

- Removed `EuiTableOfRecords` ([#490](https://github.com/elastic/eui/pull/490))

# [`0.0.25`](https://github.com/elastic/eui/tree/v0.0.25)

- `EuiSearchBar` accepts `toolsLeft` and `toolsRight` props ([#458](https://github.com/elastic/eui/pull/458))
- Added `search.onChange` callback to `EuiInMemoryTable` ([#469](https://github.com/elastic/eui/pull/469))
- Added `initialPageSize` option to `EuiInMemoryTable` ([#477](https://github.com/elastic/eui/pull/477))
- Added design guidelines for button and toast usage ([#371](https://github.com/elastic/eui/pull/371))

**Breaking changes**

- Complete refactor of `EuiToolTip`. They now work. Only a breaking change if you were using them. ([#484](https://github.com/elastic/eui/pull/484))

# [`0.0.24`](https://github.com/elastic/eui/tree/v0.0.24)

- Removed hover and focus states from non-selectable `EuiSideNavItem`s ([#434](https://github.com/elastic/eui/pull/434))
- Added `Ast` and `Query` services ([#454](https://github.com/elastic/eui/pull/454))
- Added icons for Kibana query language ([#455](https://github.com/elastic/eui/pull/455))

**Bug fixes**

- Fix error stemming from `selected` prop on `EuiSelect` ([#436](https://github.com/elastic/eui/pull/436))

**Breaking changes**

- The `Random` service's `oneOf` method now only accepts an array ([#454](https://github.com/elastic/eui/pull/454))

# [`0.0.23`](https://github.com/elastic/eui/tree/v0.0.23)

- Added `EuiInMemoryTable`, which encapsulates sorting, searching, selection, and pagination state and logic ([#390](https://github.com/elastic/eui/pull/390))
- Added stack trace information to `EuiErrorBoundary` ([#428](https://github.com/elastic/eui/pull/428))
- Make full screen code block use the same font-size on the original code block. ([#447](https://github.com/elastic/eui/pull/447))

**Bug fixes**

- Fixed `EuiContextMenu` bug when using the keyboard to navigate up, which was caused by unnecessarily re-rendering the items, thus losing references to them ([#431](https://github.com/elastic/eui/pull/431))

# [`0.0.22`](https://github.com/elastic/eui/tree/v0.0.22)

- Added `EuiDelayHide` component. ([#412](https://github.com/elastic/eui/pull/412))
- Decreased overall size of checkbox, radio, and switches as well as better styles for the different states. ([#407](https://github.com/elastic/eui/pull/407))
- Added `EuiFilePicker` component for `input type="file"` needs. ([#402](https://github.com/elastic/eui/pedull/402))
- Added `isLoading` prop to `EuiButton` ([#427](https://github.com/elastic/eui/pull/427))
- Added icons: `eye`, `eyeClosed`, `grab`, `heatmap`, `vector` ([#427](https://github.com/elastic/eui/pull/427))
- Added `hasNoInitialSelection` option to `EuiSelect`. ([#422](https://github.com/elastic/eui/pull/422))

**Bug fixes**

- Fixed appearance of checked checkeboxes and radios in IE ([#407](https://github.com/elastic/eui/pull/407))
- Fixed disabled vs enabled appearance of checked checkeboxes and radios ([#407](https://github.com/elastic/eui/pull/407))
- Fixed disabled & checked state of switches ([#407](https://github.com/elastic/eui/pull/407))
- Fixed `EuiCard` content alignment when content is short. ([#415](https://github.com/elastic/eui/pull/415))
- Only apply the `$euiCodeBlockSelectedBackgroundColor` variable if it is a color ([#427](https://github.com/elastic/eui/pull/427))
- No margins for `<hr>` ([#427](https://github.com/elastic/eui/pull/427))
- Fixed `EuiButton` truncation ([#427](https://github.com/elastic/eui/pull/427))

**Breaking changes**

- Changed `EuiAccordion`’s method of `onToggleOpen` to `onToggle` ([#427](https://github.com/elastic/eui/pull/427))

# [`0.0.21`](https://github.com/elastic/eui/tree/v0.0.21)

- Logstash icon set. [#399](https://github.com/elastic/eui/pull/399)
- Added support for `disabled` options in `EuiSelect`. [#324](https://github.com/elastic/eui/pull/324)
- Badges can now accept onClicks and custom colors. They were changed stylistically to be bolder and smaller by default. ([#381](https://github.com/elastic/eui/pull/381))
- Added component to wrap blocks of substeps `EuiSubSteps` in a shaded container. ([#375](https://github.com/elastic/eui/pull/375))
- Added horizontal steps component ([#375](https://github.com/elastic/eui/pull/375))
- Changed look and feel of pagination. Added `compressed` prop for smaller footprint pagination. ([#380](https://github.com/elastic/eui/pull/380))
- Added `EuiBasicTable` as an opinionated, high level component for constructing tables. Its addition deprecates `EuiTableOfRecords` which is still avaiable, but now marked for removal. ([#377](https://github.com/elastic/eui/pull/377))
- Added styles for `readOnly` states of form controls. ([#391](https://github.com/elastic/eui/pull/391))
- Added importAction and exportAction icons ([#394](https://github.com/elastic/eui/pull/394))
- Added `EuiCard` for UI patterns that need an icon/image, title and description with some sort of action. ([#380](https://github.com/elastic/eui/pull/380))
- Added TypeScript definitions for the `EuiHealth` component. ([#403](https://github.com/elastic/eui/pull/403))
- Added `SearchBar` component - introduces a simple yet rich query language to search for objects + search box and filter controls to construct/manipulate it. ([#379](https://github.com/elastic/eui/pull/379))

**Bug fixes**

- Tables now default to `table-layout: fixed` to avoid some collapsing cell problems. [#398](https://github.com/elastic/eui/pull/398)
- Wrap long lines of text within the body of `EuiToast` instead of letting text overflow ([#392](https://github.com/elastic/eui/pull/392))
- Fixed dark theme coloring of Substeps ([#396](https://github.com/elastic/eui/pull/396))
- Reorder selectors to fix fixed progress bar in Firefox ([#404](https://github.com/elastic/eui/pull/404))

# [`0.0.20`](https://github.com/elastic/eui/tree/v0.0.20)

- Renamed class from `euiFlexGroup--alignItemsStart` to `euiFlexGroup--alignItemsFlexStart` ([#378](https://github.com/elastic/eui/pull/378))

# [`0.0.19`](https://github.com/elastic/eui/tree/v0.0.19)

- `EuiGlobalToastList` now prevents toasts from disappearing while the user's mouse is over the list. Added `timer/Timer` service. ([#370](https://github.com/elastic/eui/pull/370))

**Bug fixes**

- **Note: This is deprecated in 0.0.21 and removed in 0.0.26.** `EuiTableOfRecords` selection bugs ([#365](https://github.com/elastic/eui/pull/365))
  - Deleting selected items now resets the select all checkbox to an unchecked state
  - The select all checkbox only becomes checked when all selectable rows are checked, not just some of them

**Breaking changes**

- Changed `EuiGlobalToastList` to be responsible for instantiating toasts, tracking their lifetimes, and dismissing them. It now acepts `toasts`, `dismissToast`, and `toastLifeTimeMs` props. It no longer accepts `children`. ([#370](https://github.com/elastic/eui/pull/370))

# [`0.0.18`](https://github.com/elastic/eui/tree/v0.0.18)

**Bug fixes**

- Fixed `EuiCodeEditor` bug in which hitting ESCAPE to close the autocompletion suggestions menu would also exit editing mode. ([#363](https://github.com/elastic/eui/pull/363))

# [`0.0.17`](https://github.com/elastic/eui/tree/v0.0.17)

**Bug fixes**

- Downgraded `lodash` version to `3.10.0` to align it with Kibana. ([#359](https://github.com/elastic/eui/pull/359))

# [`0.0.16`](https://github.com/elastic/eui/tree/v0.0.16)

- `EuiRadio` now supports the `input` tag's `name` attribute. `EuiRadioGroup` accepts a `name` prop that will propagate to its `EuiRadio`s. ([#348](https://github.com/elastic/eui/pull/348))
- Added Machine Learning create jobs icon set. ([#338](https://github.com/elastic/eui/pull/338))
- **Note: This is deprecated in 0.0.21 and removed in 0.0.26.** Added `EuiTableOfRecords`, a higher level table component to take away all your table listings frustrations. ([#250](https://github.com/elastic/eui/pull/250))

**Bug fixes**

- Added `react-color` as a dependency (was previously a devDependency) ([#354](https://github.com/elastic/eui/pull/354))

**Bug fixes**

- Stop propagation and prevent default when closing components. Otherwise the same Escape keypress could close the parent component(s) as well as the one you intend to close. [(#344)](https://github.com/elastic/eui/pull/344)

# [`0.0.15`](https://github.com/elastic/eui/tree/v0.0.15)

- Added `EuiColorPicker`. ([#328](https://github.com/elastic/eui/pull/328))
- `EuiCodeBlock` now only shows fullscreen icons if `overflowHeight` prop is set. Also forces large fonts and padding while expanded. ([#325](https://github.com/elastic/eui/pull/325))
- Exported `VISUALIZATION_COLORS` from services ([#329](https://github.com/elastic/eui/pull/329))
- Added typescript definitions for `EuiFormRow`, `EuiRadioGroup`, `EuiSwitch`, `EuiLoadingSpinner`, `EuiLoadingChart` and `EuiProgress`. ([#326](https://github.com/elastic/eui/pull/326))
- Added `checkHrefAndOnClick` and `getSecureRelForTarget` to services.

**Breaking changes**

- `EuiCodeBlock` now only shows fullscreen icons if `overflowHeight` prop is set. Also forces large fonts and padding while expanded. [(#325)](https://github.com/elastic/eui/pull/325)
- React ^16.2 is now a peer dependency ([#264](https://github.com/elastic/eui/pull/264))
- `EuiProgress` no longer accepts the `indeterminate` property, which never had any effect. ([#326](https://github.com/elastic/eui/pull/326))

**Bug fixes**

- Fix TypeScript definitions such that optional and readonly properties survive being passed through `Omit` ([#322](https://github.com/elastic/eui/pull/322))

# [`0.0.14`](https://github.com/elastic/eui/tree/v0.0.14)

- Added `isColorDark` color util ([#311](https://github.com/elastic/eui/pull/311))
- EuiButton, EuiButtonEmpty and EuiButtonIcon can now take an `href` ([#316](https://github.com/elastic/eui/pull/316))
- In `EuiSideNav`, allow a callback to be passed that renders the individual items in the navigation. This makes interoperability with e.g. `react-router` easier. ([#310](https://github.com/elastic/eui/pull/310))
- Add new icon types to `EuiIcon` TypeScript definitions ([#323](https://github.com/elastic/eui/pull/323)).

**Bug fixes**

- Set `EuiFlexGroup` to `flex-grow: 1` to be more friendly with IE11 ([#315](https://github.com/elastic/eui/pull/315))

# [`0.0.13`](https://github.com/elastic/eui/tree/v0.0.13)

- Added index management icons. ([#307](https://github.com/elastic/eui/pull/307))

**Breaking changes**

- Revert test helper for async functions that throw exceptions. See PR for details on how this can be handled in Jest 22. ([#306](https://github.com/elastic/eui/pull/306))

**Bug fixes**

- Adjust toast z-index to show over modals ([#296](https://github.com/elastic/eui/pull/296))
- Fix nested `EuiFlexItem` collapse issue in IE ([#308](https://github.com/elastic/eui/pull/308))

# [`0.0.12`](https://github.com/elastic/eui/tree/v0.0.12)

- Minor style-only changes to `EuiPagination`, button reset, `EuiTableHeaderCell`, and `EuiCodeBlock`. ([#298](https://github.com/elastic/eui/pull/298))
- All NPM dependencies now use ^ to install the latest minor version.
- Added Apache, Nginx, MySQL logos ([#270](https://github.com/elastic/eui/pull/270))
- Added small version of `EuiCallOut` ([#269](https://github.com/elastic/eui/pull/269))
- Added first batch of TypeScript type definitions for components and services ([#252](https://github.com/elastic/eui/pull/252))
- Added button for expanding `EuiCodeBlock` instances to be full-screen. ([#259](https://github.com/elastic/eui/pull/259))
- Add test helper for async functions that throw exceptions ([#301](https://github.com/elastic/eui/pull/301))

**Bug fixes**

- Removed padding on `EuiPage` mobile breakpoint. ([#282](https://github.com/elastic/eui/pull/282))
- Fixed some `EuiIcon` `type`s not setting their `viewBox` attribute, which caused them to not honor the `size` properly. ([#277](https://github.com/elastic/eui/pull/277))
- Fixed `EuiContextMenu` to pass the `event` argument to a `EuiContextMenuItem`'s `onClick` handler even when a panel is defined. ([#265](https://github.com/elastic/eui/pull/265))

**Breaking changes**

- Removed `color` prop from `EuiCodeBlock`. This component's highlighting now matches whichever theme is currently active. See PR for details on SCSS breaking changes. ([#259](https://github.com/elastic/eui/pull/259))

# [`0.0.11`](https://github.com/elastic/eui/tree/v0.0.11)

- Added `EuiImage` component to allow for image sizing and zooms. [(#262)](https://github.com/elastic/eui/pull/262)
- Updated `EuiOverlayMask` to append `<div>` to body. [(#254)](https://github.com/elastic/eui/pull/254)

**Bug fixes**

- Disabled tab styling. [(#258)[https://github.com/elastic/eui/pull/258]]
- Proper classname for flexGroup alignItems prop. [(#257)[https://github.com/elastic/eui/pull/257]]
- Clicking the downArrow icon in `EuiSelect` now triggers selection. [(#255)[https://github.com/elastic/eui/pull/255]]
- Fixed `euiFormRow` id's from being the same as the containing input and label. [(#251)[https://github.com/elastic/eui/pull/251]]

**Breaking changes**

- `{rest}` prop attacmhment moved from wrapping div to the input on checkboxes and switches. [(#246)](https://github.com/elastic/eui/pull/246)

# [`0.0.10`](https://github.com/elastic/eui/tree/v0.0.10)

- Updated `euiPopover` to propagate `panelPaddingSize` padding values to content only (title does inherit horizontal values) via CSS. [(#229)](https://github.com/elastic/eui/pull/229)
- Updated `EuiErrorBoundary` to preserve newlines in error. [(#238)[https://github.com/elastic/eui/pull/238]]
- Added more icons and fixed a few for dark mode [(#228)](https://github.com/elastic/eui/pull/228)
- Added `EuiFlyout` component. [(#227)](https://github.com/elastic/eui/pull/227)

**Breaking changes**

- Renamed `EuiModalOverlay` to `EuiOverlayMask`. [(#227)](https://github.com/elastic/eui/pull/227)

**Bug fixes**

- Fixed bug in `Pager` service which occurred when there were no items. [(#237)[https://github.com/elastic/eui/pull/237]]
- Added `isPageable` method to `Pager` service and set first and last page index to -1 when there are no pages. [(#242)[https://github.com/elastic/eui/pull/242]]

# [`0.0.9`](https://github.com/elastic/eui/tree/v0.0.9)

**Breaking changes**

- Renamed `euiFlexGroup--alignItemsEnd` class to `euiFlexGroup--alignItemsFlexEnd`.
- Remove support for `primary` color from `EuiTextColor` because it looked too much like a link.

**Bug fixes**

- Give `EuiFormErrorText` and `EuiFormHelpText` proper line-height. [(#234)](https://github.com/elastic/eui/pull/234)

# [`0.0.8`](https://github.com/elastic/eui/tree/v0.0.8)

**Bug fixes**

- Fix button vertical alignment. [(#232)](https://github.com/elastic/eui/pull/232)

# [`0.0.7`](https://github.com/elastic/eui/tree/v0.0.7)

- Added `EuiSteps` component ([(#202)](https://github.com/elastic/eui/pull/202), [(#208)](https://github.com/elastic/eui/pull/208))

**Breaking changes**

- Test helpers now published at `@elastic/eui/lib/test`

**Bug fixes**

- Case sensitive file name fix for Kibana dark theme. [(#216)](https://github.com/elastic/eui/pull/216)

# [`0.0.6`](https://github.com/elastic/eui/tree/v0.0.6)

- `justify` prop of `EuiFlexGroup` now accepts `spaceEvenly` [(#205)](https://github.com/elastic/eui/pull/205)
- Increased size of `<EuiTitle size="s">` so that it's distinguishable as a title [(#204)](https://github.com/elastic/eui/pull/204)

# [`0.0.5`](https://github.com/elastic/eui/tree/v0.0.5)

**Bug fixes**

- Fixed import paths for `EuiTable`, `EuiHealth`, and `EuiPopover` which prevented dependents of EUI from being able to compile when importing components from the `lib` directory [(#203)](https://github.com/elastic/eui/pull/203)

# [`0.0.4`](https://github.com/elastic/eui/tree/v0.0.4)

- Added `EuiHealth` components for status checks [(#158)](https://github.com/elastic/eui/pull/158)
- Cleaned up styling for checkboxes, switches, and radios [(#158)](https://github.com/elastic/eui/pull/158)
- Form `disabled` states are now more consistent [(#158)](https://github.com/elastic/eui/pull/158)
- Page and title padding adjusted to be more compact [(#158)](https://github.com/elastic/eui/pull/158)
- Table spacing is now smaller [(#158)](https://github.com/elastic/eui/pull/158)
- Dark theme forms now have better contrast with their borders [(#158)](https://github.com/elastic/eui/pull/158)
- Added icons to match Kibana's app directory [(#162)](https://github.com/elastic/eui/pull/162)
- Converted icons from SVG to React component during the build and stop using sprites [(#160)](https://github.com/elastic/eui/pull/160)
- Added `isReadOnly`, `setOptions`, and `cursorStart` props to `EuiCodeEditor` ([#169](https://github.com/elastic/eui/pull/169))
- Added `wrap` prop to `EuiFlexGroup` ([#170](https://github.com/elastic/eui/pull/170))
- Added `scope` prop to `EuiTableHeaderCell` and `EuiTableHeaderCellCheckbox` ([#171](https://github.com/elastic/eui/pull/171))
- Added `disabled` prop to `EuiContextMenuItem` ([#172](https://github.com/elastic/eui/pull/172))
- Added `EuiTablePagination` component and `Pager` service ([#178](https://github.com/elastic/eui/pull/178))
- **Note: This is broken until 0.0.25.** Added `EuiTooltip` component ([#174](https://github.com/elastic/eui/pull/174), [#193](https://github.com/elastic/eui/pull/193))
- Added a bold weight of 700 and apply it to `<strong>` elements by default ([#193](https://github.com/elastic/eui/pull/193))
- Icon size prop now accepts `s`. Adjusted coloring of sidenav arrows ([#178](https://github.com/elastic/eui/pull/197))
- Added `EuiErrorBoundary` ([#198](https://github.com/elastic/eui/pull/198))
- Exported `test` module, which includes `findTestSubject`, `startThrowingReactWarnings`, `stopThrowingReactWarnings`, `requiredProps`, and `takeMountedSnapshot` helpers ([#198](https://github.com/elastic/eui/pull/198))
- Added a more systematic way to add themes; includes a new K6 theme for Kibana. [(#191)](https://github.com/elastic/eui/pull/191)

**Bug fixes**

- Fixed bug where screen-reader styles weren't being imported [(#103)](https://github.com/elastic/eui/pull/103)
- Fixed a bug where `<progress>` wasn't being rendered under `block` display [(#166)](https://github.com/elastic/eui/pull/166)
- Fixed a bug that caused `EuiPageSideBar` width to change when the width of its content changed [(#181)](https://github.com/elastic/eui/pull/181)

**Breaking changes**

- Fixed a bug where table cell classes were being applied twice [(#167)](https://github.com/elastic/eui/pull/167)
- React ^16.0 is now a peer dependency ([#198](https://github.com/elastic/eui/pull/198))

# [`0.0.3`](https://github.com/elastic/eui/tree/v0.0.3)

- `EuiFlexItem` now accepts integers between 1 and 10 for the `grow` prop. [(#144)](https://github.com/elastic/eui/pull/144)
- `EuiFlexItem` and `EuiFlexGrow` now accept a `component` prop which you can set to `span` or `div` (default). [(#141)](https://github.com/elastic/eui/pull/141)
- Added `isLoading` prop to form inputs to allow for a loading state [(#150)](https://github.com/elastic/eui/pull/150)

**Breaking changes**

- `EuiSideNav` now accepts a tree data structure via the `items` prop [(#141)](https://github.com/elastic/eui/pull/141)
- `EuiSideNavGroup`, `EuiSideNavItem`, and `EuiSideNavTitle` have been removed from the public API [(#141)](https://github.com/elastic/eui/pull/141)

# [`0.0.2`](https://github.com/elastic/eui/tree/v0.0.2)

- Changed the hover states of `EuiButtonEmpty` to look more like links [(#135)](https://github.com/elastic/eui/pull/135)
- `EuiCode` now wraps `EuiCodeBlock`, so it can do everything `EuiCodeBlock` could, but inline [(#138)](https://github.com/elastic/eui/pull/138)
- Added `transparentBackground` prop to `EuiCodeBlock` [(#138)](https://github.com/elastic/eui/pull/138)
- `EuiCodeBlock` now uses the `light` theme by default [(#138)](https://github.com/elastic/eui/pull/138)
- `EuiFormRow` generates its own unique `id` prop if none is provided [(#130)](https://github.com/elastic/eui/pull/130)
- `EuiFormRow` associates help text and errors with the field element via ARIA attributes [(#130)](https://github.com/elastic/eui/pull/130)

# [`0.0.1`](https://github.com/elastic/eui/tree/v0.0.1) Initial Release

- Initial public release
