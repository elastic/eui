import React, { Fragment } from 'react';
import { ExternalBadge } from './shared';
import { CategoryChart } from './category_chart';

import { EuiSpacer, EuiCode } from '../../../../src/components';

export const ElasticChartsCategoryExample = {
  title: 'Categorical charts',
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
            Category comparison charts compare data between multiple distinct
            categories. Avoid using a line graph as it might create confusion
            with a time series. Select a bar graph in this case.
          </p>

          <p>
            <strong>Key configurations</strong>
          </p>

          <ul>
            <li>
              <EuiCode>Settings.rotation = 90</EuiCode>
            </li>
            <li>
              <EuiCode>
                BarSeries.data = orderBy(DATASET, [&apos;count&apos;],
                [&apos;desc&apos;])
              </EuiCode>
            </li>
            <li>
              <EuiCode>BarSeries.xAccessor = &quot;vizType&quot;</EuiCode>
            </li>
            <li>
              <EuiCode>
                Axis.tickFormat = (d =&gt; Number(d)&apos;k&apos;)
              </EuiCode>
            </li>
          </ul>
        </Fragment>
      ),
      demo: <CategoryChart />,
      snippet: `<EuiTitle size="xxs">
  <h3>
    Number of {!this.state.multi && 'financial '}robo-calls
    {this.state.multi && ' by type'}
  </h3>
</EuiTitle>

<EuiSpacer size="s" />

<Chart size={[undefined, 200]}>

</Chart>`,
    },
  ],
};
