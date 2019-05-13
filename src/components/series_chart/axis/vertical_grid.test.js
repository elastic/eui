import React from 'react';
import { mount } from 'enzyme';

import { EuiSeriesChart } from '../series_chart';
import { EuiLineSeries } from '../series/line_series';
import { EuiVerticalGrid } from './';
import { requiredProps } from '../../../test/required_props';

describe('EuiVerticalGrid', () => {
  test('render the vertical grid', () => {
    const data = [{ x: 0, y: 1 }, { x: 1, y: 2 }];
    const height = 200;
    const component = mount(
      <EuiSeriesChart
        width={600}
        height={height}
        showDefaultAxis={false}
        {...requiredProps}>
        <EuiVerticalGrid />
        <EuiLineSeries name="Test Series" data={data} />
      </EuiSeriesChart>
    );
    const verticalGridComponent = component.find(EuiVerticalGrid);
    expect(verticalGridComponent).toHaveLength(1);
    const firstLineProps = verticalGridComponent
      .find('line')
      .at(0)
      .props();
    expect(firstLineProps.x1).toEqual(firstLineProps.x2);
    expect(firstLineProps.y1).toEqual(0);
    expect(firstLineProps.y2).toEqual(height - 50); // top + bottom default xychart margin
    expect(component.render()).toMatchSnapshot();
  });
});
