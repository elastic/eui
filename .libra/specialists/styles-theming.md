---
id: styles-theming
description: Reviews Emotion styles, tokens and theme compatibility
apply_to:
  - "**/*.styles.ts"
  - "**/*.styles.tsx"
  - "packages/eui/src/global_styling/**"
  - "packages/eui-theme-borealis/**"
  - "packages/eui-theme-common/**"
  - "packages/eui/src/**/*.scss"
  - "packages/eui/src/**/*.css"
can_block: false
---
Check that styles use theme tokens and EUI mixins, not hard-coded values. They
must work in light, dark and high contrast modes and every shipped theme.
Respect `prefers-reduced-motion`. Use `useEuiMemoizedStyles`. Flag new SCSS or
global CSS, and selector or specificity changes that break consumer overrides.

Only comment on files in `apply_to`.
