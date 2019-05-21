import React from 'react';
import { shallow } from 'enzyme';

import { EuiSuperDatePicker } from './super_date_picker';

const noop = () => {};

describe('EuiSuperDatePicker', () => {
  test('is rendered', () => {
    const component = shallow(<EuiSuperDatePicker onTimeChange={noop} />);

    expect(component).toMatchSnapshot();
  });
});
