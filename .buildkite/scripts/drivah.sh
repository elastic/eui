#!/bin/bash

set -euo pipefail
set +x

BUILD_DIR=${1:-.}

echo "--- :docker: Authenticate to docker.elastic.co"
vault_path=secret/ci/elastic-eui/docker-machine-production
username=$(vault read -field=username "${vault_path}")
password=$(vault read -field=password "${vault_path}")
echo "${password}" | buildah login --username="${username}" --password-stdin docker.elastic.co

echo "--- :building_construction: Build the drivah container(s)"
if [[ "${BUILDKITE_PULL_REQUEST}" == "false" ]]; then
    echo ":large_orange_diamond: Add changed-since parameter"
    DRIVAH_PARAMETERS="--changed-since=HEAD^"
fi

drivah build ${DRIVAH_PARAMETERS:-} --push "${BUILD_DIR}"
