import React from 'react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  useEuiTheme,
} from '../../../../../src';
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
    <EuiFlexGroup gutterSize="l" alignItems="flexStart" direction="row">
      <EuiFlexItem grow={false}>
        <EuiPanel
          paddingSize="none"
          style={{ overflow: 'hidden', width: '200px' }}
        >
          {/* @ts-ignore @elastic/charts typings are not yet compatible with React 18 */}
          <Chart size={[200, 200]}>
            <Settings baseTheme={chartBaseTheme} theme={euiChartTheme.theme} />
            <Metric
              id="1"
              data={[
                [
                  {
                    color: '#A2CB9F',
                    title: 'CPU Usage',
                    subtitle: 'eui.co',
                    value: 34.2,
                    valueFormatter: (v) => `${v}%`,
                    domainMax: 100,
                    progressBarDirection: LayoutDirection.Vertical,
                    extra: (
                      <span>
                        last 10 min <strong>18.3%</strong>
                      </span>
                    ),
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
          {/* @ts-ignore @elastic/charts typings are not yet compatible with React 18 */}
          <Chart size={[200, 200]}>
            <Settings baseTheme={chartBaseTheme} theme={euiChartTheme.theme} />
            <Metric
              id="1"
              data={[
                [
                  {
                    color: '#E07A5F',
                    title: 'CPU Usage',
                    subtitle: 'charts.co',
                    extra: (
                      <span>
                        last 10 min <strong>18.3%</strong>
                      </span>
                    ),
                    value: 74.2,
                    valueFormatter: (v) => `${v}%`,
                    domainMax: 100,
                    progressBarDirection: LayoutDirection.Horizontal,
                  },
                ],
              ]}
            />
          </Chart>
        </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
