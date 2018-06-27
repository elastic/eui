import React from 'react';
import { mount } from 'enzyme';

import { EuiXYChart } from './xy_chart';
import { EuiSelectionBrush } from './selection_brush';
import { EuiVerticalBarSeries } from './series';
import { ORIENTATION, SCALE_TYPE } from './utils/chart_utils';

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
  test(`renders an vertical selection brush`, () => {
    const data = [{ x: 0, y: 2 }, { x: 1, y: 4 }];
    const component = mount(
      <EuiXYChart
        width={600}
        height={200}
        showDefaultAxis={false}
        showCrosshair={false}
        selectionBrushOrientation={ORIENTATION.VERTICAL}
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
    expect(selectionBrush.find('rect').at(0).props().x).toBe(0);
    expect(selectionBrush.find('rect').at(0).props().y).toBe(50);
    expect(selectionBrush.find('rect').at(0).props().width).toBe(600);
    expect(selectionBrush.find('rect').at(0).props().height).toBe(50);
    component.find('svg').at(0).simulate('mouseup', { nativeEvent: { offsetX: 100, offsetY: 100 } });
    selectionBrush = component.find(EuiSelectionBrush);
    expect(selectionBrush.find('rect').at(0).props().x).toBe(0);
    expect(selectionBrush.find('rect').at(0).props().y).toBe(0);
    expect(selectionBrush.find('rect').at(0).props().width).toBe(0);
    expect(selectionBrush.find('rect').at(0).props().height).toBe(0);
  });
  test(`renders free form selection brush`, () => {
    const data = [{ x: 0, y: 2 }, { x: 1, y: 4 }];
    const component = mount(
      <EuiXYChart
        width={600}
        height={200}
        showDefaultAxis={false}
        showCrosshair={false}
        selectionBrushOrientation={ORIENTATION.BOTH}
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
    expect(selectionBrush.find('rect').at(0).props().y).toBe(50);
    expect(selectionBrush.find('rect').at(0).props().width).toBe(50);
    expect(selectionBrush.find('rect').at(0).props().height).toBe(50);
    component.find('svg').at(0).simulate('mouseup', { nativeEvent: { offsetX: 100, offsetY: 100 } });
    selectionBrush = component.find(EuiSelectionBrush);
    expect(selectionBrush.find('rect').at(0).props().x).toBe(0);
    expect(selectionBrush.find('rect').at(0).props().y).toBe(0);
    expect(selectionBrush.find('rect').at(0).props().width).toBe(0);
    expect(selectionBrush.find('rect').at(0).props().height).toBe(0);
  });
  test(`get onSelectionBrushEnd call on linear x scale`, () => {
    const data = [{ x: 0, y: 2 }, { x: 1, y: 4 }];
    const onSelectionBrushEndMock = jest.fn();
    const component = mount(
      <EuiXYChart
        width={600}
        height={200}
        showDefaultAxis={false}
        showCrosshair={false}
        selectionBrushOrientation={ORIENTATION.VERTICAL}
        enableSelectionBrush={true}
        onSelectionBrushEnd={onSelectionBrushEndMock}
        xType={SCALE_TYPE.LINEAR}
      >
        <EuiVerticalBarSeries name="series" data={data} />
      </EuiXYChart>
    );
    let selectionBrush = component.find(EuiSelectionBrush);
    expect(selectionBrush.exists()).toBe(true);
    component.find('svg').at(0).simulate('mousemove', { nativeEvent: { offsetX: 50, offsetY: 50 } });
    component.find('svg').at(0).simulate('mousedown', { nativeEvent: { offsetX: 50, offsetY: 50 } });
    component.find('svg').at(0).simulate('mousemove', { nativeEvent: { offsetX: 100, offsetY: 100 } });
    component.find('svg').at(0).simulate('mouseup', { nativeEvent: { offsetX: 100, offsetY: 100 } });
    selectionBrush = component.find(EuiSelectionBrush);
    expect(onSelectionBrushEndMock.mock.calls.length).toBe(1);
    const expectedBrush = {
      domainArea: {
        startX: -0.5,
        endX: 1.5,
        startY: 2,
        endY: 3,
      },
      drawArea: {
        x0: 0,
        x1: 600,
        y0: 50,
        y1: 100,
      }
    };
    expect(onSelectionBrushEndMock.mock.calls[0][0]).toEqual(expectedBrush)
  });
  test.skip(`get onSelectionBrushEnd call on ordinal x scale`, () => {
    const data = [{ x: 0, y: 2 }, { x: 1, y: 4 }];
    const onSelectionBrushEndMock = jest.fn();
    const component = mount(
      <EuiXYChart
        width={600}
        height={200}
        showDefaultAxis={false}
        showCrosshair={false}
        selectionBrushOrientation={ORIENTATION.VERTICAL}
        enableSelectionBrush={true}
        onSelectionBrushEnd={onSelectionBrushEndMock}
        xType={SCALE_TYPE.ORDINAL}
      >
        <EuiVerticalBarSeries name="series" data={data} />
      </EuiXYChart>
    );
    let selectionBrush = component.find(EuiSelectionBrush);
    expect(selectionBrush.exists()).toBe(true);
    component.find('svg').at(0).simulate('mousemove', { nativeEvent: { offsetX: 50, offsetY: 50 } });
    component.find('svg').at(0).simulate('mousedown', { nativeEvent: { offsetX: 50, offsetY: 50 } });
    component.find('svg').at(0).simulate('mousemove', { nativeEvent: { offsetX: 100, offsetY: 100 } });
    component.find('svg').at(0).simulate('mouseup', { nativeEvent: { offsetX: 100, offsetY: 100 } });
    selectionBrush = component.find(EuiSelectionBrush);
    expect(onSelectionBrushEndMock.mock.calls.length).toBe(1);
    const expectedBrush = {
      // TODO update the domain in respect to ordinal scale
      domainArea: {
        startX: -0.5,
        endX: 1.5,
        startY: 2,
        endY: 3,
      },
      drawArea: {
        x0: 0,
        x1: 600,
        y0: 50,
        y1: 100,
      }
    };
    expect(onSelectionBrushEndMock.mock.calls[0][0]).toEqual(expectedBrush)
  });
});
