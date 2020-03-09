import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiForm } from './form';

describe('EuiForm', () => {
  test('is rendered', () => {
    const component = render(<EuiForm {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });

  test('renders <form >', () => {
    const component = render(<EuiForm {...requiredProps} renderForm />);

    expect(component).toMatchSnapshot();
  });
});
