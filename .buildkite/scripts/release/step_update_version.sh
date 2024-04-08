#!/bin/bash
# Update version number and commit it back to the repository.
#
# Supported configuration via environment variables:
#  * RELEASE_TYPE (optional) - Type of release that should be performed. Defaults to prerelease (possible values: "release", "prerelease")
#  * RELEASE_VERSION (required when RELEASE_TYPE="release") - The new package.json version string. Must follow semver notation.

set -eo pipefail

source .buildkite/scripts/common/utils.sh

# TODO: Support releasing non-HEAD commits when FORCE_SKIP_GIT_UPDATES=true

npm_version_prerelease_prefix="next"

if [[ -z "${BUILDKITE_BRANCH}" ]]; then
  >&2 echo "BUILDKITE_BRANCH is not set. This usually means you're trying to execute this script from the outside of Buildkite pipeline which is unsupported."
  exit 1
fi

##
# Check version number
##

if [[ "${RELEASE_TYPE}" == "release" ]] && [[ -z "${RELEASE_VERSION}" ]]; then
  >&2 echo "RELEASE_VERSION must be set when RELEASE_TYPE is 'release'"
  exit 1
fi

##
# Print run's configuration
##

echo "+++ Updating version on branch ${BUILDKITE_BRANCH}"
echo "release type: ${RELEASE_TYPE}"
echo "release version: ${RELEASE_VERSION}"
echo "npm version prerelease prefix: ${npm_version_prerelease_prefix}"
echo "node version: $(node -v)"

##
# Update package version
##

echo "+++ Updating @elastic/eui version string"

npm_version_args=(
  --git-tag-version=false # disable tagging the new version
  --sign-git-tag=false # disable signing the git tag
  --commit-hooks=false # disable all git commit hooks
)

new_version=""
if [[ "${RELEASE_TYPE}" == "release" ]]; then
  new_version=$(npm version "${npm_version_args[@]}" "${RELEASE_VERSION}")
else
  new_version=$(npm version "${npm_version_args[@]}" --preid=${npm_version_prerelease_prefix} prerelease)
fi

# npm version output prefixes the new version with 'v'
new_version="${new_version:1}"

echo "Updated @elastic/eui version string to ${new_version}"

##
# Success!
##

echo "+++ :white_check_mark: Version successfully updated"
