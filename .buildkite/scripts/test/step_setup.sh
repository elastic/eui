#!/bin/bash
set -eo pipefail

source ~/.bash_profile

whoami
pwd

echo "+++ :information_source: Running tests on branch $(BUILDKITE_BRANCH) ($(BUILDKITE_COMMIT))"
echo "Node.js version: $(node -v)"

echo "+++ :yarn: Using build-time yarn cache"

YARN_CACHE_FOLDER="${HOME}/.yarn-cache"
if [[ -d "${YARN_CACHE_FOLDER}" ]]; then
  yarn config set --global cache-folder "$HOME/.yarn-cache"
  echo "Using build-time yarn cache from ${YARN_CACHE_FOLDER}"
else
  echo "Build-time yarn cache not found. This is a no-op."
fi

yarn cache list

echo "+++ :yarn: Installing dependencies"
yarn
