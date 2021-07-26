/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, ReactNode, FunctionComponent } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';

export type EuiFilterGroupProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    children?: ReactNode;
    /**
     * Expand the whole bar to fill its parent's width
     */
    fullWidth?: boolean;
  };

export const EuiFilterGroup: FunctionComponent<EuiFilterGroupProps> = ({
  children,
  className,
  fullWidth = false,
  ...rest
}) => {
  const classes = classNames(
    'euiFilterGroup',
    {
      'euiFilterGroup--fullWidth': fullWidth,
    },
    className
  );

  return (
    <div className={classes} {...rest}>
      {children}
    </div>
  );
};
