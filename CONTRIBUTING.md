# Contributing to EUI

🙌 Thanks for your interest in contributing to EUI! 🙌

## New Components, Features, and Bug Fixes

When creating new components, adding new features, or fixing bugs, please refer to the [Component Development guidelines][docs-components]. If there isn't an associated issue on the bug tracker yet, consider creating one so that you get a chance to discuss the changes you have in mind with the rest of the team.

## Documentation

Always remember to update [documentation site][docs] and the [`CHANGELOG.md`](CHANGELOG.md) in the same PR that contains functional changes. We do this in tandem to prevent our examples from going out of sync with the actual components. In this sense, treat documentation no different than how you would treat tests.

Here are our guidelines for updating the `CHANGELOG.md` file:

* Append your changes to the `master` sub-heading of [`CHANGELOG.md`](CHANGELOG.md).
* Add a list item for each significant change in the PR: bugs that were fixed, new features, new components, or changes to the public API
* In the list item, always link to any relevant Pull Requests, commit ranges, or individual commits
* Add a short summary of what has changed, making sure it's informative to consumers who might be unaware of implementation details
* Avoid documenting internal implementation changes that don't have an effect on the public interface

## Software Releases

When we are ready to create a new release, we follow the [Release Process][docs-releases] documentation.

[docs]: https://elastic.github.io/eui/
[docs-components]: wiki/component-development.md
[docs-releases]: wiki/releasing-versions.md
