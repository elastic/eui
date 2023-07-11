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
});
