#!/usr/bin/env bash

# Checks required PR statuses and exposes their state to a GitHub Actions job.

set -euo pipefail

PR_URL="${1:-}"
PENDING_BEHAVIOR="${2:-retry}"

if [[ -z "$PR_URL" || ( "$PENDING_BEHAVIOR" != 'retry' && "$PENDING_BEHAVIOR" != 'fail' ) ]]; then
  echo "Usage: $0 <pr-url> [retry|fail]" >&2
  exit 1
fi

# Find the Buildkite check so notifications can link to its build
all_status_json="$(gh pr checks "$PR_URL" --json name,link,bucket || true)"
if jq -e 'type == "array"' > /dev/null <<< "$all_status_json"; then
  buildkite_url="$(
    jq -r '[.[] | select((.link // "") | contains("buildkite.com"))][0].link // empty' \
      <<< "$all_status_json"
  )"
  echo "buildkite_url=$buildkite_url" >> "$GITHUB_OUTPUT"
else
  echo "::warning::Could not retrieve the Buildkite URL"
fi

# Count required checks by state to decide whether CI passed
status_json="$(gh pr checks "$PR_URL" --required --json name,link,bucket || true)"
if ! jq -e 'type == "array" and length > 0' > /dev/null <<< "$status_json"; then
  echo "::error::No required CI checks were returned"
  exit 1
fi

all_num="$(jq length <<< "$status_json")"
pending_num="$(jq '[.[] | select(.bucket == "pending")] | length' <<< "$status_json")"
fail_num="$(jq '[.[] | select(.bucket | test("fail|cancel"))] | length' <<< "$status_json")"

# Report failures immediately or let the first attempt retry pending checks
if [[ "$fail_num" -gt 0 ]]; then
  message='Some CI checks failed. Please check the logs for details.'
  echo "$message"
  echo "$message" >> "$GITHUB_STEP_SUMMARY"
  exit 1
fi

if [[ "$pending_num" -gt 0 ]]; then
  if [[ "$PENDING_BEHAVIOR" == 'retry' ]]; then
    echo "pending=true" >> "$GITHUB_OUTPUT"
    message="$pending_num/$all_num CI checks are pending. Retrying later..."
    echo "$message"
    echo "$message" >> "$GITHUB_STEP_SUMMARY"
    exit 0
  fi

  message="$pending_num/$all_num CI checks are still pending. This is unexpected."
  echo "$message"
  echo "$message" >> "$GITHUB_STEP_SUMMARY"
  exit 1
fi

echo 'CI checks passed!'
echo 'CI checks passed! :tada:' >> "$GITHUB_STEP_SUMMARY"
