import React from 'react';

import {
  EuiMarkdownFormat,
  getDefaultEuiMarkdownPlugins,
} from '../../../../src';

export const markdownContent = `
- :cry: Automatic emoji formatting has been excluded from this markdown.
- In the example below, only \`https:\` and \`mailto:\` protocols should turn into links.
- Links should open in a new tab.

https://elastic.co
http://elastic.co
someone@elastic.co
`;

export default () => {
  const { processingPlugins, parsingPlugins } = getDefaultEuiMarkdownPlugins({
    exclude: ['emoji'],
    processingConfig: {
      linkProps: { target: '_blank' },
    },
    parsingConfig: {
      linkValidator: { allowProtocols: ['https:', 'mailto:'] },
    },
  });

  return (
    <EuiMarkdownFormat
      processingPluginList={processingPlugins}
      parsingPluginList={parsingPlugins}
    >
      {markdownContent}
    </EuiMarkdownFormat>
  );
};
