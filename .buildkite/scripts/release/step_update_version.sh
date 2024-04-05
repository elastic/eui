#!/bin/bash
# Update version number and commit it back to the repository.
#
# Supported configuration via environment variables:
#  * RELEASE_TYPE (optional) - Type of release that should be performed. Defaults to prerelease (possible values: "release", "prerelease")
#  * RELEASE_VERSION (required when RELEASE_TYPE="release") - The new package.json version string. Must follow semver notation.
#

set -eo pipefail
set -x

# TODO: It's possible to release non-HEAD commits but we'd need to skip committing the version update back to the repo

##
# Install gitsign
# TODO: Move to agent image
##

wget https://github.com/sigstore/gitsign/releases/download/v0.10.1/gitsign_0.10.1_linux_amd64.deb -O /tmp/gitsign.deb
dpkg -i /tmp/gitsign.deb

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

##
# Check if version isn't already published if RELEASE_VERSION is set
##

if [[ -n "${RELEASE_VERSION}" ]]; then
  echo "+++ :npm: Checking npm registry"
  if [[ "$(npm show @elastic/eui versions --json | jq 'index("${RELEASE_VERSION}")')" != "null" ]]; then
    >&2 echo "Version ${RELEASE_VERSION} has already been published to npm and can't be overridden:"
    >&2 echo "https://www.npmjs.com/package/@elastic/eui/v/${RELEASE_VERSION}"
    exit 2
  fi

  echo "Version ${RELEASE_VERSION} hasn't been published to npm yet"
fi

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

echo "Updated @elastic/eui version string to ${new_version}"

##
# Commit package.json
##

echo "+++ :git: Committing the version update"

echo "Fetching OIDC token to sign the commit"
SIGSTORE_ID_TOKEN="$(buildkite-agent oidc request-token --audience sigstore)"

github_user_vault="secret/ci/elastic-eui/github_machine_user"

git config --local user.name "$(vault read -field=name "${github_user_vault}")"
git config --local user.email "$(vault read -field=email "${github_user_vault}")"
git config --local commit.gpgsign true
git config --local tag.gpgsign true
git config --local gpg.x509.program gitsign
git config --local gpg.format x509

echo "Adding and committing package.json"
git add package.json
git commit -m "release: @elastic/eui ${new_version} [skip-ci]"

echo "Pushing commit to ${git_branch}"
# This will be rejected by remote if there are any new commits
git push "${git_remote_name}" HEAD:"${git_branch}"

if [[ "${release_type}" == "release" ]]; then
  echo "Creating and pushing release tag ${new_version}"
  git tag --annotate "${new_version}"
  git push "${git_remote_name}" "${new_version}"
  echo "Pushed release tag - https://github.com/elastic/eui/tree/${new_version}"
fi

##
# Success!
##

echo "+++ :white_check_mark: Version successfully updated"
