const path = require('path');
const util = require('util');
const fs = require('fs');
const globModule = require('glob');

const chalk = require('chalk');
const postcss = require('postcss');
const sassExtract = require('sass-extract');
const { deriveSassVariableTypes } = require('./derive-sass-variable-types');
const sassExtractJsPlugin = require('./sass-extract-js-plugin');

const postcssConfiguration = require('../postcss.config.js');

const writeFile = util.promisify(fs.writeFile);
const mkdir = util.promisify(fs.mkdir);
const glob = util.promisify(globModule);

const postcssConfigurationWithMinification = {
  ...postcssConfiguration,
  plugins: [
    ...postcssConfiguration.plugins,
    require('cssnano')({ preset: 'default' }),
  ],
};

async function compileScssFiles(
  sourcePattern,
  destinationDirectory,
  packageName
) {
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
          path.join(destinationDirectory, `eui_${name}.json`),
          path.join(destinationDirectory, `eui_${name}.json.d.ts`),
          packageName
        );

        console.log(
          chalk`{green ✔} Finished compiling {gray ${inputFilename}} to ${outputFilenames
            .map(filename => chalk.gray(filename))
            .join(', ')}`
        );
      } catch (error) {
        console.log(
          chalk`{red ✗} Failed to compile {gray ${inputFilename}} with ${
            error.stack
          }`
        );
      }
    })
  );
}

async function compileScssFile(
  inputFilename,
  outputCssFilename,
  outputVarsFilename,
  outputVarTypesFilename,
  packageName
) {
  const outputCssMinifiedFilename = outputCssFilename.replace(
    /\.css$/,
    '.min.css'
  );

  const { css: renderedCss, vars: extractedVars } = await sassExtract.render(
    {
      file: inputFilename,
      outFile: outputCssFilename,
    },
    {
      plugins: [sassExtractJsPlugin],
    }
  );

  const extractedVarTypes = await deriveSassVariableTypes(
    extractedVars,
    `${packageName}/${outputVarsFilename}`,
    outputVarTypesFilename
  );

  const { css: postprocessedCss } = await postcss(postcssConfiguration).process(
    renderedCss,
    {
      from: outputCssFilename,
      to: outputCssFilename,
    }
  );

  const { css: postprocessedMinifiedCss } = await postcss(
    postcssConfigurationWithMinification
  ).process(renderedCss, {
    from: outputCssFilename,
    to: outputCssMinifiedFilename,
  });

  await Promise.all([
    writeFile(outputCssFilename, postprocessedCss),
    writeFile(outputCssMinifiedFilename, postprocessedMinifiedCss),
    writeFile(outputVarsFilename, JSON.stringify(extractedVars, undefined, 2)),
    writeFile(outputVarTypesFilename, extractedVarTypes),
  ]);

  return [
    outputCssFilename,
    outputCssMinifiedFilename,
    outputVarsFilename,
    outputVarTypesFilename,
  ];
}

if (require.main === module) {
  const [nodeBin, scriptName, euiPackageName] = process.argv;

  if (process.argv.length < 3) {
    console.log(chalk`{bold Usage:} ${nodeBin} ${scriptName} eui-package-name`);
    process.exit(1);
  }

  compileScssFiles(path.join('src', 'theme_*.scss'), 'dist', euiPackageName);
}
