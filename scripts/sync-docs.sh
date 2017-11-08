#!/bin/bash

set -e

npm run build-docs
git add docs/dist
git commit -am "Updated documentation." || echo "No documentation changes."
