#!/bin/bash
# Commit changes to upstream git repository and publish built package to npmjs

set -eo pipefail

git_remote_name="origin"
git_branch="${BUILDKITE_BRANCH}"
npm_version=$(jq -r '.version' package.json)

##
# Configure git
##

# Get Sigstore OIDC token for commit signing
echo "Fetching OIDC token to sign the commit"
SIGSTORE_ID_TOKEN="$(buildkite-agent oidc request-token --audience sigstore)"

# Set commit user details
github_user_vault="secret/ci/elastic-eui/github_machine_user"
git config --local user.name "$(retry 5 vault read -field=name "${github_user_vault}")"
git config --local user.email "$(retry 5 vault read -field=email "${github_user_vault}")"

# Enable signing of commits and tags
git config --local commit.gpgsign true
git config --local tag.gpgsign true
git config --local gpg.x509.program gitsign
git config --local gpg.format x509

##
# Check if version isn't already published if RELEASE_VERSION is set
##

echo "+++ :npm: Checking npm registry"
if [[ "$(npm show @elastic/eui versions --json | jq 'index("${npm_version}")')" != "null" ]]; then
  >&2 echo "Version ${npm_version} has already been published to npm and can't be overridden:"
  >&2 echo "https://www.npmjs.com/package/@elastic/eui/v/${npm_version}"
  exit 2
fi

echo "Version ${npm_version} hasn't been published to npm yet"

##
# Commit package.json
##

echo "+++ :git: Adding and committing package.json"

# Always stage package.json
git add package.json

# Stage additional build artifacts

if [[ "$(git ls-files -m | grep "i18ntokens" -c)" -gt 0 ]]; then
  echo "Found i18ntokens.json changes to stage"
  git add i18ntokens.json i18ntokens_changelog.json
fi

if [[ "$(git ls-files -m | wc -l)" -gt 0 ]]; then
  >&2 echo "Found unexpected additional build artifacts:"
  git ls-files -m
  >&2 echo "eui-release doesn't know what to do with these files, exiting..."
  exit 5
fi

git commit -m "release: @elastic/eui v${npm_version} [skip-ci]" --no-verify

echo "+++ :git: Pushing commit to ${git_branch}"

# git push will be rejected by remote if there are any new commits or other
# changes made to the branch between the start of this build and now.
if ! git push "${git_remote_name}" HEAD:"${git_branch}"; then
  # fetch remote objects and refs without changing the local state
  git fetch upstream

  latest_commit_on_branch=$(git rev-parse "${git_remote_name}/${git_branch}")
  latest_commit_on_branch_subject=$(git rev-list --max-count=1 --no-commit-header --format=%s "${latest_commit_on_branch}")
  expected_commit_on_branch_subject=$(git rev-list --max-count=1 --no-commit-header --format=%s "${BUILDKITE_COMMIT}")

  >&2 echo "Git push failed. This usually means the remote branch (${git_branch}) has changed since this build started."
  >&2 echo "This script expected commit ${BUILDKITE_COMMIT} (${expected_commit_on_branch_subject}) to be the HEAD of branch ${git_branch} but instead it's ${latest_commit_on_branch} (${latest_commit_on_branch_subject})"
  exit 3
fi

if [[ "${RELEASE_TYPE}" == "release" ]]; then
  tag_name="v${npm_version}"
  echo "Creating and pushing release tag ${tag_name}"
  git tag --annotate "${tag_name}"
  git push "${git_remote_name}" "${tag_name}"
  echo "+++ :git: Pushed release tag - https://github.com/elastic/eui/tree/${tag_name}"
fi

##
# Publish to npm
##

echo "+++ :npm: Authenticating to npm"

npm_vault="secret/ci/elastic-eui/npm"
NPM_TOKEN=$(retry 5 vault read -field=token "${npm_vault}")
npm config set "//registry.npmjs.org/:_authToken=${NPM_TOKEN}"

echo "+++ :npm: Publishing @elastic/eui"

if [[ "${RELEASE_TYPE}" == "release" ]]; then
  npm publish --dry-run
else
  npm publish --dry-run --tag next
fi

echo "+++ :white_check_mark: Version ${npm_version} published!"
echo "https://www.npmjs.com/package/@elastic/eui/v/${npm_version}"
