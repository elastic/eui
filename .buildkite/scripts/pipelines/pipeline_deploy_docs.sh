#!/bin/bash
# Build and deploy new documentation website

set -eo pipefail

############################################################
#                          Setup                           #
############################################################

# Include .bash_profile and utils
source ~/.bash_profile
source .buildkite/scripts/common/utils.sh
source .buildkite/scripts/common/gcs_env.sh

# Enable corepack to expose the correct yarn cli command
corepack enable

# Print out debug information
echo "Node.js version: $(node -v)"
echo "Yarn version: $(yarn -v)"

############################################################
#                      Configuration                       #
############################################################

# GTM identifier
analytics_vault="secret/ci/elastic-eui/analytics"
export DOCS_GOOGLE_TAG_MANAGER_ID="$(retry 5 vault read -field=google_tag_manager_id \"${analytics_vault}\")"

# A pattern to recognize git tag names used for tagging actual releases with

# Whether this deployment should _also_ be copied to bucket's root directory (/)
# USE WITH CAUTION!
copy_to_root_directory=false

############################################################
#         Step 1 - Calculate paths and directories         #
############################################################

if is_pipeline_trigger_pull_request; then
  PR_SLUG="pr_${BUILDKITE_PULL_REQUEST}"
  bucket_directory="${PR_SLUG}/"
  echo "Detected a PR preview environment configuration. The built files will be copied to ${bucket_directory}"
elif is_pipeline_trigger_tag; then
  latest_release_tag_on_main=$(git describe --tags "$(git rev-list --branches=main --tags --max-count=1)")
  if [[ "${BUILDKITE_TAG}" == "${latest_release_tag_on_main}" ]]; then
    # Deploy to root directory. No trailing slash here
    bucket_directory=""
    copy_to_root_directory=true
    echo "Detected a tagged release. The built files will be copied to the root directory"
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

echo "+++ :yarn: Building @elastic/eui-website and its local dependencies"

# Pass base url to docusaurus. It must have a leading and trailing slash included.
export DOCS_BASE_URL="/${bucket_directory}"

yarn workspace @elastic/eui-website run build:workspaces

############################################################
#                    Step 4 - Deployment                   #
############################################################

echo "+++ Configuring environment for website deployment"
gcloud_authenticate

# Copy files to the GCS bucket

echo "+++ :bucket: Copying built files to the bucket"

check_bucket_directory_set

echo "Beginning to copy built files to /${bucket_directory}"
gcloud storage cp "${GCLOUD_CP_ARGS[@]}" packages/website/build/* "gs://${GCLOUD_BUCKET_FULL}/${bucket_directory}"
echo "Successfully copied files to /${bucket_directory}"

############################################################
#                      Step 5 - Notify                     #
############################################################

published_website_url="https://eui.elastic.co/${bucket_directory}"

# Add an annotation on top of the pipeline
echo "New documentation website deployed: ${published_website_url}" | buildkite-agent annotate --style "success" --context "deployed"

# Add an annotation in build status github comment
echo "* [Documentation website](${published_website_url})" | buildkite-agent meta-data set pr_comment:docs_deployment_link:head
