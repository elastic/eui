import React from 'react';

import {
  getDefaultEuiMarkdownParsingPlugins,
  euiMarkdownLinkValidator,
  EuiMarkdownFormat,
} from '../../../../src/components';

// find the validation plugin and configure it to only allow https: and mailto: links
const parsingPlugins = getDefaultEuiMarkdownParsingPlugins();
parsingPlugins.find(([plugin, config]) => {
  const isValidationPlugin = plugin === euiMarkdownLinkValidator;
  if (isValidationPlugin) {
    config.allowProtocols = ['https:', 'mailto:'];
  }
  return isValidationPlugin;
});

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
