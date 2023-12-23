#!/usr/bin/env sh

# TODO: create git tag and push to remote

# Bump package version
yarn version --prerelease --preid dev --no-git-tag-version

new_version="$(node -p "require('./package.json').version")"
echo "Bumped version number to $new_version"

# Build EUI
yarn build

# Publish to npmjs
npm publish --tag prerelease --dry-run

echo "Successfully published the prerelease version $new_version to npmjs - https://www.npmjs.com/package/@elastic/eui/v/$new_version"
