/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes, ReactElement } from 'react';

import { CommonProps } from '../common';
import {
  EuiScreenReaderLive,
  EuiScreenReaderLiveProps,
} from '../accessibility/screen_reader_live';
import { useEuiI18n } from '../i18n';

export type _EuiSkeletonAriaProps = {
  /**
   * When true, shows the loading skeleton component.
   * When false, shows any `children` and announces to screen readers that your content has loaded.
   */
  isLoading?: boolean;
  /**
   * Label your loading sections to provide more helpful context to screen readers.
   * For example, pass "API keys" to have screen readers read "Loading API keys" and "Loaded API keys".
   */
  contentAriaLabel?: string;
  /**
   * Makes a live screen reader announcement when `isLoading` is true
   * @default false
   */
  announceLoadingStatus?: boolean;
  /**
   * Makes a live screen reader announcement when `isLoading` is false
   * @default true
   */
  announceLoadedStatus?: boolean;
  /**
   * Optional props to pass to the `aria-live` region that announces the loading status to screen readers.
   * Accepts any `EuiScreenReaderLive` props.
   */
  ariaLiveProps?: Partial<EuiScreenReaderLiveProps>;
  /**
   * Optional props to pass to the `aria-busy` wrapper around the skeleton content
   */
  ariaWrapperProps?: HTMLAttributes<HTMLDivElement>;
};

export type EuiSkeletonLoadingProps = CommonProps &
  _EuiSkeletonAriaProps['ariaWrapperProps'] &
  Omit<_EuiSkeletonAriaProps, 'ariaWrapperProps'> & {
    /**
     * Content to display when loading
     */
    loadingContent: ReactElement;
    /**
     * Content to display when loaded
     */
    loadedContent: any;
  };

export const EuiSkeletonLoading: FunctionComponent<EuiSkeletonLoadingProps> = ({
  isLoading = true,
  contentAriaLabel,
  loadingContent: _loadingContent,
  loadedContent,
  announceLoadingStatus = false,
  announceLoadedStatus = true,
  ariaLiveProps,
  ...rest
}) => {
  const loadedAriaLive = useEuiI18n(
    'euiSkeletonLoading.loadedAriaText',
    'Loaded {contentAriaLabel}',
    { contentAriaLabel }
  );

  const loadingAriaLabel = useEuiI18n(
    'euiSkeletonLoading.loadingAriaText',
    'Loading {contentAriaLabel}',
    { contentAriaLabel }
  );
  const loadingProps = {
    'aria-label': loadingAriaLabel,
    role: 'progressbar',
  };
  const loadingContent = React.cloneElement(_loadingContent, loadingProps);

  return (
    <div
      aria-busy={isLoading}
      data-test-subj="euiSkeletonLoadingAriaWrapper"
      {...rest}
    >
      {isLoading ? (
        <>
          {announceLoadingStatus && (
            <EuiScreenReaderLive {...ariaLiveProps}>
              {loadingAriaLabel}
            </EuiScreenReaderLive>
          )}
          {loadingContent}
        </>
      ) : (
        <>
          {announceLoadedStatus && (
            <EuiScreenReaderLive {...ariaLiveProps}>
              {loadedAriaLive}
            </EuiScreenReaderLive>
          )}
          {loadedContent}
        </>
      )}
    </div>
  );
};
