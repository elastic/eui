import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiSideNavTitle } from './side_nav_title';

describe('EuiSideNavTitle', () => {
  test('is rendered', () => {
    const component = render(
      <EuiSideNavTitle {...requiredProps} />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
