/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, TdHTMLAttributes } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';

import {
  HorizontalAlignment,
  LEFT_ALIGNMENT,
  RIGHT_ALIGNMENT,
  CENTER_ALIGNMENT,
} from '../../services';

import { resolveWidthAsStyle } from './utils';

export type EuiTableFooterCellProps = CommonProps &
  TdHTMLAttributes<HTMLTableCellElement> & {
    align?: HorizontalAlignment;
    width?: string | number;
  };

export const EuiTableFooterCell: FunctionComponent<EuiTableFooterCellProps> = ({
  children,
  align = LEFT_ALIGNMENT,
  className,
  width,
  style,
  ...rest
}) => {
  const classes = classNames('euiTableFooterCell', className);
  const contentClasses = classNames('euiTableCellContent', className, {
    'euiTableCellContent--alignRight': align === RIGHT_ALIGNMENT,
    'euiTableCellContent--alignCenter': align === CENTER_ALIGNMENT,
  });
  const styleObj = resolveWidthAsStyle(style, width);

  return (
    <td className={classes} style={styleObj} {...rest}>
      <div className={contentClasses}>
        <span className="euiTableCellContent__text">{children}</span>
      </div>
    </td>
  );
};
