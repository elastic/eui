#!/bin/bash

set -euo pipefail

# include utils
source .buildkite/scripts/common/utils.sh

buildkite_analytics_vault="secret/ci/elastic-eui/buildkite-test-analytics"

# Paths that don't affect the EUI test suite.
# When a PR's diff is contained entirely within these paths,
# the heavy EUI jobs (lint, unit:*, cypress:*) exit early below.
# The lightweight per-package jobs always run.
NON_EUI_PATHS_REGEXP='^(\.github/|wiki/|packages/(website|docusaurus-[^/]+|eslint-plugin)/)'

is_eui_test_type() {
  case "$1" in
    lint|unit:ts|unit:tsx|unit:tsx:17|cypress:17|cypress:18|cypress:a11y) return 0 ;;
    *) return 1 ;;
  esac
}

should_skip_eui_tests() {
  local base_branch="${BUILDKITE_PULL_REQUEST_BASE_BRANCH:-main}"
  git fetch --no-tags --quiet origin "$base_branch" 2>/dev/null || return 1

  local merge_base
  merge_base=$(git merge-base "origin/$base_branch" HEAD 2>/dev/null) || return 1

  local changed
  changed=$(git diff --name-only "$merge_base" HEAD 2>/dev/null) || return 1

  [[ -n "$changed" ]] || return 1
  echo "$changed" | grep -qvE "$NON_EUI_PATHS_REGEXP" && return 1

  return 0
}

if is_eui_test_type "$TEST_TYPE" && should_skip_eui_tests; then
  echo "[SKIP]: Only non-EUI paths changed; skipping ${TEST_TYPE}"
  exit 0
fi

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
  --env CI=true
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

  pkg:lint)
    echo "[TASK]: Linting all workspaces except @elastic/eui"
    COMMAND="/opt/yarn*/bin/yarn && yarn workspace @elastic/eui build:workspaces && \
      yarn workspaces foreach -A -pi \
        --exclude '@elastic/eui' \
        --exclude '@elastic/eui-monorepo' \
        run lint"
    ;;

  pkg:unit)
    echo "[TASK]: Running unit tests for all workspaces except @elastic/eui"
    COMMAND="/opt/yarn*/bin/yarn && yarn workspace @elastic/eui build:workspaces && \
      yarn workspaces foreach -A -pi \
        --exclude '@elastic/eui' \
        --exclude '@elastic/eui-monorepo' \
        run test-unit"
    ;;

  *)
    echo "[ERROR]: Unknown task"
    echo "Exit code: 1"
    exit 1
    ;;
esac

docker run "${DOCKER_OPTIONS[@]}" "${DOCKER_BASE_IMAGE}" bash -c "${COMMAND}"
