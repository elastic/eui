/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent, CSSProperties } from 'react';
import classNames from 'classnames';

import { useEuiTheme, useEuiMemoizedStyles } from '../../services';
import { CommonProps } from '../common';

import { useLoadingAriaLabel } from './_loading_strings';
import {
  euiLoadingSpinnerStyles,
  euiSpinnerBorderColorsCSS,
} from './loading_spinner.styles';

export const SIZES = ['s', 'm', 'l', 'xl', 'xxl'] as const;
export type EuiLoadingSpinnerSize = (typeof SIZES)[number];

export type EuiLoadingSpinnerColor = {
  border?: CSSProperties['color'];
  highlight?: CSSProperties['color'];
};

export type EuiLoadingSpinnerProps = CommonProps &
  Omit<HTMLAttributes<HTMLDivElement>, 'color'> & {
    size?: EuiLoadingSpinnerSize;
    /**
     * Sets the color of the border and highlight.
     * Each key accepts any valid CSS color value as a `string`
     * See {@link EuiLoadingSpinnerColor}
     */
    color?: EuiLoadingSpinnerColor;
  };

export const EuiLoadingSpinner: FunctionComponent<EuiLoadingSpinnerProps> = ({
  size = 'm',
  className,
  'aria-label': ariaLabel,
  color,
  style,
  ...rest
}) => {
  const classes = classNames('euiLoadingSpinner', className);

  const styles = useEuiMemoizedStyles(euiLoadingSpinnerStyles);
  const cssStyles = [styles.euiLoadingSpinner, styles[size]];

  const euiTheme = useEuiTheme();
  const customColorStyle = color
    ? { ...style, borderColor: euiSpinnerBorderColorsCSS(euiTheme, color) }
    : style;

  const defaultLabel = useLoadingAriaLabel();

  return (
    <span
      className={classes}
      css={cssStyles}
      style={customColorStyle}
      role="progressbar"
      aria-label={ariaLabel || defaultLabel}
      {...rest}
    />
  );
};
