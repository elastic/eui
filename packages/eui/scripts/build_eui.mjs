import * as esbuild from 'esbuild';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import { glob } from 'glob';
import fs from 'fs/promises';
import chalk from 'chalk';
import chokidar from 'chokidar';

// --- Setup & Configuration ---

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRootDir = path.resolve(__dirname, '..');
const srcDir = path.join(packageRootDir, 'src');

const IGNORE_PATTERNS = {
  build: ['**/webpack.config.js', '**/*.d.ts'],
  tests: [
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
  ],
  testenv: ['**/*.testenv.js', '**/*.testenv.tsx', '**/*.testenv.ts'],
  packages: ['**/react-datepicker/test/**/*.js'],
};

const BUILD_TARGETS = [
  {
    name: 'es',
    entryPointGlobs: ['src/**/*.{ts,tsx,js}'],
    ignore: [
      ...IGNORE_PATTERNS.build,
      ...IGNORE_PATTERNS.tests,
      ...IGNORE_PATTERNS.testenv,
      ...IGNORE_PATTERNS.packages,
    ],
    esbuildOptions: {
      platform: 'browser',
      format: 'esm',
    },
  },
  {
    name: 'lib',
    entryPointGlobs: ['src/**/*.{ts,tsx,js}'],
    ignore: [
      ...IGNORE_PATTERNS.build,
      ...IGNORE_PATTERNS.tests,
      ...IGNORE_PATTERNS.testenv,
      ...IGNORE_PATTERNS.packages,
    ],
    esbuildOptions: {
      platform: 'node',
      format: 'cjs',
    },
  },
  {
    name: 'test-env',
    entryPointGlobs: ['src/**/*.testenv.{ts,tsx,js}'],
    ignore: [
      ...IGNORE_PATTERNS.build,
      ...IGNORE_PATTERNS.tests,
      ...IGNORE_PATTERNS.packages,
    ],
    esbuildOptions: {
      platform: 'node',
      format: 'cjs',
    },
    async postBuild() {
      const builtFiles = await glob('test-env/**/*.testenv.js', {
        cwd: packageRootDir,
      });
      for (const file of builtFiles) {
        const newPath = path.join(packageRootDir, file.replace('.testenv', ''));
        await fs.rename(path.join(packageRootDir, file), newPath);
      }
    },
  },
];

// --- Core Build Logic ---

const euiBuildPlugin = ({ targetName, onBuildEnd, postBuild }) => ({
  name: `eui-build-${targetName}`,
  setup(build) {
    let isInitial = true;
    build.onEnd(async (result) => {
      if (result.errors.length > 0) {
        console.error(
          chalk.red(`Build failed for ${targetName}:`),
          result.errors
        );
        return;
      }

      if (postBuild) await postBuild();

      console.log(
        chalk.green(
          `✔ ${isInitial ? 'Build' : 'Rebuild'} for ${targetName} successful.`
        )
      );

      if (onBuildEnd) onBuildEnd(isInitial);
      isInitial = false;
    });
  },
});

async function runBuilds({ isWatchMode = false, onInitialBuildComplete } = {}) {
  const contexts = [];
  let initialBuildsCompleted = 0;

  for (const target of BUILD_TARGETS) {
    const entryPoints = await glob(target.entryPointGlobs, {
      cwd: packageRootDir,
      ignore: target.ignore,
      absolute: true,
    });

    const options = {
      entryPoints,
      outdir: path.join(packageRootDir, target.name),
      bundle: false,
      target: 'es2015',
      sourcemap: true,
      loader: { '.js': 'jsx' },
      ...target.esbuildOptions,
      plugins: [
        euiBuildPlugin({
          targetName: target.name,
          postBuild: target.postBuild,
          onBuildEnd: (isInitial) => {
            if (isInitial && onInitialBuildComplete) {
              initialBuildsCompleted++;
              if (initialBuildsCompleted === BUILD_TARGETS.length) {
                onInitialBuildComplete();
              }
            }
          },
        }),
      ],
    };

    if (isWatchMode) {
      const context = await esbuild.context(options);
      await context.watch();
      contexts.push(context);
    } else {
      await esbuild.build(options);
    }
  }
  return contexts;
}

// --- Asset & Utility Functions ---

async function clean() {
  console.log(chalk.blue('Cleaning output directories...'));
  const dirs = BUILD_TARGETS.map((t) => path.join(packageRootDir, t.name));
  await Promise.all(
    dirs.map((dir) => fs.rm(dir, { recursive: true, force: true }))
  );
  console.log(chalk.green('✔ Finished cleaning.'));
}

async function copyAssets(globPattern, destDirs) {
  console.log(chalk.blue(`Copying ${path.extname(globPattern)} assets...`));
  const files = await glob(globPattern, { cwd: srcDir });
  for (const file of files) {
    for (const destDir of destDirs) {
      const srcPath = path.join(srcDir, file);
      const destPath = path.join(destDir, file);
      await fs.mkdir(path.dirname(destPath), { recursive: true });
      await fs.copyFile(srcPath, destPath);
    }
  }
  console.log(
    chalk.green(`✔ Finished copying ${path.extname(globPattern)} assets.`)
  );
}

async function syncSingleAsset(event, relativePath, destDirs) {
  const ext = path.extname(relativePath);
  console.log(
    chalk.blue(`${ext} file ${event} at ${relativePath}. Syncing...`)
  );
  const srcPath = path.join(packageRootDir, relativePath);

  for (const destDir of destDirs) {
    const destPath = path.join(destDir, path.relative('src', srcPath));
    if (event === 'unlink') {
      try {
        await fs.unlink(destPath);
      } catch (e) {
        // Ignore if file doesn't exist
      }
    } else {
      await fs.mkdir(path.dirname(destPath), { recursive: true });
      await fs.copyFile(srcPath, destPath);
    }
  }
}

async function generateDeclarations() {
  console.log(chalk.blue('Generating TypeScript declarations...'));
  try {
    execSync(`node ${path.resolve(__dirname, 'dtsgenerator.js')}`, {
      cwd: packageRootDir,
      stdio: 'inherit',
    });
    console.log(chalk.green('✔ Finished generating declarations.'));
  } catch (e) {
    console.error(chalk.red('Failed to generate TypeScript declarations.'));
    throw e;
  }
}

// --- Main Execution ---

async function watch() {
  const contexts = await runBuilds({
    isWatchMode: true,
    onInitialBuildComplete: async () => {
      const jsonDest = ['es', 'lib', 'test-env'].map((name) =>
        path.join(packageRootDir, name)
      );
      const svgDest = [path.join(packageRootDir, 'lib')];

      await copyAssets('**/*.json', jsonDest);
      await copyAssets('components/**/*.svg', svgDest);

      console.log(chalk.blue.bold('\nWatching for changes...'));

      chokidar
        .watch('src/**/*.json', { cwd: packageRootDir, ignoreInitial: true })
        .on('all', (event, filePath) =>
          syncSingleAsset(event, filePath, jsonDest)
        );

      chokidar
        .watch('src/components/**/*.svg', {
          cwd: packageRootDir,
          ignoreInitial: true,
        })
        .on('all', (event, filePath) =>
          syncSingleAsset(event, filePath, svgDest)
        );

      chokidar
        .watch(
          [
            '../eui-theme-common/src/**/*.{ts,tsx,js,json}',
            '../eui-theme-borealis/src/**/*.{ts,tsx,js,json}',
          ],
          { cwd: packageRootDir, ignoreInitial: true }
        )
        .on('all', (event, filePath) => {
          console.log(chalk.blue(`Dependency file ${event} at ${filePath}.`));
          contexts.forEach((context) => context.rebuild());
        });
    },
  });
}

async function main() {
  try {
    const shouldWatch = process.argv.includes('--watch');
    const shouldGenerateDeclarations = process.argv.includes('--declarations');

    await clean();

    if (shouldWatch) {
      watch();
    } else {
      await runBuilds();

      await copyAssets(
        '**/*.json',
        ['es', 'lib', 'test-env'].map((name) => path.join(packageRootDir, name))
      );
      await copyAssets('components/**/*.svg', [
        path.join(packageRootDir, 'lib'),
      ]);

      if (shouldGenerateDeclarations) {
        await generateDeclarations();
      } else {
        console.log(
          chalk.yellow(
            'Skipping TypeScript declaration generation. Use --declarations flag to enable.'
          )
        );
      }

      console.log(chalk.green.bold('Build complete!'));
    }
  } catch (e) {
    console.error(chalk.red.bold('Build failed:'));
    console.error(chalk.red(e));
    process.exit(1);
  }
}

main();
