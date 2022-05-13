/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent } from 'react';
import { CommonProps } from '../common';
import classNames from 'classnames';
import { useEuiTheme } from '../..//services';
import { useLoadingAriaLabel } from './_loading_strings';
import { euiLoadingSpinnerStyles } from './loading_spinner.styles';

export const SIZES = ['s', 'm', 'l', 'xl', 'xxl'] as const;
export type EuiLoadingSpinnerSize = typeof SIZES[number];

export type EuiLoadingSpinnerProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    size?: EuiLoadingSpinnerSize;
  };

export const EuiLoadingSpinner: FunctionComponent<EuiLoadingSpinnerProps> = ({
  size = 'm',
  className,
  'aria-label': ariaLabel,
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiLoadingSpinnerStyles(euiTheme);
  const cssStyles = [styles.euiLoadingSpinner, styles[size]];
  const classes = classNames('euiLoadingSpinner', className);
  const defaultLabel = useLoadingAriaLabel();

  return (
    <span
      className={classes}
      css={cssStyles}
      role="progressbar"
      aria-label={ariaLabel || defaultLabel}
      {...rest}
    />
  );
};
