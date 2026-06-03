#!/bin/bash
# Build and deploy the documentation website to GCS.

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

GCLOUD_CP_ARGS=(
  --cache-control="public, max-age=1800, must-revalidate"
  --recursive
  --predefined-acl="publicRead"
  --gzip-local="js,css,html,svg,png,jpg,ico"
)

# GTM identifier (only needed for the website build)
analytics_vault="secret/ci/elastic-eui/analytics"
export DOCS_GOOGLE_TAG_MANAGER_ID="$(retry 5 vault read -field=google_tag_manager_id "${analytics_vault}")"

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
#                       Build website                      #
############################################################

echo "+++ Building @elastic/eui-website and its local dependencies"
yarn workspace @elastic/eui-website build:workspaces

echo "Building the website with /${bucket_directory} base path configuration"
export DOCS_BASE_URL="/${bucket_directory}"
yarn workspace @elastic/eui-website build
mv packages/website/build packages/website/build-default

if [[ "${copy_to_root_directory}" == "true" ]]; then
  echo "Building the website with / base path configuration"
  export DOCS_BASE_URL="/"
  yarn workspace @elastic/eui-website build
  mv packages/website/build packages/website/build-root
fi

############################################################
#                      Deploy website                      #
############################################################

echo "+++ Copying built website to the bucket"

echo "Beginning to copy built docs to /${bucket_directory}"
gcloud storage cp "${GCLOUD_CP_ARGS[@]}" packages/website/build-default/* "gs://${GCLOUD_BUCKET_FULL}/${bucket_directory}"
echo "Successfully copied docs to /${bucket_directory}"

if [[ "${copy_to_root_directory}" == "true" ]]; then
  echo "Beginning to copy built docs to /"
  gcloud storage cp "${GCLOUD_CP_ARGS[@]}" packages/website/build-root/* "gs://${GCLOUD_BUCKET_FULL}/"
  echo "Successfully copied docs to /"
fi
