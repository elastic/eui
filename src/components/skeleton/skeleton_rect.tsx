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

import { euiSkeletonRectStyles } from './skeleton_rect.styles';

export type EuiSkeletonRectProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    width?: string,
    height?: string,
    children?: React.ReactChild | React.ReactChild[],
  };

export const EuiSkeletonRect: FunctionComponent<EuiSkeletonRectProps> = ({
  className,
  width = 'auto',
  height = 'auto',
  children,
  ...rest
}) => {

  const euiTheme = useEuiTheme();
  const styles = euiSkeletonRectStyles(euiTheme, width, height);
  const classes = classNames(
    'euiSkeletonRect',
    className
  );

  const cssStyles = [
    styles.euiSkeleton__rect,
    styles.width,
    styles.height,
  ];

  return (
    <div className={classes} css={cssStyles} aria-busy={true} {...rest}></div>
  )
}
