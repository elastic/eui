/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  useContext,
  useState,
  useMemo,
  useCallback,
  useRef,
  Ref,
  KeyboardEventHandler,
  FunctionComponent,
  memo,
  useEffect,
} from 'react';
import { tabbable, FocusableElement } from 'tabbable';

import { keys, useEuiMemoizedStyles } from '../../../../services';
// Keep the i18n scope the same as EuiDataGridHeaderCell
/* eslint-disable local/i18n */
import { EuiI18n, useEuiI18n } from '../../../i18n';
import { EuiPopover } from '../../../popover';
import { EuiListGroup, EuiListGroupItemProps } from '../../../list_group';
import { EuiButtonIcon } from '../../../button';

import {
  EuiDataGridHeaderCellProps,
  EuiDataGridColumn,
  EuiDataGridColumnActions,
  EuiDataGridSchema,
  EuiDataGridSchemaDetector,
  EuiDataGridSorting,
  DataGridFocusContextShape,
} from '../../data_grid_types';
import { DataGridFocusContext } from '../../utils/focus';
import { getDetailsForSchema } from '../../utils/data_grid_schema';
import {
  defaultSortAscLabel,
  defaultSortDescLabel,
} from '../../controls/column_sorting_draggable';
import { euiDataGridHeaderCellStyles } from './data_grid_header_cell.styles';

export const useHasColumnActions = (
  columnActions: EuiDataGridColumn['actions']
) =>
  useMemo(() => {
    // By default, all column actions are enabled
    if (columnActions === undefined) return true;
    if (columnActions === false) return false;
    if (columnActions.additional && columnActions.additional.length)
      return true;
    // Check if all (currently 5) default column actions have been manually disabled
    const disabledActions = Object.values(columnActions).filter(
      (action) => action === false
    );
    return disabledActions.length < 5;
  }, [columnActions]);

// Props to pass back to EuiDataGridHeaderCell and set on EuiDataGridHeaderCellWrapper
export type PropsFromColumnActions = {
  className?: string;
  onKeyDown?: KeyboardEventHandler;
  'data-column-moving'?: boolean;
};

export const ColumnActions: FunctionComponent<
  Pick<
    EuiDataGridHeaderCellProps,
    | 'index'
    | 'column'
    | 'columns'
    | 'schema'
    | 'schemaDetectors'
    | 'setVisibleColumns'
    | 'switchColumnPos'
    | 'sorting'
  > & {
    id: string;
    title: string;
    hasFocusTrap: boolean;
    setPropsFromColumnActions: (props: PropsFromColumnActions) => void;
    actionsButtonRef: Ref<HTMLButtonElement>;
  }
> = memo(
  ({
    index,
    id,
    title,
    column,
    columns,
    schema,
    schemaDetectors,
    setVisibleColumns,
    switchColumnPos,
    sorting,
    hasFocusTrap,
    setPropsFromColumnActions,
    actionsButtonRef,
  }) => {
    /**
     * Popover logic and accessibility
     */
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const togglePopover = useCallback(() => {
      setIsPopoverOpen((isOpen) => !isOpen);
    }, []);
    const closePopover = useCallback(() => {
      setIsPopoverOpen(false);
    }, []);

    const actionsButtonAriaLabel = useEuiI18n(
      'euiDataGridHeaderCell.actionsButtonAriaLabel',
      '{title}. Click to view column header actions.',
      { title }
    );
    const actionsEnterKeyInstructions = useEuiI18n(
      'euiDataGridHeaderCell.actionsEnterKeyInstructions',
      "Press the Enter key to view this column's actions"
    );
    const openActionsPopoverOnEnter: KeyboardEventHandler = useCallback((e) => {
      if (e.key === keys.ENTER) {
        setIsPopoverOpen(true);
      }
    }, []);
    const popoverArrowNavigationProps = usePopoverArrowNavigation();

    /**
     * Props to set on parent EuiDataGridHeaderCell
     */
    const [isColumnMoving, setIsColumnMoving] = useState(false);

    useEffect(() => {
      setPropsFromColumnActions({
        className: isPopoverOpen
          ? 'euiDataGridHeaderCell--isActionsPopoverOpen'
          : '',
        onKeyDown: openActionsPopoverOnEnter,
        'data-column-moving': isColumnMoving || undefined,
      });
    }, [
      setPropsFromColumnActions,
      isPopoverOpen,
      openActionsPopoverOnEnter,
      isColumnMoving,
    ]);

    /**
     * Get column actions as an array of EuiListGroup items
     */
    const { setFocusedCell, focusFirstVisibleInteractiveCell } =
      useContext(DataGridFocusContext);

    const columnActions = useMemo(() => {
      return getColumnActions({
        column,
        columns,
        schema,
        schemaDetectors,
        setVisibleColumns,
        focusFirstVisibleInteractiveCell,
        sorting,
        switchColumnPos,
        setIsPopoverOpen,
        setIsColumnMoving,
        setFocusedCell,
        columnFocusIndex: index,
      });
    }, [
      column,
      columns,
      schema,
      schemaDetectors,
      setVisibleColumns,
      focusFirstVisibleInteractiveCell,
      sorting,
      switchColumnPos,
      setFocusedCell,
      index,
    ]);

    /**
     * Rendering
     */
    const styles = useEuiMemoizedStyles(euiDataGridHeaderCellStyles);

    return (
      <EuiPopover
        display="block"
        panelPaddingSize="none"
        offset={7}
        anchorPosition="downRight"
        css={styles.euiDataGridHeaderCell__popover}
        button={
          <EuiButtonIcon
            iconType="boxesVertical"
            iconSize="s"
            color="text"
            className="euiDataGridHeaderCell__button"
            onClick={togglePopover}
            buttonRef={actionsButtonRef}
            aria-label={
              hasFocusTrap
                ? actionsButtonAriaLabel
                : actionsEnterKeyInstructions
            }
            css={[
              styles.euiDataGridHeaderCell__actions.action,
              styles.euiDataGridHeaderCell__actions.end,
            ]}
            data-test-subj={`dataGridHeaderCellActionButton-${id}`}
          />
        }
        isOpen={isPopoverOpen}
        closePopover={closePopover}
        {...popoverArrowNavigationProps}
      >
        <EuiListGroup
          listItems={columnActions}
          gutterSize="none"
          data-test-subj={`dataGridHeaderCellActionGroup-${id}`}
        />
      </EuiPopover>
    );
  }
);
ColumnActions.displayName = 'EuiDataGridHeaderCellColumnActions';

/**
 * Add keyboard arrow navigation to the cell actions popover
 * to match the UX of the rest of EuiDataGrid
 */
export const usePopoverArrowNavigation = () => {
  const popoverPanelRef = useRef<HTMLElement | null>(null);
  const actionsRef = useRef<FocusableElement[] | undefined>(undefined);
  const panelRef = useCallback((ref: HTMLElement | null) => {
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

/**
 * Logic for returning an array of actions/items to pass to EuiListGroup
 */

interface GetColumnActions {
  column: EuiDataGridColumn;
  columns: EuiDataGridColumn[];
  schema: EuiDataGridSchema;
  schemaDetectors: EuiDataGridSchemaDetector[];
  setVisibleColumns: (columnId: string[]) => void;
  focusFirstVisibleInteractiveCell: DataGridFocusContextShape['focusFirstVisibleInteractiveCell'];
  setIsPopoverOpen: (value: boolean) => void;
  sorting: EuiDataGridSorting | undefined;
  switchColumnPos: (colFromId: string, colToId: string) => void;
  setIsColumnMoving: (value: boolean) => void;
  setFocusedCell: DataGridFocusContextShape['setFocusedCell'];
  columnFocusIndex: number; // Index including leadingControlColumns
}

export const getColumnActions = ({
  column,
  columns,
  schema,
  schemaDetectors,
  setVisibleColumns,
  focusFirstVisibleInteractiveCell,
  setIsPopoverOpen,
  sorting,
  switchColumnPos,
  setIsColumnMoving,
  setFocusedCell,
  columnFocusIndex,
}: GetColumnActions): EuiListGroupItemProps[] => {
  if (column.actions === false) {
    return [];
  }

  const actions = [
    ...getHideColumnAction({
      column,
      columns,
      setVisibleColumns,
      focusFirstVisibleInteractiveCell,
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
      setIsColumnMoving,
      setFocusedCell,
      columnFocusIndex,
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
  | 'column'
  | 'columns'
  | 'setVisibleColumns'
  | 'focusFirstVisibleInteractiveCell'
>;

export const getHideColumnAction = ({
  column,
  columns,
  setVisibleColumns,
  focusFirstVisibleInteractiveCell,
}: HideColumnAction): EuiListGroupItemProps[] => {
  const items = [];

  const onClickHideColumn = () => {
    setVisibleColumns(
      columns.filter((col) => col.id !== column.id).map((col) => col.id)
    );
    // Since we hid the current column, we need to manually set focus back onto the grid
    focusFirstVisibleInteractiveCell();
  };

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
  | 'column'
  | 'columns'
  | 'switchColumnPos'
  | 'setIsColumnMoving'
  | 'setFocusedCell'
  | 'columnFocusIndex'
>;

const getMoveColumnActions = ({
  column,
  columns,
  switchColumnPos,
  setIsColumnMoving,
  setFocusedCell,
  columnFocusIndex,
}: MoveColumnActions): EuiListGroupItemProps[] => {
  const items = [];

  const colIdx = columns.findIndex((col) => col.id === column.id);

  // UX polish: prevent the column actions hover animation from flashing after column move
  const handleAnimationFlash = () => {
    setIsColumnMoving(true);
    requestAnimationFrame(() => setIsColumnMoving(false));
  };

  const moveFocus = (direction: 'left' | 'right') => {
    const newIndex = direction === 'left' ? -1 : 1;
    // Wait a beat to move focus, otherwise the EuiPopover's EuiFocusTrap's
    // returnFocus logic sometimes steals it (depending on rerenders)
    setTimeout(() => {
      setFocusedCell([columnFocusIndex + newIndex, -1]); // -1 is the static y-index of the header
    });
  };

  if (isColumnActionEnabled('showMoveLeft', column.actions)) {
    const onClickMoveLeft = () => {
      const targetCol = columns[colIdx - 1];
      if (targetCol) {
        switchColumnPos(column.id, targetCol.id);
        handleAnimationFlash();
        moveFocus('left');
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
        handleAnimationFlash();
        moveFocus('right');
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

    const isSorted =
      sortingIdx >= 0 && sorting.columns[sortingIdx].direction === 'asc';

    const action = {
      label: isSorted ? (
        <EuiI18n
          token="euiColumnActions.unsort"
          default="Unsort {schemaLabel}"
          values={{ schemaLabel: label }}
        />
      ) : (
        <EuiI18n
          token="euiColumnActions.sort"
          default="Sort {schemaLabel}"
          values={{ schemaLabel: label }}
        />
      ),
      onClick: onClickSortAsc,
      isDisabled: column.isSortable === false,
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

    const isSorted =
      sortingIdx >= 0 && sorting.columns[sortingIdx].direction === 'desc';

    const action = {
      label: isSorted ? (
        <EuiI18n
          token="euiColumnActions.unsort"
          default="Unsort {schemaLabel}"
          values={{ schemaLabel: label }}
        />
      ) : (
        <EuiI18n
          token="euiColumnActions.sort"
          default="Sort {schemaLabel}"
          values={{ schemaLabel: label }}
        />
      ),
      onClick: onClickSortDesc,
      isDisabled: column.isSortable === false,
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
