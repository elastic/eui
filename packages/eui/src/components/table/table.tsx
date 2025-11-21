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

import {
  useIsEuiTableResponsive,
  EuiTableIsResponsiveContext,
} from './mobile/responsive_context';
import { EuiTableVariantContext } from './table_context';
import { euiTableStyles } from './table.styles';

export interface EuiTableProps
  extends CommonProps,
    TableHTMLAttributes<HTMLTableElement> {
  compressed?: boolean;
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
   * @default 'fixed'
   */
  tableLayout?: 'fixed' | 'auto';
  /**
   * Toggle the table's background
   * @default true
   */
  hasBackground?: boolean;
}

export const EuiTable: FunctionComponent<EuiTableProps> = ({
  children,
  className,
  compressed,
  tableLayout = 'fixed',
  hasBackground = true,
  responsiveBreakpoint, // Default handled by `useIsEuiTableResponsive`
  ...rest
}) => {
  const isResponsive = useIsEuiTableResponsive(responsiveBreakpoint);

  const classes = classNames('euiTable', className);

  const styles = useEuiMemoizedStyles(euiTableStyles);
  const cssStyles = [
    styles.euiTable,
    styles.layout[tableLayout],
    (!compressed || isResponsive) && styles.uncompressed,
    compressed && !isResponsive && styles.compressed,
    hasBackground && styles.hasBackground,
    isResponsive ? styles.mobile : styles.desktop,
  ];

  return (
    <table tabIndex={-1} css={cssStyles} className={classes} {...rest}>
      <EuiTableIsResponsiveContext.Provider value={isResponsive}>
        <EuiTableVariantContext.Provider value={{ hasBackground }}>
          {children}
        </EuiTableVariantContext.Provider>
      </EuiTableIsResponsiveContext.Provider>
    </table>
  );
};
