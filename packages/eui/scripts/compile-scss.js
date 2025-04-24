const path = require('path');
const util = require('util');
const fs = require('fs');
const copyFilePromise = util.promisify(fs.copyFile);

const chalk = require('chalk');

async function compileScssFiles({
  destinationDirectory,
  docsVariablesDirectory,
}) {
  // Copy static JSON Sass var files from src/themes/json to dist
  const jsonFilesToCopy = [
    'eui_theme_amsterdam_dark.json',
    'eui_theme_amsterdam_light.json',
    'eui_theme_amsterdam_dark.json.d.ts',
    'eui_theme_amsterdam_light.json.d.ts',
    /* TODO: temp files only, remove once imports from theme package work as expected */
    'eui_theme_borealis_dark.json',
    'eui_theme_borealis_light.json',
    'eui_theme_borealis_dark.json.d.ts',
    'eui_theme_borealis_light.json.d.ts',
  ];
  await Promise.all(
    jsonFilesToCopy.map((fileName) => {
      const source = path.join(docsVariablesDirectory, fileName);
      const destination = path.join(destinationDirectory, fileName);

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
  compileScssFiles({
    destinationDirectory: 'dist',
    docsVariablesDirectory: 'src/themes/json',
  });
}
