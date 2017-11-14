#!/bin/bash

set -e

: "${BUMP:="patch"}"

npm test
npm run build
npm run sync-docs
npm version $BUMP
git push --tags
git push
npm publish
