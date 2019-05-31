import React, { FunctionComponent, ThHTMLAttributes } from 'react';
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
    ThHTMLAttributes<HTMLTableHeaderCellElement> &
    EuiTableHeaderCellCheckboxProps
> = ({ children, className, scope = 'col', ...rest }) => {
  const classes = classNames('euiTableHeaderCellCheckbox', className);

  return (
    <th className={classes} {...rest} scope={scope}>
      <div className="euiTableCellContent">{children}</div>
    </th>
  );
};
