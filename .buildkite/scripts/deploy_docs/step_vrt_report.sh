#!/bin/bash
# Aggregate the results from the parallel VRT variant steps:
# - commit any newly created reference baseline screenshots,
# - set the overall `vrt_passed` meta-data consumed by downstream steps,
# - on failure: merge per-component row fragments into a single Buildkite
#   annotation and GitHub PR comment.

set -eo pipefail

source ~/.bash_profile
source .buildkite/scripts/common/utils.sh

export GH_TOKEN="${VAULT_GITHUB_TOKEN}"

############################################################
#              Aggregate per-variant results               #
############################################################

get_vrt_variants _VARIANTS

all_skipped=true
any_failed=false

for _variant in "${_VARIANTS[@]}"; do
  _result="$(buildkite-agent meta-data get "vrt_passed_${_variant}" --default "")"
  echo "VRT result ${_variant}: ${_result:-missing}"
  if [[ -z "${_result}" ]]; then
    echo "Variant ${_variant} did not report a result."
    buildkite-agent meta-data set vrt_passed "error"
    exit 1
  fi
  [[ "${_result}" != "skipped" ]] && all_skipped=false
  [[ "${_result}" == "false" ]] && any_failed=true
done

if [[ "${all_skipped}" == "true" ]]; then
  buildkite-agent meta-data set vrt_passed "skipped"
  exit 0
fi

############################################################
#          Commit any new baselines (first run)            #
############################################################

if buildkite-agent artifact download "${VRT_DIR}/new-baselines/**/*.png" . 2>/dev/null \
  && compgen -G "${VRT_DIR}/new-baselines/"*.png > /dev/null 2>&1; then
  echo "+++ Committing new VRT baseline screenshots (first run)"
  mkdir -p "${REF_DIR}"
  cp "${VRT_DIR}/new-baselines/"*.png "${REF_DIR}/"

  github_user_vault="secret/ci/elastic-eui/github_machine_user"
  git config --local user.name "$(retry 5 vault read -field=name "${github_user_vault}")"
  git config --local user.email "$(retry 5 vault read -field=email "${github_user_vault}")"
  gh auth setup-git
  git add -- "${REF_DIR}"
  git commit -m "chore(eui): add VRT baseline screenshots" --no-verify
  git_push_to_pr_branch
  echo "New VRT baseline screenshots committed and pushed"
fi

############################################################
#                 On pass: nothing more to do              #
############################################################

if [[ "${any_failed}" == "false" ]]; then
  buildkite-agent meta-data set vrt_passed "true"
  exit 0
fi

############################################################
#           On failure: annotation + PR comment            #
############################################################

echo "^^^ +++"
echo "Visual regression tests failed."

total_count=0
for _variant in "${_VARIANTS[@]}"; do
  _count="$(buildkite-agent meta-data get "diff_count_${_variant}" --default "0")"
  total_count=$(( total_count + _count ))
done

if [[ "${total_count}" -eq 0 ]]; then
  echo "No diff images found. This looks like an infrastructure failure."
  echo "Check the Playwright output in the parallel VRT steps for connection or timeout errors."
  buildkite-agent meta-data set vrt_passed "error"
  exit 1
fi

# "false" is reserved for "visual differences were found"
buildkite-agent meta-data set vrt_passed "false"

echo "Found ${total_count} visual difference(s) across all variants. Generating report..."

buildkite-agent artifact download "${VRT_DIR}/annotation-rows/*" . 2>/dev/null || true
buildkite-agent artifact download "${VRT_DIR}/pr-comment-rows/*" . 2>/dev/null || true

# Merge per-variant row files into one table per component.
# $1: directory of `component__variant.html` row fragments
make_tables_from_rows() {
  local rows_dir="$1"
  local tables=""
  local components=()
  local f component _variant rows count seen c

  if [[ ! -d "${rows_dir}" ]]; then
    printf '%s' ""
    return
  fi

  while IFS= read -r f; do
    [[ -n "${f}" ]] || continue
    component="$(basename "${f}")"
    component="${component%%__*}"
    seen=false
    for c in "${components[@]}"; do
      if [[ "${c}" == "${component}" ]]; then
        seen=true
        break
      fi
    done
    [[ "${seen}" == "false" ]] && components+=("${component}")
  done < <(find "${rows_dir}" -type f -name '*.html' 2>/dev/null | sort)

  for component in "${components[@]}"; do
    rows=""
    for _variant in "${_VARIANTS[@]}"; do
      f="${rows_dir}/${component}__${_variant}.html"
      [[ -f "${f}" ]] && rows+="$(cat "${f}")"
    done
    count=$(echo "${rows}" | grep -c '<tr>' || true)
    tables+="
<p><strong>${component}</strong> (${count} difference$([ "${count}" -ne 1 ] && echo 's'))</p>
<table>
<thead>
  <tr><th>Story</th><th>Diff %</th><th>Before</th><th>After</th><th>Diff</th></tr>
</thead>
<tbody>${rows}
</tbody>
</table>
"
  done

  printf '%s' "${tables}"
}

annotation_tables="$(make_tables_from_rows "${VRT_DIR}/annotation-rows")"
pr_comment_tables="$(make_tables_from_rows "${VRT_DIR}/pr-comment-rows")"

make_report_html() {
  local tables="$1"
  cat << DIFF_HTML
## :camera: ${total_count} visual difference(s) found

Look at the visual diff below. If everything is expected, run [Approve visual changes](${BUILDKITE_BUILD_URL}) to update baselines, re-run the job or make appropriate fixes.

See the [visual regression testing](https://github.com/elastic/eui/blob/main/wiki/contributing-to-eui/testing/visual-regression-testing.md) wiki for more information.

<details>
<summary>Expand to review</summary>
<br>
${tables}
</details>
DIFF_HTML
}

annotation_body="$(make_report_html "${annotation_tables}")"
pr_comment_body="$(make_report_html "${pr_comment_tables}")"

buildkite-agent annotate --style "error" --context "vrt-diff" \
  <<< "${annotation_body}"

# GitHub enforces a 65536-character limit on PR comment bodies.
if [[ "${#pr_comment_body}" -gt 60000 ]]; then
  pr_comment_body="${pr_comment_body:0:60000}"$'\n\n_Table truncated - see the [Buildkite annotation]('"${BUILDKITE_BUILD_URL}"') for the full diff._'
fi

if vrt_comment_url="$(gh pr comment "${BUILDKITE_PULL_REQUEST}" \
  --repo elastic/eui \
  --body-file <(printf '%s' "${pr_comment_body}") 2>/dev/null)"; then
  buildkite-agent meta-data set vrt_comment_url "${vrt_comment_url}"
else
  echo "Failed to post PR comment (GH_TOKEN missing or gh CLI error); skipping"
fi

exit 1
