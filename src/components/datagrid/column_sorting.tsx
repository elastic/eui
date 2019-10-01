import React, {
  Fragment,
  useState,
  ReactChild,
  ReactNode,
  useEffect,
} from 'react';
import classNames from 'classnames';
import { EuiDataGridColumn, EuiDataGridSorting } from './data_grid_types';
// @ts-ignore-next-line
import { EuiPopover, EuiPopoverFooter } from '../popover';
import { EuiI18n } from '../i18n';
// @ts-ignore-next-line
import { EuiButtonEmpty } from '../button';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
// @ts-ignore-next-line
import { EuiSwitch } from '../form';
import {
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
} from '../drag_and_drop';
import { DropResult } from 'react-beautiful-dnd';
import { EuiIcon } from '../icon';
import { EuiDataGridSchema } from './data_grid_schema';

export const useColumnSorting = (
  columns: EuiDataGridColumn[],
  sorting: EuiDataGridSorting | undefined,
  schema: EuiDataGridSchema
): [ReactNode] => {
  const [isOpen, setIsOpen] = useState(false);

  // prune any non-existant/hidden columns from sorting
  useEffect(() => {
    if (sorting) {
      const nextSortingColumns: EuiDataGridSorting['columns'] = [];

      const availableColumnIds = new Set(columns.map(({ id }) => id));
      for (let i = 0; i < sorting.columns.length; i++) {
        const column = sorting.columns[i];
        if (availableColumnIds.has(column.id)) {
          nextSortingColumns.push(column);
        }
      }

      // if the column array lengths differ then the sorting columns have been pruned
      if (nextSortingColumns.length !== sorting.columns.length) {
        sorting.onSort(nextSortingColumns);
      }
    }
  }, [columns, sorting]);

  if (sorting == null) return [null];

  const activeColumnIds = new Set(sorting.columns.map(({ id }) => id));
  const { inactiveColumns } = columns.reduce<{
    activeColumns: EuiDataGridColumn[];
    inactiveColumns: EuiDataGridColumn[];
  }>(
    (acc, column) => {
      if (activeColumnIds.has(column.id)) {
        acc.activeColumns.push(column);
      } else {
        acc.inactiveColumns.push(column);
      }
      return acc;
    },
    {
      activeColumns: [],
      inactiveColumns: [],
    }
  );

  function onDragEnd({
    source: { index: sourceIndex },
    destination,
  }: DropResult) {
    const destinationIndex = destination!.index;
    const nextColumns = [...sorting!.columns];

    nextColumns[sourceIndex] = sorting!.columns[destinationIndex];
    nextColumns[destinationIndex] = sorting!.columns[sourceIndex];

    sorting!.onSort(nextColumns);
  }

  const controlBtnClasses = classNames('euiDataGrid__controlBtn', {
    'euiDataGrid__controlBtn--active': sorting.columns.length > 0,
  });

  const columnSorting = (
    <EuiPopover
      data-test-subj="dataGridColumnSortingPopover"
      isOpen={isOpen}
      closePopover={() => setIsOpen(false)}
      anchorPosition="downLeft"
      ownFocus
      panelPaddingSize="s"
      panelClassName="euiDataGridColumnSortingPopover"
      button={
        <EuiI18n token="euiColumnSorting.button" default="Sorting">
          {(button: ReactChild) => (
            <EuiButtonEmpty
              size="xs"
              iconType="list"
              color="text"
              className={controlBtnClasses}
              onClick={() => setIsOpen(!isOpen)}>
              {button}
            </EuiButtonEmpty>
          )}
        </EuiI18n>
      }>
      <EuiDragDropContext onDragEnd={onDragEnd}>
        <EuiDroppable
          droppableId="columnSorting"
          className="euiDataGridColumnSorting">
          <Fragment>
            {sorting.columns.map(({ id, direction }, index) => (
              <EuiDraggable key={id} draggableId={id} index={index}>
                {(provided, state) => (
                  <div
                    data-test-subj={`dataGrid-sortColumn-${id}-${direction}`}
                    className={`euiDataGridColumnSorting__item ${state.isDragging &&
                      'euiDataGridColumnSorting__item-isDragging'}`}>
                    <EuiFlexGroup gutterSize="m" alignItems="center">
                      <EuiFlexItem>
                        <EuiSwitch
                          name={id}
                          label={`${id} (${
                            schema.hasOwnProperty(id) &&
                            schema[id].columnType != null
                              ? schema[id].columnType
                              : 'unknown'
                          })`}
                          checked={activeColumnIds.has(id)}
                          compressed
                          className="euiSwitch--mini"
                          onChange={() => {
                            const nextColumns = [...sorting.columns];
                            const columnIndex = nextColumns
                              .map(({ id }) => id)
                              .indexOf(id);
                            nextColumns.splice(columnIndex, 1);
                            sorting.onSort(nextColumns);
                          }}
                        />
                      </EuiFlexItem>
                      <EuiFlexItem>
                        <EuiButtonEmpty
                          data-test-subj="euiColumnSortingToggle"
                          onClick={() => {
                            const nextColumns = [...sorting.columns];
                            const columnIndex = nextColumns
                              .map(({ id }) => id)
                              .indexOf(id);
                            nextColumns.splice(columnIndex, 1, {
                              id,
                              direction: direction === 'asc' ? 'desc' : 'asc',
                            });
                            sorting.onSort(nextColumns);
                          }}>
                          {direction === 'asc' ? '⬆️' : '⬇️'}
                        </EuiButtonEmpty>
                      </EuiFlexItem>
                      <EuiFlexItem grow={false} {...provided.dragHandleProps}>
                        <div {...provided.dragHandleProps}>
                          <EuiIcon type="grab" color="subdued" />
                        </div>
                      </EuiFlexItem>
                    </EuiFlexGroup>
                  </div>
                )}
              </EuiDraggable>
            ))}
          </Fragment>
        </EuiDroppable>
      </EuiDragDropContext>
      {inactiveColumns.map(({ id }) => (
        <div
          key={id}
          className="euiDataGridColumnSorting__item"
          data-test-subj={`dataGrid-sortColumn-${id}-off`}>
          <EuiFlexGroup gutterSize="m" alignItems="center">
            <EuiFlexItem>
              <EuiSwitch
                name={id}
                label={id}
                checked={activeColumnIds.has(id)}
                compressed
                className="euiSwitch--mini"
                onChange={() => {
                  const nextColumns = [...sorting.columns];
                  nextColumns.push({ id, direction: 'asc' });
                  sorting.onSort(nextColumns);
                }}
              />
            </EuiFlexItem>
          </EuiFlexGroup>
        </div>
      ))}
      <EuiPopoverFooter>
        <EuiFlexGroup gutterSize="s" justifyContent="spaceBetween">
          <EuiFlexItem>
            <EuiButtonEmpty
              size="xs"
              flush="left"
              onClick={() => sorting.onSort([])}>
              <EuiI18n
                token="euiColumnSorting.clearAll"
                default="Clear sorting"
              />
            </EuiButtonEmpty>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPopoverFooter>
    </EuiPopover>
  );

  return [columnSorting];
};
