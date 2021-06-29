/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

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
