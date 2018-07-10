import React from 'react';

import {
  EuiXYChart,
  EuiLineSeries,
} from '../../../../src/experimental';

const DATA_A = [
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: -1 },
  { x: 4, y: null },
  { x: 5, y: 2 },
];

export default () => (
  <EuiXYChart width={600} height={200}>
    <EuiLineSeries name="Total Bytes" data={DATA_A} />
  </EuiXYChart>
);
