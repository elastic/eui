const { execSync } = require('child_process');
const chalk = require('chalk');
const shell = require('shelljs');
const path = require('path');
const glob = require('glob');

function compileLib() {
  shell.mkdir(
    '-p',
    'lib/components/icon/assets/tokens',
    'lib/services',
    'lib/test'
  );

  console.log('Compiling src/ to es/ and lib/');

  // Run all code (com|trans)pilation through babel (ESNext JS & TypeScript)
  execSync(
    'babel --quiet --out-dir=es --extensions .js,.ts,.tsx --ignore "**/webpack.config.js,**/*.test.js,**/*.d.ts" src',
    {
      env: {
        ...process.env,
        BABEL_MODULES: false,
        NO_COREJS_POLYFILL: true,
      },
    }
  );
  execSync(
    'babel --quiet --out-dir=lib --extensions .js,.ts,.tsx --ignore "**/webpack.config.js,**/*.test.js,**/*.d.ts" src',
    {
      env: {
        ...process.env,
        NO_COREJS_POLYFILL: true,
      },
    }
  );

  console.log(chalk.green('✔ Finished compiling src/'));

  // Use `tsc` to emit typescript declaration files for .ts files
  console.log('Generating typescript definitions file');
  execSync(`node ${path.resolve(__dirname, 'dtsgenerator.js')}`, {
    stdio: 'inherit',
  });
  // validate the generated eui.d.ts doesn't contain errors
  execSync(`tsc --noEmit -p tsconfig-builttypes.json`, { stdio: 'inherit' });
  console.log(chalk.green('✔ Finished generating definitions'));

  // Also copy over SVGs. Babel has a --copy-files option but that brings over
  // all kinds of things we don't want into the lib folder.
  shell.mkdir('-p', 'lib/components/icon/assets');

  glob('./src/components/**/*.svg', undefined, (error, files) => {
    files.forEach(file => {
      const splitPath = file.split('/');
      const basePath = splitPath.slice(2, splitPath.length).join('/');
      shell.cp('-f', `${file}`, `lib/${basePath}`);
    });

    console.log(chalk.green('✔ Finished copying SVGs'));
  });
}

function compileBundle() {
  shell.mkdir('-p', 'dist');

  console.log('Building bundle...');
  execSync('webpack --config=src/webpack.config.js', { stdio: 'inherit' });

  console.log('Building minified bundle...');
  execSync('NODE_ENV=production webpack --config=src/webpack.config.js', {
    stdio: 'inherit',
  });

  console.log('Building chart theme module...');
  execSync(
    'webpack src/themes/charts/themes.ts -o dist/eui_charts_theme.ts --output-library-target="commonjs" --config=src/webpack.config.js',
    {
      stdio: 'inherit',
    }
  );
}

compileLib();
compileBundle();
