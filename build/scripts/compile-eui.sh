#!/bin/bash

set -e

compile_lib() {
  local color_green="\033[0;32m"
  local color_reset="\033[0m"

  mkdir -p lib/components lib/services

  # We use tput below to save the cursor position, then restore it later in
  # order to overwrite "processing" messages.

  tput sc
  echo -n "  Compiling src/components " >&2
  babel --quiet --out-dir=lib/components --ignore "**/*.test.js" src/components
  tput rc
  echo -e "${color_green}✔ Finished compiling lib/components${color_reset}" >&2

  tput sc
  echo -n "  Compiling src/services " >&2
  babel --quiet --out-dir=lib/services --ignore "**/*.test.js" src/services
  tput rc
  echo -e "${color_green}✔ Finished compiling lib/services${color_reset}" >&2

  # Also copy over SVGs. Babel has a --copy-files option but that brings over
  # all kinds of things we don't want into the lib folder.
  mkdir -p lib/components/icon/assets
  for SVG in $(cd src && find components -name \*.svg); do
    cp "src/$SVG" "lib/$SVG"
  done

  echo -e "${color_green}✔ Finished copying SVGs${color_reset}" >&2
}

compile_bundle() {
  mkdir -p dist

  echo -e "\nBuilding bundle...\n" >&2
  webpack --config=src/webpack.config.js

  echo -e "\nBuilding minified bundle...\n" >&2
  NODE_ENV=production webpack --config=src/webpack.config.js
}

compile_lib
compile_bundle
