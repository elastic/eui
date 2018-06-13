import React from 'react';

import {
  EuiXYChart,
  EuiVerticalBarSeries,
  EuiDefaultAxis,
} from '../../../../src/components';

export default () => (
  <EuiXYChart
    width={600}
    height={200}
  >
    <EuiVerticalBarSeries name="Users" data={[{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 1 }, { x: 5, y: 2 }]} color={'#db1374'} />
    <EuiDefaultAxis />
  </EuiXYChart>
);
