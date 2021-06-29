/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React from 'react';
import { render } from 'enzyme';
import { requiredProps } from '../../../test/required_props';

import { EuiTablePagination } from './table_pagination';

describe('EuiTablePagination', () => {
  const paginationProps = {
    activePage: 1,
    pageCount: 5,
    onChangePage: jest.fn(),
  };
  test('is rendered', () => {
    const component = render(
      <EuiTablePagination {...requiredProps} {...paginationProps} />
    );

    expect(component).toMatchSnapshot();
  });

  test('is rendered when hiding the per page options', () => {
    const component = render(
      <EuiTablePagination
        {...requiredProps}
        {...paginationProps}
        hidePerPageOptions={true}
      />
    );

    expect(component).toMatchSnapshot();
  });
});
