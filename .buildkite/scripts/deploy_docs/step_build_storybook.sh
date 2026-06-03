#!/bin/bash
# Build and deploy Storybook to GCS.

set -eo pipefail

source ~/.bash_profile
source .buildkite/scripts/common/utils.sh

corepack enable
echo "Node.js version: $(node -v)"
echo "Yarn version: $(yarn -v)"

############################################################
#                      Configuration                       #
############################################################

bucket_directory="$(buildkite-agent meta-data get bucket_directory)"
copy_to_root_directory="$(buildkite-agent meta-data get copy_to_root_directory)"
GCLOUD_BUCKET_FULL="$(buildkite-agent meta-data get gcloud_bucket_full)"

# Embed the correct base URL into the Storybook bundle at build time
export STORYBOOK_BASE_URL="$(buildkite-agent meta-data get storybook_base_url)"

GCLOUD_CP_ARGS=(
  --cache-control="public, max-age=1800, must-revalidate"
  --recursive
  --predefined-acl="publicRead"
  --gzip-local="js,css,html,svg,png,jpg,ico"
)

############################################################
#                   Authenticate with GCS                  #
############################################################

gcloud auth activate-service-account --key-file <(echo "${GCE_ACCOUNT}")
unset GCE_ACCOUNT

############################################################
#                     Install dependencies                 #
############################################################

echo "+++ Installing dependencies"
yarn

############################################################
#                      Build Storybook                     #
############################################################

echo "+++ Building Storybook and @elastic/eui local dependencies"
yarn workspace @elastic/eui build:workspaces
yarn workspace @elastic/eui build-storybook

############################################################
#                     Deploy Storybook                     #
############################################################

echo "+++ Copying built Storybook to the bucket"

storybook_target_dir="${bucket_directory}storybook/"
echo "Beginning to copy Storybook to /${storybook_target_dir}"
gcloud storage cp "${GCLOUD_CP_ARGS[@]}" packages/eui/storybook-static/* "gs://${GCLOUD_BUCKET_FULL}/${storybook_target_dir}"
echo "Successfully copied Storybook to /${storybook_target_dir}"

if [[ "${copy_to_root_directory}" == "true" ]]; then
  echo "Also copying Storybook to /storybook/"
  gcloud storage cp "${GCLOUD_CP_ARGS[@]}" packages/eui/storybook-static/* "gs://${GCLOUD_BUCKET_FULL}/storybook/"
  echo "Successfully copied Storybook to /storybook/"
fi
