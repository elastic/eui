#!/bin/bash

set -e

eslint \
  --cache \
  --ignore-pattern **/test/* **/*.test.js \
  ./src
