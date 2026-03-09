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
import { usePropsWithComponentDefaults } from '../provider/component_defaults';
import { euiContainerCSS } from '../../global_styling';
import { EUI_TABLE_CSS_CONTAINER_NAME } from './const';

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
  /**
   * Allow the table to grow over 100% of the container inline size
   * (width in horizontal writing-mode) and enable scrolling on overflow.
   *
   * This should only be used with [`tableLayout`]{@link EuiTableProps#tableLayout}
   * set to `auto`.
   * @beta
   * @default false
   */
  scrollableInline?: boolean;
}

/**
 * EuiTable is a low-level building block component used to render tabular data
 * in a customized way.
 *
 * It should only be used when confirmed that [EuiBasicTable]{@link EuiBasicTable}
 * and [EuiInMemoryTable]{@link EuiInMemoryTable} are not flexible enough
 * for the purposes of the job.
 *
 * @see {@link https://eui.elastic.co/docs/components/tables/custom/|EuiTable documentation}
 */
export const EuiTable: FunctionComponent<EuiTableProps> = (originalProps) => {
  const {
    children,
    className,
    compressed,
    tableLayout = 'fixed',
    hasBackground = true,
    responsiveBreakpoint,
    scrollableInline = false,
    ...rest
  } = usePropsWithComponentDefaults('EuiTable', originalProps);
  const isResponsive = useIsEuiTableResponsive(responsiveBreakpoint);

  const classes = classNames('euiTable', className);

  const styles = useEuiMemoizedStyles(euiTableStyles);
  const tableStyles = [
    styles.euiTable,
    scrollableInline && styles.euiTableScrollableInline,
    styles.layout[tableLayout],
    (!compressed || isResponsive) && styles.uncompressed,
    compressed && !isResponsive && styles.compressed,
    hasBackground && styles.hasBackground,
    isResponsive ? styles.mobile : styles.desktop,
  ];
  const cssStyles = [
    euiContainerCSS('normal', EUI_TABLE_CSS_CONTAINER_NAME, true),
    scrollableInline && styles.scrollableWrapper,
  ];

  return (
    <div css={cssStyles}>
      <table tabIndex={-1} css={tableStyles} className={classes} {...rest}>
        <EuiTableIsResponsiveContext.Provider value={isResponsive}>
          <EuiTableVariantContext.Provider value={{ hasBackground }}>
            {children}
          </EuiTableVariantContext.Provider>
        </EuiTableIsResponsiveContext.Provider>
      </table>
    </div>
  );
};
