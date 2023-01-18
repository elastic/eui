import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiText,
  useEuiTheme,
} from '../../../../../src';
import { Chart, Metric, Settings } from '@elastic/charts';
import React, { useContext } from 'react';
import { ThemeContext } from '../../../components/with_theme';
import {
  EUI_CHARTS_THEME_DARK,
  EUI_CHARTS_THEME_LIGHT,
} from '../../../../../src/themes/charts/themes';
import { TIME_DATA } from '../data';

export function ContextVsNoContext() {
  const themeContext = useContext(ThemeContext);
  const isDarkTheme = themeContext.theme.includes('dark');
  const euiTheme = useEuiTheme();

  const euiChartTheme = isDarkTheme
    ? EUI_CHARTS_THEME_DARK
    : EUI_CHARTS_THEME_LIGHT;
  return (
    <EuiFlexGroup gutterSize="l" alignItems="flexStart" direction="row">
      <EuiFlexItem grow={0}>
        <EuiFlexGroup gutterSize="s" alignItems="center" direction="column">
          <EuiText textAlign="center" color={euiTheme.euiTheme.colors.success}>
            Good <span role="complementary">👍</span>
          </EuiText>
          <EuiPanel paddingSize="none" style={{ overflow: 'hidden' }}>
            <Chart size={[200, 200]}>
              <Settings theme={euiChartTheme.theme} />
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
        </EuiFlexGroup>
      </EuiFlexItem>
      <EuiFlexItem grow={0}>
        <EuiFlexGroup gutterSize="s" alignItems="center" direction="column">
          <EuiText textAlign="center" color={euiTheme.euiTheme.colors.danger}>
            Not Good <span role="complementary">👎</span>
          </EuiText>
          <EuiPanel paddingSize="none" style={{ overflow: 'hidden' }}>
            <Chart size={[200, 200]}>
              <Settings theme={euiChartTheme.theme} />
              <Metric
                id="1"
                data={[
                  [
                    {
                      color: '#0277CC',
                      title: 'Number of visitors',
                      extra: <span>345k</span>,
                      value: 283000,
                      valueFormatter: () => '240k',
                    },
                  ],
                ]}
              />
            </Chart>
          </EuiPanel>
        </EuiFlexGroup>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}
