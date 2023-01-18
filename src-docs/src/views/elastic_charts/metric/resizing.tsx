import { EuiPanel } from '../../../../../src';

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

export function Resizing() {
  const themeContext = useContext(ThemeContext);
  const isDarkTheme = themeContext.theme.includes('dark');
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
        className={'guideDemo__ElasticChartsMetricResize'}
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
}
