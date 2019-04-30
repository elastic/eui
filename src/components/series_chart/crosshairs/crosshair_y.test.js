import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
import { EuiSeriesChart } from '../series_chart';
import { EuiHorizontalBarSeries } from '../series/horizontal_bar_series';
import { EuiCrosshairY } from './';
import { CrosshairY } from './crosshair_y';
import { requiredProps } from '../../../test/required_props';
import { EuiHistogramSeries } from '../series';
import { EuiSeriesChartUtils } from '../utils';

const { SCALE } = EuiSeriesChartUtils;

describe('EuiCrosshairY', () => {
  test('render the Y crosshair', () => {
    const data = [{ x: 1.5, y: 0 }, { x: 2, y: 1 }];
    const component = mount(
      <EuiSeriesChart
        width={600}
        height={200}
        showDefaultAxis={false}
        showCrosshair={false}
        {...requiredProps}>
        <EuiCrosshairY seriesNames={['Test Series']} />
        <EuiHorizontalBarSeries name="Test Series" data={data} />
      </EuiSeriesChart>
    );
    expect(component.find(EuiCrosshairY)).toHaveLength(1);
    // check if the Crosshair component is empty
    expect(component.find(CrosshairY).children()).toHaveLength(0);
    expect(component.render()).toMatchSnapshot();
    expect(component.find('rect')).toHaveLength(2);

    component
      .find('rect')
      .at(0)
      .simulate('mousemove', { nativeEvent: { clientX: 100, clientY: 0 } });
    expect(component.find(CrosshairY).children()).toHaveLength(1);
    const crosshair = component.find('.rv-crosshair');
    expect(crosshair).toHaveLength(1);
    expect(
      crosshair
        .find('.rv-crosshair__inner__content .rv-crosshair__title__value')
        .text()
    ).toBe('1');
    expect(
      crosshair
        .find('.rv-crosshair__inner__content .rv-crosshair__item__value')
        .text()
    ).toBe('2');

    component
      .find('rect')
      .at(0)
      .simulate('mousemove', { nativeEvent: { clientX: 301, clientY: 100 } });
    expect(crosshair).toHaveLength(1);
    expect(
      crosshair
        .find('.rv-crosshair__inner__content .rv-crosshair__title__value')
        .text()
    ).toBe('0');
    expect(
      crosshair
        .find('.rv-crosshair__inner__content .rv-crosshair__item__value')
        .text()
    ).toBe('1.5');
  });

  test('y crosshair formats ISO string by default', () => {
    const openRange = 1074188586000;
    const closeRange = 1074199386000;
    const data = [
      { y0: openRange, y: 1074199386000, x: 1.5 },
      { y0: closeRange, y: 1074210186000, x: 2 },
    ];
    const startRangeString = new Date(openRange).toISOString();
    const endRangeString = new Date(closeRange).toISOString();
    const component = mount(
      <EuiSeriesChart
        width={600}
        height={200}
        {...requiredProps}
        stackBy="x"
        yType={SCALE.TIME}
        orientation={EuiSeriesChartUtils.ORIENTATION.HORIZONTAL}>
        <EuiHistogramSeries name="Test Series" data={data} />
      </EuiSeriesChart>
    );
    component
      .find('rect')
      .at(0)
      .simulate('mousemove', { nativeEvent: { clientX: 351, clientY: 100 } });
    const crosshair = component.find('.rv-crosshair');
    expect(crosshair).toHaveLength(1);
    expect(crosshair.text()).toContain(
      `${startRangeString} to ${endRangeString}`
    );
  });

  test('y crosshair formats ISO string by default', () => {
    const openRange = 1074188586000;
    const closeRange = 1074199386000;
    const data = [
      { y0: openRange, y: 1074199386000, x: 1.5 },
      { y0: closeRange, y: 1074210186000, x: 2 },
    ];
    const momentFormat = 'YYYY-MM-DD hh:mmZ';
    const startRangeString = moment(openRange).format(momentFormat);
    const endRangeString = moment(closeRange).format(momentFormat);
    const component = mount(
      <EuiSeriesChart
        width={600}
        height={200}
        {...requiredProps}
        stackBy="x"
        yType={SCALE.TIME}
        yCrosshairFormat={momentFormat}
        orientation={EuiSeriesChartUtils.ORIENTATION.HORIZONTAL}>
        <EuiHistogramSeries name="Test Series" data={data} />
      </EuiSeriesChart>
    );
    component
      .find('rect')
      .at(0)
      .simulate('mousemove', { nativeEvent: { clientX: 351, clientY: 100 } });
    const crosshair = component.find('.rv-crosshair');
    expect(crosshair).toHaveLength(1);
    expect(crosshair.text()).toContain(
      `${startRangeString} to ${endRangeString}`
    );
  });
});
