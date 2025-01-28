/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

const { scan } = require('./scan');

const { Client } = require('@elastic/elasticsearch');
const client = new Client({
  cloud: {
    id: process.env.CLOUD_ID
  },
  auth: {
    apiKey: process.env.AUTH_APIKEY
  }
});

const run = async () => {
  const result = await scan();
  const operations = result.flatMap(doc => [{ index: { _index: 'eui_components' } }, doc]);
  const response = await client.bulk({ refresh: true, operations });
  console.log(response);
};

run().catch((e) => console.error(e));
