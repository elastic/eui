/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../test/required_props';
import { render } from '../../test/rtl';

import { EuiTableRow } from './table_row';

import { EuiTableRowCell } from './table_row_cell';

function renderTable(ui: React.ReactElement) {
  return render(
    <table>
      <tbody>{ui}</tbody>
    </table>
  );
}

test('renders EuiTableRow', () => {
  const { container } = renderTable(
    <EuiTableRow {...requiredProps}>
      <EuiTableRowCell>hi</EuiTableRowCell>
    </EuiTableRow>
  );

  expect(container.firstChild).toMatchSnapshot();
});

describe('isSelected', () => {
  test('renders true when specified', () => {
    const { container } = renderTable(
      <EuiTableRow isSelected={true}>
        <EuiTableRowCell />
      </EuiTableRow>
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
