#!/bin/bash
set -eo pipefail

# Load nvm
source ~/.bash_profile

echo "+++ :cypress: Installing cypress"

yarn cypress install

echo "+++ :cypress: Running cypress tests"

export CYPRESS_CI="true"
export CYPRESS_CODE_COVERAGE="false"
yarn test-cypress

echo "+++ :white_check_mark: Finished running tests"
