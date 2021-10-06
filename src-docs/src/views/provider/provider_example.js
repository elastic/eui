import React from 'react';

import { EuiMarkdownFormat } from '../../../../src/components';

const providerSource = require('!!raw-loader!./provider.md').default;

export const ProviderExample = {
  title: 'Provider',
  sections: [
    {
      text: <EuiMarkdownFormat>{providerSource}</EuiMarkdownFormat>,
    },
  ],
};
