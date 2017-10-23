#!/bin/bash

set -e

mkdir -p dist

webpack --config=src/webpack.config.js
