import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiTableFooter } from './table_footer';

describe('EuiTableFooter', () => {
  test('is rendered', () => {
    const component = render(
      <EuiTableFooter {...requiredProps}>children</EuiTableFooter>
    );

    expect(component).toMatchSnapshot();
  });
});
