#!/bin/bash

set -euo pipefail
set +x

function retry {
  local retries=$1
  shift

  local count=0

  until "$@"; do
    exit=$?
    wait=$((2 ** count))
    count=$((count + 1))
    
    if [ $count -lt "$retries" ]; then
      >&2 echo "Retry $count of $retries exited $exit. Retrying in $wait seconds."
    else
      >&2 echo "Retry $count of $retries exited $exit. No retries left."
      return $exit
    fi

  done
  return 0
}

DOCKER_MACHINE_STAGING=secret/ci/elastic-eui/docker-machine-staging

echo "[DOCKER]: Get registry credentials & login"
username=$(retry 5 vault read -field=username $DOCKER_MACHINE_STAGING)
password=$(retry 5 vault read -field=password $DOCKER_MACHINE_STAGING)
if [[ -z "${username}" ]] || [[ -z "${password}" ]]; then
  echo ":fire: Docker credentials not set." 1>&2
  exit 1
fi
echo "${password}" | docker login -u "${username}" --password-stdin container-registry-test.elastic.co

echo "[DOCKER]: Build and push container to registry"
docker-compose -f ./scripts/docker-ci/docker-compose.yml build app
docker push container-registry-test.elastic.co/eui/ci:latest

echo "[DOCKER]: Log out of registry"
docker logout

unset DOCKER_MACHINE username password
