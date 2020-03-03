import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiCollapsibleNavGroupList } from './collapsible_nav_group_list';

describe('EuiCollapsibleNavGroupList', () => {
  test('is rendered', () => {
    const component = render(<EuiCollapsibleNavGroupList {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
