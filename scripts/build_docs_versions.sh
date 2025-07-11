#!/bin/bash

set -e

# BEFORE USING, READ CAREFULLY!
#
# This script builds the EUI website and storybook for specified tags.
# Usage: ./build_docs_versions.sh <tag1> <tag2> ...
# Example: ./build_docs_versions.sh v104.0.0 v103.1.0
# It should only be used as a last resort to upload directly to the GCP bucket.
# Otherwise, rely on the CI pipeline. Please verify that the script is up-to-date.

TAGS=("$@") # Pass tags as arguments, e.g. ./build_docs_versions.sh v104.0.0 v103.1.0

REPO_ROOT="$(pwd)"
PROJECTS_DIR="$(dirname "$REPO_ROOT")"
VERSIONS_DIR="$PROJECTS_DIR/Versions"

mkdir -p "$VERSIONS_DIR"

for TAG in "${TAGS[@]}"; do
  echo "Processing $TAG"
  git checkout tags/$TAG

  yarn

  yarn workspace @elastic/eui build:workspaces
  yarn workspace @elastic/eui build
  yarn workspace @elastic/eui-website build:workspaces
  yarn workspace @elastic/eui build-storybook

  # Update versions.json (ensure $TAG is present)
  node -e "
    const path = require('path');
    const fs = require('fs');
    const file = path.resolve(__dirname, 'packages/website/static/versions.json');
    const data = JSON.parse(fs.readFileSync(file));
    const version = '$TAG'.replace(/^v/, '');
    if (!data.euiVersions.includes(version)) {
      data.euiVersions.unshift(version);
      fs.writeFileSync(file, JSON.stringify(data, null, 2));
    }
  "

  # Build website with environment variables
  # TODO: add DOCS_GOOGLE_TAG_MANAGER_ID if needed
  DOCS_BASE_URL="/$TAG/" \
  STORYBOOK_BASE_URL="https://eui.elastic.co/$TAG/storybook" \
  DOCS_GOOGLE_TAG_MANAGER_ID="" \
  yarn workspace @elastic/eui-website build

  # Prepare output folder in Versions directory
  OUTDIR="$VERSIONS_DIR/$TAG"
  mkdir -p "$OUTDIR/storybook"
  cp -R packages/website/build/* "$OUTDIR/"
  cp -R packages/eui/storybook-static/* "$OUTDIR/storybook/"

  # Revert changes in versions.json before next tag
  git checkout -- packages/website/static/versions.json
done

echo "Done!"
