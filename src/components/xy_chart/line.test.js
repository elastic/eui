import React from 'react';
import { mount, render } from 'enzyme';
import { patchRandom } from '../../test/patch_random';
import { benchmarkFunction } from '../../test/time_execution';

import EuiXYChart from './chart';
import EuiLine from './line';

describe('EuiLine', () => {
  test('is rendered', () => {
    const unpatchRandom = patchRandom();

    const component = mount(
      <EuiXYChart width={600} height={200}>
        <EuiLine
          data={[{ x: 0, y: 5 }, { x: 1, y: 15 }]}
        />
      </EuiXYChart>
    );

    expect(component).toMatchSnapshot();

    unpatchRandom();
  });

  test('all props are rendered', () => {
    const unpatchRandom = patchRandom();

    const component = mount(
      <EuiXYChart width={600} height={200}>
        <EuiLine
          data={[{ x: 0, y: 5 }, { x: 1, y: 15 }]}
          name="test-chart"
          color="#ff0000"
          curve="curveCatmullRom"
          hasLineMarks={true}
          lineMarkColor="#00ff00"
          lineMarkSize={13}
          onClick={() => {}}
          onMarkClick={() => {}}
        />
      </EuiXYChart>
    );

    expect(component).toMatchSnapshot();

    unpatchRandom();
  });


  describe('performance', () => {
    it('renders 1000 items in under 1 second', () => {
      const yTicks = [[0, 'zero'], [1, 'one']];
      const xTicks = [
        [0, '0'],
        [250, '250'],
        [500, '500'],
        [750, '750'],
        [1000, '1000']
      ];
      const data = [];

      for (let i = 0; i < 1000; i++) {
        data.push({ x: i, y: Math.random() });
      }

      function renderChart() {
        render(
          <EuiChart width={600} height={200} yTicks={yTicks} xTicks={xTicks}>
            <EuiLine data={data}/>
          </EuiChart>
        )
      }

      const runtime = benchmarkFunction(renderChart);
      expect(runtime).toBeLessThan(1000);
    });

    it('renders 30 lines of 500 items in under 3 seconds', () => {
      const yTicks = [[0, 'zero'], [1, 'one']];
      const xTicks = [
        [0, '0'],
        [125, '125'],
        [250, '240'],
        [375, '375'],
        [500, '500']
      ];

      const linesData = [];
      for (let i = 0; i < 30; i++) {
        const data = [];

        for (let i = 0; i < 500; i++) {
          data.push({ x: i, y: Math.random() });
        }

        linesData.push(data);
      }

      function renderChart() {
        render(
          <EuiChart width={600} height={200} yTicks={yTicks} xTicks={xTicks}>
            {linesData.map((data, index) => (
              <EuiLine key={index} data={data}/>
            ))}
          </EuiChart>
        )
      }

      const runtime = benchmarkFunction(renderChart);
      expect(runtime).toBeLessThan(3000);
    });
  });
});
