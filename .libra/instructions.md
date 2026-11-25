# EUI review instructions

EUI is a React component library used by Kibana, Cloud UI and other Elastic products. Small changes can break them.

Judge PRs by EUI's conventions in `wiki/` and `AGENTS.md`, not general best practice. Don't argue them in findings or replies.

Don't comment on who opened a PR or which issue it links. A workflow handles that.

Don't reply to maintainers. Their response is final.

Don't post security vulnerabilities in PR comments. They go through separate, non-public checks.

## Writing findings

- Follow `Writing` in `AGENTS.md`. Libra's severity replaces the label.
- Write like a reviewer talking to a teammate. Use short, simple sentences.
- Show the evidence, say what's wrong, then say how to fix it.
- Keep it short. Keep proposed text or code short too, but complete.
- One finding per root cause.
- Report P3 findings only for accessibility, missing JSDoc, factually wrong docs or changelogs, and tests that would pass if the code broke. Report everything else at P2 or higher, or drop it.

Example:

> `eui_theme_borealis_light.json` still has the old teal, `#16C5C0`. The build copies this file as is, so consumers get the old color. Update the JSON token files to the new ramp.

## What to flag

1. Breaking changes missing from the changelog. The `public-api` specialist defines what constitutes a breaking change.
2. Kibana and Cloud UI impact, only for breaking changes and the changes `AGENTS.md` lists. Say if Kibana needs a prep commit or if a Kibana workaround can go. Don't guess usage.
3. Reverted decisions. Search `packages/*/changelogs/` for the component's name. Flag changes that undo a recent entry.
4. Accessibility regressions.
5. Bugs in shared components: overlays, popovers, flyouts, data grid, forms. Include SSR and `ref` / `...rest` forwarding.
6. Missing JSDoc, stories or docs, as `AGENTS.md` defines. Suggest the text.

## Tests

- In `packages/*/src`, flag tests that would pass if the code broke.
- Ask for new tests only for changed behavior in `packages/*/src` and test helpers (`packages/test-helpers/`).
- Never ask for tests of tooling, CI, workflows or git hooks.

## Skip

- Formatting and import order.
- Unlikely edge cases in tooling.
- Style preferences the wiki doesn't back.
- Wording nits in `packages/website/` and `wiki/`.
