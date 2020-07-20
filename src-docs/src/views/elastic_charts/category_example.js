import React, { Fragment } from 'react';
import { ExternalBadge } from './shared';
import { CategoryChart } from './category_chart';

import { EuiSpacer, EuiCode } from '../../../../src/components';

export const ElasticChartsCategoryExample = {
  title: 'Categorical',
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
            Categorical charts compare data between multiple distinct
            categories. Avoid using a line chart because it might create
            confusion with a time series chart. Use a bar chart instead.
          </p>

          <p>
            <strong>Key configurations</strong>
          </p>

          <ul>
            <li>
              <EuiCode language="js">Settings.rotation = 90</EuiCode>
            </li>
            <li>
              <EuiCode language="js">
                BarSeries.data = orderBy(DATASET, [&apos;count&apos;],
                [&apos;desc&apos;])
              </EuiCode>
            </li>
            <li>
              <EuiCode language="js">
                BarSeries.xAccessor = &quot;vizType&quot;
              </EuiCode>
            </li>
            <li>
              <EuiCode language="js">
                Axis.tickFormat = (d =&gt; Number(d)&apos;k&apos;)
              </EuiCode>
            </li>
          </ul>
        </Fragment>
      ),
      demo: <CategoryChart />,
    },
  ],
};
