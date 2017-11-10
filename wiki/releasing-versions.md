# Release process

## Preparing for a release

When preparing a release, make sure to move the [`CHANGELOG.md`](CHANGELOG.md) changes listed under `master` into a new section titled with the new version number, and link to the `git` tag on GitHub. Come up with a title for the new version, alluding to the major changes since the previous release. Like so:

```markdown
# [`0.0.1`](https://github.com/elastic/eui/tree/v0.0.1) Initial Release
```

## Example

Say you're preparing to release a minor change and the version is currently `0.0.1`. Let's assume that the `CHANGELOG.md` file currently looks like this:

```markdown
# [`master`](https://github.com/elastic/eui/tree/master)

- Fixed an issue where the `wrapText` prop of `<EuiTableRowCell>` wasn't working
- Introduced `<EuiDraggable>` component and documentation
- Improved performance by relying on system fonts, instead of web fonts

# [`0.0.1`](https://github.com/elastic/eui/tree/v0.0.1) Initial Release

- Initial public release
```

We want to release what's in `master` under a new minor version (from `0.0.1`, that's `0.1.0`). Thus, we'll add a new headline for the changes that are currently in `master`, and a note about how `master` is now in sync with the latest release.

```diff
 # [`master`](https://github.com/elastic/eui/tree/master)
+
+No public interface changes since `0.1.0`.
+
+# [`0.1.0`](https://github.com/elastic/eui/tree/v0.1.0)
 
 - Fixed an issue where the `wrapText` prop of `<EuiTableRowCell>` wasn't working
 - Introduced `<EuiDraggable>` component and documentation
 - Improved performance by relying on system fonts, instead of web fonts
 
 # [`0.0.1`](https://github.com/elastic/eui/tree/v0.0.1) Initial Release
 
 - Initial public release
```

Don't worry about the fact that a `v0.1.0` tag doesn't exist in `git` yet. It will be created for us when [releasing](#releasing) the new version by following the steps described in the next section.

Commit your updates to `CHANGELOG.md` before proceeding with the release.

## Releasing

Once you're ready to ship a new release, run the following command. This command will make sure to run tests, update the [documentation site][docs], bump the version patch number (`MAJOR.MINOR.PATCH`), create a new tag on `git`, upload it to GitHub, and ship the new version to `npm`.

```shell
npm run release
```

If you want to bump the minor or major version numbers, just add a `BUMP` environment variable to the command, as shown below:

```shell
BUMP=patch npm run release # default
BUMP=minor npm run release
BUMP=major npm run release
```

That's it. The latest changes were published to GitHub, a new `git` tag now exists on GitHub, the new release can be installed from `npm`, and the [documentation site][docs] will update momentarily<sup>\*</sup>.

<sup>_\* GitHub Pages sites are cached aggressively and can sometimes take a couple of minutes to update._</sup>

[docs]: https://elastic.github.io/eui/
