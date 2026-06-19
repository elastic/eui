#!/bin/bash
# Re-runs test-helper specs for any EUI component changed in this PR, to surface
# flakiness. See wiki/contributing-to-eui/testing/eui-test-helpers.md.

set -euo pipefail

source .buildkite/scripts/common/utils.sh

FLAKY_REPEAT="${FLAKY_REPEAT:-25}"
BASE_BRANCH="${BUILDKITE_PULL_REQUEST_BASE_BRANCH:-main}"
HELPERS_DIR="packages/test-helpers/src/playwright/components"
COMPONENTS_DIR="packages/eui/src/components"

echo "+++ Determining components changed against ${BASE_BRANCH}"
retry 3 git fetch -q origin "${BASE_BRANCH}"

# Diff against the merge base. The CI checkout can be shallow, so deepen if the
# common ancestor isn't present; if it still can't be found, skip rather than
# block the PR — this is an additive flakiness check, not a correctness gate.
base_sha="$(git merge-base "origin/${BASE_BRANCH}" HEAD 2>/dev/null || true)"
if [[ -z "${base_sha}" ]]; then
  git fetch -q --deepen=200 origin "${BASE_BRANCH}" 2>/dev/null || true
  base_sha="$(git merge-base "origin/${BASE_BRANCH}" HEAD 2>/dev/null || true)"
fi
if [[ -z "${base_sha}" ]]; then
  echo "Could not determine the merge base with ${BASE_BRANCH} — skipping flake detection."
  exit 0
fi

changed_files="$(git diff --name-only "${base_sha}" HEAD)"

# A helper is affected when this PR touched its component source or its own
# specs. Correlation is by directory name: <helper>/<name> maps to
# packages/eui/src/components/<name>.
affected=""
for helper_path in "${HELPERS_DIR}"/*/; do
  [[ -d "${helper_path}" ]] || continue
  name="$(basename "${helper_path}")"
  helper_specs="${helper_path%/}"
  if grep -qE "^(${COMPONENTS_DIR}/${name}|${helper_specs})/" <<< "${changed_files}"; then
    # Playwright filters are resolved from the package dir, so strip the prefix.
    affected+="${helper_specs#packages/test-helpers/} "
  fi
done
affected="$(echo "${affected}" | xargs)"

if [[ -z "${affected}" ]]; then
  echo "No changed EUI components have correlated test helpers — skipping flake detection."
  exit 0
fi

echo "Affected helper specs: ${affected} (running ${FLAKY_REPEAT}×)"

cat <<YAML | buildkite-agent pipeline upload
steps:
  - command: .buildkite/scripts/pipelines/pipeline_test.sh
    label: ":playwright: Flake detection (${FLAKY_REPEAT}× affected specs)"
    env:
      TEST_TYPE: 'test-helpers'
      PLAYWRIGHT_ARGS: '${affected} --repeat-each=${FLAKY_REPEAT}'
    artifact_paths:
      - "packages/test-helpers/playwright-report/**/*"
      - "packages/test-helpers/test-results/**/*"
    timeout_in_minutes: 45
    retry:
      automatic:
        - exit_status: -1
          limit: 3
YAML
