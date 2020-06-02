import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiBeacon, EuiText } from '../../../../src/components';

import Beacon from './beacon';
const beaconSource = require('!!raw-loader!./beacon');
const beaconHtml = renderToHtml(Beacon);
const beaconSnippet = '<EuiBeacon />';

export const BeaconExample = {
  title: 'Beacon',
  sections: [
    {
      source: [
        {
          type: GuideSectionTypes.JS,
          code: beaconSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: beaconHtml,
        },
      ],
      text: (
        <EuiText>
          <p>
            Use the <strong>EuiBeacon</strong> component to draw visual
            attention to a specific location or element.
          </p>
        </EuiText>
      ),
      props: { EuiBeacon },
      snippet: beaconSnippet,
      demo: <Beacon />,
    },
  ],
};
