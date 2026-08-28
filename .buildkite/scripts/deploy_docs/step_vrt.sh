#!/bin/bash
# Run visual regression tests against the deployed Storybook.
#
# On success:
# - stages any newly created reference screenshots (first-run baseline generation)
# for `step_vrt_report.sh` to commit,
# - sets `vrt_passed_<variant>=true` meta-data.
#
# On failure:
# - uploads diff artifacts to GCS,
# - writes HTML fragments for `step_vrt_report.sh` to combine into the annotation and PR comment,
# - sets `vrt_passed_<variant>=false` so the `update-baselines` step updates the baselines.

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

DIFF_DIR="${VRT_DIR}/diff"
CURRENT_DIR="${VRT_DIR}/current"

get_vrt_variants _VARIANTS
if [[ "${BUILDKITE_PARALLEL_JOB_COUNT:-0}" -ne "${#_VARIANTS[@]}" ]]; then
  echo "pipeline parallelism (${BUILDKITE_PARALLEL_JOB_COUNT:-0}) must match variant count (${#_VARIANTS[@]}) in \`packages/eui/.storybook/vrt-variants.json\`"
  exit 1
fi
VRT_VARIANT="${_VARIANTS[${BUILDKITE_PARALLEL_JOB:-0}]}"
echo "Variant: ${VRT_VARIANT} (parallel job ${BUILDKITE_PARALLEL_JOB:-0} of ${#_VARIANTS[@]})"

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

# Sets the status and reason meta-data used by downstream steps, then exits.
# $1: human-readable reason for the build log.
skip_vrt() {
  echo "$1 - skipping visual regression tests for variant ${VRT_VARIANT}"
  buildkite-agent meta-data set "vrt_passed_${VRT_VARIANT}" "skipped"
  buildkite-agent meta-data set "diff_count_${VRT_VARIANT}" "0"
  buildkite-agent meta-data set vrt_skip_reason "$1"
  exit 0
}

# Skip: `skip-vrt` PR label.
# Builds can be triggered by either Buildkite's native GitHub App (sets
# BUILDKITE_PULL_REQUEST_LABELS) or buildkite-pr-bot (sets GITHUB_PR_LABELS).
# Only one is populated per build, so check both.
pr_labels=",${BUILDKITE_PULL_REQUEST_LABELS:-},${GITHUB_PR_LABELS:-},"

if [[ "${pr_labels}" == *",skip-vrt,"* ]]; then
  skip_vrt "Has 'skip-vrt' label"
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
yarn workspace @elastic/eui exec playwright install chromium

############################################################
#                    Run VRT (check mode)                  #
############################################################

echo "+++ Running visual regression tests (${VRT_VARIANT}) against ${STORYBOOK_URL}"

# GCS upload can finish before `eui.elastic.co` serves the new files.
retry 8 curl -fsSL -o /dev/null -H 'Cache-Control: no-cache' "${STORYBOOK_URL}/index.json"

vrt_output_file=$(mktemp)
VRT_PASSED=true
VRT_VARIANT="${VRT_VARIANT}" yarn workspace @elastic/eui test-storybook \
  --url "${STORYBOOK_URL}" 2>&1 \
  | tee "${vrt_output_file}" \
  || VRT_PASSED=false

############################################################
#          Stage any new baselines (first run)             #
############################################################

# `test-runner.ts` writes a baseline directly to disk the first time it
# encounters a story without one. Stage those files for `step_vrt_report.sh` to commit,
# regardless of whether VRT passed or failed.
new_files="$(git ls-files --others --exclude-standard -- "${REF_DIR}")"
if [[ -n "${new_files}" ]]; then
  echo "+++ Staging new VRT baseline screenshots for commit"
  NEW_BASELINES_DIR="${VRT_DIR}/new-baselines"
  mkdir -p "${NEW_BASELINES_DIR}"
  while IFS= read -r f; do
    cp "${f}" "${NEW_BASELINES_DIR}/"
  done <<< "${new_files}"
fi

############################################################
#                 On pass: nothing more to do              #
############################################################

if [[ "${VRT_PASSED}" == "true" ]]; then
  buildkite-agent meta-data set "vrt_passed_${VRT_VARIANT}" "true"
  buildkite-agent meta-data set "diff_count_${VRT_VARIANT}" "0"
  exit 0
fi

############################################################
#           On failure: artifacts + annotation             #
############################################################

echo "^^^ +++"
echo "Visual regression tests failed."

buildkite-agent meta-data set "vrt_passed_${VRT_VARIANT}" "false"

diff_count=$(find "${DIFF_DIR}" -name "*-diff.png" 2>/dev/null | wc -l | tr -d ' ')

if [[ "${diff_count}" -eq 0 ]]; then
  echo "No diff images found. This looks like an infrastructure failure."
  echo "Check the Playwright output above for connection or timeout errors."
  buildkite-agent meta-data set "diff_count_${VRT_VARIANT}" "0"
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
# accumulated `<tr>` rows for the Buildkite annotation and GitHub PR comment.
declare -A annotation_rows_by_component
declare -A pr_comment_rows_by_component
# Preserve component insertion order
component_order=()

# Extracts and formats the diff percent reported by `jest-image-snapshot`.
get_diff_percentage() {
  local filename="$1"
  local percentage

  percentage=$(
    grep -F -B 3 -- "${filename}" "${vrt_output_file}" \
      | grep -oE '[0-9]+([.][0-9]+)?% different' \
      | tail -n 1 \
      | cut -d '%' -f 1 \
      || true
  )

  if [[ -z "${percentage}" ]]; then
    echo "n/a"
  elif awk -v value="${percentage}" 'BEGIN { exit !(value > 0 && value < 0.01) }'; then
    echo "&lt;0.01%"
  else
    awk -v value="${percentage}" 'BEGIN { printf "%.2f%%\n", value }'
  fi
}

while IFS= read -r diff_file; do
  filename="$(basename "${diff_file}")"
  story_name="${filename%-diff.png}"
  story_id="${story_name%-${VRT_VARIANT}}"
  story_url="${STORYBOOK_URL}/?path=/story/${story_id}"

  # Extract the component key: the first segment starting with "eui"
  # e.g. "tabular-content-euidatagrid-gridstyle-prop" → "euidatagrid"
  component=$(echo "${story_id}" | tr '-' '\n' | grep -m1 '^eui' || echo "${story_id%%--*}")

  # Derive a readable story label from the story-name portion after "--"
  story_label="${story_id##*--}"
  story_label="${story_label//-/ }"
  diff_percentage="$(get_diff_percentage "${filename}")"

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
    <td><a href=\"${story_url}\">${story_label}</a> <code>${VRT_VARIANT}</code></td>
    <td>${diff_percentage}</td>
    <td><img src=\"artifact://${REF_DIR}/${story_name}.png\" width=\"180\"/></td>
    <td><img src=\"artifact://${CURRENT_DIR}/${story_name}-received.png\" width=\"180\"/></td>
    <td><img src=\"artifact://${DIFF_DIR}/${filename}\" width=\"180\"/></td>
  </tr>"

  pr_comment_rows_by_component[$component]+="
  <tr>
    <td><a href=\"${story_url}\">${story_label}</a> <code>${VRT_VARIANT}</code></td>
    <td>${diff_percentage}</td>
    <td><img src=\"${vrt_public_base}/${story_name}-before.png\" width=\"180\"/></td>
    <td><img src=\"${vrt_public_base}/${story_name}-received.png\" width=\"180\"/></td>
    <td><img src=\"${vrt_public_base}/${filename}\" width=\"180\"/></td>
  </tr>"
done < <(find "${DIFF_DIR}" -name "*-diff.png" | sort)

# Write per-component row fragments for `step_vrt_report.sh` to merge.
ANN_ROWS_DIR="${VRT_DIR}/annotation-rows"
PR_ROWS_DIR="${VRT_DIR}/pr-comment-rows"
mkdir -p "${ANN_ROWS_DIR}" "${PR_ROWS_DIR}"
for component in "${component_order[@]}"; do
  printf '%s' "${annotation_rows_by_component[$component]}" > "${ANN_ROWS_DIR}/${component}__${VRT_VARIANT}.html"
  printf '%s' "${pr_comment_rows_by_component[$component]}" > "${PR_ROWS_DIR}/${component}__${VRT_VARIANT}.html"
done

buildkite-agent meta-data set "diff_count_${VRT_VARIANT}" "${diff_count}"

# Fail the step so Buildkite marks it red.
exit 1
