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

import { euiSkeletonCircleStyles } from './skeleton_circle.styles';

export const SIZES = ['s', 'm', 'l', 'xl'] as const;
export type SkeletonCircleSize = typeof SIZES[number];

export type EuiSkeletonCircleProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    size?: SkeletonCircleSize;
  };

export const EuiSkeletonCircle: FunctionComponent<EuiSkeletonCircleProps> = ({
  className,
  size = 'l',
  ...rest
}) => {

  const euiTheme = useEuiTheme();
  const styles = euiSkeletonCircleStyles(euiTheme);
  const classes = classNames(
    'euiSkeleton__circle',
    { [`euiSkeleton__circle--${size}`]: size },
    className
  );

  const cssStyles = [
    styles.euiSkeleton__circle,
    styles[size],
  ];

  return (
    <div className={classes} css={cssStyles} aria-busy={true} {...rest}></div>
  )
}
