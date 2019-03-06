import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiModalFooter } from './modal_footer';

test('renders EuiModalFooter', () => {
  const component = (
    <EuiModalFooter {...requiredProps}>children</EuiModalFooter>
  );
  expect(render(component)).toMatchSnapshot();
});
