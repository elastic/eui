import React from 'react';
import { Chart, Partition } from '@elastic/charts';
// import { mocks } from '../../src/mocks/hierarchical/index';
// import { config } from '../../src/chart_types/partition_chart/layout/config/config';
// import { indexInterpolatedFillColor, interpolatorCET2s, productLookup } from '../utils/utils';
import { BROWSER_DATA_2019 } from './data';
import { euiPaletteColorBlind } from '../../../../src/services';

import {
  // EUI_CHARTS_THEME_DARK,
  EUI_CHARTS_THEME_LIGHT,
} from '../../../../src/themes/charts/themes';

const theme = EUI_CHARTS_THEME_LIGHT;

export default () => (
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
  </div>
);
