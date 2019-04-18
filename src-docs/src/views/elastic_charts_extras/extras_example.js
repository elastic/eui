import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
} from '../../../../src/components';

import Axes from './axes';
const axesSource = require('!!raw-loader!./axes');
const axesHtml = renderToHtml(Axes);

export const ElasticChartsExtrasExample = {
  title: 'Extras',
  sections: [{
    title: 'Axes',
    source: [{
      type: GuideSectionTypes.JS,
      code: axesSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: axesHtml,
    }],
    text: (
      <p>
        Description needed: how to use the <EuiCode>Axes</EuiCode> component.
      </p>
    ),
    demo: <Axes />,
  }],
};
