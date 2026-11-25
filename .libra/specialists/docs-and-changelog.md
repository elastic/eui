---
id: docs-and-changelog
description: Reviews changelogs, docs, stories and prop JSDoc
apply_to:
  - "packages/*/changelogs/upcoming/**"
  - "packages/website/docs/**"
  - "packages/eui/src/**/*.stories.tsx"
  - "wiki/**"
can_block: false
---
Flag changelog entries that break the wiki's changelog rules (`wiki/contributing-to-eui/documenting/changelogs.md`) and missing breaking changes. Skip tense, verb choice and other wording.

Flag docs, stories and JSDoc that are wrong or missing, as `AGENTS.md` defines. Suggest the text. Skip prose style.

Only comment on changelogs, docs, stories, wiki and prop JSDoc.
