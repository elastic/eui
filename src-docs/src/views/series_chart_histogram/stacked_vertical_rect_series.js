import React from 'react';

import {
  EuiSeriesChart,
  EuiHistogramSeries,
} from '../../../../src/experimental';

const dataA = [
  { x0: 0, x: 1, y: 1 },
  { x0: 1, x: 2, y: 2 },
  { x0: 2, x: 3, y: 1 },
  { x0: 3, x: 4, y: 1 },
  { x0: 4, x: 5, y: 1 },
];

const dataB = [
  { x0: 0, x: 1, y: 2 },
  { x0: 1, x: 2, y: 1 },
  { x0: 2, x: 3, y: 2 },
  { x0: 3, x: 4, y: 2 },
  { x0: 4, x: 5, y: 2 },
];

export default () => (
  <EuiSeriesChart width={600} height={200} stackBy="y">
    <EuiHistogramSeries name={'Tag A'} data={dataA} />
    <EuiHistogramSeries name={'Tag B'} data={dataB} />
  </EuiSeriesChart>
);
