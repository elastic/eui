#!/bin/bash

mkdir -p {tmp,dist}

for THEME in src/theme_*.scss
do
  node-sass \
    "$THEME" \
    "tmp/eui_$(basename "$THEME" .scss).css" &

  postcss \
    --config docs/postcss.config.js \
    --output "dist/eui_$(basename "$THEME" .scss).css" \
    "tmp/eui_$(basename "$THEME" .scss).css" &
done
