import React from 'react';
import { Link } from 'react-router-dom';

import {
  EuiMarkdownFormat,
  EuiText,
  EuiProvider,
} from '../../../../src/components';
import { GuideSectionPropsTable } from '../../components/guide_section/guide_section_parts/guide_section_props_table';

const providerSource = require('!!raw-loader!./provider.md').default;

export const ProviderExample = {
  title: 'Provider',
  isNew: true,
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
    {
      title: 'EuiProvider props',
      wrapText: false,
      text: <GuideSectionPropsTable component={EuiProvider} />,
    },
  ],
};
