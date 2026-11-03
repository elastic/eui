/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { HTMLAttributes, FunctionComponent, CSSProperties } from 'react';
import classNames from 'classnames';

import { useEuiMemoizedStyles } from '../../services';
import { CommonProps } from '../common';

import { useLoadingAriaLabel } from './_loading_strings';
import { euiLoadingSpinnerStyles } from './loading_spinner.styles';

// ViewBox stroke weight from the dash-ring study. The 12px size is slightly heavier.
const SPINNER_WEIGHT = 2;
const SPINNER_WEIGHT_S = SPINNER_WEIGHT * 1.2;

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

/**
 * @see {@link https://eui.elastic.co/docs/components/display/loading/|EuiLoadingSpinner documentation}
 */
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

  const paint =
    color?.highlight ||
    (color?.border && color.border.toLowerCase() !== 'currentcolor'
      ? color.border
      : undefined);
  const customColorStyle = {
    ...style,
    ...(paint ? { color: paint } : undefined),
  };

  const defaultLabel = useLoadingAriaLabel();
  const strokeWidth = size === 's' ? SPINNER_WEIGHT_S : SPINNER_WEIGHT;

  return (
    <span
      className={classes}
      css={cssStyles}
      style={customColorStyle}
      role="progressbar"
      aria-label={ariaLabel || defaultLabel}
      {...rest}
    >
      <svg
        css={styles.svg}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="euiLoadingSpinner__track"
          cx="12"
          cy="12"
          r="9.5"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
        <circle
          className="euiLoadingSpinner__arc"
          cx="12"
          cy="12"
          r="9.5"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
};
