import React from 'react';

import { EuiXYChart, EuiBar, EuiArea, EuiLine } from '../../../../src/components';

export default () => {
  const yTicks = [[0, 'zero'], [1, 'one']];
  const xTicks = [
    [0, '0'],
    [5, '5'],
    [10, '10'],
    [15, '15'],
    [200, '200']
  ];

  const barData = [];
  for (let i = 0; i < 10; i++) {
    const data = [];

    for (let i = 0; i < 100; i++) {
      data.push({ x: i, y: Math.random() });
    }

    barData.push(data);
  }

  return (
    <EuiXYChart
      onSelectEnd={area => {
        alert('selection ended with an area :) Check console to see it');
        console.log(area);
      }}
      width={600}
      height={200}
      xTicks={xTicks}
      yTicks={yTicks}
    >
      <EuiLine 
        name="Avg Winners" 
        data={[{ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }, { x: 3, y: 1 }, { x: 5, y: 2 }]} 
        color={'#db1374'} 
      />
      <EuiArea
        name="Quitters"
        onClick={() => {
          alert('clicked!');
        }}
        data={[{ x: 0, y: 0 }, { x: 1, y: 2 }, { x: 2, y: 1 }, { x: 3, y: 2 },{ x: 4, y: 1 }, { x: 10, y: 1 }, { x: 20, y: 2 } ]}
      />
      {barData.map((data, index) => (
        <EuiBar name={`User-${index}`} hasLineMarks={false} key={index} data={data}/>
      ))}
    </EuiXYChart>
  )
}