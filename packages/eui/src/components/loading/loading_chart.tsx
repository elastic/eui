/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { CommonProps } from '../common';

import { useLoadingAriaLabel } from './_loading_strings';
import {
  euiLoadingChartStyles,
  euiLoadingChartBarStyles,
  BARS_COUNT,
} from './loading_chart.styles';

export const SIZES = ['m', 'l', 'xl'] as const;
export type EuiLoadingChartSize = (typeof SIZES)[number];

export type EuiLoadingChartProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    size?: EuiLoadingChartSize;
  };

export const EuiLoadingChart: FunctionComponent<EuiLoadingChartProps> = ({
  size = 'm',
  className,
  'aria-label': ariaLabel,
  ...rest
}) => {
  const classes = classNames('euiLoadingChart', className);

  const styles = useEuiMemoizedStyles(euiLoadingChartStyles);
  const cssStyles = [styles.euiLoadingChart, styles[size]];

  const barStyles = useEuiMemoizedStyles(euiLoadingChartBarStyles);
  const barCssStyles = [barStyles.euiLoadingChart__bar, barStyles[size]];

  const defaultAriaLabel = useLoadingAriaLabel();

  return (
    <span
      className={classes}
      css={cssStyles}
      role="progressbar"
      aria-label={ariaLabel || defaultAriaLabel}
      {...rest}
    >
      {Array.from({ length: BARS_COUNT }, (_, index) => (
        <span key={index} css={barCssStyles} />
      ))}
    </span>
  );
};
