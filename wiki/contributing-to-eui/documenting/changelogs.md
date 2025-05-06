# Changelogs

All upcoming changelogs should go into the `changelogs/upcoming/` directories. Our release script automatically handles collating these files on new EUI versions.

## When to write a changelog

- Any updates to the `src/` folder should include a changelog
- `dependency` upgrades in `package.json` should contain a changelog

## When to skip a changelog

Changes that do not impact consumers or end-users may use the `skip-changelog` label on PRs to bypass CI checks. Examples of these types of changes:

- Documentation-only changes (e.g. changes to `wiki/` or `packages/website/`)
- Infra/dev-only changes (e.g. changes to `.github/`, `.buildkite/` or `scripts/`)
- Test-only changes (e.g. changes to `*.test.tsx`, `*.spec.tsx`, or `*.stories.tsx` files)
- `dev-dependency` upgrades in `package.json`

## How to write a changelog

* Create a new file with the ID/number of the pull request
  * In `packages/eui`, you can use `yarn yo-changelog #####` (passing the PR ID/number) to automatically generate a changelog boilerplate file
* Create `**` wrapped subheadings for bug fixes, deprecations, or breaking changes. New features/enhancements should go at the top, and do not need a subheading.
* Add a `-` list item for each significant change in the PR. Larger PRs may have multiple changes, whereas smaller PRs may have only one.
* Write your entry in the **past tense**, starting with a verb (e.g. Added... , Fixed...)
* Add a summary of what has changed, making sure it's informative to consumers who might be unaware of implementation details
* Avoid documenting internal implementation changes that don't affect the public interface
