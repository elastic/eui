import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiHeader } from './header';

describe('EuiHeader', () => {
  test('is rendered', () => {
    const component = render(
      <EuiHeader {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
