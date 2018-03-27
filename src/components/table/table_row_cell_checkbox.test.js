import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiTableRowCellCheckbox } from './table_row_cell_checkbox';

describe('EuiTableRowCellCheckbox', () => {
  test('is rendered', () => {
    const component = render(<EuiTableRowCellCheckbox {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
