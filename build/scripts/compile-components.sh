#!/bin/bash

set -e

color_green="\033[0;32m"
color_reset="\033[0m"

mkdir -p dist/components

# Save cursor position
tput sc

echo -n "  Compiling src/components " >&2
babel --quiet --out-dir=dist/components src/components

# Also copy over SVGs. Babel has a --copy-files option but that brings over
# all kinds of things we don't want into the dist folder.
mkdir -p dist/components/icon/assets
for SVG in $(cd src && find components -name \*.svg); do cp "src/$SVG" "dist/$SVG"; done

# Restore cursor position in order to overwrite processing message.
tput rc
echo -e "${color_green}✔ Finished dist/components${color_reset}" >&2
