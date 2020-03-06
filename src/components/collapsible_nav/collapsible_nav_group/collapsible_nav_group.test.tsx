import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiCollapsibleNavGroup } from './collapsible_nav_group';

describe('EuiCollapsibleNavGroup', () => {
  test('is rendered', () => {
    const component = render(<EuiCollapsibleNavGroup {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
