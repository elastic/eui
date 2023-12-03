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
Log into your NPM account:
```sh
npm login # Will prompt for credentials and 2FA token
npm whoami # Should return your NPM username
```

Ensure you are on the `main` branch, and then start the release process by running the following command:
```sh
git checkout main && npm run release
```

This command ensures that you have the latest `upstream/main` and dependencies, as well as running all tests and then building the `lib` and `dist` distributions formats. Next the recent changes are read from `changelogs/upcoming/` and you will be asked to choose what part of the version to bump.

![bumping a version](https://camo.githubusercontent.com/439b41058aa56f167867c4e118ef5e80c02c962f/68747470733a2f2f642e70722f692f51624b36614a2e676966)

After the version is bumped, the release script automatically updates the most recent changelog with the new release header and collated upcoming changelogs, and then cleans the upcoming changelog directory. The updates are committed to git and tagged, then pushed to your `upstream` branch.

The latest changes have now been pushed to GitHub, a new `git` tag now exists on GitHub, the new release can be installed from `npm`, and the [documentation site][docs] will update momentarily.

(Optional) log out of your NPM account:
```sh
npm logout
npm whoami # Should return an error about not being logged in
```

#### eui.elastic.co

Buildkite automatically deploys our docs to the EUI `Bekitzur` environment. The Buildkite job is started when a new tag is pushed to the `main` branch.

To view the progress of your job or check for errors:

* Log in to Buildkite using Elastic SSO
* Filter jobs by `eui-team`
* Click on `eui-release-deploy-docs`
* Click on the build row that matches your release ( e.g. `v87.2.0` )
* From the build detail view:
  * Click the `Rebuild` button if your job needs to be restarted **or**
  * Click the `.buildkite/scripts/pipelines/pipeline_deploy_docs.sh` row to view logs and environment details

### Tag the release in GitHub

We also update the [release's tag in github](https://github.com/elastic/eui/tags) by _creating a release_ for the version and copying over its _CHANGELOG_ entries. 
* Click the three dot menu on the right side of the latest tag, then click "Create release" from the flyout menu
* Type a lowercase "v" and the tag number into the release name field with no spaces
* Copy the latest year's _CHANGELOG_ entry into the release description. Do not included the linked version header.
* (TODO: screencast this next time to include a GIF here)

## `@elastic/eslint-plugin-eui`

For information on releasing the eslint plugin checkout the readme in [packages/eslint-plugin/README.md](../../packages/eslint-plugin/README.md)

[docs]: https://eui.elastic.co/#/

# Backport process

In general, we strongly encourage updating to the latest version of EUI to obtain bug fixes, and we do not actively consider backporting fixes to previous major or minor release versions.

As such, backports are typically only released to support Kibana's [upgrade process](./upgrading-kibana.md), typically when we want to avoid pushing larger changes near the feature freeze.


If it's possible to avoid a backport by performing a full release or patch release instead, we generally encourage doing so.

* Identify the target version of EUI to patch (based on [Kibana's package.json](https://github.com/elastic/kibana/blob/main/package.json))
  * in the EUI git repo, checkout the release tag the patch is intended for - e.g., `git checkout v22.3.0`
  * create a new branch from the versioned tag, e.g. `git checkout -b 22.3.0-backport` (the name is not terribly important as the branch should not be pushed up to remote)
* Run `yarn` to ensure you have the correct dependencies for that point in time installed
* Apply the commit(s) with the desired changes
  * If the fixes we backporting are #3369, #3378, #3330, and #3398:
  * We always use squash merges, so each PR has a single commit hash to include
    * For each PR, find the merge commit
    * For example, #3369's merge message is
      ![3369 merge](https://d.pr/i/l002Vu.png)
      giving `797057a` as the commit hash
    * For this release, we have `797057a`, `9ba25c0`, `68080d2`, and `42c7ced`
    * Cherry pick the commit hashes into the backport branch and resolve any conflicts - `git cherry-pick 797057a 9ba25c0 68080d2 42c7ced`
      * Resolve changelog conflicts by taking the base version (`22.3.0`'s side in this example) and adding the cherry-picked entry to the `main` heading
      * You may need to re-run yarn in order to commit changes, if the commit modified dependencies
      * Remember to continue cherry picking with `git cherry-pick --continue` until all commits have been applied
* Start the dev server and check that the intended changes have been properly applied, you don't want to repeat this process to patch the patch - `yarn start`
* Once everything looks correct, it's time to [release](https://github.com/elastic/eui/blob/main/scripts/release.js):
  * `npm run release-backport`
* Update Kibana's `package.json` to point at the newly-released backport, e.g. `"@elastic/eui": "90.0.0-backport.0"`

# Pre-release process

Some changes may be particularly difficult to test in local EUI environments alone, or effects may be so wide-ranging that they should be tested against Kibana's expansive set of CI tests beforehand to catch as many regressions as possible. In those scenarios, we should utilize a release candidate (RC) that we can point to other staging or CI environments for easier testing.

The prerelease process is very similar to the backport process above.

- Check out the latest release:
  - If testing against Kibana specifically, [use the latest EUI version specified in Kibana main's package.json](https://github.com/elastic/kibana/blob/main/package.json#L101) and check out that release, e.g. `git checkout v80.0.0`
  - Otherwise, simply check out the [latest EUI release](https://github.com/elastic/eui/releases), e.g. `git checkout v83.0.0`
  - The purpose of this step (instead of releasing from latest `main`) is to reduce as much noise as possible and ensure you're *only* testing the changes you want to test. This is particularly necessary for Kibana CI testing.
- Apply the commit(s) with the desired changes, e.g. `git cherry-pick [commit-id]`
- Once everything looks correct, it's time to [release](https://github.com/elastic/eui/blob/main/scripts/release.js):
  * `npm run release-rc`
- Go to https://www.npmjs.com/package/@elastic/eui?activeTab=versions and confirm that your pre-release has been pushed up with the correct version and tag, e.g. `83.1.1-rc.0`
- Update Kibana or CodeSandbox (or whatever other environment you are using to test) to point at that version
- QA away!
