import React from 'react';
import { getParameters } from 'codesandbox/lib/api/define';
import {
  cleanEuiImports,
  hasDisplayToggles,
  listExtraDeps,
} from '../../services';

import { EuiSpacer } from '../../../../src/components';

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

const displayTogglesRawCode = require('!!raw-loader!../../views/form_controls/display_toggles')
  .default;

/* 1 */
export const CodeSandboxLink = ({ children, content }) => {
  let indexContent;

  if (!content) {
    /* 2 */
    indexContent = `import ReactDOM from 'react-dom';
import '@elastic/eui/dist/eui_theme_light.css'
// import '@elastic/eui/dist/eui_theme_dark.css'
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
// import '@elastic/eui/dist/eui_theme_dark.css';
import '@elastic/eui/dist/eui_theme_light.css'`;

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
            react: 'latest',
            'react-dom': 'latest',
            'react-scripts': 'latest',
            moment: 'latest',
            '@elastic/eui': 'latest',
            '@elastic/datemath': 'latest',
            ...mergedDeps,
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
      className="eui-textRight">
      {/* 6 */}
      <input type="hidden" name="parameters" value={params} />

      <EuiSpacer size="s" />
      {childWithSubmit}
      <EuiSpacer size="s" />
    </form>
  );
};
