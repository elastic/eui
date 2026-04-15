#!/usr/bin/env bash
#
# Installs the release scripts to ~/.local/bin so they can be run
# from anywhere inside the EUI repo without checking out this branch.
#
# Usage: bash <(curl -s https://raw.githubusercontent.com/acstll/eui/feat/release-automation/scripts/release-install.sh)
#

set -euo pipefail

BRANCH="feat/release-automation"
BASE_URL="https://raw.githubusercontent.com/acstll/eui/${BRANCH}/scripts"
DEST="${HOME}/.local/bin"

SCRIPTS=(release-prep.sh release-publish.sh)

mkdir -p "$DEST"

for script in "${SCRIPTS[@]}"; do
  echo "Installing ${script} → ${DEST}/${script}"
  curl -fsSL "${BASE_URL}/${script}" -o "${DEST}/${script}"
  chmod +x "${DEST}/${script}"
done

echo ""
echo "Done. Make sure ~/.local/bin is in your PATH, then run from the EUI repo:"
echo "  release-prep.sh"
echo "  release-publish.sh"
