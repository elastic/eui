const fs = require('fs');
const path = require('path');
const dtsGenerator = require('dts-generator').default;

const baseDir = path.resolve(__dirname, '..');
const srcDir = path.resolve(baseDir, 'src');

dtsGenerator({
  name: '@elastic/eui',
  project: baseDir,
  out: 'test.d.ts',
  resolveModuleImport(params) {
    console.log(params);
    // if (fs.existsSync(path.resolve()))
    if (params.importedModuleId[0] === '.') {
      const importTargetDTs = `${path.resolve(srcDir, path.dirname(params.currentModuleId), params.importedModuleId)}.d.ts`;
      // const importTargetTsx = `${path.resolve(srcDir, path.dirname(params.currentModuleId), params.importedModuleId)}.d.tsx`;
      if (!fs.existsSync(importTargetDTs)) {
        return path.join('@elastic/eui', params.importedModuleId);
      } else {
        return '@elastic/eui';
      }
    } else {
      return params.importedModuleId;
    }
  },
  resolveModuleId(params) {
    // console.log(params);
    if (path.basename(params.currentModuleId) === 'index') {
      return '@elastic/eui';
    } else {
      return path.join('@elatic/eui', params.currentModuleId);
    }
  }
});
