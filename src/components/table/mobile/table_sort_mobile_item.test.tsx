import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test';

import { EuiTableSortMobileItem } from './table_sort_mobile_item';

describe('EuiTableSortMobileItem', () => {
  test('is rendered', () => {
    const component = render(<EuiTableSortMobileItem {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
