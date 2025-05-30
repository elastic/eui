# Testing EUI features in Kibana ahead of time

For changes that may have major implications on existing Kibana usages of EUI, a built version of EUI should be tested against Kibana (ideally before being merged/released into EUI) to ensure that the [upgrade process](../../eui-team-processes/upgrading-kibana.md) is as painless as possible.

## Testing local EUI in local Kibana

Note that `yarn link` currently does not work with Kibana. You'll need to manually pack and insert it into Kibana to test locally.

### In EUI:

EUI is a monorepo and to build and test `eui` locally in Kibana you'll need to ensure that the internal dependency packages are correctly linked as well.

First, update the `package.json` in `eui/packages/eui` as follows:

- remove `@elastic/eui-theme-common` from dependencies
- add `"@elastic/eui-theme-common": "workspace:^"` to devDependencies
- add `"@elastic/eui-theme-common": "{CURRENT_VERSION}"` to peerDependencies, e.g. `"@elastic/eui-theme-common": "1.0.0"`

Then run the following command:

```bash
# eui/packages/eui
yarn build-pack
```

If you made changes to `eui-theme-common` and/or `eui-theme-borealis` directories you'll need to build those packages as well:

```bash
# eui/packages/eui-theme-common
yarn build-pack
```

```bash
# eui/packages/eui-theme-borealis
yarn build-pack
```

This will create the required `.tgz` file(s) with the changes in your `eui` (and `eui-theme-common`/ `eui-theme-borealis`) directory. At this point you can move it anywhere.

### In Kibana:

Point the `package.json` file in Kibana to that file: `"@elastic/eui": "/path/to/elastic-eui-xx.x.x.tgz"`. Then run the following commands at Kibana's root folder:

```bash
yarn kbn bootstrap --no-validate && yarn start
```

* The `--no-validate` flag is required when bootstrapping with a `.tgz`.
  * Change the name of the `.tgz` after subsequent `yarn build-pack` steps (e.g., `elastic-eui-xx.x.x-1.tgz`, `elastic-eui-xx.x.x-2.tgz`). This is required for `yarn` to recognize new changes to the package.
* Running Kibana with `yarn start` ensures it starts in dev mode and doesn't use a previously cached version of EUI.

### Deploying local EUI in Kibana

Elastic engineers have the option to deploy a local EUI package in Kibana. To do so, do the following:

#### Generate and link a local EUI package

- Follow the steps above to create a local package of EUI using `yarn build-pack`
- Copy the generated `.tgz` package file to the Kibana root
- Point the `package.json` file in Kibana to that local file: `"@elastic/eui": "./elastic-eui-xx.x.x.tgz"`.
- Run `yarn kbn bootstrap`
- Commit the changed files (`package.json`. `yarn.lock` and EUI `.tgz` package) and push your branch
- Create a Kibana (draft) pull request
  - Kibana CI will run tests on this instance with your custom EUI package

#### Deploy the custom EUI package

There are two ways you can deploy your local EUI package in Kibana.

1. add the labels `ci:cloud-deploy` and `ci:cloud-persist-deployment` on your PR and ensure the CI pipelines run 
  - after the pipelines finish the "Build" information will have a link to the cloud deployment and access information ([vault access](https://docs.elastic.dev/vault/infra-vault/accessing) is required)
2. use [Kibana-a-la-carte](https://kibana-a-la-carte.kbndev.co/) to deploy your PR

