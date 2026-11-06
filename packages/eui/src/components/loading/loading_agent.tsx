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
import { euiAgentLoaderStyles } from './loading_agent.styles';

export const SIZES = ['s', 'm', 'l'] as const;
export type EuiAgentLoaderSize = (typeof SIZES)[number];

/** 4×4 grid with the corners removed. Positions are in a 24-unit viewBox. */
const DOT_RADIUS = 1.714;
const DOT_STEP = 6.857;
const CORNERS = new Set([0, 3, 12, 15]);
const CENTRE = new Set([5, 6, 9, 10]);

const DOTS = Array.from({ length: 16 }, (_, index) => index)
  .filter((index) => !CORNERS.has(index))
  .map((index) => ({
    key: index,
    cx: DOT_RADIUS + (index % 4) * DOT_STEP,
    cy: DOT_RADIUS + Math.floor(index / 4) * DOT_STEP,
    ring: !CENTRE.has(index),
  }));

export type EuiAgentLoaderProps = CommonProps &
  Omit<HTMLAttributes<HTMLSpanElement>, 'color'> & {
    /**
     * `s` is 12px, `m` is 16px, `l` is 24px.
     * @default m
     */
    size?: EuiAgentLoaderSize;
  };

/**
 * Quiet pulse for agent work in progress. Twelve dots: the centre four
 * pulse first, then the ring around them.
 *
 * @see {@link https://eui.elastic.co/docs/components/display/loading/|EuiAgentLoader documentation}
 */
export const EuiAgentLoader: FunctionComponent<EuiAgentLoaderProps> = ({
  size = 'm',
  className,
  'aria-label': ariaLabel,
  ...rest
}) => {
  const classes = classNames('euiAgentLoader', className);
  const styles = useEuiMemoizedStyles(euiAgentLoaderStyles);
  const defaultLabel = useLoadingAriaLabel();

  return (
    <span
      className={classes}
      css={[styles.euiAgentLoader, styles[size]]}
      role="progressbar"
      aria-label={ariaLabel || defaultLabel}
      {...rest}
    >
      <svg css={styles.svg} viewBox="0 0 24 24" aria-hidden="true">
        {DOTS.map((dot) => (
          <circle
            key={dot.key}
            css={[styles.dot, dot.ring && styles.ring]}
            cx={dot.cx}
            cy={dot.cy}
            r={DOT_RADIUS}
          />
        ))}
      </svg>
    </span>
  );
};
