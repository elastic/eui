/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { forwardRef, memo, useCallback, useContext } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../../../services';
import { EuiDataGridFooterRowProps } from '../../data_grid_types';
import { EuiDataGridCell, DataGridCellPopoverContext } from '../cell';
import { euiDataGridFooterStyles } from './data_grid_footer.styles';

const renderEmpty = () => null;

const EuiDataGridFooterRow = memo(
  forwardRef<HTMLDivElement, EuiDataGridFooterRowProps>(
    (
      {
        leadingControlColumns,
        trailingControlColumns,
        columns,
        schema,
        columnWidths,
        defaultColumnWidth,
        className,
        renderCellValue,
        renderCellPopover,
        rowIndex,
        interactiveCellId,
        'data-test-subj': _dataTestSubj,
        visibleRowIndex = rowIndex,
        visibleColCount,
        gridStyles,
        ...rest
      },
      ref
    ) => {
      const styles = useEuiMemoizedStyles(euiDataGridFooterStyles);
      const cssStyles = [
        styles.euiDataGridFooter,
        gridStyles.stickyFooter && styles.sticky,
        gridStyles.footer === 'striped'
          ? visibleRowIndex % 2 !== 0 && styles.striped
          : styles[gridStyles.footer!],
      ];

      const classes = classNames('euiDataGridFooter', className);
      const dataTestSubj = classNames(
        'dataGridRow',
        'dataGridFooterRow',
        _dataTestSubj
      );
      const getCellClasses = useCallback(
        (columnIndex: number, classes?: string) => {
          return classNames(
            'euiDataGridFooterCell',
            {
              'euiDataGridRowCell--firstColumn': columnIndex === 0,
              'euiDataGridRowCell--lastColumn':
                columnIndex === visibleColCount - 1,
            },
            classes
          );
        },
        [visibleColCount]
      );

      const popoverContext = useContext(DataGridCellPopoverContext);
      const sharedCellProps = {
        css: styles.euiDataGridFooterCell,
        rowIndex,
        visibleRowIndex,
        interactiveCellId,
        popoverContext,
        gridStyles,
      };

      return (
        <div
          ref={ref}
          role="row"
          css={cssStyles}
          className={classes}
          data-test-subj={dataTestSubj}
          {...rest}
        >
          {leadingControlColumns.map(
            ({ id, width, footerCellRender, footerCellProps }, i) => (
              <EuiDataGridCell
                {...footerCellProps}
                {...sharedCellProps}
                key={`${id}-${rowIndex}`}
                colIndex={i}
                columnId={id}
                width={width}
                renderCellValue={footerCellRender ?? renderEmpty}
                isExpandable={false}
                className={getCellClasses(
                  i,
                  classNames(
                    'euiDataGridRowCell--controlColumn',
                    footerCellProps?.className
                  )
                )}
              />
            )
          )}
          {columns.map(({ id }, i) => {
            const columnType = schema[id] ? schema[id].columnType : null;
            const width = columnWidths[id] || defaultColumnWidth;
            const columnPosition = i + leadingControlColumns.length;

            return (
              <EuiDataGridCell
                {...sharedCellProps}
                key={`${columnPosition},${visibleRowIndex}`} // Note: this key should use cell position to match react-window/data cell behavior. See #5720
                colIndex={columnPosition}
                columnId={id}
                columnType={columnType}
                width={width || undefined}
                renderCellValue={renderCellValue}
                renderCellPopover={renderCellPopover}
                isExpandable={true}
                className={getCellClasses(columnPosition)}
              />
            );
          })}
          {trailingControlColumns.map(
            ({ id, width, footerCellRender, footerCellProps }, i) => {
              const colIndex =
                i + columns.length + leadingControlColumns.length;

              return (
                <EuiDataGridCell
                  {...footerCellProps}
                  {...sharedCellProps}
                  key={`${id}-${rowIndex}`}
                  colIndex={colIndex}
                  columnId={id}
                  width={width}
                  renderCellValue={footerCellRender ?? renderEmpty}
                  isExpandable={false}
                  className={getCellClasses(
                    colIndex,
                    classNames(
                      'euiDataGridRowCell--controlColumn',
                      footerCellProps?.className
                    )
                  )}
                />
              );
            }
          )}
        </div>
      );
    }
  )
);

EuiDataGridFooterRow.displayName = 'EuiDataGridFooterRow';

export { EuiDataGridFooterRow };
