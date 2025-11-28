#!/bin/bash

# This script checks that a changelog entry exists for every changed public package in a PR.
#
# Skip logic:
#
# - if a package is private, changelog check for that specific package is skipped,
# - if "skip-changelog" label is present, all changelog checks are skipped,
# - if "skip-changelog-<package-name>" is present, changelog check for that specific package is skipped.

set -e

# The Pull Request ID
PR_NUMBER="$1"
# Pipe-separated list of labels applied to the PR
LABELS="$2"
# Base ref to compare against (defaults to `origin/main`)
BASE_REF="origin/${GITHUB_BASE_REF:-main}"

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

# Ensure we have `origin/main` for diffing
# This check prevents "ambiguous argument 'origin/main...HEAD'" errors
# if shallow clone missed the ref
if ! git rev-parse --verify "$BASE_REF" >/dev/null 2>&1; then
  echo "⚠️ \`$BASE_REF\` reference not found. Attempting to fetch..."
  git fetch origin "${GITHUB_BASE_REF:-main}:$BASE_REF" --depth=1 || echo "Warning: Fetch failed, git diff might fail."
fi

echo "🔍 Detecting changed public packages..."

# Get list of changed files
CHANGED_FILES=$(git diff --name-only "$BASE_REF...HEAD")

CHANGED_PACKAGES=()
MISSING_CHANGELOGS=()

# Iterate over all directories in `packages/`
# Assumption: `packages/<package_name>/`
for pkg_dir in packages/*/; do
  [ -d "$pkg_dir" ] || continue

  # Remove trailing slash
  pkg_path="${pkg_dir%/}"
  pkg_name=$(basename "$pkg_path")
  package_json="$pkg_path/package.json"

  # Check if `package.json` exists
  if [ ! -f "$package_json" ]; then
    continue
  fi

  # Skip private packages
  is_private=$(node -p "try { require('./$package_json').private } catch(e) { false }" 2>/dev/null)
  if [ "$is_private" == "true" ]; then
    continue
  fi

  # We look for "packages/<pkg_name>/" prefix in the changed files list
  if echo "$CHANGED_FILES" | grep -Fq "packages/$pkg_name/"; then
    CHANGED_PACKAGES+=("$pkg_name")
  fi
done

if [ ${#CHANGED_PACKAGES[@]} -eq 0 ]; then
  echo "✅ No public package changes detected."
  exit 0
fi

echo "Impacted packages: ${CHANGED_PACKAGES[*]}"

for pkg_name in "${CHANGED_PACKAGES[@]}"; do
  # Check for package-specific skip label
  if has_label "skip-changelog-$pkg_name"; then
    echo "⏩ Skipping changelog check for \`$pkg_name\` (label \`skip-changelog-$pkg_name\` present)."
    continue
  fi

  CHANGELOG_FILE="packages/$pkg_name/changelogs/upcoming/$PR_NUMBER.md"

  if [ -f "$CHANGELOG_FILE" ]; then
    echo "✅ \`$pkg_name\`: Changelog entry found ($CHANGELOG_FILE)."
  else
    echo "🚫 \`$pkg_name\`: Changelog entry missing."
    MISSING_CHANGELOGS+=("$pkg_name")
  fi
done

# Report failures
if [ ${#MISSING_CHANGELOGS[@]} -gt 0 ]; then
  echo "Please add an \`.md\` file named \`${PR_NUMBER}.md\` to the \`changelogs/upcoming/\` directory of the respective packages."
  echo "Example: \`packages/${MISSING_CHANGELOGS[0]}/changelogs/upcoming/${PR_NUMBER}.md\`"
  echo "You can read more about changelogs here: https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/documenting/changelogs.md"
  exit 1
else
  echo "🎉 All changelog requirements satisfied."
  exit 0
fi
