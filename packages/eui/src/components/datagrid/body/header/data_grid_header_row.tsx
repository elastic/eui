/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classnames from 'classnames';
import React, { forwardRef, memo } from 'react';

import { useEuiMemoizedStyles } from '../../../../services';
import {
  emptyControlColumns,
  EuiDataGridHeaderRowProps,
} from '../../data_grid_types';
import { EuiDataGridControlHeaderCell } from './data_grid_control_header_cell';
import { EuiDataGridHeaderCell } from './data_grid_header_cell';
import { euiDataGridHeaderStyles } from './data_grid_header_row.styles';

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
      visibleColCount,
      setVisibleColumns,
      switchColumnPos,
      sorting,
      schema,
      schemaDetectors,
      gridStyles,
      ...rest
    } = props;

    const styles = useEuiMemoizedStyles(euiDataGridHeaderStyles);
    const cssStyles = [styles.euiDataGridHeader, styles[gridStyles.header!]];

    const classes = classnames('euiDataGridHeader', className);
    const dataTestSubj = classnames('dataGridHeader', _dataTestSubj);

    return (
      <div
        role="row"
        ref={ref}
        css={cssStyles}
        className={classes}
        data-test-subj={dataTestSubj}
        {...rest}
      >
        {leadingControlColumns.map((controlColumn, index) => (
          <EuiDataGridControlHeaderCell
            key={controlColumn.id}
            index={index}
            visibleColCount={visibleColCount}
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
            visibleColCount={visibleColCount}
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
            visibleColCount={visibleColCount}
            controlColumn={controlColumn}
          />
        ))}
      </div>
    );
  })
);

EuiDataGridHeaderRow.displayName = 'EuiDataGridHeaderRow';

export { EuiDataGridHeaderRow };
