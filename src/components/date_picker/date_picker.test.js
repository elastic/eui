import React from 'react';
import { shallow, mount } from 'enzyme';
import { requiredProps, takeMountedSnapshot } from '../../test';
import Moment from 'moment';

import { EuiDatePicker } from './date_picker';
import { EuiContext } from '../context';

describe('EuiDatePicker', () => {
  test('is rendered', () => {
    const component = shallow(<EuiDatePicker {...requiredProps} />);

    expect(component).toMatchSnapshot(); // snapshot of wrapping dom
    expect(component.find('ContextConsumer').shallow()).toMatchSnapshot(); // snapshot of DatePicker usage
  });

  describe('localization', () => {
    const selectedDate = new Moment('2019-07-01T00:00:00-0700').locale('fr');

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
