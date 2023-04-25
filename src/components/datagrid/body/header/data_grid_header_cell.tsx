/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classnames from 'classnames';
import React, {
  AriaAttributes,
  FunctionComponent,
  useContext,
  useState,
  useRef,
  useCallback,
  useMemo,
} from 'react';
import { tabbable, FocusableElement } from 'tabbable';
import { keys } from '../../../../services';
import { useGeneratedHtmlId } from '../../../../services/accessibility';
import { EuiScreenReaderOnly } from '../../../accessibility';
import { EuiI18n } from '../../../i18n';
import { EuiIcon } from '../../../icon';
import { EuiListGroup } from '../../../list_group';
import { EuiPopover } from '../../../popover';
import { DataGridSortingContext } from '../../utils/sorting';
import { DataGridFocusContext } from '../../utils/focus';
import {
  EuiDataGridHeaderCellProps,
  EuiDataGridSorting,
} from '../../data_grid_types';

import { getColumnActions } from './column_actions';
import { EuiDataGridColumnResizer } from './data_grid_column_resizer';
import { EuiDataGridHeaderCellWrapper } from './data_grid_header_cell_wrapper';

export const EuiDataGridHeaderCell: FunctionComponent<EuiDataGridHeaderCellProps> = ({
  column,
  index,
  columns,
  columnWidths,
  schema,
  schemaDetectors,
  defaultColumnWidth,
  setColumnWidth,
  setVisibleColumns,
  switchColumnPos,
  headerIsInteractive,
}) => {
  const { id, display, displayAsText, displayHeaderCellProps } = column;
  const width = columnWidths[id] || defaultColumnWidth;

  const columnType = schema[id] ? schema[id].columnType : null;
  const classes = classnames(
    { [`euiDataGridHeaderCell--${columnType}`]: columnType },
    displayHeaderCellProps?.className
  );

  const { setFocusedCell, focusFirstVisibleInteractiveCell } = useContext(
    DataGridFocusContext
  );
  const { sorting } = useContext(DataGridSortingContext);

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverArrowNavigationProps = usePopoverArrowNavigation();

  const columnActions = getColumnActions({
    column,
    columns,
    schema,
    schemaDetectors,
    setVisibleColumns,
    focusFirstVisibleInteractiveCell,
    setIsPopoverOpen,
    sorting,
    switchColumnPos,
    setFocusedCell,
  });

  const showColumnActions = columnActions && columnActions.length > 0;

  const { sortingArrow, ariaSort, sortingScreenReaderText } = useSortingUtils({
    sorting,
    id,
    showColumnActions,
  });
  const sortingAriaId = useGeneratedHtmlId({
    prefix: 'euiDataGridCellHeader',
    suffix: 'sorting',
  });
  const actionsAriaId = useGeneratedHtmlId({
    prefix: 'euiDataGridCellHeader',
    suffix: 'actions',
  });

  return (
    <EuiDataGridHeaderCellWrapper
      {...displayHeaderCellProps}
      className={classes}
      id={id}
      index={index}
      width={width}
      headerIsInteractive={headerIsInteractive}
      aria-sort={ariaSort}
    >
      {column.isResizable !== false && width != null ? (
        <EuiDataGridColumnResizer
          columnId={id}
          columnWidth={width}
          setColumnWidth={setColumnWidth}
        />
      ) : null}

      {!showColumnActions ? (
        <>
          {sortingArrow}
          <div
            className="euiDataGridHeaderCell__content"
            title={displayAsText || id}
          >
            {display || displayAsText || id}
          </div>
          {sortingScreenReaderText && (
            <EuiScreenReaderOnly>
              <p>{sortingScreenReaderText}</p>
            </EuiScreenReaderOnly>
          )}
        </>
      ) : (
        <>
          <EuiPopover
            className="eui-fullWidth"
            anchorClassName="eui-fullWidth"
            panelPaddingSize="none"
            offset={7}
            button={
              <button
                className="euiDataGridHeaderCell__button"
                onClick={() => {
                  setFocusedCell([index, -1]);
                  setIsPopoverOpen((isPopoverOpen) => !isPopoverOpen);
                }}
                aria-describedby={`${sortingAriaId} ${actionsAriaId}`}
              >
                {sortingArrow}
                <div
                  className="euiDataGridHeaderCell__content"
                  title={displayAsText || id}
                >
                  {display || displayAsText || id}
                </div>
                <EuiIcon
                  className="euiDataGridHeaderCell__icon"
                  type="arrowDown"
                  size="s"
                  color="text"
                  data-test-subj={`dataGridHeaderCellActionButton-${id}`}
                />
              </button>
            }
            isOpen={isPopoverOpen}
            closePopover={() => setIsPopoverOpen(false)}
            {...popoverArrowNavigationProps}
          >
            <EuiListGroup
              listItems={columnActions}
              gutterSize="none"
              data-test-subj={`dataGridHeaderCellActionGroup-${id}`}
            />
          </EuiPopover>

          <p id={sortingAriaId} hidden>
            {sortingScreenReaderText}
          </p>
          <p id={actionsAriaId} hidden>
            <EuiI18n
              token="euiDataGridHeaderCell.headerActions"
              default="Click to view column header actions"
            />
          </p>
        </>
      )}
    </EuiDataGridHeaderCellWrapper>
  );
};

/**
 * Column sorting utility helpers
 */
export const useSortingUtils = ({
  sorting,
  id,
  showColumnActions,
}: {
  sorting?: EuiDataGridSorting;
  id: string;
  showColumnActions: boolean;
}) => {
  const sortedColumn = useMemo(
    () => sorting?.columns.find((col) => col.id === id),
    [sorting, id]
  );
  const isColumnSorted = !!sortedColumn;
  const hasOnlyOneSort = sorting?.columns?.length === 1;

  /**
   * Arrow icon
   */
  const sortingArrow = isColumnSorted ? (
    <EuiIcon
      type={sortedColumn.direction === 'asc' ? 'sortUp' : 'sortDown'}
      color="text"
      className="euiDataGridHeaderCell__sortingArrow"
      data-test-subj={`dataGridHeaderCellSortingIcon-${id}`}
    />
  ) : null;

  /**
   * aria-sort attribute - should only be used when a single column is being sorted
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-sort
   * @see https://www.w3.org/WAI/ARIA/apg/example-index/table/sortable-table.html
   * @see https://github.com/w3c/aria/issues/283 for potential future multi-column usage
   */
  const ariaSort: AriaAttributes['aria-sort'] =
    // eslint-disable-next-line no-nested-ternary
    isColumnSorted && hasOnlyOneSort
      ? sorting.columns[0].direction === 'asc'
        ? 'ascending'
        : 'descending'
      : undefined;

  /**
   * Sorting status - screen reader text
   */
  const sortingScreenReaderText = useMemo(() => {
    if (!isColumnSorted) return null;
    if (!showColumnActions && hasOnlyOneSort) return null; // in this scenario, the `aria-sort` attribute will be used by screen readers
    return (
      <>
        {sorting?.columns?.map(({ id: columnId, direction }, index) => {
          if (hasOnlyOneSort) {
            if (direction === 'asc') {
              return (
                <EuiI18n
                  token="euiDataGridHeaderCell.sortedByAscendingSingle"
                  default="Sorted ascending"
                  key={index}
                />
              );
            } else {
              return (
                <EuiI18n
                  token="euiDataGridHeaderCell.sortedByDescendingSingle"
                  default="Sorted descending"
                  key={index}
                />
              );
            }
          } else if (index === 0) {
            if (direction === 'asc') {
              return (
                <EuiI18n
                  token="euiDataGridHeaderCell.sortedByAscendingFirst"
                  default="Sorted by {columnId}, ascending"
                  values={{ columnId }}
                  key={index}
                />
              );
            } else {
              return (
                <EuiI18n
                  token="euiDataGridHeaderCell.sortedByDescendingFirst"
                  default="Sorted by {columnId}, descending"
                  values={{ columnId }}
                  key={index}
                />
              );
            }
          } else {
            if (direction === 'asc') {
              return (
                <EuiI18n
                  token="euiDataGridHeaderCell.sortedByAscendingMultiple"
                  default=", then sorted by {columnId}, ascending"
                  values={{ columnId }}
                  key={index}
                />
              );
            } else {
              return (
                <EuiI18n
                  token="euiDataGridHeaderCell.sortedByDescendingMultiple"
                  default=", then sorted by {columnId}, descending"
                  values={{ columnId }}
                  key={index}
                />
              );
            }
          }
        })}
        .
      </>
    );
  }, [isColumnSorted, showColumnActions, hasOnlyOneSort, sorting]);

  return { sortingArrow, ariaSort, sortingScreenReaderText };
};

/**
 * Add keyboard arrow navigation to the cell actions popover
 * to match the UX of the rest of EuiDataGrid
 */
export const usePopoverArrowNavigation = () => {
  const popoverPanelRef = useRef<HTMLElement | null>(null);
  const actionsRef = useRef<FocusableElement[] | undefined>(undefined);
  const panelRef = useCallback((ref) => {
    popoverPanelRef.current = ref;
    actionsRef.current = ref ? tabbable(ref) : undefined;
  }, []);

  const onKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key !== keys.ARROW_DOWN && e.key !== keys.ARROW_UP) return;
    if (!actionsRef.current?.length) return;

    e.preventDefault();

    const initialState = document.activeElement === popoverPanelRef.current;
    const currentIndex = !initialState
      ? actionsRef.current.findIndex((el) => document.activeElement === el)
      : -1;
    const lastIndex = actionsRef.current.length - 1;

    let indexToFocus: number;
    if (initialState) {
      if (e.key === keys.ARROW_DOWN) {
        indexToFocus = 0;
      } else if (e.key === keys.ARROW_UP) {
        indexToFocus = lastIndex;
      }
    } else {
      if (e.key === keys.ARROW_DOWN) {
        indexToFocus = currentIndex + 1;
        if (indexToFocus > lastIndex) {
          indexToFocus = 0;
        }
      } else if (e.key === keys.ARROW_UP) {
        indexToFocus = currentIndex - 1;
        if (indexToFocus < 0) {
          indexToFocus = lastIndex;
        }
      }
    }

    actionsRef.current[indexToFocus!].focus();
  }, []);

  return {
    panelRef,
    panelProps: { onKeyDown },
    popoverScreenReaderText: (
      <EuiI18n
        token="euiDataGridHeaderCell.actionsPopoverScreenReaderText"
        default="To navigate through the list of column actions, press the Tab or Up and Down arrow keys."
      />
    ),
  };
};
