#!/bin/bash
# Build and deploy new documentation website

set -eo pipefail

# include .bash_profile and utils
source ~/.bash_profile
source .buildkite/scripts/common/utils.sh

# Enable corepack to expose yarn cli command
corepack enable

# Print out debug information
echo "Node.js version: $(node -v)"
echo "Yarn version: $(yarn -v)"

# Calculate paths and directories
if [[ -n "${BUILDKITE_PULL_REQUEST}" ]] && [[ "${BUILDKITE_PULL_REQUEST}" != "false" ]]; then
  PR_SLUG="pr_${BUILDKITE_PULL_REQUEST}"
  export STORYBOOK_BASE_URL="https://eui.elastic.co/${PR_SLUG}/storybook"
  bucket_directory="${PR_SLUG}/new-docs/"
  echo "Detected a PR preview environment configuration. The built files will be copied to ${bucket_directory}"
elif [[ -n "${BUILDKITE_BRANCH}" ]] && [[ "${BUILDKITE_BRANCH}" == "main" ]]; then
  # TODO: Detect if 'main' branch updated due to a new version being released based on BUILDKITE_TAG
  export STORYBOOK_BASE_URL="https://eui.elastic.co/storybook"
  bucket_directory="next/"
  echo "Detected a 'main' branch environment configuration. The built files will be copied to ${bucket_directory}"
else
  echo "The script has been triggered with no pull request or branch information. This is a no-op."
  exit 1
fi

echo "+++ :yarn: Installing dependencies"
yarn

echo "+++ :yarn: Building @elastic/eui-website and its local dependencies"

analytics_vault="secret/ci/elastic-eui/analytics"
# Pass base url to docusaurus. It must have a leading and trailing slash included.
export DOCS_BASE_URL="/${bucket_directory}"
export DOCS_GOOGLE_TAG_MANAGER_ID="$(retry 5 vault read -field=google_tag_manager_id "${analytics_vault}")"

yarn workspace @elastic/eui-website run build:workspaces

echo "+++ Configuring environment for website deployment"

gcloud auth activate-service-account --key-file <(echo "${GCE_ACCOUNT}")
unset GCE_ACCOUNT

storage_vault="secret/ci/elastic-eui/website-storage-bucket"
GCLOUD_PROJECT="$(retry 5 vault read -field=google_cloud_project "${storage_vault}")"
GCLOUD_BUCKET="$(retry 5 vault read -field=google_cloud_bucket "${storage_vault}")"
GCLOUD_BUCKET_FULL="${GCLOUD_PROJECT}-${GCLOUD_BUCKET}"

GCLOUD_CP_ARGS=(
  --cache-control="public, max-age=1800, must-revalidate" # set caching policy
  --recursive # copy all files recursively
  --predefined-acl="publicRead" # ensure copied files are publicly accessible
  --gzip-local="js,css,html,svg,png,jpg,ico" # gzip these file extensions before copying to the bucket
)

# Copy files to the GCS bucket

echo "+++ :bucket: Copying built files to the bucket"

# additional protection layer in case bucket_directory is ever unset
if [[ -z "${bucket_directory}" ]]; then
  bucket_directory="new-docs/"
fi

echo "Beginning to copy built files to /${bucket_directory}"
gcloud storage cp "${GCLOUD_CP_ARGS[@]}" packages/website/build/* "gs://${GCLOUD_BUCKET_FULL}/${bucket_directory}"

echo "New documentation website deployed: https://eui.elastic.co/${bucket_directory}" | buildkite-agent annotate --style "success" --context "deployed"

echo "* [Documentation website](https://eui.elastic.co/${bucket_directory})" | buildkite-agent meta-data set pr_comment:docs_deployment_link:head
