import React, { Fragment } from 'react';

import { ExternalBadge } from './shared';
import { Theming } from './theming';

import { EuiSpacer, EuiCode } from '../../../../src/components';

export const ElasticChartsThemingExample = {
  title: 'Theming',
  intro: (
    <Fragment>
      <ExternalBadge />
      <EuiSpacer />
      <p>Theming via EUI.</p>
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
      demo: <Theming />,
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
