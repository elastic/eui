import React, { FunctionComponent, ThHTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

import { resolveWidthAsStyle } from './utils';

export type EuiTableHeaderCellCheckboxScope =
  | 'col'
  | 'row'
  | 'colgroup'
  | 'rowgroup';

export interface EuiTableHeaderCellCheckboxProps {
  width?: string | number;
  scope?: EuiTableHeaderCellCheckboxScope;
}

export const EuiTableHeaderCellCheckbox: FunctionComponent<
  CommonProps &
    ThHTMLAttributes<HTMLTableHeaderCellElement> &
    EuiTableHeaderCellCheckboxProps
> = ({ children, className, scope = 'col', style, width, ...rest }) => {
  const classes = classNames('euiTableHeaderCellCheckbox', className);
  const styleObj = resolveWidthAsStyle(style, width);

  return (
    <th className={classes} scope={scope} style={styleObj} {...rest}>
      <div className="euiTableCellContent">{children}</div>
    </th>
  );
};
