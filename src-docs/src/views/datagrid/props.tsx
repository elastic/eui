import React, { FunctionComponent } from 'react';
import {
  EuiDataGridColumn,
  EuiDataGridPaginationProps,
  EuiDataGridSorting,
  EuiDataGridInMemory,
  EuiDataGridStyle,
  EuiDataGridColumnVisibility,
} from '../../../../src/components/datagrid/data_grid_types';
import { CellValueElementProps } from '../../../../src/components/datagrid/data_grid_cell';
import { EuiDataGridSchemaDetector } from '../../../../src/components/datagrid/data_grid_schema';

export const DataGridColumn: FunctionComponent<EuiDataGridColumn> = () => (
  <div />
);

export const DataGridPagination: FunctionComponent<
  EuiDataGridPaginationProps
> = () => <div />;

export const DataGridSorting: FunctionComponent<EuiDataGridSorting> = () => (
  <div />
);

export const DataGridInMemory: FunctionComponent<EuiDataGridInMemory> = () => (
  <div />
);

export const DataGridStyle: FunctionComponent<EuiDataGridStyle> = () => <div />;

export const CellValueElement: FunctionComponent<
  CellValueElementProps
> = () => <div />;

export const DataGridSchemaDetector: FunctionComponent<
  EuiDataGridSchemaDetector
> = () => <div />;

export const DataGridColumnVisibility: FunctionComponent<
  EuiDataGridColumnVisibility
> = () => <div />;
