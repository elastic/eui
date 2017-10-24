import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiRange } from './range';

describe('EuiRange', () => {
  test('is rendered', () => {
    const component = render(
      <EuiRange {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
