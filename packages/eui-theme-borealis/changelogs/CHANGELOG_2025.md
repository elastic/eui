## [`v3.4.0`](https://github.com/elastic/eui/releases/v3.4.0)

- Updated values for component tokens ([#8983](https://github.com/elastic/eui/pull/8983))
  - `dataGridRowStripesBackgroundHover`
  - `dataGridRowStripesBackgroundStripedHover`
  - `dataGridRowStripesBackgroundSelectHover`
  - `dataGridRowStripesBackgroundHover`
  - `dataGridRowStripesBackgroundStripedHover`

## [`v3.3.2`](https://github.com/elastic/eui/releases/v3.3.2)

**Bug fixes**

- Fixed the syntax of the SCSS variable `$euiColorTransparent` to ensure a valid value ([#8966](https://github.com/elastic/eui/pull/8966))

## [`v3.3.1`](https://github.com/elastic/eui/releases/v3.3.1)

**Bug fixes**

- Updated shared theme SCSS imports to ensure expected results for the SCSS function `lineHeightFromBaseline` ([#8922](https://github.com/elastic/eui/pull/8922))

## [`v3.3.0`](https://github.com/elastic/eui/releases/v3.3.0)

- Added high contrast mode specific color values for `colors.vis` and `colors.severity` tokens in light color mode ([#8800](https://github.com/elastic/eui/pull/8800))
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

## [`v3.2.0`](https://github.com/elastic/eui/releases/v3.2.0)

- Added component tokens: ([#8834](https://github.com/elastic/eui/pull/8834))
  - `dataGridRowBackgroundMarked`
  - `dataGridRowBackgroundMarkedHover`
  - `dataGridRowBorderActive`
  - `dataGridRowBorderHover`
  - `dataGridRowBorderMarked`
  - `tableRowBackgroundMarked`
  - `tableRowBackgroundMarkedHover`

## [`v3.1.0`](https://github.com/elastic/eui/releases/v3.1.0)

- Added new component token `components.forms.codeInlineBackground` ([#8813](https://github.com/elastic/eui/pull/8813))

## [`v3.0.0`](https://github.com/elastic/eui/releases/v3.0.0)

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
- Added semantic tokens:  ([#8769](https://github.com/elastic/eui/pull/8769))
  - `colors.backgroundBaseInteractiveSelectHover`
  - `colors.borderStrongText`
- Added component tokens: ([#8769](https://github.com/elastic/eui/pull/8769))
  - `components.dataGridRowBackground`
  - `components.dataGridRowBackgroundSelectHover`
  - `components.dataGridRowStripesBackground`
  - `components.dataGridRowStripesBackgroundHover`
  - `components.dataGridRowStripesBackgroundStriped`
  - `components.dataGridRowStripesBackgroundStripedHover`
  - `components.dataGridRowStripesBackgroundSelect`
  - `components.dataGridRowStripesBackgroundSelectHover`
- Updated values for tokens: ([#8769](https://github.com/elastic/eui/pull/8769))
  - `components.tableRowBackgroundSelectedHover`
  - `components.tableRowInteractiveBackgroundFocus`

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

## [`v2.0.0`](https://github.com/elastic/eui/releases/v2.0.0)

- Added new tokens on `colors.vis`: ([#8725](https://github.com/elastic/eui/pull/8725))
  -  `euiColorVisNeutral0`
  -  `euiColorVisNeutral1`
  -  `euiColorVisWarning1`
  -  `euiColorVisRisk0`
  -  `euiColorVisRisk1`
- Updated the value of token `colors.vis.euiColorVisWarning0` ([#8725](https://github.com/elastic/eui/pull/8725))

**Bug fixes**

- Fixed missing source map warnings emitted by some bundlers by excluding source maps from being published ([#8764](https://github.com/elastic/eui/pull/8764))
  - To align with `@elastic/eui` and many other popular packages, we made a call to not ship source maps anymore

**Breaking changes**

- Renamed `colors.vis.euiColorVisNeutral0` to `euiColorVisBase0` ([#8725](https://github.com/elastic/eui/pull/8725))

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

