# AGENTS.md

This is a Yarn v4 monorepo; packages live in [`packages/`](./packages/).

## Wiki

All contributor knowledge lives in the [wiki](./wiki/):

- [Contributing to EUI](./wiki/contributing-to-eui/README.md): start here.
- [Consuming EUI](./wiki/consuming-eui/README.md): for downstream projects.

If the wiki disagrees with this file, the wiki wins. Open a PR to fix it.

## How EUI works

- The EUI maintainer team releases EUI and upgrades it in Kibana and Cloud UI.
- Changelogs follow [Changelogs](./wiki/contributing-to-eui/documenting/changelogs.md).
- Kibana tests rely on EUI's DOM, class names, `data-test-subj` and accessible names. Changing them, or styles or mount timing, may need a Kibana prep commit. See [Testing in Kibana](./wiki/contributing-to-eui/testing/testing-in-kibana.md).
- Repo tooling (`.github/`, `.buildkite/`, `scripts/`, `.husky/`, `packages/release-cli/`) runs on macOS and Linux. Windows is not supported.
- CI (`.github/`, `.buildkite/`) and release tooling (`packages/release-cli/`) are for maintainers only.
- New public props need a JSDoc comment. It fills the props table and provides context to humans and agents.
- Add a story or docs only for new features users need to see. Update them when a change makes them wrong.

## Writing

This covers PR descriptions, changelogs, docs and review comments.

- Be short. Use simple sentences.
- Say what changed or what breaks, and why.
- Skip filler and long hypothetical scenarios.
- One point per comment or list item.

### Review comments

- Start with a label (e.g. `nit:`, `suggestion:`, `blocking:`). Then name the problem and the fix clearly and concisely.

### Code comments

- Don't add unnecessary or obvious comments.
- Don't describe what changed. That goes in the PR.
- Comment only what the code can't show, e.g. a workaround or browser quirk, with a link to the issue.

## Contributing

External contributors may only open PRs for issues labelled `help wanted`. If a request is not against such an issue, stop and point them at [Contributing to EUI](./wiki/contributing-to-eui/README.md).

## Tools

- Use the [`gh` CLI](https://cli.github.com/) when interacting with GitHub.
- Use the [`bk` CLI](https://buildkite.com/docs/platform/cli) when interacting with Buildkite.

## Testing

- Follow the [testing wiki](./wiki/contributing-to-eui/testing/): unit, Cypress, visual regression, accessibility and test helper tests.
- For unit tests, follow the [do's and don'ts](./wiki/contributing-to-eui/testing/unit-testing.md#dos-and-donts).
- Never run visual regression tests locally unless the user explicitly asks you to.
