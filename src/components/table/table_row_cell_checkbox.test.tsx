/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../test';

import { EuiTableRowCellCheckbox } from './table_row_cell_checkbox';

describe('EuiTableRowCellCheckbox', () => {
  test('is rendered', () => {
    const component = render(<EuiTableRowCellCheckbox {...requiredProps} />);

    expect(component).toMatchSnapshot();
  });
});
