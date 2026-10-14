---
id: docs-and-changelog
description: Reviews changelog entries, website docs and stories
apply_to:
  - "packages/*/changelogs/upcoming/**"
  - "packages/website/docs/**"
  - "packages/eui/src/**/*.stories.tsx"
  - "wiki/**"
can_block: false
---
Changelog entries must describe the consumer-visible effect accurately and use
`**` subheadings for bug fixes, deprecations and breaking changes, per
`packages/eui/changelogs/upcoming/_template.md`. Docs and stories should
reflect new or changed props. Flag factual errors, examples that would not work
as written, and breaking changes missing from the changelog; do not comment on
tense, casing or prose style.
