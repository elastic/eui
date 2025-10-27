## [`v6.0.0`](https://github.com/elastic/eui/releases/v6.0.0)

**Breaking changes**

- Removed `euiTheme.flags.hasGlobalFocusColor` ([#9090](https://github.com/elastic/eui/pull/9090))
- Removed `euiTheme.flags.hasVisColorAdjustment` ([#9090](https://github.com/elastic/eui/pull/9090))
- Removed `hasVisColorAdjustment` argument from `EuiVisColorStore` ([#9090](https://github.com/elastic/eui/pull/9090))
- Removed `euiTheme.flags.buttonVariant` and `euiTheme.flags.formVariant` ([#9090](https://github.com/elastic/eui/pull/9090))
- Removed type for `euiTheme.components.keyPadMenuItemBackgroundDisabledSelect` ([#9090](https://github.com/elastic/eui/pull/9090))
- Removed outdated component-specific mixin SCSS files: ([#9090](https://github.com/elastic/eui/pull/9090))
  - `src/global_styling/mixins/_button.scss`
  - `src/global_styling/mixins/_form.scss`
  - `src/global_styling/mixins/_link.scss`
  - `src/global_styling/mixins/_loading.scss`
  - `src/global_styling/mixins/_panel.scss`
  - `src/global_styling/mixins/_range.scss`

## [`v5.0.0`](https://github.com/elastic/eui/releases/v5.0.0)

- Added `shadowVariant` theme flag ([#9088](https://github.com/elastic/eui/pull/9088))
- Added new types shadow types: ([#9088](https://github.com/elastic/eui/pull/9088))
  - `_EuiThemeShadow`
  - `_EuiThemeShadows`
  - `_EuiThemeShadowLayer`
- Added `formatMultipleBoxShadow` theme function to generate box shadows from `_EuiThemeShadowLayer` definitions ([#9088](https://github.com/elastic/eui/pull/9088))
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

- Removed SCSS shadow variables and mixins (they're available on the themes directly) ([#9088](https://github.com/elastic/eui/pull/9088))
- Updated shadow utility functions (e.g. `euiShadow`) to apply a floating border style in dark mode. This may lead to visual issues with double borders in dark mode when a regular `border` styling is applied. - Use the `options.border` argument on the utils to adjust or remove the floating border as needed. ([#9088](https://github.com/elastic/eui/pull/9088))

## [`v4.0.0`](https://github.com/elastic/eui/releases/v4.0.0)

**Breaking changes**

- Removed obsolete SCSS typography definitions - use the definitions from the themes directly ([#8922](https://github.com/elastic/eui/pull/8922))
  - $euiFontFamily
  - $euiTextScale
  - $euiFontSize
  - $euiFontSizeXS
  - $euiFontSizeS
  - $euiFontSizeM
  - $euiFontSizeL
  - $euiFontSizeXL
  - $euiFontSizeXXL
  - $euiBodyLineHeight
  - $euiTitles
  - convertToRem()
  - lineHeightFromBaseline()

## [`v3.1.0`](https://github.com/elastic/eui/releases/v3.1.0)

**Deprecations**

- Deprecated support for React 16. Please update to a modern version of React or stay on EUI version 106.0.0 if you can't switch right now. ([#8868](https://github.com/elastic/eui/pull/8868))

## [`v3.0.0`](https://github.com/elastic/eui/releases/v3.0.0)

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

**Breaking changes**

- Updated `_EuiThemeColors` type to include `_EuiThemeVisColors` and `_EuiThemeSeverityColors` as `StrictColorModeSwitch` instead of static colors. This requires `vis` and `severity` keys to be defined as part of `LIGHT` and `DARK` color mode objects. ([#8800](https://github.com/elastic/eui/pull/8800))

## [`v2.2.0`](https://github.com/elastic/eui/releases/v2.2.0)

- Added component token types: ([#8834](https://github.com/elastic/eui/pull/8834))
  - `dataGridRowBackgroundMarked`
  - `dataGridRowBackgroundMarkedHover`
  - `dataGridRowBorderActive`
  - `dataGridRowBorderHover`
  - `dataGridRowBorderMarked`
  - `tableRowBackgroundMarked`
  - `tableRowBackgroundMarkedHover`

## [`v2.1.0`](https://github.com/elastic/eui/releases/v2.1.0)

- Added type for `components.forms.codeInlineBackground` ([#8813](https://github.com/elastic/eui/pull/8813))

## [`v2.0.0`](https://github.com/elastic/eui/releases/v2.0.0)

- Added type for tokens: ([#8793](https://github.com/elastic/eui/pull/8793))
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
- Added types for ([#8769](https://github.com/elastic/eui/pull/8769))
  - `colors.backgroundBaseInteractiveSelectHover`
  - `colors.borderStrongText`
  - `components.dataGridRowBackground`
  - `components.dataGridRowBackgroundSelectHover`
  - `components.dataGridRowStripesBackground`
  - `components.dataGridRowStripesBackgroundHover`
  - `components.dataGridRowStripesBackgroundStriped`
  - `components.dataGridRowStripesBackgroundStripedHover`
  - `components.dataGridRowStripesBackgroundSelect`
  - `components.dataGridRowStripesBackgroundSelectHover`

**Breaking changes**

- Removed support for tokens: ([#8793](https://github.com/elastic/eui/pull/8793))
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

## [`v1.2.1`](https://github.com/elastic/eui/releases/v1.2.1)

**Bug fixes**

- Fixed a wrong variable in `getComputed` theme function which prevented high contrast overrides from being applied ([#8742](https://github.com/elastic/eui/pull/8742))

## [`v1.2.0`](https://github.com/elastic/eui/releases/v1.2.0)

- Added new tokens on `colors.vis`: ([#8725](https://github.com/elastic/eui/pull/8725))
  -  `euiColorVisBase0`
  -  `euiColorVisNeutral1`
  -  `euiColorVisWarning1`
  -  `euiColorVisRisk0`
  -  `euiColorVisRisk1`

**Bug fixes**

- Fixed missing source map warnings emitted by some bundlers by excluding source maps from being published ([#8764](https://github.com/elastic/eui/pull/8764))
  - To align with `@elastic/eui` and many other popular packages, we made a call to not ship source maps anymore

## [`v1.1.0`](https://github.com/elastic/eui/releases/v1.1.0)

- Added type for token `filterButtonBadgeBackgroundHover` ([#8652](https://github.com/elastic/eui/pull/8652))
- Added support for `buttonVariant` on `_EuiThemeFlags` ([#8595](https://github.com/elastic/eui/pull/8595))
- Added support for new button background component tokens: ([#8595](https://github.com/elastic/eui/pull/8595))
  - `background{color}Hover`
  - `background{color}Active`
  - `backgroundFilled{color}Hover`
  - `backgroundFilled{color}Active`
  - `backgroundEmpty{color}Hover`
  - `backgroundEmpty{color}Active`
- Updated `getTokenName` util making the `variant` argument optional ([#8595](https://github.com/elastic/eui/pull/8595))

## [`v1.0.0`](https://github.com/elastic/eui/releases/v1.0.0)

- Added `severity` key on `_EuiThemeConstantColors` to support tokens on `colors.severity` ([#8601](https://github.com/elastic/eui/pull/8601))
- Added type for semantic severity color tokens ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.severity.unknown`
    - `colors.severity.neutral`
    - `colors.severity.success`
    - `colors.severity.warning`
    - `colors.severity.risk`
    - `colors.severity.danger`
- Added types for semantic color tokens for variants `neutral` and `risk`: ([#8601](https://github.com/elastic/eui/pull/8601))
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
- Added types for button component tokens for variants `neutral` and `risk`: ([#8601](https://github.com/elastic/eui/pull/8601))
    - `components.buttons.backgroundNeutral`
    - `components.buttons.backgroundRisk`
    - `components.buttons.backgroundFilledNeutral`
    - `components.buttons.backgroundFilledRisk`
    - `components.buttons.backgroundEmptyNeutralHover`
    - `components.buttons.backgroundEmptyRiskHover`
    - `components.buttons.textColorNeutral`
    - `components.buttons.textColorRisk`
    - `components.buttons.textColorFilledNeutral`
    - `components.buttons.textColorFilledRisk`

**Breaking changes**

- Removed types for numbered severity color tokens: ([#8601](https://github.com/elastic/eui/pull/8601))
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

## [`v0.2.0`](https://github.com/elastic/eui/releases/v0.2.0)

- Added support for theme `overrides` as optional part of `EuiThemeShape` ([#8558](https://github.com/elastic/eui/pull/8558))
- Updated `getComputed` to support high contrast mode overrides defined on `overrides.HCM` ([#8558](https://github.com/elastic/eui/pull/8558))

## [`v0.1.0`](https://github.com/elastic/eui/releases/v0.1.0)

- Removed type `EuiShadowCustomColor` ([#8444](https://github.com/elastic/eui/pull/8444))
- Added types:  ([#8444](https://github.com/elastic/eui/pull/8444))
  - `EuiShadowOptions`
  - `EuiThemeHighContrastModeProp`
  - `EuiThemeHighContrastMode`
- Updated shadow utils to accepts a second `options` argument and return borders in high contrast mode: ([#8444](https://github.com/elastic/eui/pull/8444))
  - `euiShadow`
  - `euiShadowXSmall`
  - `euiShadowSmall`
  - `euiShadowMedium`
  - `euiShadowLarge`
  - `euiSlightShadowHover`
  - `euiShadowFlat`

