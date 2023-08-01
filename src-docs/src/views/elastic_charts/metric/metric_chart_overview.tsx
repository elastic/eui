import React from 'react';
import { EuiPanel, useEuiTheme } from '../../../../../src';
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
  const data = Array.from({ length: 30 }).map((d, i) => ({
    x: i,
    y: Math.random() * 1000 + 10000,
  }));
  return (
    <EuiPanel paddingSize="none" style={{ overflow: 'hidden', width: 200 }}>
      {/* @ts-ignore @elastic/charts typings are not yet compatible with React 18 */}
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
                value: data[data.length - 1].y,
                valueFormatter: (v) => `${(v / 1000).toFixed(0)}K`,
                trend: data,
              },
            ],
          ]}
        />
      </Chart>
    </EuiPanel>
  );
};
