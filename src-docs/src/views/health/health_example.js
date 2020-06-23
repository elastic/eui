import React, { Fragment } from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import {
  EuiCode,
  EuiHealth,
  EuiText,
  EuiSpacer,
} from '../../../../src/components';

import Health from './health';
const healthSource = require('!!raw-loader!./health');
const healthHtml = renderToHtml(Health);
const healthSnippet = [
  '<EuiHealth color="success">Healthy</EuiHealth>',
  '<EuiHealth color="#33CC33">Custom color as hex</EuiHealth>',
];

import HealthSize from './health_size';
const healthSizeSource = require('!!raw-loader!./health_size');
const healthSizeHtml = renderToHtml(HealthSize);
const healthSizeSnippet = [
  '<EuiHealth color="success">Healthy</EuiHealth>',
  '<EuiHealth size="xs" color="success">Healthy</EuiHealth>',
];

export const HealthExample = {
  title: 'Health',
  intro: (
    <Fragment>
      <EuiText>
        <p>
          The <strong>EuiHealth</strong> component should be used when showing
          comparitive health of listed objects (like servers, HTTP response
          status codes(as per convenience), nodes, indexes..etc). Because icons
          are vague and bulky and color alone does not work, color plus text
          provides a recognizable, lightweight combo that works in most
          situations.
        </p>
      </EuiText>
      <EuiSpacer size="l" />
    </Fragment>
  ),
  sections: [
    {
      title: 'Color',
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
      snippet: healthSnippet,
      props: { EuiHealth },
      demo: <Health />,
    },
    {
      title: 'Size',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: healthSizeSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: healthSizeHtml,
        },
      ],
      text: (
        <p>
          <strong>EuiHealth</strong> can be used at different sizes. If a size
          is not specified, it will use the default size, <EuiCode>S</EuiCode>.
        </p>
      ),
      snippet: healthSizeSnippet,
      props: { EuiHealth },
      demo: <HealthSize />,
    },
  ],
};
