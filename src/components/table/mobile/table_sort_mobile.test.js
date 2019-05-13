import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiTableSortMobile } from './table_sort_mobile';

describe('EuiTableSortMobile', () => {
  test('is rendered', () => {
    const component = render(<EuiTableSortMobile {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
