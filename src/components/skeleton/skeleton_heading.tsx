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

import { euiSkeletonHeadingStyles } from './skeleton_heading.styles';

// type SkeletonHeadingProps = Pick<EuiTextProps, 'size'>
const HEADING = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] as const;
type SkeletonHeadingProps = typeof HEADING[number];

export type EuiSkeletonHeadingProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    size: SkeletonHeadingProps;
  };

export const EuiSkeletonHeading: FunctionComponent<EuiSkeletonHeadingProps> = ({
  className,
  size = 'h1',
  ...rest
}) => {

  const euiTheme = useEuiTheme();
  const styles = euiSkeletonHeadingStyles(euiTheme);
  const classes = classNames(
    'euiSkeleton__heading',
    className
  );

  const cssStyles = [
    styles.euiSkeleton__heading,
    styles[size],
  ];

  return (
    <span className={classes} css={cssStyles} aria-busy={true} {...rest}></span>
  )
}
