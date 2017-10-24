import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import {
  EuiModalOverlay,
} from './modal_overlay';

test('renders EuiModalOverlay', () => {
  const component = <EuiModalOverlay {...requiredProps}>children</EuiModalOverlay>;
  expect(render(component)).toMatchSnapshot();
});
