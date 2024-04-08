#!/bin/bash
# Update version number and commit it back to the repository.
#
# Supported configuration via environment variables:
#  * RELEASE_TYPE (optional) - Type of release that should be performed. Defaults to prerelease (possible values: "release", "prerelease")
#  * RELEASE_VERSION (required when RELEASE_TYPE="release") - The new package.json version string. Must follow semver notation.
#

set -eo pipefail

# TODO: It's possible to release non-HEAD commits but we'd need to skip committing the version update back to the repo

# Begin configuration

npm_version_prerelease_prefix="next"
git_remote_name="origin"
git_branch="${BUILDKITE_BRANCH}"

# End configuration

if [[ -z "${git_branch}" ]]; then
  >&2 echo "BUILDKITE_BRANCH is not set. This usually means you're trying to execute this script from the outside of Buildkite pipeline which is unsupported."
  exit 1
fi

##
# Check release type (prerelease or regular release)
##

release_type="prerelease"
if [[ "${RELEASE_TYPE}" == "release" ]]; then
  release_type="release"
fi

##
# Check version number
##

if [[ "${release_type}" == "release" ]] && [[ -z "${RELEASE_VERSION}" ]]; then
  >&2 echo "RELEASE_VERSION must be set when RELEASE_TYPE is 'release'"
  exit 1
fi

##
# Print run's configuration
##

echo "+++ Updating version on branch ${git_branch}"
echo "release type: ${release_type}"
echo "release version: ${RELEASE_VERSION}"
echo "npm version prerelease prefix: ${npm_version_prerelease_prefix}"
echo "git branch: ${git_branch}"
echo "git push flags: ${git_push_flags}"
echo "git remote URL: $(git remote get-url "${git_remote_name}")"
echo "node version: $(node -v)"
echo "user: $(whoami)"

##
# Update package.json version string
##

echo "+++ Updating @elastic/eui version string"

npm_version_args=(
  --git-tag-version=false # disable tagging the new version
  --sign-git-tag=false # disable signing the git tag
  --commit-hooks=false # disable all git commit hooks
)

new_version=""
if [[ "${release_type}" == "release" ]]; then
  new_version=$(npm version "${npm_version_args[@]}" "${RELEASE_VERSION}")
else
  new_version=$(npm version "${npm_version_args[@]}" --preid=${npm_version_prerelease_prefix} prerelease)
fi

# npm version output prefixes the new version with 'v'
new_version="${new_version:1}"

echo "Updated @elastic/eui version string to ${new_version}"

##
# Check if version isn't already published if RELEASE_VERSION is set
##

echo "+++ :npm: Checking npm registry"
if [[ "$(npm show @elastic/eui versions --json | jq 'index("${new_version}")')" != "null" ]]; then
  >&2 echo "Version ${new_version} has already been published to npm and can't be overridden:"
  >&2 echo "https://www.npmjs.com/package/@elastic/eui/v/${new_version}"
  exit 2
fi

echo "Version ${new_version} hasn't been published to npm yet"

##
# Commit package.json
##

echo "+++ :git: Committing the version update"

echo "Fetching OIDC token to sign the commit"
#SIGSTORE_ID_TOKEN="$(buildkite-agent oidc request-token --audience sigstore)"

github_user_vault="secret/ci/elastic-eui/github_machine_user"

git config --local user.name "$(vault read -field=name "${github_user_vault}")"
git config --local user.email "$(vault read -field=email "${github_user_vault}")"
git config --local commit.gpgsign true
git config --local tag.gpgsign true
git config --local gpg.x509.program gitsign
git config --local gpg.format x509

echo "Adding and committing package.json"
git add package.json
git commit -m "release: @elastic/eui v${new_version} [skip-ci]"

echo "Pushing commit to ${git_branch}"

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

if [[ "${release_type}" == "release" ]]; then
  tag_name="v${new_version}"
  echo "Creating and pushing release tag ${tag_name}"
  git tag --annotate "${tag_name}"
  git push "${git_remote_name}" "${tag_name}"
  echo "Pushed release tag - https://github.com/elastic/eui/tree/${tag_name}"
fi

##
# Success!
##

echo "+++ :white_check_mark: Version successfully updated"
