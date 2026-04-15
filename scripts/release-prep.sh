#!/usr/bin/env bash
#
# Official release preparation script (pre-PR)
#
# Automates initial steps of the process:
# - Log out of npm
# - Checkout main, pull latest from upstream
# - Create a timestamped release branch
# - Build the release CLI
# - Run the release dry-run (interactive)
# - (User confirms in the interactive CLI)
# - Push the branch to origin and open a PR
#
# Usage: yarn release:prep
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

git remote get-url upstream &>/dev/null || error "'upstream' remote not found. Please add it: git remote add upstream git@github.com:elastic/eui.git"

# Bail early if there are uncommitted changes
if [[ -n "$(git status --porcelain)" ]]; then
  error "Working tree is dirty. Please commit or stash your changes before running this script."
fi

step "1/8" "Ensuring npm is not authenticated..."
npm logout 2>/dev/null || true
yarn npm logout 2>/dev/null || true

step "2/8" "Checking out main branch..."
git checkout main

step "3/8" "Pulling latest changes from upstream..."
git pull upstream main

BRANCH_NAME="release/$(date +%s)"
step "4/8" "Creating release branch: ${BOLD}${BRANCH_NAME}${RESET}"
git checkout -b "$BRANCH_NAME"

step "5/8" "Installing dependencies and building release CLI..."
yarn
yarn workspace @elastic/eui-release-cli run build

step "6/8" "Starting release process (dry-run)..."
echo ""
yarn release run official --dry-run --allow-custom --skip-auth-check --use-auth-token

# Check for uncommitted changes after the release CLI run
if [[ -n "$(git status --porcelain)" ]]; then
  echo ""
  warn "There are uncommitted changes in the working tree:"
  git status --short
  echo ""
  read -r -p "Continue pushing without these changes? They won't be included in the PR. (y/N) " confirm
  if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
    echo ""
    echo "Stopped. Commit your changes and re-run from step 7 manually:"
    echo "  git push -u origin $BRANCH_NAME"
    exit 0
  fi
fi

step "7/8" "Pushing branch to origin..."
git push -u origin "$BRANCH_NAME"

step "8/8" "Opening release PR..."

PR_TITLE_PARTS=""
PR_BODY_LINES=""

for pkg_dir in "${PACKAGE_DIRS[@]}"; do
  pkg_json="${pkg_dir}/package.json"
  [[ -f "$pkg_json" ]] || continue

  new_version=$(node -p "require('./${pkg_json}').version")
  old_version=$(git show "main:${pkg_json}" 2>/dev/null | node -p "JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')).version" 2>/dev/null || echo "")

  if [[ -n "$old_version" && "$new_version" != "$old_version" ]]; then
    pkg_name=$(node -p "require('./${pkg_json}').name")

    if [[ -n "$PR_TITLE_PARTS" ]]; then
      PR_TITLE_PARTS="${PR_TITLE_PARTS}, ${pkg_name} v${new_version}"
    else
      PR_TITLE_PARTS="${pkg_name} v${new_version}"
    fi
    PR_BODY_LINES="${PR_BODY_LINES}\n- \`${pkg_name}\` - v${old_version} → v${new_version}"
  fi
done

if [[ -z "$PR_TITLE_PARTS" ]]; then
  error "No changed package versions detected. Did the release dry-run update any versions?"
fi

PR_TITLE="Release: ${PR_TITLE_PARTS}"
PR_BODY="$(printf "Packages to release:\n${PR_BODY_LINES}")"

PR_URL=$(gh pr create \
  --title "$PR_TITLE" \
  --body "$PR_BODY" \
  --label "skip-changelog" \
  --label "release" \
  --base main)

echo ""
echo -e "${GREEN}${BOLD}Prep complete!${RESET}"
echo ""
echo -e "  PR: ${BOLD}${PR_URL}${RESET}"
echo ""
echo -e "  ${BOLD}After the PR is merged:${RESET}"
echo -e "    yarn release:publish"
