#!/bin/bash

set -e

eslint \
  --fix \
  --cache \
  --ignore-pattern **/*.snap.js \
  "./src/**/*.js" \
  "./src-docs/**/*.js"
