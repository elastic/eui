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
import { v4 as uuidv4 } from 'uuid';

import { useEuiMemoizedStyles } from '../../services';
import { CommonProps } from '../common';

import { resolveWidthPropsAsStyle } from './utils';
import { euiTableCellCheckboxStyles } from './table_cells_shared.styles';
import { HEADER_CELL_SCOPE } from './table_header_cell_shared';
import type { EuiTableSharedWidthProps } from './types';
import { useEuiTableColumnDataStore } from './store/provider';
import { useEuiTableWithinStickyHeader } from './sticky_header';
import { EuiTableStoreRenderHeaderCell } from './store/store';

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
> = (props) => {
  const {
    children,
    className,
    scope = 'col',
    style: _style,
    width,
    minWidth,
    maxWidth,
    append,
    ...rest
  } = props;

  const storeCellIdRef = useRef(uuidv4());
  const store = useEuiTableColumnDataStore();
  const isWithinStickyHeader = useEuiTableWithinStickyHeader();

  const styles = useEuiMemoizedStyles(euiTableCellCheckboxStyles);

  const renderHeaderCellRef = useRef<EuiTableStoreRenderHeaderCell>();

  renderHeaderCellRef.current = (extraProps) => {
    const classes = classNames('euiTableHeaderCellCheckbox', className);
    const style = resolveWidthPropsAsStyle(_style, {
      width,
      minWidth,
      maxWidth,
    });

    return (
      <th
        css={styles.euiTableHeaderCellCheckbox}
        className={classes}
        scope={scope}
        style={style}
        {...rest}
        {...extraProps}
      >
        <div className="euiTableCellContent">{children}</div>
        {append}
      </th>
    );
  };

  useEffect(() => {
    // Don't register the column inside the sticky header as the original
    // column is already registered. This would cause an infinite loop.
    if (isWithinStickyHeader) {
      return;
    }

    const unregisterColumn = store.registerColumn(storeCellIdRef.current, {
      renderHeaderCellRef,
    });

    return () => {
      unregisterColumn();
    };
  }, [store, isWithinStickyHeader]);

  useEffect(() => {
    // Notify the store on every render so the sticky header stays in sync.
    // React's reconciliation will efficiently handle any duplicate renders.
    if (isWithinStickyHeader) {
      return;
    }

    store.updateColumn(storeCellIdRef.current, {
      renderHeaderCellRef,
    });
  });

  return renderHeaderCellRef.current({});
};
