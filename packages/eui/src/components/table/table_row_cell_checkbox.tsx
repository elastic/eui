/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, TdHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { CommonProps } from '../common';

import { useEuiTableIsResponsive } from './mobile/responsive_context';
import { euiTableCellCheckboxStyles } from './table_cells_shared.styles';

export const EuiTableRowCellCheckbox: FunctionComponent<
  CommonProps & TdHTMLAttributes<HTMLTableCellElement> & { append?: ReactNode }
> = ({ children, className, append, ...rest }) => {
  const isResponsive = useEuiTableIsResponsive();

  const styles = useEuiMemoizedStyles(euiTableCellCheckboxStyles);
  const cssStyles = [
    styles.euiTableRowCellCheckbox,
    isResponsive ? styles.mobile : styles.desktop,
  ];

  const classes = classNames('euiTableRowCellCheckbox', className);

  return (
    <td css={cssStyles} className={classes} {...rest}>
      <div className="euiTableCellContent">{children}</div>
      {append}
    </td>
  );
};
