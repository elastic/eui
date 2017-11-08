#!/bin/bash

set -e

npm test
npm run build
npm version ${BUMP:-\"patch\"}
git add .
git commit -am \"Release $(cat package.json | jq -r .version)\"
git push --tags
npm publish
git push
