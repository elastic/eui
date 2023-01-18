import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiText,
  useEuiTheme,
} from '../../../../../src';
import {
  Chart,
  Metric,
  ScaleType,
  Settings,
  LineSeries,
  Position,
  Axis,
  niceTimeFormatter,
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

export function MetricVsTimeseries() {
  const themeContext = useContext(ThemeContext);
  const isDarkTheme = themeContext.theme.includes('dark');
  const euiTheme = useEuiTheme();
  const euiChartTheme = isDarkTheme
    ? EUI_CHARTS_THEME_DARK
    : EUI_CHARTS_THEME_LIGHT;
  const chartBaseTheme = isDarkTheme ? DARK_THEME : LIGHT_THEME;

  return (
    <EuiFlexGroup gutterSize="l" alignItems="flexStart">
      <EuiFlexItem grow={0}>
        <EuiFlexGroup gutterSize="s" alignItems="center" direction="column">
          <EuiText textAlign="center" color={euiTheme.euiTheme.colors.danger}>
            Not Good 👎
          </EuiText>
          <EuiPanel paddingSize="none" style={{ overflow: 'hidden' }}>
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
                      color: '#6ECCB1',
                      title: 'Number of visitors',
                      extra: <span>Unique visitors</span>,
                      value: TIME_DATA[TIME_DATA.length - 1][1] * 10000,
                      valueFormatter: (v) => `${(v / 1000).toFixed(0)}K`,
                      trend: TIME_DATA.map((d) => ({
                        x: d[0],
                        y: d[1] * 10000,
                      })),
                    },
                  ],
                ]}
              />{' '}
            </Chart>
          </EuiPanel>
        </EuiFlexGroup>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiFlexGroup gutterSize="s" alignItems="center" direction="column">
          <EuiText textAlign="center" color={euiTheme.euiTheme.colors.success}>
            Good 👍
          </EuiText>
          <EuiPanel
            paddingSize="m"
            style={{ overflow: 'hidden', width: '100%', height: 200 }}
          >
            <Chart size={['100%', '100%']}>
              <Settings
                baseTheme={chartBaseTheme}
                theme={euiChartTheme.theme}
              />
              <LineSeries
                id={'time'}
                xAccessor={0}
                yAccessors={[1]}
                data={TIME_DATA.map((d) => [d[0], d[1] * 10000])}
                xScaleType={ScaleType.Time}
                yNice
              />
              <Axis
                id="x"
                position={Position.Bottom}
                timeAxisLayerCount={2}
                tickFormat={(d) =>
                  niceTimeFormatter([
                    TIME_DATA[0][0],
                    TIME_DATA[TIME_DATA.length - 1][0],
                  ])(d)
                }
                style={{
                  tickLine: { size: 0.0001, padding: 4 },
                  tickLabel: {
                    alignment: {
                      horizontal: Position.Left,
                      vertical: Position.Bottom,
                    },
                    padding: 0,
                  },
                }}
              />
              <Axis
                id="y"
                position={Position.Left}
                ticks={4}
                tickFormat={(d) => `${(d / 1000).toFixed(0)}K`}
                title={'Unique visitors'}
              />
            </Chart>
          </EuiPanel>
        </EuiFlexGroup>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}
