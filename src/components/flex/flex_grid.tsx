/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, {
  HTMLAttributes,
  ReactNode,
  FunctionComponent,
  ElementType,
} from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

import { useEuiTheme } from '../../services';
import { euiFlexGridStyles } from './flex_grid.styles';

export const DIRECTIONS = ['row', 'column'] as const;
export type FlexGridDirection = typeof DIRECTIONS[number];

export const GUTTER_SIZES = ['none', 's', 'm', 'l', 'xl'] as const;
export type FlexGridGutterSize = typeof GUTTER_SIZES[number];

export interface EuiFlexGridProps {
  /**
   * ReactNode to render as this component's content
   */
  children?: ReactNode;
  /**
   * Number of columns `1-4`, pass `0` for normal display
   */
  columns?: 0 | 1 | 2 | 3 | 4; // Leave this as inline so the props table correctly parses it
  /**
   * Flex layouts default to left-right then top-down (`row`).
   * Change this prop to `column` to create a top-down then left-right display.
   * Only works with column count of `1-4`.
   */
  direction?: FlexGridDirection;
  /**
   * Space between flex items
   */
  gutterSize?: FlexGridGutterSize;
  /**
   * Force each item to be display block on smaller screens
   */
  responsive?: boolean;

  /**
   * The tag to render
   * @default div
   */
  component?: ElementType;
}

export const EuiFlexGrid: FunctionComponent<
  CommonProps & HTMLAttributes<HTMLDivElement> & EuiFlexGridProps
> = ({
  children,
  className,
  gutterSize = 'l',
  direction = 'row',
  responsive = true,
  columns = 0,
  component: Component = 'div',
  ...rest
}) => {
  const gridTemplateRows =
    direction === 'column'
      ? Math.ceil(React.Children.count(children) / columns)
      : 0;

  const euiTheme = useEuiTheme();
  const styles = euiFlexGridStyles(euiTheme, gridTemplateRows);
  const cssStyles = [
    styles.euiFlexGrid,
    styles.gutterSizes[gutterSize],
    columns && styles.direction[direction],
    columns ? styles.columnCount[columns] : styles.zeroColumns.noColumns,
    responsive && (columns ? styles.responsive : styles.zeroColumns.responsive),
  ];

  const classes = classNames('euiFlexGrid', className);

  return (
    <Component css={cssStyles} className={classes} {...rest}>
      {children}
    </Component>
  );
};
