import React from 'react';

import {
  EuiXYChart,
  EuiLine,
  EuiXAxis,
  EuiYAxis,
  EuiXYChartAxisUtils,
} from '../../../../src/components';
import { VISUALIZATION_COLORS } from '../../../../src/services';

const DATA_A = [{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 1 }, { x: 5, y: 2 }];
const DATA_B = [{ x: 0, y: 100 }, { x: 1, y: 200 }, { x: 2, y: 150 }, { x: 3, y: 55 }, { x: 5, y: 95 }];
const DATA_C = [{ x: 0, y: 30 }, { x: 1, y: 45 }, { x: 2, y: 67 }, { x: 3, y: 22 }, { x: 5, y: 44 }];

const DATA_A_DOMAIN = [-0.5, 3];
const DATA_B_DOMAIN = [0, 200];
const DATA_C_DOMAIN = [15, 80];

export default () => (
  <EuiXYChart
    width={600}
    height={200}
    xPadding={5}
  >
    <EuiLine
      name="DATA A"
      data={DATA_A}
      yDomain={DATA_A_DOMAIN}
    />
    <EuiLine
      name="DATA B"
      data={DATA_B}
      yDomain={DATA_B_DOMAIN}
    />
    <EuiLine
      name="DATA C"
      data={DATA_C}
      yDomain={DATA_C_DOMAIN}
    />
    <EuiXAxis />
    <EuiYAxis
      orientation={EuiXYChartAxisUtils.ORIENTATION.LEFT}
      yDomain={DATA_A_DOMAIN}
      style={{
        line: {
          stroke: VISUALIZATION_COLORS[0],
        },
      }}
    />
    <EuiYAxis
      orientation={EuiXYChartAxisUtils.ORIENTATION.RIGHT}
      yDomain={DATA_B_DOMAIN}
      style={{
        line: {
          stroke: VISUALIZATION_COLORS[1],
        },
      }}
    />
    <EuiYAxis
      orientation={EuiXYChartAxisUtils.ORIENTATION.RIGHT}
      yDomain={DATA_C_DOMAIN}
      left={650}
      style={{
        line: {
          stroke: VISUALIZATION_COLORS[2],
        },
      }}
    />
  </EuiXYChart>
);
