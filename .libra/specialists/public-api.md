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
  - "packages/eui-theme-common/package.json"
  - "packages/eui-theme-borealis/package.json"
  - "packages/docusaurus-theme/src/**"
  - "packages/docusaurus-preset/src/**"
  - "packages/eui/package.json"
  - "packages/test-helpers/src/**"
  - "packages/illustrations/src/**"
  - "packages/eslint-plugin/src/**"
can_block: true
---
Flag breaking changes missing from the changelog's `**Breaking changes**`
section. Past entries show what counts:
- Removed or renamed components, props, prop values, types, exports, icons, tokens, hooks or test helpers.
- Changed defaults.
- Narrowed types, newly required props, or widened types that break existing callbacks.
- Changed targets of `ref`, `className` or `style`.
- DOM, class name or attribute changes that consumers' selectors rely on.
- Changed behavior consumers rely on, e.g. only one tooltip open at a time.
- Added or changed third-party peer dependencies.
- Style changes that break consumer layouts.
- Rules added to or raised to `error` in the recommended ESLint config.

When a replacement exists, the entry says what to use instead. Deprecate before removing. Flag a missing `breaking change` label.

Only comment on files in `apply_to`.
