# EUI (Elastic UI Framework) Development Instructions

**Always follow these instructions first and fallback to additional search and context gathering only if the information here is incomplete or found to be in error.**

## Working Effectively

### Repository Setup
This is a **monorepo** containing multiple packages. The main EUI package is located in `packages/eui/`. Always navigate to this directory for EUI development work:

```bash
cd packages/eui
```

### Node.js Setup
**CRITICAL**: Use Node.js version 22.17.1 (defined in `.nvmrc`):

```bash
# Install and use correct Node version with nvm
nvm install 22.17.1
nvm use 22.17.1

# Enable corepack for Yarn 4.6.0 management
corepack enable
```

### Dependencies Installation
Install dependencies from the repository root:

```bash
# From repository root
yarn
```

**Note**: Cypress download may fail in sandboxed environments. This is expected and does not prevent core functionality.

### Build Process
**NEVER CANCEL BUILDS OR LONG-RUNNING COMMANDS**. Set timeouts appropriately:

```bash
# Navigate to EUI package directory
cd packages/eui

# 1. Build workspace dependencies FIRST (takes ~10 seconds)
yarn build:workspaces

# 2. Build main EUI package (takes 3+ minutes. NEVER CANCEL - set 60+ minute timeout)
yarn build
```

**CRITICAL TIMING**: 
- Build workspaces: ~10 seconds
- Main build: ~3 minutes 20 seconds (NEVER CANCEL - set timeout to 60+ minutes)

### Development Servers

#### Storybook (Recommended for Component Development)
```bash
cd packages/eui

# Ensure workspaces are built first
yarn build:workspaces

# Start Storybook (takes 3-5 minutes to start, runs on port 6006)
yarn start
```

**NEVER CANCEL**: Storybook build takes 3-5 minutes. Set timeout to 60+ minutes.

#### Documentation Website
```bash
# From repository root, build website dependencies
yarn workspace @elastic/eui-website build:workspaces

# Start documentation site (runs on port 3000)
yarn workspace @elastic/eui-website start --port 3000
```

**NEVER CANCEL**: Website build takes 5+ minutes. Set timeout to 60+ minutes.

### Testing

#### Unit Tests
```bash
cd packages/eui

# Run all unit tests (takes ~35+ seconds)
yarn test-unit

# Run specific tests (e.g., button components)
yarn test-unit button

# Run only React component tests
yarn test-unit --testMatch=react

# Run only non-React tests  
yarn test-unit --testMatch=non-react
```

**NEVER CANCEL**: Test suites can take 15+ minutes for full runs. Set timeout to 30+ minutes.

#### Cypress Tests
```bash
cd packages/eui

# Note: Cypress binary download may fail in sandboxed environments
# Core functionality works without Cypress
yarn test-cypress
```

### Linting
```bash
cd packages/eui

# Run all linting (includes TypeScript, ESLint, Stylelint)
yarn lint

# Fix automatically fixable issues
yarn lint-fix
```

**Expected**: Linting passes with deprecation warnings (this is normal).

## Validation Scenarios

**CRITICAL**: Always test actual functionality after making changes. Execute complete user workflows:

### Storybook Validation
1. Build workspaces: `yarn build:workspaces`
2. Start Storybook: `yarn start`
3. Wait for "Local: http://localhost:6006/" message
4. Navigate to http://localhost:6006 in browser
5. Verify components load and are interactive
6. Test theme switching and component controls

### Documentation Website Validation  
1. Build website workspaces: `yarn workspace @elastic/eui-website build:workspaces`
2. Start website: `yarn workspace @elastic/eui-website start`
3. Navigate to http://localhost:3000
4. Verify homepage loads with EUI branding
5. Test navigation to components and documentation pages

### Component Development Validation
1. Make component changes in `src/components/`
2. Run linting: `yarn lint`
3. Run relevant unit tests: `yarn test-unit [component-name]`
4. Start Storybook to see changes: `yarn start`
5. Test component functionality in Storybook

## Common Commands & Timing

| Command | Location | Duration | Timeout | Description |
|---------|----------|----------|---------|-------------|
| `yarn` | Repository root | 3+ minutes | 60+ minutes | Install dependencies |
| `yarn build:workspaces` | `packages/eui` | ~10 seconds | 30 minutes | Build workspace dependencies |
| `yarn build` | `packages/eui` | ~3m 20s | **60+ minutes** | Build EUI package |
| `yarn lint` | `packages/eui` | ~30 seconds | 30 minutes | Run all linting |
| `yarn test-unit` | `packages/eui` | ~35+ seconds | **30+ minutes** | Run unit tests |
| `yarn start` | `packages/eui` | ~3-5 minutes | **60+ minutes** | Start Storybook |

**CRITICAL**: NEVER CANCEL builds, tests, or development servers. Always wait for completion.

## Key Directories

- `packages/eui/src/components/` - React components
- `packages/eui/src/themes/` - Theme definitions  
- `packages/eui/src/services/` - Utility functions
- `packages/eui/src/test/` - Test utilities
- `packages/eui/scripts/` - Build and development scripts
- `packages/eui-theme-common/` - Shared theme utilities
- `packages/eui-theme-borealis/` - Borealis theme implementation

## Troubleshooting

### Build Issues
- **Always run `yarn build:workspaces` before `yarn build`**
- Ensure Node.js 22.17.1 is being used
- Clear cache: `yarn build:clean` then rebuild

### Test Issues  
- TypeScript version warnings are expected and safe to ignore
- Run tests with `--maxWorkers=1` if experiencing memory issues
- Tests may output deprecation warnings (this is normal)

### Cypress Issues
- Cypress binary download failures in sandboxed environments are expected
- Core EUI functionality works without Cypress
- Use unit tests and Storybook for component validation

### Development Server Issues
- Ensure workspaces are built before starting servers
- Check that ports 6006 (Storybook) and 3000 (website) are available
- Font loading errors from Google Fonts can be ignored

## Pre-commit Validation

Always run before committing changes:

```bash
cd packages/eui

# 1. Lint code
yarn lint

# 2. Run relevant tests
yarn test-unit [affected-components]

# 3. Ensure build still works
yarn build:workspaces && yarn build
```

**CRITICAL**: CI builds will fail if linting or tests fail. Always validate locally first.

## Component Development Workflow

1. **Navigate to EUI directory**: `cd packages/eui`
2. **Build dependencies**: `yarn build:workspaces`
3. **Start development server**: `yarn start` (Storybook)
4. **Make changes** in `src/components/`
5. **Test changes** in Storybook browser interface
6. **Run tests**: `yarn test-unit [component-name]`
7. **Lint code**: `yarn lint`
8. **Validate build**: `yarn build` (if making significant changes)

Remember: **NEVER CANCEL** long-running operations. Set appropriate timeouts and wait for completion.