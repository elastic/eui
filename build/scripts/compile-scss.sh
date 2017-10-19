#!/bin/bash

mkdir -p dist

for THEME in src/theme_*.scss; do
  node-sass "$THEME" > "dist/eui_$(basename "$THEME" .scss).css"
done
