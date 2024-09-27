/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, useState, useMemo, useEffect } from 'react';
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
  React.memo(
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
      onColumnResize,
      schema,
      schemaDetectors,
      sorting,
      pagination,
      rowHeightsOptions,
      gridWidth,
      gridStyles,
    }) => {
      useEffect(() => {
        console.log(`renderCustomGridBody changed`);
      }, [renderCustomGridBody]);

      useEffect(() => {
        console.log(`renderCellValue changed`);
      }, [renderCellValue]);

      useEffect(() => {
        console.log(`cellContext changed`);
      }, [cellContext]);

      useEffect(() => {
        console.log(`renderCellPopover changed`);
      }, [renderCellPopover]);

      useEffect(() => {
        console.log(`renderFooterCellValue changed`);
      }, [renderFooterCellValue]);

      useEffect(() => {
        console.log(`interactiveCellId changed`);
      }, [interactiveCellId]);

      useEffect(() => {
        console.log(`visibleRows changed`);
      }, [visibleRows]);

      useEffect(() => {
        console.log(`visibleColCount changed`);
      }, [visibleColCount]);

      useEffect(() => {
        console.log(`leadingControlColumns changed`);
      }, [leadingControlColumns]);

      useEffect(() => {
        console.log(`trailingControlColumns changed`);
      }, [trailingControlColumns]);

      useEffect(() => {
        console.log(`columns changed`);
      }, [columns]);

      useEffect(() => {
        console.log(`setVisibleColumns changed`);
      }, [setVisibleColumns]);

      useEffect(() => {
        console.log(`switchColumnPos changed`);
      }, [switchColumnPos]);

      useEffect(() => {
        console.log(`onColumnResize changed`);
      }, [onColumnResize]);

      useEffect(() => {
        console.log(`schema changed`);
      }, [schema]);

      useEffect(() => {
        console.log(`schemaDetectors changed`);
      }, [schemaDetectors]);

      useEffect(() => {
        console.log(`sorting changed`);
      }, [sorting]);

      useEffect(() => {
        console.log(`pagination changed`);
      }, [pagination]);

      useEffect(() => {
        console.log(`rowHeightsOptions changed`);
      }, [rowHeightsOptions]);

      useEffect(() => {
        console.log(`gridWidth changed`);
      }, [gridWidth]);

      useEffect(() => {
        console.log(`gridStyles changed`);
      }, [gridStyles]);

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
      const rowHeightUtils = useRowHeightUtils({
        rowHeightsOptions,
        gridStyles,
        columns,
      });

      const { setRowHeight, getRowHeight } = useDefaultRowHeight({
        rowHeightsOptions,
        rowHeightUtils,
      });

      useEffect(() => {
        console.log('mounting changed');
        return () => {
          console.log('unmounting changed');
        };
      }, []);

      const headerRowProps = useMemo(() => {
        return {
          leadingControlColumns,
          trailingControlColumns,
          columns,
          columnWidths,
          defaultColumnWidth,
          setColumnWidth,
          setVisibleColumns,
          switchColumnPos,
          sorting,
          schema,
          schemaDetectors,
        };
      }, [
        leadingControlColumns,
        trailingControlColumns,
        columns,
        columnWidths,
        defaultColumnWidth,
        setColumnWidth,
        setVisibleColumns,
        switchColumnPos,
        sorting,
        schema,
        schemaDetectors,
      ]);

      /**
       * Header & footer
       */
      const { headerRow } = useDataGridHeader(headerRowProps);

      useEffect(() => {
        console.log(`leadingControlColumns changed`);
      }, [leadingControlColumns]);

      useEffect(() => {
        console.log(`trailingControlColumns changed`);
      }, [trailingControlColumns]);

      useEffect(() => {
        console.log(`columns changed`);
      }, [columns]);

      useEffect(() => {
        console.log(`columnWidths changed`);
      }, [columnWidths]);

      useEffect(() => {
        console.log(`defaultColumnWidth changed`);
      }, [defaultColumnWidth]);

      useEffect(() => {
        console.log(`setColumnWidth changed`);
      }, [setColumnWidth]);

      useEffect(() => {
        console.log(`setVisibleColumns changed`);
      }, [setVisibleColumns]);

      useEffect(() => {
        console.log(`switchColumnPos changed`);
      }, [switchColumnPos]);

      useEffect(() => {
        console.log(`sorting changed`);
      }, [sorting]);

      useEffect(() => {
        console.log(`schema changed`);
      }, [schema]);

      useEffect(() => {
        console.log(`schemaDetectors changed`);
      }, [schemaDetectors]);

      const footerRowProps = useMemo(
        () => ({
          renderFooterCellValue,
          renderCellPopover,
          rowIndex: visibleRows.visibleRowCount,
          visibleRowIndex: visibleRows.visibleRowCount,
          interactiveCellId,
          leadingControlColumns,
          trailingControlColumns,
          columns,
          columnWidths,
          defaultColumnWidth,
          schema,
        }),
        [
          renderFooterCellValue,
          renderCellPopover,
          visibleRows.visibleRowCount,
          interactiveCellId,
          leadingControlColumns,
          trailingControlColumns,
          columns,
          columnWidths,
          defaultColumnWidth,
          schema,
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
      ]);

      const Cell = useMemo<EuiDataGridCustomBodyProps['Cell']>(
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

      useEffect(() => {
        console.log(`headerRow changed`);
      }, [headerRow]);

      useEffect(() => {
        console.log(`footerRow changed`);
      }, [footerRow]);

      useEffect(() => {
        console.log(`visibleColumns changed`);
      }, [visibleColumns]);

      useEffect(() => {
        console.log(`visibleRows changed`);
      }, [visibleRows]);

      useEffect(() => {
        console.log(`Cell changed`);
      }, [Cell]);

      useEffect(() => {
        console.log(`setCustomGridBodyProps changed`);
      }, [setCustomGridBodyProps]);

      /**
       *
       * 1. width of header to know the actual width of the table.
       * 2. Effect to change the actual width of available area so that table can be re-factored accordingly.
       * 3. header Row inside the `renderCustomGridBody` to own the scrolling container.
       * 4. We treat all cells as same while the `extra Row` cell should be treated differently in terms of dimensions
       *
       * */

      return (
        <div
          {...customGridBodyProps}
          className={classNames(
            'euiDataGrid__customRenderBody',
            customGridBodyProps?.className
          )}
        >
          {renderCustomGridBody!(customDataGridBodyProps)}
        </div>
      );
    }
  );

EuiDataGridBodyCustomRender.displayName = 'EuiDataGridBodyCustomRenderMemo';
