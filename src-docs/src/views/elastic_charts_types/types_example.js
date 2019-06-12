import React, { Fragment } from 'react';

import { BarCharts } from './simple_bars';
import { LineCharts } from './line';
import { AreaCharts } from './area';

import { EuiSpacer, EuiCode } from '../../../../src/components';

export const ElasticChartsTypesExample = {
  title: 'Types',
  intro: (
    <Fragment>
      <p>
        You can use <EuiCode>Elastic-Charts</EuiCode>.
      </p>
      <EuiSpacer size="l" />
    </Fragment>
  ),
  sections: [
    {
      title: 'Bar',
      text: (
        <p>
          You can create out-of-the-box vertical bar charts just adding a{' '}
          <EuiCode>BarSeries</EuiCode>
          component into your <EuiCode>Chart</EuiCode>.
        </p>
      ),
      demo: <BarCharts />,
    },
    {
      title: 'Line',
      text: (
        <p>
          You can create out-of-the-box vertical line charts just adding a{' '}
          <EuiCode>LineSeries</EuiCode>
          component into your <EuiCode>Chart</EuiCode>.
        </p>
      ),
      demo: <LineCharts />,
    },
    {
      title: 'Area',
      text: (
        <p>
          You can create out-of-the-box vertical area charts just adding a{' '}
          <EuiCode>AreaSeries</EuiCode>
          component into your <EuiCode>Chart</EuiCode>.
        </p>
      ),
      demo: <AreaCharts />,
    },
  ],
};
