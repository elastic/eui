const fs = require('fs');
const path = require('path');
const dtsGenerator = require('dts-generator').default;

const baseDir = path.resolve(__dirname, '..');

const generator = dtsGenerator({
  name: '@elastic/eui',
  project: baseDir,
  out: 'eui.d.ts',
  exclude: ['node_modules/**/*.d.ts', 'src/custom_typings/**/*.d.ts'],
  resolveModuleId(params) {
    if (path.basename(params.currentModuleId) === 'index') {
      // this module is exporting from an `index(.d)?.ts` file, declare its exports straight to @elastic/eui module
      return '@elastic/eui';
    } else {
      // otherwise export as the module's path relative to the @elastic/eui namespace
      return path.join('@elastic/eui', params.currentModuleId);
    }
  },
  resolveModuleImport(params) {
    // only intercept relative imports (don't modify node-modules references)
    const isRelativeImport = params.importedModuleId[0] === '.';

    if (isRelativeImport) {
      // if importing an `index` file
      let isModuleIndex = false;
      if (path.basename(params.importedModuleId) === 'index') {
        isModuleIndex = true;
      } else {
        const basePath = path.resolve(baseDir, path.dirname(params.currentModuleId));
        // check if the imported module resolves to ${importedModuleId}/index.ts
        if (!fs.existsSync(path.resolve(basePath, `${params.importedModuleId}.ts`))) {
          // not pointing at ${importedModuleId}.ts, check if it's a directory with `index.ts`
          if (fs.existsSync(path.resolve(basePath, `${params.importedModuleId}/index.ts`))) {
            isModuleIndex = true;
          }
        }
      }

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

// strip any `/// <reference` lines from the generated eui.d.ts
generator.then(() => {
  const defsFilePath = path.resolve(baseDir, 'eui.d.ts');
  fs.writeFileSync(
    defsFilePath,
    fs.readFileSync(defsFilePath).toString().replace(/\/\/\/\W+<reference.*/g, '')
  );
});
