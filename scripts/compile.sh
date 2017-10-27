#!/bin/bash

set -e

./scripts/compile-clean.sh
./scripts/compile-scss.sh
./scripts/compile-eui.sh
