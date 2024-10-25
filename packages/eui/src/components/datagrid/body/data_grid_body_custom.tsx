/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  JSXElementConstructor,
  useState,
  useMemo,
  memo,
} from 'react';
import classNames from 'classnames';

import { useDefaultColumnWidth, useColumnWidths } from '../utils/col_widths';
import { useRowHeightUtils, useDefaultRowHeight } from '../utils/row_heights';

import {
  EuiDataGridBodyProps,
  EuiDataGridCustomBodyProps,
  EuiDataGridSetCustomGridBodyProps,
} from '../data_grid_types';
import { useDataGridHeader } from './header';
import { useDataGridFooter } from './footer';
import { CellWrapper } from './cell';

export const EuiDataGridBodyCustomRender: FunctionComponent<EuiDataGridBodyProps> =
  memo(
    ({
      renderCustomGridBody,
      renderCellValue,
      cellContext,
      renderCellPopover,
      renderFooterCellValue,
      interactiveCellId,
      visibleRows,
      visibleColCount,
      leadingControlColumns,
      trailingControlColumns,
      columns,
      setVisibleColumns,
      switchColumnPos,
      canDragAndDropColumns,
      onColumnResize,
      schema,
      schemaDetectors,
      sorting,
      pagination,
      rowHeightsOptions,
      gridWidth,
      gridStyles,
      className,
    }) => {
      /**
       * Columns & widths
       */
      const visibleColumns = useMemo(() => {
        return [
          ...leadingControlColumns,
          ...columns,
          ...trailingControlColumns,
        ];
      }, [columns, leadingControlColumns, trailingControlColumns]);

      // compute the default column width from the container's width and count of visible columns
      const defaultColumnWidth = useDefaultColumnWidth(
        gridWidth,
        leadingControlColumns,
        trailingControlColumns,
        columns
      );

      const { columnWidths, setColumnWidth } = useColumnWidths({
        columns,
        leadingControlColumns,
        trailingControlColumns,
        defaultColumnWidth,
        onColumnResize,
      });

      /**
       * Row heights
       */
      const rowHeightUtils = useRowHeightUtils({ rowHeightsOptions, columns });

      const { setRowHeight, getRowHeight } = useDefaultRowHeight({
        rowHeightsOptions,
        rowHeightUtils,
      });

      const headerRowProps = useMemo(() => {
        return {
          leadingControlColumns,
          trailingControlColumns,
          columns,
          columnWidths,
          defaultColumnWidth,
          setColumnWidth,
          setVisibleColumns,
          visibleColCount,
          switchColumnPos,
          canDragAndDropColumns,
          sorting,
          schema,
          schemaDetectors,
          gridStyles,
        };
      }, [
        leadingControlColumns,
        trailingControlColumns,
        columns,
        columnWidths,
        defaultColumnWidth,
        setColumnWidth,
        visibleColCount,
        setVisibleColumns,
        switchColumnPos,
        canDragAndDropColumns,
        sorting,
        schema,
        schemaDetectors,
        gridStyles,
      ]);

      /**
       * Header & footer
       */
      const { headerRow } = useDataGridHeader(headerRowProps);

      const footerRowProps = useMemo(
        () => ({
          renderFooterCellValue,
          renderCellPopover,
          rowIndex: visibleRows.visibleRowCount,
          visibleRowIndex: visibleRows.visibleRowCount,
          visibleColCount,
          interactiveCellId,
          leadingControlColumns,
          trailingControlColumns,
          columns,
          columnWidths,
          defaultColumnWidth,
          schema,
          gridStyles,
        }),
        [
          renderFooterCellValue,
          renderCellPopover,
          visibleRows.visibleRowCount,
          visibleColCount,
          interactiveCellId,
          leadingControlColumns,
          trailingControlColumns,
          columns,
          columnWidths,
          defaultColumnWidth,
          schema,
          gridStyles,
        ]
      );

      const { footerRow } = useDataGridFooter(footerRowProps);

      /**
       * Cell render fn
       */
      const cellProps = useMemo(() => {
        return {
          schema,
          schemaDetectors,
          pagination,
          columns,
          leadingControlColumns,
          trailingControlColumns,
          visibleColCount,
          columnWidths,
          defaultColumnWidth,
          renderCellValue,
          cellContext,
          renderCellPopover,
          interactiveCellId,
          setRowHeight,
          rowHeightsOptions,
          rowHeightUtils,
          gridStyles,
        };
      }, [
        schema,
        schemaDetectors,
        pagination,
        columns,
        leadingControlColumns,
        trailingControlColumns,
        visibleColCount,
        columnWidths,
        defaultColumnWidth,
        renderCellValue,
        cellContext,
        renderCellPopover,
        interactiveCellId,
        setRowHeight,
        rowHeightsOptions,
        rowHeightUtils,
        gridStyles,
      ]);

      const Cell: EuiDataGridCustomBodyProps['Cell'] = useMemo(
        () =>
          ({ colIndex, visibleRowIndex, ...rest }) => {
            const style = {
              height: rowHeightUtils.isAutoHeight(
                visibleRowIndex,
                rest.rowHeightsOptions ?? rowHeightsOptions
              )
                ? 'auto'
                : getRowHeight(visibleRowIndex),
            };

            const props = {
              colIndex,
              visibleRowIndex,
              style,
              ...cellProps,
            };
            return <CellWrapper {...props} {...rest} />;
          },
        [cellProps, getRowHeight, rowHeightUtils, rowHeightsOptions]
      );

      // Allow consumers to pass custom props/attributes/listeners etc. to the wrapping div
      const [customGridBodyProps, setCustomGridBodyProps] =
        useState<EuiDataGridSetCustomGridBodyProps>({});

      const customDataGridBodyProps: EuiDataGridCustomBodyProps = useMemo(
        () => ({
          gridWidth,
          visibleColumns,
          visibleRowData: visibleRows,
          Cell,
          setCustomGridBodyProps,
          headerRow,
          footerRow,
        }),
        [
          gridWidth,
          visibleColumns,
          visibleRows,
          Cell,
          setCustomGridBodyProps,
          headerRow,
          footerRow,
        ]
      );

      const BodyElement =
        renderCustomGridBody as JSXElementConstructor<EuiDataGridCustomBodyProps>;

      return (
        <div
          {...customGridBodyProps}
          className={classNames(
            'euiDataGrid__customRenderBody',
            className,
            customGridBodyProps?.className
          )}
        >
          <BodyElement {...customDataGridBodyProps} />
        </div>
      );
    }
  );

EuiDataGridBodyCustomRender.displayName = 'EuiDataGridBodyCustomRender';
