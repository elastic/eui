#!/bin/bash

set -euo pipefail
set +x

VAULT_ACCOUNT=secret/gce/$GPROJECT/service-account/kibana

export VAULT_TOKEN=$(vault write -field=token auth/approle/login role_id="$VAULT_ROLE_ID" secret_id="$VAULT_SECRET_ID")
export GCE_ACCOUNT=$(vault read -field=value $VAULT_ACCOUNT)
export GITHUB_TOKEN=$(vault read -field=github_token secret/kibana-issues/dev/kibanamachine)

unset VAULT_ROLE_ID VAULT_SECRET_ID VAULT_ADDR VAULT_TOKEN VAULT_ACCOUNT

# Run EUI build/deploy script, set in the template parameter
# Expects env: GPROJECT, GCE_ACCOUNT, GIT_BRANCH, GITHUB_TOKEN
./scripts/deploy/deploy_docs

