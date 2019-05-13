import React from 'react';
import {
  EuiSeriesChart,
  EuiHistogramSeries,
  EuiSeriesChartUtils,
} from '../../../../src/experimental';

const { SCALE } = EuiSeriesChartUtils;
let timeseriesX = Date.now();
const HOUR = 1000 * 60 * 60;

const histogramData = new Array(1000).fill(0).map(() => {
  const x0 = timeseriesX;
  timeseriesX += HOUR;
  const x = timeseriesX;
  const y = Math.floor(Math.random() * 100);
  return { x0, x, y };
});

export const FormatCrosshairTimesExample = () => (
  <div>
    <EuiSeriesChart
      xCrosshairFormat="YYYY-MM-DD hh:mmZ"
      height={200}
      xType={SCALE.TIME}>
      <EuiHistogramSeries
        yDomain={[0, 100]}
        name="Chart Name"
        data={histogramData}
      />
    </EuiSeriesChart>
  </div>
);
