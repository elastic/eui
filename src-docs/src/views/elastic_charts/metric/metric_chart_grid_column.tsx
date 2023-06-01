import React from 'react';
import { EuiPanel, useEuiTheme } from '../../../../../src';
import {
  Chart,
  DARK_THEME,
  LayoutDirection,
  LIGHT_THEME,
  Metric,
  Settings,
} from '@elastic/charts';
import {
  EUI_CHARTS_THEME_DARK,
  EUI_CHARTS_THEME_LIGHT,
} from '../../../../../src/themes/charts/themes';

export default () => {
  const { colorMode } = useEuiTheme();
  const isDarkTheme = colorMode === 'DARK';
  const euiChartTheme = isDarkTheme
    ? EUI_CHARTS_THEME_DARK
    : EUI_CHARTS_THEME_LIGHT;
  const chartBaseTheme = isDarkTheme ? DARK_THEME : LIGHT_THEME;
  return (
    <EuiPanel paddingSize="none" style={{ overflow: 'hidden', width: 200 }}>
      {/* @ts-ignore Elastic Charts doesn't provide children prop type definition */}
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
};
