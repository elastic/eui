# EUI Release CLI

A command-line tool for automating the release process of EUI packages in the monorepo.

## Overview

The Release CLI handles the complete release workflow including version updates, building packages, running pre/post-release scripts, and publishing to npm. It ensures safety through various git and workspace checks.

## Usage

```bash
npm run build
node dist/index.js run <type> [options]
```

### Release Types

- **`official`** - Production releases tagged as `latest` on npm
- **`snapshot`** - Development/preview releases tagged as `snapshot` on npm

### Examples

```bash
# Official release
node dist/index.js run official

# Snapshot release
node dist/index.js run snapshot

# Release specific workspaces
node dist/index.js run snapshot --workspaces @elastic/eui @elastic/eui-theme-borealis

# Verbose output
node dist/index.js run snapshot --verbose
```

## Options

- `--tag <tag>` - Custom npm tag (forced to `latest` for official releases)
- `--workspaces <names...>` - Space-separated list of workspaces to release
- `--allowCustom` - [UNSAFE] Allow releases from unpushed changes
- `--verbose, -v` - Enable detailed logging
- `--skipPrompts` - Skip user prompts (CI only, requires `--useAuthToken`)
- `--skipUpdateVersions` - [UNSAFE] Skip version updates (requires `--workspaces`)
- `--useAuthToken` - Use npm auth token instead of user authentication (CI only)

## Requirements

- Clean git working tree
- Official releases must be from the `main` branch
- Yarn workspace setup
- npm authentication configured

## Release Process

1. **Initial Checks** - Validates git status, branch, and authentication
2. **Build Packages** - Builds all workspace packages
3. **Update Versions** - Updates package versions and changelogs
4. **Pre-release Scripts** - Runs any configured pre-release scripts
5. **Workspace Validation** - Checks workspace integrity
6. **Publish** - Publishes packages to npm
7. **Post-release Scripts** - Runs any configured post-release scripts

## Safety Features

- Prevents releases from dirty working trees
- Validates git branch requirements
- Checks npm authentication
- Confirms workspace integrity before publishing
- Interactive prompts for destructive operations

## Development

```bash
# Build the CLI
npm run build

# The built CLI will be available at dist/index.js
```
