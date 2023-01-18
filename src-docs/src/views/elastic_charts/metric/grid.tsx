import { EuiFlexGroup, EuiFlexItem, EuiPanel } from '../../../../../src';
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

export function Grid() {
  const themeContext = useContext(ThemeContext);
  const isDarkTheme = themeContext.theme.includes('dark');
  const euiChartTheme = isDarkTheme
    ? EUI_CHARTS_THEME_DARK
    : EUI_CHARTS_THEME_LIGHT;
  const chartBaseTheme = isDarkTheme ? DARK_THEME : LIGHT_THEME;
  return (
    <EuiFlexGroup gutterSize="l" alignItems="flexStart">
      <EuiFlexItem grow={0}>
        <EuiPanel paddingSize="none" style={{ overflow: 'hidden', width: 200 }}>
          <Chart size={[200, 600]}>
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
                    valueFormatter: (v) => `${v}%`,
                  },
                ],
                [
                  {
                    color: '#FF7E62',
                    title: 'Memory Usage',
                    value: 59.5,
                    domainMax: 100,
                    valueFormatter: (v) => `${v}%`,
                  },
                ],
                [
                  {
                    color: '#6ECCB1',
                    title: 'Swap Usage',
                    value: 21.0,
                    domainMax: 100,
                    valueFormatter: (v) => `${v.toFixed(1)}%`,
                  },
                ],
              ]}
            />
          </Chart>
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem grow={0}>
        <EuiPanel paddingSize="none" style={{ overflow: 'hidden', width: 600 }}>
          <Chart size={[600, 200]}>
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
                    progressBarDirection: 'vertical',
                    valueFormatter: (v) => `${v}%`,
                  },
                  {
                    color: '#FF7E62',
                    title: 'Memory Usage',
                    value: 59.5,
                    domainMax: 100,
                    progressBarDirection: 'vertical',
                    valueFormatter: (v) => `${v}%`,
                  },
                  {
                    color: '#6ECCB1',
                    title: 'Swap Usage',
                    value: 21.0,
                    domainMax: 100,
                    progressBarDirection: 'vertical',
                    valueFormatter: (v) => `${v.toFixed(1)}%`,
                  },
                ],
              ]}
            />
          </Chart>
        </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}
