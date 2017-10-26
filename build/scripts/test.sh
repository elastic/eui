#!/bin/bash

eslint \
  --cache \
  --fix \
  --ignore-pattern **/test/* **/*.test.js \
  ./src .docs/src
