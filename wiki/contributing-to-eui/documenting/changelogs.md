# Changelogs

## When to write a changelog

Any updates to the `src/` folder require a new [upcoming changelog](../../../upcoming_changelogs/_template.md) file. Our release script handles collating upcoming changelog files into our main [CHANGELOG.md](../../../CHANGELOG.md) on new EUI versions.

## When to skip a changelog

Changes that do not impact consumers or end-users (e.g. documentation-only changes to `wiki/` or `src-docs/`) or infra/dev-only changes (e.g. changes to `.github/` or `scripts/`) do not require a changelog entry. You may use the `skip-changelog` label on your PR to bypass CI checks.

## How to write a changelog

* Create a new file with the ID/number of the pull request
  * You can use `yarn yo-changelog #####` (passing the PR ID/number) to automatically generate a changelog boilerplate file
* Create `**` wrapped subheadings for bug fixes, deprecations, or breaking changes. New features/enhancements should go at the top, and do not need a subheading.
* Add a `-` list item for each significant change in the PR. Larger PRs may have multiple changes, whereas smaller PRs may have only one.
* Write your entry in the **past tense**, starting with a verb (e.g. Added... , Fixed...)
* Add a summary of what has changed, making sure it's informative to consumers who might be unaware of implementation details
* Avoid documenting internal implementation changes that don't affect the public interface
