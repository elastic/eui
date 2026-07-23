#!/bin/bash
# Run visual regression tests against the deployed Storybook.
#
# On success: commits any newly created reference screenshots (first-run baseline generation),
# sets `vrt_passed=true` meta-data so the static update-baselines step short-circuits.
#
# On failure: uploads diff artifacts, posts a Buildkite annotation and a GitHub PR comment with
# a Before/After/Diff table, sets `vrt_passed=false` so the static `update-baselines` step
# (after the user approves the block step) actually updates the baselines.

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

export GH_TOKEN="${VAULT_GITHUB_TOKEN}"

############################################################
#                       Skip checks                        #
############################################################

# VRT is skipped (allowing Storybook and the website to build & deploy) when any of
# the following apply:
# - The PR has the `skip-vrt` label.
# - The PR's diff doesn't contain a path in `VRT_RELEVANT_PATHS`.
#
# Keep this list limited to EUI's visual dependencies and the infrastructure
# that builds or tests Storybook.
VRT_RELEVANT_PATHS=(
  '^packages/eui/'
  '^packages/eui-theme-common/'
  '^packages/eui-theme-borealis/'
  '^package\.json$'
  '^yarn\.lock$'
  '^\.yarnrc\.yml$'
  '^\.yarn/'
  '^\.buildkite/pipelines/deploy_docs\.yml$'
  '^\.buildkite/scripts/deploy_docs/'
  '^\.buildkite/scripts/common/'
)

# Sets the meta-data the downstream update-baselines step reads, then exits.
# $1: human-readable reason for the build log.
skip_vrt() {
  echo "$1 - skipping visual regression tests"
  buildkite-agent meta-data set vrt_passed "skipped"
  exit 0
}

# Skip: `skip-vrt` PR label.
# Builds can be triggered by either Buildkite's native GitHub App (sets
# BUILDKITE_PULL_REQUEST_LABELS) or buildkite-pr-bot (sets GITHUB_PR_LABELS).
# Only one is populated per build, so check both.
pr_labels=",${BUILDKITE_PULL_REQUEST_LABELS:-},${GITHUB_PR_LABELS:-},"

if [[ "${pr_labels}" == *",skip-vrt,"* ]]; then
  skip_vrt "PR #${BUILDKITE_PULL_REQUEST} has 'skip-vrt' label"
fi

# Skip: diff doesn't contain a path that can affect EUI's visual output.
relevant_paths_regexp="$(IFS='|'; echo "${VRT_RELEVANT_PATHS[*]}")"
base_branch="${BUILDKITE_PULL_REQUEST_BASE_BRANCH:-main}"

if git fetch --no-tags --quiet origin "${base_branch}" 2>/dev/null \
  && merge_base="$(git merge-base "origin/${base_branch}" HEAD 2>/dev/null)" \
  && changed="$(git diff --name-only "${merge_base}" HEAD 2>/dev/null)" \
  && [[ -n "${changed}" ]] \
  && ! echo "${changed}" | grep -qE "${relevant_paths_regexp}"; then
  skip_vrt "No VRT-relevant paths changed"
fi

############################################################
#                     Install dependencies                 #
############################################################

echo "+++ Installing dependencies"
sudo apt-get install -y fonts-noto-color-emoji fonts-ipafont-gothic 2>/dev/null || true
fc-cache -fv 2>/dev/null || true
yarn

############################################################
#                    Run VRT (check mode)                  #
############################################################

echo "+++ Running visual regression tests against ${STORYBOOK_URL}"

vrt_output_file=$(mktemp)
VRT_PASSED=true
yarn workspace @elastic/eui test-visual-regression -- --url "${STORYBOOK_URL}" 2>&1 \
  | tee "${vrt_output_file}" \
  || VRT_PASSED=false

############################################################
#          Commit any new baselines (first run)            #
############################################################

# `test-runner.ts` writes a baseline directly to disk the first time it
# encounters a story without one. Commit those net-new baselines now,
# *regardless* of whether VRT overall passed or failed.
new_files="$(git ls-files --others --exclude-standard -- "${REF_DIR}")"
if [[ -n "${new_files}" ]]; then
  echo "+++ Committing new VRT baseline screenshots (first run)"

  github_user_vault="secret/ci/elastic-eui/github_machine_user"
  git config --local user.name "$(retry 5 vault read -field=name "${github_user_vault}")"
  git config --local user.email "$(retry 5 vault read -field=email "${github_user_vault}")"
  gh auth setup-git
  git add -- ${new_files}
  git commit -m "chore(eui): add VRT baseline screenshots" --no-verify
  git_push_to_pr_branch
  echo "New VRT baseline screenshots committed and pushed"
fi

############################################################
#                 On pass: nothing more to do              #
############################################################

if [[ "${VRT_PASSED}" == "true" ]]; then
  buildkite-agent meta-data set vrt_passed "true"
  exit 0
fi

############################################################
#           On failure: artifacts + annotation             #
############################################################

echo "^^^ +++"
echo "Visual regression tests failed."

buildkite-agent meta-data set vrt_passed "false"

diff_count=$(find "${DIFF_DIR}" -name "*-diff.png" 2>/dev/null | wc -l | tr -d ' ')

if [[ "${diff_count}" -eq 0 ]]; then
  echo "No diff images found. This looks like an infrastructure failure."
  echo "Check the Playwright output above for connection or timeout errors."
  exit 1
fi

echo "Found ${diff_count} visual difference(s). Uploading artifacts and generating annotation..."

if compgen -G "${DIFF_DIR}/*-diff.png" > /dev/null 2>&1; then
  buildkite-agent artifact upload "${DIFF_DIR}/*-diff.png"
fi
if compgen -G "${CURRENT_DIR}/*-received.png" > /dev/null 2>&1; then
  buildkite-agent artifact upload "${CURRENT_DIR}/*-received.png"
fi

# Upload diff images to GCS for public URLs in the GitHub PR comment
GCLOUD_BUCKET_FULL="$(buildkite-agent meta-data get gcloud_bucket_full)"
bucket_directory="$(buildkite-agent meta-data get bucket_directory)"
vrt_gcs_base="gs://${GCLOUD_BUCKET_FULL}/${bucket_directory}vrt-diff"
vrt_public_base="https://eui.elastic.co/${bucket_directory}vrt-diff"

gcloud auth activate-service-account --key-file <(echo "${GCE_ACCOUNT}")
unset GCE_ACCOUNT

GCS_UPLOAD_ARGS=(
  --cache-control="no-store"
  --predefined-acl="publicRead"
)

# Associative arrays keyed by component (e.g. "euidatagrid"), each holding
# accumulated `<tr>`` rows for the Buildkite annotation and GitHub PR comment.
declare -A annotation_rows_by_component
declare -A pr_comment_rows_by_component
# Preserve component insertion order
component_order=()

while IFS= read -r diff_file; do
  filename="$(basename "${diff_file}")"
  story_name="${filename%-diff.png}"
  story_id="${story_name%-desktop}"
  story_id="${story_id%-mobile}"
  viewport="desktop"
  [[ "${story_name}" == *-mobile ]] && viewport="mobile"
  story_url="${STORYBOOK_URL}/?path=/story/${story_id}"

  # Extract the component key: the first segment starting with "eui"
  # e.g. "tabular-content-euidatagrid-gridstyle-prop" → "euidatagrid"
  component=$(echo "${story_id}" | tr '-' '\n' | grep -m1 '^eui' || echo "${story_id%%--*}")

  # Derive a readable story label from the story-name portion after "--"
  story_label="${story_id##*--}"
  story_label="${story_label//-/ }"

  gcloud storage cp "${GCS_UPLOAD_ARGS[@]}" "${diff_file}" "${vrt_gcs_base}/${filename}"
  if [[ -f "${CURRENT_DIR}/${story_name}-received.png" ]]; then
    gcloud storage cp "${GCS_UPLOAD_ARGS[@]}" "${CURRENT_DIR}/${story_name}-received.png" "${vrt_gcs_base}/${story_name}-received.png"
  fi
  if [[ -f "${REF_DIR}/${story_name}.png" ]]; then
    gcloud storage cp "${GCS_UPLOAD_ARGS[@]}" "${REF_DIR}/${story_name}.png" "${vrt_gcs_base}/${story_name}-before.png"
    buildkite-agent artifact upload "${REF_DIR}/${story_name}.png"
  fi

  if [[ -z "${annotation_rows_by_component[$component]+_}" ]]; then
    annotation_rows_by_component[$component]=""
    pr_comment_rows_by_component[$component]=""
    component_order+=("$component")
  fi

  annotation_rows_by_component[$component]+="
  <tr>
    <td><a href=\"${story_url}\">${story_label}</a> <code>${viewport}</code></td>
    <td><img src=\"artifact://${REF_DIR}/${story_name}.png\" width=\"180\"/></td>
    <td><img src=\"artifact://${CURRENT_DIR}/${story_name}-received.png\" width=\"180\"/></td>
    <td><img src=\"artifact://${DIFF_DIR}/${filename}\" width=\"180\"/></td>
  </tr>"

  pr_comment_rows_by_component[$component]+="
  <tr>
    <td><a href=\"${story_url}\">${story_label}</a> <code>${viewport}</code></td>
    <td><img src=\"${vrt_public_base}/${story_name}-before.png\" width=\"180\"/></td>
    <td><img src=\"${vrt_public_base}/${story_name}-received.png\" width=\"180\"/></td>
    <td><img src=\"${vrt_public_base}/${filename}\" width=\"180\"/></td>
  </tr>"
done < <(find "${DIFF_DIR}" -name "*-diff.png" | sort)

# Builds the full HTML comment body from the per-component row maps.
# $1: "annotation" or "pr_comment"
make_diff_html() {
  local mode="$1"
  local tables=""

  for component in "${component_order[@]}"; do
    if [[ "$mode" == "annotation" ]]; then
      local rows="${annotation_rows_by_component[$component]}"
    else
      local rows="${pr_comment_rows_by_component[$component]}"
    fi
    local count
    count=$(echo "$rows" | grep -c '<tr>' || true)
    tables+="
<p><strong>${component}</strong> (${count} difference$([ "$count" -ne 1 ] && echo 's'))</p>
<table>
<thead>
  <tr><th>Story</th><th>Before</th><th>After</th><th>Diff</th></tr>
</thead>
<tbody>${rows}
</tbody>
</table>
"
  done

  cat << DIFF_HTML
<details>
<summary><strong>${diff_count} visual difference(s) found</strong> - expand to review, then click <em><a href="${BUILDKITE_BUILD_URL}">Approve visual changes</a></em> to update baselines</summary>
<br>
${tables}
</details>
DIFF_HTML
}

buildkite-agent annotate --style "error" --context "vrt-diff" \
  <<< "$(make_diff_html "annotation")"

vrt_comment_body="$(make_diff_html "pr_comment")"

# GitHub enforces a 65536-character limit on PR comment bodies.
if [[ "${#vrt_comment_body}" -gt 60000 ]]; then
  vrt_comment_body="${vrt_comment_body:0:60000}"$'\n\n_Table truncated - see the [Buildkite annotation]('"${BUILDKITE_BUILD_URL}"') for the full diff._'
fi

if vrt_comment_url="$(gh pr comment "${BUILDKITE_PULL_REQUEST}" \
  --repo elastic/eui \
  --body-file <(printf '%s' "${vrt_comment_body}") 2>/dev/null)"; then
  buildkite-agent meta-data set vrt_comment_url "${vrt_comment_url}"
else
  echo "Failed to post PR comment (GH_TOKEN missing or gh CLI error); skipping"
fi

# Fail the step. The "Approve visual changes" block + "Update VRT baselines"
# steps are declared statically in deploy_docs.yml; step_vrt_update.sh gates
# itself on the `vrt_passed=false` meta-data set above.
exit 1
