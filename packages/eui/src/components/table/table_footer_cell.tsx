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
import {
  euiTableHeaderFooterCellStyles,
  _useEuiTableStickyCellStyles,
} from './table_cells_shared.styles';
import { EuiTableVariantContext } from './table_context';
import { EuiTableSharedWidthProps, EuiTableStickyCellOptions } from './types';
import { useEuiTableIsResponsive } from './mobile/responsive_context';

export type EuiTableFooterCellProps = CommonProps &
  Omit<TdHTMLAttributes<HTMLTableCellElement>, 'width'> &
  EuiTableSharedWidthProps & {
    align?: HorizontalAlignment;
    /**
     * Whether the cell should stick to a side of the table.
     *
     * This option is not applied in the responsive cards layout - see
     * {@link EuiTableProps#responsiveBreakpoint|`responsiveBreakpoint`}.
     *
     * Currently, it can only be used when the cell is in the first or the last
     * column of a table.
     *
     * When set to `true` and `hasBackground: false` is set on the table,
     * `--euiTableCellStickyBackgroundColor` CSS variable should be set to match
     * the background color of the element containing the table.
     * Otherwise, the sticky cell will use the default `backgroundBasePlain`
     * background color.
     * @internal
     * @beta
     * @default false
     */
    sticky?: EuiTableStickyCellOptions;
  };

export const EuiTableFooterCell: FunctionComponent<EuiTableFooterCellProps> = ({
  children,
  align = LEFT_ALIGNMENT,
  className,
  width,
  sticky,
  minWidth,
  maxWidth,
  style: _style,
  ...rest
}) => {
  const { hasBackground } = useContext(EuiTableVariantContext);
  const isResponsive = useEuiTableIsResponsive();

  const classes = classNames('euiTableFooterCell', className);
  const inlineWidthStyles = resolveWidthPropsAsStyle(_style, {
    width,
    minWidth,
    maxWidth,
  });
  const styles = useEuiMemoizedStyles(euiTableHeaderFooterCellStyles);
  const stickyStyles = _useEuiTableStickyCellStyles(sticky);
  const cssStyles = [
    styles.euiTableFooterCell.euiTableFooterCell,
    hasBackground && styles.euiTableFooterCell.hasBackground,
    !isResponsive && stickyStyles,
  ];

  return (
    <td
      css={cssStyles}
      className={classes}
      style={{ ..._style, ...inlineWidthStyles }}
      data-sticky={(!isResponsive && sticky?.side) || undefined}
      {...rest}
    >
      <EuiTableCellContent align={align} truncateText={true} textOnly={true}>
        {children}
      </EuiTableCellContent>
    </td>
  );
};
