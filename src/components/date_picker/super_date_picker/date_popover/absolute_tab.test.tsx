/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { act, fireEvent } from '@testing-library/react';
import { render } from '../../../../test/rtl';

import { EuiAbsoluteTab } from './absolute_tab';

// Mock EuiDatePicker - 3rd party datepicker lib causes render issues
jest.mock('../../date_picker', () => ({
  EuiDatePicker: () => 'EuiDatePicker',
}));

describe('EuiAbsoluteTab', () => {
  const props = {
    dateFormat: 'MMM D, YYYY @ HH:mm:ss.SSS',
    timeFormat: 'HH:mm',
    value: '',
    onChange: () => {},
    roundUp: false,
    position: 'start' as const,
    labelPrefix: 'Start date',
  };

  describe('user input', () => {
    beforeAll(() => jest.useFakeTimers());
    afterAll(() => jest.useRealTimers());

    const changeInput = (input: HTMLElement, value: string) => {
      fireEvent.change(input, { target: { value } });
      act(() => {
        jest.advanceTimersByTime(1000); // Debounce timer
      });
    };

    it('parses the passed `dateFormat` prop', () => {
      const { getByTestSubject } = render(
        <EuiAbsoluteTab {...props} dateFormat="MMM Do YY" />
      );
      const input = getByTestSubject('superDatePickerAbsoluteDateInput');

      changeInput(input, 'Jan 31st 01');
      expect(input).not.toBeInvalid();
      expect(input).toHaveValue('Jan 31st 01');
    });

    describe('allows several other common date formats, and autoformats them to the `dateFormat` prop', () => {
      const assertOutput = (input: HTMLInputElement) => {
        // Exclude hours from assertion, because moment uses local machine timezone
        expect(input.value).toContain('Jan 1, 1970');
      };

      test('ISO 8601', () => {
        const { getByTestSubject } = render(<EuiAbsoluteTab {...props} />);
        const input = getByTestSubject('superDatePickerAbsoluteDateInput');

        changeInput(input, '1970-01-01T12:00:00+00:00');
        expect(input).not.toBeInvalid();
        assertOutput(input as HTMLInputElement);
      });

      test('RFC 2822', () => {
        const { getByTestSubject } = render(<EuiAbsoluteTab {...props} />);
        const input = getByTestSubject('superDatePickerAbsoluteDateInput');

        changeInput(input, 'Thu, 1 Jan 1970 12:00:00 +0000');
        expect(input).not.toBeInvalid();
        assertOutput(input as HTMLInputElement);
      });

      test('unix timestamp', () => {
        const { getByTestSubject } = render(<EuiAbsoluteTab {...props} />);
        const input = getByTestSubject('superDatePickerAbsoluteDateInput');

        changeInput(input, Date.now().toString());
        expect(input).not.toBeInvalid();

        changeInput(input, '43200');
        expect(input).not.toBeInvalid();
        assertOutput(input as HTMLInputElement);
      });
    });

    it('flags all other date formats as invalid', () => {
      const { getByTestSubject } = render(<EuiAbsoluteTab {...props} />);
      const input = getByTestSubject('superDatePickerAbsoluteDateInput');

      changeInput(input, '01-01-1970');
      expect(input).toHaveValue('01-01-1970');
      expect(input).toBeInvalid();

      changeInput(input, 'asdfasdf');
      expect(input).toHaveValue('asdfasdf');
      expect(input).toBeInvalid();

      changeInput(input, '');
      expect(input).toHaveValue('');
      expect(input).toBeInvalid();
    });
  });
});
