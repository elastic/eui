import React from 'react';

import { EuiChart, EuiBar, EuiArea, EuiLine } from '../../../../src/components';

export default () => (
  <EuiChart
    width={600}
    height={200}
  >
    <EuiBar name="Users" data={[{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 1 }, { x: 5, y: 2 }]} color={'#db1374'} />
    <EuiArea
      name="Quitters"
      onClick={() => {
        alert('clicked!');
      }}
      data={[{ x: 0, y: 0 }, { x: 1, y: 2 }]}
    />
    <EuiLine name="Winners" title="changeingValue" data={[{ x: 0, y: 0 }, { x: 5, y: 2 }]} />
  </EuiChart>
);
