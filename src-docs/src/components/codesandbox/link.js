import React from 'react';
import { getParameters } from 'codesandbox/lib/api/define';
import {
  cleanEuiImports,
  hasDisplayToggles,
  listExtraDeps,
} from '../../services';

const displayTogglesRawCode = require('!!raw-loader!../../views/form_controls/display_toggles');

export const CodeSandboxLink = ({ children, content }) => {
  const defaultContent = `import ReactDOM from 'react-dom';
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
  const indexContent = content ? content : defaultContent;
  const indexContentDeps = listExtraDeps(indexContent);
  let mergedDeps = indexContentDeps;

  if (hasDisplayToggles(indexContent)) {
    const cleanedDisplayToggles = cleanEuiImports(displayTogglesRawCode);
    const displayToggleDeps = listExtraDeps(cleanedDisplayToggles);

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
      'index.js': {
        content: indexContent,
      },
    },
  };

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
      <input type="hidden" name="parameters" value={params} />
      {childWithSubmit}
    </form>
  );
};
