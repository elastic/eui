const findup = require('findup');
const resolve = require('resolve');
const fs = require('fs');
const path = require('path');
const dtsGenerator = require('dts-generator').default;

const baseDir = path.resolve(__dirname, '..');
const srcDir = path.resolve(baseDir, 'src');

function hasParentIndex(pathToFile) {
  const isIndexFile = path.basename(pathToFile, path.extname(pathToFile)) === 'index';
  try {
    const fileDirectory = path.dirname(pathToFile);
    const parentIndex = findup.sync(
      // if this is an index file start looking in its parent directory
      isIndexFile ? path.resolve(fileDirectory, '..') : fileDirectory,
      'index.ts'
    );
    // ensure the found file is in the project
    return parentIndex.startsWith(baseDir);
  } catch (e) {
    return false;
  }
}

const generator = dtsGenerator({
  name: '@elastic/eui',
  project: baseDir,
  out: 'eui.d.ts',
  exclude: ['node_modules/**/*.d.ts', 'src/custom_typings/**/*.d.ts'],
  resolveModuleId(params) {
    if (path.basename(params.currentModuleId) === 'index' && !hasParentIndex(path.resolve(baseDir, params.currentModuleId))) {
      // this module is exporting from an `index(.d)?.ts` file, declare its exports straight to @elastic/eui module
      return '@elastic/eui';
    } else {
      // otherwise export as the module's path relative to the @elastic/eui namespace
      if (params.currentModuleId.endsWith('/index')) {
        return path.join('@elastic/eui', path.dirname(params.currentModuleId));
      } else {
        return path.join('@elastic/eui', params.currentModuleId);
      }
    }
  },
  resolveModuleImport(params) {
    // only intercept relative imports (don't modify node-modules references)
    const importFromBaseDir = path.resolve(baseDir, path.dirname(params.currentModuleId));
    const isFromEuiSrc = importFromBaseDir.startsWith(srcDir);
    const isRelativeImport = isFromEuiSrc && params.importedModuleId[0] === '.';

    if (isRelativeImport) {
      // if importing from an `index` file (directly or targeting a directory with an index),
      // then if there is no parent index file this should import from @elastic/eui
      const importPathTarget = resolve.sync(
        params.importedModuleId,
        {
          basedir: importFromBaseDir,
          extensions: ['.ts', '.tsx'],
        }
      );

      const isIndexFile = importPathTarget.endsWith('/index.ts');
      const isModuleIndex = isIndexFile && !hasParentIndex(importPathTarget);

      if (isModuleIndex) {
        // importing an `index` file, in `resolveModuleId` above we change those modules to '@elastic/eui'
        return '@elastic/eui';
      } else {
        // importing from a non-index TS source file, keep the import path but re-scope it to '@elastic/eui' namespace
        return path.join(
          '@elastic/eui',
          path.dirname(params.currentModuleId),
          params.importedModuleId
        );
      }
    } else {
      return params.importedModuleId;
    }
  },
});

// 1. strip any `/// <reference` lines from the generated eui.d.ts
// 2. replace any import("src/...") declarations to import("@elastic/src/...")
generator.then(() => {
  const defsFilePath = path.resolve(baseDir, 'eui.d.ts');
  fs.writeFileSync(
    defsFilePath,
    fs.readFileSync(defsFilePath).toString()
      .replace(/\/\/\/\W+<reference.*/g, '') // 1.
      .replace(/import\(\"src\/(.*?)\"\)/g, 'import("@elastic/eui/src/$1")') // 2.
  );
});
