import React, { HTMLAttributes, ReactNode, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';

export type FlexGridGutterSize = keyof typeof gutterSizeToClassNameMap;
export type FlexGridColumns = 0 | 1 | 2 | 3 | 4;
export type FlexGridDirection = keyof typeof directionToClassNameMap;

export interface EuiFlexGridProps {
  children?: ReactNode;
  /**
   * Number of columns `1-4`, pass `0` for normal display
   */
  columns?: FlexGridColumns;
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
   */
  component?: keyof JSX.IntrinsicElements;
}

const directionToClassNameMap = {
  row: null,
  column: 'euiFlexGrid--directionColumn',
};

export const DIRECTIONS = keysOf(directionToClassNameMap);

const gutterSizeToClassNameMap = {
  none: 'euiFlexGrid--gutterNone',
  s: 'euiFlexGrid--gutterSmall',
  m: 'euiFlexGrid--gutterMedium',
  l: 'euiFlexGrid--gutterLarge',
  xl: 'euiFlexGrid--gutterXLarge',
};

export const GUTTER_SIZES: FlexGridGutterSize[] = keysOf(
  gutterSizeToClassNameMap
);

const columnsToClassNameMap = {
  0: 'euiFlexGrid--wrap',
  1: 'euiFlexGrid--single',
  2: 'euiFlexGrid--halves',
  3: 'euiFlexGrid--thirds',
  4: 'euiFlexGrid--fourths',
};

export const COLUMNS = Object.keys(columnsToClassNameMap).map(
  (columns: string) => parseInt(columns, 10)
) as FlexGridColumns[];

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
  const classes = classNames(
    'euiFlexGrid',
    gutterSize ? gutterSizeToClassNameMap[gutterSize] : undefined,
    columns != null ? columnsToClassNameMap[columns] : undefined,
    direction ? directionToClassNameMap[direction] : undefined,
    {
      'euiFlexGrid--responsive': responsive,
    },
    className
  );

  return (
    // @ts-ignore
    <Component className={classes} {...rest}>
      {children}
    </Component>
  );
};
