import { EuiFlexGroup, EuiFlexItem, EuiPanel } from '../../../../../src';
import {
  Chart,
  DARK_THEME,
  LIGHT_THEME,
  Metric,
  Settings,
} from '@elastic/charts';
import React, { useContext } from 'react';
import {
  EUI_CHARTS_THEME_DARK,
  EUI_CHARTS_THEME_LIGHT,
} from '../../../../../src/themes/charts/themes';
import { ThemeContext } from '../../../components/with_theme';

export function ProgressBar() {
  const themeContext = useContext(ThemeContext);
  const isDarkTheme = themeContext.theme.includes('dark');
  const euiChartTheme = isDarkTheme
    ? EUI_CHARTS_THEME_DARK
    : EUI_CHARTS_THEME_LIGHT;
  const chartBaseTheme = isDarkTheme ? DARK_THEME : LIGHT_THEME;
  return (
    <EuiFlexGroup gutterSize="l" alignItems="flexStart" direction="row">
      <EuiFlexItem grow={false}>
        <EuiPanel
          paddingSize="none"
          style={{ overflow: 'hidden', width: '200px' }}
        >
          <Chart size={[200, 200]}>
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
                ],
              ]}
            />{' '}
          </Chart>
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiPanel
          paddingSize="none"
          style={{ overflow: 'hidden', width: '200px' }}
        >
          <Chart size={[200, 200]}>
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
              ]}
            />
          </Chart>
        </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}
