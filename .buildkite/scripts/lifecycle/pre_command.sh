#!/bin/bash

set -euo pipefail
set +x

echo '[SOURCE]: Buildkite dependencies'
source .buildkite/scripts/common/utils.sh

echo '[INSTALL]: env variables'
# ======================================== #
# Paths
# ======================================== #
DOCKER_MACHINE_STAGING=secret/ci/elastic-eui/docker-machine-staging
GITHUB_ACCOUNT=secret/ci/elastic-eui/kibanamachine
VAULT_ACCOUNT=secret/ci/elastic-eui/bekitzur-kibana-service-account

# ======================================== #
# Secrets
# ======================================== #
DOCKER_STAGING_USERNAME=$(retry 5 vault read -field=username $DOCKER_MACHINE_STAGING)
export DOCKER_STAGING_USERNAME

DOCKER_STAGING_PASSWORD=$(retry 5 vault read -field=password $DOCKER_MACHINE_STAGING)
export DOCKER_STAGING_PASSWORD

DOCKER_STAGING_REGISTRY=$(retry 5 vault read -field=registry $DOCKER_MACHINE_STAGING)
export DOCKER_STAGING_REGISTRY

GCE_ACCOUNT=$(retry 5 vault read -field=value $VAULT_ACCOUNT)
export GCE_ACCOUNT

GITHUB_TOKEN=$(retry 5 vault read -field=github_token $GITHUB_ACCOUNT)
export GITHUB_TOKEN

# ======================================== #
# Known values
# ======================================== #
DOCKER_STAGING_IMAGE=container-registry-test.elastic.co/eui/ci
export DOCKER_STAGING_IMAGE

GPROJECT=elastic-bekitzur
export GPROJECT
