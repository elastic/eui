---
id: docs-and-changelog
description: Reviews changelog entries, website docs and Storybook coverage
apply_to:
  - "packages/eui/changelogs/upcoming/**"
  - "packages/website/docs/**"
  - "packages/eui/src/**/*.stories.tsx"
  - "wiki/**"
can_block: false
---
Changelog entries must be past tense, start with a verb, describe the
consumer-visible effect, and use `**` subheadings for bug fixes, deprecations
and breaking changes per `packages/eui/changelogs/upcoming/_template.md`.
Docs and stories should reflect new or changed props and use sentence-case
titles and `kebab-case` doc paths. Flag factual errors or examples that would
not work as written; do not nitpick prose.
