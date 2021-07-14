/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { requiredProps } from '../../test';
import { shallow } from 'enzyme';
import { PaginationBar } from './pagination_bar';

describe('PaginationBar', () => {
  test('render', () => {
    const props = {
      ...requiredProps,
      pagination: {
        pageIndex: 0,
        pageSize: 5,
        totalItemCount: 0,
      },
      onPageSizeChange: () => {},
      onPageChange: () => {},
    };

    const component = shallow(<PaginationBar {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('render - custom page size options', () => {
    const props = {
      ...requiredProps,
      pagination: {
        pageIndex: 0,
        pageSize: 5,
        totalItemCount: 0,
        pageSizeOptions: [1, 2, 3],
      },
      onPageSizeChange: () => {},
      onPageChange: () => {},
    };

    const component = shallow(<PaginationBar {...props} />);

    expect(component).toMatchSnapshot();
  });

  test('render - hiding per page options', () => {
    const props = {
      ...requiredProps,
      pagination: {
        pageIndex: 0,
        pageSize: 5,
        totalItemCount: 0,
        hidePerPageOptions: true,
      },
      onPageSizeChange: () => {},
      onPageChange: () => {},
    };

    const component = shallow(<PaginationBar {...props} />);

    expect(component).toMatchSnapshot();
  });
});
