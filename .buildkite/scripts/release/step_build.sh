#!/bin/bash
# Build EUI and publish to npm

set -eo pipefail

# include utils
source .buildkite/scripts/common/utils.sh

echo "+++ :yarn: Installing dependencies"
yarn

echo "+++ :yarn: Building @elastic/eui"
yarn build:workspaces
yarn build

echo "+++ :yarn: Built @elastic/eui"
