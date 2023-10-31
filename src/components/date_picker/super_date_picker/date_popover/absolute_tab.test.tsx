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
    it('parses the passed `dateFormat` prop', () => {
      const { getByTestSubject } = render(
        <EuiAbsoluteTab {...props} dateFormat="MMM Do YY" />
      );
      const input = getByTestSubject('superDatePickerAbsoluteDateInput');

      fireEvent.change(input, {
        target: { value: 'Jan 31st 01' },
      });
      expect(input).not.toBeInvalid();
      expect(input).toHaveValue('Jan 31st 01');
    });

    describe('allows several other common date formats, and autoformats them to the `dateFormat` prop', () => {
      test('ISO 8601', () => {
        const { getByTestSubject } = render(<EuiAbsoluteTab {...props} />);
        const input = getByTestSubject('superDatePickerAbsoluteDateInput');

        fireEvent.change(input, {
          target: { value: '1970-01-01T12:00:00+00:00' },
        });
        expect(input).not.toBeInvalid();
        expect(input).toHaveValue('Jan 1, 1970 @ 04:00:00.000');
      });

      test('RFC 2822', () => {
        const { getByTestSubject } = render(<EuiAbsoluteTab {...props} />);
        const input = getByTestSubject('superDatePickerAbsoluteDateInput');

        fireEvent.change(input, {
          target: { value: 'Thu, 1 Jan 1970 12:00:00 +0000' },
        });
        expect(input).not.toBeInvalid();
        expect(input).toHaveValue('Jan 1, 1970 @ 04:00:00.000');
      });

      test('unix timestamp', () => {
        const { getByTestSubject } = render(<EuiAbsoluteTab {...props} />);
        const input = getByTestSubject('superDatePickerAbsoluteDateInput');

        fireEvent.change(input, { target: { value: Date.now().toString() } });
        expect(input).not.toBeInvalid();

        fireEvent.change(input, { target: { value: '43200' } });
        expect(input).not.toBeInvalid();
        expect(input).toHaveValue('Jan 1, 1970 @ 04:00:00.000');
      });
    });

    it('flags all other date formats as invalid', () => {
      const { getByTestSubject } = render(<EuiAbsoluteTab {...props} />);
      const input = getByTestSubject('superDatePickerAbsoluteDateInput');

      fireEvent.change(input, { target: { value: '01-01-1970' } });
      expect(input).toHaveValue('01-01-1970');
      expect(input).toBeInvalid();

      fireEvent.change(input, { target: { value: 'asdfasdf' } });
      expect(input).toHaveValue('asdfasdf');
      expect(input).toBeInvalid();

      fireEvent.change(input, { target: { value: '' } });
      expect(input).toHaveValue('');
      expect(input).toBeInvalid();
    });
  });
});
