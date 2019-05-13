import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiListGroup } from './list_group';

describe('EuiListGroup', () => {
  test('is rendered', () => {
    const component = render(<EuiListGroup {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
