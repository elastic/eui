#!/bin/bash

# Exit on error
set -e

# The PR number and package path provided as input
PR_NUMBER="${PR_NUMBER}"
PACKAGE_PATH="${PACKAGE_PATH}"

# Search for the changelog file
if [ -n "$PACKAGE_PATH" ]; then
  # Check specific package
  echo "Checking package: $PACKAGE_PATH"
  changelog_files=$(find "${PACKAGE_PATH}/changelogs/upcoming/" -type f -name "${PR_NUMBER}.md" 2>/dev/null || true)
  package_name=$(basename "$PACKAGE_PATH")

  if [ -z "$changelog_files" ]; then
    echo "❌ Changelog file for PR #${PR_NUMBER} is missing in package '${package_name}'."
    echo "You need to add a changelog to this PR before it can be merged. See https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/documenting/changelogs.md"
    exit 1
  else
    echo "✅ Changelog file for PR #${PR_NUMBER} found in package '${package_name}': $changelog_files"
    exit 0
  fi
else
  # Search for the changelog file across all packages
  changelog_files=$(find packages/*/changelogs/upcoming/ -type f -name "${PR_NUMBER}.md")

  if [ -z "$changelog_files" ]; then
    echo "❌ Changelog file for PR #${PR_NUMBER} is missing."
    echo "You need to add a changelog to this PR before it can be merged. See https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/documenting/changelogs.md"
    exit 1
  else
    echo "✅ Changelog file for PR #${PR_NUMBER} found: $changelog_files"
    exit 0
  fi
fi