#!/bin/bash

set -eo pipefail

# Begin configuration

npm_version_prerelease_prefix="next"
git_remote_name="origin"
git_branch="${BUILDKITE_BRANCH}"
# TODO: Remove --dry-run flag after testing
git_push_flags="--dry-run"

# End configuration

# Check release type (prerelease or regular release)

release_type="prerelease"

if [[ "${RELEASE_TYPE}" == "release" ]]; then
  release_type="release"
fi

# Check version number

if [[ "${release_type}" == "release" ]] && [[ -z "${RELEASE_VERSION}" ]]; then
  >&2 echo "RELEASE_VERSION must be set when RELEASE_TYPE is 'release'"
  exit 1
fi

echo "--- Updating version on branch ${git_branch}"
echo "release type: ${release_type}"
echo "npm version prerelease prefix: ${npm_version_prerelease_prefix}"
echo "git branch: ${git_branch}"
echo "git push flags: ${git_push_flags}"

# Configure yarn
# Unnecessary output on stdout is redirected to /dev/null

echo "--- Updating @elastic/eui version string"

# disable 'yarn version' calling 'git commit' and 'git tag' automatically
yarn config set version-git-tag false 1> /dev/null

if [[ "${release_type}" == "release" ]]; then
  # RELEASE_VERSION is always defined at this stage for "release" release type
  yarn version --new-version "${RELEASE_VERSION}"
else
  yarn version --prerelease --preid "${npm_version_prerelease_prefix}"
fi

new_version="$(node --print 'require("./package.json").version')"
echo "Version string updated to ${new_version}"

# Commit

echo "--- fetching OIDC token to sign commit"

SIGSTORE_ID_TOKEN="$(buildkite-agent oidc request-token --audience sigstore)"

echo "--- Committing version update"

git config --local commit.gpgsign true
git config --local tag.gpgsign true
git config --local gpg.x509.program gitsign
git config --local gpg.format x509

git add package.json
git commit -m "release: @elastic/eui v${new_version} [skip-ci]"

# Push to a branch from a detached head
git push "${git_push_flags}" "${git_remote_name}" HEAD:"${git_branch}"

echo "Pushed version update commit to '${git_branch}'"

# Create a tag if release type is "release"
if [[ "${release_type}" == "release" ]]; then
  tag_name="v${new_version}"
  git tag --annotate "${tag_name}"
  git push "${git_push_flags}" "${git_remote_name}" "${tag_name}"
  echo "Created and pushed release tag '${tag_name}'"
fi
