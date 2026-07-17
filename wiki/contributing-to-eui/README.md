# Contributing to EUI

🙌 Thanks for your interest in contributing to EUI! 🙌

We welcome and encourage contributions.

However, because EUI has a large footprint in Elastic products, we must maintain a high standard of quality and due diligence for contributions. The guidance below outlines our expectations. **While we'd hate to turn away any contribution, PRs that deviate from this guidance will most likely be rejected.**
****
## Who can contribute

- **Elastic employees** — EUI is built primarily for Elastic products; maintainers prioritize internal roadmap work first. If your need isn't currently a priority, feel free to contribute the solution yourself.
- **Community** — Outside contributions are welcome and merged on a **best-effort** basis.

## What to contribute

- **Bug fixes** — Especially clear, scoped fixes for reproducible issues.
- **[Help wanted](https://github.com/elastic/eui/issues?q=is%3Aopen+is%3Aissue+label%3A%22help+wanted%22)** — Issues with this label are meant for community pickup: we’ve checked that they fit our roadmap and aren’t blocked on private internal planning.

## What not to contribute

Unless agreed upon previously:

- **Large or core roadmap work** — Often handled internally so architecture, accessibility, and downstream coordination stay aligned.
- **Style or design changes** — These require alignment with design teams at Elastic.
- **High-impact changes** - Even small code changes can have a large impact on Kibana, requiring significant testing and review.

## How to contribute

- **Comment before you start** — Note your intent on the issue to avoid duplicate work. We don’t assign issues to community members by policy.
- **No matching issue yet?** **[Open one](https://github.com/elastic/eui/issues/new)** first so maintainers can scope the change before you invest in a PR.

## Typical change flow

A typical contribution moves through these steps:

1. **Set up locally** — see [Running EUI locally](./running-eui-locally.md).
2. **Make your changes** — follow the [Developing](./developing/README.md) guidelines for component structure, props, refs, icons, and Emotion styles.
3. **Update docs** — add or update the corresponding page in `packages/website` per [Documenting](./documenting/README.md).
4. **Write tests** — at minimum unit tests; see [Testing](./testing/README.md) for the full stack.
5. **Add a changelog** — see [Changelogs](./documenting/changelogs.md) for when one is required.
6. **Verify locally** — run lint and the relevant test commands (see [Verifying your change](#verifying-your-change)).
7. **Open a PR** — fill in the [PR template](/.github/pull_request_template.md) and add any [labels](#pr-labels) that apply.

## Naming at a glance

EUI uses different naming conventions for different artifacts. Full details live in the linked docs:

| Artifact | Convention | Defined in |
| --- | --- | --- |
| Component source folders & files | `snake_case` | [Creating component files](./developing/creating-component-files.md) |
| Component class/function name | `EuiPascalCase` | [Creating component files](./developing/creating-component-files.md) |
| Doc page paths (Docusaurus URLs) | `kebab-case` | [Writing documentation](./documenting/writing-documentation.md) |
| Doc page & section titles | Sentence case | [Documenting](./documenting/README.md) |
| Component references in prose | `<strong>EuiFoo</strong>` (with `Eui` prefix) | [Documenting](./documenting/README.md) |
| Commit / PR title | `[Component] Short description` | [Commit messages](#commit-messages) |

## Pull requests

- **Use this wiki** — [Developing](./developing/README.md), [Documenting](./documenting/README.md), [Testing](./testing/README.md).
- **Keep PRs small** — Prefer **[atomic commits and focused PRs](https://learning-notes.mistermicheels.com/processes-techniques/small-commits-pull-requests/)** (one concern per commit and per PR when you can).
- **Review timing** — We aim to respond within **about a week**.
- **Concurrency** — Please limit open PRs so review stays focused.
- **Due diligence** — Follow the [PR template](/.github/pull_request_template.md) (summary, impact, screenshots, checklists, QA notes).
- **Reviewers** — Code ownership is defined in [`CODEOWNERS`](/CODEOWNERS); the right teams will be auto-requested based on the paths you touch.
- **Draft PRs** — We don’t review drafts by default. When you want feedback or help, **comment and ping `@eui-team`** (same idea as the note at the top of the PR template).

## Commit messages

We do not enforce a commit naming convention but it's customary to use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/).

PRs typically follow the pattern: `[ComponentName] Short description (#PR)`, e.g. `[EuiBanner] Adjust additional content spacing`. When merging, we squash all commits and the `main` commit message is the PR title. The `(#PR)` suffix is appended automatically.

## PR labels

A few labels carry behavior beyond categorization:

- `skip-changelog` — bypasses the CI changelog check for all packages. See [Changelogs](./documenting/changelogs.md) for when this is acceptable.
- `skip-changelog-<package-name>` — bypasses the check for a single package only (e.g. `skip-changelog-eslint-plugin-eui`).
- `breaking change` — required for PRs introducing breaking changes; triggers an automated comment with extra due-diligence steps for the Kibana upgrade.

## Verifying your change

From `packages/eui` (unless noted):

- `yarn lint` — ESLint + type checking
- `yarn test-unit` — Jest unit tests (add `--watch` while iterating)
- `yarn test-cypress` — Cypress component tests
- A changelog entry in `packages/eui/changelogs/upcoming/<PR>.md` for any user-facing change — see the [changelog guide](./documenting/changelogs.md)

## Stale PRs

Inactive PRs (~**3 months**) may be closed by GitHub’s **[stale workflow](https://github.com/actions/stale)**.

- If **we** owe review, ping us to get things moving again.
- If **you** owed changes and the PR auto-closed, we may push to your branch or close it and continue in a new PR based on your work.
