#!/bin/bash

set -e

npm test
npm run build
npm run sync-docs
npm version ${BUMP:-\"patch\"}
git push --tags
git push
npm publish
