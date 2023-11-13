#!/bin/bash

set -euo pipefail
set +x

echo '[SOURCE]: Buildkite dependencies'
source .buildkite/scripts/common/utils.sh

echo '[INSTALL]: Non-exported variables'
GITHUB_ACCOUNT=secret/ci/elastic-eui/kibanamachine
VAULT_ACCOUNT=secret/ci/elastic-eui/bekitzur-kibana-service-account

echo '[INSTALL]: Exported variables'
GCE_ACCOUNT=$(retry 5 vault read -field=value $VAULT_ACCOUNT)
export GCE_ACCOUNT

GITHUB_TOKEN=$(retry 5 vault read -field=github_token $GITHUB_ACCOUNT)
export GITHUB_TOKEN

GPROJECT=elastic-bekitzur
export GPROJECT
