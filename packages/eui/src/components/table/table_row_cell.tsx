/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  CSSProperties,
  FunctionComponent,
  ReactNode,
  TdHTMLAttributes,
} from 'react';
import classNames from 'classnames';

import { CommonProps } from '../common';
import {
  useEuiMemoizedStyles,
  HorizontalAlignment,
  LEFT_ALIGNMENT,
} from '../../services';

import { useEuiTableIsResponsive } from './mobile/responsive_context';
import { resolveWidthAsStyle } from './utils';
import { EuiTableCellContent } from './_table_cell_content';
import { euiTableRowCellStyles } from './table_row_cell.styles';

interface EuiTableRowCellSharedPropsShape {
  /**
   * Horizontal alignment of the text in the cell
   */
  align?: HorizontalAlignment;
  /**
   * Creates a text wrapper around cell content that helps word break or truncate
   * long text correctly.
   * @default true
   */
  textOnly?: boolean;
  /**
   * Indicates whether this column should truncate overflowing text content.
   * - Set to `true` to enable single-line truncation.
   * - To enable multi-line truncation, use a configuration object with `lines`
   * set to a number of lines to truncate to.
   * @default false
   */
  truncateText?: boolean | { lines: number };
  width?: CSSProperties['width'];
}

export interface EuiTableRowCellMobileOptionsShape
  extends EuiTableRowCellSharedPropsShape {
  /**
   * If false, will not render the cell at all for mobile
   * @default true
   */
  show?: boolean;
  /**
   * Only show for mobile? If true, will not render the column at all for desktop
   * @default false
   */
  only?: boolean;
  /**
   * Custom render/children if different from desktop
   */
  render?: ReactNode;
  /**
   * The column's header for use in mobile view (automatically passed down
   * when using `EuiBasicTable`).
   * Or pass `false` to not show a header at all.
   */
  header?: ReactNode | boolean;
  /**
   * Increase text size compared to rest of cells
   * @default false
   */
  enlarge?: boolean;
  /**
   * Applies the value to the width of the cell in mobile view (typically 50%)
   * @default 50%
   */
  width?: CSSProperties['width'];
}

export interface EuiTableRowCellProps extends EuiTableRowCellSharedPropsShape {
  /**
   * Vertical alignment of the content in the cell
   */
  valign?: TdHTMLAttributes<HTMLTableCellElement>['valign'];
  /**
   * Indicates whether the cell should be marked as the heading for its row
   */
  setScopeRow?: boolean;
  /**
   * Indicates if the cell is dedicated to row actions
   * (used for mobile styling and desktop action hover behavior)
   */
  hasActions?: boolean | 'custom';
  /**
   * Indicates if the column is dedicated as the expandable row toggle
   */
  isExpander?: boolean;
  /**
   * Mobile options for displaying differently at small screens;
   * See {@link EuiTableRowCellMobileOptionsShape}
   */
  mobileOptions?: EuiTableRowCellMobileOptionsShape;
  /**
   * Content rendered outside the visible cell content wrapper. Useful for, e.g. screen reader text.
   *
   * Used by EuiBasicTable to render hidden copy markers
   */
  append?: ReactNode;
}

type Props = CommonProps &
  // Omitting valign and re-adding in EuiTableRowCellProps so it shows up in the props table
  Omit<TdHTMLAttributes<HTMLTableCellElement>, 'valign'> &
  EuiTableRowCellProps;

export const EuiTableRowCell: FunctionComponent<Props> = ({
  align = LEFT_ALIGNMENT,
  children,
  className,
  truncateText,
  setScopeRow,
  textOnly = true,
  hasActions,
  isExpander,
  style,
  width,
  valign = 'middle',
  mobileOptions,
  append,
  ...rest
}) => {
  const isResponsive = useEuiTableIsResponsive();
  const styles = useEuiMemoizedStyles(euiTableRowCellStyles);
  const cssStyles = [
    styles.euiTableRowCell,
    setScopeRow && styles.rowHeader,
    isExpander && styles.isExpander,
    hasActions && styles.hasActions,
    styles[valign],
    ...(isResponsive
      ? [
          styles.mobile.mobile,
          mobileOptions?.enlarge && styles.mobile.enlarge,
          hasActions === 'custom' && styles.mobile.customActions,
          hasActions === true && styles.mobile.actions,
          isExpander && styles.mobile.expander,
        ]
      : [styles.desktop.desktop, hasActions && styles.desktop.actions]),
  ];

  const cellClasses = classNames('euiTableRowCell', className, {
    'euiTableRowCell--hasActions': hasActions,
    'euiTableRowCell--isExpander': isExpander,
  });

  const widthValue = isResponsive
    ? hasActions || isExpander
      ? undefined // On mobile, actions are shifted to a right column via CSS
      : mobileOptions?.width
    : width;

  const styleObj = resolveWidthAsStyle(style, widthValue);

  const Element = setScopeRow ? 'th' : 'td';
  const sharedProps = {
    scope: setScopeRow ? 'row' : undefined,
    style: styleObj,
    css: cssStyles,
    ...rest,
  };
  const sharedContentProps = {
    align,
    textOnly,
    truncateText,
    hasActions: hasActions || isExpander,
  };

  if (isResponsive) {
    // Mobile view
    if (mobileOptions?.show === false) {
      return null;
    } else {
      return (
        <Element className={cellClasses} {...sharedProps}>
          {mobileOptions?.header && (
            <div
              className="euiTableRowCell__mobileHeader"
              css={styles.euiTableRowCell__mobileHeader}
            >
              {mobileOptions.header}
            </div>
          )}
          <EuiTableCellContent
            {...sharedContentProps}
            align={mobileOptions?.align ?? 'left'} // Default to left aligned mobile cells, unless consumers specifically set an alignment for mobile
            truncateText={mobileOptions?.truncateText ?? truncateText}
            textOnly={mobileOptions?.textOnly ?? textOnly}
          >
            {mobileOptions?.render || children}
          </EuiTableCellContent>
          {append}
        </Element>
      );
    }
  } else {
    // Desktop view
    if (mobileOptions?.only) {
      return null;
    } else {
      return (
        <Element className={cellClasses} {...sharedProps}>
          <EuiTableCellContent {...sharedContentProps}>
            {children}
          </EuiTableCellContent>
          {append}
        </Element>
      );
    }
  }
};
