import React from 'react';

import {
  EuiLineSeries,
  EuiXAxis,
  EuiYAxis,
  EuiSeriesChart,
  EuiSeriesChartAxisUtils,
  EuiSeriesChartTextUtils,
} from '../../../../src/experimental';

const DATA = [{ x: 0, y: 5 }, { x: 1, y: 3 }, { x: 2, y: 2 }, { x: 3, y: 3 }];

function xAxisTickFormatter(value) {
  return EuiSeriesChartTextUtils.labelWordWrap(`Axis value is ${value}`, 10);
}

export default () => (
  <EuiSeriesChart
    width={600}
    height={200}
    xPadding={10}
    yPadding={10}
    showDefaultAxis={false}>
    <EuiLineSeries name="Total Bytes" data={DATA} />
    <EuiYAxis title="Left Y Axis" tickLabelAngle={45} />
    <EuiYAxis
      title="Right Y Axis"
      orientation={EuiSeriesChartAxisUtils.ORIENTATION.RIGHT}
      tickLabelAngle={-45}
    />
    <EuiXAxis
      title="Bottom X Axis"
      titlePosition={EuiSeriesChartAxisUtils.TITLE_POSITION.START}
      tickFormat={xAxisTickFormatter}
    />
    <EuiXAxis
      title="Top X Axis"
      titlePosition={EuiSeriesChartAxisUtils.TITLE_POSITION.END}
      orientation={EuiSeriesChartAxisUtils.ORIENTATION.TOP}
      tickLabelAngle={-45}
    />
  </EuiSeriesChart>
);
