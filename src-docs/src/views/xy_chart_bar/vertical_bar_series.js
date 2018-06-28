import React from 'react';

import { EuiXYChart, EuiVerticalBarSeries } from '../../../../src/components';

const data = [
  { x: 'A', y: 3, color: 'red' },
  { x: 'B', y: 1, color: 'red' },
  { x: 'C', y: 5, color: 'red' },
  { x: 'D', y: 2, color: 'red' },
  { x: 'E', y: 1, color: 'red' },
];

export default () => (
  <EuiXYChart width={600} height={200} xType="ordinal">
    <EuiVerticalBarSeries name="Tags" data={data} onValueClick={(data) => { console.log({ data }) }} />
  </EuiXYChart>
);
