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
import { euiTableHeaderFooterCellStyles } from './table_cells_shared.styles';
import { EuiTableVariantContext } from './table_context';

export type EuiTableFooterCellProps = CommonProps &
  TdHTMLAttributes<HTMLTableCellElement> & {
    align?: HorizontalAlignment;
    width?: string | number;
  };

export const EuiTableFooterCell: FunctionComponent<EuiTableFooterCellProps> = ({
  children,
  align = LEFT_ALIGNMENT,
  className,
  width,
  style,
  ...rest
}) => {
  const { hasBackground } = useContext(EuiTableVariantContext);

  const classes = classNames('euiTableFooterCell', className);
  const inlineStyles = resolveWidthAsStyle(style, width);
  const styles = useEuiMemoizedStyles(euiTableHeaderFooterCellStyles);
  const cssStyles = [
    styles.euiTableFooterCell.euiTableFooterCell,
    hasBackground && styles.euiTableFooterCell.hasBackground,
  ];

  return (
    <td css={cssStyles} className={classes} style={inlineStyles} {...rest}>
      <EuiTableCellContent align={align} truncateText={true} textOnly={true}>
        {children}
      </EuiTableCellContent>
    </td>
  );
};
