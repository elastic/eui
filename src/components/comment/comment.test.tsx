import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiComment } from './comment';

describe('EuiComment', () => {
  test('is rendered', () => {
    const component = render(
      <EuiComment {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
