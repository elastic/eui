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

import { EuiSkeletonLoading, _EuiSkeletonAriaProps } from './skeleton_loading';
import { euiSkeletonRectangleStyles } from './skeleton_rectangle.styles';

export const RADIUS = ['s', 'm', 'none'] as const;
export type SkeletonRectangleBorderRadius = (typeof RADIUS)[number];

export type EuiSkeletonRectangleProps = HTMLAttributes<HTMLDivElement> &
  CommonProps &
  _EuiSkeletonAriaProps & {
    width?: string | number;
    height?: string | number;
    borderRadius?: SkeletonRectangleBorderRadius;
  };

export const EuiSkeletonRectangle: FunctionComponent<
  EuiSkeletonRectangleProps
> = ({
  isLoading = true,
  borderRadius = 's',
  width = '24px',
  height = '24px',
  style,
  className,
  contentAriaLabel,
  announceLoadingStatus,
  announceLoadedStatus,
  ariaLiveProps,
  ariaWrapperProps,
  children,
  ...rest
}) => {
  const euiTheme = useEuiTheme();
  const styles = euiSkeletonRectangleStyles(euiTheme);
  const cssStyles = [styles.euiSkeletonRectangle, styles[borderRadius]];

  return (
    <EuiSkeletonLoading
      isLoading={isLoading}
      loadingContent={
        <div
          className={classNames('euiSkeletonRectangle', className)}
          css={cssStyles}
          style={logicalStyles({ ...style, width, height })}
          {...rest}
        />
      }
      loadedContent={children || ''}
      contentAriaLabel={contentAriaLabel}
      announceLoadingStatus={announceLoadingStatus}
      announceLoadedStatus={announceLoadedStatus}
      ariaLiveProps={ariaLiveProps}
      {...ariaWrapperProps}
    />
  );
};
