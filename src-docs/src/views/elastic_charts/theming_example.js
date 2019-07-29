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
          <p>
            Use color to distinguish categories, represent quantity/density, and
            highlight data. You can help users focus on their data but using too
            many color variants in one chart can hinder understanding. Also, be
            sure not to use color alone.
          </p>
          <ul>
            <li>
              <EuiCode>
                theme = isDarkTheme ? EUI_DARK_THEME.theme :
                EUI_LIGHT_THEME.theme
              </EuiCode>
            </li>
          </ul>
        </Fragment>
      ),
      demo: <Theming />,
    },
  ],
};
