/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../../../test/rtl';

import { EuiAbsoluteTab } from './absolute_tab';

// Mock EuiDatePicker - 3rd party datepicker lib causes render issues
jest.mock('../../date_picker', () => ({
  EuiDatePicker: () => 'EuiDatePicker',
}));

describe('EuiAbsoluteTab', () => {
  // mock requestAnimationFrame to fire immediately
  const rafSpy = jest
    .spyOn(window, 'requestAnimationFrame')
    .mockImplementation((cb: Function) => cb());
  afterAll(() => rafSpy.mockRestore());

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
    it('displays the enter key help text when the input has been edited and the date has not yet been parsed', () => {
      const { getByTestSubject, queryByText } = render(
        <EuiAbsoluteTab {...props} />
      );
      const helpText = 'Press the Enter key to parse as a date.';
      expect(queryByText(helpText)).not.toBeInTheDocument();

      const input = getByTestSubject('superDatePickerAbsoluteDateInput');
      fireEvent.change(input, { target: { value: 'test' } });

      expect(queryByText(helpText)).toBeInTheDocument();
    });

    it('displays the formats as a hint before parse, but as an error if invalid', () => {
      const { getByTestSubject, queryByText } = render(
        <EuiAbsoluteTab {...props} />
      );
      const formatHelpText = /Allowed formats: /;
      expect(queryByText(formatHelpText)).not.toBeInTheDocument();

      const input = getByTestSubject('superDatePickerAbsoluteDateInput');
      fireEvent.change(input, { target: { value: 'test' } });
      expect(queryByText(formatHelpText)).toHaveClass('euiFormHelpText');

      fireEvent.keyDown(input, { key: 'Enter' });
      expect(queryByText(formatHelpText)).toHaveClass('euiFormErrorText');
    });

    it('immediately parses pasted text without needing an extra enter keypress', () => {
      const { getByTestSubject, queryByText } = render(
        <EuiAbsoluteTab {...props} />
      );
      const input = getByTestSubject(
        'superDatePickerAbsoluteDateInput'
      ) as HTMLInputElement;

      fireEvent.paste(input, {
        clipboardData: { getData: () => '1970-01-01' },
      });
      expect(input).not.toBeInvalid();
      expect(input.value).toContain('Jan 1, 1970');

      input.value = '';
      fireEvent.paste(input, {
        clipboardData: { getData: () => 'not a date' },
      });
      expect(input).toBeInvalid();

      expect(queryByText(/Allowed formats: /)).toBeInTheDocument();
      expect(queryByText(/Press the Enter key /)).not.toBeInTheDocument();
    });
  });

  describe('date parsing', () => {
    const changeInput = (input: HTMLElement, value: string) => {
      fireEvent.change(input, { target: { value } });
      fireEvent.keyDown(input, { key: 'Enter' });
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
