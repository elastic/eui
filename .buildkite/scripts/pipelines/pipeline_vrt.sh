#!/bin/bash
# Run visual regression tests against the deployed Storybook.
#
# On success: commits any newly-created reference screenshots (first-run baseline generation).
# On failure: uploads diff artifacts, posts a Buildkite annotation with a Before / After / Diff table
# and sets meta-data so the downstream block step appears for approval.

set -eo pipefail

source ~/.bash_profile
source .buildkite/scripts/common/utils.sh

corepack enable
echo "Node.js version: $(node -v)"
echo "Yarn version: $(yarn -v)"

############################################################
#                      Configuration                       #
############################################################

STORYBOOK_URL="$(buildkite-agent meta-data get storybook_base_url)"

VRT_DIR="packages/eui/.vrt"
REF_DIR="${VRT_DIR}/reference"
DIFF_DIR="${VRT_DIR}/diff"
CURRENT_DIR="${VRT_DIR}/current"

############################################################
#                  Debug: verify GitHub auth               #
############################################################

echo "--- Checking available GitHub auth"
echo "GITHUB_TOKEN set: ${GITHUB_TOKEN:+yes (length ${#GITHUB_TOKEN})}"
echo "BUILDKITE_PULL_REQUEST_REPO: ${BUILDKITE_PULL_REQUEST_REPO}"
echo "BUILDKITE_BRANCH: ${BUILDKITE_BRANCH}"
gh auth status 2>&1 || echo "gh CLI not authenticated"
vault read -field=token secret/ci/elastic-eui/github_machine_user > /dev/null 2>&1 \
  && echo "vault token field: exists" \
  || echo "vault token field: not found"

############################################################
#                     Install dependencies                 #
############################################################

echo "+++ Installing dependencies"
yarn

############################################################
#                    Run VRT (check mode)                  #
############################################################

echo "+++ Running visual regression tests against ${STORYBOOK_URL}"

VRT_PASSED=true
if ! yarn workspace @elastic/eui test-visual-regression -- --url "${STORYBOOK_URL}"; then
  VRT_PASSED=false
fi

############################################################
#            On pass: commit any new baselines             #
############################################################

if [[ "${VRT_PASSED}" == "true" ]]; then
  buildkite-agent meta-data set vrt_has_changes "false"

  if [[ -n "$(git status --porcelain -- "${REF_DIR}")" ]]; then
    echo "+++ Committing new VRT baseline screenshots (first run)"
    github_user_vault="secret/ci/elastic-eui/github_machine_user"
    git config --local user.name "$(retry 5 vault read -field=name "${github_user_vault}")"
    git config --local user.email "$(retry 5 vault read -field=email "${github_user_vault}")"
    git add "${REF_DIR}"
    git commit -m "chore(eui): add VRT baseline screenshots" --no-verify
    git_push_to_pr_branch
    echo "New VRT baseline screenshots committed and pushed"
  else
    echo "Visual regression tests passed with no new VRT baseline screenshots"
  fi

  # Mark as passed only after a successful commit/push (or when there was nothing to commit)
  buildkite-agent meta-data set vrt_passed "true"
  exit 0
fi

############################################################
#           On failure: artifacts + annotation             #
############################################################

echo "^^^ +++"
echo "Visual regression tests failed."

# Count diff images first to distinguish visual regressions from infrastructure
# failures (e.g. Playwright unable to connect to the deployed Storybook URL).
diff_count=$(find "${DIFF_DIR}" -name "*.diff.png" 2>/dev/null | wc -l | tr -d ' ')

if [[ "${diff_count}" -eq 0 ]]; then
  # No diff images means VRT crashed before producing comparisons. Don't surface
  # the approval flow, just fail clearly.
  buildkite-agent meta-data set vrt_has_changes "false"
  buildkite-agent meta-data set vrt_passed "false"
  echo "No diff images found — this looks like an infrastructure failure, not a visual regression."
  echo "Check the Playwright output above for connection or timeout errors."
  exit 1
fi

echo "Found ${diff_count} visual difference(s). Uploading artifacts and generating annotation..."

buildkite-agent meta-data set vrt_has_changes "true"
buildkite-agent meta-data set vrt_passed "false"

# Upload all three image sets as artifacts so the annotation can reference them
buildkite-agent artifact upload "${DIFF_DIR}/*.diff.png"
buildkite-agent artifact upload "${CURRENT_DIR}/*-received.png"
if compgen -G "${REF_DIR}/*.png" > /dev/null 2>&1; then
  buildkite-agent artifact upload "${REF_DIR}/*.png"
fi

annotation_rows=""
while IFS= read -r diff_file; do
  filename="$(basename "${diff_file}")"
  story_name="${filename%.diff.png}"

  annotation_rows+="
<tr>
  <td><code>${story_name}</code></td>
  <td><img src=\"artifact://${REF_DIR}/${story_name}.png\" width=\"300\"/></td>
  <td><img src=\"artifact://${CURRENT_DIR}/${story_name}-received.png\" width=\"300\"/></td>
  <td><img src=\"artifact://${DIFF_DIR}/${story_name}.diff.png\" width=\"300\"/></td>
</tr>"
done < <(find "${DIFF_DIR}" -name "*.diff.png" | sort)

buildkite-agent annotate --style "error" --context "vrt-diff" << HTML
<details>
<summary><strong>${diff_count}</strong> visual difference(s) found - expand to review, then click <em>Approve visual changes</em> to update baselines</summary>

<table>
<thead>
<tr>
  <th>Story</th>
  <th>Before</th>
  <th>After</th>
  <th>Diff</th>
</tr>
</thead>
<tbody>
${annotation_rows}
</tbody>
</table>
</details>
HTML

# Inject the approval block step and baseline-update step into the pipeline.
buildkite-agent pipeline upload << 'APPROVAL_PIPELINE'
steps:
  - block: "Approve visual changes"
    key: "approve-vrt"
    prompt: "Review the diff annotation in this build, then click Approve to update the baselines on this branch."

  - label: "Update VRT baselines"
    key: "update-baselines"
    depends_on: "approve-vrt"
    command: ".buildkite/scripts/pipelines/pipeline_vrt_update.sh"
APPROVAL_PIPELINE

exit 1
