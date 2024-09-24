/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useState,
  useCallback,
  KeyboardEventHandler,
} from 'react';
import classnames from 'classnames';
import { FocusableElement } from 'tabbable';

import {
  keys,
  tabularCopyMarkers,
  useEuiMemoizedStyles,
} from '../../../../services';
import { EuiDataGridHeaderCellWrapperProps } from '../../data_grid_types';
import { DataGridFocusContext } from '../../utils/focus';
import { HandleInteractiveChildren } from '../cell/focus_utils';
import { euiDataGridHeaderCellWrapperStyles } from './data_grid_header_cell_wrapper.styles';

/**
 * This is a wrapper that handles repeated concerns between control &
 * standard header cells. Most of its shared logic is around focus state/UX,
 * but it also DRY's out certain class/data-test-subj/style attributes
 */
export const EuiDataGridHeaderCellWrapper: FunctionComponent<
  EuiDataGridHeaderCellWrapperProps
> = ({
  id,
  index,
  visibleColCount,
  width,
  className,
  children,
  hasActionsPopover,
  openActionsPopover,
  'aria-label': ariaLabel,
  ...rest
}) => {
  const classes = classnames('euiDataGridHeaderCell', className);
  const styles = useEuiMemoizedStyles(euiDataGridHeaderCellWrapperStyles);

  // Must be a state and not a ref to trigger a HandleInteractiveChildren rerender
  const [headerEl, setHeaderEl] = useState<HTMLDivElement | null>(null);
  const [renderFocusTrap, setRenderFocusTrap] = useState(false);
  const [interactiveChildren, setInteractiveChildren] = useState<
    FocusableElement[]
  >([]);
  useEffect(() => {
    // We're checking for interactive children outside of the default actions button
    setRenderFocusTrap(
      interactiveChildren.length > (hasActionsPopover ? 1 : 0)
    );
  }, [hasActionsPopover, interactiveChildren]);

  const { setFocusedCell, onFocusUpdate } = useContext(DataGridFocusContext);
  const updateCellFocusContext = useCallback(() => {
    setFocusedCell([index, -1]);
  }, [index, setFocusedCell]);

  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    onFocusUpdate([index, -1], (isFocused: boolean) => {
      setIsFocused(isFocused);
      if (isFocused && headerEl) {
        // Only focus the cell if not already focused on something in the cell
        if (!headerEl.contains(document.activeElement)) {
          headerEl.focus();
        }
      }
    });
  }, [index, onFocusUpdate, headerEl]);

  // For cell headers with only actions, auto-open the actions popover on enter keypress
  const onKeyDown: KeyboardEventHandler = useCallback(
    (e) => {
      if (
        e.key === keys.ENTER &&
        hasActionsPopover &&
        !renderFocusTrap &&
        e.target === headerEl
      ) {
        openActionsPopover?.();
      }
    },
    [hasActionsPopover, openActionsPopover, renderFocusTrap, headerEl]
  );

  const isLastColumn = index === visibleColCount - 1;

  return (
    <div
      role="columnheader"
      ref={setHeaderEl}
      tabIndex={isFocused ? 0 : -1}
      onKeyDown={onKeyDown}
      css={styles.euiDataGridHeaderCell}
      className={classes}
      data-test-subj={`dataGridHeaderCell-${id}`}
      data-gridcell-column-id={id}
      data-gridcell-column-index={index}
      data-gridcell-row-index="-1"
      data-gridcell-visible-row-index="-1"
      style={width != null ? { width: `${width}px` } : {}}
      aria-label={renderFocusTrap ? ariaLabel : undefined}
      {...rest}
    >
      <HandleInteractiveChildren
        cellEl={headerEl}
        updateCellFocusContext={updateCellFocusContext}
        renderFocusTrap={renderFocusTrap}
        onInteractiveChildrenFound={setInteractiveChildren}
      >
        {typeof children === 'function' ? children(renderFocusTrap) : children}
      </HandleInteractiveChildren>
      {isLastColumn
        ? tabularCopyMarkers.hiddenNewline
        : tabularCopyMarkers.hiddenTab}
    </div>
  );
};
