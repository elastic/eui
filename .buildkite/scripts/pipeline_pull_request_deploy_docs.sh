#!/bin/bash

set -euo pipefail
set +x

VAULT_ACCOUNT=secret/ci/elastic-eui/bekitzur-kibana-service-account
GITHUB_ACCOUNT=secret/ci/elastic-eui/kibanamachine

export GPROJECT=elastic-bekitzur
export GCE_ACCOUNT=$(vault read -field=value $VAULT_ACCOUNT)
export GITHUB_TOKEN=$(vault read -field=github_token $GITHUB_ACCOUNT)

unset VAULT_ACCOUNT GITHUB_ACCOUNT

# Run EUI build/deploy script, set in the template parameter
# Expects env: GPROJECT, GCE_ACCOUNT, GIT_BRANCH, GITHUB_TOKEN
./scripts/deploy/deploy_docs

