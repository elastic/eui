import React from 'react';

import { EuiSeriesChart, EuiAreaSeries } from '../../../../src/experimental';

const dataA = [
  { x: 0, y: 3 },
  { x: 1, y: 2 },
  { x: 2, y: 1 },
  { x: 3, y: 2 },
  { x: 4, y: 3 },
];

const dataB = [
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 2, y: 4 },
  { x: 3, y: 1 },
  { x: 4, y: 1 },
];

export default () => (
  <EuiSeriesChart width={600} height={200} stackBy="y">
    <EuiAreaSeries name="Tag A" data={dataA} />
    <EuiAreaSeries name="Tag B" data={dataB} />
  </EuiSeriesChart>
);
