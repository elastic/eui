import React from 'react';
import { mount } from 'enzyme';

import { EuiSeriesChart } from '../series_chart';
import { EuiLineSeries } from '../series/line_series';
import { EuiHorizontalGrid } from './';
import { requiredProps } from '../../../test/required_props';

describe('EuiHorizontalGrid', () => {
  test('render the horizontal grid', () => {
    const data = [{ x: 0, y: 1 }, { x: 1, y: 2 }];
    const width = 600;
    const component = mount(
      <EuiSeriesChart
        width={width}
        height={200}
        showDefaultAxis={false}
        {...requiredProps}>
        <EuiHorizontalGrid />
        <EuiLineSeries name="Test Series" data={data} />
      </EuiSeriesChart>
    );
    const horizontalGridComponent = component.find(EuiHorizontalGrid);
    expect(horizontalGridComponent).toHaveLength(1);
    const firstLineProps = horizontalGridComponent
      .find('line')
      .at(0)
      .props();
    expect(firstLineProps.y1).toEqual(firstLineProps.y2);
    expect(firstLineProps.x1).toEqual(0);
    expect(firstLineProps.x2).toEqual(width - 50); // right + left default xychart margin
    expect(component.render()).toMatchSnapshot();
  });
});
