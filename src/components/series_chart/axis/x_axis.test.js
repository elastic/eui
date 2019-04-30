import React from 'react';
import { mount } from 'enzyme';

import { EuiSeriesChart } from '../series_chart';
import { EuiLineSeries } from '../series/line_series';
import { EuiXAxis } from './';
import { requiredProps } from '../../../test/required_props';

describe('EuiXAxis', () => {
  test('render the x axis', () => {
    const data = [{ x: 0, y: 1 }, { x: 1, y: 2 }];
    const height = 200;
    const component = mount(
      <EuiSeriesChart
        width={600}
        height={height}
        showDefaultAxis={false}
        {...requiredProps}>
        <EuiXAxis />
        <EuiLineSeries name="Test Series" data={data} />
      </EuiSeriesChart>
    );
    expect(component.find(EuiXAxis)).toHaveLength(1);
    expect(component.render()).toMatchSnapshot();
  });
});
