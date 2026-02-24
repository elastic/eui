#!/usr/bin/env bash
#
# Official release preparation script (pre-PR)
#
# Automates steps 1-8 of the official release process:
#   1. Log out of npm
#   2. Checkout main
#   3. Pull latest from upstream
#   4. Create a timestamped release branch
#   5. Build the release CLI
#   6. Run the release dry-run (interactive)
#   7. (User confirms in the interactive CLI)
#   8. Push the branch to origin and open a PR
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

# Verify the upstream remote exists
git remote get-url upstream &>/dev/null || error "'upstream' remote not found. Please add it: git remote add upstream git@github.com:elastic/eui.git"

# ── Step 1: Log out of npm ──────────────────────────────────────────────────

step "1/8" "Ensuring npm is not authenticated..."
npm logout 2>/dev/null || true
yarn npm logout 2>/dev/null || true

# ── Step 2: Checkout main ───────────────────────────────────────────────────

step "2/8" "Checking out main branch..."
git checkout main

# ── Step 3: Pull latest ────────────────────────────────────────────────────

step "3/8" "Pulling latest changes from upstream..."
git pull upstream main

# ── Step 4: Create release branch ───────────────────────────────────────────

BRANCH_NAME="release/$(date +%s)"
step "4/8" "Creating release branch: ${BOLD}${BRANCH_NAME}${RESET}"
git checkout -b "$BRANCH_NAME"

# ── Step 5: Build release CLI ───────────────────────────────────────────────

step "5/8" "Installing dependencies and building release CLI..."
yarn
yarn workspace @elastic/eui-release-cli run build

# ── Step 6: Run release (dry-run) ───────────────────────────────────────────

step "6/8" "Starting release process (dry-run)..."
echo ""
yarn release run official --dry-run --allow-custom --skip-auth-check --use-auth-token

# ── Step 7: Push branch ────────────────────────────────────────────────────

step "7/8" "Pushing branch to origin..."
git push -u origin "$BRANCH_NAME"

# ── Step 8: Open PR ────────────────────────────────────────────────────────

step "8/8" "Opening release PR..."

# Detect changed packages by comparing versions on this branch vs main
PR_TITLE_PARTS=""
PR_BODY_LINES=""

for pkg_dir in packages/eui packages/eui-theme-common packages/eui-theme-borealis packages/docusaurus-preset packages/docusaurus-theme packages/eslint-plugin; do
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
