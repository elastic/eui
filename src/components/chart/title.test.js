import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiTitle } from './title';

describe('EuiTitle', () => {
  test('is rendered', () => {
    const component = render(
      <EuiTitle {...requiredProps}>
        <h1>Title</h1>
      </EuiTitle>
    );

    expect(component)
      .toMatchSnapshot();
  });
});
