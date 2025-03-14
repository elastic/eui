import React from 'react';
import { getParameters } from 'codesandbox/lib/api/define';
import { useEuiTheme } from '../../../../src/services';
import {
  cleanEuiImports,
  hasDisplayToggles,
  listExtraDeps,
} from '../../services';

const pkg = require('../../../../package.json');

const getVersion = (packageName) => {
  return pkg.dependencies[packageName]
    ? pkg.dependencies[packageName]
    : pkg.devDependencies[packageName] || 'latest';
};

/* HOW THE CODE SANDBOX REGEX WORKS
 * Given the prop `content` we manipulate the provided source string to format
 * it for use as an independent file in Code Sandbox. In order the following
 * regex and magic happens:
 *
 * 1. A `content` prop is passed containing the src-doc example code we need to manipulate for CS.
 * 2. If no content exists (like the homepage link), we'll make a hello world file bundled with EUI and call it a day.
 * 3. If content exists, we build an `demo.js/tsx` (depending on the passed source type) file with a <Demo> component based on the original content.
 * 4. Create an `index.html file in `./public` and an `index.js` file alongside to provide global styles.
 * 5. If content contains `DisplayToggles`, we also generate a `display_toggles.js` file alongside to import.
 * 6. Through regex we read the dependencies of both `content` and `display_toggles` and pass that to CS.
 * 7. We pass the files, dependencies, and queries as params to CS through a POST call.
 * */

const displayTogglesRawCode =
  require('!!raw-loader!../../views/form_controls/display_toggles').default;

/* 1 */
export const CodeSandboxLink = ({
  children,
  className,
  content,
  type = 'js',
}) => {
  const { colorMode } = useEuiTheme();

  let demoContent;

  if (!content) {
    /* 2 */
    demoContent = `import React from 'react';

import { EuiButton } from '@elastic/eui';

export const Demo = () => (<EuiButton>Hello world!</EuiButton>);
`;
  } else {
    /** This cleans the Demo JS example for Code Sanbox.
    - Replaces relative imports with pure @elastic/eui ones
    - Changes the JS example from a default export to a component const named Demo
    **/
    const exampleCleaned = cleanEuiImports(content)
      .replace('export default', 'export const Demo =')
      .replace(
        /(from )'(..\/)+display_toggles(\/?';)/,
        "from './display_toggles';"
      );

    // If the code example still has local doc imports after the above cleaning it's
    // too complicated for code sandbox so we don't provide a link.
    const hasLocalImports = /(from )'((.|..)\/).*?';/.test(exampleCleaned);

    if (hasLocalImports && !hasDisplayToggles(exampleCleaned)) {
      return null;
    }

    demoContent = exampleCleaned.replace(
      /(from )'.+display_toggles';/,
      "from './display_toggles';"
    );
  }

  // Prepend the `@emotion/react` JSX pragma to enable the `css` prop on non-EUI elements/components
  // https://emotion.sh/docs/css-prop#jsx-pragma
  if (demoContent.includes('css=')) {
    demoContent = `/** @jsxImportSource @emotion/react */
${demoContent}
`;
  }

  const demoContentDeps = listExtraDeps(demoContent);
  let mergedDeps = demoContentDeps;

  /* 5 */
  if (hasDisplayToggles(demoContent)) {
    const cleanedDisplayToggles = cleanEuiImports(displayTogglesRawCode);
    const displayToggleDeps = listExtraDeps(cleanedDisplayToggles);

    /* 6 */
    mergedDeps = { ...mergedDeps, ...displayToggleDeps };
  }

  /**
   * If dependencies include @elastic/charts, we need to include a few peer dependencies
   * @see https://github.com/elastic/elastic-charts/wiki/Consuming-@elastic-charts#using-elastic-charts-in-a-standalone-project
   */
  if (demoContentDeps.hasOwnProperty('@elastic/charts')) {
    mergedDeps = { ...mergedDeps, 'moment-timezone': 'latest' };
    // We need to require the theme CSS as well for charts to actually render
    demoContent = demoContent.replace(
      "from '@elastic/charts';",
      `from '@elastic/charts';
import '@elastic/charts/dist/theme_only_${colorMode}.css';`
    );
  }

  const config = {
    files: {
      'package.json': {
        content: {
          dependencies: {
            '@elastic/eui': pkg.version,
            '@elastic/eui-theme-borealis': 'latest',
            ...[
              '@elastic/datemath',
              '@emotion/cache',
              '@emotion/react',
              '@emotion/css',
              'moment',
              'react',
              'react-dom',
              'react-scripts',
              ...Object.keys(mergedDeps),
            ].reduce((out, pkg) => {
              out[pkg] = getVersion(pkg);
              return out;
            }, {}),
          },
        },
      },
      /* 3 */
      [`demo.${type}`]: {
        content: demoContent,
      },
      'index.js': {
        content: `import React from 'react';
import { createRoot } from 'react-dom/client';
import createCache from '@emotion/cache';
import { EuiProvider, euiStylisPrefixer } from '@elastic/eui';

import { Demo } from './demo';

const cache = createCache({
  key: 'codesandbox',
  stylisPlugins: [euiStylisPrefixer],
  container: document.querySelector('meta[name="emotion-styles"]'),
});
cache.compat = true;

const root = createRoot(document.getElementById('root'));
root.render(
  <EuiProvider cache={cache}>
    <Demo />
  </EuiProvider>
);`,
      },
      /* 4 */
      'public/index.html': {
        content: `<head>
  <title>Elastic UI Framework v${pkg.version}</title>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300..700&family=Roboto+Mono:ital,wght@0,400..700;1,400..700&display=swap" rel="stylesheet" />
  <meta name="emotion-styles">
</head>
<body>
  <div id="root" />
</body>`,
      },
    },
  };

  /* 5 */
  if (hasDisplayToggles(demoContent)) {
    const cleanedDisplayToggles = cleanEuiImports(displayTogglesRawCode);

    config.files['display_toggles.tsx'] = {
      content: cleanedDisplayToggles,
    };
  }

  const params = getParameters(config);

  const childWithSubmit = React.cloneElement(children, {
    type: 'submit',
  });

  return (
    <form
      action="https://codesandbox.io/api/v1/sandboxes/define"
      method="POST"
      target="_blank"
      className={className}
    >
      {/* 7 */}
      <input type="hidden" name="parameters" value={params} />
      <input type="hidden" name="query" value={`file=/demo.${type}`} />
      {childWithSubmit}
    </form>
  );
};
