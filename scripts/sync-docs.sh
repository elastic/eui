#!/bin/bash

set -e

npm run build-docs
git add .
git commit -am "Updated documentation." || echo "No documentation changes."
