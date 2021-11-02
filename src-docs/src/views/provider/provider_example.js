import React from 'react';
import { Link } from 'react-router-dom';

import { EuiMarkdownFormat, EuiText } from '../../../../src/components';

const providerSource = require('!!raw-loader!./provider.md').default;

export const ProviderExample = {
  title: 'Provider',
  intro: (
    <EuiText>
      <p>
        <strong>EuiProvider</strong> contains all necessary context providers
        required for full functionality and styling of EUI. It currently
        includes the{' '}
        <Link to="/theming/theme-provider">
          <strong>EuiThemeProvider</strong>
        </Link>{' '}
        for theming and writing custom styles.
      </p>
    </EuiText>
  ),
  sections: [
    {
      wrapText: false,
      text: <EuiMarkdownFormat>{providerSource}</EuiMarkdownFormat>,
    },
  ],
};
