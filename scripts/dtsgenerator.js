const fs = require('fs');
const path = require('path');
const dtsGenerator = require('dts-generator').default;

const baseDir = path.resolve(__dirname, '..');
const srcDir = path.resolve(baseDir, 'src');

dtsGenerator({
  name: '@elastic/eui',
  project: baseDir,
  out: 'test.d.ts',
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
      // path to the import target, assuming it's a `.d.ts` file
      const importTargetDTs = `${path.resolve(srcDir, path.dirname(params.currentModuleId), params.importedModuleId)}.d.ts`;

      // if the file doing the import is an `index` file
      const isModuleIndex = path.basename(params.currentModuleId) === 'index';

      if (!fs.existsSync(importTargetDTs)) {
        // the import target is a `.d.ts` file which means it is hand-crafted and already added to the right places, don't modify
        return path.join('@elastic/eui', params.importedModuleId);
      } else if (isModuleIndex) {
        // the import is originating in an `index` file, point at the module relative to the @elastic/eui namespace
        return path.join(
          '@elastic/eui',
          path.dirname(params.currentModuleId),
          params.importedModuleId
        );
      } else {
        // the target is hand-crafted typescript source, assume it's been exported to top-level
        return '@elastic/eui';
      }
    } else {
      return params.importedModuleId;
    }
  },
});
