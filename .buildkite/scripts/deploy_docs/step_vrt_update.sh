#!/bin/bash
# Update VRT baselines after a user has approved the visual changes with the
# Buildkite block step. Runs VRT in `--updateSnapshot` mode against the deployed
# Storybook, then commits and pushes the updated reference screenshots.
#
# This step is declared statically in `deploy_docs.yml` and runs on every
# PR build (once the block step is approved). When VRT didn't actually fail,
# it short-circuits below.

set -eo pipefail

source ~/.bash_profile
source .buildkite/scripts/common/utils.sh

############################################################
#       Gate: only run when VRT actually failed            #
############################################################

# `vrt_passed` is set by `step_vrt.sh`: "true" on pass, "skipped" when the
# `skip-vrt` label is present, "false" only when visual differences were found.
# Anything other than "false" means there is nothing to update.

vrt_passed="$(buildkite-agent meta-data get vrt_passed --default "true")"

if [[ "${vrt_passed}" != "false" ]]; then
  echo "VRT did not fail (vrt_passed=${vrt_passed}); nothing to update."
  exit 0
fi

############################################################
#                      Configuration                       #
############################################################

corepack enable
echo "Node.js version: $(node -v)"
echo "Yarn version: $(yarn -v)"

STORYBOOK_URL="$(buildkite-agent meta-data get storybook_base_url)"
REF_DIR="packages/eui/.vrt/reference"

export GH_TOKEN="${VAULT_GITHUB_TOKEN}"

############################################################
#                     Install dependencies                 #
############################################################

echo "+++ Installing dependencies"
sudo apt-get install -y fonts-noto-color-emoji 2>/dev/null || true
fc-cache -fv 2>/dev/null || true
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

  github_user_vault="secret/ci/elastic-eui/github_machine_user"
  git config --local user.name "$(retry 5 vault read -field=name "${github_user_vault}")"
  git config --local user.email "$(retry 5 vault read -field=email "${github_user_vault}")"
  gh auth setup-git
  git add "${REF_DIR}"
  git commit -m "chore(eui): update VRT baseline screenshots" --no-verify
  git_push_to_pr_branch
  echo "Updated VRT baseline screenshots committed and pushed"
else
  echo "No VRT baseline screenshots changes to commit"
fi
