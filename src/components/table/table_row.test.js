import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test/required_props';

import { EuiTableRow } from './table_row';

import { EuiTableRowCell } from './table_row_cell';

test('renders EuiTableRow', () => {
  const component = (
    <EuiTableRow {...requiredProps}>
      <EuiTableRowCell>hi</EuiTableRowCell>
    </EuiTableRow>
  );

  expect(render(component)).toMatchSnapshot();
});

describe('isSelected', () => {
  test('renders true when specified', () => {
    const component = (
      <EuiTableRow isSelected={true}>
        <EuiTableRowCell />
      </EuiTableRow>
    );

    expect(render(component)).toMatchSnapshot();
  });
});
