#!/bin/bash
set -eo pipefail

echo "+++ :cypress: Installing cypress"

yarn cypress install

echo "+++ :cypress: Running cypress tests"

yarn test-cypress

echo "+++ :white_check_mark: Finished running tests"
