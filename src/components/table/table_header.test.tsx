import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiTableHeader } from './table_header';

describe('EuiTableHeader', () => {
  test('is rendered', () => {
    const component = render(
      <EuiTableHeader {...requiredProps}>children</EuiTableHeader>
    );

    expect(component).toMatchSnapshot();
  });
});
