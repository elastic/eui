import React from 'react';
import { getParameters } from 'codesandbox/lib/api/define';

export const CodeSandboxLink = ({ children, extraDeps, content }) => {
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
  const params = getParameters({
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
            ...extraDeps,
          },
        },
      },
      'index.js': {
        content: indexContent,
      },
    },
  });

  const childWithSubmit = React.cloneElement(children, {
    type: 'submit',
  });

  console.log(params);

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
