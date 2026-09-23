/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { act } from '@testing-library/react';

import { render } from '../../../test/rtl';
import { EuiFlyout } from '../flyout';
import { EuiFlyoutManager } from './index';
import { getFlyoutManagerStore, _resetFlyoutManagerStore } from './store';

jest.mock('../../overlay_mask', () => ({
  EuiOverlayMask: ({
    headerZindexLocation,
    maskRef,
    hasAnimation,
    ...props
  }: any) => <div {...props} ref={maskRef} />,
}));

jest.mock('../../portal', () => ({
  EuiPortal: ({ children }: { children: any }) => children,
}));

// Let store-driven re-renders settle across the separate React roots.
const flushCrossRoot = async () => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
};

const renderSession = (id: string) =>
  render(
    <EuiFlyoutManager>
      <EuiFlyout
        id={id}
        onClose={() => {}}
        session="start"
        aria-label={id}
        data-test-subj={id}
      />
    </EuiFlyoutManager>
  );

const sessionMainIds = () =>
  getFlyoutManagerStore()
    .getState()
    .sessions.map((session) => session.mainFlyoutId);

describe('EuiManagedFlyout closing a backgrounded main', () => {
  beforeEach(() => _resetFlyoutManagerStore());
  afterEach(() => _resetFlyoutManagerStore());

  it('removes only its own session when unmounted behind a newer session', async () => {
    // Two `session="start"` mains in separate React roots (e.g. Kibana system
    // flyouts): the second backgrounds the first.
    const first = renderSession('first');
    await flushCrossRoot();
    const second = renderSession('second');
    await flushCrossRoot();
    expect(sessionMainIds()).toEqual(['first', 'second']);

    // Closing the backgrounded main (programmatically, from its own root) must
    // not tear down the foreground session.
    first.unmount();
    await flushCrossRoot();
    expect(sessionMainIds()).toEqual(['second']);
    expect(second.getByTestSubject('second')).toHaveAttribute(
      'data-managed-flyout-level',
      'main'
    );

    second.unmount();
    await flushCrossRoot();
    expect(sessionMainIds()).toEqual([]);
  });

  it('still closes the whole current session when the foreground main unmounts', async () => {
    const first = renderSession('first');
    await flushCrossRoot();
    const second = renderSession('second');
    await flushCrossRoot();

    second.unmount();
    await flushCrossRoot();
    expect(sessionMainIds()).toEqual(['first']);

    first.unmount();
    await flushCrossRoot();
    expect(sessionMainIds()).toEqual([]);
  });
});
