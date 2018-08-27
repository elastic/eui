import React from 'react';

import { renderToHtml } from '../../services';

import {
  GuideSectionTypes,
} from '../../components';

import {
  EuiCode,
  EuiStat,
} from '../../../../src/components';

import Stat from './stat';
const statSource = require('!!raw-loader!./stat');
const statHtml = renderToHtml(Stat);

export const StatExample = {
  title: 'Stat',
  sections: [{
    source: [{
      type: GuideSectionTypes.JS,
      code: statSource,
    }, {
      type: GuideSectionTypes.HTML,
      code: statHtml,
    }],
    text: (
      <p>
        <EuiCode>Stat</EuiCode> can accept a size or color. By default it will be a large title with full color.
      </p>
    ),
    props: { EuiStat },
    demo: <Stat />,
  }],
};
