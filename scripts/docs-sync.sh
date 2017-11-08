#!/bin/bash

set -e

npm run build-docs
git add docs
git commit -am "Updated documentation." || echo "No documentation changes."
