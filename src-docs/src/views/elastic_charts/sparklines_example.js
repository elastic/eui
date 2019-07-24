import React, { Fragment } from 'react';

import { ExternalBadge } from './shared';
import { Sparklines } from './sparklines';

import { EuiSpacer, EuiCode } from '../../../../src/components';

export const ElasticChartsSparklinesExample = {
  title: 'Sparklines',
  intro: (
    <Fragment>
      <ExternalBadge />
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
