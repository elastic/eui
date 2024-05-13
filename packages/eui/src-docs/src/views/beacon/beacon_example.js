import React from 'react';

import { GuideSectionTypes } from '../../components';

import { EuiBeacon, EuiText } from '../../../../src/components';

import { beaconConfig } from './playground';

import Beacon from './beacon';
const beaconSource = require('!!raw-loader!./beacon');
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
      playground: beaconConfig,
    },
  ],
};
