/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, memo } from 'react';
import classNames from 'classnames';

import { EuiDataGridControlHeaderCellProps } from '../../data_grid_types';
import { EuiDataGridHeaderCellWrapper } from './data_grid_header_cell_wrapper';

export const EuiDataGridControlHeaderCell: FunctionComponent<EuiDataGridControlHeaderCellProps> =
  memo(({ controlColumn, index, isLastColumn }) => {
    const {
      headerCellRender: HeaderCellRender,
      headerCellProps,
      width,
      id,
    } = controlColumn;

    return (
      <EuiDataGridHeaderCellWrapper
        {...headerCellProps}
        className={classNames(
          'euiDataGridHeaderCell--controlColumn',
          headerCellProps?.className
        )}
        id={id}
        index={index}
        width={width}
        isLastColumn={isLastColumn}
      >
        <HeaderCellRender />
      </EuiDataGridHeaderCellWrapper>
    );
  });

EuiDataGridControlHeaderCell.displayName = 'EuiDataGridControlHeaderCell';
