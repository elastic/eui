#!/bin/bash

set -e

npm test
npm run build
npm version ${BUMP:-\"patch\"}
git push --tags
npm publish
git push
