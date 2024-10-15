#!/bin/bash

set -euo pipefail
set +x

echo '[SOURCE]: Buildkite dependencies'
source .buildkite/scripts/common/utils.sh

echo '[INSTALL]: Non-exported variables'
GITHUB_ACCOUNT=secret/ci/elastic-eui/github_machine_user
VAULT_ACCOUNT=secret/ci/elastic-eui/bekitzur-kibana-service-account

echo '[INSTALL]: Exported variables'
GCE_ACCOUNT=$(retry 5 vault read -field=value $VAULT_ACCOUNT)
export GCE_ACCOUNT

GITHUB_TOKEN=$(retry 5 vault read -field=kibanamachine_token $GITHUB_ACCOUNT)
export GITHUB_TOKEN

DOCKER_BASE_IMAGE=docker.elastic.co/eui/ci:6.6
export DOCKER_BASE_IMAGE

GCE_IMAGE=google/cloud-sdk:slim
export GCE_IMAGE

GPROJECT=elastic-bekitzur
export GPROJECT
