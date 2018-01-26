#!/bin/bash

set -e

: "${BUMP:="patch"}"

npm test
npm run build
npm version $BUMP
git push upstream --tags
git push upstream
npm publish
npm run sync-docs
