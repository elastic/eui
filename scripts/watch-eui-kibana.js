const path = require('path');
const fs = require('fs/promises');

const COPY_EXTS = new Set(['.json', '.svg', '.scss']);
const BABEL_EXTS = new Set(['.js', '.jsx', '.ts', '.tsx']);
const FULL_REBUILD_THRESHOLD = 50;

let babel;

function loadBabel(pkgPath, euiRoot) {
  if (!babel) {
    process.env.BABEL_MODULES = 'false';
    process.env.NO_COREJS_POLYFILL = 'true';
    babel = require(require.resolve('@babel/core', { paths: [pkgPath, euiRoot] }));
  }
  return babel;
}

function toOptimizeEsOutput(pkgPath, srcFile) {
  const rel = path.relative(path.join(pkgPath, 'src'), srcFile);
  if (rel.startsWith('..')) return null;

  const ext = path.extname(rel);
  if (COPY_EXTS.has(ext)) {
    return path.join(pkgPath, 'optimize/es', rel);
  }
  if (BABEL_EXTS.has(ext)) {
    return path.join(
      pkgPath,
      'optimize/es',
      rel.replace(/\.(tsx|ts|jsx)$/, '.js')
    );
  }
  return null;
}

async function compileFile(pkgPath, euiRoot, srcFile) {
  const outFile = toOptimizeEsOutput(pkgPath, srcFile);
  if (!outFile) return null;

  await fs.mkdir(path.dirname(outFile), { recursive: true });

  if (COPY_EXTS.has(path.extname(srcFile))) {
    await fs.copyFile(srcFile, outFile);
    return outFile;
  }

  const result = await loadBabel(pkgPath, euiRoot).transformFileAsync(srcFile, {
    configFile: path.join(pkgPath, '.babelrc-optimize.js'),
    sourceMaps: false,
  });

  if (!result || result.code == null) {
    throw new Error(`Babel produced no output for ${srcFile}`);
  }

  await fs.writeFile(outFile, result.code);
  return outFile;
}

async function unlinkOutput(pkgPath, srcFile) {
  const outFile = toOptimizeEsOutput(pkgPath, srcFile);
  if (!outFile) return null;
  await fs.rm(outFile, { force: true });
  return outFile;
}

async function syncOutputs(kibanaRoot, pkgName, pkgPath, outputFiles) {
  const destDir = path.join(kibanaRoot, 'node_modules', pkgName);
  await fs.access(destDir);

  const unique = [...new Set(outputFiles.filter(Boolean))];
  for (const abs of unique) {
    const dest = path.join(destDir, path.relative(pkgPath, abs));
    await fs.mkdir(path.dirname(dest), { recursive: true });
    await fs.copyFile(abs, dest);
  }

  await fs.utimes(path.join(destDir, 'package.json'), new Date(), new Date());
}

async function unlinkDests(kibanaRoot, pkgName, pkgPath, outputFiles) {
  const destDir = path.join(kibanaRoot, 'node_modules', pkgName);
  for (const abs of outputFiles.filter(Boolean)) {
    await fs.rm(path.join(destDir, path.relative(pkgPath, abs)), {
      force: true,
    });
  }
}

async function syncOptimizeEsTree(kibanaRoot, pkgName, pkgPath) {
  const destDir = path.join(kibanaRoot, 'node_modules', pkgName);
  await fs.access(path.join(kibanaRoot, 'node_modules'));
  await fs.cp(path.join(pkgPath, 'optimize'), path.join(destDir, 'optimize'), {
    recursive: true,
    force: true,
    dereference: true,
  });
  await syncMissingPackageDeps(pkgPath, destDir, kibanaRoot);
  await fs
    .utimes(path.join(destDir, 'package.json'), new Date(), new Date())
    .catch(() => {});
}

async function syncMissingPackageDeps(pkgPath, destDir, kibanaRoot) {
  const pkgJson = JSON.parse(
    await fs.readFile(path.join(pkgPath, 'package.json'), 'utf8')
  );
  const nested = path.join(destDir, 'node_modules');

  for (const dep of Object.keys(pkgJson.dependencies || {})) {
    try {
      await fs.access(path.join(kibanaRoot, 'node_modules', dep));
      continue;
    } catch {
      // not hoisted into Kibana — copy from the EUI package
    }

    const src = path.join(pkgPath, 'node_modules', dep);
    try {
      await fs.access(src);
    } catch {
      continue;
    }

    await fs.mkdir(nested, { recursive: true });
    await fs.cp(src, path.join(nested, dep), {
      recursive: true,
      force: true,
      dereference: true,
    });
  }
}

module.exports = {
  FULL_REBUILD_THRESHOLD,
  compileFile,
  unlinkOutput,
  syncOutputs,
  unlinkDests,
  syncOptimizeEsTree,
};
