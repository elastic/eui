import React from 'react';

import { ExternalBadge } from './shared';
import TimeChart from './time_chart';

import { EuiCode } from '../../../../src/components';

export const ElasticChartsTimeExample = {
  title: 'Time series',
  intro: <ExternalBadge />,
  sections: [
    {
      text: (
        <>
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
              <EuiCode language="js">
                BarSeries.xScaleType = &quot;time&quot;
              </EuiCode>
            </li>
            <li>
              <EuiCode language="js">
                tickFormat = timeFormatter(niceTimeFormatByDay(1));
              </EuiCode>
            </li>
          </ul>
        </>
      ),
      demo: <TimeChart />,
    },
  ],
};
