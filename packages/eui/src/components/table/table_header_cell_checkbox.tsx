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
  useCallback,
  useEffect,
  useRef,
} from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles, useGeneratedHtmlId } from '../../services';
import { CommonProps } from '../common';

import { resolveWidthPropsAsStyle } from './utils';
import { euiTableCellCheckboxStyles } from './table_cells_shared.styles';
import { HEADER_CELL_SCOPE } from './table_header_cell_shared';
import type { EuiTableSharedWidthProps } from './types';
import { useEuiTableColumnDataStore } from './store/provider';
import { useEuiTableWithinStickyHeader } from './sticky_header';

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

  const ref = useRef<HTMLTableCellElement>(null);
  const internalCellId = useGeneratedHtmlId();
  const store = useEuiTableColumnDataStore();
  const isWithinStickyHeader = useEuiTableWithinStickyHeader();

  const classes = classNames('euiTableHeaderCellCheckbox', className);
  const styles = useEuiMemoizedStyles(euiTableCellCheckboxStyles);
  const style = resolveWidthPropsAsStyle(_style, {
    width,
    minWidth,
    maxWidth,
  });

  const handleResize = useCallback<ResizeObserverCallback>(
    (entries) => {
      const entry = entries[0];
      if (!entry) {
        return;
      }

      requestAnimationFrame(() => {
        store.updateColumn(internalCellId, {
          children,
          style: _style,
          width,
          minWidth,
          maxWidth,
          append,
          currentWidth: entry.contentRect.width,
        });
      });
    },
    [store, internalCellId]
  );

  useEffect(() => {
    // Don't register the column inside the sticky header as the original
    // column is already registered. This would cause an infinite loop.
    if (isWithinStickyHeader || !ref.current) {
      return;
    }

    const unregisterColumn = store.registerColumn(internalCellId, props);

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(ref.current);

    return () => {
      unregisterColumn();
      resizeObserver.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [store, internalCellId, isWithinStickyHeader]);

  return (
    <th
      ref={ref}
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
