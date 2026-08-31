#!/bin/bash
# Post a Buildkite annotation and GitHub PR comment with deployment URLs
# and VRT status. Always exits 0. The VRT step itself fails the build.

set -eo pipefail

source .buildkite/scripts/common/utils.sh

############################################################
#                      Configuration                       #
############################################################

bucket_directory="$(buildkite-agent meta-data get bucket_directory --default "")"
copy_to_root_directory="$(buildkite-agent meta-data get copy_to_root_directory --default "")"
# Default to "true" for non-PR builds where VRT never runs
vrt_passed="$(buildkite-agent meta-data get vrt_passed --default true)"
vrt_skip_reason="$(buildkite-agent meta-data get vrt_skip_reason --default "see build log")"

website_links="[Documentation website](https://eui.elastic.co/${bucket_directory})"
storybook_links="[Storybook](https://eui.elastic.co/${bucket_directory}storybook/)"

if [[ "${copy_to_root_directory}" == "true" ]]; then
  website_links="[Documentation website (root)](https://eui.elastic.co/) and [${bucket_directory}](https://eui.elastic.co/${bucket_directory})"
  storybook_links="[Storybook (root)](https://eui.elastic.co/storybook/) and [${bucket_directory}storybook](https://eui.elastic.co/${bucket_directory}storybook/)"
fi

############################################################
#                    Build notification                    #
############################################################

annotation_style="success"
vrt_annotation=""
vrt_pr_comment=""

if [[ -n "${BUILDKITE_PULL_REQUEST:-}" ]] && [[ "${BUILDKITE_PULL_REQUEST}" != "false" ]]; then
  if [[ "${vrt_passed}" == "true" ]]; then
    vrt_annotation="- :white_check_mark: Visual regression tests passed"
    vrt_pr_comment="\n* :white_check_mark: Visual regression tests passed"
  elif [[ "${vrt_passed}" == "skipped" ]]; then
    vrt_annotation="- :no_entry_sign: Visual regression tests skipped: ${vrt_skip_reason}"
    vrt_pr_comment="\n* :no_entry_sign: Visual regression tests skipped: ${vrt_skip_reason}"
  else
    annotation_style="error"
    # `vrt_comment_url` is only set when `step_vrt_report.sh` actually found visual differences
    vrt_comment_url="$(buildkite-agent meta-data get vrt_comment_url --default "" 2>/dev/null)"
    if [[ -n "${vrt_comment_url}" ]]; then
      vrt_annotation="- :x: Visual regression tests failed ([view diff table](${vrt_comment_url}))"
      vrt_pr_comment="\n* :x: Visual regression tests failed ([view diff table](${vrt_comment_url}))"
    else
      vrt_annotation="- :x: Visual regression tests failed ([see build](${BUILDKITE_BUILD_URL}))"
      vrt_pr_comment="\n* :x: Visual regression tests failed ([see build](${BUILDKITE_BUILD_URL}))"
    fi
  fi
fi

############################################################
#                    Send notifications                    #
############################################################

# Buildkite annotation (visible in the build page)
buildkite-agent annotate --style "${annotation_style}" --context "deployed" << ANNOTATION
- :docusaurus: ${website_links}
- :book: ${storybook_links}
${vrt_annotation}
ANNOTATION

# GitHub PR comment (via the pr_comment meta-data convention)
echo -e "* ${website_links}\n* ${storybook_links}${vrt_pr_comment}" \
  | buildkite-agent meta-data set pr_comment:docs_deployment_link:head
