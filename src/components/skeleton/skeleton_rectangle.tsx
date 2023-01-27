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
import { logicalStyles } from '../../global_styling';

import { useLoadingAriaAttributes } from './utils';
import { euiSkeletonRectangleStyles } from './skeleton_rectangle.styles';

export const RADIUS = ['s', 'm', 'none'] as const;
export type SkeletonRectangleBorderRadius = typeof RADIUS[number];

export type EuiSkeletonRectangleProps = HTMLAttributes<HTMLDivElement> &
  CommonProps & {
    width?: string | number;
    height?: string | number;
    borderRadius?: SkeletonRectangleBorderRadius;
  };

export const EuiSkeletonRectangle: FunctionComponent<EuiSkeletonRectangleProps> = ({
  className,
  borderRadius = 's',
  width = '24px',
  height = '24px',
  style,
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiSkeletonRectangleStyles(euiTheme);
  const cssStyles = [styles.euiSkeletonRectangle, styles[borderRadius]];

  return (
    <div
      className={classNames('euiSkeletonRectangle', className)}
      css={cssStyles}
      style={logicalStyles({ ...style, width, height })}
      {...useLoadingAriaAttributes()}
      {...rest}
    />
  );
};
