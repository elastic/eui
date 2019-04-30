import React from 'react';

import {
  EuiSeriesChart,
  EuiHistogramSeries,
  EuiSeriesChartUtils,
} from '../../../../src/experimental';

const dataA = [
  { y: 0, y0: 1, x: 1 },
  { y: 1, y0: 2, x: 2 },
  { y: 2, y0: 3, x: 3 },
  { y: 3, y0: 4, x: 4 },
  { y: 4, y0: 5, x: 5 },
];

const dataB = [
  { y: 0, y0: 1, x: 5 },
  { y: 1, y0: 2, x: 4 },
  { y: 2, y0: 3, x: 3 },
  { y: 3, y0: 4, x: 2 },
  { y: 4, y0: 5, x: 1 },
];

export default () => (
  <EuiSeriesChart
    width={600}
    height={200}
    stackBy="x"
    orientation={EuiSeriesChartUtils.ORIENTATION.HORIZONTAL}>
    <EuiHistogramSeries name={'Tag A'} data={dataA} stack={true} />
    <EuiHistogramSeries name={'Tag B'} data={dataB} stack={true} />
  </EuiSeriesChart>
);
