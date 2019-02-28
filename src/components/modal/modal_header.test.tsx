import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiModalHeader } from './modal_header';

test('renders EuiModalHeader', () => {
  const component = (
    <EuiModalHeader {...requiredProps}>children</EuiModalHeader>
  );
  expect(render(component)).toMatchSnapshot();
});
