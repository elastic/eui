import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiHeaderLinks } from './header_links';

describe('EuiHeaderLinks', () => {
  test('is rendered', () => {
    const component = render(<EuiHeaderLinks {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
