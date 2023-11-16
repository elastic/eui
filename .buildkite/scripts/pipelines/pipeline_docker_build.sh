#!/bin/bash

set -euo pipefail
set +x

echo "[DOCKER]: Get registry credentials & login"
if [[ -z "${DOCKER_STAGING_USERNAME}" ]] || [[ -z "${DOCKER_STAGING_PASSWORD}" ]] || [[ -z "${DOCKER_STAGING_REGISTRY}" ]]; then
  echo ":fire: Docker credentials not set." 1>&2
  exit 1
fi
echo "${DOCKER_STAGING_PASSWORD}" | docker login -u "${DOCKER_STAGING_USERNAME}" --password-stdin "${DOCKER_STAGING_REGISTRY}"

echo "[DOCKER]: Build and push container to registry"
docker-compose -f ./scripts/docker-ci/docker-compose.yml build app
docker push "${DOCKER_STAGING_IMAGE}":latest

echo "[DOCKER]: Log out of registry"
docker logout
