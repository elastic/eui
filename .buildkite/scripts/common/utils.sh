#!/bin/bash

function retry {
  local retries=$1
  shift

  local count=0

  until "$@"; do
    exit=$?
    wait=$((2 ** count))
    count=$((count + 1))
    
    if [ $count -lt "$retries" ]; then
      >&2 echo "Retry $count of $retries exited $exit. Retrying in $wait seconds."
    else
      >&2 echo "Retry $count of $retries exited $exit. No retries left."
      return $exit
    fi

  done
  return 0
}

# A pattern to recognize git tag names used for tagging actual releases with
export release_tag_pattern="v[0-9]+\.[0-9]+\.[0-9]+"

# Utility pipeline functions for trigger detection
is_pipeline_trigger_pull_request() {
  [[ -n "${BUILDKITE_PULL_REQUEST}" ]] && [[ "${BUILDKITE_PULL_REQUEST}" != "false" ]]
}

is_pipeline_trigger_tag() {
  [[ -n "${BUILDKITE_TAG}" ]] && [[ "${BUILDKITE_TAG}" =~ $release_tag_pattern ]]
}

is_pipeline_trigger_branch() {
  if [[ -z "$1" ]]; then
    echo >&2 "is_pipeline_trigger_branch must be called with a branch name as an argument"
    exit 3
  fi
  [[ -n "${BUILDKITE_BRANCH}" ]] && [[ "${BUILDKITE_BRANCH}" == "$1" ]]
}

# Utility function to authenticate with Google Cloud
gcloud_authenticate() {
  command -v gcloud >/dev/null 2>&1 || { echo >&2 "gcloud is required but not installed. Aborting."; exit 1; }
  gcloud auth activate-service-account --key-file <(echo "${GCE_ACCOUNT}")
  unset GCE_ACCOUNT
}

# Utility function to check if the bucket directory is set
check_bucket_directory_set() {
  if [[ -z "${bucket_directory}" ]] && [[ "${copy_to_root_directory}" != true ]]; then
    echo >&2 "Detected an unset 'bucket_directory' variable. This is likely a mistake."
    exit 2
  fi
}
