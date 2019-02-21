import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiToggle } from './toggle';

describe('EuiToggle', () => {
  test('is rendered', () => {
    const component = render(
      <EuiToggle label="Is toggle on?" {...requiredProps} />
    );

    expect(component).toMatchSnapshot();
  });
});
