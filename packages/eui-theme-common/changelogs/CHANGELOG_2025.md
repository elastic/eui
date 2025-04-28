## [`v1.0.0`](https://github.com/elastic/eui/releases/v1.0.0)

- Added `severity` key on `_EuiThemeConstantColors` to support tokens on `colors.severity` ([#8601](https://github.com/elastic/eui/pull/8601))
- Added type for semantic severity color tokens ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.severity.unknown` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.severity.neutral` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.severity.success` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.severity.warning` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.severity.risk` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.severity.danger` ([#8601](https://github.com/elastic/eui/pull/8601))
- Added types for semantic color tokens for variants `neutral` and `risk`: ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.textNeutral` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.textRisk` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.backgroundBaseNeutral` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.backgroundBaseRisk` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.backgroundLightNeutral` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.backgroundLightRisk` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.backgroundFilledNeutral` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.backgroundFilledRisk` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.borderBaseNeutral` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.borderBaseRisk` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.borderStrongNeutral` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.borderStrongRisk` ([#8601](https://github.com/elastic/eui/pull/8601))
- Added types for button component tokens for variants `neutral` and `risk`: ([#8601](https://github.com/elastic/eui/pull/8601))
    - `components.buttons.backgroundNeutral` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `components.buttons.backgroundRisk` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `components.buttons.backgroundFilledNeutral` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `components.buttons.backgroundFilledRisk` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `components.buttons.backgroundEmptyNeutralHover` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `components.buttons.backgroundEmptyRiskHover` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `components.buttons.textColorNeutral` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `components.buttons.textColorRisk` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `components.buttons.textColorFilledNeutral` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `components.buttons.textColorFilledRisk` ([#8601](https://github.com/elastic/eui/pull/8601))

**Breaking changes**

- Removed types for numbered severity color tokens: ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.vis.euiColorSeverity0` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.vis.euiColorSeverity1` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.vis.euiColorSeverity2` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.vis.euiColorSeverity3` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.vis.euiColorSeverity4` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.vis.euiColorSeverity5` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.vis.euiColorSeverity6` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.vis.euiColorSeverity7` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.vis.euiColorSeverity8` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.vis.euiColorSeverity9` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.vis.euiColorSeverity10` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.vis.euiColorSeverity11` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.vis.euiColorSeverity12` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.vis.euiColorSeverity13` ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.vis.euiColorSeverity14` ([#8601](https://github.com/elastic/eui/pull/8601))

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

