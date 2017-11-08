#!/bin/bash

set -e

git checkout gh-pages
git merge master
npm run build-docs
git add .
git commit -am "Updated website off of \`master\`"
