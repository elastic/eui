#!/bin/bash

for THEME in src/theme_*.scss; do
  node-sass "$THEME" > "dist/eui_$(basename "$THEME" .scss).css"
done
