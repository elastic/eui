# Release process

_**Before you get started**_

- npm
  - requires membership in the @elastic organization
  - npm requires a Publish [access token configured](https://docs.npmjs.com/about-access-tokens) which can be generated and added to your [`${HOME}/.npmrc`](https://docs.npmjs.com/cli/v7/configuring-npm/npmrc#per-user-config-file) by running `npm login` from the command line. 
  - the release script will ask for your npm one-time passcode
- git/github
  - the release script assumes your origin for the [EUI root repo](https://github.com/elastic/eui) is labelled `upstream`
  - if you have 2FA enabled, you may be prompted for an [OTP or other token](https://github.com/settings/tokens)

### Releasing `@elastic/eui`

The release process is started by running the following command.

```shell
npm run release
```

This command runs all tests and then builds the `lib` and `dist` distributions formats. Next the recent changes are read from `CHANGELOG.md` and you will be asked to choose what part of the version to bump.

![bumping a version](https://camo.githubusercontent.com/439b41058aa56f167867c4e118ef5e80c02c962f/68747470733a2f2f642e70722f692f51624b36614a2e676966)

After the version is bumped, the release script automatically updates `CHANGELOG.md` to note that the recent changes are now part of a release. The updates are committed to git and tagged, then pushed to your `upstream` branch.

The latest changes have now been pushed to GitHub, a new `git` tag now exists on GitHub, the new release can be installed from `npm`, and the [documentation site][docs] will update momentarily<sup>\*</sup>.

<sup>_\* GitHub Pages sites are cached aggressively and can sometimes take a couple of minutes to update._</sup>

### Tag the release in GitHub

We also update the [release's tag in github](https://github.com/elastic/eui/tags) by _creating a release_ for the version and copying over its _CHANGELOG.md_ entries. (TODO: screencast this next time to include a GIF here)

## `@elastic/eslint-plugin-eui`

For information on releasing the eslint plugin checkout the readme in [packages/eslint-plugin/README.md](../packages/eslint-plugin/README.md)

[docs]: https://elastic.github.io/eui/

# Backport process

In general, we strongly encourage updating to the latest version of EUI to obtain bug fixes, and we do not actively consider backporting fixes to previous major or minor release versions. The exception to this is when supporting Kibana's release process, as we want to avoid pushing larger changes near the feature freeze.

### Tracking issue

When preparing for a backport a GitHub issue should be created in EUI referencing the relevant issues and/or PRs to be included - see https://github.com/elastic/eui/issues/3386 as an example. This issue is used to keep track of the patch's completion progress and to ensure the desired changes are included in the release.

### Patch process

This provides a walkthrough of the patching & backport release process; examples are taken from the release of v22.3.1 based on https://github.com/elastic/eui/issues/3386

* Unless it is unreasonable, begin by performing a full release from the `master` branch. This ensures the changelog is prepared for referencing later by the backport, and pulls in all commits that will be used by the backport.
  * Switch to `master` - `git checkout master`
  * Run the release script and follow the prompts - `npm run release`
* Identify the target version of EUI to patch; GitHub issue says the new version should be `22.3.1` and I confirmed the patch's base is `22.3.0`
  * in the EUI git repo, checkout the release tag the patch is intended for - `git checkout v22.3.0`
  * create a new branch from the versioned tag, the name is unimportant but I use the target version without a leading `v` - `git checkout -b 22.3.1`
* Run `yarn` to ensure you have the correct dependencies for that point in time installed
* Apply the commit(s) with the desired changes
  * GitHub issue references #3369, #3378, #3330, and #3398
  * We always use squash merges, so each PR has a single commit hash to include
    * For each PR, find the merge commit
    * For example, #3369's merge message is
      ![3369 merge](https://d.pr/i/l002Vu.png)
      giving `797057a` as the commit hash
    * For this release, we have `797057a`, `9ba25c0`, `68080d2`, and `42c7ced`
    * Cherry pick the commit hashes into the backport branch and resolve any conflicts - `git cherry-pick 797057a 9ba25c0 68080d2 42c7ced`
      * Resolve changelog conflicts by taking the base version (`22.3.0`'s side in this example) and adding the cherry-picked entry to the `master` heading
      * You may need to re-run yarn in order to commit changes, if the commit modified dependencies
      * Remember to continue cherry picking with `git cherry-pick --continue` until all commits have been applied
* Start the dev server and check that the intended changes have been properly applied, you don't want to repeat this process to patch the patch - `yarn start`
* Once everything looks correct, it's time to release; the `yarn release` script only works when releasing from `master`, so we'll run [a subset of those steps](https://github.com/elastic/eui/blob/06fc9a6880766168aec1a622873e7f6fe1b3d42b/scripts/release.js#L34-L57) manually
  * Run the unit tests again - `npm test`
  * Create the release builds - `npm run build`
  * Update the I18n tokens - `npm run update-token-changelog -- patch`
  * Use npm to update package.json & package-lock.json version, git commit, and git tag - `npm version patch`
  * Push the version commit & tag to upstream - `git push upstream --tags`
  * Publish the new version to npm
    * Get your npm One Time Password (OTP) from Google Authenticator, Authy, etc
    * Publish with your OPT and the new version as the tag - `npm publish --tag=22.3.1 --otp=your-one-time-password`
* Update `master`'s changelog to include this release
  * On the branch you used to build & release, copy the relevant changelog section - e.g. contents of `## [`22.3.1`](https://github.com/elastic/eui/tree/v22.3.1)`
  * Checkout `master` - `git checkout master`
  * Paste the changelog section at the correct location in _CHANGELOG.md_
    * Include an extra line at the top of this section describing it as a backport, e.g. **Note: this release is a backport containing changes originally made in `23.0.0`, `23.1.0`, and `23.2.0`**
  * Commit the changelog entry to master and push - `git commit -anm "changelog" && git push`
* Let people know the backport is released
* Celebrate profusely
