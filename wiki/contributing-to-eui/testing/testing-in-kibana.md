# Testing EUI features in Kibana ahead of time

For changes that may have major implications on existing Kibana usages of EUI, a built version of EUI should be tested against Kibana (ideally before being merged/released into EUI) to ensure that the [upgrade process](../../eui-team-processes/upgrading-kibana.md) is as painless as possible.

## Testing local EUI in local Kibana

Note that `yarn link` currently does not work with Kibana. You'll need to manually pack and insert it into Kibana to test locally.

### In EUI run:

```bash
yarn build-pack
```

This will create a `.tgz` file with the changes in your EUI directory. At this point you can move it anywhere.

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

