#!/bin/bash

set -e

eui="$(pwd)"

if [ ! -d "${eui}/lib" ]; then
  # Only compile the distributable code if doesn't already exist. This is useful for projects
  # which depend upon a GitHub branch of EUI instead of an NPM-published version.
  "${eui}/scripts/compile-scss.sh"
  "${eui}/scripts/compile-eui.sh"
fi
