import React, { Fragment, FunctionComponent, useState } from 'react';
import { EuiDataGridColumn } from './data_grid_types';
// @ts-ignore-next-line
import { EuiPopover } from '../popover';
// @ts-ignore-next-line
import { EuiButton } from '../button';
// @ts-ignore-next-line
import { EuiSwitch } from '../form';
import {
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
} from '../drag_and_drop';
import { DropResult } from 'react-beautiful-dnd';
import { EuiIcon } from '../icon';

export const useColumnSelector = (
  availableColumns: EuiDataGridColumn[]
): [FunctionComponent<any>, EuiDataGridColumn[]] => {
  const [sortedColumns, setSortedColumns] = useState(availableColumns);

  const [visibleColumns, setVisibleColumns] = useState(availableColumns);
  const visibleColumnIds = visibleColumns.reduce((visibleColumnIds, { id }) => {
    visibleColumnIds.add(id);
    return visibleColumnIds;
  }, new Set());

  const [isOpen, setIsOpen] = useState(false);

  function onDragEnd({
    source: { index: sourceIndex },
    destination,
  }: DropResult) {
    const destinationIndex = destination!.index;
    const nextSortedColumns = [...sortedColumns];

    nextSortedColumns[sourceIndex] = sortedColumns[destinationIndex];
    nextSortedColumns[destinationIndex] = sortedColumns[sourceIndex];

    setSortedColumns(nextSortedColumns);

    const nextVisibleColumns = nextSortedColumns.filter(({ id }) =>
      visibleColumnIds.has(id)
    );
    setVisibleColumns(nextVisibleColumns);
  }

  const ColumnSelector = () => (
    <EuiPopover
      data-test-subj="dataGridColumnSelectorPopover"
      isOpen={isOpen}
      closePopover={() => setIsOpen(false)}
      button={
        <Fragment>
          <EuiButton iconType="apps" onClick={() => setIsOpen(!isOpen)}>
            Columns
          </EuiButton>
        </Fragment>
      }>
      <EuiDragDropContext onDragEnd={onDragEnd}>
        <EuiDroppable droppableId="columnOrder">
          <div>
            {sortedColumns.map(({ id }, index) => (
              <EuiDraggable key={id} draggableId={id} index={index}>
                {provided => (
                  <Fragment>
                    <div {...provided.dragHandleProps}>
                      <EuiIcon type="grab" />
                    </div>
                    <EuiSwitch
                      name={id}
                      label={id}
                      checked={visibleColumnIds.has(id)}
                      onChange={({
                        currentTarget: { checked },
                      }: React.FormEvent<HTMLInputElement>) => {
                        const nextVisibleColumns = sortedColumns.filter(
                          ({ id: columnId }) =>
                            checked
                              ? visibleColumnIds.has(columnId) ||
                                id === columnId
                              : visibleColumnIds.has(columnId) &&
                                id !== columnId
                        );
                        setVisibleColumns(nextVisibleColumns);
                      }}
                    />
                  </Fragment>
                )}
              </EuiDraggable>
            ))}
          </div>
        </EuiDroppable>
      </EuiDragDropContext>
    </EuiPopover>
  );

  return [ColumnSelector, visibleColumns];
};
