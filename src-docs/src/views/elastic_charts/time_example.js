import React, { Fragment } from 'react';

import { ExternalBadge } from './shared';
import { TimeChart } from './time_chart';

import { EuiSpacer, EuiCode } from '../../../../src/components';

export const ElasticChartsTimeExample = {
  title: 'Time series',
  intro: (
    <Fragment>
      <ExternalBadge />
      <EuiSpacer size="l" />
    </Fragment>
  ),
  sections: [
    {
      text: (
        <Fragment>
          <p>
            Time series charts show data over a period of time, such as trends
            or comparisons across multiple categories. When smaller changes
            exist, it’s better to use line charts rather than bar charts.
          </p>

          <p>
            <strong>Key configurations</strong>
          </p>
          <ul>
            <li>
              <EuiCode>BarSeries.xScaleType = &quot;time&quot;</EuiCode>
            </li>
            <li>
              <EuiCode>
                tickFormat = timeFormatter(niceTimeFormatByDay(1));
              </EuiCode>
            </li>
          </ul>
        </Fragment>
      ),
      demo: <TimeChart />,
    },
  ],
};
