/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import classnames from 'classnames';
import React, {
  FunctionComponent,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from 'react';

import { EuiDataGridHeaderCellWrapperProps } from '../../data_grid_types';
import { DataGridFocusContext } from '../../utils/focus';
import { HandleInteractiveChildren } from '../cell/focus_utils';

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
  width,
  className,
  children,
  hasActionsPopover,
  isActionsButtonFocused,
  focusActionsButton,
  ...rest
}) => {
  const classes = classnames('euiDataGridHeaderCell', className);

  const headerRef = useRef<HTMLDivElement>(null);

  const { setFocusedCell, onFocusUpdate } = useContext(DataGridFocusContext);
  const updateCellFocusContext = useCallback(() => {
    setFocusedCell([index, -1]);
  }, [index, setFocusedCell]);

  const [isFocused, setIsFocused] = useState(false);
  useEffect(() => {
    onFocusUpdate([index, -1], (isFocused: boolean) => {
      setIsFocused(isFocused);
    });
  }, [index, onFocusUpdate]);

  useEffect(() => {
    if (isFocused) {
      const cell = headerRef.current!;
      // Only focus the cell if not already focused on something in the cell
      if (!cell.contains(document.activeElement)) {
        cell.focus();
      }
    }
  }, [isFocused]);

  return (
    <div
      role="columnheader"
      ref={headerRef}
      tabIndex={isFocused && !isActionsButtonFocused ? 0 : -1}
      onFocus={hasActionsPopover ? focusActionsButton : undefined}
      className={classes}
      data-test-subj={`dataGridHeaderCell-${id}`}
      data-gridcell-column-id={id}
      data-gridcell-column-index={index}
      data-gridcell-row-index="-1"
      data-gridcell-visible-row-index="-1"
      style={width != null ? { width: `${width}px` } : {}}
      {...rest}
    >
      <HandleInteractiveChildren
        cellEl={headerRef.current}
        updateCellFocusContext={updateCellFocusContext}
        renderFocusTrap={!hasActionsPopover}
      >
        {children}
      </HandleInteractiveChildren>
    </div>
  );
};
