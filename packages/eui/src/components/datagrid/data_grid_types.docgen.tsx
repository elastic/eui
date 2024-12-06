/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent } from 'react';
import * as DataGridTypes from './data_grid_types';
import { EuiDataGridToolbarControlProps } from './controls/data_grid_toolbar_control';

// This file only exists for react-typescript-docgen (used by both EUI+ and Storybook),
// which has difficulty extracting typescript definitions that aren't directly props of
// components. NOTE: This file should *NOT* be exported publicly.
// @see packages/eui-docgen

export const EuiDataGridColumnVisibility: FunctionComponent<
  DataGridTypes.EuiDataGridColumnVisibility
> = () => <></>;

export const EuiDataGridPaginationProps: FunctionComponent<
  DataGridTypes.EuiDataGridPaginationProps
> = () => <></>;

export const EuiDataGridSorting: FunctionComponent<
  DataGridTypes.EuiDataGridSorting
> = () => <></>;

export const EuiDataGridColumn: FunctionComponent<
  DataGridTypes.EuiDataGridColumn
> = () => <></>;

export const EuiDataGridColumnActions: FunctionComponent<
  DataGridTypes.EuiDataGridColumnActions
> = () => <></>;

export const EuiDataGridColumnCellActionProps: FunctionComponent<
  DataGridTypes.EuiDataGridColumnCellActionProps
> = () => <></>;

export const EuiDataGridControlColumn: FunctionComponent<
  DataGridTypes.EuiDataGridControlColumn
> = () => <></>;

export const EuiDataGridSchemaDetector: FunctionComponent<
  DataGridTypes.EuiDataGridSchemaDetector
> = () => <></>;

export const EuiDataGridCellValueElementProps: FunctionComponent<
  DataGridTypes.EuiDataGridCellValueElementProps
> = () => <></>;

export const EuiDataGridCellPopoverElementProps: FunctionComponent<
  DataGridTypes.EuiDataGridCellPopoverElementProps
> = () => <></>;

export const EuiDataGridToolBarVisibilityOptions: FunctionComponent<
  DataGridTypes.EuiDataGridToolBarVisibilityOptions
> = () => <></>;

export const EuiDataGridToolBarAdditionalControlsOptions: FunctionComponent<
  DataGridTypes.EuiDataGridToolBarAdditionalControlsOptions
> = () => <></>;

export const EuiDataGridToolBarAdditionalControlsLeftOptions: FunctionComponent<
  DataGridTypes.EuiDataGridToolBarAdditionalControlsLeftOptions
> = () => <></>;

export const EuiDataGridCustomToolbarProps: FunctionComponent<
  DataGridTypes.EuiDataGridCustomToolbarProps
> = () => <></>;

export const EuiDataGridToolbarControl: FunctionComponent<
  EuiDataGridToolbarControlProps
> = () => <></>;

export const EuiDataGridToolBarVisibilityColumnSelectorOptions: FunctionComponent<
  DataGridTypes.EuiDataGridToolBarVisibilityColumnSelectorOptions
> = () => <></>;

export const EuiDataGridToolBarVisibilityDisplaySelectorOptions: FunctionComponent<
  DataGridTypes.EuiDataGridToolBarVisibilityDisplaySelectorOptions
> = () => <></>;

export const EuiDataGridDisplaySelectorCustomRenderProps: FunctionComponent<
  DataGridTypes.EuiDataGridDisplaySelectorCustomRenderProps
> = () => <></>;

export const ToolbarStorybookComponent: FunctionComponent<
  DataGridTypes.EuiDataGridProps & // We really just want toolbarVisibility and renderCustomToolbar from here, but typescript-docgen is unhappy if we Pick<>
    DataGridTypes.EuiDataGridToolBarVisibilityOptions &
    DataGridTypes.EuiDataGridToolBarAdditionalControlsOptions
> = () => <></>;

export const EuiDataGridStyle: FunctionComponent<
  DataGridTypes.EuiDataGridStyle
> = () => <></>;

export const EuiDataGridRowHeightsOptions: FunctionComponent<
  DataGridTypes.EuiDataGridRowHeightsOptions
> = () => <></>;

export const EuiDataGridHeightWidthProps: FunctionComponent<
  Pick<DataGridTypes.EuiDataGridProps, 'height' | 'width'>
> = () => <></>;

export const EuiDataGridVirtualizationOptions: FunctionComponent<
  DataGridTypes.EuiDataGridProps['virtualizationOptions']
> = () => <></>;

export const EuiDataGridRefProps: FunctionComponent<
  DataGridTypes.EuiDataGridRefProps
> = () => <></>;

export const EuiDataGridInMemory: FunctionComponent<
  DataGridTypes.EuiDataGridInMemory
> = () => <></>;

export const EuiDataGridCustomBodyProps: FunctionComponent<
  DataGridTypes.EuiDataGridCustomBodyProps
> = () => <></>;
