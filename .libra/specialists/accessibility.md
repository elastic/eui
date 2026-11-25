---
id: accessibility
description: Reviews keyboard, focus, screen reader and contrast behavior
apply_to:
  - "packages/eui/src/components/**/*.ts"
  - "packages/eui/src/components/**/*.tsx"
  - "packages/eui/src/services/accessibility/**"
  - "packages/eui/src/services/focus_trap/**"
  - "packages/eui/src/global_styling/mixins/_states.ts"
can_block: false
---
Check keyboard support, focus management and restoration, roles, states,
accessible names and color-only cues. Include high contrast mode. Match the
WAI-ARIA pattern for the component. Flag only regressions this PR introduces.

Only comment on files in `apply_to`.
