#!/bin/bash

# Exit on error
set -e

# Get the list of changed files
changed_files=$(git diff --name-only origin/main...HEAD)

# Find all public packages and check for changes
public_packages=()
for dir in packages/*/; do
  if [ -f "${dir}package.json" ] && ! grep -q '"private": true' "${dir}package.json"; then
    package_name=$(basename "$dir")
    if echo "$changed_files" | grep -q "^packages/$package_name/"; then
      public_packages+=("\"$package_name\"")
    fi
  fi
done

# Output a JSON array of changed package names
if [ ${#public_packages[@]} -gt 0 ]; then
  changed_list=$(IFS=,; echo "[${public_packages[*]}]")
  echo "changed-packages=$changed_list" >> $GITHUB_OUTPUT
else
  echo "changed-packages=[]" >> $GITHUB_OUTPUT
fi
