import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import {
  EuiTabs,
} from './tabs';

describe('EuiTabs', () => {
  test('renders', () => {
    const component = (
      <EuiTabs {...requiredProps} />
    );

    expect(render(component)).toMatchSnapshot();
  });
});
