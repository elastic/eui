#!/bin/bash
# Build and deploy new documentation website

set -eo pipefail

############################################################
#                          Setup                           #
############################################################

# include .bash_profile and utils
source ~/.bash_profile
source .buildkite/scripts/common/utils.sh

# Enable corepack to expose the correct yarn cli command
corepack enable

# Print out debug information
echo "Node.js version: $(node -v)"
echo "Yarn version: $(yarn -v)"

############################################################
#                      Configuration                       #
############################################################

# GCS storage project and bucket
storage_vault="secret/ci/elastic-eui/website-storage-bucket"
GCLOUD_PROJECT="$(retry 5 vault read -field=google_cloud_project "${storage_vault}")"
GCLOUD_BUCKET="$(retry 5 vault read -field=google_cloud_bucket "${storage_vault}")"
GCLOUD_BUCKET_FULL="${GCLOUD_PROJECT}-${GCLOUD_BUCKET}"

# GCS storage copy arguments
GCLOUD_CP_ARGS=(
  --cache-control="public, max-age=1800, must-revalidate" # set caching policy
  --recursive # copy all files recursively
  --predefined-acl="publicRead" # ensure copied files are publicly accessible
  --gzip-local="js,css,html,svg,png,jpg,ico" # gzip these file extensions before copying to the bucket
)

# Default to production deployment of Storybook
export STORYBOOK_BASE_URL="https://eui.elastic.co/storybook"

# GTM identifier
analytics_vault="secret/ci/elastic-eui/analytics"
export DOCS_GOOGLE_TAG_MANAGER_ID="$(retry 5 vault read -field=google_tag_manager_id "${analytics_vault}")"

# A pattern to recognize git tag names used for tagging actual releases with
release_tag_pattern="v[0-9]+\.[0-9]+\.[0-9]+"

# Whether this deployment should _also_ be copied to bucket's root directory (/)
# USE WITH CAUTION!
copy_to_root_directory=false

############################################################
#               Utility pipeline functions                 #
############################################################

# Whether the pipeline is triggered by a pull request
is_pipeline_trigger_pull_request() {
  [[ -n "${BUILDKITE_PULL_REQUEST}" ]] && [[ "${BUILDKITE_PULL_REQUEST}" != "false" ]]
}

# Whether the pipeline is triggered by a pushed tag
# It should be used in above the is_pipeline_trigger_branch check
# since BUILDKITE_BRANCH is sometimes set to the tag name
is_pipeline_trigger_tag() {
  [[ -n "${BUILDKITE_TAG}" ]] && [[ "${BUILDKITE_TAG}" =~ $release_tag_pattern ]]
}

# Whether the pipeline is triggered by an updated `main` branch
is_pipeline_trigger_branch() {
  if [[ -z "$1" ]]; then
    echo >&2 "is_pipeline_trigger_branch must be called with a branch name as an argument"
    exit 3
  fi

  [[ -n "${BUILDKITE_BRANCH}" ]] && [[ "${BUILDKITE_BRANCH}" == "$1" ]]
}

############################################################
#         Step 1 - Calculate paths and directories         #
############################################################

if is_pipeline_trigger_pull_request; then
  PR_SLUG="pr_${BUILDKITE_PULL_REQUEST}"
  export STORYBOOK_BASE_URL="https://eui.elastic.co/${PR_SLUG}/storybook"
  bucket_directory="${PR_SLUG}/"
  echo "Detected a PR preview environment configuration. The built files will be copied to ${bucket_directory}"
elif is_pipeline_trigger_tag; then
  latest_release_tag_on_main=$(git describe --tags "$(git rev-list --branches=main --tags --max-count=1)")
  bucket_directory="${BUILDKITE_TAG}/"
  copy_to_root_directory=false
  if [[ "${BUILDKITE_TAG}" == "${latest_release_tag_on_main}" ]]; then
    # Deploy to root directory and version subfolder
    copy_to_root_directory=true
    echo "Detected the latest tagged release. The built files will be copied to the root directory and to ${bucket_directory}"
  else
    bucket_directory="${BUILDKITE_TAG}/"
    echo "Detected a tagged release. The built files will be copied to ${bucket_directory}"
  fi
elif is_pipeline_trigger_branch "main"; then
  bucket_directory="next/"
  echo "Detected a 'main' branch environment configuration. The built files will be copied to ${bucket_directory}"
else
  echo "The script has been triggered with no pull request, branch or tag information. This is a no-op."
  exit 1
fi

############################################################
#                  Step 2 - Dependencies                   #
############################################################

echo "+++ :yarn: Installing dependencies"
yarn

############################################################
#                      Step 3 - Build                      #
############################################################

# Build the website
echo "+++ :yarn: Building @elastic/eui-website and its local dependencies"
yarn workspace @elastic/eui-website build:workspaces

echo "Building the website with ${bucket_directory} base path configuration"
# Pass base url to docusaurus. It must have a leading and trailing slash included.
export DOCS_BASE_URL="/${bucket_directory}"
yarn workspace @elastic/eui-website build
mv packages/website/build packages/website/build-default

if [[ "${copy_to_root_directory}" == true ]]; then
  echo "Building the website with / base path configuration"
  export DOCS_BASE_URL="/"
  yarn workspace @elastic/eui-website build
  mv packages/website/build packages/website/build-root
fi

# Build Storybook
echo "+++ :yarn: Building Storybook and @elastic/eui local dependencies"
yarn workspace @elastic/eui build:workspaces
yarn workspace @elastic/eui build-storybook

############################################################
#       Step 4 - Configure environment for deployment      #
############################################################

echo "+++ Configuring environment for website deployment"

gcloud auth activate-service-account --key-file <(echo "${GCE_ACCOUNT}")
unset GCE_ACCOUNT

# Copy files to the GCS bucket
echo "+++ :bucket: Copying built files to the bucket"

# additional protection layer in case bucket_directory is ever unset
if [[ -z "${bucket_directory}" ]] && [[ "${copy_to_root_directory}" != true ]]; then
  echo >&2 "Detected an unset 'bucket_directory' variable. This is likely a mistake."
  exit 2
fi

############################################################
#                  Step 6 - Deploy website                 #
############################################################

# Deploy docs to default directory (pr_<X>, /v<X> or /next)
echo "Beginning to copy built docs to /${bucket_directory}"
gcloud storage cp "${GCLOUD_CP_ARGS[@]}" packages/website/build-default/* "gs://${GCLOUD_BUCKET_FULL}/${bucket_directory}"
echo "Successfully copied docs to /${bucket_directory}"

# Deploy docs to root directory (/) if it's the latest release
if [[ "${copy_to_root_directory}" == true ]]; then
  echo "Beginning to copy built docs to /"
  gcloud storage cp "${GCLOUD_CP_ARGS[@]}" packages/website/build-root/* "gs://${GCLOUD_BUCKET_FULL}/"
  echo "Successfully copied docs to /"
fi

############################################################
#                 Step 7 - Deploy Storybook                #
############################################################

# Deploy Storybook
storybook_target_dir="${bucket_directory}storybook/"
echo "Beginning to copy Storybook to /${storybook_target_dir}"
gcloud storage cp "${GCLOUD_CP_ARGS[@]}" packages/eui/storybook-static/* "gs://${GCLOUD_BUCKET_FULL}/${storybook_target_dir}"
echo "Successfully copied Storybook to /${storybook_target_dir}"

# Deploy Storybook to /storybook if it's the latest release
if [[ "${copy_to_root_directory}" == true ]]; then
  echo "Also copying Storybook to /storybook/"
  gcloud storage cp "${GCLOUD_CP_ARGS[@]}" packages/eui/storybook-static/* "gs://${GCLOUD_BUCKET_FULL}/storybook/"
  echo "Successfully copied Storybook to /storybook/"
fi

############################################################
#                      Step 8 - Notify                     #
############################################################

published_website_url="https://eui.elastic.co/${bucket_directory}"
published_storybook_url="https://eui.elastic.co/${bucket_directory}storybook/"

if [[ "${copy_to_root_directory}" == true ]]; then
  published_website_url="https://eui.elastic.co/ (root) and https://eui.elastic.co/${bucket_directory}"
  published_storybook_url="https://eui.elastic.co/storybook/ (root) and https://eui.elastic.co/${bucket_directory}storybook/"
fi

# Add an annotation on top of the pipeline
echo -e "New documentation website deployed: ${published_website_url}\nNew Storybook deployed: ${published_storybook_url}" | buildkite-agent annotate --style "success" --context "deployed"

# Add an annotation in build status github comment
echo -e "* [Documentation website](${published_website_url})\n* [Storybook](${published_storybook_url})" | buildkite-agent meta-data set pr_comment:docs_deployment_link:head
