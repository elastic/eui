#!/bin/bash

set -euo pipefail
set +x

function retry {
  local retries=$1
  shift

  local count=0

  until "$@"; do
    exit=$?
    wait=$((2 ** count))
    count=$((count + 1))
    
    if [ $count -lt "$retries" ]; then
      >&2 echo "Retry $count of $retries exited $exit. Retrying in $wait seconds."
    else
      >&2 echo "Retry $count of $retries exited $exit. No retries left."
      return $exit
    fi

  done
  return 0
}

VAULT_ACCOUNT=secret/ci/elastic-eui/bekitzur-kibana-service-account
GITHUB_ACCOUNT=secret/ci/elastic-eui/kibanamachine

GCE_ACCOUNT=$(retry 5 vault read -field=value $VAULT_ACCOUNT)
if [[ -z "${GCE_ACCOUNT}" ]]; then
  echo ":fire: GCP credentials not set." 1>&2
  exit 1
fi

GITHUB_TOKEN=$(retry 5 vault read -field=github_token $GITHUB_ACCOUNT)
if [[ -z "${GITHUB_TOKEN}" ]]; then
  echo ":fire: GitHub token not set." 1>&2
  exit 1
fi

export GPROJECT=elastic-bekitzur
export GCE_ACCOUNT
export GITHUB_TOKEN

unset VAULT_ACCOUNT GITHUB_ACCOUNT

# Run EUI build/deploy script, set in the template parameter
# Expects env: GPROJECT, GCE_ACCOUNT, GIT_BRANCH, GITHUB_TOKEN
./scripts/deploy/deploy_docs

