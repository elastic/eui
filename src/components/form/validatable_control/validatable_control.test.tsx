import React from 'react';
import { render } from 'enzyme';

import { EuiValidatableControl } from './validatable_control';

describe('EuiValidatableControl', () => {
  test('is rendered', () => {
    const component = render(
      <EuiValidatableControl>
        <input />
      </EuiValidatableControl>
    );

    expect(component).toMatchSnapshot();
  });
});
