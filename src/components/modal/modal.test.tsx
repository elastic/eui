import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiModal } from './modal';

test('renders EuiModal', () => {
  const component = (
    <EuiModal onClose={() => {}} {...requiredProps}>
      children
    </EuiModal>
  );

  expect(render(component)).toMatchSnapshot();
});
