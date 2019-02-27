import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiModalHeaderTitle } from './modal_header_title';

test('renders EuiModalHeaderTitle', () => {
  const component = (
    <EuiModalHeaderTitle {...requiredProps}>children</EuiModalHeaderTitle>
  );
  expect(render(component)).toMatchSnapshot();
});
