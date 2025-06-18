#!/bin/bash
# Shared GCS and Vault environment setup for EUI pipelines

# Load utility functions if not already loaded
if ! declare -f retry > /dev/null; then
  source "$(dirname "$0")/utils.sh"
fi

# GCS storage project and bucket
storage_vault="secret/ci/elastic-eui/website-storage-bucket"
GCLOUD_PROJECT="$(retry 5 vault read -field=google_cloud_project "${storage_vault}")"
GCLOUD_BUCKET="$(retry 5 vault read -field=google_cloud_bucket "${storage_vault}")"
GCLOUD_BUCKET_FULL="${GCLOUD_PROJECT}-${GCLOUD_BUCKET}"

# GCS storage copy arguments
GCLOUD_CP_ARGS=(
  --cache-control="public, max-age=1800, must-revalidate"
  --recursive
  --predefined-acl="publicRead"
  --gzip-local="js,css,html,svg,png,jpg,ico"
)
