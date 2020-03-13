import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiBeacon } from '../../../../src/components';

import Beacon from './beacon';
const beaconSource = require('!!raw-loader!./beacon');
const beaconHtml = renderToHtml(Beacon);

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
        <div>
          <p>Blink, blink</p>
        </div>
      ),
      props: { EuiBeacon },
      demo: <Beacon />,
    },
  ],
};
