/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classnames from 'classnames';
import React, { forwardRef, memo } from 'react';
import { EuiDataGridControlHeaderCell } from './data_grid_control_header_cell';
import { EuiDataGridHeaderCell } from './data_grid_header_cell';
import {
  emptyControlColumns,
  EuiDataGridHeaderRowProps,
} from '../../data_grid_types';

const EuiDataGridHeaderRow = memo(
  forwardRef<HTMLDivElement, EuiDataGridHeaderRowProps>((props, ref) => {
    const {
      className,
      'data-test-subj': _dataTestSubj,
      leadingControlColumns = emptyControlColumns,
      trailingControlColumns = emptyControlColumns,
      columns,
      columnWidths,
      defaultColumnWidth,
      setColumnWidth,
      setVisibleColumns,
      switchColumnPos,
      sorting,
      schema,
      schemaDetectors,
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
          />
        ))}
        {columns.map((column, index) => (
          <EuiDataGridHeaderCell
            key={column.id}
            index={index + leadingControlColumns.length}
            column={column}
            columns={columns}
            columnWidths={columnWidths}
            defaultColumnWidth={defaultColumnWidth}
            setColumnWidth={setColumnWidth}
            setVisibleColumns={setVisibleColumns}
            switchColumnPos={switchColumnPos}
            sorting={sorting}
            schema={schema}
            schemaDetectors={schemaDetectors}
          />
        ))}
        {trailingControlColumns.map((controlColumn, index) => (
          <EuiDataGridControlHeaderCell
            key={controlColumn.id}
            index={index + leadingControlColumns.length + columns.length}
            controlColumn={controlColumn}
          />
        ))}
      </div>
    );
  })
);

EuiDataGridHeaderRow.displayName = 'EuiDataGridHeaderRow';

export { EuiDataGridHeaderRow };
