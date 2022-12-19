const path = require('path');
const util = require('util');
const fs = require('fs');
const globModule = require('glob');
const copyFilePromise = util.promisify(fs.copyFile);

const chalk = require('chalk');
const postcss = require('postcss');
const sass = require('sass');

const postcssConfiguration = require('../postcss.config.js');

const targetTheme = process.env['TARGET_THEME'];

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

async function compileScssFiles({
  sourcePattern,
  destinationDirectory,
  docsVariablesDirectory,
}) {
  try {
    await mkdir(destinationDirectory);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }

  const inputFilenames = (await glob(sourcePattern, undefined)).filter(
    (filename) => {
      if (targetTheme == null) return true;
      return filename === `src/themes/amsterdam/theme_${targetTheme}.scss`;
    }
  );

  await Promise.all(
    inputFilenames.map(async (inputFilename) => {
      console.log(chalk`{cyan …} Compiling {gray ${inputFilename}}`);

      try {
        const { name } = path.parse(inputFilename);
        const outputFilenames = await compileScssFile({
          inputFilename,
          outputCssFilename: path.join(destinationDirectory, `eui_${name}.css`),
        });

        console.log(
          chalk`{green ✔} Finished compiling {gray ${inputFilename}} to ${outputFilenames
            .map((filename) => chalk.gray(filename))
            .join(', ')}`
        );
      } catch (error) {
        console.log(
          chalk`{red ✗} Failed to compile {gray ${inputFilename}} with ${error.stack}`
        );
      }
    })
  );

  // Copy static JSON Sass var files from src-docs/src/views/theme/_json to dist
  const jsonFilesToCopy = [
    'eui_theme_dark.json',
    'eui_theme_light.json',
    'eui_theme_dark.json.d.ts',
    'eui_theme_light.json.d.ts',
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

async function compileScssFile({ inputFilename, outputCssFilename }) {
  const outputCssMinifiedFilename = outputCssFilename.replace(
    /\.css$/,
    '.min.css'
  );

  const { css: renderedCss } = sass.renderSync({
    file: inputFilename,
    outFile: outputCssFilename,
    logger: sass.Logger.silent, // Silence warnings about division - we won't be on Sass for much longer
  });

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
  ]);

  return [outputCssFilename, outputCssMinifiedFilename];
}

if (require.main === module) {
  compileScssFiles({
    sourcePattern: path.join('src/themes/amsterdam', 'theme_*.scss'),
    destinationDirectory: 'dist',
    docsVariablesDirectory: 'src-docs/src/views/theme/_json',
  });
}
