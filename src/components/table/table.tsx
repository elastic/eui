import React, { FunctionComponent, TableHTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type Props = {
  compressed?: boolean;
  responsive?: boolean;
  tableLayout?: string;
} & CommonProps &
  TableHTMLAttributes<HTMLTableElement>;

const labelDisplayToClassMap: { [tableLayout: string]: string | null } = {
  fixed: 'euiTable--fixed',
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
    labelDisplayToClassMap[tableLayout]
  );

  return (
    <table className={classes} {...rest}>
      {children}
    </table>
  );
};
