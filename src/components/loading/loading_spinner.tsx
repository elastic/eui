/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps, keysOf } from '../common';
import classNames from 'classnames';
import { useEuiTheme } from '../..//services';
import {
  euiLoadingSpinnerStyles,
  spinnerSizes,
} from './loading_spinner.styles';

export const SIZES = keysOf(spinnerSizes);

export type EuiLoadingSpinnerSize = keyof typeof spinnerSizes;

export type EuiLoadingSpinnerProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    size?: EuiLoadingSpinnerSize;
  };

export const EuiLoadingSpinner: FunctionComponent<EuiLoadingSpinnerProps> = ({
  size = 'm',
  className,
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiLoadingSpinnerStyles(euiTheme);
  const cssStyles = [styles.euiLoadingSpinner, styles[size]];
  const classes = classNames('euiLoadingSpinner', className);

  return <span className={classes} css={cssStyles} {...rest} />;
};
