---
name: test-eui-pr-in-kibana
description: >-
  Build a local @elastic/eui tarball from an EUI PR branch and stand up a
  Kibana branch that consumes it, so Kibana CI can run against the EUI PR's
  changes before merging. Use when the user wants to test an EUI PR in
  Kibana, create a Kibana test/staging PR for an EUI change, run Kibana CI
  against a local EUI build, or "stage" an EUI PR in Kibana.
---

# Test an EUI PR in Kibana

Generates a local `.tgz` from the current EUI branch, copies it into a fresh
Kibana branch off `upstream/main`, wires up the dependency, and runs
`yarn kbn bootstrap`. Stops at "branch ready"; ask the user whether to push
and open a draft PR.

The official wiki for this workflow lives at
`wiki/contributing-to-eui/testing/testing-in-kibana.md` ("Testing local EUI
in local Kibana" section). The example reference PR is
[elastic/kibana#248805](https://github.com/elastic/kibana/pull/248805).

## Inputs

- **EUI PR number** (required, e.g. `9630`).
- **EUI worktree path**: default to the current EUI repo / worktree. If the
  user has the PR branch checked out in a worktree under
  `.claude/worktrees/`, prefer that.
- **Kibana repo path**: default to `../kibana` from the EUI repo's main
  worktree (resolve via `git worktree list --porcelain | head -1` if
  invoked from a sub-worktree). If the default does not exist, ask the
  user.

Derived during the run:

- `EUI_VERSION` from `packages/eui/package.json`.
- `THEME_COMMON_VERSION` from `packages/eui-theme-common/package.json`.
- `THEME_BOREALIS_VERSION` from `packages/eui-theme-borealis/package.json`.
- `SLUG` from the EUI PR title — lowercase, hyphenated, drop scope tags
  (e.g. `[EuiDataGrid] Fix cell popover hidden behind sibling/nested flyouts`
  → `cell-popover-hidden-behind-sibling-nested-flyouts`). Keep it under ~50
  chars.
- Branch name: `test-eui-{N}-{SLUG}`.

## Decide which tarballs to build

`@elastic/eui` is always built. Decide on `eui-theme-common` and
`eui-theme-borealis` by inspecting the PR's diff:

```bash
git -C {EUI_WORKTREE} diff main..HEAD --name-only -- \
  packages/eui-theme-common packages/eui-theme-borealis
```

- If a theme package has changes, build it.
- If neither has changes, skip local theme tarballs and use the published
  `@elastic/eui-theme-common` and `@elastic/eui-theme-borealis` versions in
  Kibana.
- Only build unchanged theme packages when the user explicitly asks, and warn
  that local theme tarballs are more likely to hit `workspace:*` resolution
  issues in Kibana.

## Phase 1 — Build the tarball(s) in EUI

Always work in the EUI worktree. Confirm `git status` is clean before
modifying anything.

### 1.1 — Temporary edit to `packages/eui/package.json`

`yarn pack` does not resolve `workspace:*` references, so the
`@elastic/eui-theme-common` dependency must be moved out of `dependencies`
before packing. This change is local-only and reverted at the end of the
phase.

Edit `packages/eui/package.json`:

- Remove `"@elastic/eui-theme-common": "workspace:*"` from `dependencies`.
- Add `"@elastic/eui-theme-common": "workspace:^"` to `devDependencies`,
  alphabetically after `@elastic/eui-theme-borealis`.
- Add `"@elastic/eui-theme-common": "{THEME_COMMON_VERSION}"` to
  `peerDependencies`, alphabetically after `@elastic/eui-theme-borealis`.

### 1.2 — Build

```bash
cd {EUI_WORKTREE}/packages/eui && yarn build-pack
```

Output is `packages/eui/package.tgz` (Yarn 4 default name). The build is
slow (~2–10 min). Run it in the background.

If also building theme packages:

```bash
cd {EUI_WORKTREE}/packages/eui-theme-common && yarn build-pack
cd {EUI_WORKTREE}/packages/eui-theme-borealis && yarn build-pack
```

Before `eui-theme-borealis` packing, temporarily replace
`@elastic/eui-theme-common: "workspace:*"` in **both** `dependencies` and
`devDependencies` with `{THEME_COMMON_VERSION}`. Revert that file after
packing (same as the temporary `packages/eui/package.json` edit).

### 1.3 — Rename and move tarballs

Move directly into the Kibana repo root with snake_case names matching the
example PR's pattern:

- `eui_{EUI_VERSION}_{N}.tgz`
- `eui_theme_common_{THEME_COMMON_VERSION}_{N}.tgz` (if built)
- `eui_theme_borealis_{THEME_BOREALIS_VERSION}_{N}.tgz` (if built)

```bash
mv {EUI_WORKTREE}/packages/eui/package.tgz \
   {KIBANA_PATH}/eui_{EUI_VERSION}_{N}.tgz

mv {EUI_WORKTREE}/packages/eui-theme-common/elastic-eui-theme-common-{THEME_COMMON_VERSION}.tgz \
   {KIBANA_PATH}/eui_theme_common_{THEME_COMMON_VERSION}_{N}.tgz

mv {EUI_WORKTREE}/packages/eui-theme-borealis/elastic-eui-theme-borealis-{THEME_BOREALIS_VERSION}.tgz \
   {KIBANA_PATH}/eui_theme_borealis_{THEME_BOREALIS_VERSION}_{N}.tgz
```

Snake_case is **required** — Kibana lints filenames for it.
If you rebuild a tarball, use a new filename (e.g. append `_r2`) and update
Kibana `package.json` accordingly; Yarn can keep using stale tarball contents
when the filename/path is reused.

### 1.4 — Revert the EUI package.json edit

```bash
git -C {EUI_WORKTREE} checkout -- packages/eui/package.json
# if temporarily edited for packing:
git -C {EUI_WORKTREE} checkout -- packages/eui-theme-borealis/package.json
```

Verify `git status` shows the file is back to clean.

## Phase 2 — Set up the Kibana branch

### 2.1 — Verify clean state and update main

Phase 2 assumes a remote named `upstream` points at `elastic/kibana`. Many
fresh clones only have `origin` — check first, and fix or ask before
continuing:

```bash
cd {KIBANA_PATH}
git remote get-url upstream 2>/dev/null   # must resolve to elastic/kibana
```

If `upstream` is missing or points elsewhere, ask the user which remote
tracks `elastic/kibana`. Either rename it (`git remote rename <name>
upstream`) or add it (`git remote add upstream
git@github.com:elastic/kibana.git`) before proceeding. Do not silently
rewrite an existing `upstream` that points somewhere else.

Then update main:

```bash
git status                          # must be clean (warn if not)
git fetch upstream main
git checkout main
git merge --ff-only upstream/main   # if this fails, stop and ask
```

### 2.2 — Create the branch

```bash
git checkout -b test-eui-{N}-{SLUG}
```

### 2.3 — Edit Kibana's `package.json`

Find the `@elastic/eui` and `@elastic/eui-theme-borealis` entries (around
lines 148–149 in current Kibana). Replace `@elastic/eui` with the local
file reference. Always add a `@elastic/eui-theme-common` entry below them.

```jsonc
"@elastic/eui": "file:./eui_{EUI_VERSION}_{N}.tgz",
"@elastic/eui-theme-borealis": "{THEME_BOREALIS_VERSION}",   // or file:./eui_theme_borealis_*.tgz
"@elastic/eui-theme-common": "{THEME_COMMON_VERSION}",       // or file:./eui_theme_common_*.tgz
```

When `eui-theme-common` is using its published version, it must match the
version declared in EUI's `packages/eui/package.json`.

### 2.4 — Register `eui-theme-common` in two more files

Why: `@elastic/eui-theme-common` is normally a transitive dep via
`@elastic/eui`. Adding it explicitly trips Kibana's
dependency-ownership and license CI checks unless registered.

`packages/kbn-dependency-ownership/src/rule.ts`, inside `packageFilter`:

```ts
pkg !== '@elastic/eui-theme-common' &&
```

Place it next to the existing `@elastic/eui` and
`@elastic/eui-theme-borealis` entries.

`src/dev/license_checker/config.ts`, inside `LICENSE_OVERRIDES`:

```ts
'@elastic/eui-theme-common': ['Elastic License 2.0 OR AGPL-3.0-only OR SSPL-1.0'],
```

Match the **current** Kibana style (unversioned keys, e.g.
`'@elastic/eui'`). Older example PRs may show versioned keys
(`'@elastic/eui@1.2.3'`) — do not copy that form.

## Phase 3 — Bootstrap and commit

### 3.1 — Use the right Node version

Kibana enforces `.nvmrc`. Each Bash invocation gets a fresh shell, so the
Node version must be activated in the same command as `yarn kbn bootstrap`.

The skill assumes nvm (the standard on Kibana dev machines). Check it
exists first:

```bash
[ -s "${NVM_DIR:-$HOME/.nvm}/nvm.sh" ]
```

If present, source it and bootstrap:

```bash
cd {KIBANA_PATH} && \
  source "${NVM_DIR:-$HOME/.nvm}/nvm.sh" && nvm use > /dev/null && \
  yarn kbn bootstrap --no-validate
```

If nvm is not installed, stop and ask the user to switch Node to the
version in `.nvmrc` with their own tool, then re-run bootstrap themselves:
`cd {KIBANA_PATH} && yarn kbn bootstrap --no-validate`.

If the required Node version isn't installed under nvm, run
`nvm install $(cat .nvmrc)` first.

`yarn kbn bootstrap --no-validate` takes 5–20 minutes. Run it in the
background and wait for the notification.

### 3.2 — Commit (do not push)

Stage explicitly — do **not** use `git add -A`, since the user may have
unrelated edits in the working tree:

```bash
git add package.json yarn.lock \
        eui_{EUI_VERSION}_{N}.tgz \
        packages/kbn-dependency-ownership/src/rule.ts \
        src/dev/license_checker/config.ts
# plus any theme tarballs if built
```

Commit message — match Kibana's bracketed-tag style:

```
[EUI] Test EUI #{N} {short-title} with local build

Tests EUI PR https://github.com/elastic/eui/pull/{N} against Kibana
using a local @elastic/eui tarball.
```

Do **not** push. Do **not** open a PR.

## Phase 4 — Ask about push + draft PR

Branch is ready. Ask the user something like:

> Branch `test-eui-{N}-{SLUG}` is ready, single commit on top of latest
> `upstream/main`. Push to your fork and open a draft PR?

If no, stop. If yes, continue to Phase 5.

## Phase 5 — Pre-push hygiene + push (optional, only on user OK)

### 5.1 — Re-sync with upstream/main if behind

If hours or days have passed since Phase 2, `upstream/main` has likely
moved. CI will run the branch as-is, so stale baselines mean noisy
results.

```bash
git fetch upstream main
git rev-list --count HEAD..upstream/main
```

If non-zero, propose merging `upstream/main` into the branch:

```bash
git merge upstream/main --no-edit
```

Resolve any conflicts (the test commit's edits to `package.json` and
`yarn.lock` are the most likely conflict points). Verify the EUI tarball
ref and the dependency-ownership / license entries survive the merge.

### 5.2 — Identify the push remote

The push target is the user's personal fork, not `upstream`. Check
`git remote -v` and confirm with the user before pushing.

### 5.3 — Push and open the draft PR

```bash
git push -u {remote} test-eui-{N}-{SLUG}
gh pr create --draft \
  --base main \
  --head {github-user}:test-eui-{N}-{SLUG} \
  --title "[EUI] Test EUI #{N} {short-title}" \
  --body "$(cat <<'EOF'
## Summary

Test PR for [EUI #{N}](https://github.com/elastic/eui/pull/{N}). Runs
Kibana CI against a local build of EUI to surface regressions before
merging.

> [!warning]
> Do not merge.
EOF
)"
```

Return the PR URL.

## Common gotchas

- **`yarn build-pack` outputs `package.tgz`, not `elastic-eui-*.tgz`** under
  Yarn 4. Always rename to the snake_case format before moving.
- **Theme tarball output names differ from EUI.**
  `eui-theme-common` and `eui-theme-borealis` output
  `elastic-eui-theme-*.tgz` (not `package.tgz`).
- **Prefer published theme packages unless the PR changes those packages.**
  This follows the wiki workflow and avoids avoidable `workspace:*`
  resolution failures in Kibana.
- **If you rebuild a tarball, change its filename before re-bootstrap.**
  Reusing the same filename/path can cause Yarn to keep stale package
  contents.
- **Snake_case filenames are required** in Kibana. Hyphens and dots between
  words will fail Kibana's lint.
- **Cwd is fresh on every Bash call.** Use absolute paths or compound
  commands (`source ~/.nvm/nvm.sh && nvm use && yarn ...`).
- **Node version mismatch** is the most common bootstrap failure. Always
  source nvm and `nvm use` first.
- **Revert the temp `packages/eui/package.json` edit** before finishing
  Phase 1 — otherwise it lands in the EUI branch.
- **The license_checker uses unversioned keys** in current Kibana. Match
  that style; older PRs may show versioned keys.
- **Never `git add -A` in Kibana.** The user may have unrelated edits in
  the working tree (e.g. local workarounds being tested against the
  build). Always stage by file name.
- **Re-sync with `upstream/main` before pushing** if the branch was
  prepared on a different day. Otherwise CI runs against an outdated
  baseline.
