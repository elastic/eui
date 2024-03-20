/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, TableHTMLAttributes } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles, useIsWithinMaxBreakpoint } from '../../services';
import { CommonProps } from '../common';

import { euiTableStyles } from './table.styles';

export interface EuiTableProps
  extends CommonProps,
    TableHTMLAttributes<HTMLTableElement> {
  compressed?: boolean;
  responsive?: boolean;
  /**
   * Sets the table-layout CSS property
   */
  tableLayout?: 'fixed' | 'auto';
}

export const EuiTable: FunctionComponent<EuiTableProps> = ({
  children,
  className,
  compressed,
  tableLayout = 'fixed',
  responsive = true,
  ...rest
}) => {
  // TODO: Make the table responsive breakpoint customizable via prop
  const isResponsive = useIsWithinMaxBreakpoint('s') && responsive;

  const classes = classNames('euiTable', className, {
    'euiTable--responsive': responsive,
  });

  const styles = useEuiMemoizedStyles(euiTableStyles);
  const cssStyles = [
    styles.euiTable,
    styles.layout[tableLayout],
    (!compressed || isResponsive) && styles.uncompressed,
    compressed && !isResponsive && styles.compressed,
  ];

  return (
    <table tabIndex={-1} css={cssStyles} className={classes} {...rest}>
      {children}
    </table>
  );
};
