/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent, waitFor } from '@testing-library/react';
import { render } from '../../../../test/rtl';

import { EuiAbsoluteTab } from './absolute_tab';
import { LocaleSpecifier } from 'moment';
import { userEvent } from '@storybook/test';

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
    const formatHelpText = /Allowed formats: /;

    it('displays helptext and a submit button when the input has been edited and the date has not yet been parsed', () => {
      const { getByTestSubject, queryByTestSubject, queryByText } = render(
        <EuiAbsoluteTab {...props} />
      );
      expect(queryByText(formatHelpText)).not.toBeInTheDocument();
      expect(
        queryByTestSubject('parseAbsoluteDateFormat')
      ).not.toBeInTheDocument();

      const input = getByTestSubject('superDatePickerAbsoluteDateInput');
      fireEvent.change(input, { target: { value: 'test' } });

      expect(queryByText(formatHelpText)).toBeInTheDocument();
      expect(queryByTestSubject('parseAbsoluteDateFormat')).toBeInTheDocument();
    });

    it('displays the formats as a hint before parse, but as an error if invalid', () => {
      const { getByTestSubject, queryByText } = render(
        <EuiAbsoluteTab {...props} />
      );
      expect(queryByText(formatHelpText)).not.toBeInTheDocument();

      fireEvent.change(getByTestSubject('superDatePickerAbsoluteDateInput'), {
        target: { value: 'test' },
      });
      expect(queryByText(formatHelpText)).toHaveClass('euiFormHelpText');

      fireEvent.click(getByTestSubject('parseAbsoluteDateFormat'));
      expect(queryByText(formatHelpText)).toHaveClass('euiFormErrorText');
    });

    it('immediately parses pasted text without needing an extra click or keypress', async () => {
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

      // Additional pasting check as userEvent.paste more accurately simulates
      // the pasting behavior with side effects
      await waitFor(() => {
        input.focus();
        userEvent.paste('1970-01-02');
      });

      // ensure value is replaced, not appended
      expect(input.value).not.toEqual('Jan 1, 1970 @ 00:00:00.0001970-01-02');
      expect(input.value).toEqual('Jan 2, 1970 @ 00:00:00.000');

      input.value = '';
      fireEvent.paste(input, {
        clipboardData: { getData: () => 'not a date' },
      });
      expect(input).toBeInvalid();

      expect(queryByText(formatHelpText)).toBeInTheDocument();
    });
  });

  describe('date parsing', () => {
    const changeInput = (input: HTMLElement, value: string) => {
      fireEvent.change(input, { target: { value: `${value}` } });
      fireEvent.submit(input.closest('form')!);
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

    it('can be forgiving with `dateFormat`', () => {
      const { getByTestSubject } = render(
        <EuiAbsoluteTab
          {...props}
          dateFormat="MMM D, YYYY HH:mm:ss"
          locale="en"
        />
      );
      const input = getByTestSubject(
        'superDatePickerAbsoluteDateInput'
      ) as HTMLInputElement;

      changeInput(input, 'Jan 31, 1993');
      expect(input).not.toBeInvalid();
      expect(input).toHaveValue('Jan 31, 1993 00:00:00');

      changeInput(input, 'Jan 31');
      expect(input).not.toBeInvalid();
      expect(input.value).toContain('Jan 31, ');

      changeInput(input, 'Jan');
      expect(input).not.toBeInvalid();
      expect(input.value).toContain('Jan 1, ');
    });

    describe('parses date string in locale', () => {
      test.each<{
        locale: LocaleSpecifier;
        dateString: string;
      }>([
        { locale: 'en', dateString: 'Mon Jan 2024 1st' },
        { locale: 'zh-CN', dateString: '周一 1月 2024 1日' },
        { locale: 'ja-JP', dateString: '月 1月 2024 1日' },
        { locale: 'fr-FR', dateString: 'lun. janv. 2024 1er' },
      ])('%p', ({ locale, dateString }) => {
        const { getByTestSubject } = render(
          <EuiAbsoluteTab
            {...props}
            dateFormat="ddd MMM YYYY Do"
            locale={locale}
          />
        );
        const input = getByTestSubject('superDatePickerAbsoluteDateInput');

        changeInput(input, dateString);
        expect(input).not.toBeInvalid();
        expect(input).toHaveValue(dateString);
      });
    });

    describe('allows several other common date formats, and autoformats them to the `dateFormat` prop', () => {
      const assertOutput = (input: HTMLInputElement) => {
        // Exclude hours from assertion, because moment uses local machine time zone
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
