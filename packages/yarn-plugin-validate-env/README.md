# `@elastic/yarn-plugin-eui-validate-env`

This is an internal yarn plugin that validates the runtime environment and ensures
it matches the requirements.

## Building the plugin

We use `@yarnpkg/builder` to build the plugin. You can build it locally by running:

```shell
yarn build
```

## Updating the plugin in EUI monorepo

When making changes to this plugin, it's necessary to build it and let yarn know to copy the built
file(s) to an appropriate directory, as well as update `.yarnrc`.
Run the following command in the root directory of this monorepo:

```shell
yarn plugin import ./packages/yarn-plugin-validate-env/bundles/@yarnpkg/plugin-eui-validate-env.js
```
