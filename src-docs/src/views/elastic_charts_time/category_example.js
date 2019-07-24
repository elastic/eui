import React, { Fragment } from 'react';

import { CategoryChart } from './category_chart';

import { EuiSpacer, EuiCode, EuiBadge } from '../../../../src/components';

export const ElasticChartsCategoryExample = {
  title: 'Categorical charts',
  intro: (
    <Fragment>
      <EuiBadge
        color="warning"
        iconType="popout"
        iconSide="right"
        onClick={() =>
          window.open('https://github.com/elastic/elastic-charts')
        }>
        External library
      </EuiBadge>
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
              <EuiCode />
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
