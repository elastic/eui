#!/bin/bash
# Build EUI and publish to npm

set -eo pipefail

echo "+++ :npm: Building @elastic/eui"

echo "Installing dependencies"
yarn

echo "Building @elastic/eui"
yarn build

echo "+++ :npm: Publishing @elastic/eui"

if [[ "${RELEASE_TYPE}" == "release" ]]; then
  echo "RELEASE_TYPE=release is not supported yet"
  exit 1
else
  npm publish --dry-run --tag next
fi

echo "+++ :white_check_mark: Version published!"
