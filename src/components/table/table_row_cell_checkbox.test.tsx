/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
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
