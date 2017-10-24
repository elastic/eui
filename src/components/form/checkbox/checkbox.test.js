import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiCheckbox } from './checkbox';

describe('EuiCheckbox', () => {
  test('is rendered', () => {
    const component = render(
      <EuiCheckbox onChange={() => {}} {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
