# Upgrading EUI in Kibana

## Overview

If the upgrade includes a large number of commits or has known breaking changes, consider performing a commit-less dry run prior to release using the process described below and a [pre-release build of EUI](https://github.com/elastic/eui/blob/master/wiki/component-development.md#testing-dev-features-in-local-kibana).

1. Start a new branch off the `master` branch in the Kibana repo
2. Change the `@elastic/eui` entry in [`package.json`](https://github.com/elastic/kibana/blob/master/package.json) to the target version
3. Change the `@elastic/eui@` entry in [`src/dev/license_checker/config.ts`](https://github.com/elastic/kibana/blob/master/src/dev/license_checker/config.ts) to the target version
4. Run `yarn kbn bootstrap`
5. Commit all changed files, including `yarn.lock`
6. Update i18n tokens and translation files (see [i18n tokens](#i18n-tokens))
7. Make and commit any other known, required changes based on the EUI changelog version range
8. Check for unknown/unintended issues, such as failing unit or functional tests. Options:
	  * Open a draft PR and let CI report errors (suggested)
	  * Or run `yarn test:jest` locally
9. Resolve and commit reported issues (see [Resolving errors](#resolving-errors))
10. Open a PR or mark existing as "Ready for review" (see [PR template](#pr-template))
    * Add the `EUI`, `auto-backport`, `release_note:skip`, and relevant version tags
    * Mention/ping any teams that are waiting on features to be available

## Resolving errors

It is likely that resulting errors are truly caused by a change in EUI and not coincidence. Therefore, before reaching out to plugin owners for help, timebox an investigation period to resolve the issues.

### Type errors during `kbn bootstrap`

Type errors, luckily, are easy to track to specific commit and usually result from updated prop configurations. Manually update components in Kibana to match the new prop shape. Reach out to a plugin codeowner if questions arise.

If a type change appears to be more substantial or breaks expected rendered output, assess whether a patch needs to be applied to EUI (see [Snafu](#snafu)).

### Jest test errors

It's likely that Jest test failures will be snapshot failures due to changing props or styles. Verify that the "actual" output is in line with changes mentioned in the changelog, and update snapshots using the `-u` flag.

Other unit test failures will require narrowing the root cause to a commit in the changelog and triaging various DOM, style, or React possibilities.

### Functional test errors

The vast majority of functional tests use the Mocha-based functional test runner, but some plugins have opted for Cypress-based integration tests.

#### Standard Mocha (`test/`)

Godspeed: [Running functional tests in Kibana](https://www.elastic.co/guide/en/kibana/current/development-tests.html#development-functional-tests)

The best approach, again, involves narrowing the root cause to a commit in the changelog and triaging various DOM, style, or React possibilities.


#### Cypress (`x-pack/plugins/security_solution/cypress/`)

Follow the local [README instructions](https://github.com/elastic/kibana/blob/master/x-pack/plugins/security_solution/cypress/README.md#ftr--interactive) to run individual tests in a nice UI.

### Other

Most other issues reported by CI (e.g., Check Doc API Changes) will contain resolution instructions.

For opaque or seemingly build-related problems, it's time to elevate the error to the Kibana Ops team on Slack (#kibana-operations).

If no mitigation strategies are presented, other options still exist (see [Snafu](#snafu))

## Procedures

### i18n tokens

Check whether the target version upgrade range [contains i18n token changes](https://elastic.github.io/eui/#/package/changelog).

If changes exist:

1. Manually update [`i18n_eui_mapping.tsx`](https://github.com/elastic/kibana/blob/master/src/core/public/i18n/i18n_eui_mapping.tsx) to match the changes
	* This file is strongly typed will surface missing or outdated token entries
	* Provide descriptions for new entries
2. Run `node scripts/i18n_check --fix` to delete removed or updated token entries from the [various translation files](https://github.com/elastic/kibana/tree/master/x-pack/plugins/translations/translations)
3. Run `node scripts/i18n_check --ignore-missing` for verification

### Snafu

A change in EUI is having broader impact than expected or introduced a breaking change, but we can fix it. If you've concluded that the target version upgrade cannot be achieved as-is, there are a couple options:

* _Low impact_: Skip the failing test(s) or `@ts-expect-error` the line with a "TODO" comment stating the intended action and linking to an issue in the EUI repo. Strive to resolve the TODO in the next upgrade.
* _Medium impact_: If EUI has a clean changelog and the fix can be achieved with a PR and patch release, do so. Bump all files mentioned in the [Overview](#overview) to the new target version.
* _Higher impact_: Typically reserved for when time is short (e.g., feature freeze deadline), the option is available to reduce the scope of the upgrade by creating a [backport release](https://github.com/elastic/eui/blob/master/wiki/releasing-versions.md#backport-process) that omits the offending commit. Update all files mentioned in the [Overview](#overview) to the new target version. This approach is absolutely valid, just be sure to fix the root issue before the next upgrade.


## PR Template

The typical EUI upgrade PR in Kibana looks something like [#109157](https://github.com/elastic/kibana/pull/109157), and reviewers have begun to expect the consistency. There are two important inclusions:

* Call out changes made to accommodate test failures that might not be apparent from looking at the diff.
* Copy-paste the full [changelog version range](https://github.com/elastic/eui/blob/master/CHANGELOG.md) for the upgrade.


## PR Approvals

Upgrades that result in significant changes to tests and/or snapshots can often require require codeowner approval from several teams. When possible, head-off questions and small change requests by leaving review comments explaining changes and adhering code styles typical of the plugin.

Team sizes and priorities vary, so allow each team 1-2 days before escalating the review notification. After the waiting period, ping all teams with outstanding reviews containing non-snapshot code changes on Slack, letting them know that the review is for an EUI upgrade PR. If review(s) remain outstanding, either re-post the Slack message or merge the PR without review provided that the review(s) are only for snapshot updates with an expected diff.
