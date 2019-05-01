import React from 'react';

import {
  EuiSeriesChart,
  EuiHistogramSeries,
  EuiSeriesChartUtils,
} from '../../../../src/experimental';

const data = [
  { x: 3, y: 0, y0: 1 },
  { x: 1, y: 1, y0: 2 },
  { x: 5, y: 2, y0: 3 },
  { x: 2, y: 3, y0: 4 },
  { x: 1, y: 4, y0: 5 },
];
export default () => (
  <EuiSeriesChart
    width={600}
    height={200}
    orientation={EuiSeriesChartUtils.ORIENTATION.HORIZONTAL}>
    <EuiHistogramSeries name="Bytes" data={data} />
  </EuiSeriesChart>
);
