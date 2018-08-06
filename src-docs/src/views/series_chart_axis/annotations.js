import React from 'react';

import {
  EuiSeriesChart,
  EuiLineSeries,
  EuiLineAnnotation,
  EuiSeriesChartUtils,
  EuiSeriesChartAxisUtils,
} from '../../../../src/experimental';

const DATA_A = [
  { x: 0, y: 1 },
  { x: 1, y: 1 },
  { x: 2, y: 2 },
  { x: 3, y: -1 },
  { x: 4, y: null },
  { x: 5, y: 2 },
];

export default () => (
  <EuiSeriesChart width={600} height={200}>
    <EuiLineSeries name="Total Bytes" data={DATA_A} />
    <EuiLineAnnotation
      data={[{ value: 0.5, text: 'Start' }]}
      textPosition={EuiSeriesChartAxisUtils.TITLE_POSITION.START}
    />
    <EuiLineAnnotation
      data={[{ value: 1, text: 'Middle' }]}
      textPosition={EuiSeriesChartAxisUtils.TITLE_POSITION.MIDDLE}
    />
    <EuiLineAnnotation
      data={[{ value: 1.5, text: 'End' }]}
      textPosition={EuiSeriesChartAxisUtils.TITLE_POSITION.END}
    />
    <EuiLineAnnotation
      data={[{ value: -0.5, text: 'Start' }]}
      textPosition={EuiSeriesChartAxisUtils.TITLE_POSITION.START}
      orientation={EuiSeriesChartUtils.ORIENTATION.HORIZONTAL}
    />
    <EuiLineAnnotation
      data={[{ value: 0.5, text: 'Middle' }]}
      textPosition={EuiSeriesChartAxisUtils.TITLE_POSITION.MIDDLE}
      orientation={EuiSeriesChartUtils.ORIENTATION.HORIZONTAL}
    />
    <EuiLineAnnotation
      data={[{ value: 1.5, text: 'End' }]}
      textPosition={EuiSeriesChartAxisUtils.TITLE_POSITION.END}
      orientation={EuiSeriesChartUtils.ORIENTATION.HORIZONTAL}
    />
  </EuiSeriesChart>
);
