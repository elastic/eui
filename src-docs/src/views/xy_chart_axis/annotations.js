import React from 'react';

import {
  EuiXYChart,
  EuiLineSeries,
  EuiLineAnnotation,
  EuiXYChartUtils,
  EuiXYChartAxisUtils,
} from '../../../../src/components';

const DATA_A = [
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: -1 },
  { x: 4, y: null },
  { x: 5, y: 2 },
];

export default () => (
  <EuiXYChart width={600} height={200}>
    <EuiLineSeries name="Total Bytes" data={DATA_A} />
    <EuiLineAnnotation
      data={[{ value: 0.5, text: 'Start' }]}
      textPosition={EuiXYChartAxisUtils.TITLE_POSITION.START}
    />
    <EuiLineAnnotation
      data={[{ value: 1, text: 'Middle' }]}
      textPosition={EuiXYChartAxisUtils.TITLE_POSITION.MIDDLE}
    />
    <EuiLineAnnotation
      data={[{ value: 1.5, text: 'End' }]}
      textPosition={EuiXYChartAxisUtils.TITLE_POSITION.END}
    />
    <EuiLineAnnotation
      data={[{ value: -0.5, text: 'Start' }]}
      textPosition={EuiXYChartAxisUtils.TITLE_POSITION.START}
      orientation={EuiXYChartUtils.ORIENTATION.HORIZONTAL}
    />
    <EuiLineAnnotation
      data={[{ value: 0.5, text: 'Middle' }]}
      textPosition={EuiXYChartAxisUtils.TITLE_POSITION.MIDDLE}
      orientation={EuiXYChartUtils.ORIENTATION.HORIZONTAL}
    />
    <EuiLineAnnotation
      data={[{ value: 1.5, text: 'End' }]}
      textPosition={EuiXYChartAxisUtils.TITLE_POSITION.END}
      orientation={EuiXYChartUtils.ORIENTATION.HORIZONTAL}
    />
  </EuiXYChart>
);
