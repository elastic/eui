#!/bin/bash
set -eo pipefail

# Load nvm
source ~/.bash_profile

echo "+++ :jest: Running jest tests"

export CI="true"
yarn test-unit

echo "+++ :white_check_mark: Finished running jest tests"
