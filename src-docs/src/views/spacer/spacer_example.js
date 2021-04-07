import React from 'react';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiSpacer } from '../../../../src/components';

import { spacerConfig } from './playground';

import Spacer from './spacer';
const spacerSource = require('!!raw-loader!./spacer');

const spacerSnippet = '<EuiSpacer size="xs" />';

export const SpacerExample = {
  title: 'Spacer',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: spacerSource,
        },
      ],
      text: (
        <p>
          The <strong>EuiSpacer</strong> component is for adding vertical space
          between items and should be used in place of the{' '}
          <EuiCode>{'<br />'}</EuiCode> tag. There are many different heights
          you can specify via the <EuiCode>size</EuiCode> prop which align to
          the EUI vertical grid sizing.
        </p>
      ),
      props: { EuiSpacer },
      snippet: spacerSnippet,
      demo: (
        <div className="guideDemo__highlightSpacer">
          <Spacer />
        </div>
      ),
      playground: spacerConfig,
    },
  ],
};
