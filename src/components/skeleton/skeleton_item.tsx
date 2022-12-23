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

export const RADIUS = ['s', 'm', 'none'] as const;
export type SkeletonItemRadius = typeof RADIUS[number];

export type EuiSkeletonItemProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    width?: string;
    height?: string;
    radius?: SkeletonItemRadius;
  };

export const EuiSkeletonItem: FunctionComponent<EuiSkeletonItemProps> = ({
  className,
  radius = 's',
  width = '24px',
  height = '24px',
  ...rest
}) => {

  const euiTheme = useEuiTheme();
  const styles = euiSkeletonItemStyles(euiTheme, width, height);
  const classes = classNames(
    { [`euiSkeleton__item--${radius}`]: radius },
    'euiSkeleton__item',
    className
  );

  const cssStyles = [
    styles.euiSkeleton__item,
    styles[radius],
  ];

  return (
    <div className={classes} css={cssStyles} aria-busy={true} {...rest}></div>
  )
}
