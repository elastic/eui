/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React from 'react';
import { EuiDataGridColumn, EuiDataGridSorting } from './data_grid_types';
import { EuiI18n } from '../i18n';
import { EuiListGroupItemProps } from '../list_group';
import {
  EuiDataGridSchema,
  EuiDataGridSchemaDetector,
  getDetailsForSchema,
} from './data_grid_schema';
import {
  defaultSortAscLabel,
  defaultSortDescLabel,
} from './column_sorting_draggable';

export function getColumnActions(
  column: EuiDataGridColumn,
  columns: EuiDataGridColumn[],
  schema: EuiDataGridSchema,
  schemaDetectors: EuiDataGridSchemaDetector[],
  setVisibleColumns: (columnId: string[]) => void,
  setIsPopoverOpen: (value: boolean) => void,
  sorting: EuiDataGridSorting | undefined,
  switchColumnPos: (colFromId: string, colToId: string) => void
) {
  if (column.actions === false) {
    return [];
  }
  const colIdx = columns.findIndex((col) => col.id === column.id);

  const sortingIdx = sorting
    ? sorting.columns.findIndex((col) => col.id === column.id)
    : -1;
  const sortBy = (direction: 'asc' | 'desc' = 'asc') => {
    if (!sorting) {
      return;
    }

    if (
      sortingIdx >= 0 &&
      sorting.columns[sortingIdx]?.direction === direction
    ) {
      // unsort if the same current and new direction are same
      const newColumns = sorting.columns.filter(
        (val, idx) => idx !== sortingIdx
      );
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
  const onClickHideColumn = () =>
    setVisibleColumns(
      columns.filter((col) => col.id !== column.id).map((col) => col.id)
    );

  const onClickSortAsc = () => {
    sortBy('asc');
  };

  const onClickSortDesc = () => {
    sortBy('desc');
  };

  const onClickMoveLeft = () => {
    const targetCol = columns[colIdx - 1];
    if (targetCol) {
      switchColumnPos(column.id, targetCol.id);
    }
  };

  const onClickMoveRight = () => {
    const targetCol = columns[colIdx + 1];
    if (targetCol) {
      switchColumnPos(column.id, targetCol.id);
    }
  };

  const result: EuiListGroupItemProps[] = [];
  if (column.actions?.showHide !== false) {
    const option = {
      label: (
        <EuiI18n token="euiColumnActions.hideColumn" default="Hide column" />
      ),
      onClick: onClickHideColumn,
      iconType: 'eyeClosed',
      size: 'xs',
      color: 'text',
    } as EuiListGroupItemProps;
    if (typeof column.actions?.showHide === 'object') {
      result.push({ ...option, ...column.actions.showHide });
    } else {
      result.push(option);
    }
  }

  const schemaDetails =
    schema.hasOwnProperty(column.id) && schema[column.id].columnType != null
      ? getDetailsForSchema(schemaDetectors, schema[column.id].columnType)
      : null;
  if (column.actions?.showSortAsc !== false && sorting) {
    const label = schemaDetails
      ? schemaDetails.sortTextAsc
      : defaultSortAscLabel;
    const option = {
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
    if (typeof column.actions?.showSortAsc === 'object') {
      result.push({ ...option, ...column.actions.showSortAsc });
    } else {
      result.push(option);
    }
  }

  if (column.actions?.showSortDesc !== false && sorting) {
    const label = schemaDetails
      ? schemaDetails.sortTextDesc
      : defaultSortDescLabel;
    const option = {
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
    if (typeof column.actions?.showSortDesc === 'object') {
      result.push({ ...option, ...column.actions.showSortDesc });
    } else {
      result.push(option);
    }
  }

  if (column.actions?.showMoveLeft !== false) {
    const option = {
      label: <EuiI18n token="euiColumnActions.moveLeft" default="Move left" />,
      iconType: 'sortLeft',
      size: 'xs',
      color: 'text',
      onClick: onClickMoveLeft,
      isDisabled: colIdx === 0,
    } as EuiListGroupItemProps;
    if (typeof column.actions?.showMoveLeft === 'object') {
      result.push({ ...option, ...column.actions.showMoveLeft });
    } else {
      result.push(option);
    }
  }

  if (column.actions?.showMoveRight !== false) {
    const option = {
      label: (
        <EuiI18n token="euiColumnActions.moveRight" default="Move right" />
      ),
      iconType: 'sortRight',
      size: 'xs',
      color: 'text',
      onClick: onClickMoveRight,
      isDisabled: colIdx === columns.length - 1,
    } as EuiListGroupItemProps;
    if (typeof column.actions?.showMoveRight === 'object') {
      result.push({ ...option, ...column.actions.showMoveRight });
    } else {
      result.push(option);
    }
  }
  const allActions = column.actions?.additional
    ? [...result, ...column.actions?.additional]
    : result;

  //wrap EuiListGroupItem onClick function to close the popover and prevet bubbling up

  return allActions.map((action) => {
    return {
      ...action,
      ...{
        onClick: (ev: React.MouseEvent<HTMLButtonElement>) => {
          ev.stopPropagation();
          setIsPopoverOpen(false);
          if (action && action.onClick) {
            action.onClick(ev);
          }
        },
      },
    };
  }) as EuiListGroupItemProps[];
}
