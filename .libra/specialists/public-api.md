---
id: public-api
description: Reviews changes to EUI's public API surface and consumer compatibility
apply_to:
  - "packages/eui/src/components/**/*.ts"
  - "packages/eui/src/components/**/*.tsx"
  - "packages/eui/src/services/**"
  - "packages/eui/src/utils/**"
  - "packages/eui/src/global_styling/**"
  - "packages/eui/src/index.ts"
  - "packages/eui-theme-common/src/**"
  - "packages/eui-theme-borealis/src/**"
can_block: true
---
Review for breaking changes to what Kibana and other consumers depend on:
removed or renamed props, exports, tokens or CSS variables; changed defaults;
narrowed or broadened TypeScript types; changed DOM output or class names;
props not forwarded (`...rest`, `ref`, `data-test-subj`, `className`).
A breaking change is acceptable only when the PR documents it and ships a
changelog entry; flag it otherwise. Prefer additive, deprecated-then-removed
paths over silent behavior changes.
