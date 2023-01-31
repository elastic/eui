import { EuiPanel } from '../../../../../src';
import {
  Chart,
  DARK_THEME,
  LayoutDirection,
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

export function GridColumn() {
  const themeContext = useContext(ThemeContext);
  const isDarkTheme = themeContext.theme.includes('dark');
  const euiChartTheme = isDarkTheme
    ? EUI_CHARTS_THEME_DARK
    : EUI_CHARTS_THEME_LIGHT;
  const chartBaseTheme = isDarkTheme ? DARK_THEME : LIGHT_THEME;
  return (
    <EuiPanel paddingSize="none" style={{ overflow: 'hidden', width: 200 }}>
      <Chart size={[200, 400]}>
        <Settings baseTheme={chartBaseTheme} theme={euiChartTheme.theme} />
        <Metric
          id="1"
          data={[
            [
              {
                color: '#F1D86F',
                title: 'CPU Usage',
                value: 34.2,
                domainMax: 100,
                progressBarDirection: LayoutDirection.Horizontal,
                valueFormatter: (v) => `${v}%`,
              },
            ],
            [
              {
                color: '#FF7E62',
                title: 'Memory Usage',
                value: 59.5,
                domainMax: 100,
                progressBarDirection: LayoutDirection.Horizontal,
                valueFormatter: (v) => `${v}%`,
              },
            ],
            [
              {
                color: '#6ECCB1',
                title: 'Swap Usage',
                value: 21.0,
                domainMax: 100,
                progressBarDirection: LayoutDirection.Horizontal,
                valueFormatter: (v) => `${v.toFixed(1)}%`,
              },
            ],
          ]}
        />
      </Chart>
    </EuiPanel>
  );
}
