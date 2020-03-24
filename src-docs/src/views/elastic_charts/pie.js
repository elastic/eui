import React, { useContext } from 'react';
import { ThemeContext } from '../../components';
import { Chart, Partition, PartitionLayout } from '@elastic/charts';
import { BROWSER_DATA_2019 } from './data';
import { euiPaletteColorBlind } from '../../../../src/services';

import {
  EUI_CHARTS_THEME_DARK,
  EUI_CHARTS_THEME_LIGHT,
} from '../../../../src/themes/charts/themes';

export default () => {
  const themeContext = useContext(ThemeContext);

  /**
   * Setup theme based on current light/dark theme
   */
  const isDarkTheme = themeContext.theme.includes('dark');
  const theme = isDarkTheme ? EUI_CHARTS_THEME_DARK : EUI_CHARTS_THEME_LIGHT;

  return (
    <div>
      <h2>Pie</h2>
      <Chart size={{ height: 300 }}>
        <Partition
          id="pieByBrowser"
          data={BROWSER_DATA_2019}
          valueAccessor={d => Number(d.percent)}
          layers={[
            {
              groupByRollup: d => d.browser,
              shape: {
                fillColor: d => euiPaletteColorBlind(10)[d.sortIndex],
              },
            },
          ]}
          config={theme.pie}
        />
      </Chart>
      <h2>Donut</h2>
      <Chart size={{ height: 300 }}>
        <Partition
          id="pieByBrowser"
          data={BROWSER_DATA_2019}
          valueAccessor={d => Number(d.percent)}
          layers={[
            {
              groupByRollup: d => d.browser,
              shape: {
                fillColor: d => euiPaletteColorBlind(10)[d.sortIndex],
              },
            },
          ]}
          config={{ ...theme.pie, emptySizeRatio: 0.4 }}
        />
      </Chart>
      <h2>Treemap</h2>
      <Chart size={{ height: 300 }}>
        <Partition
          id="pieByBrowser"
          data={BROWSER_DATA_2019}
          valueAccessor={d => Number(d.percent)}
          layers={[
            {
              groupByRollup: d => d.browser,
              shape: {
                fillColor: d => euiPaletteColorBlind(10)[d.sortIndex],
              },
            },
          ]}
          config={{ ...theme.pie, partitionLayout: PartitionLayout.treemap }}
        />
      </Chart>
    </div>
  );
};
