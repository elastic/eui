#!/bin/bash

set -eo pipefail

if [[ "$#" -ne 1 ]]; then
  >&2 echo "Expected usage: drivah_template.toml.sh <app name>"
  exit 1
fi

APP_NAME=$1

# Figure out the current commit hash
GIT_COMMIT="${BUILDKITE_COMMIT}"
if [[ -z "${GIT_COMMIT}" ]]; then
  GIT_COMMIT=$(git rev-parse HEAD 2> /dev/null)
fi

IMAGE="docker.elastic.co/eui/${APP_NAME}"

# Generate a list of tags that apply
TAGS=("${GIT_COMMIT}")
# TODO: This doesn't necessarily mean it's the HEAD of main branch
if [[ "${BUILDKITE_BRANCH}" == "main" ]]; then
  TAGS+=("latest")
fi

printf -v TAGS_STR '"%s", ' "${TAGS[@]}"

# Output the TOML-formatted config
cat <<EOF
[container.image]
names = ["$IMAGE"]
tags = [${TAGS_STR%, }]
EOF
