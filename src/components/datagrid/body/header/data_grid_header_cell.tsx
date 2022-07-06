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
  HTMLAttributes,
  useContext,
  useState,
  useRef,
  useCallback,
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
import { EuiDataGridHeaderCellProps } from '../../data_grid_types';

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
  const { id, display, displayAsText } = column;
  const width = columnWidths[id] || defaultColumnWidth;

  const columnType = schema[id] ? schema[id].columnType : null;
  const classes = classnames({
    [`euiDataGridHeaderCell--${columnType}`]: columnType,
  });

  const ariaProps: {
    'aria-sort'?: AriaAttributes['aria-sort'];
    'aria-describedby'?: AriaAttributes['aria-describedby'];
  } = {};
  const screenReaderId = useGeneratedHtmlId();
  const actionsAriaId = useGeneratedHtmlId({
    prefix: 'euiDataGridCellHeader',
    suffix: 'actions',
  });

  const { setFocusedCell, focusFirstVisibleInteractiveCell } = useContext(
    DataGridFocusContext
  );

  const { sorting } = useContext(DataGridSortingContext);
  let sortString;
  if (sorting) {
    const sortedColumnIds = new Set(sorting.columns.map(({ id }) => id));
    if (sortedColumnIds.has(id)) {
      if (sorting.columns.length === 1) {
        const sortDirection = sorting.columns[0].direction;

        let sortValue: HTMLAttributes<HTMLDivElement>['aria-sort'] = 'other';
        if (sortDirection === 'asc') {
          sortValue = 'ascending';
        }
        if (sortDirection === 'desc') {
          sortValue = 'descending';
        }

        ariaProps['aria-sort'] = sortValue;
      } else {
        sortString = sorting.columns
          .map((col) => `Sorted by ${col.id} ${col.direction}`)
          .join(' then ');
        ariaProps['aria-describedby'] = screenReaderId;
      }
    }
  }

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
  const sortedColumn = sorting?.columns.find((col) => col.id === id);
  const sortingArrow = sortedColumn ? (
    <EuiIcon
      type={sortedColumn.direction === 'asc' ? 'sortUp' : 'sortDown'}
      color="text"
      className="euiDataGridHeaderCell__sortingArrow"
      data-test-subj={`dataGridHeaderCellSortingIcon-${id}`}
    />
  ) : null;

  return (
    <EuiDataGridHeaderCellWrapper
      id={id}
      index={index}
      width={width}
      headerIsInteractive={headerIsInteractive}
      className={classes}
      {...ariaProps}
    >
      {column.isResizable !== false && width != null ? (
        <EuiDataGridColumnResizer
          columnId={id}
          columnWidth={width}
          setColumnWidth={setColumnWidth}
        />
      ) : null}

      {sortString && (
        <EuiScreenReaderOnly>
          <div id={screenReaderId}>{sortString}</div>
        </EuiScreenReaderOnly>
      )}
      {!showColumnActions ? (
        <>
          {sortingArrow}
          <div
            className="euiDataGridHeaderCell__content"
            title={displayAsText || id}
          >
            {display || displayAsText || id}
          </div>
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
                aria-describedby={`euiDataGridCellHeaderActions-${id}`}
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
