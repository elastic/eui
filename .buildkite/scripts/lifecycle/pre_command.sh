#!/bin/bash

set -euo pipefail
set +x

echo '[SOURCE]: Buildkite dependencies'
source .buildkite/scripts/common/utils.sh

echo '[INSTALL]: Non-exported variables'
DOCKER_MACHINE_STAGING=secret/ci/elastic-eui/docker-machine-staging
GITHUB_ACCOUNT=secret/ci/elastic-eui/kibanamachine
VAULT_ACCOUNT=secret/ci/elastic-eui/bekitzur-kibana-service-account

echo '[INSTALL]: Exported variables'
DOCKER_STAGING_USERNAME=$(retry 5 vault read -field=username $DOCKER_MACHINE_STAGING)
export DOCKER_STAGING_USERNAME

DOCKER_STAGING_PASSWORD=$(retry 5 vault read -field=password $DOCKER_MACHINE_STAGING)
export DOCKER_STAGING_PASSWORD

GCE_ACCOUNT=$(retry 5 vault read -field=value $VAULT_ACCOUNT)
export GCE_ACCOUNT

GITHUB_TOKEN=$(retry 5 vault read -field=github_token $GITHUB_ACCOUNT)
export GITHUB_TOKEN

GPROJECT=elastic-bekitzur
export GPROJECT
