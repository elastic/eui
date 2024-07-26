/**
 * Run this command from directly in this folder.
 * 
 * This command scans file in the kibana repository with react-scanner, analyzing all component usage, and upload that usage
 * to an Elastic instance.
 * 
 * To run this, you need to have this repository (the eui repository) checked out side by side.
 * 
 * The elasticsearch index will be called "eui_components"
 * 
 * Usage:
 *   CLOUD_ID=****** AUTH_APIKEY=****** node index.js
 * 
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
