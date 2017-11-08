#!/bin/bash

set -e

eslint \
  --cache \
  --fix \
  --ignore-pattern **/test/* **/*.test.js \
  ./src
