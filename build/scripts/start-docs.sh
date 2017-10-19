#!/bin/bash

webpack-dev-server \
  --config=docs/webpack.config.js \
  --inline \
  --content-base=docs/build \
  --host=0.0.0.0 \
  --port=8020 \
  --watch
