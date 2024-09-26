#!/bin/bash

set -euo pipefail

# include utils
source .buildkite/scripts/common/utils.sh

buildkite_analytics_vault="secret/ci/elastic-eui/buildkite-test-analytics"

DOCKER_OPTIONS=(
  -i --rm
  --env GIT_COMMITTER_NAME=test
  --env GIT_COMMITTER_EMAIL=test
  --env HOME=/tmp
  --env BUILDKITE_BRANCH
  --env BUILDKITE_BUILD_ID
  --env BUILDKITE_BUILD_NUMBER
  --env BUILDKITE_BUILD_URL
  --env BUILDKITE_COMMIT
  --env BUILDKITE_JOB_ID
  --env BUILDKITE_MESSAGE
  --user="$(id -u):$(id -g)"
  --volume="$(pwd):/app"
  --workdir=/app
)

COMMAND=""

case $TEST_TYPE in
  lint)
    echo "[TASK]: Running linters"
    COMMAND="/opt/yarn*/bin/yarn --cwd packages/eui && yarn --cwd packages/eui build:workspaces && yarn --cwd packages/eui lint"
    ;;

  unit:ts)
    echo "[TASK]: Running .ts and .js unit tests"
    COMMAND="/opt/yarn*/bin/yarn --cwd packages/eui && yarn --cwd packages/eui build:workspaces && yarn --cwd packages/eui test-unit --node-options=--max_old_space_size=2048 --testMatch=non-react"
    ;;

  unit:tsx:16)
    echo "[TASK]: Running Jest .tsx tests against React 16"
    DOCKER_OPTIONS+=(--env BUILDKITE_ANALYTICS_TOKEN="$(retry 5 vault read -field=jest_token_react16 "${buildkite_analytics_vault}")")
    COMMAND="/opt/yarn*/bin/yarn --cwd packages/eui && yarn --cwd packages/eui build:workspaces && yarn --cwd packages/eui test-unit --node-options=--max_old_space_size=2048 --react-version=16 --testMatch=react"
    ;;

  unit:tsx:17)
    echo "[TASK]: Running Jest .tsx tests against React 17"
    DOCKER_OPTIONS+=(--env BUILDKITE_ANALYTICS_TOKEN="$(retry 5 vault read -field=jest_token_react17 "${buildkite_analytics_vault}")")
    COMMAND="/opt/yarn*/bin/yarn --cwd packages/eui && yarn --cwd packages/eui build:workspaces && yarn --cwd packages/eui test-unit --node-options=--max_old_space_size=2048 --react-version=17 --testMatch=react"
    ;;

  unit:tsx)
    echo "[TASK]: Running Jest .tsx tests against React 18"
    DOCKER_OPTIONS+=(--env BUILDKITE_ANALYTICS_TOKEN="$(retry 5 vault read -field=jest_token_react18 "${buildkite_analytics_vault}")")
    COMMAND="/opt/yarn*/bin/yarn --cwd packages/eui && yarn --cwd packages/eui build:workspaces && yarn --cwd packages/eui test-unit --node-options=--max_old_space_size=2048 --testMatch=react"
    ;;

  cypress:16)
    echo "[TASK]: Running Cypress tests against React 16"
    DOCKER_OPTIONS+=(--env BUILDKITE_ANALYTICS_TOKEN="$(retry 5 vault read -field=cypress_token_react16 "${buildkite_analytics_vault}")")
    COMMAND="/opt/yarn*/bin/yarn --cwd packages/eui && yarn --cwd packages/eui build:workspaces && yarn --cwd packages/eui cypress install && yarn --cwd packages/eui test-cypress --node-options=--max_old_space_size=2048 --react-version=16"
    ;;

  cypress:17)
    echo "[TASK]: Running Cypress tests against React 17"
    DOCKER_OPTIONS+=(--env BUILDKITE_ANALYTICS_TOKEN="$(retry 5 vault read -field=cypress_token_react17 "${buildkite_analytics_vault}")")
    COMMAND="/opt/yarn*/bin/yarn --cwd packages/eui && yarn --cwd packages/eui build:workspaces && yarn --cwd packages/eui cypress install && yarn --cwd packages/eui test-cypress --node-options=--max_old_space_size=2048 --react-version=17"
    ;;

  cypress:18)
    echo "[TASK]: Running Cypress tests against React 18"
    DOCKER_OPTIONS+=(--env BUILDKITE_ANALYTICS_TOKEN="$(retry 5 vault read -field=cypress_token_react18 "${buildkite_analytics_vault}")")
    COMMAND="/opt/yarn*/bin/yarn --cwd packages/eui && yarn --cwd packages/eui build:workspaces && yarn --cwd packages/eui cypress install && yarn --cwd packages/eui test-cypress --node-options=--max_old_space_size=2048"
    ;;

  cypress:a11y)
    echo "[TASK]: Running Cypress accessibility tests against React 18"
    COMMAND="/opt/yarn*/bin/yarn --cwd packages/eui && yarn --cwd packages/eui build:workspaces && yarn --cwd packages/eui cypress install && yarn --cwd packages/eui run test-cypress-a11y --node-options=--max_old_space_size=2048"
    ;;

  *)
    echo "[ERROR]: Unknown task"
    echo "Exit code: 1"
    exit 1
    ;;
esac

docker run "${DOCKER_OPTIONS[@]}" "${DOCKER_BASE_IMAGE}" bash -c "${COMMAND}"
