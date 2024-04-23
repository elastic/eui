#!/bin/bash

set -euo pipefail
set +x

# Expected env variables:
# * GPROJECT - GCE project name, e.g. elastic-bekitzur
# * GCE_ACCOUNT - credentials for the google service account (JSON blob)
if [[ -z "${GCE_ACCOUNT}" ]]; then
  echo ":fire: GCP credentials not set." 1>&2
  exit 1
fi
if [[ -z "${GPROJECT}" ]]; then
    echo "GPROJECT is not set, e.g. 'GPROJECT=elastic-bekitzur'"
    exit 1
fi

# Login to the cloud with the service account
gcloud auth activate-service-account --key-file <(echo "${GCE_ACCOUNT}")
unset GCE_ACCOUNT

EUI_DOCS_PROJECT=eui-docs-live
BUCKET=${GPROJECT}-${EUI_DOCS_PROJECT}

# https://cloud.google.com/storage/docs/gsutil/commands/ls
ls_options=(
  -d # only list directories
  -l # include additional details about the subdir, notably the date as a second field
)
echo "Getting all but the most recent 50 PR staging links..."
list=$(gsutil ls "${ls_options[@]}" "gs://${BUCKET}/pr_*" \
  | sort -k 2 `# sort by the 2nd field returned by -l which is a timestamp` \
  | head -n -50 `# remove the last 50 items, so basically keep the latest 50 staging docs` \
)
while IFS= read -r line || [[ -n $line ]]; do
  url="$(echo -e "${line}" | tr -d '[:space:]')" # trim the leading whitespaces
  url=${url%/} # trim the trailing slash
  echo "Deleting $url"
  # https://cloud.google.com/storage/docs/gsutil/commands/rm
  gsutil -m rm -r "$url"
done < <(printf '%s' "$list")
