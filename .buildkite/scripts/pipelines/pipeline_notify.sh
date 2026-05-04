#!/bin/bash
# Post a Buildkite annotation and GitHub PR comment with deployment URLs
# and VRT status. Exits 1 if VRT found differences (so the build is marked
# as failed) but always runs so notifications are never skipped.

set -eo pipefail

source .buildkite/scripts/common/utils.sh

############################################################
#                      Configuration                       #
############################################################

bucket_directory="$(buildkite-agent meta-data get bucket_directory)"
copy_to_root_directory="$(buildkite-agent meta-data get copy_to_root_directory)"
# Default to "true" for non-PR builds where VRT never runs
vrt_passed="$(buildkite-agent meta-data get vrt_passed --default true)"

published_website_url="https://eui.elastic.co/${bucket_directory}"
published_storybook_url="https://eui.elastic.co/${bucket_directory}storybook/"

if [[ "${copy_to_root_directory}" == "true" ]]; then
  published_website_url="https://eui.elastic.co/ (root) and https://eui.elastic.co/${bucket_directory}"
  published_storybook_url="https://eui.elastic.co/storybook/ (root) and https://eui.elastic.co/${bucket_directory}storybook/"
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
  else
    annotation_style="error"
    vrt_comment_url="$(buildkite-agent meta-data get vrt_comment_url --default "")"
    vrt_annotation="- :x: Visual regression tests failed - [view diff table](${vrt_comment_url:-${BUILDKITE_BUILD_URL}})"
    vrt_pr_comment="\n* :x: Visual regression tests failed"
  fi
fi

############################################################
#                    Send notifications                    #
############################################################

# Buildkite annotation (visible in the build page)
buildkite-agent annotate --style "${annotation_style}" --context "deployed" << ANNOTATION
- :docusaurus: [Documentation website](${published_website_url})
- :book: [Storybook](${published_storybook_url})
${vrt_annotation}
ANNOTATION

# GitHub PR comment (via the pr_comment meta-data convention)
echo -e "* [Documentation website](${published_website_url})\n* [Storybook](${published_storybook_url})${vrt_pr_comment}" \
  | buildkite-agent meta-data set pr_comment:docs_deployment_link:head

############################################################
#          Fail the build if VRT found differences         #
############################################################

if [[ "${vrt_passed}" == "false" ]]; then
  exit 1
fi
