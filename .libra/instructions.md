# EUI review instructions

EUI is a React/Emotion component library consumed by Kibana and other Elastic
products. Small changes can have a large downstream impact, so weigh
consumer-facing regressions most heavily. Follow the `wiki/` directory where it
conflicts with other guidance.

Some guidance in `AGENTS.md` (for example, which contributors may open PRs)
addresses agents that author changes, not reviewers. Do not flag a PR because of
who opened it or which issue it references.

## What to prioritize

- Breaking changes to the public API (props, exports, CSS variables, tokens,
  default values, DOM structure and class names relied on by consumers) that are
  not called out in the PR's "API Changes" table or changelog.
- Accessibility regressions: keyboard support, focus management, ARIA
  roles/labels, and color contrast, in light and dark modes and in high
  contrast mode (`highContrastMode`).
- Behavior bugs in shared components (overlays, popovers, flyouts, data grid,
  form controls) including SSR safety and `ref` / `...rest` prop forwarding.
- Missing unit tests for changed behavior.

## What to skip

- Formatting; Prettier enforces it. Import order is not enforced anywhere, so do
  not flag it either.
- Stylistic preferences not backed by the wiki.
- Documentation-only wording nits in `packages/website/` and `wiki/` unless
  the text is factually wrong.

## Conventions to enforce

- Styles use Emotion `*.styles.ts` files with theme tokens (`useEuiTheme`),
  not hard-coded colors, sizes or SCSS.
- Changelog entries under `packages/*/changelogs/upcoming/` must describe the
  consumer-visible change accurately. CI already checks that an entry exists,
  so do not flag a missing one.
