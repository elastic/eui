import React, { FunctionComponent, TableHTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

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

const tableLayoutToClassMap: { [tableLayout: string]: string | null } = {
  fixed: null,
  auto: 'euiTable--auto',
};

export const EuiTable: FunctionComponent<EuiTableProps> = ({
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
