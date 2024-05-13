#!/bin/bash

set -euo pipefail

storybook_url="https://eui.elastic.co/storybook"

# If the branch is not a pull request, Buildkite passes "false"
# https://buildkite.com/docs/pipelines/environment-variables#BUILDKITE_PULL_REQUEST
if [[ "${BUILDKITE_PULL_REQUEST}" != "false" ]]; then
  echo "+++ Running visual regression tests on pull request #${BUILDKITE_PULL_REQUEST}"
  echo "https://github.com/elastic/eui/pull/${BUILDKITE_PULL_REQUEST}"
  storybook_url="https://eui.elastic.co/pr_${BUILDKITE_PULL_REQUEST}/storybook"
elif [[ "${BUILDKITE_BRANCH}" == "main" ]]; then
  echo "+++ Running visual regression tests on main"
else
  echo "+++ :x: Visual regression tests can only be run against \`main\` and open pull requests. Exiting"
  exit 1
fi

docker run \
  -i \
  --rm \
  --env GIT_COMMITTER_NAME=test \
  --env GIT_COMMITTER_EMAIL=test \
  --env HOME=/tmp \
  --user="$(id -u):$(id -g)" \
  --volume="$(pwd):/app" \
  --workdir=/app \
  "$DOCKER_BASE_IMAGE" \
  bash -c "yarn && yarn --cwd packages/eui test-visual-regression --reactUri $storybook_url"
