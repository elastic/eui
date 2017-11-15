#!/bin/bash

set -e

eslint \
  --cache \
  --ignore-pattern **/*.snap.js \
  "./src/**/*.js" \
  "./src-docs/**/*.js"
