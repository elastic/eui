## Summary

Provide a detailed summary of your PR. Explain how you arrived at your solution. If it includes changes to UI elements include a screenshot or gif.

## QA

Remove or strikethrough items that do not apply to your PR.

### General checklist

- [ ] Checked in both **light and dark** modes
- [ ] Checked in **mobile**
- [ ] Checked in **Chrome**, **Safari**, **Edge**, and **Firefox**
- [ ] Props have proper **autodocs** and **[playground toggles](https://github.com/elastic/eui/blob/main/wiki/documentation-guidelines.md#adding-playground-toggles)**
- [ ] Added **[documentation](https://github.com/elastic/eui/blob/main/wiki/documentation-guidelines.md)**
- [ ] Checked **[Code Sandbox](https://codesandbox.io/)** works for any docs examples
- [ ] Added or updated **[jest](https://github.com/elastic/eui/blob/main/wiki/testing.md) and [cypress](https://github.com/elastic/eui/blob/main/wiki/cypress-testing.md) tests**
- [ ] Checked for **breaking changes** and labeled appropriately
- [ ] Checked for **accessibility** including keyboard-only and screenreader modes
- [ ] Updated the **[Figma](https://www.figma.com/community/file/964536385682658129)** library counterpart
- [ ] A **[changelog](https://github.com/elastic/eui/blob/main/wiki/documentation-guidelines.md#changelog)** entry exists and is marked appropriately

### Emotion conversion checklist

- **Does it work?**
- [ ] Output CSS matches the previous CSS / as expected in browsers
- [ ] Rendered className reads as expected in snapshots and in browsers
- [ ] Checked component playground (class components wrapped in `withEuiTheme` need to pass `true` as the second argument to its `propUtilityForPlayground` in `src-docs/src/views/{component}/playground.js`)
&nbsp;
- **Unit tests**
- [ ] [`shouldRenderCustomStyles()`](https://github.com/elastic/eui/blob/6054e9b8310bdb106371c0c9ff8bc48e3e0e594b/src/test/internal/render_custom_styles.tsx) test was added and passes with parent component and any nested `childProps` (e.g. `tooltipProps`)
- [ ] Removed any `mount()`ed snapshots in favor of `render()` or a more specific assertion
&nbsp;
- **Sass/Emotion conversion process**
- [ ] Converted all global Sass vars/mixins to JS (e.g. `$euiSize` to `euiTheme.size.base`)
- [ ] Removed or converted component-specific Sass vars/mixins to exported JS versions, listed removals in changelog, and ran `yarn compile-scss` to update [JSON files](https://github.com/elastic/eui/tree/main/src-docs/src/views/theme/_json)
- [ ] Simplified `calc()` to `mathWithUnits` if possible (if mixing different unit types, this may not be possible)
- [ ] Added an `@warn` deprecation message within the `global_styling/mixins/{component}.scss` file
- [ ] Removed component from `src/components/index.scss`
- [ ] Deleted any `src/amsterdam/overrides/{component}.scss` files (styles within should have been converted to the baseline Emotion styles)
&nbsp;
- **CSS tech debt**
- [ ] Reduced specificity where possible (usually by reducing nesting and class name chaining)
- [ ] Wrapped all animations or transitions in `euiCanAnimate`
- [ ] Used `gap` property to add margin between items if using flex
- [ ] Converted side specific padding, margin, and position to `-inline` and `-block` [logical properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Logical_Properties) (check inline styles as well as CSS)
&nbsp;
- **DOM cleanup**
- [ ] Did **not** remove any block/element classNames (e.g. `euiComponent`, `euiComponent__child`)
- [ ] Deleted any modifier classNames or maps if not being used in Kibana. **Before doing this step**:
    - [ ] Search/grep through Kibana's codebase for `{euiComponent}-` (case sensitive) to check for source code usage of modifier classes
    - [ ] If usages exist, consider converting to a `data` attribute so that consumers still have something to hook into
&nbsp;
- **Kibana due diligence**
- Pre-emptively check how your conversion will impact the next Kibana upgrade. This entails searching/grepping through Kibana (excluding `**/target, **/*.snap, **/*.storyshot` for less noise) for `eui{Component}` (case sensitive) to find:
- [ ] Any test/query selectors that will need to be updated
- [ ] Any Sass or CSS that will need to be updated, particularly if a component Sass var was deleted
- [ ] Any direct className usages that will need to be refactored (e.g. someone calling the `euiBadge` class on a div instead of simply using the `EuiBadge` component)
&nbsp;
- **Extras/nice-to-have**
- [ ] Documentation pass:
    - [ ] Converted any remaining `.js` docs files to TS
    - [ ] Misc cleanup of docs code (e.g. combine imports to single `from '../src'`, replace `<React.Fragment>` with `<>`)
- [ ] Check for issues in the backlog that could be a quick fix for that component
- [ ] Optional component/code cleanup: consider splitting up the component into multiple children if it's overly verbose or difficult to reason about
