import React, { Fragment } from 'react';

import { ExternalBadge } from './shared';
import { Theming } from './theming';
import { Categorical } from './theming_categorical';

import { EuiSpacer, EuiCode, EuiCodeBlock } from '../../../../src/components';

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
    {
      title: 'Coloring for categories',
      text: (
        <Fragment>
          <p>
            When creating a multi-series chart where each series shows{' '}
            <strong>contrasting</strong> data, use the color blind safe palette
            of contrasting colors. This will also avoid implying levels of
            magnitude.
          </p>
          <p>
            Do not use too many colors in a single chart as this will hinder
            understanding. Instead, think about the data you are delivering and
            if there is a way to <strong>highlight</strong> key indicators. If
            the series&apos; are or can be combined into logical groups, use
            contrasting shapes/styles but keep the same color for within groups.
          </p>

          <EuiCodeBlock language="javascript" paddingSize="s" isCopyable>
            {`customColors = mergeWithDefaultTheme({
  colors: {
    vizColors: palettes.euiPaletteColorBlind.colors
  },
}, isDarkTheme ? EUI_DARK_THEME.theme : EUI_LIGHT_THEME.theme)`}
          </EuiCodeBlock>
        </Fragment>
      ),
      demo: <Categorical />,
    },
  ],
};
