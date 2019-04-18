import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiModalBody } from './modal_body';

test('renders EuiModalBody', () => {
  const component = <EuiModalBody {...requiredProps}>children</EuiModalBody>;
  expect(render(component)).toMatchSnapshot();
});
