import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import DateTime from './date_time';
const dateTimeSource = require('!!raw-loader!./date_time');
const dateTimeHtml = renderToHtml(DateTime);

export const DateTimeExample = {
  title: 'DateTime',
  sections: [{
    title: 'DateTime',
    source: [{
      type: GuideSectionTypes.JS,
      code: dateTimeSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: dateTimeHtml,
    }],
    text: (
      <p>
        Description needed: how to use the <EuiCode>EuiDateTime</EuiCode> component.
      </p>
    ),
    demo: <DateTime />,
  }],
};
