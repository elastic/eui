import React from 'react';

import { EuiChart, EuiBar } from '../../../../src/components';

export default () => (
  <EuiChart
    width={600}
    height={200}
  >
    <EuiBar name="Users" data={[{ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 1 }, { x: 5, y: 2 }]} color={'#db1374'} />
  </EuiChart>
);
