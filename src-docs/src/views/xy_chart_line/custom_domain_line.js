import React from 'react';

import { EuiXYChart, EuiLineSeries } from '../../../../src/experimental';

const X_DOMAIN = [-1, 6];
const Y_DOMAIN = [0, 3];

const DATA_A = [{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 1 }, { x: 5, y: 2 }];

export default () => (
  <EuiXYChart width={600} height={200} yDomain={Y_DOMAIN} xDomain={X_DOMAIN}>
    <EuiLineSeries name="Total Bytes" data={DATA_A} />
  </EuiXYChart>
);
