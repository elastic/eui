import React from 'react';

import {
  getDefaultEuiMarkdownParsingPlugins,
  euiMarkdownLinkValidator,
  EuiMarkdownFormat,
} from '../../../../src/components';

const parsingPlugins = [
  // Exclude the default validation plugin, we're configuring our own that excludes `http` as a protocol
  ...getDefaultEuiMarkdownParsingPlugins({
    exclude: ['linkValidator'],
  }),
  [
    euiMarkdownLinkValidator,
    {
      allowProtocols: ['https:', 'mailto:'],
    },
  ],
];

const markdown = `**Standalone links**
https://example.com
http://example.com
someone@example.com

**As markdown syntax**
[example.com, https](https://example.com)
[example.com, http](http://example.com)
[email someone@example.com](mailto:someone@example.com)
`;

export default () => (
  <EuiMarkdownFormat parsingPluginList={parsingPlugins}>
    {markdown}
  </EuiMarkdownFormat>
);
