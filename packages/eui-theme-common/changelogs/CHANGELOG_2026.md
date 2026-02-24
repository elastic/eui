## [`v8.1.0`](https://github.com/elastic/eui/releases/v8.1.0)

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

## [`v8.0.0`](https://github.com/elastic/eui/releases/v8.0.0)

- Added `textInk` and `textGhost` color tokens for text and icon colors that should always remain dark or light regardless of color mode. ([#9379](https://github.com/elastic/eui/pull/9379))

**Breaking changes**

- Removed `ink` and `ghost` theme tokens. Use `textInk` / `textGhost` for text and icon colors or `plainDark` /`plainLight` for non-text use cases. ([#9379](https://github.com/elastic/eui/pull/9379))
- Removed types from `components.superDatePickerBackgroundSuccees` token ([#9305](https://github.com/elastic/eui/pull/9305))

## [`v7.3.0`](https://github.com/elastic/eui/releases/v7.3.0)

- Added component token `components.tourStepIndicatorInactiveColor` and `components.tourStepIndicatorActiveColor` ([#9271](https://github.com/elastic/eui/pull/9271))

