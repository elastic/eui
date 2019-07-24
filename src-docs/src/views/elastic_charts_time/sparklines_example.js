import React, { Fragment } from 'react';

import { Sparklines } from './sparklines';

import { EuiSpacer, EuiCode, EuiBadge } from '../../../../src/components';

export const ElasticChartsSparklinesExample = {
  title: 'Sparklines',
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
        Sparklines are quick visual summaries of data where actual values are
        not important.
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
      demo: <Sparklines />,
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
