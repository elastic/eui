#!/bin/bash

set -euo pipefail
set +x

echo "[DOCKER]: Get staging registry credentials & login"
if [[ -z "${DOCKER_STAGING_USERNAME}" ]] || [[ -z "${DOCKER_STAGING_PASSWORD}" ]]; then
  echo ":fire: Docker credentials not set." 1>&2
  exit 1
fi
echo "${DOCKER_STAGING_PASSWORD}" | docker login -u "${DOCKER_STAGING_USERNAME}" --password-stdin container-registry-test.elastic.co

echo "[DOCKER]: Build and push container to staging registry"
docker-compose -f ./scripts/docker-ci/docker-compose.yml build app
docker push container-registry-test.elastic.co/eui/ci:latest

echo "[DOCKER]: Log out of staging registry"
docker logout
