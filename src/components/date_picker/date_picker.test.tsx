/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { shallow, mount } from 'enzyme';
import { requiredProps, takeMountedSnapshot } from '../../test';
import moment from 'moment';

import { EuiDatePicker } from './date_picker';
import { EuiContext } from '../context';

describe('EuiDatePicker', () => {
  test('is rendered', () => {
    const component = shallow<EuiDatePicker>(
      <EuiDatePicker {...requiredProps} />
    );

    expect(component).toMatchSnapshot(); // snapshot of wrapping dom
    expect(component.find('ContextConsumer').shallow()).toMatchSnapshot(); // snapshot of DatePicker usage
  });

  describe('popoverPlacement', () => {
    test('top-end is rendered', () => {
      const component = mount(
        <EuiDatePicker {...requiredProps} popoverPlacement="top-end" />
      );

      expect(component).toMatchSnapshot();
    });
  });

  describe('localization', () => {
    const selectedDate = moment('2019-07-01T00:00:00-0700').locale('fr');

    test('accepts the locale prop', () => {
      const component = mount(
        <EuiDatePicker
          {...requiredProps}
          inline
          selected={selectedDate}
          locale="ko"
        />
      );

      expect(takeMountedSnapshot(component)).toMatchSnapshot();
    });

    test('inherits locale from context', () => {
      const component = mount(
        <EuiContext i18n={{ locale: 'fr' }}>
          <EuiDatePicker {...requiredProps} inline selected={selectedDate} />
        </EuiContext>
      );

      expect(takeMountedSnapshot(component)).toMatchSnapshot();
    });
  });
});
