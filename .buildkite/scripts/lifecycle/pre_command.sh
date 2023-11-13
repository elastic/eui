#!/bin/bash

set -euo pipefail
set +x

echo '[SOURCE]: Buildkite dependencies'

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

echo '[INSTALL]: Non-exported variables'
echo '----------------------------------------'
GITHUB_ACCOUNT=secret/ci/elastic-eui/kibanamachine
VAULT_ACCOUNT=secret/ci/elastic-eui/bekitzur-kibana-service-account

echo '[INSTALL]: Exported variables'
echo '----------------------------------------'
GCE_ACCOUNT=$(retry 5 vault read -field=value $VAULT_ACCOUNT)
export GCE_ACCOUNT

GITHUB_TOKEN=$(retry 5 vault read -field=github_token $GITHUB_ACCOUNT)
export GITHUB_TOKEN

GPROJECT=elastic-bekitzur
export GPROJECT
