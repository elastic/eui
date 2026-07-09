#!/usr/bin/env bash
#
# Shared helpers for the release scripts (release_prep.sh, release_publish.sh).

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
BOLD='\033[1m'
RESET='\033[0m'

step() {
  echo ""
  echo -e "${GREEN}${BOLD}[$1]${RESET} $2"
}

warn() {
  echo -e "${YELLOW}Warning:${RESET} $1"
}

error() {
  echo -e "${RED}Error:${RESET} $1" >&2
  exit 1
}

REPO_ROOT=$(git rev-parse --show-toplevel 2>/dev/null) || error "Not inside a git repository"
cd "$REPO_ROOT"

# Ensure the `upstream` remote exists.
require_upstream() {
  git remote get-url upstream &>/dev/null || error "'upstream' remote not found. Please add it: git remote add upstream git@github.com:elastic/eui.git"
}

# Bail if there are uncommitted changes.
require_clean_tree() {
  if [[ -n "$(git status --porcelain)" ]]; then
    error "Working tree is dirty. Please commit or stash your changes before running this script."
  fi
}

# Returns releasable packages. Derived dynamically so new packages are picked up automatically.
load_package_dirs() {
  PACKAGE_DIRS=()
  while IFS= read -r dir; do
    [[ -n "$dir" ]] && PACKAGE_DIRS+=("$dir")
  done < <(yarn workspaces list --json | node -e '
const fs = require("node:fs");
let input = "";
process.stdin.on("data", (chunk) => (input += chunk));
process.stdin.on("end", () => {
  for (const line of input.split("\n")) {
    if (!line.trim()) continue;
    const { location } = JSON.parse(line);
    if (location === ".") continue;
    let pkg;
    try {
      pkg = JSON.parse(fs.readFileSync(`${location}/package.json`, "utf8"));
    } catch {
      continue;
    }
    if (pkg.private) continue;
    console.log(location);
  }
});
')
  [[ ${#PACKAGE_DIRS[@]} -gt 0 ]] || error "Could not determine any public workspaces to release"
}

# Packages that are released independently from `@elastic/eui`. In addition to
# appearing in the aggregate `@elastic/eui` release notes, each of these gets its
# own namespaced git tag (`<name>@<version>`) and GitHub Release, so it can be
# released without an `@elastic/eui` version bump.
load_independent_packages() {
  local file="${REPO_ROOT}/scripts/independent_packages.json"
  [[ -f "$file" ]] || error "Missing ${file}"
  INDEPENDENTLY_RELEASED_PACKAGES=()
  while IFS= read -r pkg; do
    [[ -n "$pkg" ]] && INDEPENDENTLY_RELEASED_PACKAGES+=("$pkg")
  done < <(node -p "require('${file}').packages.join('\n')")
}

# Read a top-level field (e.g. `name`, `version`) from a `package.json` as it
# existed at a given git ref. Prints an empty string if the file or field is
# missing so callers can compare without tripping `set -e`.
pkg_field() {
  local ref="$1" path="$2" field="$3" json
  json=$(git show "${ref}:${path}" 2>/dev/null) || return 0
  node -p "JSON.parse(require('fs').readFileSync('/dev/stdin','utf8')).${field} ?? ''" <<<"$json" 2>/dev/null || true
}

# URL-encode a string (used to build release URLs for namespaced tags that
# contain `@` and `/`).
url_encode() {
  node -p "encodeURIComponent(process.argv[1])" "$1"
}

# Create a temp file. BSD/macOS mktemp requires a template with `XXXXXX`.
make_temp_file() {
  mktemp "${TMPDIR:-/tmp}/eui-release.XXXXXX"
}
