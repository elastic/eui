import React from 'react';

import { EuiXYChart, EuiVerticalRectSeries } from '../../../../src/components';

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
  <EuiXYChart width={600} height={200} stackBy="y">
    <EuiVerticalRectSeries name={`Tag A`} data={dataA} />
    <EuiVerticalRectSeries name={`Tag B`} data={dataB} />
  </EuiXYChart>
);
