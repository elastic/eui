#!/bin/bash

# Push HEAD to the PR source branch using the elastic machine user.
function git_push_to_pr_branch {
  local branch="${BUILDKITE_BRANCH##*:}"
  local pr_repo_url="${BUILDKITE_PULL_REQUEST_REPO/https:\/\//https:\/\/x-access-token:${GITHUB_TOKEN}@}"
  
  git remote add pr-origin "${pr_repo_url}" 2>/dev/null \
    || git remote set-url pr-origin "${pr_repo_url}"
  git push pr-origin "HEAD:${branch}"
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
