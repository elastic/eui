import React from 'react';
import { mount } from 'enzyme';

import { EuiSeriesChart } from '../series_chart';
import { EuiHorizontalBarSeries } from '../series/horizontal_bar_series';
import { EuiCrosshairY } from './';
import { CrosshairY } from './crosshair_y';
import { requiredProps } from '../../../test/required_props';

describe('EuiCrosshairY', () => {
  test('render the Y crosshair', () => {
    const data = [ { x: 1.5, y: 0 }, { x: 2, y: 1 }];
    const component = mount(
      <EuiSeriesChart
        width={600}
        height={200}
        showDefaultAxis={false}
        showCrosshair={false}
        {...requiredProps}
      >
        <EuiCrosshairY seriesNames={['Test Series']}/>
        <EuiHorizontalBarSeries name="Test Series" data={data} />
      </EuiSeriesChart>
    );
    expect(component.find(EuiCrosshairY)).toHaveLength(1);
    // check if the Crosshair component is empty
    expect(component.find(CrosshairY).children()).toHaveLength(0);
    expect(component.render()).toMatchSnapshot();
    expect(component.find('rect')).toHaveLength(2);

    component.find('rect').at(0).simulate('mousemove', { nativeEvent: { clientX: 100, clientY: 0 } });
    expect(component.find(CrosshairY).children()).toHaveLength(1);
    const crosshair = component.find('.rv-crosshair');
    expect(crosshair).toHaveLength(1);
    expect(crosshair.find('.rv-crosshair__inner__content .rv-crosshair__title__value').text()).toBe('1');
    expect(crosshair.find('.rv-crosshair__inner__content .rv-crosshair__item__value').text()).toBe('2');

    component.find('rect').at(0).simulate('mousemove', { nativeEvent: { clientX: 301, clientY: 100 } });
    expect(crosshair).toHaveLength(1);
    expect(crosshair.find('.rv-crosshair__inner__content .rv-crosshair__title__value').text()).toBe('0');
    expect(crosshair.find('.rv-crosshair__inner__content .rv-crosshair__item__value').text()).toBe('1.5');
  });
});
