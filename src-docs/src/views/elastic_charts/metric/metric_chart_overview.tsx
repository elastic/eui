import { EuiPanel } from '../../../../../src';
import {
  Chart,
  DARK_THEME,
  LIGHT_THEME,
  Metric,
  Settings,
} from '@elastic/charts';
import React, { useContext } from 'react';
import { ThemeContext } from '../../../components/with_theme';
import {
  EUI_CHARTS_THEME_DARK,
  EUI_CHARTS_THEME_LIGHT,
} from '../../../../../src/themes/charts/themes';
import { TIME_DATA } from '../data';

export function Overview() {
  const themeContext = useContext(ThemeContext);
  const isDarkTheme = themeContext.theme.includes('dark');

  const euiChartTheme = isDarkTheme
    ? EUI_CHARTS_THEME_DARK
    : EUI_CHARTS_THEME_LIGHT;
  const chartBaseTheme = isDarkTheme ? DARK_THEME : LIGHT_THEME;
  return (
    <EuiPanel paddingSize="none" style={{ overflow: 'hidden', width: 200 }}>
      <Chart size={[200, 200]}>
        <Settings theme={euiChartTheme.theme} baseTheme={chartBaseTheme} />
        <Metric
          id="1"
          data={[
            [
              {
                color: '#0277CC',
                title: 'Number of visitors',
                subtitle: 'www.elastic.co',
                extra: (
                  <span>
                    Total visitors <strong>345k</strong>
                  </span>
                ),
                value: TIME_DATA[TIME_DATA.length - 1][1] * 10000,
                valueFormatter: (v) => `${(v / 1000).toFixed(0)}K`,
                trend: TIME_DATA.map((d) => ({
                  x: d[0],
                  y: d[1] * 10000,
                })),
              },
            ],
          ]}
        />
      </Chart>
    </EuiPanel>
  );
}
