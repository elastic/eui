const path = require('path');
const util = require('util');
const fs = require('fs');
const globModule = require('glob');

const chalk = require('chalk');
const postcss = require('postcss');
const sassExtract = require('sass-extract');

const postcssConfiguration = require('../src-docs/postcss.config.js');

const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);
const glob = util.promisify(globModule);

async function compileScssFiles(sourcePattern, destinationDirectory) {
  try {
    await mkdir(destinationDirectory);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }

  const inputFilenames = await glob(sourcePattern, undefined);

  await Promise.all(
    inputFilenames.map(async inputFilename => {
      console.log(chalk`{cyan …} Compiling {gray ${inputFilename}}`);

      try {
        const { name } = path.parse(inputFilename);
        const outputFilenames = await compileScssFile(
          inputFilename,
          path.join(destinationDirectory, `eui_${name}.css`),
          path.join(destinationDirectory, `eui_${name}.json`)
        );

        console.log(
          chalk`{green ✔} Finished compiling {gray ${inputFilename}} to ${outputFilenames
            .map(filename => chalk.gray(filename))
            .join(', ')}`
        );
      } catch (error) {
        console.log(chalk`{red ✗} Failed to compile {gray ${inputFilename}} with ${error.stack}`);
      }
    })
  );
}

async function compileScssFile(inputFilename, outputCssFilename, outputVarsFilename) {
  const { css: renderedCss, vars: extractedVars } = await sassExtract.render(
    {
      file: inputFilename,
      outFile: outputCssFilename,
    },
    {
      plugins: [{ plugin: 'sass-extract-js' }],
    }
  );

  const { css: postprocessedCss } = await postcss(postcssConfiguration).process(renderedCss, {
    from: outputCssFilename,
    to: outputCssFilename,
  });

  await Promise.all([
    writeFile(outputCssFilename, postprocessedCss),
    writeFile(outputVarsFilename, JSON.stringify(extractedVars, undefined, 2)),
  ]);

  return [outputCssFilename, outputVarsFilename];
}

compileScssFiles(path.join('src', 'theme_*.scss'), 'dist');
