import React from 'react';
import { getParameters } from 'codesandbox/lib/api/define';
import {
  cleanEuiImports,
  hasDisplayToggles,
  listExtraDeps,
} from '../../services';
import { LEGACY_NAME_KEY } from '../../../../src/themes';

import { ThemeContext } from '../with_theme';

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
 * 3. If content exists, we build an `index.js/tsx` (depending on the passed source type) file with a <Demo> component based on the original content.
 * 4. If the default theme is in use, create an `index.html file in `./public` and a `provider.js` file inside `./csb-src` to import and provide global styles.
 * 5. If content contains `DisplayToggles`, we also generate a `display_toggles.js` file inside `./csb-src` to import.
 * 6. Through regex we read the dependencies of both `content` and `display_toggles` and pass that to CS.
 * 7. We pass the files and dependencies as params to CS through a POST call.
 * */

const displayTogglesRawCode = require('!!raw-loader!../../views/form_controls/display_toggles')
  .default;

export const CodeSandboxLink = ({ ...rest }) => {
  return (
    <ThemeContext.Consumer>
      {(context) => <CodeSandboxLinkComponent context={context} {...rest} />}
    </ThemeContext.Consumer>
  );
};

/* 1 */
export const CodeSandboxLinkComponent = ({
  children,
  className,
  content,
  type = 'js',
  context,
}) => {
  let cssFile;
  switch (context.theme) {
    case `${LEGACY_NAME_KEY}_light`:
      cssFile = '@elastic/eui/dist/eui_legacy_light.css';
      break;
    case `${LEGACY_NAME_KEY}_dark`:
      cssFile = '@elastic/eui/dist/eui_legacy_dark.css';
      break;
    case 'dark':
      cssFile = '@elastic/eui/dist/eui_theme_dark.css';
      break;
    default:
      cssFile = '@elastic/eui/dist/eui_theme_light.css';
      break;
  }

  const isLegacyTheme = context.theme.includes(LEGACY_NAME_KEY);

  const providerPropsObject = {};
  // Only add configuration if it isn't the default
  if (context.theme.includes('dark')) {
    providerPropsObject.colorMode = 'dark';
  }
  // Can't spread an object inside of a string literal
  const providerProps = Object.keys(providerPropsObject)
    .map((prop) => {
      const value = providerPropsObject[prop];
      return value !== null ? `${prop}="${value}"` : `${prop}={${value}}`;
    })
    .join(' ');

  // Renders the new Demo component generically into the code sandbox page
  const exampleClose = `ReactDOM.render(
  ${
    /* 4 */
    isLegacyTheme
      ? '<Demo />'
      : `// See \`./csb-src/provider\` for \`EuiProvider\` configuration
  <Provider ${providerProps}>
    <Demo />
  </Provider>`
  },
  document.getElementById('root')
);`;

  let indexContent;

  if (!content) {
    /* 2 */
    indexContent = `import ReactDOM from 'react-dom';
import '${cssFile}';
import React from 'react';

import { EuiButton } from '@elastic/eui';
${
  /* 4 */
  !isLegacyTheme
    ? `
import { Provider } from './csb-src/provider';
`
    : ''
}
const Demo = () => (<EuiButton>Hello world!</EuiButton>);

${exampleClose}
`;
  } else {
    /** This cleans the Demo JS example for Code Sanbox.
    - Replaces relative imports with pure @elastic/eui ones
    - Adds provider import, if necessary
    - Changes the JS example from a default export to a component const named Demo
    **/
    let exampleCleaned = cleanEuiImports(content)
      .replace('export default', 'const Demo =')
      .replace(
        /(from )'(..\/)+display_toggles(\/?';)/,
        "from './csb-src/display_toggles';"
      );

    if (!isLegacyTheme && !exampleCleaned.includes('Provider')) {
      if (exampleCleaned.includes(" } from '@elastic/eui';")) {
        // Single line import statement
        exampleCleaned = exampleCleaned.replace(
          " } from '@elastic/eui';",
          ` } from '@elastic/eui';

import { Provider } from './csb-src/provider';`
        );
      } else {
        // Multi line import statement
        exampleCleaned = exampleCleaned.replace(
          "} from '@elastic/eui';",
          `} from '@elastic/eui';

import { Provider } from './csb-src/provider';`
        );
      }
    }

    // If the code example still has local doc imports after the above cleaning it's
    // too complicated for code sandbox so we don't provide a link.
    // `./csb-src` is allowed as an environment import location.
    const hasLocalImports = /(from )'((.|..)\/)(?!csb-src).*?';/.test(
      exampleCleaned
    );

    if (hasLocalImports && !hasDisplayToggles(exampleCleaned)) {
      return null;
    }

    // The Code Sanbbox demo needs to import CSS at the top of the document. CS has trouble
    // with our dynamic imports so we need to warn the user for now
    const exampleStart = `import ReactDOM from 'react-dom';
import '${cssFile}';`;

    // Concat the three pieces of the example into a single string to use for index.js
    const cleanedContent = `${exampleStart}
${exampleCleaned}
${exampleClose}
`;
    indexContent = cleanedContent.replace(
      /(from )'.+display_toggles';/,
      "from './csb-src/display_toggles';"
    );
  }

  const indexContentDeps = listExtraDeps(indexContent);
  let mergedDeps = indexContentDeps;

  /* 5 */
  if (hasDisplayToggles(indexContent)) {
    const cleanedDisplayToggles = cleanEuiImports(displayTogglesRawCode);
    const displayToggleDeps = listExtraDeps(cleanedDisplayToggles);

    /* 6 */
    mergedDeps = { ...indexContentDeps, ...displayToggleDeps };
  }

  const config = {
    files: {
      'package.json': {
        content: {
          dependencies: {
            '@elastic/eui': pkg.version,
            ...[
              '@elastic/datemath',
              '@emotion/cache',
              '@emotion/react',
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
      [`index.${type}`]: {
        content: indexContent,
      },
    },
  };

  /* 4 */
  if (!isLegacyTheme) {
    config.files['public/index.html'] = {
      content: `<head>
  <title>Elastic UI Framework v${pkg.version}</title>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <meta name="global-styles">
</head>
<body>
  <div id="root" />
</body>`,
    };

    config.files['csb-src/provider.js'] = {
      content: `import React from 'react';
import createCache from '@emotion/cache';
import { EuiProvider } from '@elastic/eui';

const cache = createCache({
  key: 'codesandbox',
  container: document.querySelector('meta[name="global-styles"]'),
});

export const Provider = ({ children, ...rest }) => {
  return (
    <EuiProvider cache={cache} {...rest}>
      {children}
    </EuiProvider>
  );
};`,
    };
  }

  /* 5 */
  if (hasDisplayToggles(indexContent)) {
    const cleanedDisplayToggles = cleanEuiImports(displayTogglesRawCode);

    config.files['csb-src/display_toggles.js'] = {
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
      {childWithSubmit}
    </form>
  );
};
