/* eslint-disable @typescript-eslint/no-var-requires */
import React, { Fragment } from 'react';
import { Link } from 'react-router';
import { renderToHtml } from '../../services';
import { GuideSectionTypes } from '../../components';

import { ExternalBadge } from './shared';

import { Theming } from './theming';
const themingSource = require('!!raw-loader!./theming');
const themingHtml = renderToHtml(Theming);

import { Categorical } from './theming_categorical';

import {
  EuiSpacer,
  EuiText,
  EuiCodeBlock,
  EuiLink,
} from '../../../../src/components';

export const ElasticChartsThemingExample = {
  title: 'Creating charts',
  intro: (
    <Fragment>
      <ExternalBadge />
      <EuiSpacer size="l" />
      <EuiText>
        <p>
          EUI provides utilities and documentation for working with{' '}
          <EuiLink
            href="https://elastic.github.io/elastic-charts"
            target="_blank">
            Elastic Charts
          </EuiLink>
          , an open source charting library also created and maintained by
          Elastic.
        </p>
      </EuiText>
      <EuiSpacer size="l" />
    </Fragment>
  ),
  sections: [
    {
      title: 'Theming via EUI',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: themingSource,
        },
        {
          type: GuideSectionTypes.HTML,
          code: themingHtml,
        },
      ],
      text: (
        <Fragment>
          <p>
            EUI provides both light and dark theme files to use in tandem with
            Elastic Charts. Simply import these objects from the themes folder
            and pass the correct one to the Settings.theme property.
          </p>
          <EuiCodeBlock language="javascript" isCopyable>
            {`import { EUI_CHARTS_THEME_DARK, EUI_CHARTS_THEME_LIGHT } from '@elastic/eui/dist/eui_charts_theme';
const euiTheme = isDarkTheme ? EUI_CHARTS_THEME_DARK.theme : EUI_CHARTS_THEME_LIGHT.theme;
<Settings theme={euiTheme} />`}
          </EuiCodeBlock>
          <p>
            EUI also provides some basic{' '}
            <Link to="/utilities/color-palettes">
              color palettes and functions
            </Link>{' '}
            if you would like to change the default color blind safe scheme to
            another palette. You can import these from the services folder.
            Create a new partial theme object with your chosen colors and
            prepend it to the list of themes supplied to Settings.
          </p>

          <EuiCodeBlock language="javascript" isCopyable>
            {`import { colorPalette } from '../../../../src/services';

const customColors = {
  colors: {
    vizColors: colorPalette('#FFFFE0', '#017F75', 5),
  },
};

<Settings theme={[customColors, euiTheme]} />`}
          </EuiCodeBlock>
          <p>You&apos;ll find an example of these in the demo below.</p>
        </Fragment>
      ),
      demo: <Theming />,
    },
    {
      title: 'Coloring charts',
      text: (
        <Fragment>
          <p>
            <strong>
              Use color to distinguish categories, represent quantity/density,
              and highlight data. When using color in this way, be aware that
              too many colors in a single chart can create noise and hinder
              quick comprehension.
            </strong>
          </p>
          <p>
            When creating a multi-series chart where each series shows{' '}
            <strong>contrasting</strong> data, use the color blind safe palette
            of contrasting colors. This will also avoid implying levels of
            magnitude.
          </p>
          <p>
            Think about the data you are delivering and if there is a way to{' '}
            <strong>highlight</strong> key indicators. If you can combine the
            series into logical groups, use contrasting shapes and styles, but
            keep the same color for within groups.
          </p>
          <h3>Quantity vs trends</h3>
          <p>
            When coloring for sequential series data (not categorical), rely on
            conventions. If the data signifies <strong>quantities</strong>, use
            a single color that spans from light colors for low amounts to dark
            colors for high amounts. If the data signifies{' '}
            <strong>trends</strong>, use a two-color divergent scheme, with the
            darkest colors at the extremes. Remember that red means bad/negative
            and green is good/positive.
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
