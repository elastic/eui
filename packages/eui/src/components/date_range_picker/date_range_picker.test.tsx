/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { render } from '../../test/rtl';
import {
  EuiDateRangePicker,
  type EuiDateRangePickerProps,
} from './date_range_picker';

// TODO we want to actually add tests here a bit more in the future,
// when the DOM is closer to final design
// (also we might use cypress instead for most use cases)

const defaultProps: EuiDateRangePickerProps = {
  value: 'last 20 minutes',
  onTimeChange: () => {},
};

describe('EuiDateRangePicker', () => {
  it('renders', () => {
    const { container } = render(<EuiDateRangePicker {...defaultProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  describe('editing mode', () => {
    const openEditing = (getByTestSubject: (id: string) => HTMLElement) => {
      act(() => {
        userEvent.click(getByTestSubject('euiDateRangePickerControlButton'));
      });
      return getByTestSubject('euiDateRangePickerInput');
    };

    it('enters editing mode on control button click', () => {
      const { getByTestSubject, queryByTestSubject } = render(
        <EuiDateRangePicker {...defaultProps} onTimeChange={() => {}} />
      );

      expect(
        getByTestSubject('euiDateRangePickerControlButton')
      ).toBeInTheDocument();
      expect(
        queryByTestSubject('euiDateRangePickerInput')
      ).not.toBeInTheDocument();

      const input = openEditing(getByTestSubject);

      expect(input).toHaveFocus();
      expect(
        queryByTestSubject('euiDateRangePickerControlButton')
      ).not.toBeInTheDocument();
    });

    it('submits on Enter and returns to display mode', () => {
      const onTimeChange = jest.fn();
      const { getByTestSubject, queryByTestSubject } = render(
        <EuiDateRangePicker {...defaultProps} onTimeChange={onTimeChange} />
      );

      const input = openEditing(getByTestSubject);

      fireEvent.keyDown(input, { key: 'Enter' });

      expect(onTimeChange).toHaveBeenCalledTimes(1);
      expect(
        getByTestSubject('euiDateRangePickerControlButton')
      ).toBeInTheDocument();
      expect(
        queryByTestSubject('euiDateRangePickerInput')
      ).not.toBeInTheDocument();
    });

    it('cancels on Escape and returns to display mode', () => {
      const onTimeChange = jest.fn();
      const { getByTestSubject, queryByTestSubject } = render(
        <EuiDateRangePicker {...defaultProps} onTimeChange={onTimeChange} />
      );

      const input = openEditing(getByTestSubject);

      fireEvent.keyDown(input, { key: 'Escape' });

      expect(onTimeChange).not.toHaveBeenCalled();
      expect(
        getByTestSubject('euiDateRangePickerControlButton')
      ).toBeInTheDocument();
      expect(
        queryByTestSubject('euiDateRangePickerInput')
      ).not.toBeInTheDocument();
    });

    it('closes on outside click and returns to display mode', () => {
      const onTimeChange = jest.fn();
      const { getByTestSubject, queryByTestSubject } = render(
        <EuiDateRangePicker {...defaultProps} onTimeChange={onTimeChange} />
      );

      openEditing(getByTestSubject);

      fireEvent.mouseDown(document.body);
      fireEvent.mouseUp(document.body);

      expect(onTimeChange).not.toHaveBeenCalled();
      expect(
        getByTestSubject('euiDateRangePickerControlButton')
      ).toBeInTheDocument();
      expect(
        queryByTestSubject('euiDateRangePickerInput')
      ).not.toBeInTheDocument();
    });
  });
});
