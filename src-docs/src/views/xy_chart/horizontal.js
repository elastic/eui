import React from 'react';

import {
  EuiXYChart,
  EuiAreaSeries,
  EuiLineSeries,
  EuiXYChartUtils,
} from '../../../../src/components';
const { ORIENTATION } = EuiXYChartUtils;

const data = new Array(80).fill(0).map((d, i) => {
  const data = {
    y: i,
    y0: i,
    x: Number((Math.random() * 4 + 4).toFixed(2)),
    x0: 0,
  };
  return data;
});

export default function () {
  return (
    <EuiXYChart
      width={600}
      height={600}
      orientation={ORIENTATION.HORIZONTAL}
      animateData={false}
    >
      <EuiAreaSeries
        name="Quitters"
        data={data}
      />
      <EuiLineSeries
        name="Quitters"
        data={data}
      />
    </EuiXYChart>
  );
}
