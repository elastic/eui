/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, forwardRef } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../../common';
import { useEuiTheme } from '../../../services';

import { euiRangeWrapperStyles } from './range_wrapper.styles';

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

    const euiTheme = useEuiTheme();
    const styles = euiRangeWrapperStyles(euiTheme);
    const cssStyles = [styles.euiRangeWrapper];

    return (
      <div className={classes} css={cssStyles} ref={ref} {...rest}>
        {children}
      </div>
    );
  }
);

EuiRangeWrapper.displayName = 'EuiRangeWrapper';
