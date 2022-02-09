const { execSync } = require('child_process');
const chalk = require('chalk');
const shell = require('shelljs');
const path = require('path');
const glob = require('glob');
const fs = require('fs');
const dtsGenerator = require('dts-generator').default;

const IGNORE_BUILD = ['**/webpack.config.js','**/*.d.ts'];
const IGNORE_TESTS = ['**/*.test.js','**/*.test.ts','**/*.test.tsx','**/*.spec.tsx','**/*.test_helper.ts','**/*.test_helper.tsx','**/__mocks__/**'];
const IGNORE_TESTENV = ['**/*.testenv.js','**/*.testenv.tsx','**/*.testenv.ts'];
const IGNORE_PACKAGES = ['**/react-datepicker/test/**/*.js']

function compileLib() {
  shell.mkdir('-p', 'lib/services', 'lib/test');

  console.log('Compiling src/ to es/, lib/, optimize/, and test-env/');

  // Run all code (com|trans)pilation through babel (ESNext JS & TypeScript)

  // Default build
  execSync(
    `babel --quiet --out-dir=es --extensions .js,.ts,.tsx --ignore "${[...IGNORE_BUILD, ...IGNORE_TESTS, ...IGNORE_TESTENV, ...IGNORE_PACKAGES].join(',')}" src`,
    {
      env: {
        ...process.env,
        BABEL_MODULES: false,
        NO_COREJS_POLYFILL: true,
      },
    }
  );
  execSync(
    `babel --quiet --out-dir=lib --extensions .js,.ts,.tsx --ignore "${[...IGNORE_BUILD, ...IGNORE_TESTS, ...IGNORE_TESTENV, ...IGNORE_PACKAGES].join(',')}" src`,
    {
      env: {
        ...process.env,
        NO_COREJS_POLYFILL: true,
      },
    }
  );

  // `optimize` build (Beta)
  execSync(
    `babel --quiet --out-dir=optimize/es --extensions .js,.ts,.tsx --config-file="./.babelrc-optimize.js" --ignore "${[...IGNORE_BUILD, ...IGNORE_TESTS, ...IGNORE_TESTENV, ...IGNORE_PACKAGES].join(',')}" src`,
    {
      env: {
        ...process.env,
        BABEL_MODULES: false,
        NO_COREJS_POLYFILL: true,
      },
    }
  );
  execSync(
    `babel --quiet --out-dir=optimize/lib --extensions .js,.ts,.tsx --config-file="./.babelrc-optimize.js" --ignore "${[...IGNORE_BUILD, ...IGNORE_TESTS, ...IGNORE_TESTENV, ...IGNORE_PACKAGES].join(',')}" src`,
    {
      env: {
        ...process.env,
        NO_COREJS_POLYFILL: true,
      },
    }
  );

  // `test-env` build
  execSync(
    `babel --quiet --out-dir=test-env --extensions .js,.ts,.tsx --config-file="./.babelrc-test-env.js" --ignore "${[...IGNORE_BUILD, ...IGNORE_TESTS, ...IGNORE_PACKAGES].join(',')}" src`,
    {
      env: {
        ...process.env,
        NO_COREJS_POLYFILL: true,
      },
    }
  );
  glob('./test-env/**/*.testenv.js', undefined, (error, files) => {
    files.forEach(file => {
      const dir = path.dirname(file);
      const fileName = path.basename(file, '.js');
      const targetName = fileName.replace('.testenv', '');
      fs.renameSync(file, path.join(dir, `${targetName}.js`));
    });
  });

  console.log(chalk.green('✔ Finished compiling src/'));

  // Use `tsc` to emit typescript declaration files for .ts files
  console.log('Generating typescript definitions file');
  execSync(`node ${path.resolve(__dirname, 'dtsgenerator.js')}`, {
    stdio: 'inherit',
  });
  // validate the generated eui.d.ts doesn't contain errors
  execSync('tsc --noEmit -p tsconfig-builttypes.json', { stdio: 'inherit' });
  console.log(chalk.green('✔ Finished generating definitions'));

  // Also copy over SVGs. Babel has a --copy-files option but that brings over
  // all kinds of things we don't want into the lib folder.
  shell.mkdir('-p', 'lib/components/icon/svgs', 'lib/components/icon/svgs/tokens');
  shell.mkdir('-p', 'optimize/lib/components/icon/svgs', 'optimize/lib/components/icon/svgs/tokens');

  glob('./src/components/**/*.svg', undefined, (error, files) => {
    files.forEach(file => {
      const splitPath = file.split('/');
      const basePath = splitPath.slice(2, splitPath.length).join('/');
      shell.cp('-f', `${file}`, `lib/${basePath}`);
      shell.cp('-f', `${file}`, `optimize/lib/${basePath}`);
    });

    console.log(chalk.green('✔ Finished copying SVGs'));
  });
}

function compileBundle() {
  shell.mkdir('-p', 'dist');

  console.log('Building bundle...');
  execSync('webpack --config=src/webpack.config.js', {
    stdio: 'inherit',
    env: {
      ...process.env,
      BABEL_MODULES: false,
    },
  });

  console.log('Building minified bundle...');
  execSync('NODE_ENV=production NODE_OPTIONS=--max-old-space-size=4096 webpack --config=src/webpack.config.js', {
    stdio: 'inherit',
    env: {
      ...process.env,
      BABEL_MODULES: false,
    },
  });

  console.log('Building test utils .d.ts files...');
  ['lib/test', 'optimize/lib/test', 'es/test', 'optimize/es/test'].forEach((dir) => {
    dtsGenerator({
      prefix: '',
      out: `${dir}/index.d.ts`,
      baseDir: path.resolve(__dirname, '..', 'src/test/'),
      files: ['index.ts'],
      resolveModuleId({ currentModuleId }) {
        return `@elastic/eui/${dir}${currentModuleId !== 'index' ? `/${currentModuleId}` : ''}`;
      },
      resolveModuleImport({ currentModuleId, importedModuleId }) {
        if (currentModuleId === 'index') {
          return `@elastic/eui/${dir}/${importedModuleId.replace('./', '')}`;
        }
        return null;
      }
    });
  })
  console.log(chalk.green('✔ Finished test utils files'));

  console.log('Building chart theme module...');
  execSync(
    'webpack src/themes/charts/themes.ts -o dist/eui_charts_theme.js --output-library-target="commonjs" --config=src/webpack.config.js',
    {
      stdio: 'inherit',
    }
  );
  dtsGenerator({
    prefix: '',
    out: 'dist/eui_charts_theme.d.ts',
    baseDir: path.resolve(__dirname, '..', 'src/themes/charts/'),
    files: ['themes.ts'],
    resolveModuleId() {
      return '@elastic/eui/dist/eui_charts_theme';
    },
    resolveModuleImport(params) {
   		if (params.importedModuleId === '../../components/common') {
  			return '@elastic/eui/src/components/common';
  		}
			return null;
	  }
  });
  console.log(chalk.green('✔ Finished chart theme module'));
}

compileLib();
compileBundle();
