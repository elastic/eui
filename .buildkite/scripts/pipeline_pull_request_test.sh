#!/bin/bash

set -euo pipefail

docker run \
  -i --rm --cap-add=SYS_ADMIN --volume="$(pwd):/app" --workdir=/app \
  -e GIT_COMMITTER_NAME=test -e GIT_COMMITTER_EMAIL=test -e HOME=/tmp \
  --user="$(id -u):$(id -g)" \
  docker.elastic.co/eui/ci:5.0 \
  bash -c "/opt/yarn*/bin/yarn \
  && yarn cypress install \
  && NODE_OPTIONS=\"--max-old-space-size=2048\" npm run test-ci \
  && npm run build"
