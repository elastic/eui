const glob = require('glob');
const svgr = require('@svgr/core').transform;
const path = require('path');
const fs = require('fs');
const license =
  require('../.eslintrc.js').rules['local/require-license-header'][1].license;

const rootDir = path.resolve(__dirname, '..');
const srcDir = path.resolve(rootDir, 'src');
const iconsDir = path.resolve(srcDir, 'components', 'icon', 'svgs');
const outputDir = path.resolve(srcDir, 'components', 'icon', 'assets');

function pascalCase(x) {
  return x.replace(/^(.)|[^a-zA-Z]([a-zA-Z])/g, (match, char1, char2) =>
    (char1 || char2).toUpperCase()
  );
}

const iconFiles = glob.sync('**/*.svg', { cwd: iconsDir, realpath: true });

iconFiles.forEach((filePath) => {
  const fileName = path.basename(filePath, '.svg');
  const svgSource = fs.readFileSync(path.join(iconsDir, filePath));
  const svgString = svgSource.toString();

  try {
    if (!svgString.includes('viewBox')) {
      throw new Error(`${filePath} is missing a 'viewBox' attribute`);
    }

    const hasIds = svgString.includes('id="');

    let jsxSource = svgr.sync(
      svgSource,
      {
        plugins: ['@svgr/plugin-svgo', '@svgr/plugin-jsx'],
        svgoConfig: {
          plugins: [
            {
              name: 'preset-default',
              params: {
                overrides: {
                  removeViewBox: false,
                  removeUselessStrokeAndFill: false,
                },
              },
            },
          ],
        },
        svgProps: {
          xmlns: 'http://www.w3.org/2000/svg',
        },
        titleProp: true,
        typescript: true,
        template: (
          { imports, interfaces, componentName, props, jsx },
          { tpl }
        ) =>
          hasIds
            ? tpl`
${imports}
import { htmlIdGenerator } from '../../../services';
${interfaces}
const ${componentName} = (${props}) => {
  const generateId = htmlIdGenerator('${fileName}');
  return (
    ${jsx}
  );
};
export const icon = ${componentName};
`
            : tpl`
${imports}
${interfaces}
const ${componentName} = (${props}) => ${jsx}
export const icon = ${componentName};
`,
      },
      {
        componentName: `EuiIcon${pascalCase(fileName)}`,
      }
    );

    // Replace static SVGs IDs with dynamic JSX that uses the htmlIdGenerator
    if (hasIds) {
      jsxSource = jsxSource
        .replace(/id="(\S+)"/gi, "id={generateId('$1')}")
        .replace(/"url\(#(\S+)\)"/gi, "{`url(#${generateId('$1')})`}")
        .replace(/xlinkHref="#(\S+)"/gi, "xlinkHref={`#${generateId('$1')}`}");
    }

    const outputFilePath = `${outputDir}/${fileName}.tsx`;
    const comment = `\n// THIS IS A GENERATED FILE. DO NOT MODIFY MANUALLY. @see scripts/compile-icons.js\n\n`;
    fs.writeFileSync(outputFilePath, license + comment + jsxSource);
  } catch (e) {
    console.error(`Error processing ${filePath}`);
    console.error(e);
    process.exit(1);
  }
});
