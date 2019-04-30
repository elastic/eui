import React from 'react';
import { render, mount } from 'enzyme';
import { patchRandom, unpatchRandom } from '../../../test/patch_random';
import { requiredProps } from '../../../test/required_props';

import { EuiSeriesChart } from '../series_chart';
import { EuiVerticalRectSeries } from './vertical_rect_series';
import { benchmarkFunction } from '../../../test/time_execution';
import { VISUALIZATION_COLORS } from '../../../services';

beforeEach(patchRandom);
afterEach(unpatchRandom);

describe('EuiVerticalRectSeries', () => {
  test('is rendered', () => {
    const component = mount(
      <EuiSeriesChart width={600} height={200} {...requiredProps}>
        <EuiVerticalRectSeries
          name="test-chart"
          data={[{ x: 0, y: 5 }, { x: 1, y: 15 }]}
        />
      </EuiSeriesChart>
    );

    expect(component.find('.rv-xy-plot__series')).toHaveLength(1);

    const rects = component.find('.rv-xy-plot__series--rect rect');
    expect(rects).toHaveLength(2);

    const firstRectProps = rects.at(0).props();
    expect(firstRectProps.x).toBeDefined();
    expect(firstRectProps.y).toBeDefined();
    expect(firstRectProps.width).toBeDefined();
    expect(firstRectProps.height).toBeDefined();

    const secondRectProps = rects.at(1).props();
    expect(secondRectProps.x).toBeDefined();
    expect(secondRectProps.y).toBeDefined();
    expect(secondRectProps.width).toBeDefined();
    expect(secondRectProps.height).toBeDefined();

    expect(component.render()).toMatchSnapshot();
  });

  test('all props are rendered', () => {
    const component = render(
      <EuiSeriesChart width={600} height={200}>
        <EuiVerticalRectSeries
          name="test-chart"
          data={[{ x: 0, y: 5 }, { x: 1, y: 15 }]}
          color={VISUALIZATION_COLORS[2]}
          onSeriesClick={() => {}}
        />
      </EuiSeriesChart>
    );

    expect(component).toMatchSnapshot();
  });

  test('call onValueClick', () => {
    const data = [{ x: 0, y: 5 }, { x: 1, y: 3 }];
    const onValueClick = jest.fn();
    const component = mount(
      <EuiSeriesChart width={600} height={200}>
        <EuiVerticalRectSeries
          name="test-series-a"
          data={data}
          color={VISUALIZATION_COLORS[2]}
          onValueClick={onValueClick}
        />
      </EuiSeriesChart>
    );
    component
      .find('rect')
      .at(0)
      .simulate('click');
    expect(onValueClick.mock.calls).toHaveLength(1);
    expect(onValueClick.mock.calls[0][0]).toEqual(data[0]);
  });

  test('renders stacked vertical histogram', () => {
    const component = render(
      <EuiSeriesChart width={600} height={200} xType="ordinal" stackBy="y">
        <EuiVerticalRectSeries
          name="test-series-a"
          data={[{ x: 0, y: 5 }, { x: 1, y: 3 }]}
          color={VISUALIZATION_COLORS[2]}
          onValueClick={() => {}}
        />
        <EuiVerticalRectSeries
          name="test-series-b"
          data={[{ x: 0, y: 2 }, { x: 1, y: 7 }]}
          color={VISUALIZATION_COLORS[1]}
          onValueClick={() => {}}
        />
      </EuiSeriesChart>
    );
    expect(component.find('.rv-xy-plot__series')).toHaveLength(2);
    expect(component.find('.rv-xy-plot__series--rect rect')).toHaveLength(4);

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
            <EuiVerticalRectSeries name="barchart" data={data} />
          </EuiSeriesChart>
        );
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
              <EuiVerticalRectSeries
                key={index}
                name={`barchart-${index}`}
                data={data}
              />
            ))}
          </EuiSeriesChart>
        );
      }

      const runtime = benchmarkFunction(renderChart);
      // as of 2018-05-011 / git 00cfbb94d2fcb08aeeed2bb8f4ed0b94eb08307b
      // this is ~1750 on a MacBookPro
      expect(runtime).toBeLessThan(3000);
    });
  });
});
