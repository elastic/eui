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

import React, {
  Fragment,
  useState,
  useMemo,
  useCallback,
  ReactElement,
  ChangeEvent,
} from 'react';
import classNames from 'classnames';
import {
  EuiDataGridColumn,
  EuiDataGridColumnVisibility,
  EuiDataGridToolBarVisibilityColumnSelectorOptions,
  EuiDataGridToolBarVisibilityOptions,
} from './data_grid_types';
import { EuiPopover, EuiPopoverFooter, EuiPopoverTitle } from '../popover';
import { EuiI18n } from '../i18n';
import { EuiButtonEmpty } from '../button';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import { EuiSwitch, EuiFieldText } from '../form';
import {
  EuiDragDropContext,
  EuiDraggable,
  EuiDroppable,
  euiDragDropReorder,
} from '../drag_and_drop';
import { DropResult } from 'react-beautiful-dnd';
import { EuiIcon } from '../icon';
import { useDependentState } from '../../services';

const getShowColumnSelectorValue = (
  showColumnSelector: EuiDataGridToolBarVisibilityOptions['showColumnSelector'],
  valueName: keyof EuiDataGridToolBarVisibilityColumnSelectorOptions
) => {
  if (showColumnSelector === false) return false;
  if (showColumnSelector == null) return true;
  if (showColumnSelector === true) return true;
  return showColumnSelector[valueName] !== false;
};

export const useDataGridColumnSelector = (
  availableColumns: EuiDataGridColumn[],
  columnVisibility: EuiDataGridColumnVisibility,
  showColumnSelector: EuiDataGridToolBarVisibilityOptions['showColumnSelector'],
  displayValues: { [key: string]: string }
): [
  ReactElement,
  EuiDataGridColumn[],
  (columns: string[]) => void,
  (colFrom: string, colTo: string) => void
] => {
  const allowColumnHiding = getShowColumnSelectorValue(
    showColumnSelector,
    'allowHide'
  );
  const allowColumnReorder = getShowColumnSelectorValue(
    showColumnSelector,
    'allowReorder'
  );

  const [sortedColumns, setSortedColumns] = useDependentState(
    () => availableColumns.map(({ id }) => id),
    [availableColumns]
  );

  const { visibleColumns, setVisibleColumns } = columnVisibility;
  const visibleColumnIds = useMemo(() => new Set(visibleColumns), [
    visibleColumns,
  ]);

  const [isOpen, setIsOpen] = useState(false);

  const setColumns = useCallback(
    (nextColumns: string[]) => {
      setSortedColumns(nextColumns);

      const nextVisibleColumns = nextColumns.filter((id) =>
        visibleColumnIds.has(id)
      );
      setVisibleColumns(nextVisibleColumns);
    },
    [setSortedColumns, setVisibleColumns, visibleColumnIds]
  );

  function onDragEnd({
    source: { index: sourceIndex },
    destination,
  }: DropResult) {
    const destinationIndex = destination!.index;
    const nextSortedColumns = euiDragDropReorder(
      sortedColumns,
      sourceIndex,
      destinationIndex
    );
    setColumns(nextSortedColumns);
  }

  const numberOfHiddenFields = availableColumns.length - visibleColumns.length;

  const [columnSearchText, setColumnSearchText] = useState('');

  const controlBtnClasses = classNames('euiDataGrid__controlBtn', {
    'euiDataGrid__controlBtn--active': numberOfHiddenFields > 0,
  });

  const filteredColumns = sortedColumns.filter(
    (id) =>
      (displayValues[id] || id)
        .toLowerCase()
        .indexOf(columnSearchText.toLowerCase()) !== -1
  );

  const isDragEnabled = allowColumnReorder && columnSearchText.length === 0; // only allow drag-and-drop when not filtering columns

  let buttonText = (
    <EuiI18n token="euiColumnSelector.button" default="Columns" />
  );

  if (numberOfHiddenFields === 1) {
    buttonText = (
      <EuiI18n
        token="euiColumnSelector.buttonActiveSingular"
        default="{numberOfHiddenFields} column hidden"
        values={{ numberOfHiddenFields }}
      />
    );
  } else if (numberOfHiddenFields > 1) {
    buttonText = (
      <EuiI18n
        token="euiColumnSelector.buttonActivePlural"
        default="{numberOfHiddenFields} columns hidden"
        values={{ numberOfHiddenFields }}
      />
    );
  }

  const columnSelector = (
    <EuiPopover
      data-test-subj="dataGridColumnSelectorPopover"
      isOpen={isOpen}
      closePopover={() => setIsOpen(false)}
      anchorPosition="downLeft"
      panelPaddingSize="s"
      panelClassName="euiDataGridColumnSelectorPopover"
      button={
        <EuiButtonEmpty
          size="xs"
          iconType={allowColumnHiding ? 'listAdd' : 'list'}
          color="text"
          className={controlBtnClasses}
          data-test-subj="dataGridColumnSelectorButton"
          onClick={() => setIsOpen(!isOpen)}>
          {buttonText}
        </EuiButtonEmpty>
      }>
      <div>
        {allowColumnHiding && (
          <EuiPopoverTitle>
            <EuiI18n
              tokens={[
                'euiColumnSelector.search',
                'euiColumnSelector.searchcolumns',
              ]}
              defaults={['Search', 'Search columns']}>
              {([search, searchcolumns]: string[]) => (
                <EuiFieldText
                  compressed
                  placeholder={search}
                  aria-label={searchcolumns}
                  value={columnSearchText}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setColumnSearchText(e.currentTarget.value)
                  }
                />
              )}
            </EuiI18n>
          </EuiPopoverTitle>
        )}
        <div className="euiDataGrid__controlScroll">
          <EuiDragDropContext onDragEnd={onDragEnd}>
            <EuiDroppable
              droppableId="columnOrder"
              isDropDisabled={!isDragEnabled}>
              <Fragment>
                {filteredColumns.map((id, index) => (
                  <EuiDraggable
                    key={id}
                    draggableId={id}
                    index={index}
                    isDragDisabled={!isDragEnabled}>
                    {(provided, state) => (
                      <div
                        className={`euiDataGridColumnSelector__item ${
                          state.isDragging &&
                          'euiDataGridColumnSelector__item-isDragging'
                        }`}>
                        <EuiFlexGroup
                          responsive={false}
                          gutterSize="m"
                          alignItems="center">
                          <EuiFlexItem>
                            {allowColumnHiding ? (
                              <EuiSwitch
                                name={id}
                                label={displayValues[id] || id}
                                checked={visibleColumnIds.has(id)}
                                compressed
                                className="euiSwitch--mini"
                                onChange={(event) => {
                                  const {
                                    target: { checked },
                                  } = event;
                                  const nextVisibleColumns = sortedColumns.filter(
                                    (columnId) =>
                                      checked
                                        ? visibleColumnIds.has(columnId) ||
                                          id === columnId
                                        : visibleColumnIds.has(columnId) &&
                                          id !== columnId
                                  );
                                  setVisibleColumns(nextVisibleColumns);
                                }}
                              />
                            ) : (
                              <span className="euiDataGridColumnSelector__itemLabel">
                                {id}
                              </span>
                            )}
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
      </div>
      {allowColumnHiding && (
        <EuiPopoverFooter>
          <EuiFlexGroup
            gutterSize="s"
            responsive={false}
            justifyContent="spaceBetween">
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty
                size="xs"
                flush="left"
                onClick={() => setVisibleColumns(sortedColumns)}>
                <EuiI18n
                  token="euiColumnSelector.selectAll"
                  default="Show all"
                />
              </EuiButtonEmpty>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButtonEmpty
                size="xs"
                flush="right"
                onClick={() => setVisibleColumns([])}>
                <EuiI18n token="euiColumnSelector.hideAll" default="Hide all" />
              </EuiButtonEmpty>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiPopoverFooter>
      )}
    </EuiPopover>
  );

  const orderedVisibleColumns = useMemo(
    () =>
      visibleColumns
        .map<EuiDataGridColumn>(
          (columnId) =>
            availableColumns.find(
              ({ id }) => id === columnId
            ) as EuiDataGridColumn // cast to avoid `undefined`, it filters those out next
        )
        .filter((column) => column != null),
    [availableColumns, visibleColumns]
  );
  /**
   * Used for moving columns left/right, available in the headers actions menu
   */
  const switchColumnPos = useCallback(
    (fromColId: string, toColId: string) => {
      const moveFromIdx = sortedColumns.indexOf(fromColId);
      const moveToIdx = sortedColumns.indexOf(toColId);
      if (moveFromIdx === -1 || moveToIdx === -1) {
        return;
      }
      const nextSortedColumns = [...sortedColumns];
      nextSortedColumns.splice(moveFromIdx, 1);
      nextSortedColumns.splice(moveToIdx, 0, fromColId);
      setColumns(nextSortedColumns);
    },
    [setColumns, sortedColumns]
  );

  return [
    columnSelector,
    orderedVisibleColumns,
    setVisibleColumns,
    switchColumnPos,
  ];
};
