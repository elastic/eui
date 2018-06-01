import React from 'react';

import { EuiXYChart, EuiVerticalBarSeries } from '../../../../src/components';

const data = [
  { x: 'A', y: 3 },
  { x: 'B', y: 1 },
  { x: 'C', y: 5 },
  { x: 'D', y: 2 },
  { x: 'E', y: 1 },
]

export default () => (
  <EuiXYChart
    width={600}
    height={200}
    xType="ordinal"
  >
    <EuiVerticalBarSeries
      name="Tags"
      data={data}
    />
  </EuiXYChart>
);
