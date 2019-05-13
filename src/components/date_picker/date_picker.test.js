import React from 'react';
import { shallow } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiDatePicker } from './date_picker';

describe('EuiDatePicker', () => {
  test('is rendered', () => {
    const component = shallow(<EuiDatePicker {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
