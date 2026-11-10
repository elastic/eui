#!/usr/bin/env bash
# Prepares the docs arms from APFS copies of base-a (run once after bootstrap; see README).
# B: docs in node_modules/@elastic/eui/docs. C: docs + pointer in AGENTS.md.
# The pointer is amended into HEAD so the agent sees a clean tree and an unchanged log message.
set -euo pipefail
DOCS=~/eui-eval/docs
POINTER='- Before writing or editing JSX that uses `@elastic/eui` (when no `@kbn/ui-*` component fits), read `node_modules/@elastic/eui/docs/index.md`, then the page of each component you use, even ones you know: it lists the props and examples for the installed EUI version, which can differ from what you remember. Prefer its examples over hand-rolling the behavior or copying nearby code, which may use removed props or icon names.'
ICON_RULE='- Check every EUI icon name you add or change (`type`, `iconType`, `icon`) against `node_modules/@elastic/eui/docs/icons.md`. Removed names render as a broken image, and TypeScript accepts any string.'

for arm in b c; do
  base=~/kbx/base-$arm/kibana
  rm -rf "$base/node_modules/@elastic/eui/docs"
  cp -R "$DOCS" "$base/node_modules/@elastic/eui/docs"
done

cd ~/kbx/base-c/kibana
if ! grep -qxF -- "$POINTER" AGENTS.md || ! grep -qxF -- "$ICON_RULE" AGENTS.md; then
  POINTER="$POINTER" ICON_RULE="$ICON_RULE" node -e '
    const fs = require("fs");
    const lines = fs.readFileSync("AGENTS.md", "utf8").split("\n");
    const i = lines.findIndex((l) => l.startsWith("- Reuse existing components from the target module"));
    if (i < 0) throw new Error("anchor line not found");
    // Replace older pointer or icon-rule wording in place.
    let n = 0;
    while (/node_modules\/@elastic\/eui\/docs\/(index|icons)\.md/.test(lines[i + 1 + n])) n++;
    lines.splice(i + 1, n, process.env.POINTER, process.env.ICON_RULE);
    fs.writeFileSync("AGENTS.md", lines.join("\n"));
  '
  git add AGENTS.md
  git -c user.name="$(git log -1 --format=%an)" -c user.email="$(git log -1 --format=%ae)" commit -q --amend --no-edit --date="$(git log -1 --format=%aI)"
fi
git -C ~/kbx/base-c/kibana log -1 --format="%h %s"

# D: B's tree (docs, no pointer) plus an EUI skill in .agents/skills. node_modules links to base-b's:
# the docs are the same, and a second full copy takes minutes.
D=~/kbx/base-d/kibana
if [ ! -d "$D" ]; then
  mkdir -p "$D"
  for e in ~/kbx/base-b/kibana/* ~/kbx/base-b/kibana/.[!.]*; do
    case "$(basename "$e")" in node_modules|.pnpm-store) continue ;; esac
    cp -c -R "$e" "$D/"
  done
  ln -s ~/kbx/base-b/kibana/node_modules "$D/node_modules"
  echo '/node_modules' >> "$D/.git/info/exclude"
fi
cd "$D"
if ! diff -q ~/eui-eval/skill/eui/SKILL.md .agents/skills/eui/SKILL.md >/dev/null 2>&1; then
  mkdir -p .agents/skills/eui
  cp ~/eui-eval/skill/eui/SKILL.md .agents/skills/eui/SKILL.md
  git add .agents/skills/eui/SKILL.md
  git -c user.name="$(git log -1 --format=%an)" -c user.email="$(git log -1 --format=%ae)" commit -q --amend --no-edit --date="$(git log -1 --format=%aI)"
fi
git -C "$D" log -1 --format="%h %s"

# Arm L: base-a (no docs) plus the removed-icon lint rule from elastic/eui#10269, as a warning.
# Own node_modules (APFS clone) because the plugin is patched in place.
L=~/kbx/base-l/kibana
if [ ! -d "$L" ]; then
  mkdir -p "$L"
  for e in ~/kbx/base-a/kibana/* ~/kbx/base-a/kibana/.[!.]*; do
    case "$(basename "$e")" in .pnpm-store) continue ;; esac
    cp -c -R "$e" "$L/"
  done
fi
rm -rf "$L/node_modules/@elastic/eslint-plugin-eui/lib"
cp -R ~/eui-eval/lint-10269/lib "$L/node_modules/@elastic/eslint-plugin-eui/lib"
cd "$L"
if ! grep -q "no-removed-icons" .oxlint/eui.mts; then
  sed -i '' "s#  '@elastic/eui/no-deprecated-icon-aliases': 'warn',#&\n  '@elastic/eui/no-removed-icons': 'warn',#" .oxlint/eui.mts
  git add .oxlint/eui.mts
  git -c user.name="$(git log -1 --format=%an)" -c user.email="$(git log -1 --format=%ae)" commit -q --amend --no-edit --date="$(git log -1 --format=%aI)"
fi
git -C "$L" log -1 --format="%h %s"
