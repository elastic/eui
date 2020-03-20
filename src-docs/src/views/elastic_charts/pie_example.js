import React from 'react';

import { renderToHtml } from '../../services';

import { GuideSectionTypes } from '../../components';

import { EuiCode } from '../../../../src/components';

import PieChart from './pie';
const pieChartsSource = require('!!raw-loader!./pie');
const pieChartsHtml = renderToHtml(PieChart);

export const ElasticChartsPieExample = {
  title: 'Pie charts',
  sections: [
    {
      // title: 'ElasticCharts',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: pieChartsSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: pieChartsHtml,
        },
      ],
      text: (
        <p>
          Description needed: how to use the <EuiCode>Pie</EuiCode> component.
        </p>
      ),
      demo: <PieChart />,
    },
  ],
};
