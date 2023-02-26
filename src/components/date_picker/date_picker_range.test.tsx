/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, mount } from 'enzyme';
import moment from 'moment';

import { requiredProps } from '../../test';
import {
  EuiDatePickerRange,
  EuiDatePickerRangeValue,
} from './date_picker_range';
import { EuiDatePicker } from './date_picker';

describe('EuiDatePickerRange', () => {
  it('is rendered', () => {
    const component = render(
      <EuiDatePickerRange
        startDateControl={<EuiDatePicker />}
        endDateControl={<EuiDatePicker />}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  describe('readOnly', () => {
    it('is rendered', () => {
      const component = render(
        <EuiDatePickerRange
          startDateControl={<EuiDatePicker />}
          endDateControl={<EuiDatePicker />}
          readOnly
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('disabled', () => {
    it('is rendered', () => {
      const component = render(
        <EuiDatePickerRange
          startDateControl={<EuiDatePicker />}
          endDateControl={<EuiDatePicker />}
          disabled
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('isInvalid', () => {
    it('is rendered', () => {
      const component = render(
        <EuiDatePickerRange
          startDateControl={<EuiDatePicker />}
          endDateControl={<EuiDatePicker />}
          isInvalid
        />
      );

      expect(component).toMatchSnapshot();
    });
  });

  it('uses individual EuiDatePicker props', () => {
    const component = render(
      <EuiDatePickerRange
        startDateControl={<EuiDatePicker className="hello" />}
        endDateControl={<EuiDatePicker className="world" />}
        {...requiredProps}
      />
    );

    expect(component).toMatchSnapshot();
  });

  it('calls blur and focus handlers for date pickers while also triggering range control handlers', () => {
    const rangeControlOnBlurMock = jest.fn();
    const rangeControlOnFocusMock = jest.fn();
    const startControlOnBlurMock = jest.fn();
    const startControlOnFocusMock = jest.fn();
    const endControlOnBlurMock = jest.fn();
    const endControlOnFocusMock = jest.fn();

    const component = mount(
      <EuiDatePickerRange
        onBlur={rangeControlOnBlurMock}
        onFocus={rangeControlOnFocusMock}
        startDateControl={
          <EuiDatePicker
            onBlur={startControlOnBlurMock}
            onFocus={startControlOnFocusMock}
          />
        }
        endDateControl={
          <EuiDatePicker
            onBlur={endControlOnBlurMock}
            onFocus={endControlOnFocusMock}
          />
        }
      />
    );

    const startControl = component.find('EuiDatePicker').at(0);
    const endControl = component.find('EuiDatePicker').at(1);

    startControl.props().onFocus?.({} as React.FocusEvent);
    expect(startControlOnFocusMock).toHaveBeenCalledTimes(1);
    expect(rangeControlOnFocusMock).toHaveBeenCalledTimes(1);

    startControl.props().onBlur?.({} as React.FocusEvent);
    expect(startControlOnBlurMock).toHaveBeenCalledTimes(1);
    expect(rangeControlOnBlurMock).toHaveBeenCalledTimes(1);

    endControl.props().onFocus?.({} as React.FocusEvent);
    expect(endControlOnFocusMock).toHaveBeenCalledTimes(1);
    expect(rangeControlOnFocusMock).toHaveBeenCalledTimes(2);

    endControl.props().onBlur?.({} as React.FocusEvent);
    expect(endControlOnBlurMock).toHaveBeenCalledTimes(1);
    expect(rangeControlOnBlurMock).toHaveBeenCalledTimes(2);
  });

  it('calls onChange handlers for date pickers while also triggering range control handlers', () => {
    const rangeControlOnChangeMock = jest.fn();
    const startControlOnChangeMock = jest.fn();
    const endControlOnChangeMock = jest.fn();

    const component = mount(
      <EuiDatePickerRange
        onChange={rangeControlOnChangeMock}
        startDateControl={<EuiDatePicker onChange={startControlOnChangeMock} />}
        endDateControl={<EuiDatePicker onChange={endControlOnChangeMock} />}
      />
    );

    const startControl = component.find(EuiDatePicker).at(0);
    const endControl = component.find(EuiDatePicker).at(1);

    act(() => {
      startControl.props().onChange?.(moment());
    });

    expect(startControlOnChangeMock).toHaveBeenCalledTimes(1);
    expect(rangeControlOnChangeMock).toHaveBeenCalledTimes(1);

    act(() => {
      endControl.props().onChange?.(moment());
    });

    expect(endControlOnChangeMock).toHaveBeenCalledTimes(1);
    expect(rangeControlOnChangeMock).toHaveBeenCalledTimes(2);
  });

  it('updates start and end date picker values when value prop changes', () => {
    const value: EuiDatePickerRangeValue = {
      startDate: moment([2023, 1, 1]),
      endDate: moment([2023, 2, 1]),
    };

    const component = mount(
      <EuiDatePickerRange
        value={value}
        startDateControl={<EuiDatePicker />}
        endDateControl={<EuiDatePicker />}
      />
    );

    let controls = component.find(EuiDatePicker);
    expect(controls.at(0).props().selected).toEqual(value.startDate);
    expect(controls.at(1).props().selected).toEqual(value.endDate);

    value.startDate = moment([2023, 2, 1]);
    value.endDate = moment([2023, 2, 10]);
    component.setProps({ value });

    controls = component.find(EuiDatePicker);
    expect(controls.at(0).props().selected).toEqual(value.startDate);
    expect(controls.at(1).props().selected).toEqual(value.endDate);
  });

  it('renders the ARIA description element when non-custom controls are used', () => {
    const value: EuiDatePickerRangeValue = {
      startDate: moment([2023, 1, 1]),
      endDate: moment([2023, 1, 10]),
    };

    const component = mount(
      <EuiDatePickerRange
        value={value}
        startDateControl={<EuiDatePicker />}
        endDateControl={<EuiDatePicker />}
      />
    );

    const controls = component.find(EuiDatePicker);
    expect(controls.at(0).props()).toHaveProperty('aria-describedby');
    const describedById = controls.at(0).props()['aria-describedby'];
    expect(describedById).toEqual(controls.at(1).props()['aria-describedby']);

    expect(component.find(`#${describedById}`)).toMatchSnapshot();
  });
});
