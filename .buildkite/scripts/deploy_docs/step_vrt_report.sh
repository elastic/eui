#!/bin/bash
# Aggregate the results from the parallel VRT variant steps:
# - commit any newly created reference baseline screenshots,
# - set the overall `vrt_passed` meta-data consumed by downstream steps,
# - on failure: combine per-variant HTML fragments into a single Buildkite
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
  _result="$(buildkite-agent meta-data get "vrt_passed_${_variant}" --default "skipped")"
  echo "VRT result — ${_variant}: ${_result}"
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

buildkite-agent meta-data set vrt_passed "false"

total_count=0
for _variant in "${_VARIANTS[@]}"; do
  _count="$(buildkite-agent meta-data get "diff_count_${_variant}" --default "0")"
  total_count=$(( total_count + _count ))
done

if [[ "${total_count}" -eq 0 ]]; then
  echo "No diff images found. This looks like an infrastructure failure."
  echo "Check the Playwright output in the parallel VRT steps for connection or timeout errors."
  exit 1
fi

echo "Found ${total_count} visual difference(s) across all variants. Generating report..."

buildkite-agent artifact download "${VRT_DIR}/*.html" . 2>/dev/null || true

annotation_body=""
pr_comment_body=""

for _variant in "${_VARIANTS[@]}"; do
  annotation_file="${VRT_DIR}/annotation-${_variant}.html"
  pr_file="${VRT_DIR}/pr-comment-${_variant}.html"
  [[ -f "${annotation_file}" ]] && annotation_body+="$(cat "${annotation_file}")"$'\n'
  [[ -f "${pr_file}" ]] && pr_comment_body+="$(cat "${pr_file}")"$'\n'
done

annotation_body="<p>${total_count} visual difference(s) found — expand a variant to review, then click <em><a href=\"${BUILDKITE_BUILD_URL}\">Approve visual changes</a></em> to update baselines</p>
${annotation_body}"

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
