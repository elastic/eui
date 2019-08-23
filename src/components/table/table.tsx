import React, { FunctionComponent, TableHTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type Props = {
  compressed?: boolean;
  responsive?: boolean;
} & CommonProps &
  TableHTMLAttributes<HTMLTableElement>;

export const EuiTable: FunctionComponent<Props> = ({
  children,
  className,
  compressed,
  responsive = true,
  ...rest
}) => {
  const classes = classNames('euiTable', className, {
    'euiTable--compressed': compressed,
    'euiTable--responsive': responsive,
  });

  return (
    <table className={classes} {...rest}>
      {children}
    </table>
  );
};
