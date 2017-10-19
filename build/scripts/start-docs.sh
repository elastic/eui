#!/bin/bash

webpack-dev-server \
  --config=docs/webpack.config.js \
  --inline \
  --content-base=docs/build \
  --port=8020 \
  --hot
