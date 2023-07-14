/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { fireEvent } from '@testing-library/react';
import { render } from '../../test/rtl';
import { requiredProps } from '../../test';

import { PaginationBar } from './pagination_bar';

describe('PaginationBar', () => {
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

  it('renders', () => {
    const { container } = render(<PaginationBar {...props} />);

    expect(container.firstChild).toMatchSnapshot();
  });

  it('calls onPageChange with the correct off-by-one offset', () => {
    const onPageChange = jest.fn();
    const { getByLabelText } = render(
      <PaginationBar
        {...props}
        pagination={{
          ...props.pagination,
          totalItemCount: 10,
        }}
        onPageChange={onPageChange}
      />
    );

    fireEvent.click(getByLabelText('Page 2 of 2'));
    expect(onPageChange).toHaveBeenCalledWith(1);
  });
});
