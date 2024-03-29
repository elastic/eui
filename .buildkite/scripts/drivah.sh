#!/bin/bash

set -euo pipefail

BUILD_DIR=${1:-.}

echo "--- :building_construction: Build the drivah container(s)"
if [[ "${BUILDKITE_PULL_REQUEST}" == "false" ]]; then
    echo "--- :large_orange_diamond: Add changed-since parameter"
    DRIVAH_PARAMETERS="--changed-since=HEAD^"
fi

drivah build ${DRIVAH_PARAMETERS:-} --push "${BUILD_DIR}"
