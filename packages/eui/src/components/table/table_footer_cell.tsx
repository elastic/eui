/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, TdHTMLAttributes, useContext } from 'react';
import classNames from 'classnames';

import {
  useEuiMemoizedStyles,
  HorizontalAlignment,
  LEFT_ALIGNMENT,
} from '../../services';
import { CommonProps } from '../common';

import { resolveWidthPropsAsStyle } from './utils';
import { EuiTableCellContent } from './_table_cell_content';
import { euiTableHeaderFooterCellStyles } from './table_cells_shared.styles';
import { EuiTableVariantContext } from './table_context';
import type { EuiTableSharedWidthProps } from './types';

export type EuiTableFooterCellProps = CommonProps &
  Omit<TdHTMLAttributes<HTMLTableCellElement>, 'width'> &
  EuiTableSharedWidthProps & {
    align?: HorizontalAlignment;
  };

export const EuiTableFooterCell: FunctionComponent<EuiTableFooterCellProps> = ({
  children,
  align = LEFT_ALIGNMENT,
  className,
  width,
  minWidth,
  maxWidth,
  style: _style,
  ...rest
}) => {
  const { hasBackground } = useContext(EuiTableVariantContext);

  const classes = classNames('euiTableFooterCell', className);
  const inlineWidthStyles = resolveWidthPropsAsStyle(_style, {
    width,
    minWidth,
    maxWidth,
  });
  const styles = useEuiMemoizedStyles(euiTableHeaderFooterCellStyles);
  const cssStyles = [
    styles.euiTableFooterCell.euiTableFooterCell,
    hasBackground && styles.euiTableFooterCell.hasBackground,
  ];

  return (
    <td
      css={cssStyles}
      className={classes}
      style={{ ..._style, ...inlineWidthStyles }}
      {...rest}
    >
      <EuiTableCellContent align={align} truncateText={true} textOnly={true}>
        {children}
      </EuiTableCellContent>
    </td>
  );
};
