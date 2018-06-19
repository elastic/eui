import React from 'react';

import {
  EuiXYChart,
  EuiHorizontalBarSeries,
  EuiDefaultAxis,
  EuiXYChartUtils,
} from '../../../../src/components';

const data = [
  { x: 3, y: 'A' },
  { x: 1, y: 'B' },
  { x: 5, y: 'C' },
  { x: 2, y: 'D' },
  { x: 1, y: 'E' },
];
export default () => (
  <EuiXYChart
    width={600}
    height={200}
    yType="ordinal"
    crosshairOrientation={EuiXYChartUtils.ORIENTATION.HORIZONTAL}
  >
    <EuiHorizontalBarSeries name="Tag counts" data={data} />
    <EuiDefaultAxis isHorizontal={true} />
  </EuiXYChart>
);
