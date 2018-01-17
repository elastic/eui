import React from 'react';

import { EuiChart, EuiBar, EuiArea, EuiLine } from '../../../../src/components';

export default () => (
  <EuiChart
    onHover={() => {
      console.log('hover');
    }}
    onMouseLeave={() => {
      console.log('mouse leave');
    }}
    onSelectEnd={area => {
      alert('selection ended with an area :) Check console to see it');
      console.log(area);
    }}
    width={600}
    height={200}
    xTicks={[[0, 'zero'], [1, 'one mark'], [2, 'two marks'], [3, 'three marks'], [4, 'four marks'], [5, 'five marks']]}
    yTicks={[[0, 'zero'], [1, 'one mark'], [2, 'two marks']]}
  >
    <EuiBar name="Users" data={[{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 1 }, { x: 5, y: 2 }]} color={'#db1374'} />
    <EuiArea
      name="Quitters"
      onClick={() => {
        alert('clicked!');
      }}
      data={[{ x: 0, y: 0 }, { x: 1, y: 2 }]}
      color={'#db1374'}
    />
    <EuiLine name="Winners" title="changeingValue" color={'#db1374'} data={[{ x: 0, y: 0 }, { x: 5, y: 2 }]} />
  </EuiChart>
);
