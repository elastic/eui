#!/bin/bash

set -euo pipefail
set +x

echo '[SOURCE]: Buildkite dependencies'
source .buildkite/scripts/common/utils.sh

echo '[INSTALL]: Non-exported variables'
VAULT_ACCOUNT=secret/ci/elastic-eui/bekitzur-kibana-service-account

echo '[INSTALL]: Exported variables'
GCE_ACCOUNT=$(retry 5 vault read -field=value $VAULT_ACCOUNT)
export GCE_ACCOUNT

DOCKER_BASE_IMAGE=docker.elastic.co/eui/ci:6.6
export DOCKER_BASE_IMAGE

GCE_IMAGE=google/cloud-sdk:slim
export GCE_IMAGE

GPROJECT=elastic-bekitzur
export GPROJECT
