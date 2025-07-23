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
- Copy the generated `.tgz` package file(s) to the Kibana root
- Point the `package.json` file in Kibana to that local file: `"@elastic/eui": "file:./elastic-eui-xx.x.x.tgz"`.
- Add `"@elastic/eui-theme-common"` to the `package.json` and point it either to the local package you copied, or add the published version that matches the version listed as a dependency in your local `@elastic/eui` package

```bash
# default release version, no local package for @elastic/eui-theme-common
"@elastic/eui-theme-common": "3.0.0"

# with local package added
"@elastic/eui-theme-common": "file:./elastic_eui_theme_common_xx.x.x.tgz"

```

- Run `yarn kbn bootstrap`
- Commit the changed files (`package.json`. `yarn.lock` and EUI `.tgz` package) and push your branch
- Create a Kibana (draft) pull request
  - Kibana CI will run tests on this instance with your custom EUI package
  - To ensure CI works correctly, you'll need to add `@elastic/eui-theme-common` to `packages/kbn-dependency-ownership/src/rule.ts` ([example](https://github.com/elastic/kibana/pull/227054/files)) and `src/dev/license_checker/config.ts` ([example](https://github.com/elastic/kibana/pull/227054/files#diff-373e937e773b0370ab1d28f3cf90251dcbd3cf95546f8c54b6bb6b1f999999dcR96))

#### Deploy the custom EUI package

After you have created a Kibana PR following the steps above, there are two ways you can deploy your local EUI package in Kibana.

##### Using labels

- Add the labels `ci:cloud-deploy` and `ci:cloud-persist-deployment` on your PR and ensure the CI pipelines run by checking the "Click to trigger kibana-deploy-cloud-from-pr for this PR!" checkbox in the comment from **elasticmachine**
- Once the pipelines are finished, **kibanamachine** will post a message with a link to the credentials on Buildkite, there you'll find a link to the deployment e.g. https://kibana-pr-228477.kb.us-west2.gcp.elastic-cloud.com and a command to get the credentials
- Run the `vault` command to get the credentials in your terminal (if you never used the `vault` CLI, continue reading)
- To use HashiCorp's `vault` CLI
  - [Install it](https://developer.hashicorp.com/vault/install), if you're on a Mac you can use [homebrew](https://brew.sh/)
  - Login for the [Infra Vault (production)]((https://docs.elastic.dev/vault/accessing)) by running:
    - `export VAULT_ADDR=https://secrets.elastic.co:8200`
    - `vault login -method=oidc`

##### Using Kibana a la carte

Follow the instructions in [Kibana a la carte](https://kibana-a-la-carte.kbndev.co/) to deploy your PR.
