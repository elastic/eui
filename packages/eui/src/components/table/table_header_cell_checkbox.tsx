/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, ThHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { CommonProps } from '../common';

import { resolveWidthPropsAsStyle } from './utils';
import { euiTableCellCheckboxStyles } from './table_cells_shared.styles';
import { HEADER_CELL_SCOPE } from './table_header_cell_shared';
import type { EuiTableSharedWidthProps } from './types';

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
