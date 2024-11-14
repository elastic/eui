/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  CSSProperties,
  FunctionComponent,
  MouseEventHandler,
  KeyboardEventHandler,
  ComponentProps,
  ReactElement,
  ReactNode,
  memo,
  useCallback,
  useContext,
  useRef,
} from 'react';
import {
  OnDragEndResponder,
  DraggableProvidedDragHandleProps,
} from '@hello-pangea/dnd';

import { useEuiMemoizedStyles, useGeneratedHtmlId } from '../../../../services';
import {
  EuiDragDropContext,
  EuiDroppable,
  EuiDroppableProps,
  EuiDraggable,
} from '../../../drag_and_drop';
import { EuiPortal } from '../../../portal';

import { DataGridFocusContext } from '../../utils/focus';
import {
  EuiDataGridHeaderRowProps,
  EuiDataGridStyle,
} from '../../data_grid_types';
import { euiDataGridStyles } from '../../data_grid.styles';
import { euiDataGridDraggableHeaderStyles } from './draggable_columns.styles';

/**
 * Parent context + EuiDroppable wrapper
 */
export const DroppableColumns: FunctionComponent<
  Pick<EuiDataGridHeaderRowProps, 'columns' | 'switchColumnPos'> & {
    indexOffset: number;
    children: EuiDroppableProps['children'];
  }
> = memo(({ columns, switchColumnPos, indexOffset, children }) => {
  const styles = useEuiMemoizedStyles(euiDataGridDraggableHeaderStyles);
  const droppableId = useGeneratedHtmlId({
    prefix: 'euiDataGridHeaderDroppable',
  });

  const { setFocusedCell } = useContext(DataGridFocusContext);

  const handleOnDragEnd: OnDragEndResponder = useCallback(
    ({ source, destination }) => {
      if (!source) return;

      if (destination && destination.index !== source.index) {
        const sourceColumn = columns[source.index - indexOffset];
        const destinationColumn = columns[destination.index - indexOffset];

        if (sourceColumn && destinationColumn) {
          switchColumnPos(sourceColumn.id, destinationColumn.id);
        }
      }
      // Force focus the cell to prevent the datagrid body from become unfocusable, including on drag cancel
      setTimeout(() => {
        const cellToFocus = destination ? destination.index : source.index;
        setFocusedCell([cellToFocus, -1], true);
      });
    },
    [columns, indexOffset, switchColumnPos, setFocusedCell]
  );

  return (
    <EuiDragDropContext onDragEnd={handleOnDragEnd}>
      <EuiDroppable
        droppableId={droppableId}
        direction="horizontal"
        ignoreContainerClipping={true}
        css={styles.euiDataGridHeaderDroppable}
        data-test-subj="euiDataGridHeaderDroppable"
      >
        {children}
      </EuiDroppable>
    </EuiDragDropContext>
  );
});
DroppableColumns.displayName = 'DroppableColumns';

/**
 * Individual EuiDraggable columns
 */
export const DraggableColumn: FunctionComponent<{
  id: string;
  index: number;
  gridStyles: EuiDataGridStyle;
  columnResizer?: ReactNode;
  actionsPopoverToggle?: HTMLButtonElement | null;
  children: (
    dragProps?: Partial<DraggableProvidedDragHandleProps> & {
      'data-column-moving'?: boolean;
    }
  ) => ReactElement;
}> = memo(
  ({
    id,
    index,
    gridStyles,
    columnResizer,
    actionsPopoverToggle,
    children,
  }) => {
    const dataGridStyles = useEuiMemoizedStyles(euiDataGridStyles);
    const styles = useEuiMemoizedStyles(euiDataGridDraggableHeaderStyles);
    // Manually re-apply background and border overrides, since
    // the droppable zone sets its own and confuses :first-of-type CSS
    const reapplyCellStyles = [
      styles[gridStyles.header!],
      index !== 0 && styles.noLeadingBorder,
    ];

    // Draggable prevents the cell from receiving focus on click.
    // We manually ensure focus is set on cell mouseDown which
    // also includes setting focus before dragging
    const { setFocusedCell } = useContext(DataGridFocusContext);
    const handleOnMouseDown: MouseEventHandler = useCallback(
      (e) => {
        const openFocusTraps = document.querySelectorAll(
          '[data-focus-lock-disabled="false"]'
        );
        const validOpenFocusTraps = [...openFocusTraps].filter(
          (focusTrap) => !focusTrap.contains(e.currentTarget as Node) // remove containing focus traps (e.g. modals or flyouts)
        );

        const shouldDispatchEvent = validOpenFocusTraps.some(
          (focusTrap) =>
            !!focusTrap && // If there is a focus trap open
            !focusTrap.contains(e.target as Node) && // & if it doesn't contain the target
            e.target !== actionsPopoverToggle // & we're not closing the actions popover toggle
        );

        if (shouldDispatchEvent) {
          // Trick the focus trap lib into registering an outside click -
          // the drag/drop lib otherwise prevents the event 💀
          document.dispatchEvent(new MouseEvent('mousedown'));
        }
        setTimeout(() => {
          setFocusedCell([index, -1], true);
        });
      },
      [setFocusedCell, index, actionsPopoverToggle]
    );

    // Prevent any other keypresses when dragging
    const isDraggingRef = useRef(false);
    const handleOnKeydown: KeyboardEventHandler = useCallback((e) => {
      if (isDraggingRef.current) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
    }, []);

    // UX polish: add a slight animation frame delay to the dragging ref end
    // which prevents re-running the hover animation of column header actions
    const updateDraggingRef = useCallback((isDragging: boolean) => {
      // Only update if the state has changed from before
      if (isDragging !== isDraggingRef.current) {
        if (!isDragging) {
          requestAnimationFrame(() => {
            isDraggingRef.current = false;
          });
        } else {
          isDraggingRef.current = true;
        }
      }
    }, []);

    return (
      <div
        css={styles.euiDataGridHeaderCellDraggableWrapper}
        onMouseDown={handleOnMouseDown}
        onKeyDownCapture={handleOnKeydown}
      >
        {columnResizer}
        <EuiDraggable
          draggableId={id}
          className="euiDataGridHeaderCellDraggable"
          css={styles.euiDataGridHeaderCellDraggable}
          index={index}
          customDragHandle="custom"
          hasInteractiveChildren
          usePortal
        >
          {({ dragHandleProps }, { isDragging, mode }) => {
            updateDraggingRef(isDragging);

            const {
              role, // extracting role to not pass it along
              tabIndex, // we want to use the columnheader rowing tabindex instead
              ...restDragHandleProps
            } = dragHandleProps ?? {};

            const passedProps = {
              ...restDragHandleProps,
              css: reapplyCellStyles,
              'data-column-moving': isDraggingRef.current || undefined,
              isDragging,
            };

            // since the cloned content is in a portal outside the datagrid
            // we need to re-add styles to the cell as the scoped styles
            // from the wrapper don't apply
            const draggingStyles = [
              styles.euiDataGridHeaderCellDraggable, // ensure height is maintained while dragging
              dataGridStyles.cellPadding[gridStyles.cellPadding!],
              dataGridStyles.fontSize[gridStyles.fontSize!],
              dataGridStyles.borders[gridStyles.border!],
              mode === 'SNAP' && styles.isKeyboardDragging,
            ];

            return isDragging ? (
              <div css={draggingStyles}>
                <DragOverlay isDragging cursor="grabbing" />
                {children(passedProps)}
              </div>
            ) : (
              children(passedProps)
            );
          }}
        </EuiDraggable>
      </div>
    );
  }
);
DraggableColumn.displayName = 'DraggableColumn';

/**
 * Components for conditionally rendering drag/drop wrappers
 * Allows us to conditionally call hooks while not instantiating a bunch
 * of extra state/etc., since draggable columns isn't yet(?) a default
 */
type CanDragAndDropColumns = {
  canDragAndDropColumns: boolean;
};

export const ConditionalDroppableColumns: FunctionComponent<
  ComponentProps<typeof DroppableColumns> & CanDragAndDropColumns
> = memo(({ canDragAndDropColumns, children, ...rest }) =>
  canDragAndDropColumns ? (
    <DroppableColumns {...rest}>{children}</DroppableColumns>
  ) : (
    <>{children}</>
  )
);
ConditionalDroppableColumns.displayName = 'ConditionalDroppableColumns';

export const ConditionalDraggableColumn: FunctionComponent<
  ComponentProps<typeof DraggableColumn> & CanDragAndDropColumns
> = memo(({ canDragAndDropColumns, children, ...rest }) =>
  canDragAndDropColumns ? (
    <DraggableColumn {...rest}>{children}</DraggableColumn>
  ) : (
    <>{children()}</>
  )
);
ConditionalDraggableColumn.displayName = 'ConditionalDraggableColumn';

/**
 * Creates an invisible overlay that prevents hover interactions/transitions
 * on other elements that the dragged element is dragged over, and also maintains
 * the intended drag cursor over any location.
 *
 * TODO: If this is useful elsewhere, consider moving it to `src/services`
 */
export const DragOverlay: FunctionComponent<{
  isDragging?: boolean;
  cursor?: CSSProperties['cursor'];
  zIndex?: CSSProperties['zIndex'];
}> = memo(({ isDragging, cursor, zIndex = 9999 }) => {
  return isDragging ? (
    <EuiPortal>
      <div css={{ position: 'fixed', inset: 0 }} style={{ cursor, zIndex }} />
    </EuiPortal>
  ) : null;
});
DragOverlay.displayName = 'DragOverlay';
