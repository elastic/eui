---
id: styles-theming
description: Reviews Emotion styles, tokens and theme compatibility
apply_to:
  - "**/*.styles.ts"
  - "**/*.styles.tsx"
  - "packages/eui/src/global_styling/**"
  - "packages/eui-theme-borealis/**"
  - "packages/eui-theme-common/**"
can_block: false
---
Check that styles use theme tokens and EUI mixins/functions instead of
hard-coded values, work in light and dark color modes, in high contrast mode
(`highContrastMode`) and in every shipped theme, respect `prefers-reduced-motion`, and keep style generation memoized
(`useEuiMemoizedStyles`) rather than recomputed each render. Flag SCSS or
global CSS additions that should be Emotion, and selector or specificity
changes that could break consumers' overrides.
