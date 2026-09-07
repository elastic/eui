#!/bin/bash

# Push HEAD to the PR source branch. Requires `GH_TOKEN` to be exported.
function git_push_to_pr_branch {
  local branch="${BUILDKITE_BRANCH##*:}"
  # Normalize to HTTPS: `BUILDKITE_PULL_REQUEST_REPO` can be git://, git@, or https://
  local pr_repo_url="${BUILDKITE_PULL_REQUEST_REPO}"
  pr_repo_url="${pr_repo_url/git@github.com:/https://github.com/}"
  pr_repo_url="${pr_repo_url/git:\/\/github.com\//https://github.com/}"
  git remote add pr-origin "${pr_repo_url}" 2>/dev/null \
    || git remote set-url pr-origin "${pr_repo_url}"
  git push pr-origin "HEAD:${branch}" --no-verify
}

VRT_DIR="packages/eui/.vrt"
REF_DIR="${VRT_DIR}/reference"

# Get all VRT variants.
# Usage: `get_vrt_variants` `MY_ARRAY`
function get_vrt_variants {
  local -n _arr=$1
  mapfile -t _arr < <(node -e "Object.keys(require('./packages/eui/.storybook/vrt-variants.json')).forEach(k => console.log(k))")
}

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
