#!/bin/bash
# Build and deploy Storybook

set -eo pipefail

############################################################
#                          Setup                           #
############################################################

# Include .bash_profile, utils, and shared GCS env
source ~/.bash_profile
source .buildkite/scripts/common/utils.sh
source .buildkite/scripts/common/gcs_env.sh

# Enable corepack to expose the correct yarn cli command
corepack enable

# Print out debug information
echo "Node.js version: $(node -v)"
echo "Yarn version: $(yarn -v)"

############################################################
#         Step 1 - Calculate paths and directories         #
############################################################

if is_pipeline_trigger_pull_request; then
  PR_SLUG="pr_${BUILDKITE_PULL_REQUEST}"
  bucket_directory="${PR_SLUG}/storybook/"
  echo "Detected PR environment. Storybook will be deployed to ${bucket_directory}"
elif is_pipeline_trigger_tag; then
  latest_release_tag_on_main=$(git describe --tags "$(git rev-list --branches=main --tags --max-count=1)")
  if [[ "${BUILDKITE_TAG}" == "${latest_release_tag_on_main}" ]]; then
    bucket_directory="storybook/"
    echo "Detected latest tagged release on main. Storybook will be deployed to root storybook/"
  else
    bucket_directory="${BUILDKITE_TAG}/storybook/"
    echo "Detected tagged release. Storybook will be deployed to ${bucket_directory}"
  fi
elif is_pipeline_trigger_branch "main"; then
  bucket_directory="next/storybook/"
  echo "Detected 'main' branch. Storybook will be deployed to ${bucket_directory}"
else
  echo "No PR, branch, or tag detected. Exiting."
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

echo "+++ :yarn: Building @elastic/eui and its local dependencies"
yarn workspace @elastic/eui run build:workspaces

echo "+++ :yarn: Building Storybook"
yarn workspace @elastic/eui run build-storybook

############################################################
#                    Step 4 - Deployment                   #
############################################################

echo "+++ Configuring environment for Storybook deployment"
gcloud_authenticate

# Copy files to the GCS bucket

echo "+++ :bucket: Copying built files to the bucket"

check_bucket_directory_set

echo "Beginning to copy built files to /${bucket_directory}"
gcloud storage cp "${GCLOUD_CP_ARGS[@]}" packages/eui/storybook-static/* "gs://${GCLOUD_BUCKET_FULL}/${bucket_directory}"
echo "Successfully copied files to /${bucket_directory}"

############################################################
#                      Step 5 - Notify                     #
############################################################

published_storybook_url="https://eui.elastic.co/${bucket_directory}"

# Add an annotation on top of the pipeline
echo "Storybook deployed: ${published_storybook_url}" | buildkite-agent annotate --style "success" --context "storybook_deployed"

# Add an annotation in build status GitHub comment
echo "* [Storybook](${published_storybook_url})" | buildkite-agent meta-data set pr_comment:storybook_deployment_link:head
