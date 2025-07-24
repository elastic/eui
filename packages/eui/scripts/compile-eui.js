const { execSync } = require('child_process');
const chalk = require('chalk');
const shell = require('shelljs');
const path = require('path');
const glob = require('glob');
const fs = require('fs/promises');
const dtsGenerator = require('dts-generator').default;

const packageRootDir = path.resolve(__dirname, '..');
const srcDir = path.join(packageRootDir, 'src');

const IGNORE_BUILD = ['**/webpack.config.js', '**/*.d.ts'];
const IGNORE_TESTS = [
  '**/*.test.js',
  '**/*.test.ts',
  '**/*.test.tsx',
  '**/*.spec.tsx',
  '**/*.stories.ts',
  '**/*.stories.tsx',
  '**/*.docgen.tsx',
  '**/**.stories.utils.ts',
  '**/**.stories.utils.tsx',
  '**/*.mdx',
  '**/test/internal/**/*.ts',
  '**/test/internal/**/*.tsx',
  '**/__mocks__/**',
];
const IGNORE_TESTENV = [
  '**/*.testenv.js',
  '**/*.testenv.tsx',
  '**/*.testenv.ts',
];
const IGNORE_PACKAGES = ['**/react-datepicker/test/**/*.js'];

async function renameTestEnvFiles() {
  const files = glob.globIterate('test-env/**/*.testenv.js', {
    cwd: packageRootDir,
    realpath: true,
  });

  let count = 0;
  for await (const filePath of files) {
    const fullPath = path.join(packageRootDir, filePath);

    const dir = path.dirname(fullPath);
    const fileName = path.basename(fullPath, '.js');
    const targetName = fileName.replace('.testenv', '');

    await fs.rename(fullPath, path.join(dir, `${targetName}.js`));
    count++;
  }

  console.log(`Successfully renamed ${count} testenv files`);
}

async function copyFilesToDestinationDirs(files, destinationDirs) {
  let count = 0;
  for await (const filePath of files) {
    const fullPath = path.join(srcDir, filePath);

    for (const destinationDir of destinationDirs) {
      const destPath = path.join(destinationDir, filePath);
      const destDir = path.dirname(destPath);

      // Attempt to create a directory if it doesn't exist yet
      await fs.mkdir(destDir, { recursive: true });

      await fs.copyFile(fullPath, destPath);
    }
    count++;
  }

  return count;
}

async function copyJsonFiles() {
  const files = glob.globIterate('**/*.json', {
    cwd: srcDir,
    realpath: true,
  });

  const destinationDirs = [
    'es',
    'optimize/es',
    'optimize/lib',
    'lib',
    'test-env',
  ].map((dir) => path.join(packageRootDir, dir));

  const count = await copyFilesToDestinationDirs(files, destinationDirs);

  console.log(`Successfully copied ${count} JSON files from src/ to es/, optimize/es, optimize/lib, lib/ and test-env/`);
}

async function copySvgFiles() {
  const files = glob.globIterate('components/**/*.svg', {
    cwd: srcDir,
    realpath: true,
  });

  const destinationDirs = [
    'optimize/lib',
    'lib',
  ].map((dir) => path.join(packageRootDir, dir));

  const count = await copyFilesToDestinationDirs(files, destinationDirs);

  console.log(`Successfully copied ${count} SVG files from src/ to lib/ and optimize/lib/`);
}

async function compileLib() {
  shell.mkdir('-p', 'lib/services', 'lib/test');

  console.log('Compiling src/ to es/, lib/, optimize/, and test-env/');

  // Run all code (com|trans)pilation through babel (ESNext JS & TypeScript)

  // Default build
  execSync(
    `babel --quiet --out-dir=es --extensions .js,.ts,.tsx --ignore "${[
      ...IGNORE_BUILD,
      ...IGNORE_TESTS,
      ...IGNORE_TESTENV,
      ...IGNORE_PACKAGES,
    ].join(',')}" src`,
    {
      env: {
        ...process.env,
        BABEL_MODULES: false,
        NO_COREJS_POLYFILL: true,
      },
    }
  );
  execSync(
    `babel --quiet --out-dir=lib --extensions .js,.ts,.tsx --ignore "${[
      ...IGNORE_BUILD,
      ...IGNORE_TESTS,
      ...IGNORE_TESTENV,
      ...IGNORE_PACKAGES,
    ].join(',')}" src`,
    {
      env: {
        ...process.env,
        NO_COREJS_POLYFILL: true,
      },
    }
  );

  // `optimize` build (Beta)
  execSync(
    `babel --quiet --out-dir=optimize/es --extensions .js,.ts,.tsx --config-file="./.babelrc-optimize.js" --ignore "${[
      ...IGNORE_BUILD,
      ...IGNORE_TESTS,
      ...IGNORE_TESTENV,
      ...IGNORE_PACKAGES,
    ].join(',')}" src`,
    {
      env: {
        ...process.env,
        BABEL_MODULES: false,
        NO_COREJS_POLYFILL: true,
      },
    }
  );
  execSync(
    `babel --quiet --out-dir=optimize/lib --extensions .js,.ts,.tsx --config-file="./.babelrc-optimize.js" --ignore "${[
      ...IGNORE_BUILD,
      ...IGNORE_TESTS,
      ...IGNORE_TESTENV,
      ...IGNORE_PACKAGES,
    ].join(',')}" src`,
    {
      env: {
        ...process.env,
        NO_COREJS_POLYFILL: true,
      },
    }
  );

  // `test-env` build
  execSync(
    `babel --quiet --out-dir=test-env --extensions .js,.ts,.tsx --config-file="./.babelrc-test-env.js" --ignore "${[
      ...IGNORE_BUILD,
      ...IGNORE_TESTS,
      ...IGNORE_PACKAGES,
    ].join(',')}" src`,
    {
      env: {
        ...process.env,
        NO_COREJS_POLYFILL: true,
      },
    }
  );

  await renameTestEnvFiles();
  await copyJsonFiles();

  console.log(chalk.green('✔ Finished compiling src/'));

  // Use `tsc` to emit typescript declaration files for .ts files
  console.log('Generating typescript definitions file');
  execSync(`node ${path.resolve(__dirname, 'dtsgenerator.js')}`, {
    stdio: 'inherit',
  });
  // validate the generated eui.d.ts doesn't contain errors
  execSync('tsc --noEmit -p tsconfig-builttypes.json', { stdio: 'inherit' });
  console.log(chalk.green('✔ Finished generating definitions'));

  await copySvgFiles();
}

async function compileBundle() {
  const distDir = path.join(packageRootDir, 'dist');

  await fs.mkdir(distDir);

  console.log('Building test utils .d.ts files...');

  const destinationDirs = [
    'lib/test',
    'es/test',
    'optimize/lib/test',
    'optimize/es/test',
  ].map((dir) => path.join(packageRootDir, dir));

  const testRtlDTSFiles = new glob.Glob('test/rtl/**/*.d.ts', {
    cwd: srcDir,
    realpath: true,
  });

  for (const dir of destinationDirs) {
    const relativeDir = path.relative(packageRootDir, dir);

    dtsGenerator({
      prefix: '',
      out: `${dir}/index.d.ts`,
      baseDir: path.resolve(__dirname, '..', 'src/test/'),
      files: ['index.ts'],
      resolveModuleId({ currentModuleId }) {
        return `@elastic/eui/${relativeDir}${
          currentModuleId !== 'index' ? `/${currentModuleId}` : ''
        }`;
      },
      resolveModuleImport({ currentModuleId, importedModuleId }) {
        if (currentModuleId === 'index') {
          return `@elastic/eui/${relativeDir}/${importedModuleId.replace('./', '')}`;
        }
        return null;
      },
    });

    await fs.mkdir(path.join(dir, 'rtl'), { recursive: true });

    for await (const filePath of testRtlDTSFiles) {
      const fullPath = path.join(srcDir, filePath);
      const baseName = path.basename(filePath);
      await fs.copyFile(fullPath, path.join(dir, 'rtl', baseName));
    }
  }

  console.log(chalk.green('✔ Finished test utils files'));
}

async function compile() {
  await compileLib();
  await compileBundle();
}

compile();
