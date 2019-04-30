import React from 'react';
import { mount, render } from 'enzyme';
import { patchRandom, unpatchRandom } from '../../../test/patch_random';
import { requiredProps } from '../../../test/required_props';

import { EuiSeriesChart } from '../series_chart';
import { EuiAreaSeries } from './area_series';
import { CURVE } from '../utils/chart_utils';
import { benchmarkFunction } from '../../../test/time_execution';
import { VISUALIZATION_COLORS } from '../../../services';

beforeEach(patchRandom);
afterEach(unpatchRandom);

const AREA_SERIES_PROPS = {
  name: 'name',
  data: [{ x: 0, y: 5 }, { x: 1, y: 10 }],
  color: VISUALIZATION_COLORS[0],
  curve: CURVE.NATURAL,
  onSeriesClick: jest.fn(),
};

describe('EuiAreaSeries', () => {
  test('all props are rendered', () => {
    const component = mount(
      <EuiSeriesChart width={600} height={200} {...requiredProps}>
        <EuiAreaSeries {...AREA_SERIES_PROPS} />
      </EuiSeriesChart>
    );

    expect(component).toMatchSnapshot();
  });

  test('call onSeriesClick', () => {
    const data = [{ x: 0, y: 5 }, { x: 1, y: 3 }];
    const onSeriesClick = jest.fn();
    const component = mount(
      <EuiSeriesChart width={600} height={200}>
        <EuiAreaSeries
          name="test-series-a"
          data={data}
          color={VISUALIZATION_COLORS[2]}
          onSeriesClick={onSeriesClick}
        />
      </EuiSeriesChart>
    );
    component
      .find('path')
      .at(0)
      .simulate('click');
    expect(onSeriesClick.mock.calls).toHaveLength(1);
  });

  describe('performance', () => {
    it.skip('renders 1000 items in under 1 second', () => {
      const yTicks = [[0, 'zero'], [1, 'one']];
      const xTicks = [
        [0, '0'],
        [250, '250'],
        [500, '500'],
        [750, '750'],
        [1000, '1000'],
      ];
      const data = [];

      for (let i = 0; i < 1000; i++) {
        data.push({ x: i, y: Math.random() });
      }

      function renderChart() {
        render(
          <EuiSeriesChart
            width={600}
            height={200}
            yTicks={yTicks}
            xTicks={xTicks}>
            <EuiAreaSeries name="somename" data={data} />
          </EuiSeriesChart>
        );
      }

      const runtime = benchmarkFunction(renderChart);
      // as of 2018-05-011 / git 00cfbb94d2fcb08aeeed2bb8f4ed0b94eb08307b
      // this is ~150ms on a MacBookPro
      expect(runtime).toBeLessThan(1000);
    });

    it.skip('renders 30 lines of 500 items in under 3 seconds', () => {
      const yTicks = [[0, 'zero'], [1, 'one']];
      const xTicks = [
        [0, '0'],
        [125, '125'],
        [250, '240'],
        [375, '375'],
        [500, '500'],
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
          <EuiSeriesChart
            width={600}
            height={200}
            yTicks={yTicks}
            xTicks={xTicks}>
            {linesData.map((data, index) => (
              <EuiAreaSeries
                name={`somename-${index}`}
                key={index}
                data={data}
              />
            ))}
          </EuiSeriesChart>
        );
      }

      const runtime = benchmarkFunction(renderChart);
      // as of 2018-05-011 / git 00cfbb94d2fcb08aeeed2bb8f4ed0b94eb08307b
      // this is ~2150 on a MacBookPro
      expect(runtime).toBeLessThan(3000);
    });
  });
});
