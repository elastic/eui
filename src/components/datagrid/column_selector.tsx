import React, {
  Fragment,
  useState,
  ReactChild,
  ReactElement,
  ChangeEvent,
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
): [ReactElement, EuiDataGridColumn[]] => {
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

  const [columnSearchText, setColumnSearchText] = useState('');

  const controlBtnClasses = classNames('euiDataGrid__controlBtn', {
    'euiDataGrid__controlBtn--active': numberOfHiddenFields > 0,
  });

  const filteredColumns = sortedColumns.filter(
    ({ id }) => id.toLowerCase().indexOf(columnSearchText.toLowerCase()) !== -1
  );
  const isDragEnabled = columnSearchText.length === 0; // only allow drag-and-drop when not filtering columns

  const columnSelector = (
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
      <div>
        <EuiPopoverTitle>
          <EuiFieldText
            compressed
            placeholder="Search"
            aria-label="Search columns"
            value={columnSearchText}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setColumnSearchText(e.currentTarget.value)
            }
          />
        </EuiPopoverTitle>
        <EuiDragDropContext onDragEnd={onDragEnd}>
          <EuiDroppable
            droppableId="columnOrder"
            isDropDisabled={!isDragEnabled}
            className="euiDataGridColumnSelector">
            <Fragment>
              {filteredColumns.map(({ id }, index) => (
                <EuiDraggable
                  key={id}
                  draggableId={id}
                  index={index}
                  isDragDisabled={!isDragEnabled}>
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
                            className="euiSwitch--mini"
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
                        {isDragEnabled && (
                          <EuiFlexItem grow={false}>
                            <EuiIcon type="grab" color="subdued" />
                          </EuiFlexItem>
                        )}
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

  return [columnSelector, visibleColumns];
};
