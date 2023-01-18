import { EuiPanel } from '../../../../../src';
import {
  Chart,
  Metric,
  Settings,
  DARK_THEME,
  LIGHT_THEME,
} from '@elastic/charts';
import React, { useContext } from 'react';
import { ThemeContext } from '../../../components/with_theme';
import {
  EUI_CHARTS_THEME_DARK,
  EUI_CHARTS_THEME_LIGHT,
} from '../../../../../src/themes/charts/themes';

import { TIME_DATA } from '../data';

export function Trend() {
  const themeContext = useContext(ThemeContext);
  const isDarkTheme = themeContext.theme.includes('dark');

  const euiChartTheme = isDarkTheme
    ? EUI_CHARTS_THEME_DARK
    : EUI_CHARTS_THEME_LIGHT;
  const chartBaseTheme = isDarkTheme ? DARK_THEME : LIGHT_THEME;

  return (
    <EuiPanel paddingSize="none" style={{ overflow: 'hidden', width: 200 }}>
      <Chart size={[200, 200]}>
        <Settings baseTheme={chartBaseTheme} theme={euiChartTheme.theme} />
        <Metric
          id="1"
          data={[
            [
              {
                color: '#6ECCB1',
                title: 'Number of visitors',
                extra: <span>Unique visitors</span>,
                value: TIME_DATA[TIME_DATA.length - 1][1] * 10000,
                valueFormatter: (v) => `${(v / 1000).toFixed(0)}K`,
                trend: TIME_DATA.map((d) => ({ x: d[0], y: d[1] * 10000 })),
              },
            ],
          ]}
        />{' '}
      </Chart>
    </EuiPanel>
  );
}
