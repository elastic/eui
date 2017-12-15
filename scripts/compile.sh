#!/bin/bash

set -e

eui="$(pwd)"

"${eui}/scripts/compile-clean.sh"
"${eui}/scripts/compile-scss.sh"
"${eui}/scripts/compile-eui.sh"
