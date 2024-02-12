/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes } from 'react';
import classNames from 'classnames';
import { CommonProps } from '../common';
import { useEuiTheme } from '../../services';

import {
  euiLoadingChartStyles,
  euiLoadingChartBarStyles,
  _barIndex,
} from './loading_chart.styles';
import { useEuiI18n } from '../i18n';

export const SIZES = ['m', 'l', 'xl'] as const;
export type EuiLoadingChartSize = (typeof SIZES)[number];

export type EuiLoadingChartProps = CommonProps &
  HTMLAttributes<HTMLDivElement> & {
    size?: EuiLoadingChartSize;
    mono?: boolean;
  };

export const EuiLoadingChart: FunctionComponent<EuiLoadingChartProps> = ({
  size = 'm',
  mono = false,
  className,
  'aria-label': ariaLabel,
  ...rest
}) => {
  const defaultAriaLabel = useEuiI18n('euiLoadingChart.ariaLabel', 'Loading');
  const euiTheme = useEuiTheme();
  const styles = euiLoadingChartStyles(euiTheme);
  const barStyles = euiLoadingChartBarStyles(euiTheme);

  const classes = classNames(
    'euiLoadingChart',
    { 'euiLoadingChart--mono': mono },
    className
  );

  const cssStyles = [styles.euiLoadingChart, styles[size]];
  const cssBarStyles = (index: number) => {
    return [
      barStyles.euiLoadingChart__bar,
      barStyles[size],
      _barIndex(index, mono, euiTheme),
    ];
  };

  const bars = [];
  for (let index = 0; index < 4; index++) {
    bars.push(<span key={index} css={cssBarStyles(index)} />);
  }

  return (
    <span
      className={classes}
      css={cssStyles}
      role="progressbar"
      aria-label={ariaLabel || defaultAriaLabel}
      {...rest}
    >
      {bars}
    </span>
  );
};
