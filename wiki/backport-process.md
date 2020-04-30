# EUI backport patches

In general, we strongly encourage updating to the latest version of EUI to obtain bug fixes, and we do not actively consider backporting fixes to previous major or minor release versions. The exception to this is when supporting Kibana's release process, as we want to avoid pushing larger changes near the feature freeze.

### Tracking issue

When preparing for a backport a GitHub issue should be created in EUI referencing the relevant issues and/or PRs to be included - see https://github.com/elastic/eui/issues/3386 as an example. This issue is used to keep track of the patch's completion progress and to ensure the desired changes are included in the release.

### Patch process

This provides a walkthrough of the patching & backport release process; examples are taken from the release of v22.3.1 based on https://github.com/elastic/eui/issues/3386

* Update your local repo's knowledge of commits so they can be referenced - `git checkout master && git pull`
* Identify the target version of EUI to patch; GH issue says the new version should be `22.3.1` and I confirmed the patch's base is `22.3.0`
  * in the EUI git repo, checkout the release tag the patch is intended for - `git checkout v22.3.0`
  * create a new branch from the versioned tag, the name is unimportant but I use the target version without a leading `v` - `git checkout -b 22.3.1`
* Run `yarn` to ensure you have the correct dependencies for that point in time installed
* Apply the commit(s) with the desired changes
  * GH issue references #3369, #3378, #3330, and #3398
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
        * `npm publish --otp=your-one-time-password`
* Update `master`'s changelog to include this release
    * On the branch you used to build & release, copy the relevant changelog section - e.g. contents of `## [`22.3.1`](https://github.com/elastic/eui/tree/v22.3.1)`
    * Checkoug `master` - `git checkout master`
    * Paste the changelog section at the correct location in _CHANGELOG.md_
        * Include an extra line at the top of this section describing it as a backport, e.g. **Note: this release is a backport containing changes originally made in `23.0.0`, `23.1.0`, and `23.2.0`**
    * Commit the changelog entry to master and push - `git commit -anm "changelog" && git push`
* Let people know the backport is released
* Celebrate profusely
