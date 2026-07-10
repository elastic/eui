#!/usr/bin/env bash
#
# Official release publish script (post-merge)
#
# Automates final steps of the process:
# - Detects the EUI version and changed workspaces
# - Tags the merge commit (`v<eui>`, plus namespaced tags for independently
#   released packages such as `@elastic/eui-illustrations`)
# - Pushes the tags to upstream
# - Triggers the GitHub Actions release workflow
# - Creates the GitHub release(s)
#
# Usage: yarn release:publish [merge-commit-sha]
#
#   If no SHA is provided, defaults to HEAD on main.
#

set -euo pipefail

source "$(dirname "${BASH_SOURCE[0]}")/release_lib.sh"

load_package_dirs
load_independent_packages
require_upstream
require_clean_tree

step "1/6" "Updating main branch..."
git checkout main
git pull upstream main
git fetch upstream --tags

MERGE_SHA="${1:-$(git rev-parse HEAD)}"

step "2/6" "Detecting release details from ${BOLD}${MERGE_SHA:0:12}${RESET}..."

PREV_TAG=$(git describe --tags --abbrev=0 "${MERGE_SHA}^" 2>/dev/null) || error "Could not find a previous release tag"

# Detect changed workspaces and build a single list of releases to publish.
# `@elastic/eui` is the aggregate release (`v<version>`, notes list every changed
# package). Each independently-released package gets its own namespaced entry
# (`<name>@<version>`). All of them are handled uniformly by the loops below.
CHANGED_WORKSPACES=""   # CSV passed to the release workflow
RELEASE_BODY=""         # aggregate notes for the @elastic/eui release
EUI_RELEASED=false
EUI_VERSION=""
REL_TAGS=()             # parallel arrays: tag / title / notes file per release
REL_TITLES=()
REL_BODY_FILES=()

# Remove any temp release-notes files on exit (e.g. if the user aborts at the
# confirmation prompt or an error occurs before they're published).
cleanup() {
  for f in ${REL_BODY_FILES[@]+"${REL_BODY_FILES[@]}"}; do
    rm -f "$f"
  done
}
trap cleanup EXIT

# Queue one release (tag + title + notes file). Errors if the tag already exists.
queue_release() {
  local tag="$1" title="$2" body="$3" body_file
  git rev-parse "$tag" &>/dev/null && error "Tag ${tag} already exists. Has this release already been published?"
  body_file=$(make_temp_file)
  printf '%s\n' "$body" > "$body_file"
  REL_TAGS+=("$tag")
  REL_TITLES+=("$title")
  REL_BODY_FILES+=("$body_file")
}

is_independent() {
  [[ ${#INDEPENDENTLY_RELEASED_PACKAGES[@]} -gt 0 && " ${INDEPENDENTLY_RELEASED_PACKAGES[*]} " == *" $1 "* ]]
}

for pkg_dir in "${PACKAGE_DIRS[@]}"; do
  pkg_json="${pkg_dir}/package.json"

  new_version=$(pkg_field "$MERGE_SHA" "$pkg_json" version)
  [[ -n "$new_version" ]] || continue
  old_version=$(pkg_field "$PREV_TAG" "$pkg_json" version)
  [[ "$new_version" != "$old_version" ]] || continue

  pkg_name=$(pkg_field "$MERGE_SHA" "$pkg_json" name)
  CHANGED_WORKSPACES="${CHANGED_WORKSPACES:+${CHANGED_WORKSPACES},}${pkg_name}"

  # Extract this version's changelog section (used for release notes).
  # `|| true` keeps `set -euo pipefail` from aborting when a workspace has no
  # changelog file (the glob fails and `pipefail` would propagate ls's exit).
  changelog_file=$(ls -t "${pkg_dir}"/changelogs/CHANGELOG_*.md 2>/dev/null | head -1 || true)
  changelog_section=""
  if [[ -n "$changelog_file" ]]; then
    escaped_version="${new_version//./\\.}"
    changelog_section=$(awk "/^## \[\`v${escaped_version}\`\]/{found=1; next} /^## \[/{if(found) exit} found" "$changelog_file")
    if [[ -n "$changelog_section" ]]; then
      RELEASE_BODY="${RELEASE_BODY}### \`${pkg_name}\` [v${new_version}](https://github.com/elastic/eui/blob/main/${changelog_file})
${changelog_section}
"
    fi
  fi

  if [[ "$pkg_name" == "@elastic/eui" ]]; then
    EUI_RELEASED=true
    EUI_VERSION="$new_version"   # aggregate release queued after the loop
  elif is_independent "$pkg_name"; then
    queue_release "${pkg_name}@${new_version}" "${pkg_name} v${new_version}" \
      "${changelog_section:-Release ${pkg_name} v${new_version}.}"
  fi
done

if [[ -z "$CHANGED_WORKSPACES" ]]; then
  error "No changed workspaces detected. Are you sure the release PR was merged?"
fi

# `@elastic/eui`'s aggregate release goes first; its notes list every changed
# package. Prepend it to the (possibly empty) list of independent releases.
if [[ "$EUI_RELEASED" == "true" ]]; then
  eui_tag="v${EUI_VERSION}"
  git rev-parse "$eui_tag" &>/dev/null && error "Tag ${eui_tag} already exists. Has this release already been published?"
  eui_body_file=$(make_temp_file)
  printf '%s\n' "$RELEASE_BODY" > "$eui_body_file"
  REL_TAGS=("$eui_tag" ${REL_TAGS[@]+"${REL_TAGS[@]}"})
  REL_TITLES=("$eui_tag" ${REL_TITLES[@]+"${REL_TITLES[@]}"})
  REL_BODY_FILES=("$eui_body_file" ${REL_BODY_FILES[@]+"${REL_BODY_FILES[@]}"})
fi

step "3/6" "Release summary"
echo ""
echo -e "  Commit:       ${BOLD}${MERGE_SHA:0:12}${RESET}"
echo -e "  Previous tag: ${BOLD}${PREV_TAG}${RESET}"
echo -e "  Workspaces:   ${BOLD}${CHANGED_WORKSPACES}${RESET}"
if [[ ${#REL_TAGS[@]} -gt 0 ]]; then
  echo -e "  Releases:     ${BOLD}${REL_TAGS[*]}${RESET}"
else
  echo -e "  Releases:     ${BOLD}(none - no taggable packages)${RESET}"
fi
echo ""
read -r -p "Proceed with the release? (y/N) " confirm
if [[ "$confirm" != "y" && "$confirm" != "Y" ]]; then
  echo "Aborted."
  exit 0
fi

step "4/6" "Creating and pushing tags..."
if [[ ${#REL_TAGS[@]} -eq 0 ]]; then
  error "No taggable packages detected. If you intended to release a single package, add it to scripts/independent_packages.json (namespaced tags) or bump @elastic/eui (v<version> tag)."
else
  for i in "${!REL_TAGS[@]}"; do
    echo -e "  ${BOLD}${REL_TAGS[$i]}${RESET}"
    git tag -a "${REL_TAGS[$i]}" "$MERGE_SHA" -m "${REL_TITLES[$i]}"
    git push upstream "${REL_TAGS[$i]}" --no-verify
  done
fi

step "5/6" "Triggering release workflow..."
gh workflow run release.yml \
  --repo elastic/eui \
  -f release_ref="$MERGE_SHA" \
  -f type=official \
  -f workspaces="$CHANGED_WORKSPACES" \
  -f dry_run=false

step "6/6" "Creating GitHub releases..."
if [[ ${#REL_TAGS[@]} -eq 0 ]]; then
  echo "  (no GitHub releases to create)"
else
  for i in "${!REL_TAGS[@]}"; do
    gh release create "${REL_TAGS[$i]}" \
      --repo elastic/eui \
      --title "${REL_TITLES[$i]}" \
      --notes-file "${REL_BODY_FILES[$i]}"
    rm -f "${REL_BODY_FILES[$i]}"
  done
fi

echo ""
echo -e "${GREEN}${BOLD}Release triggered!${RESET}"
echo ""
if [[ ${#REL_TAGS[@]} -gt 0 ]]; then
  for i in "${!REL_TAGS[@]}"; do
    echo -e "  Release: ${BOLD}https://github.com/elastic/eui/releases/tag/$(url_encode "${REL_TAGS[$i]}")${RESET}"
  done
fi
echo -e "  Workflow: ${BOLD}https://github.com/elastic/eui/actions/workflows/release.yml${RESET}"
