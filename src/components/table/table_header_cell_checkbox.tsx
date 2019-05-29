import React, { FunctionComponent, TdHTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type EuiTableHeaderCellCheckboxScope =
  | 'col'
  | 'row'
  | 'colgroup'
  | 'rowgroup';

export interface EuiTableHeaderCellCheckboxProps {
  width?: string;
  scope?: EuiTableHeaderCellCheckboxScope;
}

export const EuiTableHeaderCellCheckbox: FunctionComponent<
  CommonProps &
    TdHTMLAttributes<HTMLTableCellElement> &
    EuiTableHeaderCellCheckboxProps
> = ({ children, className, ...rest }) => {
  const classes = classNames('euiTableHeaderCellCheckbox', className);

  return (
    <th className={classes} {...rest}>
      <div className="euiTableCellContent">{children}</div>
    </th>
  );
};
