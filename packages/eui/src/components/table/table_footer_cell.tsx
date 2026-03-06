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

import { resolveWidthAsStyle } from './utils';
import { EuiTableCellContent } from './_table_cell_content';
import {
  euiTableHeaderFooterCellStyles,
  useEuiTableStickyCellStyles,
} from './table_cells_shared.styles';
import { EuiTableVariantContext } from './table_context';
import { EuiTableStickyCellOptions } from './types';
import { useEuiTableIsResponsive } from './mobile/responsive_context';

export type EuiTableFooterCellProps = CommonProps &
  TdHTMLAttributes<HTMLTableCellElement> & {
    align?: HorizontalAlignment;
    width?: string | number;
    /**
     * Whether the cell should stick to a side of the table.
     *
     * This option is not applied in the responsive cards layout - see
     * {@link EuiTableProps#responsiveBreakpoint|`responsiveBreakpoint`}.
     *
     * Currently, it can only be used when the cell is in the first or the last
     * column of a table.
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
  style,
  sticky,
  ...rest
}) => {
  const { hasBackground } = useContext(EuiTableVariantContext);
  const isResponsive = useEuiTableIsResponsive();

  const classes = classNames('euiTableFooterCell', className);
  const inlineStyles = resolveWidthAsStyle(style, width);
  const styles = useEuiMemoizedStyles(euiTableHeaderFooterCellStyles);
  const stickyStyles = useEuiTableStickyCellStyles(sticky);
  const cssStyles = [
    styles.euiTableFooterCell.euiTableFooterCell,
    hasBackground && styles.euiTableFooterCell.hasBackground,
    !isResponsive && stickyStyles,
  ];

  return (
    <td
      css={cssStyles}
      className={classes}
      style={inlineStyles}
      data-sticky={(!isResponsive && sticky?.side) || undefined}
      {...rest}
    >
      <EuiTableCellContent align={align} truncateText={true} textOnly={true}>
        {children}
      </EuiTableCellContent>
    </td>
  );
};
