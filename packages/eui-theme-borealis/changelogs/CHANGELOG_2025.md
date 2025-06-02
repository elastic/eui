## [`v1.1.0`](https://github.com/elastic/eui/releases/v1.1.0)

- Added token `filterButtonBadgeBackgroundHover` ([#8652](https://github.com/elastic/eui/pull/8652))
- Updated values for tokens `buttonGroupFocusColor` and `buttonGroupBackgroundDisabledSelected` ([#8652](https://github.com/elastic/eui/pull/8652))
- Added `flags.buttonVariant` with value `refresh` to `euiThemeBorealis` ([#8595](https://github.com/elastic/eui/pull/8595))
- Added new button background component tokens: ([#8595](https://github.com/elastic/eui/pull/8595))
  - `background{color}Hover`
  - `background{color}Active`
  - `backgroundFilled{color}Hover`
  - `backgroundFilled{color}Active`
  - `backgroundEmpty{color}Hover`
  - `backgroundEmpty{color}Active`
- Updated `backgroundLightText` token value to `shade120` ([#8595](https://github.com/elastic/eui/pull/8595))

## [`v1.0.0`](https://github.com/elastic/eui/releases/v1.0.0)

- Added semantic severity color tokens: ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.severity.unknown`
    - `colors.severity.neutral`
    - `colors.severity.success`
    - `colors.severity.warning`
    - `colors.severity.risk`
    - `colors.severity.danger`
- Added semantic color tokens for variants `neutral` and `risk`: ([#8601](https://github.com/elastic/eui/pull/8601))
    - `colors.textNeutral
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
    - `colors.borderStrongRisk
- Added button component tokens for variants `neutral` and `risk`: ([#8601](https://github.com/elastic/eui/pull/8601))
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

**Dependency updates**

- Updated `@elastic/eui-theme-common` from `peer dependencies` to a `dependencies` ([#8606](https://github.com/elastic/eui/pull/8606))

## [`v0.2.0`](https://github.com/elastic/eui/releases/v0.2.0)

- Updated component tokens to use `computed` values to ensure correct inheritance from theme overrides ([#8558](https://github.com/elastic/eui/pull/8558))
- Added `overrides.HCM` to `euiThemeBorealis` to support theme internal overrides ([#8558](https://github.com/elastic/eui/pull/8558))
- Updated `border.radius.medium` token value to `4px` ([#8563](https://github.com/elastic/eui/pull/8563))

## [`v0.1.0`](https://github.com/elastic/eui/releases/v0.1.0)

- Added new component tokens: ([#8444](https://github.com/elastic/eui/pull/8444))
  - `buttonGroupBackgroundDisabledSelected`
  - `overlayMaskBackground`
  - `overlayMaskBackgroundHighContrast`
  - `skeletonBackgroundSkeletonMiddleHighContrast`

