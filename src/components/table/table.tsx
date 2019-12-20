import React, { FunctionComponent, TableHTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type Props = {
  compressed?: boolean;
  responsive?: boolean;
  /**
   * Sets the table-layout CSS property
   */
  tableLayout?: LayoutType;
} & CommonProps &
  TableHTMLAttributes<HTMLTableElement>;

export type LayoutType = 'fixed' | 'auto';

const tableLayoutToClassMap: { [tableLayout: string]: string | null } = {
  fixed: null,
  auto: 'euiTable--auto',
};

export const EuiTable: FunctionComponent<Props> = ({
  children,
  className,
  compressed,
  tableLayout = 'fixed',
  responsive = true,
  ...rest
}) => {
  const classes = classNames(
    'euiTable',
    className,
    {
      'euiTable--compressed': compressed,
      'euiTable--responsive': responsive,
    },
    tableLayoutToClassMap[tableLayout]
  );

  return (
    <table className={classes} {...rest}>
      {children}
    </table>
  );
};
