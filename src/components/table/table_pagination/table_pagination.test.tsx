/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../../test/rtl';
import { requiredProps } from '../../../test/required_props';

import { EuiTablePagination } from './table_pagination';

describe('EuiTablePagination', () => {
  const paginationProps = {
    activePage: 1,
    pageCount: 5,
    onChangePage: jest.fn(),
  };
  test('is rendered', () => {
    const { container } = render(
      <EuiTablePagination {...requiredProps} {...paginationProps} />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('is rendered when hiding the per page options', () => {
    const { container } = render(
      <EuiTablePagination
        {...requiredProps}
        {...paginationProps}
        showPerPageOptions={false}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });

  test('renders a "show all" itemsPerPage option', () => {
    const { container } = render(
      <EuiTablePagination
        {...requiredProps}
        {...paginationProps}
        itemsPerPage={0}
        itemsPerPageOptions={[10, 50, 0]}
      />
    );

    expect(container.firstChild).toMatchSnapshot();
  });
});
