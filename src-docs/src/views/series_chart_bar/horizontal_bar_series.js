import React from 'react';

import {
  EuiSeriesChart,
  EuiBarSeries,
  EuiSeriesChartUtils,
} from '../../../../src/experimental';

const { SCALE, ORIENTATION } = EuiSeriesChartUtils;
const data = [
  { x: 3, y: 'A' },
  { x: 1, y: 'B' },
  { x: 5, y: 'C' },
  { x: 2, y: 'D' },
  { x: 1, y: 'E' },
];
export default () => (
  <EuiSeriesChart
    width={600}
    height={300}
    yType={SCALE.ORDINAL}
    orientation={ORIENTATION.HORIZONTAL}>
    <EuiBarSeries name="Tag counts" data={data} />
  </EuiSeriesChart>
);
