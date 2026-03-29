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

## Pull requests

- **Use this wiki** — [Developing](./developing), [Documenting](./documenting), [Testing](./testing).
- **Keep PRs small** — Prefer **[atomic commits and focused PRs](https://learning-notes.mistermicheels.com/processes-techniques/small-commits-pull-requests/)** (one concern per commit and per PR when you can).
- **Review timing** — We aim to respond within **about a week**.
- **Concurrency** — Please limit open PRs so review stays focused.
- **Due diligence** — Follow the PR template (summary, impact, screenshots, checklists, QA notes).
- **Draft PRs** — We don’t review drafts by default. When you want feedback or help, **comment and ping `@eui-team`** (same idea as the note at the top of the PR template).

## Stale PRs

Inactive PRs (~**3 months**) may be closed by GitHub’s **[stale workflow](https://github.com/actions/stale)**.

- If **we** owe review, ping us to get things moving again.
- If **you** owed changes and the PR auto-closed, we may push to your branch or close it and continue in a new PR based on your work.
