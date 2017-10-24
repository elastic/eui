import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiBadge } from './badge';

describe('EuiBadge', () => {
  test('is rendered', () => {
    const component = render(
      <EuiBadge {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
