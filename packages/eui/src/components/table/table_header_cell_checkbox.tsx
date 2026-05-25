/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  FunctionComponent,
  ThHTMLAttributes,
  ReactNode,
  useEffect,
  useRef,
} from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { CommonProps } from '../common';

import { resolveWidthPropsAsStyle } from './utils';
import { euiTableCellCheckboxStyles } from './table_cells_shared.styles';
import { HEADER_CELL_SCOPE } from './table_header_cell_shared';
import type { EuiTableSharedWidthProps } from './types';
import { useEuiTableStickyHeaderContext } from './sticky_header';

// Counter for generating unique cell IDs
let checkboxCellIdCounter = 0;

export type EuiTableHeaderCellCheckboxScope =
  (typeof HEADER_CELL_SCOPE)[number];

export interface EuiTableHeaderCellCheckboxProps
  extends EuiTableSharedWidthProps {
  scope?: EuiTableHeaderCellCheckboxScope;
  append?: ReactNode;
}

export const EuiTableHeaderCellCheckbox: FunctionComponent<
  CommonProps &
    Omit<ThHTMLAttributes<HTMLTableCellElement>, 'width'> &
    EuiTableHeaderCellCheckboxProps
> = ({
  children,
  className,
  scope = 'col',
  style: _style,
  width,
  minWidth,
  maxWidth,
  append,
  ...rest
}) => {
  const classes = classNames('euiTableHeaderCellCheckbox', className);
  const styles = useEuiMemoizedStyles(euiTableCellCheckboxStyles);
  const style = resolveWidthPropsAsStyle(_style, {
    width,
    minWidth,
    maxWidth,
  });

  // Generate stable unique ID for this cell (only once on mount)
  const cellIdRef = useRef<string>();
  if (!cellIdRef.current) {
    cellIdRef.current = `eui-table-header-checkbox-${checkboxCellIdCounter++}`;
  }
  const orderRef = useRef<number>(checkboxCellIdCounter);

  // Access sticky header context (will be undefined if sticky header is not enabled)
  const stickyHeaderContext = useEuiTableStickyHeaderContext();

  // Store register/deregister in refs to avoid depending on context object
  const registerRef = useRef(stickyHeaderContext?.registry?.register);
  const deregisterRef = useRef(stickyHeaderContext?.registry?.deregister);
  const isInStickyRendererRef = useRef(
    stickyHeaderContext?._isInStickyRenderer
  );

  // Update refs when context changes
  registerRef.current = stickyHeaderContext?.registry?.register;
  deregisterRef.current = stickyHeaderContext?.registry?.deregister;
  isInStickyRendererRef.current = stickyHeaderContext?._isInStickyRenderer;

  // Register this cell with the sticky header context
  useEffect(() => {
    const register = registerRef.current;
    const deregister = deregisterRef.current;
    const isInStickyRenderer = isInStickyRendererRef.current;

    if (!register || !deregister) return;
    if (isInStickyRenderer) return; // Don't register if we're inside sticky renderer

    // Gather all props needed to reconstruct this cell
    const cellProps = {
      className,
      scope,
      style: _style,
      width,
      minWidth,
      maxWidth,
      append,
      ...rest,
    };

    register(cellIdRef.current!, orderRef.current, cellProps as any, children);

    return () => {
      deregister(cellIdRef.current!);
    };
    // Only re-register if children change or display props change
    // Don't depend on stickyHeaderContext to avoid feedback loops
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children, className, width, minWidth, maxWidth]);

  return (
    <th
      css={styles.euiTableHeaderCellCheckbox}
      className={classes}
      scope={scope}
      style={style}
      {...rest}
    >
      <div className="euiTableCellContent">{children}</div>
      {append}
    </th>
  );
};
