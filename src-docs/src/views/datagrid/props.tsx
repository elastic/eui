import React, { FunctionComponent } from 'react';
import {
  EuiDataGridColumn,
  EuiDataGridPaginationProps,
  EuiDataGridSorting,
  EuiDataGridInMemory,
  EuiDataGridStyle,
  EuiDataGridTooBarVisibilityOptions,
  EuiDataGridColumnVisibility,
  EuiDataGridPopoverContentProps,
} from '../../../../src/components/datagrid/data_grid_types';
import { EuiDataGridCellValueElementProps } from '../../../../src/components/datagrid/data_grid_cell';
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

export const DataGridToolbarVisibilityOptions: FunctionComponent<
  EuiDataGridTooBarVisibilityOptions
> = () => <div />;

export const DataGridCellValueElement: FunctionComponent<
  EuiDataGridCellValueElementProps
> = () => <div />;

export const DataGridSchemaDetector: FunctionComponent<
  EuiDataGridSchemaDetector
> = () => <div />;

export const DataGridColumnVisibility: FunctionComponent<
  EuiDataGridColumnVisibility
> = () => <div />;

export const DataGridPopoverContent: FunctionComponent<
  EuiDataGridPopoverContentProps
> = () => <div />;
