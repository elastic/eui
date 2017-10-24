#!/bin/bash

set -e

mkdir -p dist

webpack --config=src/webpack.config.js

# Generate minified version too
NODE_ENV=production webpack --config=src/webpack.config.js
