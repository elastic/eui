import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiSwitch } from './switch';

describe('EuiSwitch', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSwitch {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
