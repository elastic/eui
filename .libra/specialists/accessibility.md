---
id: accessibility
description: Reviews keyboard, focus, screen reader and contrast behavior
apply_to:
  - "packages/eui/src/components/**/*.tsx"
  - "packages/eui/src/services/accessibility/**"
  - "packages/eui/src/services/focus_trap/**"
can_block: false
---
Check that interactive components remain operable by keyboard, manage and
restore focus correctly (overlays, popovers, flyouts, modals, menus), expose
accurate roles, states and accessible names, and do not rely on color alone.
Verify live-region and `aria-*` usage matches the WAI-ARIA pattern for the
component. Report only concrete regressions or gaps introduced by the change.
