import React from 'react';

import {
  EuiSeriesChart,
  EuiAreaSeries,
  EuiLineSeries,
  EuiSeriesChartUtils,
} from '../../../../src/experimental';
const { ORIENTATION } = EuiSeriesChartUtils;

const data = new Array(80).fill(0).map((d, i) => {
  const data = {
    y: i,
    y0: i,
    x: Number((Math.random() * 4 + 4).toFixed(2)),
    x0: 0,
  };
  return data;
});

export default function() {
  return (
    <EuiSeriesChart
      width={600}
      height={600}
      orientation={ORIENTATION.HORIZONTAL}
      animateData={false}>
      <EuiAreaSeries name="Quitters" data={data} />
      <EuiLineSeries name="Quitters" data={data} />
    </EuiSeriesChart>
  );
}
