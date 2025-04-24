#!/bin/bash

# Exit on error
set -e

# The PR number provided as input
PR_NUMBER="${PR_NUMBER}"

# Search for the changelog file across all packages
changelog_files=$(find packages/*/changelogs/upcoming/ -type f -name "${PR_NUMBER}.md")

# If no changelog file is found, fail the step with an error message
if [ -z "$changelog_files" ]; then
  echo "❌ Changelog file for PR #${PR_NUMBER} is missing."
  echo "You need to add a changelog to this PR before it can be merged. See https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/documenting/changelogs.md."
  exit 1
else
  echo "✅ Changelog file for PR #${PR_NUMBER} found: $changelog_files"
fi
