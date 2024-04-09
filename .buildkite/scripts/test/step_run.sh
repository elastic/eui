#!/bin/bash
set -eo pipefail

# Load nvm
source ~/.bash_profile

echo "+++ :cypress: Installing cypress"

yarn cypress install

echo "+++ :cypress: Running cypress tests"

yarn test-cypress

echo "+++ :white_check_mark: Finished running tests"
