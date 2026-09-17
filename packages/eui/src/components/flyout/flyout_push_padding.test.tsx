/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { act } from '@testing-library/react';

import { render } from '../../test/rtl';
import { EuiFlyout } from './flyout';
import { EuiFlyoutManager } from './manager';
import { _resetFlyoutManagerStore } from './manager/store';

// Push padding is derived from the flyout's measured width. jsdom doesn't lay
// out, so pin a non-zero width to make the applied offset observable.
jest.mock('../observer/resize_observer', () => ({
  useResizeObserver: () => ({ width: 300, height: 0 }),
}));

jest.mock('../overlay_mask', () => ({
  EuiOverlayMask: ({
    headerZindexLocation,
    maskRef,
    hasAnimation,
    ...props
  }: any) => <div {...props} ref={maskRef} />,
}));

jest.mock('../portal', () => ({
  EuiPortal: ({ children }: { children: any }) => children,
}));

const PUSH_OFFSET = '300px';
const bodyOffset = () => document.body.style.paddingInlineEnd;

// Flush store-driven re-renders that propagate across the separate React roots
// (a new session backgrounding another root's flyout, or a root reclaiming
// ownership after another closes).
const flushCrossRoot = async () => {
  // Let store-driven re-renders in the other root settle: the newly mounted
  // flyout registers its session in an effect, which schedules a re-render that
  // re-runs its push-padding effect. Flush microtasks + a macrotask tick.
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
};

const renderManagedFlyout = (props: Record<string, unknown> = {}) =>
  render(
    <EuiFlyoutManager>
      <EuiFlyout
        onClose={() => {}}
        session="start"
        pushMinBreakpoint="xs"
        aria-label="Test flyout"
        {...props}
      />
    </EuiFlyoutManager>
  );

describe('EuiFlyout managed push padding (owner-token)', () => {
  beforeEach(() => {
    _resetFlyoutManagerStore();
    document.body.style.paddingInlineStart = '';
    document.body.style.paddingInlineEnd = '';
  });

  afterEach(() => {
    _resetFlyoutManagerStore();
    document.body.style.paddingInlineStart = '';
    document.body.style.paddingInlineEnd = '';
  });

  it('applies the body offset for an active managed push flyout and clears it on close', () => {
    const { unmount } = renderManagedFlyout({ type: 'push' });
    expect(bodyOffset()).toBe(PUSH_OFFSET);

    unmount();
    expect(bodyOffset()).toBe('');
  });

  it('does not strand the body offset after two push flyouts in separate roots close (#9788)', async () => {
    // Two flyouts rendered in separate React roots share the singleton flyout
    // manager store — the multi-root scenario (e.g. Kibana's system flyouts).
    const a = renderManagedFlyout({ type: 'push' });
    await flushCrossRoot();
    expect(bodyOffset()).toBe(PUSH_OFFSET);

    // A second push flyout opens a new session, backgrounding the first.
    const b = renderManagedFlyout({ type: 'push' });
    await flushCrossRoot();

    // Close both. Once nothing is open the body must return to its base value.
    // Previously the per-flyout stale-snapshot restore left the offset stranded
    // here (page still pushed with no flyout open).
    a.unmount();
    await flushCrossRoot();
    b.unmount();
    await flushCrossRoot();
    expect(bodyOffset()).toBe('');
  });

  it('keeps the push main offset while an overlay child is open (coexistence)', () => {
    const { unmount } = render(
      <EuiFlyoutManager>
        <EuiFlyout
          onClose={() => {}}
          session="start"
          type="push"
          pushMinBreakpoint="xs"
          aria-label="Main flyout"
        >
          {/* Child flyouts are always overlays; the child must not clobber the
              push main's offset. */}
          <EuiFlyout
            onClose={() => {}}
            session="inherit"
            aria-label="Child flyout"
          />
        </EuiFlyout>
      </EuiFlyoutManager>
    );

    expect(bodyOffset()).toBe(PUSH_OFFSET);

    unmount();
    expect(bodyOffset()).toBe('');
  });

  it('releases a lingering push offset when an overlay main opens over a push flyout', async () => {
    const a = renderManagedFlyout({ type: 'push' });
    await flushCrossRoot();
    expect(bodyOffset()).toBe(PUSH_OFFSET);

    // A new overlay main session over the (now backgrounded) push flyout must
    // clear the offset so the page is not left pushed.
    const b = renderManagedFlyout({ type: 'overlay' });
    await flushCrossRoot();
    expect(bodyOffset()).toBe('');

    // Returning to the push flyout re-applies its offset.
    b.unmount();
    await flushCrossRoot();
    expect(bodyOffset()).toBe(PUSH_OFFSET);

    a.unmount();
    await flushCrossRoot();
    expect(bodyOffset()).toBe('');
  });
});

describe('EuiFlyout standalone (non-managed) push padding (owner-token)', () => {
  const renderStandalone = () =>
    render(
      <EuiFlyout
        onClose={() => {}}
        type="push"
        pushMinBreakpoint="xs"
        aria-label="Standalone flyout"
      />
    );

  afterEach(() => {
    document.body.style.paddingInlineStart = '';
    document.body.style.paddingInlineEnd = '';
  });

  it('does not strand the body offset when two standalone push flyouts sharing document.body close (#9788)', () => {
    // The exact issue repro: two `type="push"` flyouts without a manager both
    // write to document.body.
    const a = renderStandalone();
    expect(bodyOffset()).toBe(PUSH_OFFSET);

    const b = renderStandalone();
    expect(bodyOffset()).toBe(PUSH_OFFSET);

    // Closing the first (obscured) flyout must not clear the offset the second
    // still needs.
    a.unmount();
    expect(bodyOffset()).toBe(PUSH_OFFSET);

    // Closing the last flyout returns the body to its base value. Previously the
    // per-flyout stale-snapshot restore left the offset stranded here.
    b.unmount();
    expect(bodyOffset()).toBe('');
  });
});
