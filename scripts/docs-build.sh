#!/bin/bash

set -e

npm run build
webpack --config=src-docs/webpack.config.js
