import React from 'react';
import { Link } from 'react-router-dom';
import { GuideSectionTypes } from '../../components';

import { ExternalBadge } from './shared';

import Theming from './theming';
const themingSource = require('!!raw-loader!./theming');

import Categorical from './theming_categorical';

import {
  EuiSpacer,
  EuiText,
  EuiCodeBlock,
  EuiLink,
  EuiCallOut,
} from '../../../../src/components';

export const ElasticChartsThemingExample = {
  title: 'Creating charts',
  intro: (
    <>
      <ExternalBadge />
      <EuiSpacer size="l" />
      <EuiText>
        <p>
          EUI provides utilities and documentation for working with{' '}
          <EuiLink
            href="https://elastic.github.io/elastic-charts"
            target="_blank"
          >
            Elastic Charts
          </EuiLink>
          , an open source charting library also created and maintained by
          Elastic.
        </p>
      </EuiText>
    </>
  ),
  sections: [
    {
      title: 'Theming via EUI',
      source: [
        {
          type: GuideSectionTypes.TSX,
          code: themingSource,
        },
      ],
      text: (
        <>
          <p>
            EUI provides both light and dark theme files to use in tandem with
            Elastic Charts. Simply import these objects from the themes folder
            and pass the correct one to the Settings.theme property.
          </p>
          <EuiCodeBlock language="javascript" isCopyable fontSize="s">
            {`import { DARK_THEME, LIGHT_THEME } from '@elastic/charts';

const chartBaseTheme = isDarkTheme ? DARK_THEME : LIGHT_THEME;

<Settings baseTheme={chartBaseTheme} />`}
          </EuiCodeBlock>
          <EuiCallOut title="Kibana engineers" iconType="logoKibana">
            <p>
              EUI provides a plugin utility for ease of pulling in the correct
              theme object depending on the current Kibana theme. Learn more
              from this{' '}
              <EuiLink
                href="https://github.com/elastic/kibana/tree/main/src/plugins/charts"
                target="_blank"
              >
                readme
              </EuiLink>
              .
            </p>
          </EuiCallOut>
          <EuiSpacer />
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

          <EuiCodeBlock language="javascript" isCopyable fontSize="s">
            {`import { DARK_THEME, LIGHT_THEME } from '@elastic/charts';
import { euiPaletteGreen } from '../../../../src/services';

const MyChart = () => {
  const customColors = {
    colors: {
      vizColors: euiPaletteGreen(5),
    },
  };
  const chartBaseTheme = isDarkTheme ? DARK_THEME : LIGHT_THEME;
  return (
    <Chart>
      <Settings baseTheme={chartBaseTheme} theme={customColors} />
      //...
    </Chart>
  );
};`}
          </EuiCodeBlock>
          <p>You&apos;ll find an example of these in the demo below.</p>
        </>
      ),
      demo: <Theming />,
    },
    {
      title: 'Coloring charts',
      text: (
        <>
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
            darkest colors at the extremes.
          </p>
          <p>
            Whan signifying quantities, group values into intervals instead of a
            continuous gradient scale.
          </p>
        </>
      ),
      demo: <Categorical />,
    },
  ],
};
