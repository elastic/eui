import React from 'react';
import { mount } from 'enzyme';

import { EuiSeriesChart } from '../series_chart';
import { EuiVerticalBarSeries } from '../series/vertical_bar_series';
import { EuiCrosshairX } from './';
import { requiredProps } from '../../../test/required_props';
import { Crosshair } from 'react-vis';
import { EuiHistogramSeries } from '../series';
import { EuiSeriesChartUtils } from '../utils';

const { SCALE } = EuiSeriesChartUtils;

describe('EuiCrosshairX', () => {
  test('render the X crosshair', () => {
    const data = [ { x: 0, y: 1.5 }, { x: 1, y: 2 }];
    const component = mount(
      <EuiSeriesChart
        width={600}
        height={200}
        showDefaultAxis={false}
        showCrosshair={false}
        {...requiredProps}
      >
        <EuiCrosshairX seriesNames={['Test Series']} />
        <EuiVerticalBarSeries name="Test Series" data={data} />
      </EuiSeriesChart>
    );
    expect(component.find(EuiCrosshairX)).toHaveLength(1);
    // check if the Crosshair component is empty
    expect(component.find(Crosshair).children()).toHaveLength(0);
    expect(component.render()).toMatchSnapshot();
    expect(component.find('rect')).toHaveLength(2);

    component.find('rect').at(0).simulate('mousemove', { nativeEvent: { clientX: 50, clientY: 100 } });
    expect(component.find(Crosshair).children()).toHaveLength(1);
    const crosshair = component.find('.rv-crosshair');
    expect(crosshair).toHaveLength(1);
    expect(crosshair.find('.rv-crosshair__inner__content .rv-crosshair__title__value').text()).toBe('0');
    expect(crosshair.find('.rv-crosshair__inner__content .rv-crosshair__item__value').text()).toBe('1.5');

    component.find('rect').at(0).simulate('mousemove', { nativeEvent: { clientX: 351, clientY: 100 } });
    expect(crosshair).toHaveLength(1);
    expect(crosshair.find('.rv-crosshair__inner__content .rv-crosshair__title__value').text()).toBe('1');
    expect(crosshair.find('.rv-crosshair__inner__content .rv-crosshair__item__value').text()).toBe('2');
  });

  test('x crosshair formats ISO string by default', () => {
    const data = [ { x0: 1074188586000, x: 1074199386000, y: 1.5 }, { x0: 1074199386000, x: 1074210186000, y: 2 }];
    const component = mount(
      <EuiSeriesChart
        width={600}
        height={200}
        {...requiredProps}
        xType={SCALE.TIME}
      >
        <EuiHistogramSeries name="Test Series" data={data} />
      </EuiSeriesChart>
    );
    component.find('rect').at(0).simulate('mousemove', { nativeEvent: { clientX: 351, clientY: 100 } });
    const crosshair = component.find('.rv-crosshair');
    expect(crosshair).toHaveLength(1);
    expect(crosshair.text()).toContain('2004-01-15T20:43:06.000Z to 2004-01-15T23:43:06.000Z');
    expect(component.render()).toMatchSnapshot();
  });

  test('x crosshair adheres to custom formatting', () => {
    const data = [ { x0: 1074188586000, x: 1074199386000, y: 1.5 }, { x0: 1074199386000, x: 1074210186000, y: 2 }];
    const component = mount(
      <EuiSeriesChart
        width={600}
        height={200}
        {...requiredProps}
        xType={SCALE.TIME}
        xCrosshairFormat="YYYY-MM-DD hh:mmZ"
      >
        <EuiHistogramSeries name="Test Series" data={data} />
      </EuiSeriesChart>
    );
    component.find('rect').at(0).simulate('mousemove', { nativeEvent: { clientX: 351, clientY: 100 } });
    const crosshair = component.find('.rv-crosshair');
    expect(crosshair).toHaveLength(1);
    expect(crosshair.text()).toContain('2004-01-15 03:43-05:00 to 2004-01-15 06:43-05:00');
    expect(component.render()).toMatchSnapshot();
  });
});
