import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiTableHeaderCellCheckbox } from './table_header_cell_checkbox';

describe('EuiTableHeaderCellCheckbox', () => {
  test('is rendered', () => {
    const component = render(<EuiTableHeaderCellCheckbox {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
