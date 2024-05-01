const Codeowners = require('codeowners');
const temp = new Codeowners("../../../kibana");

const { scan } = require('./scan');

const runScan = async () => {
  const scanResult = await scan();
  console.log(scanResult);
};

runScan();
