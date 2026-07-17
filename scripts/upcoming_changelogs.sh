#!/usr/bin/env bash

# Prints upcoming changelog entries for all public packages as Markdown.

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
REF="${1:-HEAD}"

# Prepare temporary storage for sorting changelog entries by PR number
entries_file="$(mktemp "${TMPDIR:-/tmp}/eui-upcoming-changelogs-entries.XXXXXX")"
trap 'rm -f "$entries_file"' EXIT

# Find public packages, show `@elastic/eui` first
workspaces="$(
  cd "$ROOT_DIR"
  yarn workspaces list --json --no-private |
    jq -r '[if .name == "@elastic/eui" then 0 else 1 end, .name, .location] | @tsv' |
    LC_ALL=C sort -k1,1n -k2,2
)"

has_output=false
tab=$'\t'

# Build a Markdown section for each package with upcoming changes
while IFS="$tab" read -r _ package_name package_location; do
  [[ -n "$package_name" && -n "$package_location" ]] || continue
  package_dir="$ROOT_DIR/$package_location"
  [[ -d "$package_dir/changelogs/upcoming" ]] || continue

  : > "$entries_file"

  # Collect the package's changelog entries, excluding the template.
  for changelog_file in "$package_dir/changelogs/upcoming"/*.md; do
    [[ -f "$changelog_file" ]] || continue
    changelog_number="$(basename "$changelog_file" .md)"
    [[ "$changelog_number" != '_template' ]] || continue

    if [[ ! "$changelog_number" =~ ^[0-9]+$ ]]; then
      echo "Invalid upcoming changelog filename: $changelog_file" >&2
      exit 1
    fi

    printf '%s\t%s\n' "$changelog_number" "$changelog_file" >> "$entries_file"
  done

  [[ -s "$entries_file" ]] || continue

  # Print the package heading followed by entries in PR order
  if [[ "$has_output" == true ]]; then
    printf '\n\n'
  fi
  printf '## `%s`' "$package_name"

  while IFS="$tab" read -r changelog_number changelog_file; do
    changelog_path="${changelog_file#"$ROOT_DIR/"}"
    changelog_url="https://github.com/elastic/eui/blob/$REF/$changelog_path"
    changelog_content="$(< "$changelog_file")"

    printf '\n\n### [#%s](%s)\n\n%s' \
      "$changelog_number" \
      "$changelog_url" \
      "$changelog_content"
  done < <(LC_ALL=C sort -n -k1,1 "$entries_file")

  has_output=true
done <<< "$workspaces"

# Show a clear message when no package has upcoming changes
if [[ "$has_output" == false ]]; then
  printf '_No upcoming changelog entries._'
fi

printf '\n'
