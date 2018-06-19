import React from 'react';

import {
  EuiLine,
  EuiXAxis,
  EuiYAxis,
  EuiXYChart,
  EuiXYChartAxisUtils,
  EuiXYChartTextUtils,
} from '../../../../src/components';

const DATA = [{ x: 0, y: 5 }, { x: 1, y: 3 }, { x: 2, y: 2 }, { x: 3, y: 3 }];

function xAxisTickFormatter(value) {
  return EuiXYChartTextUtils.tspanTextWrapper(['MY VALUE', value]);
}

export default () => (
  <EuiXYChart width={600} height={200} xPadding={10} yPadding={10} showDefaultAxis={false}>
    <EuiLine name="Total Bytes" data={DATA} />
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
      tickLabelAngle={-180}
    />
  </EuiXYChart>
);
