#!/bin/bash

set -euo pipefail

TEST_TYPE='unit'

DOCKER_OPTIONS=(
  -i --rm
  --env GIT_COMMITTER_NAME=test
  --env GIT_COMMITTER_EMAIL=test
  --env HOME=/tmp
  --user="$(id -u):$(id -g)"
  --volume="$(pwd):/app"
  --workdir=/app
  docker.elastic.co/eui/ci:5.3
  bash -c "/opt/yarn*/bin/yarn"
)

if [[ "${TEST_TYPE}" == 'lint' ]]; then
  echo "[TASK]: Running linters"
  DOCKER_OPTIONS+=("&& NODE_OPTIONS=\"--max-old-space-size=2048\" yarn lint")
elif [[ "${TEST_TYPE}" == 'unit' ]]; then
  echo "[TASK]: Running unit tests"
  DOCKER_OPTIONS+=("&& NODE_OPTIONS=\"--max-old-space-size=2048\" yarn test-unit")
elif [[ "${TEST_TYPE}" == 'cypress:16' ]]; then
  echo "[TASK]: Running Cypress tests against React 16"
  DOCKER_OPTIONS+=("&& yarn cypress install" "&& NODE_OPTIONS=\"--max-old-space-size=2048\" yarn test-cypress --react-version 16")
elif [[ "${TEST_TYPE}" == 'cypress:17' ]]; then
  echo "[TASK]: Running Cypress tests against React 17"
  DOCKER_OPTIONS+=("&& yarn cypress install" "&& NODE_OPTIONS=\"--max-old-space-size=2048\" yarn test-cypress --react-version 17")
elif [[ "${TEST_TYPE}" == 'cypress:18' ]]; then
  echo "[TASK]: Running Cypress tests against React 18"
  DOCKER_OPTIONS+=("&& yarn cypress install" "&& NODE_OPTIONS=\"--max-old-space-size=2048\" yarn test-cypress --react-version 18")
fi

docker run "${DOCKER_OPTIONS[@]}"
