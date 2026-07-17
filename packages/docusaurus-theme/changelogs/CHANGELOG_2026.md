## [`v2.5.0`](https://github.com/elastic/eui/releases/v2.5.0)

- Wrapped the documentation heading anchor link `EuiButtonIcon` in an `EuiToolTip` instead of using the native `title` attribute ([#9771](https://github.com/elastic/eui/pull/9771))
- Wrapped navbar icon links and toggles in `EuiToolTip` instead of using the native `title` attribute ([#9771](https://github.com/elastic/eui/pull/9771))
- Added vertical spacing around MDX code blocks in the Docusaurus theme. ([#9762](https://github.com/elastic/eui/pull/9762))

**Bug fixes**

- Disabled the fullscreen button for one-liner code snippets on the docs site. ([#9792](https://github.com/elastic/eui/pull/9792))
- Fixed the docs Demo source editor to match the selected color mode. ([#9769](https://github.com/elastic/eui/pull/9769))
- Fixed the docs navbar to switch to mobile navigation at tablet widths. ([#9738](https://github.com/elastic/eui/pull/9738))
- Added `EuiThemeProvider` on `DemoPreview` to reset doc level overrides. ([#9642](https://github.com/elastic/eui/pull/9642))

**Dependency updates**

- Replaced `codesandbox` with `lz-string@^1.5.0` for CodeSandbox demo parameter encoding, removing vulnerable transitive dependencies from `axios`. ([#9790](https://github.com/elastic/eui/pull/9790))

## [`v2.4.0`](https://github.com/elastic/eui/releases/v2.4.0)

- Updated `VersionSwitcher` to align with the updated API for `EuiListGroupItem` ([#9579](https://github.com/elastic/eui/pull/9579))

## [`v2.3.0`](https://github.com/elastic/eui/releases/v2.3.0)

- Added `versionsUrl` prop to `VersionSwitcher` component to fetch the versions list at runtime from the main deployment, ensuring all released versions are always visible in the version switcher ([#9363](https://github.com/elastic/eui/pull/9363))

## [`v2.2.0`](https://github.com/elastic/eui/releases/v2.2.0)

- Added `extraFiles` prop to the `Demo` component. It allows to pass extra files that will be added to the Codesandbox instance. ([#9317](https://github.com/elastic/eui/pull/9317))
- Updated the `IMPORT_REGEX` to include relative imports so that all imports are removed from the snippet. All imported references have to be passed to `Demo` in the `scope` prop. ([#9317](https://github.com/elastic/eui/pull/9317))

