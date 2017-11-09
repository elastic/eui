# Contributing to EUI

🙌 Thanks for your interest in contributing to EUI! 🙌

When creating a new component, refer to the [Component Creation Guidelines][docs-components].

Always remember to update documentation and the changelog in the same PR that contains functional changes. We do this in tandem to prevent our examples from going out of sync with the actual components. In this sense, treat documentation no different than how you would treat tests.

# Changelog style

* Append your changes under the `master` section
* Add a list item for each significant change in the PR: bugs that were fixed, new features, new components, or changes to the public API
* In the list item, always link to any relevant Pull Requests, commit ranges, or individual commits
* Add a short summary of what has changed, making sure it's informative to consumers who might be unaware of implementation details
* Avoid documenting internal implementation changes that don't have an effect on the public interface

# Preparing for a release

When preparing a release, make sure to move the `CHANGELOG.md` changes listed under `master` into a new section titled with the new version number, and link to the `git` tag on GitHub. Come up with a title for the new version, alluding to the major changes since the previous release. Like so:

```markdown
# [`0.0.1`](https://github.com/elastic/eui/tree/v0.0.1) Initial Release
```

# Releasing

Once you're ready to ship a new release, run the following command. This command will make sure to run tests, update the documentation website, bump the version patch number (`MINOR.MAJOR.PATCH`), create a new tag on `git`, upload it to GitHub, and ship the new version to `npm`.

```shell
npm run release
```

If you want to bump the minor or major version numbers, just add a `BUMP` environment variable to the command, as shown below:

```shell
BUMP=patch npm run release # default
BUMP=minor npm run release
BUMP=major npm run release
```

[docs-components]: wiki/creating-components.md
