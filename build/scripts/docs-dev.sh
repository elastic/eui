#!/bin/bash

mkdir -p {tmp,dist}

for THEME in src/theme_*.scss
do
  node-sass \
    --watch \
    "$THEME" \
    "tmp/eui_$(basename "$THEME" .scss).css" &

  postcss \
    --watch \
    --config docs/postcss.config.js \
    --output "dist/eui_$(basename "$THEME" .scss).css" \
    "tmp/eui_$(basename "$THEME" .scss).css" &
done

webpack-dev-server --inline --hot --config=docs/webpack.config.js
