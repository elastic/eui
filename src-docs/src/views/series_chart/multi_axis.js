import React from 'react';

import {
  EuiSeriesChart,
  EuiLineSeries,
  EuiXAxis,
  EuiYAxis,
  EuiSeriesChartAxisUtils,
} from '../../../../src/experimental';
import { VISUALIZATION_COLORS } from '../../../../src/services';

const DATA_A = [
  { x: 'A', y: 0 },
  { x: 'B', y: 1 },
  { x: 'C', y: 2 },
  { x: 'D', y: 1 },
  { x: 'E', y: 2 },
];
const DATA_B = [
  { x: 'A', y: 100 },
  { x: 'B', y: 100 },
  { x: 'C', y: 150 },
  { x: 'D', y: 55 },
  { x: 'E', y: 95 },
];
const DATA_C = [
  { x: 'A', y: 30 },
  { x: 'B', y: 45 },
  { x: 'C', y: 67 },
  { x: 'D', y: 22 },
  { x: 'E', y: 44 },
];

const DATA_A_DOMAIN = [-0.5, 3];
const DATA_B_DOMAIN = [0, 200];
const DATA_C_DOMAIN = [15, 80];

export default () => (
  <EuiSeriesChart
    width={600}
    height={200}
    xPadding={5}
    xType="ordinal"
    showDefaultAxis={false}>
    <EuiLineSeries name="DATA A" data={DATA_A} yDomain={DATA_A_DOMAIN} />
    <EuiLineSeries name="DATA B" data={DATA_B} yDomain={DATA_B_DOMAIN} />
    <EuiLineSeries name="DATA C" data={DATA_C} yDomain={DATA_C_DOMAIN} />
    <EuiXAxis />
    <EuiYAxis
      orientation={EuiSeriesChartAxisUtils.ORIENTATION.LEFT}
      yDomain={DATA_A_DOMAIN}
      style={{
        line: {
          stroke: VISUALIZATION_COLORS[0],
        },
      }}
    />
    <EuiYAxis
      orientation={EuiSeriesChartAxisUtils.ORIENTATION.RIGHT}
      yDomain={DATA_B_DOMAIN}
      style={{
        line: {
          stroke: VISUALIZATION_COLORS[1],
        },
      }}
    />
    <EuiYAxis
      orientation={EuiSeriesChartAxisUtils.ORIENTATION.RIGHT}
      yDomain={DATA_C_DOMAIN}
      left={650}
      style={{
        line: {
          stroke: VISUALIZATION_COLORS[2],
        },
      }}
    />
  </EuiSeriesChart>
);
