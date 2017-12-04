import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiTablePagination } from './table_pagination';

describe('EuiTablePagination', () => {
  test('is rendered', () => {
    const component = render(
      <EuiTablePagination
        {...requiredProps}
        onChangePage={() => {}}
      />
    );

    expect(component)
      .toMatchSnapshot();
  });
});
