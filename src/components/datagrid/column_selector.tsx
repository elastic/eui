import React, {
  Fragment,
  FunctionComponent,
  useState,
  ReactChild,
} from 'react';
import classNames from 'classnames';
import { EuiDataGridColumn } from './data_grid_types';
// @ts-ignore-next-line
import { EuiPopover, EuiPopoverFooter, EuiPopoverTitle } from '../popover';
import { EuiI18n } from '../i18n';
// @ts-ignore-next-line
import { EuiButtonEmpty } from '../button';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
// @ts-ignore-next-line
import { EuiSwitch, EuiFieldText } from '../form';
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

  const numberOfHiddenFields = availableColumns.length - visibleColumns.length;

  const controlBtnClasses = classNames('euiDataGrid__controlBtn', {
    'euiDataGrid__controlBtn--active': numberOfHiddenFields > 0,
  });

  const ColumnSelector = () => (
    <EuiPopover
      data-test-subj="dataGridColumnSelectorPopover"
      isOpen={isOpen}
      closePopover={() => setIsOpen(false)}
      anchorPosition="downLeft"
      ownFocus
      panelPaddingSize="s"
      panelClassName="euiDataGridColumnSelectorPopover"
      button={
        <EuiI18n
          tokens={[
            'euiColumnSelector.button',
            'euiColumnSelector.buttonActive',
          ]}
          defaults={['Hide fields', 'fields hidden']}>
          {([button, buttonActive]: ReactChild[]) => (
            <EuiButtonEmpty
              size="xs"
              iconType="eyeClosed"
              color="text"
              className={controlBtnClasses}
              onClick={() => setIsOpen(!isOpen)}>
              {numberOfHiddenFields > 0
                ? `${numberOfHiddenFields} ${buttonActive}`
                : button}
            </EuiButtonEmpty>
          )}
        </EuiI18n>
      }>
      <EuiPopoverTitle>
        <EuiFieldText
          compressed
          placeholder="Search"
          aria-label="Search columns"
        />
      </EuiPopoverTitle>
      <div className="euiDataGridColumnSelector__columnList">
        <EuiDragDropContext onDragEnd={onDragEnd}>
          <EuiDroppable
            droppableId="columnOrder"
            className="euiDataGridColumnSelector">
            <Fragment>
              {sortedColumns.map(({ id }, index) => (
                <EuiDraggable key={id} draggableId={id} index={index}>
                  {(provided, state) => (
                    <div
                      className={`euiDataGridColumnSelector__item ${state.isDragging &&
                        'euiDataGridColumnSelector__item-isDragging'}`}>
                      <EuiFlexGroup gutterSize="m" alignItems="center">
                        <EuiFlexItem>
                          <EuiSwitch
                            name={id}
                            label={id}
                            checked={visibleColumnIds.has(id)}
                            compressed
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
      </div>
      <EuiPopoverFooter>
        <EuiFlexGroup gutterSize="s" justifyContent="spaceBetween">
          <EuiFlexItem>
            <EuiButtonEmpty
              size="xs"
              flush="left"
              onClick={() => setVisibleColumns(sortedColumns)}>
              <EuiI18n token="euiColumnSelector.selectAll" default="Show all" />
            </EuiButtonEmpty>
          </EuiFlexItem>
          <EuiFlexItem>
            <EuiButtonEmpty
              size="xs"
              flush="right"
              onClick={() => setVisibleColumns([])}>
              <EuiI18n token="euiColumnSelector.hideAll" default="Hide all" />
            </EuiButtonEmpty>
          </EuiFlexItem>
        </EuiFlexGroup>
      </EuiPopoverFooter>
    </EuiPopover>
  );

  return [ColumnSelector, visibleColumns];
};
