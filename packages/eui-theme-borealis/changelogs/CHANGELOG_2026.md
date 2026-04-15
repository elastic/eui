## [`v7.0.0`](https://github.com/elastic/eui/releases/v7.0.0)

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

## [`v6.2.0`](https://github.com/elastic/eui/releases/v6.2.0)

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

## [`v6.1.0`](https://github.com/elastic/eui/releases/v6.1.0)

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

## [`v6.0.0`](https://github.com/elastic/eui/releases/v6.0.0)

- Added `textInk` and `textGhost` color tokens for text and icon colors that should always remain dark or light regardless of color mode. ([#9379](https://github.com/elastic/eui/pull/9379))

**Breaking changes**

- Removed `ink` and `ghost` theme tokens. Use `textInk` / `textGhost` for text and icon colors or `plainDark` /`plainLight` for non-text use cases. ([#9379](https://github.com/elastic/eui/pull/9379))
- Removed `components.superDatePickerBackgroundSuccees` token ([#9305](https://github.com/elastic/eui/pull/9305))

## [`v5.4.0`](https://github.com/elastic/eui/releases/v5.4.0)

- Updated `badgeBackground` color token value to equal `backgroundFilledText` ([#9306](https://github.com/elastic/eui/pull/9306))

## [`v5.3.0`](https://github.com/elastic/eui/releases/v5.3.0)

- Added component token `components.tourStepIndicatorInactiveColor` and `components.tourStepIndicatorActiveColor` ([#9271](https://github.com/elastic/eui/pull/9271))

