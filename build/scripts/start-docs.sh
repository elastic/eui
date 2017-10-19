#!/bin/bash

webpack-dev-server \
  --config=docs/webpack.config.js \
  --content-base=docs/build \
  --disable-host-check \
  --inline \
  --hot \
  --port=8020
