# EUI review instructions

EUI is a React component library used by Kibana, Cloud UI and other Elastic products. Small changes can break them.

Judge PRs by EUI's conventions in `wiki/` and `AGENTS.md`, not general best practice. Don't argue them in findings or replies.

Don't comment on who opened a PR or which issue it links. A workflow handles that.

Don't post security vulnerabilities in PR comments. They go through separate, non-public checks.

## Writing findings

Every finding uses this format. Write the label, `evidence:` and `fix:` in lowercase bold, as shown. No other prose.

```
**<label>:** <what is wrong, one sentence, naming the file, token or prop>.

**evidence:** <the code, values or links that prove it>.

**fix:** <one exact change>.
```

Start every finding with exactly one of these labels. Use no other label.

- `blocking:` you traced the code and it breaks for a real caller in EUI, Kibana or Cloud UI.
- `non-blocking issue:` you traced the code and it is wrong, but it doesn't break callers.
- `double-check:` the change may break Kibana or Cloud UI, but you couldn't confirm it. Name what changed and how to verify it, e.g. a Kibana CI run.

Evidence:

- Quote the line or link to it. For computed claims (contrast ratios, sizes, counts), show the inputs and the result, e.g. `textDisabled` = `#8E9FBC` on `#FFFFFF` = 2.9:1. Resolve each token to its value from the theme file.
- If you can't show the evidence, drop the finding.

Fix:

- Give one fix, not a list of options. Use a code `suggestion` block when the fix fits in a few lines.
- A `suggestion` block replaces exactly the lines the finding points to. Point the finding at those lines and include all of them in the block. Otherwise, use a plain code block.
- No "consider", "might" or "you may want to".

Other rules:

- Max 3 sentences outside code blocks.
- One finding per root cause.
- Rate bugs a user, consumer or contributor can hit with normal usage at P2 or higher, including accessibility regressions. This overrides the P3 rule below. `Skip` still applies.
- Report P3 findings only for accessibility, missing JSDoc, factually wrong docs or changelogs, and tests that would pass if the code broke. Report everything else at P2 or higher, or drop it.

Example, from #10393:

> **non-blocking issue:** the `gh pr comment` body in `contribution_triage.yml` loses the label name.
>
> **evidence:** the body is in double quotes, so Bash runs `` `libra-review` `` as a command, fails with `libra-review: command not found`, and the comment says "add the  label".
>
> **fix:** escape the backticks: `` \`libra-review\` ``.

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
- Never ask for type-only tests, e.g. `@ts-expect-error` checks on prop types.

## Skip

- Formatting and import order.
- Unlikely edge cases in tooling.
- Internal Storybook tools in `packages/eui/.storybook/`, unless they break Storybook.
- Hypothetical consumer scenarios ("if a consumer does X..."). Report the risky change as `double-check:` instead.
- Style preferences the wiki doesn't back.
- Wording nits in `packages/website/` and `wiki/`.
