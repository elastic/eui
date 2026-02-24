#!/usr/bin/env bash
#
# Official release publish script (post-merge)
#
# Automates steps 10-11 of the official release process:
#   - Detects the EUI version and changed workspaces
#   - Tags the merge commit
#   - Pushes the tag to upstream
#   - Triggers the GitHub Actions release workflow
#
# Usage: yarn release:publish [merge-commit-sha]
#
#   If no SHA is provided, defaults to HEAD on main.
#

set -euo pipefail

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BOLD='\033[1m'
RESET='\033[0m'

step() {
  echo ""
  echo -e "${GREEN}${BOLD}[$1]${RESET} $2"
}

warn() {
  echo -e "${YELLOW}Warning:${RESET} $1"
}

error() {
  echo -e "${RED}Error:${RESET} $1" >&2
  exit 1
}

REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null) || error "Not inside a git repository"
cd "$REPO_ROOT"

git remote get-url upstream &>/dev/null || error "'upstream' remote not found"

# ── Ensure we're on main and up to date ──────────────────────────────────────

step "1/5" "Updating main branch..."
git checkout main
git pull upstream main

# ── Determine the merge commit SHA ───────────────────────────────────────────

MERGE_SHA="${1:-$(git rev-parse HEAD)}"

step "2/5" "Detecting release details from ${BOLD}${MERGE_SHA:0:12}${RESET}..."

# Read the EUI version at the target commit
EUI_VERSION=$(git show "${MERGE_SHA}:packages/eui/package.json" | node -p "JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')).version")
TAG_NAME="v${EUI_VERSION}"

# Check if this tag already exists
if git rev-parse "$TAG_NAME" &>/dev/null; then
  error "Tag ${TAG_NAME} already exists. Has this release already been published?"
fi

# ── Detect changed workspaces ────────────────────────────────────────────────

# Find the most recent existing release tag to compare against
PREV_TAG=$(git describe --tags --abbrev=0 "${MERGE_SHA}^" 2>/dev/null) || error "Could not find a previous release tag"

# Compare package.json versions between previous tag and release commit
# to determine which public packages changed
CHANGED_WORKSPACES=""
for pkg_dir in packages/eui packages/eui-theme-common packages/eui-theme-borealis packages/docusaurus-preset packages/docusaurus-theme packages/eslint-plugin; do
  pkg_json="${pkg_dir}/package.json"

  # Skip if package.json doesn't exist at the merge commit
  git show "${MERGE_SHA}:${pkg_json}" &>/dev/null || continue

  new_version=$(git show "${MERGE_SHA}:${pkg_json}" | node -p "JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')).version")
  old_version=$(git show "${PREV_TAG}:${pkg_json}" 2>/dev/null | node -p "JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')).version" 2>/dev/null || echo "")

  if [[ "$new_version" != "$old_version" ]]; then
    pkg_name=$(git show "${MERGE_SHA}:${pkg_json}" | node -p "JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')).name")
    if [[ -n "$CHANGED_WORKSPACES" ]]; then
      CHANGED_WORKSPACES="${CHANGED_WORKSPACES},${pkg_name}"
    else
      CHANGED_WORKSPACES="${pkg_name}"
    fi
  fi
done

if [[ -z "$CHANGED_WORKSPACES" ]]; then
  error "No changed workspaces detected. Are you sure the release PR was merged?"
fi

# ── Summary & confirmation ──────────────────────────────────────────────────

step "3/5" "Release summary"
echo ""
echo -e "  Tag:          ${BOLD}${TAG_NAME}${RESET}"
echo -e "  Commit:       ${BOLD}${MERGE_SHA:0:12}${RESET}"
echo -e "  Previous tag: ${BOLD}${PREV_TAG}${RESET}"
echo -e "  Workspaces:   ${BOLD}${CHANGED_WORKSPACES}${RESET}"
echo ""
read -r -p "Proceed with tagging and triggering the release? (y/N) " confirm
if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
  echo "Aborted."
  exit 0
fi

# ── Tag and push ────────────────────────────────────────────────────────────

step "4/5" "Creating and pushing tag ${BOLD}${TAG_NAME}${RESET}..."
git tag -a "$TAG_NAME" "$MERGE_SHA" -m "@elastic/eui ${TAG_NAME}"
git push upstream "$TAG_NAME" --no-verify

# ── Trigger release workflow ────────────────────────────────────────────────

step "5/5" "Triggering release workflow..."
gh workflow run release.yml \
  --repo elastic/eui \
  -f release_ref="$MERGE_SHA" \
  -f type=official \
  -f workspaces="$CHANGED_WORKSPACES" \
  -f dry_run=false

echo ""
echo -e "${GREEN}${BOLD}Release triggered!${RESET}"
echo ""
echo -e "  Monitor: ${BOLD}https://github.com/elastic/eui/actions/workflows/release.yml${RESET}"
