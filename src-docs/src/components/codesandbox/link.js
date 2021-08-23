import React from 'react';
import { getParameters } from 'codesandbox/lib/api/define';
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
 * 3. If content exists, we build an `index.js` file with a <Demo> component based on the original content.
 * 4. If content contains `DisplayToggles`, we also generate a `display_toggles.js` file alongside the `index.js` file to import.
 * 5. Through regex we read the dependencies of both `content` and `display_toggles` and pass that to CS.
 * 6. We pass the files and dependencies as params to CS through a POST call.
 * */
import { ThemeContext } from '../with_theme';

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
  context,
}) => {
  let cssFile;
  switch (context.theme) {
    case 'amsterdam-light':
      cssFile = '@elastic/eui/dist/eui_theme_amsterdam_light.css';
      break;
    case 'amsterdam-dark':
      cssFile = '@elastic/eui/dist/eui_theme_amsterdam_dark.css';
      break;
    case 'dark':
      cssFile = '@elastic/eui/dist/eui_theme_dark.css';
      break;
    default:
      cssFile = '@elastic/eui/dist/eui_theme_light.css';
      break;
  }

  let indexContent;

  if (!content) {
    /* 2 */
    indexContent = `import ReactDOM from 'react-dom';
import '${cssFile}';
import React from 'react';

import {
  EuiButton,
} from '@elastic/eui';

const Demo = () => (<EuiButton>Hello world!</EuiButton>);

ReactDOM.render(
  <Demo />,
  document.getElementById('root')
);
`;
  } else {
    /** This cleans the Demo JS example for Code Sanbox.
    - Replaces relative imports with pure @elastic/eui ones
    - Changes the JS example from a default export to a component const named Demo
    **/
    const exampleCleaned = cleanEuiImports(content)
      .replace('export default', 'const Demo =')
      .replace(
        /(from )'(..\/)+display_toggles(\/?';)/,
        "from './display_toggles';"
      );

    // If the code example still has local doc imports after the above cleaning it's
    // too complicated for code sandbox so we don't provide a link
    const hasLocalImports = /(from )'((.|..)\/).*?';/.test(exampleCleaned);

    if (hasLocalImports && !hasDisplayToggles(exampleCleaned)) {
      return null;
    }

    // Renders the new Demo component generically into the code sandbox page
    const exampleClose = `ReactDOM.render(
    <Demo />,
    document.getElementById('root')
  );`;
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
      "from './display_toggles';"
    );
  }

  const indexContentDeps = listExtraDeps(indexContent);
  let mergedDeps = indexContentDeps;

  /* 4 */
  if (hasDisplayToggles(indexContent)) {
    const cleanedDisplayToggles = cleanEuiImports(displayTogglesRawCode);
    const displayToggleDeps = listExtraDeps(cleanedDisplayToggles);

    /* 5 */
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
      'index.js': {
        content: indexContent,
      },
    },
  };

  /* 4 */
  if (hasDisplayToggles(indexContent)) {
    const cleanedDisplayToggles = cleanEuiImports(displayTogglesRawCode);

    config.files['display_toggles.js'] = {
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
      {/* 6 */}
      <input type="hidden" name="parameters" value={params} />
      {childWithSubmit}
    </form>
  );
};
