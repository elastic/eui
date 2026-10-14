# EUI review instructions

EUI is a React/Emotion component library consumed by Kibana and other Elastic
products. Small changes can have a large downstream impact, so weigh
consumer-facing regressions most heavily. Repository-wide guidance lives in
`AGENTS.md` and the `wiki/` directory; follow the wiki when it conflicts.

## What to prioritize

- Breaking changes to the public API (props, exports, CSS variables, tokens,
  default values, DOM structure and class names relied on by consumers) that are
  not called out in the PR's "API Changes" table or changelog.
- Accessibility regressions: keyboard support, focus management, ARIA
  roles/labels, and color contrast, in light and dark modes and in all themes.
- Behavior bugs in shared components (overlays, popovers, flyouts, data grid,
  form controls) including SSR safety and `ref` / `...rest` prop forwarding.
- Missing unit tests for changed behavior.

## What to skip

- Formatting and import order; Prettier and ESLint enforce these.
- Stylistic preferences not backed by the wiki.
- Documentation-only wording nits in `packages/website/` and `wiki/` unless
  the text is factually wrong.

## Conventions to enforce

- Component files use `snake_case`, components use `EuiPascalCase`.
- Styles use Emotion `*.styles.ts` files with theme tokens (`useEuiTheme`),
  not hard-coded colors, sizes or SCSS.
- Changes under `packages/eui/src/` need a `packages/eui/changelogs/upcoming/<PR number>.md`
  entry (past tense, consumer-focused), unless the PR has the `skip-changelog` label.
- New or changed public props need docs in `packages/website` and a Storybook story.
- PR titles use `[Component] Short description`.
