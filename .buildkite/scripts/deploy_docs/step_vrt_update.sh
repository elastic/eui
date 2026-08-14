#!/bin/bash
# Update VRT baselines after a user has approved the visual changes with the
# Buildkite block step. Copies reported screenshots into the `.vrt/reference` directory,
# then commits and pushes into the branch.
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

# `vrt_passed` is set by `step_vrt_report.sh`: "true" on pass, "skipped" when the
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

REF_DIR="packages/eui/.vrt/reference"
CURRENT_DIR="packages/eui/.vrt/current"

export GH_TOKEN="${VAULT_GITHUB_TOKEN}"

############################################################
#         Copy reported screenshots into baselines         #
############################################################

echo "+++ Downloading reported VRT screenshots"
mkdir -p "${CURRENT_DIR}"

buildkite-agent artifact download "packages/eui/.vrt/current/*-received.png" .

if ! compgen -G "${CURRENT_DIR}/*-received.png" > /dev/null; then
  echo "No received screenshots found in artifacts from the VRT step."
  exit 1
fi

echo "+++ Updating reported baselines"
mkdir -p "${REF_DIR}"
for received in "${CURRENT_DIR}"/*-received.png; do
  story_name="$(basename "${received}" "-received.png")"
  cp "${received}" "${REF_DIR}/${story_name}.png"
  echo "Updated ${story_name}.png"
done

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
