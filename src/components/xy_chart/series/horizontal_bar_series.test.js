import React from 'react';
import { render, mount } from 'enzyme';
import { patchRandom, unpatchRandom } from '../../../test/patch_random';
import { requiredProps } from '../../../test/required_props';

import { EuiXYChart } from '../xy_chart';
import { EuiHorizontalBarSeries } from './horizontal_bar_series';

beforeEach(patchRandom);
afterEach(unpatchRandom);

describe('EuiHorizontalBarSeries', () => {
  test('is rendered', () => {
    const component = mount(
      <EuiXYChart width={600} height={200} {...requiredProps}>
        <EuiHorizontalBarSeries
          name="test-chart"
          data={[{ x: 0, y: 5 }, { x: 1, y: 15 }]}
        />
      </EuiXYChart>
    );

    expect(component.find('.rv-xy-plot__series')).toHaveLength(1);

    const rects = component.find('.rv-xy-plot__series--bar rect')
    expect(rects).toHaveLength(2);

    const firstRectProps = rects.at(0).props()
    expect(firstRectProps.x).toBeDefined()
    expect(firstRectProps.y).toBeDefined()
    expect(firstRectProps.width).toBeDefined()
    expect(firstRectProps.height).toBeDefined()

    const secondRectProps = rects.at(1).props()
    expect(secondRectProps.x).toBeDefined()
    expect(secondRectProps.y).toBeDefined()
    expect(secondRectProps.width).toBeDefined()
    expect(secondRectProps.height).toBeDefined()

    expect(component.render()).toMatchSnapshot();
  });

  test('all props are rendered', () => {
    const component = render(
      <EuiXYChart width={600} height={200}>
        <EuiHorizontalBarSeries
          name="test-chart"
          data={[{ x: 0, y: 5 }, { x: 1, y: 15 }]}
          color="#ff0000"
          onClick={() => {}}
        />
      </EuiXYChart>
    );

    expect(component).toMatchSnapshot();
  });

  test('renders stacked bar chart', () => {
    const component = render(
      <EuiXYChart
        width={600}
        height={200}
        xType="ordinal"
        stackBy="y"
      >
        <EuiHorizontalBarSeries
          name="test-series-a"
          data={[{ x: 0, y: 5 }, { x: 1, y: 3 }]}
          color="#ff0000"
          onClick={() => {}}
        />
        <EuiHorizontalBarSeries
          name="test-series-b"
          data={[{ x: 0, y: 2 }, { x: 1, y: 7 }]}
          color="#00ff00"
          onClick={() => {}}
        />
      </EuiXYChart>
    );
    expect(component.find('.rv-xy-plot__series')).toHaveLength(2);
    expect(component.find('.rv-xy-plot__series--bar rect')).toHaveLength(4);
    expect(component).toMatchSnapshot();
  });
});
