/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

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
