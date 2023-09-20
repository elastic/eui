#!/bin/bash

set -euo pipefail

docker run \
  -i --rm \
  --env GIT_COMMITTER_NAME=test \
  --env GIT_COMMITTER_EMAIL=test \
  --env HOME=/tmp \
  --user="$(id -u):$(id -g)" \
  --volume="$(pwd):/app" \
  --workdir=/app \
  docker.elastic.co/eui/ci:5.3 \
  bash -c "/opt/yarn*/bin/yarn \
  && yarn cypress install \
  && NODE_OPTIONS=\"--max-old-space-size=2048\" npm run test-ci"
