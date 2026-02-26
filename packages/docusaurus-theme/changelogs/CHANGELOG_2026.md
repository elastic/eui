## [`v2.3.0`](https://github.com/elastic/eui/releases/v2.3.0)

- Added `versionsUrl` prop to `VersionSwitcher` component to fetch the versions list at runtime from the main deployment, ensuring all released versions are always visible in the version switcher ([#9363](https://github.com/elastic/eui/pull/9363))

## [`v2.2.0`](https://github.com/elastic/eui/releases/v2.2.0)

- Added `extraFiles` prop to the `Demo` component. It allows to pass extra files that will be added to the Codesandbox instance. ([#9317](https://github.com/elastic/eui/pull/9317))
- Updated the `IMPORT_REGEX` to include relative imports so that all imports are removed from the snippet. All imported references have to be passed to `Demo` in the `scope` prop. ([#9317](https://github.com/elastic/eui/pull/9317))

