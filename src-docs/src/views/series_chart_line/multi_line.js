import React from 'react';

import { EuiSeriesChart, EuiLineSeries } from '../../../../src/experimental';

const DATA_A = [
  { x: 0, y: 1 },
  { x: 1.5, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: -1 },
  { x: 5, y: 2 },
];
const DATA_B = [
  { x: 0, y: 3 },
  { x: 1, y: 4 },
  { x: 2, y: 1 },
  { x: 3, y: 2 },
  { x: 5, y: 5 },
];

export default () => (
  <EuiSeriesChart width={600} height={200}>
    <EuiLineSeries name="Total RAM" data={DATA_A} />
    <EuiLineSeries name="Total ROM" data={DATA_B} />
  </EuiSeriesChart>
);
