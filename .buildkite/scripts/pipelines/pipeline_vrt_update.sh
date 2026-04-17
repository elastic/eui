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
  SIGSTORE_ID_TOKEN="$(buildkite-agent oidc request-token --audience sigstore)"
  export SIGSTORE_ID_TOKEN
  github_user_vault="secret/ci/elastic-eui/github_machine_user"
  git config --local user.name "$(retry 5 vault read -field=name "${github_user_vault}")"
  git config --local user.email "$(retry 5 vault read -field=email "${github_user_vault}")"
  git config --local commit.gpgsign true
  git config --local gpg.x509.program gitsign
  git config --local gpg.format x509
  git add "${REF_DIR}"
  git commit -m "chore(eui): update VRT baseline screenshots" --no-verify
  git push origin "HEAD:${BUILDKITE_BRANCH}"
  echo "Updated VRT baseline screenshots committed and pushed"
else
  echo "No VRT baseline screenshots changes to commit"
fi
