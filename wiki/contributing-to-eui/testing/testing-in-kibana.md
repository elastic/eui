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
  * Change the name of the `.tgz` after subsequent `yarn build && yarn pack` steps (e.g., `elastic-eui-xx.x.x-1.tgz`, `elastic-eui-xx.x.x-2.tgz`). This is required for `yarn` to recognize new changes to the package.
* Running Kibana with `yarn start` ensures it starts in dev mode and doesn't use a previously cached version of EUI.

## Testing in the cloud

Elastic engineers have the option of deploying a specific branch of EUI against a specific branch of Kibana in the cloud in a development environment. For more information, see:

- https://github.com/lukeelmers/terraform-kibana-dev
- The `#kibana-a-la-carte` Slack channel
