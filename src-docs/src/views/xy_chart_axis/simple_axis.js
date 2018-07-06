import React from 'react';

import {
  EuiLineSeries,
  EuiXAxis,
  EuiYAxis,
  EuiXYChart,
  EuiXYChartAxisUtils,
  EuiXYChartTextUtils,
} from '../../../../src/components';

const DATA = [{ x: 0, y: 5 }, { x: 1, y: 3 }, { x: 2, y: 2 }, { x: 3, y: 3 }];

function xAxisTickFormatter(value) {
  return EuiXYChartTextUtils.labelWordWrap(`Axis value is ${value}`, 10);
}

export default () => (
  <EuiXYChart width={600} height={200} xPadding={10} yPadding={10} showDefaultAxis={false}>
    <EuiLineSeries name="Total Bytes" data={DATA} />
    <EuiYAxis title="Left Y Axis" tickLabelAngle={45} />
    <EuiYAxis
      title="Right Y Axis"
      orientation={EuiXYChartAxisUtils.ORIENTATION.RIGHT}
      tickLabelAngle={-45}
    />
    <EuiXAxis
      title="Bottom X Axis"
      titlePosition={EuiXYChartAxisUtils.TITLE_POSITION.START}
      tickFormat={xAxisTickFormatter}
    />
    <EuiXAxis
      title="Top X Axis"
      titlePosition={EuiXYChartAxisUtils.TITLE_POSITION.END}
      orientation={EuiXYChartAxisUtils.ORIENTATION.TOP}
      tickLabelAngle={-45}
    />
  </EuiXYChart>
);
