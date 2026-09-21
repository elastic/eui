const path = require('path');
const fs = require('fs/promises');

const BABEL_EXTENSIONS = new Set(['.js', '.jsx', '.ts', '.tsx']);
const COPY_EXTENSIONS = new Set(['.json', '.svg']);
const FULL_BUILD_THRESHOLD = 50;

let babel;

function getOutputPath(packagePath, sourcePath) {
  const sourceDir = path.join(packagePath, 'src');
  const relativePath = path.relative(sourceDir, sourcePath);

  if (
    relativePath === '' ||
    relativePath.startsWith('..') ||
    path.isAbsolute(relativePath)
  ) {
    return null;
  }

  const extension = path.extname(relativePath);
  if (COPY_EXTENSIONS.has(extension)) {
    return path.join(packagePath, 'optimize', 'es', relativePath);
  }

  if (!BABEL_EXTENSIONS.has(extension)) {
    return null;
  }

  return path.join(
    packagePath,
    'optimize',
    'es',
    relativePath.replace(/\.(jsx|ts|tsx)$/, '.js')
  );
}

function loadBabel(packagePath, euiRoot) {
  if (!babel) {
    process.env.BABEL_MODULES = 'false';
    process.env.NO_COREJS_POLYFILL = 'true';
    babel = require(require.resolve('@babel/core', {
      paths: [packagePath, euiRoot],
    }));
  }

  return babel;
}

async function compileSourceFile(packagePath, euiRoot, sourcePath) {
  const outputPath = getOutputPath(packagePath, sourcePath);
  if (!outputPath) return null;

  await fs.mkdir(path.dirname(outputPath), { recursive: true });

  if (COPY_EXTENSIONS.has(path.extname(sourcePath))) {
    await fs.copyFile(sourcePath, outputPath);
    return outputPath;
  }

  const result = await loadBabel(packagePath, euiRoot).transformFileAsync(
    sourcePath,
    {
      configFile: path.join(packagePath, '.babelrc-optimize.js'),
      cwd: packagePath,
      sourceMaps: false,
    }
  );

  if (result?.code == null) {
    throw new Error(`Babel produced no output for ${sourcePath}`);
  }

  await fs.writeFile(outputPath, result.code);
  return outputPath;
}

async function removeSourceOutput(packagePath, sourcePath) {
  const outputPath = getOutputPath(packagePath, sourcePath);
  if (!outputPath) return null;

  await fs.rm(outputPath, { force: true });
  return outputPath;
}

async function processChanges(packagePath, euiRoot, changes) {
  const results = await Promise.allSettled(
    changes.map(async ([event, sourcePath]) => {
      const outputPath =
        event === 'unlink'
          ? await removeSourceOutput(packagePath, sourcePath)
          : await compileSourceFile(packagePath, euiRoot, sourcePath);

      return { event, outputPath, sourcePath };
    })
  );

  return {
    completed: results
      .filter((result) => result.status === 'fulfilled')
      .map((result) => result.value)
      .filter(({ outputPath }) => outputPath),
    failed: results
      .filter((result) => result.status === 'rejected')
      .map((result) => result.reason),
  };
}

async function syncChanges(kibanaRoot, packageName, packagePath, changes) {
  if (changes.length === 0) return;

  const destinationPackage = path.join(kibanaRoot, 'node_modules', packageName);

  for (const { event, outputPath } of changes) {
    const destinationPath = path.join(
      destinationPackage,
      path.relative(packagePath, outputPath)
    );

    if (event === 'unlink') {
      await fs.rm(destinationPath, { force: true });
      continue;
    }

    await fs.mkdir(path.dirname(destinationPath), { recursive: true });
    await fs.copyFile(outputPath, destinationPath);
  }

  await fs.utimes(
    path.join(destinationPackage, 'package.json'),
    new Date(),
    new Date()
  );
}

async function listFiles(rootPath, relativePath = '', files = new Set()) {
  const entries = await fs.readdir(path.join(rootPath, relativePath), {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const entryPath = path.join(relativePath, entry.name);
    if (entry.isDirectory()) {
      await listFiles(rootPath, entryPath, files);
    } else {
      files.add(entryPath);
    }
  }

  return files;
}

async function syncFullBuild(kibanaRoot, packageName, packagePath) {
  const sourcePath = path.join(packagePath, 'optimize', 'es');
  const destinationPackage = path.join(kibanaRoot, 'node_modules', packageName);
  const destinationPath = path.join(destinationPackage, 'optimize', 'es');

  await fs.access(sourcePath);
  await fs.access(destinationPackage);
  await fs.mkdir(destinationPath, { recursive: true });
  await fs.cp(sourcePath, destinationPath, {
    recursive: true,
    force: true,
    dereference: true,
  });

  const sourceFiles = await listFiles(sourcePath);
  const destinationFiles = await listFiles(destinationPath);
  await Promise.all(
    [...destinationFiles]
      .filter((relativePath) => !sourceFiles.has(relativePath))
      .map((relativePath) =>
        fs.rm(path.join(destinationPath, relativePath), { force: true })
      )
  );

  await fs.utimes(
    path.join(destinationPackage, 'package.json'),
    new Date(),
    new Date()
  );
}

module.exports = {
  FULL_BUILD_THRESHOLD,
  compileSourceFile,
  getOutputPath,
  processChanges,
  removeSourceOutput,
  syncChanges,
  syncFullBuild,
};
