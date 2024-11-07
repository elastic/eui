const path = require('path');
const util = require('util');
const fs = require('fs');
const copyFilePromise = util.promisify(fs.copyFile);

const chalk = require('chalk');

const sourceDirectory = 'src';
const destinationDirectory = 'lib';

async function copyJsonFiles() {
  // Copy static legacy JSON token files from /src to /lib
  const jsonFilesToCopy = [
    'eui_theme_borealis_light.json',
    'eui_theme_borealis_dark.json',
    'eui_theme_borealis_light.json.d.ts',
    'eui_theme_borealis_dark.json.d.ts',
  ];
  await Promise.all(
    jsonFilesToCopy.map((fileName) => {
      const source = path.join(sourceDirectory, fileName);
      const destination = path.join(destinationDirectory, fileName);

      if (!fs.existsSync(destinationDirectory)) {
        fs.mkdirSync(destinationDirectory);
      }

      return copyFilePromise(source, destination, (err) => {
        if (err) throw err;
        console.log(
          chalk`{green ✔} Finished copying {gray ${source}} to {gray ${destination}}`
        );
      });
    })
  );
}

if (require.main === module) {
  copyJsonFiles();
}
