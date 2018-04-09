const util = require('util');
const writeFile = util.promisify(require('fs').writeFile);
const glob = util.promisify(require('glob'));

const chalk = require('chalk');
const postcss = require('postcss');
const sassExtract = require('sass-extract');
const shell = require('shelljs');

shell.mkdir('dist');

glob('./src/theme_*.scss', undefined).then(files =>
  Promise.all(
    files.map(file => {
      const splitPath = file.split('/');
      const fileName = splitPath[splitPath.length - 1];
      const splitFileName = fileName.split('.');
      const baseFileName = splitFileName[0];
      const cssFileName = `dist/eui_${baseFileName}.css`;
      const varsFileName = `dist/eui_${baseFileName}.json`;

      console.log(`… Processing "${file}"`);
      return sassExtract
        .render(
          {
            file,
            outFile: cssFileName,
          },
          {
            plugins: [{ plugin: 'sass-extract-js' }],
          }
        )
        .then(({ css, vars }) =>
          postcss(require('../src-docs/postcss.config.js'))
            .process(css, { from: cssFileName, to: cssFileName })
            .then(processedCss => ({
              processedCss,
              vars,
            }))
        )
        .then(({ processedCss, vars }) => {
          console.log(`… Writing theme css to "${cssFileName}"`);
          console.log(`… Writing theme variables to "${varsFileName}"`);
          return Promise.all([
            writeFile(cssFileName, processedCss.css),
            writeFile(varsFileName, JSON.stringify(vars, undefined, 2)),
          ]).then(() => {
            console.log(chalk.green(`✔ Finished processing "${file}"`));
          });
        });
    })
  )
);
