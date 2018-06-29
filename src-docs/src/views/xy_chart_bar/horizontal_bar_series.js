import React from 'react';

import { EuiXYChart, EuiBarSeries, EuiXYChartUtils } from '../../../../src/components';

const { SCALE, ORIENTATION } = EuiXYChartUtils;
const data = [
  { x: 3, y: 'A' },
  { x: 1, y: 'B' },
  { x: 5, y: 'C' },
  { x: 2, y: 'D' },
  { x: 1, y: 'E' },
];
export default () => (
  <EuiXYChart
    width={600}
    height={300}
    yType={SCALE.ORDINAL}
    orientation={ORIENTATION.HORIZONTAL}
  >
    <EuiBarSeries name="Tag counts" data={data} />
  </EuiXYChart>
);
