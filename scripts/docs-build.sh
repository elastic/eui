#!/bin/bash

set -e

npm run build
webpack --config=docs/webpack.config.js
