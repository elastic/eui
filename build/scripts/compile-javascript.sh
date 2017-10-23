#!/bin/bash

set -e

color_green="\033[0;32m"
color_reset="\033[0m"

mkdir -p dist

# We use tput below to save the cursor position, then restore it later in
# order to overwrite "processing" messages.

tput sc
echo -n "  Compiling EUI " >&2
babel --quiet --out-dir=dist/eui index.js
tput rc
echo -e "${color_green}✔${color_reset} Compiled EUI." >&2

# Copy over SVG assets.
mkdir -p dist/components/icon/assets
for SVG in $(cd src && find components -name \*.svg); do cp "src/$SVG" "dist/$SVG"; done

echo -e "${color_green}✔${color_reset} Copied SVG assets." >&2
