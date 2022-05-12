/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import { EuiDataGridControlHeaderCellProps } from '../../data_grid_types';
import { EuiDataGridHeaderCellWrapper } from './data_grid_header_cell_wrapper';

export const EuiDataGridControlHeaderCell: FunctionComponent<EuiDataGridControlHeaderCellProps> = ({
  controlColumn,
  index,
  headerIsInteractive,
}) => {
  const { headerCellRender: HeaderCellRender, width, id } = controlColumn;

  return (
    <EuiDataGridHeaderCellWrapper
      className="euiDataGridHeaderCell--controlColumn"
      id={id}
      index={index}
      width={width}
      headerIsInteractive={headerIsInteractive}
    >
      <div className="euiDataGridHeaderCell__content">
        <HeaderCellRender />
      </div>
    </EuiDataGridHeaderCellWrapper>
  );
};
