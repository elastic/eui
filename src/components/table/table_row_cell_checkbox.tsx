/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

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
