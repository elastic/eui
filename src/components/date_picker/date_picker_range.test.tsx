/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render, mount } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiDatePickerRange } from './date_picker_range';
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

  describe('props', () => {
    test('fullWidth', () => {
      const component = render(
        <EuiDatePickerRange
          startDateControl={<EuiDatePicker />}
          endDateControl={<EuiDatePicker />}
          fullWidth
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('readOnly', () => {
      const component = render(
        <EuiDatePickerRange
          startDateControl={<EuiDatePicker />}
          endDateControl={<EuiDatePicker />}
          readOnly
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('disabled', () => {
      const component = render(
        <EuiDatePickerRange
          startDateControl={<EuiDatePicker />}
          endDateControl={<EuiDatePicker />}
          disabled
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('isInvalid', () => {
      const component = render(
        <EuiDatePickerRange
          startDateControl={<EuiDatePicker />}
          endDateControl={<EuiDatePicker />}
          isInvalid
        />
      );

      expect(component).toMatchSnapshot();
    });

    test('isLoading', () => {
      const component = render(
        <EuiDatePickerRange
          startDateControl={<EuiDatePicker />}
          endDateControl={<EuiDatePicker />}
          isLoading
        />
      );

      expect(component).toMatchSnapshot();
    });

    describe('inline', () => {
      it('renders', () => {
        const component = render(
          <EuiDatePickerRange
            startDateControl={<EuiDatePicker />}
            endDateControl={<EuiDatePicker />}
            inline
            // All of the below props should be ignored/not render when `inline`
            iconType={true}
            fullWidth
            prepend="test"
            append="test"
          />
        );

        expect(component).toMatchSnapshot();
      });

      it('allows turning off the default shadow', () => {
        const component = render(
          <EuiDatePickerRange
            startDateControl={<EuiDatePicker />}
            endDateControl={<EuiDatePicker />}
            inline
            shadow={false}
          />
        );

        expect(component.attr('class')).not.toContain('shadow');
      });

      // TODO: Use storybook to test inline invalid, loading, disabled, & readOnly
      // visually instead of via DOM
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
});
