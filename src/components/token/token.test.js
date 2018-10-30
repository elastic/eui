import React from 'react';
import { render } from 'enzyme';

import { EuiToken } from './token';

describe('EuiToken', () => {
  test('is rendered', () => {
    const component = render(
      <EuiToken type="tokenClass" />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
