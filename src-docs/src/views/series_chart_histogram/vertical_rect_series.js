import React from 'react';

import {
  EuiSeriesChart,
  EuiHistogramSeries,
} from '../../../../src/experimental';

const data = [
  { x0: 0, x: 1, y: 1 },
  { x0: 1, x: 2, y: 3 },
  { x0: 2, x: 3, y: 2 },
  { x0: 3, x: 4, y: 0.5 },
  { x0: 4, x: 5, y: 5 },
];

export default () => (
  <EuiSeriesChart width={600} height={200}>
    <EuiHistogramSeries name="Bytes" data={data} />
  </EuiSeriesChart>
);
