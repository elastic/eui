import React from 'react';

import {
  EuiSeriesChart,
  EuiAreaSeries,
  EuiLineSeries,
} from '../../../../src/experimental';

const LINE_DATA = new Array(100)
  .fill(0)
  .map((d, i) => ({ x: i, y: Math.random() * 2 + 8 }));
const AREA_DATA = LINE_DATA.map(({ x, y }) => ({
  x,
  y0: y - Math.random() - 2,
  y: y + Math.random() + 2,
}));

export default () => (
  <EuiSeriesChart width={600} height={200}>
    <EuiAreaSeries name="Users" data={AREA_DATA} />
    <EuiLineSeries name="mean" data={LINE_DATA} />
  </EuiSeriesChart>
);
