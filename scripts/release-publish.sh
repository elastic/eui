#!/usr/bin/env bash
#
# Official release publish script (post-merge)
#
# Automates final steps of the process:
# - Detects the EUI version and changed workspaces
# - Tags the merge commit
# - Pushes the tag to upstream
# - Triggers the GitHub Actions release workflow
# - Creates a GitHub release
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

PACKAGE_DIRS=(packages/eui packages/eui-theme-common packages/eui-theme-borealis packages/docusaurus-preset packages/docusaurus-theme packages/eslint-plugin)

git remote get-url upstream &>/dev/null || error "'upstream' remote not found"

if [[ -n "$(git status --porcelain)" ]]; then
  error "Working tree is dirty. Please commit or stash your changes before running this script."
fi

step "1/6" "Updating main branch..."
git checkout main
git pull upstream main
git fetch upstream --tags

MERGE_SHA="${1:-$(git rev-parse HEAD)}"

step "2/6" "Detecting release details from ${BOLD}${MERGE_SHA:0:12}${RESET}..."

EUI_VERSION=$(git show "${MERGE_SHA}:packages/eui/package.json" | node -p "JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')).version")
TAG_NAME="v${EUI_VERSION}"

if git rev-parse "$TAG_NAME" &>/dev/null; then
  error "Tag ${TAG_NAME} already exists. Has this release already been published?"
fi

PREV_TAG=$(git describe --tags --abbrev=0 "${MERGE_SHA}^" 2>/dev/null) || error "Could not find a previous release tag"

# Detect changed workspaces and collect changelog entries for the GitHub release
CHANGED_WORKSPACES=""
RELEASE_BODY=""

for pkg_dir in "${PACKAGE_DIRS[@]}"; do
  pkg_json="${pkg_dir}/package.json"

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

    # Extract changelog section for this version
    changelog_file=$(ls -t "${pkg_dir}"/changelogs/CHANGELOG_*.md 2>/dev/null | head -1)
    if [[ -n "$changelog_file" ]]; then
      escaped_version="${new_version//./\\.}"
      changelog_section=$(awk "/^## \[\`v${escaped_version}\`\]/{found=1; next} /^## \[/{if(found) exit} found" "$changelog_file")
      if [[ -n "$changelog_section" ]]; then
        RELEASE_BODY="${RELEASE_BODY}### \`${pkg_name}\` [v${new_version}](https://github.com/elastic/eui/blob/main/${changelog_file})
${changelog_section}
"
      fi
    fi
  fi
done

if [[ -z "$CHANGED_WORKSPACES" ]]; then
  error "No changed workspaces detected. Are you sure the release PR was merged?"
fi

step "3/6" "Release summary"
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

step "4/6" "Creating and pushing tag ${BOLD}${TAG_NAME}${RESET}..."
git tag -a "$TAG_NAME" "$MERGE_SHA" -m "@elastic/eui ${TAG_NAME}"
git push upstream "$TAG_NAME" --no-verify

step "5/6" "Triggering release workflow..."
gh workflow run release.yml \
  --repo elastic/eui \
  -f release_ref="$MERGE_SHA" \
  -f type=official \
  -f workspaces="$CHANGED_WORKSPACES" \
  -f dry_run=false

step "6/6" "Creating GitHub release..."
gh release create "$TAG_NAME" \
  --repo elastic/eui \
  --title "$TAG_NAME" \
  --notes "$RELEASE_BODY"

echo ""
echo -e "${GREEN}${BOLD}Release triggered!${RESET}"
echo ""
echo -e "  Release: ${BOLD}https://github.com/elastic/eui/releases/tag/${TAG_NAME}${RESET}"
echo -e "  Workflow: ${BOLD}https://github.com/elastic/eui/actions/workflows/release.yml${RESET}"
