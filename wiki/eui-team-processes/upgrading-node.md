# Upgrading Node in the EUI codebase

## Why and when to upgrade Node

EUI should match / keep in step with Kibana's [node version](https://github.com/elastic/kibana/blob/main/.nvmrc). Typically, upgrades will be spurred by email announcements from Kibana that they've upgraded to a new Node version.

## How to upgrade Node

There are two parts to upgrading Node:

### Updating the Node version

Find and replace all instances of the old Node version in EUI (e.g., `16.18.1`). This primarily affects:

- Local: primarily just the `.nvmrc` file
- CI: primarily involves the `.ci` folder, `scripts/docker-ci`/`scripts/deploy`, and `package.json`, and any other Docker-related Node settings

### Updating the Docker image version

Once all references to the old Node version have been updated in CI-related files, you'll need to build and publish a new Docker image with the new Node version for CI to use. The steps for this is documented in [`scripts/docker-ci`](https://github.com/elastic/eui/tree/main/scripts/docker-ci#using-with-the-elastic-container-library).

#### Updating references to Docker image versions

Find all instances of `docker.elastic.co/eui/ci:` in EUI. You will want to change/upversion the `ci:x.x` number based on whether the Node upgrade is a major or minor change.

- If it's a minor upgrade, increment the number after the decimal by one (e.g., `ci:3.2` to `ci:3.3`).
- If it's a major Node upgrade (e.g. v16 to v18), increment the number before the decimal, and set it to 0 (e.g. `ci:3.3` to `ci:4.0`).

#### When upgrading to a minor or patch Node version

For non-major Node upgrades, you will likely only need to follow the [Build a new image](https://github.com/elastic/eui/tree/main/scripts/docker-ci#build-a-new-image) step and [Publish a built image](https://github.com/elastic/eui/tree/main/scripts/docker-ci#publish-a-built-image) step.

Skipping the "Test a new image step" allows you to save some time running tests locally and instead have CI run tests for you.

#### When upgrading to major Node versions

For major Node upgrades, where it's possible that either that our local environment or CI will break, we strongly recommend ensuring the following steps pass locally first before publishing the Docker image:

- `yarn && yarn start`
- `yarn build-pack`
- `yarn test`
- [Test a new image locally](https://github.com/elastic/eui/tree/main/scripts/docker-ci#test-a-new-image-locally)

#### Confirming the published Docker image

Once your docker image has been published, commit and push up your Node version and Docker CI version changes to a draft PR. If the Docker build and publish was successful, CI should pass green. If not, investigate the CI failure to see what may have gone wrong.

## Example PRs of previous Node upgrades for reference

- https://github.com/elastic/eui/pull/6038
- https://github.com/elastic/eui/pull/5749
