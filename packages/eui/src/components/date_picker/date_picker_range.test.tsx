/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import moment from 'moment';
import { fireEvent } from '@testing-library/react';
import { requiredProps } from '../../test';
import { render } from '../../test/rtl';
import { shouldRenderCustomStyles } from '../../test/internal';

import { EuiDatePickerRange } from './date_picker_range';
import { EuiDatePicker } from './date_picker';

describe('EuiDatePickerRange', () => {
  shouldRenderCustomStyles(
    <EuiDatePickerRange
      startDateControl={<EuiDatePicker />}
      endDateControl={<EuiDatePicker />}
    />
  );

  it('is rendered', () => {
    const { container } = render(
      <EuiDatePickerRange
        startDateControl={<EuiDatePicker />}
        endDateControl={<EuiDatePicker />}
        {...requiredProps}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('props', () => {
    test('data-test-subj', () => {
      const { getByTestSubject } = render(
        <EuiDatePickerRange
          data-test-subj="date-range-test"
          startDateControl={<EuiDatePicker />}
          endDateControl={<EuiDatePicker />}
        />
      );

      expect(getByTestSubject('date-range-test')).toBeInTheDocument();
      expect(
        getByTestSubject('date-range-test-range-wrapper')
      ).toBeInTheDocument();
      expect(
        getByTestSubject('date-range-test-start-date-input')
      ).toBeInTheDocument();
      expect(
        getByTestSubject('date-range-test-end-date-input')
      ).toBeInTheDocument();
    });

    test('fullWidth', () => {
      const { container } = render(
        <EuiDatePickerRange
          startDateControl={<EuiDatePicker />}
          endDateControl={<EuiDatePicker />}
          fullWidth
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('compressed', () => {
      const { container } = render(
        <EuiDatePickerRange
          startDateControl={<EuiDatePicker />}
          endDateControl={<EuiDatePicker />}
          compressed
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('readOnly', () => {
      const { container } = render(
        <EuiDatePickerRange
          startDateControl={<EuiDatePicker />}
          endDateControl={<EuiDatePicker />}
          readOnly
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('disabled', () => {
      const { container } = render(
        <EuiDatePickerRange
          startDateControl={<EuiDatePicker />}
          endDateControl={<EuiDatePicker />}
          disabled
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('isInvalid', () => {
      const { container } = render(
        <EuiDatePickerRange
          startDateControl={<EuiDatePicker />}
          endDateControl={<EuiDatePicker />}
          isInvalid
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('isLoading', () => {
      const { container } = render(
        <EuiDatePickerRange
          startDateControl={<EuiDatePicker />}
          endDateControl={<EuiDatePicker />}
          isLoading
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    describe('inline', () => {
      it('renders', () => {
        const selectedStartDate = moment('2000-01-01T00:00:00-0800');
        const selectedEndDate = moment(selectedStartDate).add(1, 'd');

        const { container } = render(
          <EuiDatePickerRange
            startDateControl={<EuiDatePicker selected={selectedStartDate} />}
            endDateControl={<EuiDatePicker selected={selectedEndDate} />}
            inline
            // All of the below props should be ignored/not render when `inline`
            iconType={true}
            fullWidth
            prepend="test"
            append="test"
          />
        );

        expect(container.firstChild).toMatchSnapshot();
      });

      it('allows turning off the default shadow', () => {
        const { container } = render(
          <EuiDatePickerRange
            startDateControl={<EuiDatePicker />}
            endDateControl={<EuiDatePicker />}
            inline
            shadow={false}
          />
        );

        expect((container.firstChild as HTMLElement).className).not.toContain(
          'shadow'
        );
      });

      // TODO: Use storybook to test inline invalid, loading, disabled, & readOnly
      // visually instead of via DOM
    });
  });

  it('uses individual EuiDatePicker props', () => {
    const { container } = render(
      <EuiDatePickerRange
        startDateControl={<EuiDatePicker className="hello" />}
        endDateControl={<EuiDatePicker className="world" />}
        {...requiredProps}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  it('calls blur and focus handlers for date pickers while also triggering range control handlers', () => {
    const rangeControlOnBlurMock = jest.fn();
    const rangeControlOnFocusMock = jest.fn();
    const startControlOnBlurMock = jest.fn();
    const startControlOnFocusMock = jest.fn();
    const endControlOnBlurMock = jest.fn();
    const endControlOnFocusMock = jest.fn();

    const { container } = render(
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

    const startControl = container.querySelector('.euiDatePickerRange__start')!;
    const endControl = container.querySelector('.euiDatePickerRange__end')!;

    fireEvent.focus(startControl);
    expect(startControlOnFocusMock).toHaveBeenCalledTimes(1);
    expect(rangeControlOnFocusMock).toHaveBeenCalledTimes(1);

    fireEvent.blur(startControl);
    expect(startControlOnBlurMock).toHaveBeenCalledTimes(1);
    expect(rangeControlOnBlurMock).toHaveBeenCalledTimes(1);

    fireEvent.focus(endControl);
    expect(endControlOnFocusMock).toHaveBeenCalledTimes(1);
    expect(rangeControlOnFocusMock).toHaveBeenCalledTimes(2);

    fireEvent.blur(endControl);
    expect(endControlOnBlurMock).toHaveBeenCalledTimes(1);
    expect(rangeControlOnBlurMock).toHaveBeenCalledTimes(2);
  });
});
