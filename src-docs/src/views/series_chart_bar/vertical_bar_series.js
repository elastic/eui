import React from 'react';

import {
  EuiSeriesChart,
  EuiBarSeries,
  EuiSeriesChartUtils,
} from '../../../../src/experimental';
const { SCALE } = EuiSeriesChartUtils;
const data = [
  { x: 'A', y: 3 },
  { x: 'B', y: 1 },
  { x: 'C', y: 5 },
  { x: 'D', y: 2 },
  { x: 'E', y: 1 },
];

export default () => (
  <EuiSeriesChart width={600} height={200} xType={SCALE.ORDINAL}>
    <EuiBarSeries
      name="Tags"
      data={data}
      onValueClick={singleBarData => {
        console.log({ singleBarData });
      }}
    />
  </EuiSeriesChart>
);
