import React from 'react';
import { mount } from 'enzyme';
import moment from 'moment';
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
    const data = [{ x: 0, y: 1.5 }, { x: 1, y: 2 }];
    const component = mount(
      <EuiSeriesChart
        width={600}
        height={200}
        showDefaultAxis={false}
        showCrosshair={false}
        {...requiredProps}>
        <EuiCrosshairX seriesNames={['Test Series']} />
        <EuiVerticalBarSeries name="Test Series" data={data} />
      </EuiSeriesChart>
    );
    expect(component.find(EuiCrosshairX)).toHaveLength(1);
    // check if the Crosshair component is empty
    expect(component.find(Crosshair).children()).toHaveLength(0);
    expect(component.render()).toMatchSnapshot();
    expect(component.find('rect')).toHaveLength(2);

    component
      .find('rect')
      .at(0)
      .simulate('mousemove', { nativeEvent: { clientX: 50, clientY: 100 } });
    expect(component.find(Crosshair).children()).toHaveLength(1);
    const crosshair = component.find('.rv-crosshair');
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

    component
      .find('rect')
      .at(0)
      .simulate('mousemove', { nativeEvent: { clientX: 351, clientY: 100 } });
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
  });

  test('x crosshair formats ISO string by default', () => {
    const openRange = 1074199386000;
    const closeRange = 1074210186000;
    const data = [
      { x0: 1074188586000, x: openRange, y: 1.5 },
      { x0: 1074199386000, x: closeRange, y: 2 },
    ];
    const startRangeString = new Date(openRange).toISOString();
    const endRangeString = new Date(closeRange).toISOString();
    const component = mount(
      <EuiSeriesChart
        width={600}
        height={200}
        {...requiredProps}
        xType={SCALE.TIME}>
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

  test('x crosshair adheres to custom formatting', () => {
    const openRange = 1074199386000;
    const closeRange = 1074210186000;
    const data = [
      { x0: 1074188586000, x: openRange, y: 1.5 },
      { x0: 1074199386000, x: closeRange, y: 2 },
    ];
    const momentFormat = 'YYYY-MM-DD hh:mmZ';
    const startRangeString = moment(openRange).format(momentFormat);
    const endRangeString = moment(closeRange).format(momentFormat);
    const component = mount(
      <EuiSeriesChart
        width={600}
        height={200}
        {...requiredProps}
        xType={SCALE.TIME}
        xCrosshairFormat={momentFormat}>
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
