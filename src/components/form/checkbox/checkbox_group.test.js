import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiCheckboxGroup } from './checkbox_group';

describe('EuiCheckboxGroup', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCheckboxGroup onChange={() => {}} {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
