# Upgrading EUI in Kibana

1. [Getting started](#getting-started)
2. [Opening a draft PR to kick off CI](#opening-a-draft-pr-to-kick-off-ci)
3. [Resolving errors](#resolving-errors)
    * [Snafus requiring backports](#snafu)
4. [Merging the PR](#merging-the-pr)
    * [FAQ for Kibana teams](#faq-for-kibana-teams)

## Getting started

### Upgrading

1. Start a new branch off the `main` branch in the Kibana repo
2. Change the `@elastic/eui` entry in [`package.json`](https://github.com/elastic/kibana/blob/main/package.json) to the target version
3. Change the `@elastic/eui@` entry in [`src/dev/license_checker/config.ts`](https://github.com/elastic/kibana/blob/main/src/dev/license_checker/config.ts) to the target version
4. Run `yarn kbn bootstrap`
5. Commit all changed files, including `yarn.lock`

### i18n updates

Check whether the target version upgrade range [contains i18n token changes](https://github.com/elastic/eui/blob/main/i18ntokens_changelog.json).

If changes exist:

1. Manually update [`i18n_eui_mapping.tsx`](https://github.com/elastic/kibana/blob/main/packages/core/i18n/core-i18n-browser-internal/src/i18n_eui_mapping.tsx) to match the changes
	* This file is strongly typed will surface missing or outdated token entries
	* Provide descriptions for new entries
	* New lines and additional whitespace will need to be stripped out of strings, or `i18n_eui_mapping.test.ts` will fail
2. Run `yarn test:jest packages/core/i18n/core-i18n-browser-internal/src/i18n_eui_mapping.test.ts` and ensure it passes
3. Run `yarn test:jest packages/core/i18n/core-i18n-browser-internal/src/i18n_service.test.ts -u` to update mapping snapshots
4. Run `node scripts/i18n_check --fix` to delete removed or updated token entries from the [various translation files](https://github.com/elastic/kibana/tree/main/x-pack/plugins/translations/translations)

### Breaking changes and deprecations

EUI should be handling all breaking changes noted in the `changelog` of each upgrade. Unless it's unreasonable to do time-wise (e.g. more than several days of work), EUI should also be handling any deprecations in the `changelog`. This typically involves removing or migrating uses of removed types or components.

If it's too much effort for the EUI team alone to handle migrating/updating deprecated components, we should be creating a follow-up issue for each team using the deprecated components, and giving them a timeline for removal/migration. An example of this: https://github.com/elastic/kibana/issues/161872.

## Opening a draft PR to kick off CI

At this point, we recommend opening a **draft** PR with your existing commits/changes against Kibana main. Unfortunately, Kibana's many tests are far too numerous to reasonably run them all locally - your machine will OOM if you even try. Kicking off a CI run is therefore the quickest way to find test failures at this point.

### PR template

The typical EUI upgrade PR in Kibana looks something like [#109157](https://github.com/elastic/kibana/pull/109157), and reviewers have begun to expect the consistency. There are two important inclusions:

* Call out changes made to accommodate test failures that might not be apparent from looking at the diff.
* Copy-paste the full [changelog version range](https://github.com/elastic/eui/blob/main/CHANGELOG.md) for the upgrade.

Labels to use:

* Add the `EUI`, `release_note:skip`, and relevant version tag(s) (the next minor version that has not yet entered feature freeze)
* We typically only merge into the main branch (the next minor version), but if an upgrade is specifically targeting a previous version, add that version tag as a label as well. Kibana will attempt to automatically backport the PR to all tagged version branches.

## Resolving errors

Many errors can be resolved ahead of time by making and committing any other known, required changes based on the EUI changelog version range (e.g. breaking changes or deprecations).

It is likely that resulting errors are truly caused by a change in EUI and not coincidence. Therefore, before reaching out to plugin owners for help, timebox an investigation period to resolve the issues. The exception to this are the Cypress and Synthetics tests, as those tests _only_ run for certain teams and are therefore more prone to being flaky. Jest tests and FTR tests are typically not going to be flaky, as they run on every PR and are disabled by the KibanaOps team if they become so.

### Type errors

Type errors can be checked by running `node scripts/type_check.js` from the kibana root folder.

This is a relatively reasonable script to run locally. If multiple types have been changed, we generally recommend running the script locally rather than waiting for CI, as CI will short-circuit after a few type errors are reported rather than reporting them all at once, leading to longer wait times and multiple fixes.

Type errors, luckily, are easy to track to specific commit and usually result from updated prop configurations. Manually update components in Kibana to match the new prop shape. Reach out to a plugin codeowner if questions arise.

If a type change appears to be more substantial or breaks expected rendered output, assess whether a patch needs to be applied to EUI (see [Snafu](#snafu)).

### Jest test errors

It's likely that Jest test failures will be snapshot failures due to changing props or styles.

1. In the test failures reported by `kibana-ci`, Click the `[logs]` link next to the test failure
2. If a snapshot failure, verify that the "expected" output is in line with changes mentioned in the changelog
3. Grab and copy the test path from the second line on the page, e.g.
    <img src="https://user-images.githubusercontent.com/549407/211683858-1604a414-41fc-4e23-8e5f-5841f549c5d1.png" width="600" height="219" alt="Screenshot of Kibana buildkite test failure">
4. Update snapshots using the `-u` flag, e.g. `yarn test:jest x-pack/plugins/security/server -u`

Other unit test failures will require narrowing the root cause to a commit in the changelog and triaging various DOM, style, or React possibilities.

### Jest integration test errors
Some teams also use Jest to run longer integration tests. These tests have a different command that requires a configuration file.

1. In the test failures reported by `kibana-ci`, Click the `[logs]` link next to the test failure
2. Integration test failures will have a two-line heading. The first line confirms these are Jest integration test failures. The second line is the relative path you will need to re-run the test.
    <img width="1325" alt="Screenshot of Kibana buildkite test failure" src="https://github.com/elastic/eui/assets/934879/cd7d7b0b-f532-43ea-84bc-2f05d927a20a">
3. Look for a `jest.integration.config.js` file near the failing test. This file may be in the same directory, or up 1-3 parent directories. It is usually at least within the same plugin directory (if an `x-pack` plugin).
4. In your terminal, paste the following command, substituting the `RELATIVE_TEST_PATH` from step 2 and the `JEST_CONFIG` with the appropriate paths. Some IDE’s like VSCode have a `Copy relative path` command that make this process easier.

    ```shell
    # Command to run Jest integration test
    yarn test:jest_integration --config=JEST_CONFIG RELATIVE_TEST_PATH
    ```

    ```shell
    # Example with full config and relative path
    yarn test:jest_integration --config=x-pack/plugins/security_solution/jest.integration.config.js x-pack/plugins/security_solution/public/management/pages/host_isolation_exceptions/view/components/integration_tests
    ```
5. After running a Jest integration test locally, you'll be able to determine whether or not you can reproduce the error. If yes, your terminal should have output the specific test file throwing the error. You can then examine it for selectors, screen reader text, or other things that might have changed in EUI to cause a failure.

### E2E test errors

The vast majority of functional tests use the Mocha-based functional test runner, but some plugins have opted for Cypress-based integration tests.

#### Kibana FTR (`test/`)

**Follow Kibana's docs**: [Running functional tests in Kibana](https://www.elastic.co/guide/en/kibana/current/development-tests.html#development-functional-tests)

The best approach, again, involves narrowing the root cause to a commit in the changelog and triaging various DOM, style, or React possibilities.

Tips:

* For a basic "does this pass locally for me/is CI potentially flakey" smoke test, we recommend using the `node scripts/functional_tests` script.
* For failures where you need to dig into the DOM or more closely debug what's happening, Kibana recommends running two separate scripts, `node scripts/functional_tests_server` and `node scripts/functional_test_runner` instead (see the above linked Kibana docs). This will allow you to inspect a local Kibana test environment outside of tests running, and make test debug logs easier to parse.
    * Note: if you are debugging failing `x-pack` tests, you will want to use `node x-pack/scripts/functional_tests_server` but you will still want to use `node scripts/functional_test_runner` from Kibana root (with `--config` pointed at the relevant x-pack file).
* To only run a specific suite of tests you want, you can add `describe.only` or `it.only` to the failing test file, or use the `--grep` flag in the CLI command.
* If a test passes for you locally but is flaky on CI, consider using the [async retry service](https://github.com/elastic/kibana/blob/main/packages/kbn-ftr-common-functional-services/services/retry/retry.ts).
* When updating baseline screenshots that are reporting too large a diff, you can either increase the expected diff number or update the baseline screenshots.
    * To update the baseline screenshots, start a separate `functional_tests_server` and wait for it to be ready
    * In a separate test runner tab, run the following commands:
    * `export TEST_BROWSER_HEADLESS=1` (runs screenshot updates in headless mode to match CI)
    * `yarn node scripts/functional_test_runner --config=... -u --headless` (`-u` or `--updateBaseline` is what updates the screenshots)

#### Security Cypress tests (`x-pack/test/security_solution_cypress/`)

Follow [Security's Cypress README](https://github.com/elastic/kibana/tree/main/x-pack/test/security_solution_cypress/cypress#running-the-tests) to run individual tests in headed Cypress.

> Note: Kibana's Cypress tests landscape is changing very quickly as of late and many other teams (e.g. Fleet, Observability) are starting to add Cypress tests directly to `x-pack/test/`.

#### OSQuery Cypress tests (`x-pack/plugins/osquery/cypress/`)

Follow [OSQuery's Cypress README](https://github.com/elastic/kibana/blob/main/x-pack/plugins/osquery/cypress/README.md#ftr--interactive) to run individual tests in headed Cypress.

> Note that this README may be slightly out of date, if `yarn cypress:open-as-ci` doesn't work, try `yarn cypress:open` instead.

#### @elastic/synthetics tests (`x-pack/plugins/{synthetics|observability|ux}/e2e`)

Follow [synthetics/e2e README](https://github.com/elastic/kibana/blob/main/x-pack/plugins/synthetics/e2e/README.md).

For debugging purposes, you will almost certainly want to use the `--bail --no-headless` flags. Like the FTR tests above, you will also want to use `--grep` to only run a certain test block or test (there is no `.only` API for synthetics).

There are a couple other plugins (including observability and ux) also using the synthetics runner. To run those tests, you can follow the same basic instructions linked above, but replace the plugin name, e.g.:

```sh
node x-pack/plugins/observability/scripts/e2e.js --server
node scripts/functional_test_runner/ --config x-pack/plugins/observability/e2e/synthetics_run.ts --bail --no-headless
```

### Debugging Kibana plugins

Some EUI component usages are in `src/plugins/`. Kibana plugins **do not** hot reload automatically. You must start a `yarn kbn watch` process in a new terminal, alongside `yarn start`.

### Other

Most other issues reported by CI (e.g., Check Doc API Changes) will contain resolution instructions. Some failures (e.g.  Build API Docs) may be intermittent failures and can be resolved by re-starting CI by leaving a comment of `@elasticmachine merge upstream`.

For persistent opaque or build-related problems, elevate the error to the Kibana Ops team on Slack (#kibana-operations).

For persistently flaky Cypress tests, first contact the team to ask them for advice and whether they think the failures are caused by the PR and whether they would be okay merging into main with them. If they respond in the affirmative, you can then loop in KibanaOps by linking them the failure and asking them to either skip the flaky test or admin merge the PR even with red CI.

If no mitigation strategies are presented, other options still exist (see [Snafu](#snafu))

### Snafu

A change in EUI is having broader impact than expected or introduced a breaking change, but we can fix it. If you've concluded that the target version upgrade cannot be achieved as-is, there are a couple options:

* _Low impact_: Skip the failing test(s) or `@ts-expect-error` the line with a "TODO" comment stating the intended action and linking to an issue in the EUI repo. Strive to resolve the TODO in the next upgrade.
* _Medium impact_: If EUI has a clean changelog and the fix can be achieved with a PR and patch release, do so. Bump all files mentioned in [Upgrading](#upgrading) to the new target version.
* _Higher impact_: Typically reserved for when time is short (e.g., feature freeze deadline), the option is available to reduce the scope of the upgrade by creating a [backport release](./releasing-versions.md#backport-process) that omits the offending commit. Update all files mentioned in [Upgrading](#upgrading) to the new target version. This approach is absolutely valid, just be sure to fix the root issue before the next upgrade.

If the upgrade includes a large number of commits or has known breaking changes, consider performing a commit-less dry run prior to release using the process described below and a [pre-release build of EUI](../contributing-to-eui/testing/testing-in-kibana.md).

## Merging the PR

Once CI is passing green, mark your draft PR as "Ready for review".

### Leaving comments

* Mention/ping any teams that are waiting on features to be available.
* Upgrades that result in significant changes to tests and/or snapshots will often require codeowner approval from several teams. When possible, head-off questions and small change requests by leaving review comments explaining changes and adhering to code styles typical of the plugin.

### Keeping your PR up to date

* Kibana requires that branches be kept up-to-date (within 1-2 days) with latest main. If CI is reporting an outdated check failure, leave a comment with just `@elasticmachine merge upstream` to merge the latest into your branch.
* Merging latest may introduce new merge conflicts or failures due to new code added by other Kibana devs - however, it is far better to fix potential errors now than to have a test failure in main, which causes KibanaOps to revert the upgrade and forces us to re-open a new PR & go through the approval process all over again.

### Waiting for approvals/admin merges

* When the PR opens, ping all CODEOWNER teams immediately on Slack to give teams as much heads up as possible, as team sizes and priorities vary. We should let teams know an approximate amount of time they'll have before we request an admin merge (e.g. EOD Friday).
* Once all approvals are in and CI is still passing green, smash that merge button :boom:
* If, by the end of the week, review(s) remain outstanding, we should ask KibanaOps to admin merge the PR without all approvals (provided CI is passing and that that the review(s) are for minor changes we feel confident in, e.g. snapshot updates with an expected diff).

### FAQ for Kibana teams

#### Q: I've been pinged as a CODEOWNER for an EUI upgrade PR. What should I do?

If you've been pinged, this means that some code belonging to your team has been changed as a result of upstream EUI changes. This can be due to several reasons:
- A snapshot change due to underlying DOM or CSS/class changes in EUI
- A breaking change that required your code to be updated in order to continue functioning as before
- A (typically) minor cleanup change that EUI noticed in your code

We ask for a code review of the files owned by your team (not the entire PR) to ensure that it looks reasonable. QA is optional - in general, we rely on tests and feature freeze QA to catch any UI issues that may have slipped past (hopefully few to none).

We do encourage manual QA of your team's app/plugin if the changes are large enough, or if the impacted component/UI raises concern about regressions or broken behavior. In general, EUI tries to call out any larger or riskier changes at the top of our PR description to help narrow down QA/smoke testing.

#### Q: I've caught an issue that we think is caused by the EUI upgrade - what do I do?

If the issue only occurs on the upgrade PR branch and not in Kibana main, please feel free to alert us in a GitHub comment and we'll look into resolving it ASAP.

If you've caught an issue post-merge that you think is the a result of an EUI upgrade, we're always more than happy to investigate and find a resolution - please feel free to reach out to us in the EUI Slack channel.

EUI tries (when humanly possible) not to merge in larger or riskier PRs close to feature freeze dates, to avoid issues shipping into production releases.

#### Q: Why are requested review turnaround times so short?

EUI upgrade PRs have shorter (~weekly) turnarounds, which is an challenging necessity for our team. We own upgrades that touch many teams' files (usually snapshots), and holding up PRs can at times block certain teams from needed features, or end up causing a pile-up of massive changelogs later.

If you can't review in time, that's fine, just let us know. We're always happy to investigate issues post-merge if necessary.
