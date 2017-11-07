import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiSideNavGroup } from './side_nav_group';

describe('EuiSideNavGroup', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSideNavGroup {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
