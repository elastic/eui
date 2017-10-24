import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiLink } from './link';

describe('EuiLink', () => {
  test('is rendered', () => {
    const component = render(
      <EuiLink
        href="#"
        target="_blank"
        {...requiredProps}
      />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
