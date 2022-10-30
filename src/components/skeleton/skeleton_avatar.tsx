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

import { euiSkeletonStyles } from './skeleton_avatar.styles';

export const SIZES = ['s', 'm', 'l', 'xl'] as const;
export type SkeletonSize = typeof SIZES[number];

export type EuiSkeletonAvatarProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    size?: SkeletonSize;
  };

export const EuiSkeletonAvatar: FunctionComponent<EuiSkeletonAvatarProps> = ({
  className,
  size = 'l',
  ...rest
}) => {

  const euiTheme = useEuiTheme();
  const styles = euiSkeletonStyles(euiTheme);
  const classes = classNames(
    'euiSkeleton',
    // { [`euiSkeleton--${size}`]: size },
    { [`euiSkeleton--${size}`]: size },
    className
  );

  const cssStyles = [
    styles.euiSkeleton,
    styles[size],
  ];

  return (
    <div className={classes} css={cssStyles} {...rest}></div>
  )
}
