#!/usr/bin/env bash

# Verifies a release source and emits approval-gate outputs.

set -euo pipefail

error() {
  echo "::error::${1//[$'\r\n']/ }" >&2
  exit 1
}

verify_commit_exists() {
  git rev-parse --verify --quiet "$RELEASE_REF^{commit}" > /dev/null ||
    error "Release ref $RELEASE_REF is not available in $GITHUB_REPOSITORY"
}

verify_main_commit() {
  verify_commit_exists
  git merge-base --is-ancestor "$RELEASE_REF" HEAD ||
    error "Release ref $RELEASE_REF is not contained in $GITHUB_REPOSITORY:main"
}

validate_release_arguments() {
  local workspace
  local -a workspaces

  if [[ -n "$NPM_TAG" && ! "$NPM_TAG" =~ ^[a-zA-Z0-9][a-zA-Z0-9._-]*$ ]]; then
    error "Invalid npm tag: $NPM_TAG"
  fi

  if [[ -n "$WORKSPACES" ]]; then
    IFS=',' read -r -a workspaces <<< "$WORKSPACES"
    for workspace in "${workspaces[@]}"; do
      [[ "$workspace" != -* && "$workspace" =~ ^[a-zA-Z0-9@._/-]+$ ]] ||
        error "Invalid workspace: $workspace"
    done
  fi
}

RELEASE_REF="$(tr '[:upper:]' '[:lower:]' <<< "$RELEASE_REF")"
[[ "$RELEASE_REF" =~ ^[0-9a-f]{40}$ ]] ||
  error 'release_ref must be a full 40-character commit SHA'

if [[ "$NIGHTLY" == 'true' ]]; then
  [[ "$RELEASE_TYPE" == 'snapshot' && "$GITHUB_ACTOR" == 'github-actions[bot]' ]] ||
    error 'Nightly releases must be automated snapshots'

  verify_main_commit

  [[ "$DRY_RUN" == 'false' &&
    "$KIBANA_INTEGRATION" == 'true' &&
    -z "$NPM_TAG" &&
    "$SKIP_TESTS" == 'false' &&
    -z "$SOURCE_PR_NUMBER" &&
    -z "$WORKSPACES" ]] ||
    error 'Nightly snapshot inputs do not match the automated configuration'

  echo 'requires_approval=false' >> "$GITHUB_OUTPUT"
  exit 0
fi

validate_release_arguments

if [[ "$RELEASE_TYPE" == 'official' ]]; then
  verify_commit_exists
  echo 'requires_approval=false' >> "$GITHUB_OUTPUT"
  exit 0
fi

[[ "$RELEASE_TYPE" == 'snapshot' ]] ||
  error "Unsupported release type: $RELEASE_TYPE"

main_sha="$(git rev-parse HEAD)"
review_url="https://github.com/$GITHUB_REPOSITORY/compare/$main_sha...$RELEASE_REF"

if [[ -n "$SOURCE_PR_NUMBER" ]]; then
  [[ "$SOURCE_PR_NUMBER" =~ ^[1-9][0-9]*$ ]] ||
    error "Invalid snapshot source PR number: $SOURCE_PR_NUMBER"

  pull_request="$(gh api "repos/$GITHUB_REPOSITORY/pulls/$SOURCE_PR_NUMBER")"
  base_repository="$(jq -r '.base.repo.full_name' <<< "$pull_request")"
  base_ref="$(jq -r '.base.ref' <<< "$pull_request")"
  base_sha="$(jq -r '.base.sha' <<< "$pull_request")"
  head_repository="$(jq -r '.head.repo.full_name // empty' <<< "$pull_request")"
  head_sha="$(jq -r '.head.sha' <<< "$pull_request")"

  [[ "$base_repository" == "$GITHUB_REPOSITORY" && "$base_ref" == 'main' ]] ||
    error "Source PR must target $GITHUB_REPOSITORY:main"
  [[ "$head_sha" == "$RELEASE_REF" ]] ||
    error "Source PR head $head_sha does not match release ref $RELEASE_REF"
  [[ -n "$head_repository" ]] ||
    error 'Source PR head repository is unavailable'

  review_url="https://github.com/$head_repository/compare/$base_sha...$head_sha"
else
  verify_commit_exists
fi

{
  echo 'requires_approval=true'
  echo "review_url=$review_url"
} >> "$GITHUB_OUTPUT"
