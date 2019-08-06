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
      <EuiSpacer size="l" />
    </Fragment>
  ),
  sections: [
    {
      title: 'Theming via EUI',
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
            <li>
              <EuiCodeBlock language="javascript" paddingSize="s" isCopyable>
                {`customColors = mergeWithDefaultTheme({
  colors: {
    vizColors: palettes.euiPaletteColorBlind.colors
  },
}, isDarkTheme ? EUI_DARK_THEME.theme : EUI_LIGHT_THEME.theme)`}
              </EuiCodeBlock>
            </li>
          </ul>
        </Fragment>
      ),
      demo: <Theming />,
    },
    {
      title: 'Coloring charts correctly',
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
          <h3>Quantity vs trends</h3>
          <p>
            When coloring for sequential series data (not categorical), rely on
            conventions. If the data signifies <strong>quantities</strong>, use
            a single color that spans from light for low amounts to dark colors
            for high amounts. If the data signifies <strong>trends</strong>, use
            a two color scheme with the darkest at the extremes. Remember that
            red means bad/negative and green is good/positive.
          </p>
          <p>
            Whan signifying quantities, group values into intervals instead of a
            continuous gradient scale.
          </p>
        </Fragment>
      ),
      demo: <Categorical />,
    },
  ],
};
