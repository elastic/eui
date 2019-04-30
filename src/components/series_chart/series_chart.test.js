import React from 'react';
import { mount } from 'enzyme';

import { EuiSeriesChart } from './series_chart';
import { EuiLineSeries } from './series/line_series';
import { EuiDefaultAxis } from './axis';
import { EuiCrosshairX, EuiCrosshairY } from './crosshairs/';
import { requiredProps } from '../../test/required_props';
import { VISUALIZATION_COLORS } from '../../services';

const NOOP = f => f;

export const XYCHART_PROPS = {
  width: 1,
  height: 1,
  orientation: 'vertical',
  animateData: true,
  stackBy: 'y',
  xType: 'linear',
  yType: 'linear',
  xDomain: [0, 1],
  yDomain: [0, 1],
  xPadding: 0,
  yPadding: 0,
  statusText: '',
  showCrosshair: true,
  crosshairValue: 0,
  onCrosshairUpdate: NOOP,
  showDefaultAxis: true,
  enableSelectionBrush: true,
  selectionBrushOrientation: 'vertical',
  onSelectionBrushEnd: NOOP,
};

describe('EuiSeriesChart', () => {
  test('renders all props', () => {
    const wrapper = mount(
      <EuiSeriesChart {...XYCHART_PROPS} {...requiredProps} />
    );
    const wrapperProps = wrapper.props();

    expect(wrapper.find(EuiSeriesChart).length).toBe(1);
    Object.keys(XYCHART_PROPS).forEach(propName => {
      expect(wrapperProps[propName]).toBe(XYCHART_PROPS[propName]);
    });
  });

  test('renders an empty chart', () => {
    const EMPTY_CHART_MESSAGE = '~~Empty Chart~~';
    const component = mount(
      <EuiSeriesChart
        width={600}
        height={200}
        statusText={EMPTY_CHART_MESSAGE}
        {...requiredProps}
      />
    );

    expect(
      component
        .render()
        .find('.euiText')
        .text()
    ).toBe(EMPTY_CHART_MESSAGE);
    expect(component.find(EuiDefaultAxis)).toHaveLength(0);
    expect(component.find(EuiCrosshairX)).toHaveLength(0);
    expect(component.find(EuiCrosshairY)).toHaveLength(0);
    expect(component.render()).toMatchSnapshot();
  });

  test('renders right default colors', () => {
    const data = [{ x: 0, y: 1 }, { x: 1, y: 2 }];
    const series = new Array(VISUALIZATION_COLORS.length * 2)
      .fill(0)
      .map((color, i) => {
        return { name: `series-${i}`, data };
      });
    const component = mount(
      <EuiSeriesChart width={600} height={200} {...requiredProps}>
        {series.map((d, i) => (
          <EuiLineSeries key={`series-a-${i}`} {...d} />
        ))}
      </EuiSeriesChart>
    );

    expect(component.find(EuiLineSeries)).toHaveLength(
      VISUALIZATION_COLORS.length * 2
    );
    VISUALIZATION_COLORS.forEach((color, i) => {
      expect(
        component
          .find(EuiLineSeries)
          .at(i)
          .props().color
      ).toBe(color);
      expect(
        component
          .find(EuiLineSeries)
          .at(i + VISUALIZATION_COLORS.length)
          .props().color
      ).toBe(color);
    });
  });

  test('renders default colors together with existing series colors', () => {
    const data = [{ x: 0, y: 1 }, { x: 1, y: 2 }];
    const AVAILABLE_COLORS = VISUALIZATION_COLORS.length;
    const series = new Array(AVAILABLE_COLORS * 2).fill(0).map((color, i) => {
      return { name: `series-${i}`, data };
    });
    series.splice(1, 0, {
      name: 'series-colored',
      data,
      color: VISUALIZATION_COLORS[5],
    });

    const component = mount(
      <EuiSeriesChart width={600} height={200} {...requiredProps}>
        {series.map((d, i) => (
          <EuiLineSeries key={`series-a-${i}`} {...d} />
        ))}
      </EuiSeriesChart>
    );
    const lineComponents = component.find(EuiLineSeries);
    expect(lineComponents).toHaveLength(AVAILABLE_COLORS * 2 + 1);
    // check before
    expect(lineComponents.at(0).props().color).toBe(VISUALIZATION_COLORS[0]);
    // check if the inserted element maintain its own color
    expect(lineComponents.at(1).props().color).toBe(VISUALIZATION_COLORS[5]);
    // check if the skip maintain the color assignment
    expect(lineComponents.at(2).props().color).toBe(VISUALIZATION_COLORS[1]);
    expect(lineComponents.at(AVAILABLE_COLORS + 1).props().color).toBe(
      VISUALIZATION_COLORS[0]
    );
  });
});
