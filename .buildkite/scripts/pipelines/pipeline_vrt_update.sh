#!/bin/bash
# Update VRT baselines after a user has approved the visual changes with the
# Buildkite block step. Runs VRT in `--updateSnapshot` mode against the deployed
# Storybook, then commits and pushes the updated reference screenshots.

set -eo pipefail

source ~/.bash_profile
source .buildkite/scripts/common/utils.sh

corepack enable
echo "Node.js version: $(node -v)"
echo "Yarn version: $(yarn -v)"

############################################################
#                      Configuration                       #
############################################################

STORYBOOK_URL="$(buildkite-agent meta-data get storybook_base_url)"
REF_DIR="packages/eui/.vrt/reference"

export GH_TOKEN="${VAULT_GITHUB_TOKEN}"

############################################################
#                     Install dependencies                 #
############################################################

echo "+++ Installing dependencies"
yarn

############################################################
#                   Update baselines                       #
############################################################

echo "+++ Updating VRT baselines against ${STORYBOOK_URL}"
yarn workspace @elastic/eui test-visual-regression update -- --url "${STORYBOOK_URL}"

############################################################
#                 Commit updated baselines                 #
############################################################

if [[ -n "$(git status --porcelain -- "${REF_DIR}")" ]]; then
  echo "+++ Committing updated VRT baseline screenshots"
  gh auth setup-git
  git add "${REF_DIR}"
  git commit -m "chore(eui): update VRT baseline screenshots" --no-verify
  git_push_to_pr_branch
  echo "Updated VRT baseline screenshots committed and pushed"
else
  echo "No VRT baseline screenshots changes to commit"
fi
