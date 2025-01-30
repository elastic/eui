/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

const { scan } = require('./scan');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const { Client } = require('@elastic/elasticsearch');

const argv = yargs(hideBin(process.argv))
  .option('kibana-root', {
    type: 'string',
    describe: 'Path to Kibana repo root',
  })
  .option('dry', {
    type: 'boolean',
    describe: 'Path to Kibana repo root',
  })
  .help().argv;

let client;

if (!argv['dry']) {
  if (!process.env.CLOUD_ID_SECRET || !process.env.AUTH_APIKEY_SECRET) {
    console.error(
      'CLOUD_ID_SECRET and AUTH_APIKEY_SECRET environment variables must be set before running this script.'
    );
    process.exit(1);
  }

  client = new Client({
    cloud: {
      id: process.env.CLOUD_ID_SECRET,
    },
    auth: {
      apiKey: process.env.AUTH_APIKEY_SECRET,
    },
  });
}

const run = async () => {
  const result = await scan({ kibanaRoot: argv['kibana-root'] });
  const operations = result.flatMap((doc) => [
    { index: { _index: 'eui_components' } },
    doc,
  ]);
  if (client) {
    const response = await client.bulk({ refresh: true, operations });
    console.log(response);
  } else {
    console.log(result);
  }
};

run().catch((e) => console.error(e));
