/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { requiredProps } from '../../test';
import moment from 'moment';

import { EuiDatePicker } from './date_picker';
import { EuiContext } from '../context';

describe('EuiDatePicker', () => {
  it('renders', () => {
    const { container } = render(<EuiDatePicker {...requiredProps} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  test('compressed', () => {
    const { container } = render(<EuiDatePicker compressed />);
    // TODO: Should probably be a visual snapshot test
    expect(container.innerHTML).toContain('--compressed');
  });

  // TODO: These tests/snapshots don't really do anything in Jest without
  // the corresponding popover opening. Should be switched to an E2E test instead
  describe.skip('popoverPlacement', () => {
    test('upRight is rendered', () => {
      const { container } = render(
        <EuiDatePicker {...requiredProps} popoverPlacement="upRight" />
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('localization', () => {
    const selectedDate = moment('2019-07-01T00:00:00-0700').locale('fr');

    test('accepts the locale prop', () => {
      const { container } = render(
        <EuiDatePicker
          {...requiredProps}
          inline
          selected={selectedDate}
          locale="ko"
        />
      );

      expect(container.firstChild).toMatchSnapshot();
    });

    test('inherits locale from context', () => {
      const { container } = render(
        <EuiContext i18n={{ locale: 'fr' }}>
          <EuiDatePicker {...requiredProps} inline selected={selectedDate} />
        </EuiContext>
      );

      expect(container.firstChild).toMatchSnapshot();
    });
  });

  describe('calendar week day names', () => {
    it('adds long-text sr-only week names when locale is not set', () => {
      const selectedDate = moment('2019-07-01T00:00:00-0700');

      const { container } = render(
        <EuiDatePicker {...requiredProps} inline selected={selectedDate} />
      );

      expect(
        container.getElementsByClassName('react-datepicker__day-name')[0]
          .firstChild
      ).toHaveAttribute('aria-hidden');
      expect(
        container.getElementsByClassName('react-datepicker__day-name')[0]
          .lastChild
      ).toHaveTextContent('Sunday');
    });

    it('adds long-text sr-only week names when locale is set to european English', () => {
      const selectedDate = moment('2019-07-01T00:00:00-0700');

      const { container } = render(
        <EuiDatePicker
          {...requiredProps}
          inline
          selected={selectedDate}
          locale="en-gb"
        />
      );

      expect(
        container.getElementsByClassName('react-datepicker__day-name')[0]
          .firstChild
      ).toHaveAttribute('aria-hidden');
      expect(
        container.getElementsByClassName('react-datepicker__day-name')[0]
          .lastChild
      ).toHaveTextContent('Monday');
    });

    it('does not add long-text week names when locale is not English', () => {
      const selectedDate = moment('2019-07-01T00:00:00-0700');

      const { container } = render(
        <EuiDatePicker
          {...requiredProps}
          inline
          selected={selectedDate}
          locale="fr"
        />
      );

      expect(
        container.getElementsByClassName('react-datepicker__day-name')[0]
          .children.length
      ).toEqual(1);
      expect(
        container.getElementsByClassName('react-datepicker__day-name')[0]
          .firstChild
      ).not.toHaveAttribute('aria-hidden');
    });
  });
});
