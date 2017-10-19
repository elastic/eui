#!/bin/bash

set -e

color_green="\033[0;32m"
color_reset="\033[0m"

mkdir -p dist/components dist/services

# We use tput below to save the cursor position, then restore it later in
# order to overwrite "processing" messages.

tput sc
echo -n "  Compiling src/components " >&2
babel --quiet --out-dir=dist/components src/components
tput rc
echo -e "${color_green}✔ Finished dist/components${color_reset}" >&2

tput sc
echo -n "  Compiling src/services " >&2
babel --quiet --out-dir=dist/services src/services
tput rc
echo -e "${color_green}✔ Finished dist/services${color_reset}" >&2

# Also copy over SVGs. Babel has a --copy-files option but that brings over
# all kinds of things we don't want into the dist folder.
mkdir -p dist/components/icon/assets
for SVG in $(cd src && find components -name \*.svg); do cp "src/$SVG" "dist/$SVG"; done

echo -e "${color_green}✔ Finished copying SVGs${color_reset}" >&2
