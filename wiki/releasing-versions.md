# Release process

The release process is started by running the following command.

```shell
npm run release
```

This command runs all tests and then builds the `lib` and `dist` distributions formats. Next the recent changes are read from `CHANGELOG.md` and you will be asked to choose what part of the version to bump.

![bumping a version](https://camo.githubusercontent.com/439b41058aa56f167867c4e118ef5e80c02c962f/68747470733a2f2f642e70722f692f51624b36614a2e676966)

After the version is bumped, the release script automatically updates `CHANGELOG.md` to note that the recent changes are now part of a release. The updates are committed to git and tagged, then pushed to your `upstream` branch.

The command will prompt you for your git credentials. If you are using 2FA for git (which you should be) then your git password must be a [one time token](https://github.com/settings/tokens).

That's it. The latest changes were published to GitHub, a new `git` tag now exists on GitHub, the new release can be installed from `npm`, and the [documentation site][docs] will update momentarily<sup>\*</sup>.

<sup>_\* GitHub Pages sites are cached aggressively and can sometimes take a couple of minutes to update._</sup>

## `@elastic/eslint-plugin-eui`

For information on releasing the eslint plugin checkout the readme in [packages/eslint-plugin/README.md](../packages/eslint-plugin/README.md)

[docs]: https://elastic.github.io/eui/
