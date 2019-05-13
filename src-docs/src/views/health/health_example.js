import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode, EuiHealth } from '../../../../src/components';

import Health from './health';
const healthSource = require('!!raw-loader!./health');
const healthHtml = renderToHtml(Health);

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
          The <EuiCode>Health</EuiCode> component should be used when showing
          comparitive health of listed objects (like servers, nodes,
          indexes..etc). Because icons are vague and bulky and color alone does
          not work, we think color plus text provides a recognizable,
          lightweight combo that works in most situations.
        </p>
      ),
      props: { EuiHealth },
      demo: <Health />,
    },
  ],
};
