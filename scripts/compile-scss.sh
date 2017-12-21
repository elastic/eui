#!/bin/bash

set -e

eui="$(pwd)"

while getopts 'e:' arg
do
  case ${arg} in
    e) eui=${OPTARG};;
    *) return 1 # illegal option
  esac
done

mkdir -p "${eui}/dist"

src="${eui}/src/theme_*.scss"

for THEME in $src; do
  dest="${eui}/dist/eui_$(basename "$THEME" .scss).css"
  node-sass "$THEME" > "$dest"
  postcss --replace --config "${eui}/src-docs/postcss.config.js" "$dest"
done
