/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { render } from '../../test/rtl';
import { shouldRenderCustomStyles } from '../../test/internal';

import { EuiSkeletonLoading } from './skeleton_loading';

describe('EuiSkeletonLoading', () => {
  const loadingContent = <span data-test-subj="loading" />;
  const loadedContent = <span data-test-subj="loaded" />;

  const contentProps = {
    loadingContent,
    loadedContent,
    contentAriaLabel: 'Sample user data',
  };

  shouldRenderCustomStyles(<EuiSkeletonLoading {...contentProps} />);

  it('renders `loadingContent` when `isLoading` is true', () => {
    const { container, queryByTestSubject } = render(
      <EuiSkeletonLoading {...contentProps} isLoading={true} />
    );

    expect(queryByTestSubject('loading')).toBeTruthy();
    expect(queryByTestSubject('loaded')).toBeFalsy();
    expect(container.firstChild).toMatchSnapshot();
  });

  it('renders `loadedContent` when `isLoading` is false', () => {
    const { container, queryByTestSubject } = render(
      <EuiSkeletonLoading {...contentProps} isLoading={false} />
    );

    expect(queryByTestSubject('loading')).toBeFalsy();
    expect(queryByTestSubject('loaded')).toBeTruthy();
    expect(container.firstChild).toMatchSnapshot();
  });

  describe('aria-live behavior', () => {
    test('announceLoadingStatus - allows enabling live announcements', () => {
      const { container, getByText } = render(
        <EuiSkeletonLoading {...contentProps} announceLoadingStatus={true} />
      );

      expect(getByText('Loading Sample user data')).toBeTruthy();
      expect(container.firstChild).toMatchSnapshot();
    });

    test('announceLoadedStatus - allows turning off live announcements', () => {
      const { container, queryByText } = render(
        <EuiSkeletonLoading
          {...contentProps}
          isLoading={false}
          announceLoadedStatus={false}
        />
      );

      expect(queryByText('Loaded Sample user data')).toBeFalsy();
      expect(container.firstChild).toMatchSnapshot();
    });

    test('ariaLiveProps', () => {
      const { container, getByRole } = render(
        <EuiSkeletonLoading
          {...contentProps}
          isLoading={false}
          ariaLiveProps={{ role: 'alert' }}
        />
      );

      expect(getByRole('alert')).toBeTruthy();
      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
