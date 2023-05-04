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
import { EuiTitleSize } from '../title';

import { EuiSkeletonLoading, _EuiSkeletonAriaProps } from './skeleton_loading';
import { euiSkeletonTitleStyles } from './skeleton_title.styles';

export type EuiSkeletonTitleProps = HTMLAttributes<HTMLDivElement> &
  CommonProps &
  _EuiSkeletonAriaProps & {
    /**
     * EuiTitle size to render
     */
    size?: EuiTitleSize;
  };

export const EuiSkeletonTitle: FunctionComponent<EuiSkeletonTitleProps> = ({
  isLoading = true,
  size = 'm',
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
  const styles = euiSkeletonTitleStyles(euiTheme);
  const cssStyles = [styles.euiSkeletonTitle, styles[size]];

  return (
    <EuiSkeletonLoading
      isLoading={isLoading}
      loadingContent={
        <span
          className={classNames('euiSkeletonTitle', className)}
          css={cssStyles}
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
