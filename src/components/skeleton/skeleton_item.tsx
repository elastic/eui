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

import { euiSkeletonItemStyles } from './skeleton_item.styles';

export const SIZES = ['xxs', 'xs', 's', 'm', 'customSize'] as const;
export type SkeletonItemSize = typeof SIZES[number];

export type EuiSkeletonItemProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    squared?: boolean;
    width?: string; // TODO dimension need to be required only if 'customSize'
    height?: string;
    size?: SkeletonItemSize;
  };

export const EuiSkeletonItem: FunctionComponent<EuiSkeletonItemProps> = ({
  className,
  size = 'xs',
  squared = false,
  width,
  height,
  ...rest
}) => {

  const euiTheme = useEuiTheme();
  const styles = euiSkeletonItemStyles(euiTheme, width, height, squared);
  const classes = classNames(
    { [`euiSkeleton__item--${size}`]: size },
    squared && 'euiSkeleton__item--squared',
    'euiSkeleton__item',
    className
  );

  const cssStyles = [
    styles.euiSkeleton__item,
    styles[size],
  ];

  return (
    <div className={classes} css={cssStyles} aria-busy={true} {...rest}></div>
  )
}
