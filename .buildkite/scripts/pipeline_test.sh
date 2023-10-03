#!/bin/bash

set -euo pipefail

DOCKER_OPTIONS=(
  -i --rm
  --env GIT_COMMITTER_NAME=test
  --env GIT_COMMITTER_EMAIL=test
  --env HOME=/tmp
  --user="$(id -u):$(id -g)"
  --volume="$(pwd):/app"
  --workdir=/app
  docker.elastic.co/eui/ci:5.3
)

case $TEST_TYPE in
  lint)
    echo "[TASK]: Running linters"
    DOCKER_OPTIONS+=(bash -c "/opt/yarn*/bin/yarn && yarn lint")
    ;;

  unit:ts)
    echo "[TASK]: Running .ts and .js unit tests"
    DOCKER_OPTIONS+=(bash -c "/opt/yarn*/bin/yarn && yarn test-unit --node-options=--max_old_space_size=2048 --testMatch=non-react")
    ;;

  unit:tsx:16)
    echo "[TASK]: Running Jest .tsx tests against React 16"
    DOCKER_OPTIONS+=(bash -c "/opt/yarn*/bin/yarn && yarn test-unit --node-options=--max_old_space_size=2048 --react-version=16 --testMatch=react")
    ;;
  
  unit:tsx:17)
    echo "[TASK]: Running Jest .tsx tests against React 17"
    DOCKER_OPTIONS+=(bash -c "/opt/yarn*/bin/yarn && yarn test-unit --node-options=--max_old_space_size=2048 --react-version=17 --testMatch=react")
    ;;
  
  unit:tsx)
    echo "[TASK]: Running Jest .tsx tests against React 18"
    DOCKER_OPTIONS+=(bash -c "/opt/yarn*/bin/yarn && yarn test-unit --node-options=--max_old_space_size=2048 --testMatch=react")
    ;;

  cypress:16)
    echo "[TASK]: Running Cypress tests against React 16"
    DOCKER_OPTIONS+=(bash -c "/opt/yarn*/bin/yarn && yarn test-cypress --node-options=--max_old_space_size=2048 --react-version=16")
    ;;

  cypress:17)
    echo "[TASK]: Running Cypress tests against React 17"
    DOCKER_OPTIONS+=(bash -c "/opt/yarn*/bin/yarn && yarn test-cypress --node-options=--max_old_space_size=2048 --react-version=17")
    ;;

  cypress:18)
    echo "[TASK]: Running Cypress tests against React 18"
    DOCKER_OPTIONS+=(bash -c "/opt/yarn*/bin/yarn && yarn test-cypress --node-options=--max_old_space_size=2048")
    ;;

  *)
    echo "[ERROR]: Unknown task"
    echo "Exit code: 1"
    exit 1
    ;;
esac

docker run "${DOCKER_OPTIONS[@]}"
