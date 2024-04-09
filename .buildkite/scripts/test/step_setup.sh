#!/bin/bash
set -eo pipefail

cat ~/.bash_profile
source ~/.bash_profile

whoami
pwd

echo "+++ :information_source: Running tests on branch $(BUILDKITE_BRANCH) ($(BUILDKITE_COMMIT))"
echo "Node.js version: $(node -v)"

echo "+++ :yarn: Installing dependencies"
yarn
