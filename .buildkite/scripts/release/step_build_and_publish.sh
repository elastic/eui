#!/bin/bash
# Build EUI and publish to npm

set -eo pipefail

echo "+++ :yarn: Installing dependencies"
yarn

echo ":yarn: Building @elastic/eui"
yarn build

echo "+++ :npm: Authenticating to npm"

npm_vault="secret/ci/elastic-eui/npm"
NPM_TOKEN=$(retry 5 vault read -field=token "${npm_vault}")
npm config set "//registry.npmjs.org/:_authToken=${NPM_TOKEN}"

echo "+++ :npm: Publishing @elastic/eui"

if [[ "${RELEASE_TYPE}" == "release" ]]; then
  echo "RELEASE_TYPE=release is not supported yet"
  exit 1
else
  npm publish --dry-run --tag next
fi

echo "+++ :white_check_mark: Version published!"
