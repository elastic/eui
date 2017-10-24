import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiFieldNumber } from './field_number';

describe('EuiFieldNumber', () => {
  test('is rendered', () => {
    const component = render(
      <EuiFieldNumber {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
