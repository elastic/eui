import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiCollapsibleNav } from './collapsible_nav';

describe('EuiCollapsibleNav', () => {
  test('is rendered', () => {
    const component = render(<EuiCollapsibleNav {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
