import React from 'react';
import { mount } from 'enzyme';

import { EuiSeriesChart } from '../series_chart';
import { EuiLineSeries } from '../series/line_series';
import {
  EuiDefaultAxis,
  EuiXAxis,
  EuiYAxis,
  EuiVerticalGrid,
  EuiHorizontalGrid,
} from './';
import { requiredProps } from '../../../test/required_props';
import { ORIENTATION } from '../utils/chart_utils';

describe('EuiDefaultAxis', () => {
  test('render default axis', () => {
    const data = [{ x: 0, y: 1 }, { x: 1, y: 2 }];
    const component = mount(
      <EuiSeriesChart width={600} height={200} {...requiredProps}>
        <EuiLineSeries name="Test Series" data={data} />
      </EuiSeriesChart>
    );
    expect(component.find(EuiDefaultAxis)).toHaveLength(1);
    expect(component.find(EuiXAxis)).toHaveLength(1);
    expect(component.find(EuiYAxis)).toHaveLength(1);
    expect(component.find(EuiHorizontalGrid)).toHaveLength(1);
    expect(component.find(EuiVerticalGrid)).toHaveLength(0);
    expect(component.render()).toMatchSnapshot();
  });
  test('render rotated 90deg default axis', () => {
    const data = [{ x: 0, y: 1 }, { x: 1, y: 2 }];
    const component = mount(
      <EuiSeriesChart
        width={600}
        height={200}
        orientation={ORIENTATION.HORIZONTAL}
        {...requiredProps}>
        <EuiLineSeries name="Test Series" data={data} />
      </EuiSeriesChart>
    );
    expect(component.find(EuiDefaultAxis)).toHaveLength(1);
    expect(component.find(EuiVerticalGrid)).toHaveLength(1);
    expect(component.find(EuiHorizontalGrid)).toHaveLength(0);
    expect(component.render()).toMatchSnapshot();
  });
});
