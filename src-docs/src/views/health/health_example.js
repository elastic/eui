import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiHealth } from '../../../../src/components';

import Health from './health';
const healthSource = require('!!raw-loader!./health');
const healthHtml = renderToHtml(Health);
const healthSnippet = [
  '<EuiHealth color="success">Healthy</EuiHealth>',
  '<EuiHealth color="#33CC33">Custom color as hex</EuiHealth>',
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
        {
          type: GuideSectionTypes.HTML,
          code: healthHtml,
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
      demo: <Health />,
    },
  ],
};
