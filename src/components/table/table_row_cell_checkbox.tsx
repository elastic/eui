import React, { FunctionComponent, TdHTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export const EuiTableRowCellCheckbox: FunctionComponent<
  CommonProps & TdHTMLAttributes<HTMLTableCellElement>
> = ({ children, className, ...rest }) => {
  const classes = classNames('euiTableRowCellCheckbox', className);

  return (
    <td className={classes} {...rest}>
      <div className="euiTableCellContent">{children}</div>
    </td>
  );
};
