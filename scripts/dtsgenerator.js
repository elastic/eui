const findup = require('findup');
const resolve = require('resolve');
const fs = require('fs');
const path = require('path');
const dtsGenerator = require('dts-generator').default;

const baseDir = path.resolve(__dirname, '..');
const srcDir = path.resolve(baseDir, 'src');

function hasParentIndex(pathToFile) {
  const isIndexFile =
    path.basename(pathToFile, path.extname(pathToFile)) === 'index';
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
  prefix: '@elastic/eui',
  project: baseDir,
  out: 'eui.d.ts',
  exclude: [
    'node_modules/**/*.d.ts',
    '*/custom_typings/**/*.d.ts',
    '**/*.test.ts',
    '**/*.test.tsx',
    '**/*.testenv.ts',
    '**/*.testenv.tsx',
    'src/themes/charts/*', // A separate d.ts file is generated for the charts theme file
    'src/test/*', // A separate d.ts file is generated for test utils
    'src-docs/**/*', // Don't include src-docs
  ],
  resolveModuleId(params) {
    if (
      path.basename(params.currentModuleId) === 'index' &&
      !hasParentIndex(path.resolve(baseDir, params.currentModuleId))
    ) {
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
    const importFromBaseDir = path.resolve(
      baseDir,
      path.dirname(params.currentModuleId)
    );
    const isFromEuiSrc = importFromBaseDir.startsWith(srcDir);
    const isRelativeImport = isFromEuiSrc && params.importedModuleId[0] === '.';

    if (isRelativeImport) {
      // if importing from an `index` file (directly or targeting a directory with an index),
      // then if there is no parent index file this should import from @elastic/eui
      const importPathTarget = resolve.sync(params.importedModuleId, {
        basedir: importFromBaseDir,
        extensions: ['.ts', '.tsx', '.d.ts'],
      });

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

// NOTE: once EUI is all converted to typescript this madness can be deleted forever
// 1. strip any `/// <reference` lines from the generated eui.d.ts
// 2. replace any import("src/...") declarations to import("@elastic/eui/src/...")
// 3. replace any import("./...") declarations to import("@elastic/eui/src/...)
// 4. generate & add EuiTokenObject
generator.then(() => {
  const defsFilePath = path.resolve(baseDir, 'eui.d.ts');

  fs.writeFileSync(
    defsFilePath,
    fs
      .readFileSync(defsFilePath)
      .toString()
      .replace(/\/\/\/\W+<reference.*/g, '') // 1.
      .replace(/import\("src\/(.*?)"\)/g, 'import("@elastic/eui/src/$1")') // 2.
      .replace(
        // start 3.
        // find any singular `declare module { ... }` block
        // {.*?^} matches anything until a } starts a new line (via `m` regex option, and `s` is dotall)
        //
        // aren't regex really bad for this? Yes.
        // However, @babel/preset-typescript doesn't understand some syntax generated in eui.d.ts
        // and the tooling around typescript's parsing & code generation is lacking and undocumented
        // so... because this works with the guarantee that the newline-brace combination matches a module...
        /declare module '(.*?)' {.*?^}/gms,
        (module, moduleName) => {
          // `moduleName` is the namespace for this ambient module
          return module.replace(
            // replace relative imports by attaching them to the module's namespace
            /import\("([.]{1,2}\/.*?)"\)/g,
            (importStatement, importPath) => {
              let target = path.join(path.dirname(moduleName), importPath);

              // if the target resolves to an orphaned index.ts file, remap to '@elastic/eui'
              const filePath = target.replace('@elastic/eui', baseDir);
              const filePathTs = `${filePath}.ts`;
              const filePathTsx = `${filePath}.tsx`;
              const filePathResolvedToIndex = path.join(filePath, 'index.ts');
              if (
                // fs.existsSync(filePath) === false && // target file doesn't exist
                fs.existsSync(filePathTs) === false && // target file (.ts) doesn't exist
                fs.existsSync(filePathTsx) === false && // target file (.tsx) doesn't exist
                fs.existsSync(filePathResolvedToIndex) && // and it resolves to an index.ts
                hasParentIndex(filePathResolvedToIndex) === false // does not get exported at a higher level
              ) {
                target = '@elastic/eui';
              }

              return `import ("${target}")`;
            }
          );
        }
      ) // end 3.
      .replace(/$/, `\n\n${buildEuiTokensObject()}`) // 4.
  );
});

/** For step 4 **/
// i18ntokens.json is generated as the first step in the build and can be relied upon here
function buildEuiTokensObject() {
  // reduce over the tokens list as a few of the tokens are used multiple times and must be
  // filtered down to a list
  const { i18ndefs } = require('../i18ntokens.json').reduce(
    ({ i18ndefs, tokens }, def) => {
      if (!tokens.has(def.token)) {
        tokens.add(def.token);
        i18ndefs.push(def);
      }
      return { i18ndefs, tokens };
    },
    { i18ndefs: [], tokens: new Set() }
  );
  return `
declare module '@elastic/eui' {
  export type EuiTokensObject = {
    ${i18ndefs.map(({ token }) => `"${token}": any;`).join('\n')}
  }
}
  `;
}
