#!/bin/bash

set -euo pipefail

# include utils
source .buildkite/scripts/common/utils.sh

buildkite_analytics_vault="secret/ci/elastic-eui/buildkite-test-analytics"

# Paths that don't affect the EUI test suite.
# When a PR's diff is contained entirely within these paths,
# the heavy EUI jobs (lint, unit:*, cypress:*) exit early below.
# The lightweight per-package jobs always run.
NON_EUI_PATHS_REGEXP='^(\.github/|wiki/|packages/(website|docusaurus-[^/]+|eslint-plugin|illustrations)/)'
# EUI lints its source with the local ESLint plugin, so plugin changes still need EUI lint.
NON_EUI_LINT_PATHS_REGEXP='^(\.github/|wiki/|packages/(website|docusaurus-[^/]+|illustrations)/)'

is_eui_test_type() {
  case "$1" in
    lint|unit:ts|unit:tsx|unit:tsx:17|cypress:17|cypress:18|cypress:a11y|test-helpers) return 0 ;;
    *) return 1 ;;
  esac
}

should_skip_eui_tests() {
  local paths_regexp="$NON_EUI_PATHS_REGEXP"
  [[ "$TEST_TYPE" == "lint" ]] && paths_regexp="$NON_EUI_LINT_PATHS_REGEXP"

  local base_branch="${BUILDKITE_PULL_REQUEST_BASE_BRANCH:-main}"
  git fetch --no-tags --quiet origin "$base_branch" 2>/dev/null || return 1

  local merge_base
  merge_base=$(git merge-base "origin/$base_branch" HEAD 2>/dev/null) || return 1

  local changed
  changed=$(git diff --name-only "$merge_base" HEAD 2>/dev/null) || return 1

  [[ -n "$changed" ]] || return 1
  echo "$changed" | grep -qvE "$paths_regexp" && return 1

  return 0
}

if is_eui_test_type "$TEST_TYPE" && should_skip_eui_tests; then
  echo "[SKIP]: Only non-EUI paths changed; skipping ${TEST_TYPE}"
  exit 0
fi

set +u
source ~/.bash_profile
nvm install
set -u
corepack enable

export GIT_COMMITTER_NAME=test
export GIT_COMMITTER_EMAIL=test
export CI=true
export PLAYWRIGHT_ARGS="${PLAYWRIGHT_ARGS:-}"
if [[ "${BUILDKITE_PARALLEL_JOB_COUNT:-1}" -gt 1 ]]; then
  PLAYWRIGHT_ARGS+=" --shard=$((BUILDKITE_PARALLEL_JOB + 1))/${BUILDKITE_PARALLEL_JOB_COUNT}"
fi
export NODE_OPTIONS=--dns-result-order=ipv4first

COMMAND=""

case $TEST_TYPE in
  lint)
    echo "[TASK]: Running linters"
    COMMAND="yarn --cwd packages/eui && yarn --cwd packages/eui build:workspaces && yarn --cwd packages/eui lint"
    ;;

  unit:ts)
    echo "[TASK]: Running .ts and .js unit tests"
    COMMAND="yarn --cwd packages/eui && yarn --cwd packages/eui build:workspaces && yarn --cwd packages/eui test-unit --node-options=--max_old_space_size=2048 --testMatch=non-react"
    ;;

  unit:tsx:17)
    echo "[TASK]: Running Jest .tsx tests against React 17"
    BUILDKITE_ANALYTICS_TOKEN="$(retry 5 vault read -field=jest_token_react17 "${buildkite_analytics_vault}")"
    export BUILDKITE_ANALYTICS_TOKEN
    COMMAND="yarn --cwd packages/eui && yarn --cwd packages/eui build:workspaces && yarn --cwd packages/eui test-unit --node-options=--max_old_space_size=2048 --react-version=17 --testMatch=react"
    ;;

  unit:tsx)
    echo "[TASK]: Running Jest .tsx tests against React 18"
    BUILDKITE_ANALYTICS_TOKEN="$(retry 5 vault read -field=jest_token_react18 "${buildkite_analytics_vault}")"
    export BUILDKITE_ANALYTICS_TOKEN
    COMMAND="yarn --cwd packages/eui && yarn --cwd packages/eui build:workspaces && yarn --cwd packages/eui test-unit --node-options=--max_old_space_size=2048 --testMatch=react"
    ;;

  cypress:17)
    echo "[TASK]: Running Cypress tests against React 17"
    BUILDKITE_ANALYTICS_TOKEN="$(retry 5 vault read -field=cypress_token_react17 "${buildkite_analytics_vault}")"
    export BUILDKITE_ANALYTICS_TOKEN
    COMMAND="yarn --cwd packages/eui && yarn --cwd packages/eui build:workspaces && yarn --cwd packages/eui cypress install && yarn --cwd packages/eui test-cypress --node-options=--max_old_space_size=2048 --react-version=17"
    ;;

  cypress:18)
    echo "[TASK]: Running Cypress tests against React 18"
    BUILDKITE_ANALYTICS_TOKEN="$(retry 5 vault read -field=cypress_token_react18 "${buildkite_analytics_vault}")"
    export BUILDKITE_ANALYTICS_TOKEN
    COMMAND="yarn --cwd packages/eui && yarn --cwd packages/eui build:workspaces && yarn --cwd packages/eui cypress install && yarn --cwd packages/eui test-cypress --node-options=--max_old_space_size=2048"
    ;;

  cypress:a11y)
    echo "[TASK]: Running Cypress accessibility tests against React 18"
    COMMAND="yarn --cwd packages/eui && yarn --cwd packages/eui build:workspaces && yarn --cwd packages/eui cypress install && yarn --cwd packages/eui run test-cypress-a11y --node-options=--max_old_space_size=2048"
    ;;

  test-helpers)
    echo "[TASK]: Running EUI test-helpers validation tests"
    COMMAND="yarn && yarn workspace @elastic/eui build:workspaces && yarn workspace @elastic/eui build-storybook && yarn workspace @elastic/eui-test-helpers exec playwright install chromium && yarn workspace @elastic/eui-test-helpers exec playwright test ${PLAYWRIGHT_ARGS:-}"
    ;;

  pkg:lint)
    echo "[TASK]: Linting all workspaces except @elastic/eui"
    COMMAND="yarn && yarn workspace @elastic/eui build:workspaces && \
      yarn workspaces foreach -A -pi \
        --exclude '@elastic/eui' \
        --exclude '@elastic/eui-monorepo' \
        run lint"
    ;;

  pkg:unit)
    echo "[TASK]: Running unit tests for all workspaces except @elastic/eui"
    COMMAND="yarn && yarn workspace @elastic/eui build:workspaces && \
      yarn test-unit && \
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

bash -c "${COMMAND}"
