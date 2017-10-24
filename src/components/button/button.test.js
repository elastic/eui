import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiButton } from './button';

describe('EuiButton', () => {
  test('is rendered', () => {
    const component = render(
      <EuiButton {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
