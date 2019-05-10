import React, { HTMLAttributes, ReactNode, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps, keysOf } from '../common';

export type FlexGridGutterSize = keyof typeof gutterSizeToClassNameMap;
export type FlexGridColumns = 0 | 1 | 2 | 3 | 4;

export interface EuiFlexGridProps {
  children?: ReactNode;
  columns?: FlexGridColumns;
  gutterSize?: FlexGridGutterSize;
  responsive?: boolean;
}

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
  responsive = true,
  columns = 0,
  ...rest
}) => {
  const classes = classNames(
    'euiFlexGrid',
    gutterSize ? gutterSizeToClassNameMap[gutterSize] : undefined,
    columns != null ? columnsToClassNameMap[columns] : undefined,
    {
      'euiFlexGrid--responsive': responsive,
    },
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
