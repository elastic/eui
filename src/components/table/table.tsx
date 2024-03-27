/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, TableHTMLAttributes } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles, type EuiBreakpointSize } from '../../services';
import { CommonProps } from '../common';

import { useIsEuiTableResponsive } from './mobile/responsive_context';
import { euiTableStyles } from './table.styles';

export interface EuiTableProps
  extends CommonProps,
    TableHTMLAttributes<HTMLTableElement> {
  compressed?: boolean;
  /**
   * @deprecated - use `responsiveBreakpoint` instead
   */
  responsive?: boolean;
  /**
   * Named breakpoint. Below this size, the table will collapse
   * into responsive cards.
   *
   * Pass `false` to never collapse to a mobile view, or inversely,
   * `true` to always render mobile-friendly cards.
   *
   * @default m
   */
  responsiveBreakpoint?: EuiBreakpointSize | boolean;
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
  responsiveBreakpoint, // Default handled by `useIsEuiTableResponsive`
  responsive = true,
  ...rest
}) => {
  const isResponsive =
    useIsEuiTableResponsive(responsiveBreakpoint) && responsive;

  const classes = classNames('euiTable', className, {
    'euiTable--responsive': responsive,
  });

  const styles = useEuiMemoizedStyles(euiTableStyles);
  const cssStyles = [
    styles.euiTable,
    styles.layout[tableLayout],
    (!compressed || isResponsive) && styles.uncompressed,
    compressed && !isResponsive && styles.compressed,
    isResponsive ? styles.mobile : styles.desktop,
  ];

  return (
    <table tabIndex={-1} css={cssStyles} className={classes} {...rest}>
      {children}
    </table>
  );
};
