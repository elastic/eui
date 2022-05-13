import React from 'react';

import { GuideSectionTypes } from '../../components';

import { EuiHealth, EuiCode } from '../../../../src/components';
import healthConfig from './playground';

import Health from './health';
const healthSource = require('!!raw-loader!./health');
const healthSnippet = [
  '<EuiHealth color="success">Healthy</EuiHealth>',
  '<EuiHealth color="#33CC33">Custom color as hex</EuiHealth>',
];

import HealthSize from './health_size';
const healthTextSizeSource = require('!!raw-loader!./health_size');
const healthTextSizeSnippet = [
  '<EuiHealth textSize="inherit">Text inherited from the parent element</EuiHealth>',
  '<EuiHealth textSize="xs">Text extra small</EuiHealth>',
];

export const HealthExample = {
  title: 'Health',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: healthSource,
        },
      ],
      text: (
        <p>
          The <strong>EuiHealth</strong> component should be used when showing
          comparitive health of listed objects (like servers, HTTP response
          status codes(as per convenience), nodes, indexes..etc). Because icons
          are vague and bulky and color alone does not work, color plus text
          provides a recognizable, lightweight combo that works in most
          situations.
        </p>
      ),
      snippet: healthSnippet,
      props: { EuiHealth },
      playground: healthConfig,
      demo: <Health />,
    },
    {
      title: 'Text sizes',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: healthTextSizeSource,
        },
      ],
      text: (
        <p>
          Match the text size of <strong>EuiHealth</strong> to your context by
          passing <EuiCode>xs / s / m / inherit</EuiCode> to the{' '}
          <EuiCode>textSize</EuiCode> prop. The <EuiCode>inherit</EuiCode> style
          will get its font size from the parent element.
        </p>
      ),
      snippet: healthTextSizeSnippet,
      props: { EuiHealth },
      demo: <HealthSize />,
    },
  ],
};
