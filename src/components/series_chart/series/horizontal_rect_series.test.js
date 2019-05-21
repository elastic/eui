import React from 'react';
import { render, mount } from 'enzyme';
import { patchRandom, unpatchRandom } from '../../../test/patch_random';
import { requiredProps } from '../../../test/required_props';

import { EuiSeriesChart } from '../series_chart';
import { EuiHorizontalRectSeries } from './horizontal_rect_series';
import { VISUALIZATION_COLORS } from '../../../services';

beforeEach(patchRandom);
afterEach(unpatchRandom);

describe('EuiHorizontalRectSeries', () => {
  test('is rendered', () => {
    const component = mount(
      <EuiSeriesChart width={600} height={200} {...requiredProps}>
        <EuiHorizontalRectSeries
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
        <EuiHorizontalRectSeries
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
        <EuiHorizontalRectSeries
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

  test('renders stacked bar chart', () => {
    const component = render(
      <EuiSeriesChart width={600} height={200} xType="ordinal" stackBy="y">
        <EuiHorizontalRectSeries
          name="test-series-a"
          data={[{ x: 0, y: 5 }, { x: 1, y: 3 }]}
          color={VISUALIZATION_COLORS[2]}
          onSeriesClick={() => {}}
        />
        <EuiHorizontalRectSeries
          name="test-series-b"
          data={[{ x: 0, y: 2 }, { x: 1, y: 7 }]}
          color={VISUALIZATION_COLORS[1]}
          onSeriesClick={() => {}}
        />
      </EuiSeriesChart>
    );
    expect(component.find('.rv-xy-plot__series')).toHaveLength(2);
    expect(component.find('.rv-xy-plot__series--rect rect')).toHaveLength(4);
    expect(component).toMatchSnapshot();
  });
});
