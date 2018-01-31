import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiStatusPill,
} from '../../../../src/components';

import StatusPill from './status_pill';
const statusPillSource = require('!!raw-loader!./status_pill');
const statusPillHtml = renderToHtml(StatusPill);

export const StatusPillExample = {
  title: 'StatusPill',
  sections: [{
    title: 'Status Pill',
    source: [{
      type: GuideSectionTypes.JS,
      code: statusPillSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: statusPillHtml,
    }],
    text: (
      <p>
        A <EuiCode>StatusPill</EuiCode> is a small button usually presented in groups
        that needs to convey the status of an object in a small space. It is used within
        wrappers that are meant to mock input fields.
      </p>
    ),
    props: { EuiStatusPill },
    demo: <StatusPill />,
  }],
};
