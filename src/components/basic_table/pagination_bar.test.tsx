/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
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
