/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */

import React, { HTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';

export interface EuiRangeWrapperProps
  extends CommonProps,
    HTMLAttributes<HTMLDivElement> {
  fullWidth?: boolean;
  compressed?: boolean;
}

export const EuiRangeWrapper = forwardRef<HTMLDivElement, EuiRangeWrapperProps>(
  ({ children, className, fullWidth, compressed, ...rest }, ref) => {
    const classes = classNames(
      'euiRangeWrapper',
      {
        'euiRangeWrapper--fullWidth': fullWidth,
        'euiRangeWrapper--compressed': compressed,
      },
      className
    );

    return (
      <div className={classes} ref={ref} {...rest}>
        {children}
      </div>
    );
  }
);

EuiRangeWrapper.displayName = 'EuiRangeWrapper';
