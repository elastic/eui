#!/bin/bash
# Setup: calculate deployment paths and store shared config in build meta-data
# for the subsequent steps in `.buildkite/pipelines/deploy_docs.yml`.

set -eo pipefail

source ~/.bash_profile
source .buildkite/scripts/common/utils.sh

############################################################
#                      Configuration                       #
############################################################

# GCS storage project and bucket (stored in meta-data for subsequent steps)
storage_vault="secret/ci/elastic-eui/website-storage-bucket"
GCLOUD_PROJECT="$(retry 5 vault read -field=google_cloud_project "${storage_vault}")"
GCLOUD_BUCKET="$(retry 5 vault read -field=google_cloud_bucket "${storage_vault}")"
GCLOUD_BUCKET_FULL="${GCLOUD_PROJECT}-${GCLOUD_BUCKET}"

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

# Whether the pipeline is triggered by a pushed tag.
# Should be checked before is_pipeline_trigger_branch since
# BUILDKITE_BRANCH is sometimes set to the tag name.
is_pipeline_trigger_tag() {
  [[ -n "${BUILDKITE_TAG}" ]] && [[ "${BUILDKITE_TAG}" =~ $release_tag_pattern ]]
}

# Whether the pipeline is triggered by an updated branch
is_pipeline_trigger_branch() {
  if [[ -z "$1" ]]; then
    echo >&2 "is_pipeline_trigger_branch must be called with a branch name as an argument"
    exit 3
  fi

  [[ -n "${BUILDKITE_BRANCH}" ]] && [[ "${BUILDKITE_BRANCH}" == "$1" ]]
}

############################################################
#            Calculate paths and directories               #
############################################################

# Default Storybook URL (overridden for PRs)
STORYBOOK_BASE_URL="https://eui.elastic.co/storybook"

if is_pipeline_trigger_pull_request; then
  PR_SLUG="pr_${BUILDKITE_PULL_REQUEST}"
  STORYBOOK_BASE_URL="https://eui.elastic.co/${PR_SLUG}/storybook"
  bucket_directory="${PR_SLUG}/"
  copy_to_root_directory=false
  echo "Detected a PR preview environment configuration. The built files will be copied to ${bucket_directory}"
elif is_pipeline_trigger_tag; then
  latest_release_tag_on_main=$(git describe --tags "$(git rev-list --branches=main --tags --max-count=1)")
  bucket_directory="${BUILDKITE_TAG}/"
  copy_to_root_directory=false
  if [[ "${BUILDKITE_TAG}" == "${latest_release_tag_on_main}" ]]; then
    copy_to_root_directory=true
    echo "Detected the latest tagged release. The built files will be copied to the root directory and to ${bucket_directory}"
  else
    echo "Detected a tagged release. The built files will be copied to ${bucket_directory}"
  fi
elif is_pipeline_trigger_branch "main"; then
  bucket_directory="next/"
  echo "Detected a 'main' branch environment configuration. The built files will be copied to ${bucket_directory}"
else
  echo "The script has been triggered with no pull request, branch or tag information. This is a no-op."
  exit 1
fi

# Additional protection in case bucket_directory is ever unset
if [[ -z "${bucket_directory}" ]] && [[ "${copy_to_root_directory}" != true ]]; then
  echo >&2 "Detected an unset 'bucket_directory' variable. This is likely a mistake."
  exit 2
fi

############################################################
#            Share config with subsequent steps            #
############################################################

buildkite-agent meta-data set bucket_directory "${bucket_directory}"
buildkite-agent meta-data set storybook_base_url "${STORYBOOK_BASE_URL}"
buildkite-agent meta-data set copy_to_root_directory "${copy_to_root_directory}"
buildkite-agent meta-data set gcloud_bucket_full "${GCLOUD_BUCKET_FULL}"
