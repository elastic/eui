#!/bin/bash

# Checks that a changelog entry exists for every changed public package in a PR.
#
# Skip logic:
#
# - if a package is private, changelog check for that specific package is skipped,
# - if "skip-changelog" label is present, all changelog checks are skipped,
# - if "skip-changelog-<package-name>" is present, changelog check for that specific package is skipped.

set -e

# Pull request ID
PR_NUMBER="$1"
# Pipe-separated PR labels
LABELS="$2"

if [ -z "$PR_NUMBER" ]; then
  echo "Error: PR_NUMBER argument is missing."
  echo "Usage: $0 <pr_number> [labels]"
  exit 1
fi

# Check if a label exists in the list
has_label() {
  local label="$1"
  local labels_piped="|$LABELS|"
  [[ "$labels_piped" == *"|$label|"* ]]
}

# Check for global skip
if has_label "skip-changelog"; then
  echo "⏩ \`skip-changelog\` label detected. Skipping all changelog checks."
  exit 0
fi

echo "🔍 Detecting changed public packages..."

CHANGED_FILES=$(git diff --name-only HEAD^1 HEAD)

if [ -n "$CHANGED_FILES" ]; then
  echo "Changed files:"
  echo "$CHANGED_FILES" | sed 's/^/- /'
fi

CHANGED_PACKAGES=()
MISSING_CHANGELOGS=()

# For all public workspaces
for pkg_path in $(yarn workspaces list --json --no-private | jq -r '.location'); do
  pkg_name=$(basename "$pkg_path")

  # look for the package path in the changed files list
  if echo "$CHANGED_FILES" | grep -Fq "$pkg_path/"; then
    CHANGED_PACKAGES+=("$pkg_name")
  fi
done

if [ ${#CHANGED_PACKAGES[@]} -eq 0 ]; then
  echo "✅ No public package changes detected."
  exit 0
fi

echo "📦 Changed packages: $(echo "${CHANGED_PACKAGES[*]}" | sed 's/ /, /g')"

# For all public changed workspaces
for pkg_name in "${CHANGED_PACKAGES[@]}"; do
  # skip if package-specific skip label is present
  if has_label "skip-changelog-$pkg_name"; then
    echo "⏩ Skipping changelog check for \`$pkg_name\` (label \`skip-changelog-$pkg_name\` present)."
    continue
  fi

  # look for the changelog file
  CHANGELOG_FILE="packages/$pkg_name/changelogs/upcoming/$PR_NUMBER.md"

  if [ -f "$CHANGELOG_FILE" ]; then
    echo "✅ \`$pkg_name\`: Changelog entry found ($CHANGELOG_FILE)."
  else
    echo "🚫 \`$pkg_name\`: Changelog entry missing."
    MISSING_CHANGELOGS+=("$pkg_name")
  fi
done

if [ ${#MISSING_CHANGELOGS[@]} -gt 0 ]; then
  echo "Please add an \`.md\` file named \`${PR_NUMBER}.md\` to the \`changelogs/upcoming/\` directory of the respective packages."
  echo "Example: \`packages/${MISSING_CHANGELOGS[0]}/changelogs/upcoming/${PR_NUMBER}.md\`"
  echo "You can read more about changelogs here: https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/documenting/changelogs.md"
  exit 1
else
  echo "🎉 All changelog requirements satisfied."
  exit 0
fi
