import { EuiPanel, useEuiTheme } from '../../../../../src';

import {
  Chart,
  DARK_THEME,
  LIGHT_THEME,
  Metric,
  Settings,
} from '@elastic/charts';
import React from 'react';
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
    <div
      style={{
        height: '300px',
        width: '300px',
      }}
    >
      <div
        style={{
          resize: 'both',
          padding: '0px',
          overflow: 'auto',
          height: '200px',
          width: '200px',
        }}
      >
        <EuiPanel
          paddingSize="none"
          style={{ overflow: 'hidden', height: '100%', width: '100%' }}
        >
          {/* @ts-ignore @elastic/charts typings are not yet compatible with React 18 */}
          <Chart size={['100%', '100%']}>
            <Settings baseTheme={chartBaseTheme} theme={euiChartTheme.theme} />
            <Metric
              id="1"
              data={[
                [
                  {
                    color: '#504EE9',
                    title: 'Current number of visitors',
                    subtitle: 'www.elastic.co',
                    extra: (
                      <span>
                        Total visitors <strong>353k</strong>
                      </span>
                    ),
                    value: 231,
                    valueFormatter: (v) => `${v}K`,
                  },
                ],
              ]}
            />
          </Chart>
        </EuiPanel>
      </div>
    </div>
  );
};
