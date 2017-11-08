#!/bin/bash

set -e

mkdir -p dist

for THEME in src/theme_*.scss; do
  node-sass "$THEME" > "dist/eui_$(basename "$THEME" .scss).css"
  postcss --replace --config src-docs/postcss.config.js "dist/eui_$(basename "$THEME" .scss).css"
done
