/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { FunctionComponent, HTMLAttributes, ReactElement } from 'react';

import { CommonProps } from '../common';
import { EuiScreenReaderLive } from '../accessibility/screen_reader_live';
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
   * Any optional props to pass to the `aria-busy` wrapper around the skeleton content
   */
  ariaWrapperProps?: HTMLAttributes<HTMLDivElement>;
};

export type EuiSkeletonLoadingProps = CommonProps &
  _EuiSkeletonAriaProps['ariaWrapperProps'] &
  Pick<_EuiSkeletonAriaProps, 'isLoading' | 'contentAriaLabel'> & {
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
  loadingContent,
  loadedContent,
  ...rest
}) => {
  const loadingAriaLabel = useEuiI18n(
    'euiSkeletonLoading.loadingAriaText',
    'Loading {contentAriaLabel}',
    { contentAriaLabel }
  );
  const loadedAriaLive = useEuiI18n(
    'euiSkeletonLoading.loadedAriaText',
    'Loaded {contentAriaLabel}',
    { contentAriaLabel }
  );
  const loadingProps = {
    'aria-label': loadingAriaLabel,
    role: 'progressbar',
  };

  return (
    <div
      aria-busy={isLoading}
      data-test-subj="euiSkeletonLoadingAriaWrapper"
      {...rest}
    >
      {isLoading ? (
        React.cloneElement(loadingContent, loadingProps)
      ) : (
        <>
          <EuiScreenReaderLive>{loadedAriaLive}</EuiScreenReaderLive>
          {loadedContent}
        </>
      )}
    </div>
  );
};
