import React from 'react';
import { mount } from 'enzyme';

import { EuiXYChart } from './xy_chart';
import { EuiSelectionBrush } from './selection_brush';
import { EuiVerticalBarSeries } from './series';

const NOOP = () => {};

describe('EuiSelectionBrush', () => {

  test(`renders an horizontal selection brush`, () => {
    const data = [{ x: 0, y: 2 }, { x: 1, y: 4 }];
    const component = mount(
      <EuiXYChart
        width={600}
        height={200}
        showDefaultAxis={false}
        showCrosshair={false}
        enableSelectionBrush={true}
        onSelectionBrushEnd={NOOP}
      >
        <EuiVerticalBarSeries name="series" data={data} />
      </EuiXYChart>
    );
    let selectionBrush = component.find(EuiSelectionBrush);
    expect(selectionBrush.exists()).toBe(true);
    component.find('svg').at(0).simulate('mousemove', { nativeEvent: { offsetX: 50, offsetY: 50 } });
    component.find('svg').at(0).simulate('mousedown', { nativeEvent: { offsetX: 50, offsetY: 50 } });
    component.find('svg').at(0).simulate('mousemove', { nativeEvent: { offsetX: 100, offsetY: 100 } });
    selectionBrush = component.find(EuiSelectionBrush);

    expect(selectionBrush).toMatchSnapshot();
    expect(selectionBrush.find('rect').at(0).props().x).toBe(50);
    expect(selectionBrush.find('rect').at(0).props().y).toBe(0);
    expect(selectionBrush.find('rect').at(0).props().width).toBe(50);
    expect(selectionBrush.find('rect').at(0).props().height).toBe(200);
    component.find('svg').at(0).simulate('mouseup', { nativeEvent: { offsetX: 100, offsetY: 100 } });
    selectionBrush = component.find(EuiSelectionBrush);
    expect(selectionBrush.find('rect').at(0).props().x).toBe(0);
    expect(selectionBrush.find('rect').at(0).props().y).toBe(0);
    expect(selectionBrush.find('rect').at(0).props().width).toBe(0);
    expect(selectionBrush.find('rect').at(0).props().height).toBe(0);

  });
});
