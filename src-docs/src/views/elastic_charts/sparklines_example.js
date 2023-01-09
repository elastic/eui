import React from 'react';
import { GuideSectionTypes } from '../../components';

import { ExternalBadge } from './shared';
import Sizes from './sizes';
import Sparklines from './sparklines';
const sparklinesSource = require('!!raw-loader!./sparklines');

import { EuiCode, EuiCodeBlock } from '../../../../src/components';

export const ElasticChartsSparklinesExample = {
  title: 'Sizing',
  intro: <ExternalBadge />,
  sections: [
    {
      text: (
        <>
          <p>
            When placing charts into smaller containers or panels, you must
            re-evaluate your data to provide a more simplified version. This
            could be as simple as shifting legend positions from the right side
            to the bottom or adding annotations to give context and describe the
            key points in your data.
          </p>
        </>
      ),
      demo: <Sizes />,
    },
    {
      title: 'Sparklines',
      source: [
        {
          type: GuideSectionTypes.JS,
          code: sparklinesSource,
        },
      ],
      text: (
        <>
          <p>
            Sparklines are quick visual summaries of data where actual values
            are not important. They should be only a single series and not
            contain more than 12 values. Be sure to remove all extraneous
            markings like ticks, labels, tooltips and grid. The surrounding
            content should give context to the sparkline.
          </p>
          <p>
            EUI also provides a quick theme alteration object that you can merge
            with the correct dark or light theme to properly style your
            sparklines.
          </p>
          <EuiCodeBlock language="javascript" isCopyable>
            {`import { EUI_CHARTS_THEME_DARK, EUI_CHARTS_THEME_LIGHT, EUI_SPARKLINE_THEME_PARTIAL } from \'@elastic/eui/dist/eui_charts_theme\';
const euiTheme = isDarkTheme ? EUI_CHARTS_THEME_DARK.theme : EUI_CHARTS_THEME_LIGHT.theme;
<Settings theme={[EUI_SPARKLINE_THEME_PARTIAL, euiTheme]} />`}
          </EuiCodeBlock>
          <p>
            <strong>Other key configurations</strong>
          </p>
          <ul>
            <li>
              <EuiCode language="js">Settings.showLegend = false</EuiCode>
            </li>
            <li>
              <EuiCode language="js">
                Settings.tooltip = &quot;none&quot;
              </EuiCode>
            </li>
          </ul>
        </>
      ),
      demo: <Sparklines />,
    },
  ],
};
