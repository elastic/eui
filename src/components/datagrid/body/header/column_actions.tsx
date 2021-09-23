/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import {
  EuiDataGridColumn,
  EuiDataGridColumnActions,
  EuiDataGridSchema,
  EuiDataGridSchemaDetector,
  EuiDataGridSorting,
} from '../../data_grid_types';
import { EuiI18n } from '../../../i18n';
import { EuiListGroupItemProps } from '../../../list_group';
import { getDetailsForSchema } from '../../data_grid_schema';
import {
  defaultSortAscLabel,
  defaultSortDescLabel,
} from '../../column_sorting_draggable';

interface GetColumnActions {
  column: EuiDataGridColumn;
  columns: EuiDataGridColumn[];
  schema: EuiDataGridSchema;
  schemaDetectors: EuiDataGridSchemaDetector[];
  setVisibleColumns: (columnId: string[]) => void;
  setIsPopoverOpen: (value: boolean) => void;
  sorting: EuiDataGridSorting | undefined;
  switchColumnPos: (colFromId: string, colToId: string) => void;
}

export const getColumnActions = ({
  column,
  columns,
  schema,
  schemaDetectors,
  setVisibleColumns,
  setIsPopoverOpen,
  sorting,
  switchColumnPos,
}: GetColumnActions): EuiListGroupItemProps[] => {
  if (column.actions === false) {
    return [];
  }

  const actions = [
    ...getHideColumnAction({
      column,
      columns,
      setVisibleColumns,
    }),
    ...getSortColumnActions({
      column,
      sorting,
      schema,
      schemaDetectors,
    }),
    ...getMoveColumnActions({
      column,
      columns,
      switchColumnPos,
    }),
    ...(column.actions?.additional || []),
  ];

  return actions.map((action) => ({
    ...action,
    // Wrap EuiListGroupItem onClick function to close the popover and prevent bubbling up
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      setIsPopoverOpen(false);
      if (action?.onClick) {
        action.onClick(e);
      }
    },
  }));
};

/**
 * Hide column action
 */
type HideColumnAction = Pick<
  GetColumnActions,
  'column' | 'columns' | 'setVisibleColumns'
>;

export const getHideColumnAction = ({
  column,
  columns,
  setVisibleColumns,
}: HideColumnAction): EuiListGroupItemProps[] => {
  const items = [];

  const onClickHideColumn = () =>
    setVisibleColumns(
      columns.filter((col) => col.id !== column.id).map((col) => col.id)
    );

  const action = {
    label: (
      <EuiI18n token="euiColumnActions.hideColumn" default="Hide column" />
    ),
    onClick: onClickHideColumn,
    iconType: 'eyeClosed',
    size: 'xs',
    color: 'text',
  } as EuiListGroupItemProps;

  if (isColumnActionEnabled('showHide', column.actions)) {
    items.push(getColumnActionConfig(action, 'showHide', column.actions));
  }

  return items;
};

/**
 * Move column actions
 */
type MoveColumnActions = Pick<
  GetColumnActions,
  'column' | 'columns' | 'switchColumnPos'
>;

const getMoveColumnActions = ({
  column,
  columns,
  switchColumnPos,
}: MoveColumnActions): EuiListGroupItemProps[] => {
  const items = [];

  const colIdx = columns.findIndex((col) => col.id === column.id);

  if (isColumnActionEnabled('showMoveLeft', column.actions)) {
    const onClickMoveLeft = () => {
      const targetCol = columns[colIdx - 1];
      if (targetCol) {
        switchColumnPos(column.id, targetCol.id);
      }
    };
    const action = {
      label: <EuiI18n token="euiColumnActions.moveLeft" default="Move left" />,
      iconType: 'sortLeft',
      size: 'xs',
      color: 'text',
      onClick: onClickMoveLeft,
      isDisabled: colIdx === 0,
    } as EuiListGroupItemProps;

    items.push(getColumnActionConfig(action, 'showMoveLeft', column.actions));
  }

  if (isColumnActionEnabled('showMoveRight', column.actions)) {
    const onClickMoveRight = () => {
      const targetCol = columns[colIdx + 1];
      if (targetCol) {
        switchColumnPos(column.id, targetCol.id);
      }
    };
    const action = {
      label: (
        <EuiI18n token="euiColumnActions.moveRight" default="Move right" />
      ),
      iconType: 'sortRight',
      size: 'xs',
      color: 'text',
      onClick: onClickMoveRight,
      isDisabled: colIdx === columns.length - 1,
    } as EuiListGroupItemProps;

    items.push(getColumnActionConfig(action, 'showMoveRight', column.actions));
  }

  return items;
};

/**
 * Sort column actions
 */
type SortColumnActions = Pick<
  GetColumnActions,
  'column' | 'sorting' | 'schema' | 'schemaDetectors'
>;

export const getSortColumnActions = ({
  column,
  sorting,
  schema,
  schemaDetectors,
}: SortColumnActions): EuiListGroupItemProps[] => {
  if (!sorting) return [];
  const items = [];

  const sortingIdx = sorting.columns.findIndex((col) => col.id === column.id);

  const schemaDetails =
    schema.hasOwnProperty(column.id) && schema[column.id].columnType != null
      ? getDetailsForSchema(schemaDetectors, schema[column.id].columnType)
      : null;

  const sortBy = (direction: 'asc' | 'desc') => {
    if (
      sortingIdx >= 0 &&
      sorting.columns[sortingIdx]?.direction === direction
    ) {
      // unsort if the same current and new direction are same
      const newColumns = sorting.columns.filter((_, idx) => idx !== sortingIdx);
      sorting.onSort(newColumns);
    } else if (sortingIdx >= 0) {
      // replace existing sort
      const newColumns = Object.values({
        ...sorting.columns,
        [sortingIdx]: {
          id: column.id,
          direction: direction,
        },
      });
      sorting.onSort(newColumns as EuiDataGridSorting['columns']);
    } else {
      // add new sort
      const newColumns = [
        ...sorting.columns,
        {
          id: column.id,
          direction: direction,
        },
      ];
      sorting.onSort(newColumns as EuiDataGridSorting['columns']);
    }
  };

  if (isColumnActionEnabled('showSortAsc', column.actions)) {
    const label = schemaDetails
      ? schemaDetails.sortTextAsc
      : defaultSortAscLabel;

    const onClickSortAsc = () => {
      sortBy('asc');
    };

    const action = {
      label: (
        <EuiI18n
          token="euiColumnActions.sort"
          default="Sort {schemaLabel}"
          values={{ schemaLabel: label }}
        />
      ),
      onClick: onClickSortAsc,
      isDisabled: column.isSortable === false,
      className:
        sortingIdx >= 0 && sorting.columns[sortingIdx].direction === 'asc'
          ? 'euiDataGridHeader__action--selected'
          : '',
      iconType: 'sortUp',
      size: 'xs',
      color: 'text',
    } as EuiListGroupItemProps;

    items.push(getColumnActionConfig(action, 'showSortAsc', column.actions));
  }

  if (isColumnActionEnabled('showSortDesc', column.actions)) {
    const label = schemaDetails
      ? schemaDetails.sortTextDesc
      : defaultSortDescLabel;

    const onClickSortDesc = () => {
      sortBy('desc');
    };

    const action = {
      label: (
        <EuiI18n
          token="euiColumnActions.sort"
          default="Sort {schemaLabel}"
          values={{ schemaLabel: label }}
        />
      ),
      onClick: onClickSortDesc,
      isDisabled: column.isSortable === false,
      className:
        sortingIdx >= 0 && sorting.columns[sortingIdx].direction === 'desc'
          ? 'euiDataGridHeader__action--selected'
          : '',
      iconType: 'sortDown',
      size: 'xs',
      color: 'text',
    } as EuiListGroupItemProps;

    items.push(getColumnActionConfig(action, 'showSortDesc', column.actions));
  }

  return items;
};

/**
 * Column action utility helpers - mostly syntactical sugar for adding an extra
 * actions !== false checks, which we make an early return for in the main fn,
 * but that the individual utils don't know about and Typescript complains about
 */

// Check whether an action is enabled/should be appended to the actions array
export const isColumnActionEnabled = (
  actionKey: keyof EuiDataGridColumnActions,
  actions: EuiDataGridColumn['actions']
) => {
  if (actions === false) return false;
  if (actions?.[actionKey] === false) return false;
  return true;
};

// Utility helper for appending any custom EuiDataGridColumnActions configuration to its action
export const getColumnActionConfig = (
  action: EuiListGroupItemProps,
  actionKey: keyof EuiDataGridColumnActions,
  actions: EuiDataGridColumn['actions']
) => {
  const configuration = actions !== false && actions?.[actionKey];
  return typeof configuration === 'object'
    ? { ...action, ...configuration }
    : action;
};
