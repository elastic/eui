import React from 'react';
import { render } from 'enzyme';
import { patchRandom, unpatchRandom } from '../../test/patch_random';
import { requiredProps } from '../../test/required_props';

import EuiXYChart from './chart';
import EuiVerticalRectSeries from './vertical_rect_series';
import { benchmarkFunction } from '../../test/time_execution';

beforeEach(patchRandom);
afterEach(unpatchRandom);

describe('EuiVerticalRectSeries', () => {
  test('is rendered', () => {
    const component = render(
      <EuiXYChart width={600} height={200} {...requiredProps}>
        <EuiVerticalRectSeries
          name="test-chart"
          data={[{ x: 0, y: 5 }, { x: 1, y: 15 }]}
        />
      </EuiXYChart>
    );

    expect(component).toMatchSnapshot();
  });

  test('all props are rendered', () => {
    const component = render(
      <EuiXYChart width={600} height={200}>
        <EuiVerticalRectSeries
          name="test-chart"
          data={[{ x: 0, y: 5 }, { x: 1, y: 15 }]}
          color="#ff0000"
          onClick={() => {}}
        />
      </EuiXYChart>
    );

    expect(component).toMatchSnapshot();
  });

  test('renders stacked vertical histogram', () => {
    const component = render(
      <EuiXYChart
        width={600}
        height={200}
        xType="ordinal"
        stackBy="y"
      >
        <EuiVerticalRectSeries
          name="test-series-a"
          data={[{ x: 0, y: 5 }, { x: 1, y: 3 }]}
          color="#ff0000"
          onClick={() => {}}
        />
        <EuiVerticalRectSeries
          name="test-series-b"
          data={[{ x: 0, y: 2 }, { x: 1, y: 7 }]}
          color="#00ff00"
          onClick={() => {}}
        />
      </EuiXYChart>
    );

    expect(component).toMatchSnapshot();
  });

  describe('performance', () => {
    it.skip('renders 1000 items in under 0.5 seconds', () => {
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
          <EuiXYChart width={600} height={200} yTicks={yTicks} xTicks={xTicks}>
            <EuiVerticalRectSeries name="barchart" data={data}/>
          </EuiXYChart>
        )
      }

      const runtime = benchmarkFunction(renderChart);
      // as of 2018-05-011 / git 00cfbb94d2fcb08aeeed2bb8f4ed0b94eb08307b
      // this is ~9ms on a MacBookPro
      expect(runtime).toBeLessThan(500);
    });

    it.skip('renders 30 lines of 500 items in under 3 seconds', () => {
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
          <EuiXYChart width={600} height={200} yTicks={yTicks} xTicks={xTicks}>
            {linesData.map((data, index) => (
              <EuiVerticalRectSeries key={index} name={`barchart-${index}`} data={data}/>
            ))}
          </EuiXYChart>
        )
      }

      const runtime = benchmarkFunction(renderChart);
      // as of 2018-05-011 / git 00cfbb94d2fcb08aeeed2bb8f4ed0b94eb08307b
      // this is ~1750 on a MacBookPro
      expect(runtime).toBeLessThan(3000);
    });
  });
});
