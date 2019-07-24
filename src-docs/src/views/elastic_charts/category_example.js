import React, { Fragment } from 'react';
import { ExternalBadge } from './shared';
import { CategoryChart } from './category_chart';

import { EuiSpacer, EuiCode } from '../../../../src/components';

export const ElasticChartsCategoryExample = {
  title: 'Categorical charts',
  intro: (
    <Fragment>
      <ExternalBadge />
      <EuiSpacer />
      <p>
        Category comparison charts compare data between multiple distinct
        categories.
      </p>
      <EuiSpacer size="l" />
    </Fragment>
  ),
  sections: [
    {
      text: (
        <Fragment>
          <ul>
            <li>
              <EuiCode>xAccessor = &quot;vizType&quot;</EuiCode>
            </li>
            <li>
              <EuiCode>xScaleType = ScaleType.Ordinal</EuiCode>
            </li>
            <li>
              <EuiCode>tickFormat = d =&gt; `$Number(d)k`</EuiCode>
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
