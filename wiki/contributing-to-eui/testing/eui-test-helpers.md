# EUI test helpers

[`@elastic/eui-test-helpers`](../../../packages/test-helpers) ships Playwright Component Objects used by downstream end-to-end tests (Kibana Scout). Each helper has validation tests that run its public API against the real component in Storybook. This page covers how those tests run in CI; for the package itself (directory layout, adding a Component Object, running locally) see the package [CONTRIBUTING](../../../packages/test-helpers/CONTRIBUTING.md).

## On every pull request

`eui-pull-request-test` runs two helper steps (`test-helpers` task in [`pipeline_test.sh`](../../../.buildkite/scripts/pipelines/pipeline_test.sh)):

- **Validation** — builds the EUI workspaces and Storybook, then runs the full Playwright suite once. Storybook is served by Playwright's `webServer` from the static build.
- **Flake detection** — [`pipeline_test_helpers_flaky.sh`](../../../.buildkite/scripts/pipelines/pipeline_test_helpers_flaky.sh) diffs the PR against its merge base and, for any changed component with a correlated helper, runs that helper's specs `--repeat-each=25` to surface flakiness — even when the helper itself was not touched. A flaky failure fails the build. It is a no-op when no correlated component changed.

### Component ↔ helper correlation

The correlation is **by directory name**: a change under `packages/eui/src/components/<name>` (or the helper's own specs) re-runs `packages/test-helpers/src/playwright/components/<name>`. Keeping that directory parity is all that is required — there is no map to maintain.

## Scheduled run

[`pipeline_test_helpers_scheduled.yml`](../../../.buildkite/pipelines/pipeline_test_helpers_scheduled.yml) runs the whole suite with `--repeat-each=5` and notifies Slack on failure.

## One-time Buildkite setup

Not configurable from the repo — requires Buildkite org-admin access:

- A pipeline pointing at `pipeline_test_helpers_scheduled.yml`, with a scheduled build every 8 hours (cron `0 */8 * * *`).
- The Buildkite Slack integration enabled for the elastic org; confirm the destination channel (currently `#appex-qa`).
