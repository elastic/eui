import React from 'react';

import { Link } from 'react-router';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import StatusPill from './status_pill';
const statusPillSource = require('!!raw-loader!./status_pill');
const statusPillHtml = renderToHtml(StatusPill);


export const StatusPillExample = {
  title: 'StatusPill',
  sections: [{
    title: 'Spacer',
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
        that needs to convey the status of an object in a small space. It is used
        in the <Link to="/page">QueryPanel</Link> component.
      </p>
    ),
    demo: (<StatusPill />),
  }],
};
