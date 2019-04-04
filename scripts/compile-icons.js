const glob = require('glob');
const svgr = require('@svgr/core').default;
const path = require('path');
const fs = require('fs');

const rootDir = path.resolve(__dirname, '..');
const srcDir = path.resolve(rootDir, 'src');
const iconsDir = path.resolve(srcDir, 'components', 'icon', 'assets');

function pascalCase(x) {
  return x.replace(/^(.)|[^a-zA-Z]([a-zA-Z])/g, (match, char1, char2) => (char1 || char2).toUpperCase());
}

const iconFiles = glob.sync(
  '**/*.svg',
  { cwd: iconsDir, realpath: true }
);

iconFiles.forEach(async filePath => {
  const svgSource = fs.readFileSync(filePath);

  try {
    const jsxSource = (await svgr(
      svgSource,
      {
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
        svgoConfig: {
          plugins: [
            { cleanupIDs: false },
            { prefixIds: false },
            { removeViewBox: false },
          ],
        }
      },
      {
        componentName: `EuiIcon${pascalCase(path.basename(filePath, '.svg'))}`
      }
    )).replace('props =>', '(props: any) =>');

    const outputFilePath = filePath.replace(/\.svg$/, '.tsx');
    fs.writeFileSync(outputFilePath, jsxSource);
  } catch (e) {
    console.error(`Error processing ${filePath}`);
    console.error(e);
    process.exit(1);
  }
});
