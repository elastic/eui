/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classnames from 'classnames';
import React, { forwardRef } from 'react';
import { EuiDataGridControlHeaderCell } from './data_grid_control_header_cell';
import { EuiDataGridHeaderCell } from './data_grid_header_cell';
import { EuiDataGridHeaderRowProps } from '../../data_grid_types';

const EuiDataGridHeaderRow = forwardRef<
  HTMLDivElement,
  EuiDataGridHeaderRowProps
>((props, ref) => {
  const {
    leadingControlColumns = [],
    trailingControlColumns = [],
    columns,
    schema,
    schemaDetectors,
    columnWidths,
    defaultColumnWidth,
    className,
    setColumnWidth,
    setVisibleColumns,
    switchColumnPos,
    headerIsInteractive,
    'data-test-subj': _dataTestSubj,
    ...rest
  } = props;

  const classes = classnames('euiDataGridHeader', className);
  const dataTestSubj = classnames('dataGridHeader', _dataTestSubj);

  return (
    <div
      role="row"
      ref={ref}
      className={classes}
      data-test-subj={dataTestSubj}
      {...rest}
    >
      {leadingControlColumns.map((controlColumn, index) => (
        <EuiDataGridControlHeaderCell
          key={controlColumn.id}
          index={index}
          controlColumn={controlColumn}
          headerIsInteractive={headerIsInteractive}
          className="euiDataGridHeaderCell--controlColumn"
        />
      ))}
      {columns.map((column, index) => (
        <EuiDataGridHeaderCell
          key={column.id}
          column={column}
          columns={columns}
          index={index + leadingControlColumns.length}
          columnWidths={columnWidths}
          schema={schema}
          schemaDetectors={schemaDetectors}
          setColumnWidth={setColumnWidth}
          setVisibleColumns={setVisibleColumns}
          switchColumnPos={switchColumnPos}
          defaultColumnWidth={defaultColumnWidth}
          headerIsInteractive={headerIsInteractive}
        />
      ))}
      {trailingControlColumns.map((controlColumn, index) => (
        <EuiDataGridControlHeaderCell
          key={controlColumn.id}
          index={index + leadingControlColumns.length + columns.length}
          controlColumn={controlColumn}
          headerIsInteractive={headerIsInteractive}
          className="euiDataGridHeaderCell--controlColumn"
        />
      ))}
    </div>
  );
});

EuiDataGridHeaderRow.displayName = 'EuiDataGridHeaderRow';

export { EuiDataGridHeaderRow };
