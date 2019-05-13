import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiHeaderLink } from './header_link';

describe('EuiHeaderLink', () => {
  test('is rendered', () => {
    const component = render(<EuiHeaderLink {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
