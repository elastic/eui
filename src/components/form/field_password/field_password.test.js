import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiFieldPassword } from './field_password';

describe('EuiFieldPassword', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFieldPassword {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
