const os = require('os');
const path = require('path');
const fs = require('fs/promises');

const {
  getOutputPath,
  processChanges,
  syncChanges,
  syncFullBuild,
} = require('../kibana_watch');

const euiRoot = path.resolve(__dirname, '../../../..');

describe('Kibana watch', () => {
  let root;
  let packagePath;
  let kibanaRoot;
  let destinationPackage;

  beforeEach(async () => {
    root = await fs.mkdtemp(path.join(os.tmpdir(), 'eui-kibana-watch-'));
    packagePath = path.join(root, 'eui');
    kibanaRoot = path.join(root, 'kibana');
    destinationPackage = path.join(
      kibanaRoot,
      'node_modules',
      '@elastic',
      'eui'
    );

    await fs.mkdir(path.join(packagePath, 'src'), { recursive: true });
    await fs.mkdir(destinationPackage, { recursive: true });
    await fs.writeFile(
      path.join(packagePath, '.babelrc-optimize.js'),
      'module.exports = {};'
    );
    await fs.writeFile(
      path.join(destinationPackage, 'package.json'),
      JSON.stringify({ name: '@elastic/eui' })
    );
  });

  afterEach(async () => {
    await fs.rm(root, { recursive: true, force: true });
  });

  it('maps supported source files into optimize/es', () => {
    expect(
      getOutputPath(
        packagePath,
        path.join(packagePath, 'src/components/button.tsx')
      )
    ).toBe(path.join(packagePath, 'optimize/es/components/button.js'));
    expect(
      getOutputPath(
        packagePath,
        path.join(packagePath, 'src/translations.json')
      )
    ).toBe(path.join(packagePath, 'optimize/es/translations.json'));
    expect(
      getOutputPath(packagePath, path.join(packagePath, 'README.md'))
    ).toBeNull();
  });

  it('compiles code, copies assets, and removes deleted outputs', async () => {
    const codePath = path.join(packagePath, 'src/component.js');
    const assetPath = path.join(packagePath, 'src/data.json');
    const deletedPath = path.join(packagePath, 'src/deleted.ts');
    const deletedOutput = path.join(packagePath, 'optimize/es/deleted.js');

    await fs.writeFile(codePath, 'export const component = true;');
    await fs.writeFile(assetPath, '{"value":true}');
    await fs.mkdir(path.dirname(deletedOutput), { recursive: true });
    await fs.writeFile(deletedOutput, 'stale');

    const result = await processChanges(packagePath, euiRoot, [
      ['change', codePath],
      ['change', assetPath],
      ['unlink', deletedPath],
    ]);

    expect(result.failed).toEqual([]);
    expect(
      await fs.readFile(
        path.join(packagePath, 'optimize/es/component.js'),
        'utf8'
      )
    ).toContain('export const component = true');
    expect(
      await fs.readFile(path.join(packagePath, 'optimize/es/data.json'), 'utf8')
    ).toBe('{"value":true}');
    await expect(fs.access(deletedOutput)).rejects.toThrow();
  });

  it('syncs only changed outputs and deletes removed outputs', async () => {
    const outputPath = path.join(packagePath, 'optimize/es/component.js');
    const removedPath = path.join(packagePath, 'optimize/es/removed.js');
    const destinationRemoved = path.join(
      destinationPackage,
      'optimize/es/removed.js'
    );

    await fs.mkdir(path.dirname(outputPath), { recursive: true });
    await fs.mkdir(path.dirname(destinationRemoved), { recursive: true });
    await fs.writeFile(outputPath, 'new output');
    await fs.writeFile(destinationRemoved, 'stale output');

    await syncChanges(kibanaRoot, '@elastic/eui', packagePath, [
      { event: 'change', outputPath },
      { event: 'unlink', outputPath: removedPath },
    ]);

    expect(
      await fs.readFile(
        path.join(destinationPackage, 'optimize/es/component.js'),
        'utf8'
      )
    ).toBe('new output');
    await expect(fs.access(destinationRemoved)).rejects.toThrow();
  });

  it('replaces only the destination optimize/es tree on a full sync', async () => {
    const sourceOutput = path.join(packagePath, 'optimize/es/component.js');
    const staleEsOutput = path.join(destinationPackage, 'optimize/es/stale.js');
    const libOutput = path.join(
      destinationPackage,
      'optimize/lib/component.js'
    );

    await fs.mkdir(path.dirname(sourceOutput), { recursive: true });
    await fs.mkdir(path.dirname(staleEsOutput), { recursive: true });
    await fs.mkdir(path.dirname(libOutput), { recursive: true });
    await fs.writeFile(sourceOutput, 'new output');
    await fs.writeFile(staleEsOutput, 'stale output');
    await fs.writeFile(libOutput, 'keep lib');

    await syncFullBuild(kibanaRoot, '@elastic/eui', packagePath);

    expect(
      await fs.readFile(
        path.join(destinationPackage, 'optimize/es/component.js'),
        'utf8'
      )
    ).toBe('new output');
    await expect(fs.access(staleEsOutput)).rejects.toThrow();
    expect(await fs.readFile(libOutput, 'utf8')).toBe('keep lib');
  });
});
