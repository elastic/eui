import React, {
  Fragment,
  useState,
  ReactChild,
  ReactNode,
  useEffect,
} from 'react';
import classNames from 'classnames';
import { EuiDataGridColumn, EuiDataGridSorting } from './data_grid_types';
import { EuiPopover, EuiPopoverFooter } from '../popover';
import { EuiI18n } from '../i18n';
import { EuiText } from '../text';
import { EuiButtonEmpty } from '../button';
import { EuiFlexGroup, EuiFlexItem } from '../flex';
import {
  EuiDragDropContext,
  EuiDroppable,
  euiDragDropReorder,
} from '../drag_and_drop';
import { DropResult } from 'react-beautiful-dnd';
import { EuiIcon } from '../icon';
import { EuiDataGridColumnSortingDraggable } from './column_sorting_draggable';
import {
  EuiDataGridSchema,
  EuiDataGridSchemaDetector,
  getDetailsForSchema,
} from './data_grid_schema';
import { palettes } from '../../services/color/eui_palettes';

export const useColumnSorting = (
  columns: EuiDataGridColumn[],
  sorting: EuiDataGridSorting | undefined,
  schema: EuiDataGridSchema,
  schemaDetectors: EuiDataGridSchemaDetector[]
): ReactNode => {
  const [isOpen, setIsOpen] = useState(false);
  const [avilableColumnsisOpen, setAvailableColumnsIsOpen] = useState(false);
  const defaultSchemaColor: string = palettes.euiPaletteColorBlind.colors[4];

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
    const nextColumns = euiDragDropReorder(
      sorting!.columns,
      sourceIndex,
      destinationIndex
    );

    sorting!.onSort(nextColumns);
  }

  const controlBtnClasses = classNames('euiDataGrid__controlBtn', {
    'euiDataGrid__controlBtn--active': sorting.columns.length > 0,
  });

  const numberOfSortedFields = sorting.columns.length;

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
        <EuiI18n
          tokens={['euiColumnSorting.button', 'euiColumnSorting.buttonActive']}
          defaults={['Sort fields', 'fields sorted']}>
          {([button, buttonActive]: ReactChild[]) => (
            <EuiButtonEmpty
              size="xs"
              iconType="sortable"
              color="text"
              className={controlBtnClasses}
              data-test-subj="dataGridColumnSortingButton"
              onClick={() => setIsOpen(!isOpen)}>
              {numberOfSortedFields > 0
                ? `${numberOfSortedFields} ${buttonActive}`
                : button}
            </EuiButtonEmpty>
          )}
        </EuiI18n>
      }>
      {sorting.columns.length > 0 ? (
        <div role="region" aria-live="assertive">
          <EuiDragDropContext onDragEnd={onDragEnd}>
            <EuiDroppable
              droppableId="columnSorting"
              className="euiDataGridColumnSorting">
              <Fragment>
                {sorting.columns.map(({ id, direction }, index) => {
                  return (
                    <EuiDataGridColumnSortingDraggable
                      key={id}
                      id={id}
                      direction={direction}
                      index={index}
                      sorting={sorting}
                      schema={schema}
                      schemaDetectors={schemaDetectors}
                      defaultSchemaColor={defaultSchemaColor}
                    />
                  );
                })}
              </Fragment>
            </EuiDroppable>
          </EuiDragDropContext>
        </div>
      ) : (
        <EuiText size="s" color="subdued">
          <p role="alert">
            <EuiI18n
              token="euiColumnSorting.emptySorting"
              default="Currently no fields are sorted"
            />
          </p>
        </EuiText>
      )}
      {(inactiveColumns.length > 0 || sorting.columns.length > 0) && (
        <EuiPopoverFooter>
          <EuiFlexGroup
            gutterSize="m"
            justifyContent="spaceBetween"
            responsive={false}>
            <EuiFlexItem grow={false}>
              {inactiveColumns.length > 0 && (
                <EuiPopover
                  data-test-subj="dataGridColumnSortingPopoverColumnSelection"
                  isOpen={avilableColumnsisOpen}
                  closePopover={() => setAvailableColumnsIsOpen(false)}
                  anchorPosition="downLeft"
                  ownFocus
                  panelPaddingSize="s"
                  button={
                    <EuiButtonEmpty
                      size="xs"
                      flush="left"
                      iconType="arrowDown"
                      iconSide="right"
                      onClick={() =>
                        setAvailableColumnsIsOpen(!avilableColumnsisOpen)
                      }>
                      <EuiI18n
                        token="euiColumnSorting.pickFields"
                        default="Pick fields to sort by"
                      />
                    </EuiButtonEmpty>
                  }>
                  <EuiI18n
                    token="euiColumnSorting.sortFieldAriaLabel"
                    default="Sort by: ">
                    {(sortFieldAriaLabel: string) => (
                      <div
                        className="euiDataGridColumnSorting__fieldList"
                        role="listbox">
                        {inactiveColumns.map(({ id }) => (
                          <button
                            key={id}
                            className="euiDataGridColumnSorting__field"
                            aria-label={`${sortFieldAriaLabel} ${id}`}
                            role="option"
                            aria-selected="false"
                            data-test-subj={`dataGridColumnSortingPopoverColumnSelection-${id}`}
                            onClick={() => {
                              const nextColumns = [...sorting.columns];
                              nextColumns.push({ id, direction: 'asc' });
                              sorting.onSort(nextColumns);
                            }}>
                            <EuiFlexGroup
                              alignItems="center"
                              gutterSize="s"
                              component="span">
                              <EuiFlexItem grow={false}>
                                <EuiIcon
                                  color={
                                    schema.hasOwnProperty(id) &&
                                    schema[id].columnType != null
                                      ? getDetailsForSchema(
                                          schemaDetectors,
                                          schema[id].columnType
                                        ).color
                                      : defaultSchemaColor
                                  }
                                  type={
                                    schema.hasOwnProperty(id) &&
                                    schema[id].columnType != null
                                      ? getDetailsForSchema(
                                          schemaDetectors,
                                          schema[id].columnType
                                        ).icon
                                      : 'string'
                                  }
                                />
                              </EuiFlexItem>
                              <EuiFlexItem grow={false}>
                                <EuiText size="xs">
                                  <span>{id}</span>
                                </EuiText>
                              </EuiFlexItem>
                            </EuiFlexGroup>
                          </button>
                        ))}
                      </div>
                    )}
                  </EuiI18n>
                </EuiPopover>
              )}
            </EuiFlexItem>
            {sorting.columns.length > 0 ? (
              <EuiFlexItem grow={false}>
                <EuiButtonEmpty
                  size="xs"
                  flush="right"
                  onClick={() => sorting.onSort([])}>
                  <EuiI18n
                    token="euiColumnSorting.clearAll"
                    default="Clear sorting"
                  />
                </EuiButtonEmpty>
              </EuiFlexItem>
            ) : null}
          </EuiFlexGroup>
        </EuiPopoverFooter>
      )}
    </EuiPopover>
  );

  return columnSorting;
};
