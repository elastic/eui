import React, { useState } from 'react';

import {
  EuiMarkdownEditor,
  getDefaultEuiMarkdownPlugins,
} from '../../../../src/components';

const initialContent = `## This is how we do it :smile:

In this example, we unregistered the built in **tooltip** plugin. So the button in the toolbar and the help syntax won't be displayed.

And the following syntax no longer works.

!{tooltip[anchor text](Tooltip content)}
`;

const { parsingPlugins, processingPlugins, uiPlugins } =
  getDefaultEuiMarkdownPlugins({ exclude: ['tooltip'] });

export default () => {
  const [value, setValue] = useState(initialContent);

  return (
    <>
      <EuiMarkdownEditor
        aria-label="EUI markdown editor with no default plugins demo"
        value={value}
        onChange={setValue}
        parsingPluginList={parsingPlugins}
        processingPluginList={processingPlugins}
        uiPlugins={uiPlugins}
      />
    </>
  );
};
