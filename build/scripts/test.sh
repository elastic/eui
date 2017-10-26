#!/bin/bash

eslint \
  --cache \
  --ignore-pattern **/test/* **/*.test.js \
  ./src .docs/src
