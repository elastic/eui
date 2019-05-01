import React from 'react';
import { mount, render } from 'enzyme';
import { patchRandom, unpatchRandom } from '../../../test/patch_random';
import { benchmarkFunction } from '../../../test/time_execution';
import { requiredProps } from '../../../test/required_props';

import { EuiSeriesChart } from '../series_chart';
import { EuiLineSeries } from './line_series';
import { VISUALIZATION_COLORS } from '../../../services';

beforeEach(patchRandom);
afterEach(unpatchRandom);

describe('EuiLineSeries', () => {
  test('is rendered', () => {
    const component = mount(
      <EuiSeriesChart width={600} height={200} {...requiredProps}>
        <EuiLineSeries name="test" data={[{ x: 0, y: 5 }, { x: 1, y: 15 }]} />
      </EuiSeriesChart>
    );

    expect(component).toMatchSnapshot();
  });

  test('all props are rendered', () => {
    const component = mount(
      <EuiSeriesChart width={600} height={200}>
        <EuiLineSeries
          data={[{ x: 0, y: 5 }, { x: 1, y: 15 }]}
          name="test-chart"
          color={VISUALIZATION_COLORS[2]}
          curve="curveCatmullRom"
          hasLineMarks={true}
          lineMarkColor="#00ff00"
          lineMarkSize={13}
          onSeriesClick={() => {}}
          onValueClick={() => {}}
        />
      </EuiSeriesChart>
    );

    expect(component).toMatchSnapshot();
  });

  test('call onValueClick and onSeriesClick', () => {
    const data = [{ x: 0, y: 5 }, { x: 1, y: 3 }];
    const onValueClick = jest.fn();
    const onSeriesClick = jest.fn();
    const component = mount(
      <EuiSeriesChart width={600} height={200}>
        <EuiLineSeries
          name="test-series-a"
          data={data}
          color={VISUALIZATION_COLORS[2]}
          onValueClick={onValueClick}
          onSeriesClick={onSeriesClick}
          showLineMarks={true}
        />
      </EuiSeriesChart>
    );
    component
      .find('path')
      .at(0)
      .simulate('click');
    expect(onSeriesClick.mock.calls).toHaveLength(1);
    component
      .find('circle')
      .at(0)
      .simulate('click');
    expect(onValueClick.mock.calls).toHaveLength(1);
    expect(onValueClick.mock.calls[0][0]).toEqual(data[0]);
    // check if onSeriesClick is fired after clicking on marker
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
            <EuiLineSeries name="test" data={data} />
          </EuiSeriesChart>
        );
      }

      const runtime = benchmarkFunction(renderChart);
      // as of 2018-05-011 / git 00cfbb94d2fcb08aeeed2bb8f4ed0b94eb08307b
      // this is ~120ms on a MacBookPro
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
              <EuiLineSeries name="test" key={index} data={data} />
            ))}
          </EuiSeriesChart>
        );
      }

      const runtime = benchmarkFunction(renderChart);
      // as of 2018-05-011 / git 00cfbb94d2fcb08aeeed2bb8f4ed0b94eb08307b
      // this is ~1700ms on a MacBookPro
      expect(runtime).toBeLessThan(3000);
    });
  });
});
