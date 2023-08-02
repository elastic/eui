import React from 'react';
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiText,
  useEuiTheme,
} from '../../../../../src';
import {
  Chart,
  DARK_THEME,
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
    <EuiFlexGroup gutterSize="l" alignItems="flexStart">
      <EuiFlexItem grow={0}>
        <EuiFlexGroup gutterSize="s" alignItems="center" direction="column">
          <EuiText textAlign="center">No Data</EuiText>
          <EuiPanel paddingSize="none" style={{ overflow: 'hidden' }}>
            {/* @ts-ignore @elastic/charts typings are not yet compatible with React 18 */}
            <Chart size={[200, 200]}>
              <Settings
                baseTheme={chartBaseTheme}
                theme={euiChartTheme.theme}
              />
              <Metric
                id="1"
                data={[
                  [
                    {
                      color: chartBaseTheme.metric?.background ?? 'white',
                      title: 'Number of visitors',
                      extra: (
                        <span>
                          Prev Week <strong>N/A</strong>
                        </span>
                      ),
                      value: NaN,
                      valueFormatter: (v) => `${v}k`,
                    },
                  ],
                ]}
              />{' '}
            </Chart>
          </EuiPanel>
        </EuiFlexGroup>
      </EuiFlexItem>
      <EuiFlexItem grow={0}>
        <EuiFlexGroup gutterSize="s" alignItems="center" direction="column">
          <EuiText textAlign="center">Filtered Out</EuiText>
          <EuiPanel paddingSize="none" style={{ overflow: 'hidden' }}>
            {/* @ts-ignore @elastic/charts typings are not yet compatible with React 18 */}
            <Chart size={[200, 200]}>
              <Settings
                theme={euiChartTheme.theme}
                baseTheme={chartBaseTheme}
              />
              <Metric id="1" data={[[undefined]]} />{' '}
            </Chart>
          </EuiPanel>
        </EuiFlexGroup>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
