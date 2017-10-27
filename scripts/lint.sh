#!/bin/bash

set -e

eslint \
  --cache \
  --ignore-pattern **/test/* **/*.test.js \
  ./src .docs/src

jest --config ./scripts/jest/config.json "$@"
