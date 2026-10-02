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
import {
  _resetFlyoutManagerStore,
  getFlyoutManagerStore,
} from './manager/store';

// Push padding is derived from the flyout's measured width. jsdom doesn't lay
// out, so pin a non-zero width to make the applied offset observable. Tests
// that need distinct widths per flyout register them here by `aria-label`.
const mockWidths = new Map<string, number>();
jest.mock('../observer/resize_observer', () => ({
  useResizeObserver: (element: HTMLElement | null) => ({
    width: mockWidths.get(element?.getAttribute('aria-label') ?? '') ?? 300,
    height: 0,
  }),
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

describe('EuiFlyout managed push padding', () => {
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

describe('EuiFlyout standalone (non-managed) push padding', () => {
  const Standalone = ({ label = 'Standalone flyout' }: { label?: string }) => (
    <EuiFlyout
      onClose={() => {}}
      type="push"
      pushMinBreakpoint="xs"
      aria-label={label}
    />
  );
  const renderStandalone = () => render(<Standalone />);

  afterEach(() => {
    mockWidths.clear();
    document.body.style.paddingInlineStart = '';
    document.body.style.paddingInlineEnd = '';
  });

  it('applies the widest contribution and follows resizes while several push flyouts are open', () => {
    mockWidths.set('Narrow', 200);
    mockWidths.set('Wide', 500);

    const narrow = render(<Standalone label="Narrow" />);
    expect(bodyOffset()).toBe('200px');

    const wide = render(<Standalone label="Wide" />);
    expect(bodyOffset()).toBe('500px');

    // Resizing the wide flyout below the narrow one hands the offset over to the narrow one.
    mockWidths.set('Wide', 100);
    wide.rerender(<Standalone label="Wide" />);
    expect(bodyOffset()).toBe('200px');

    mockWidths.set('Wide', 500);
    wide.rerender(<Standalone label="Wide" />);
    expect(bodyOffset()).toBe('500px');

    // Closing the widest flyout falls back to the next contribution, not to the base value.
    wide.unmount();
    expect(bodyOffset()).toBe('200px');

    narrow.unmount();
    expect(bodyOffset()).toBe('');
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

  it('keeps the offset for the older flyout when the newest standalone push flyout closes first', () => {
    const a = renderStandalone();
    const b = renderStandalone();
    expect(bodyOffset()).toBe(PUSH_OFFSET);

    // LIFO close: the flyout that opened last closes first. A is still open and
    // must stay pushed.
    b.unmount();
    expect(bodyOffset()).toBe(PUSH_OFFSET);

    a.unmount();
    expect(bodyOffset()).toBe('');
  });

  it('keeps the offset for an active managed push flyout when a standalone push flyout closes', async () => {
    _resetFlyoutManagerStore();
    const standalone = renderStandalone();
    expect(bodyOffset()).toBe(PUSH_OFFSET);

    // A managed push flyout in another root (e.g. a Kibana system flyout)
    // shares document.body with the standalone one.
    const managed = renderManagedFlyout({ type: 'push' });
    await flushCrossRoot();
    expect(bodyOffset()).toBe(PUSH_OFFSET);

    // Closing the standalone flyout must not clear the offset the still-active
    // managed flyout needs.
    standalone.unmount();
    await flushCrossRoot();
    expect(bodyOffset()).toBe(PUSH_OFFSET);

    managed.unmount();
    await flushCrossRoot();
    expect(bodyOffset()).toBe('');
    _resetFlyoutManagerStore();
  });

  it('does not report a standalone push flyout to the flyout manager', async () => {
    _resetFlyoutManagerStore();
    const managerPushPadding = () =>
      getFlyoutManagerStore().getState().pushPadding?.right ?? 0;

    const managed = renderManagedFlyout({ type: 'push' });
    await flushCrossRoot();
    const standalone = renderStandalone();
    expect(managerPushPadding()).toBe(300);

    // The body stays pushed for the standalone flyout, but the manager must
    // not be left believing a managed flyout is still pushing: a later managed
    // overlay would otherwise skip scroll locking.
    managed.unmount();
    await flushCrossRoot();
    expect(bodyOffset()).toBe(PUSH_OFFSET);
    expect(managerPushPadding()).toBe(0);

    standalone.unmount();
    expect(bodyOffset()).toBe('');
    _resetFlyoutManagerStore();
  });

  it('keeps the global offset variable while flyouts in separate roots close one after another', () => {
    // Kibana's app root and each system flyout root are separate React roots. The variable is
    // written inline on `<html>` rather than through each root's `EuiProvider`, so closing one
    // root's flyout cannot leave a stale value from its provider behind.
    const Root = ({ open }: { open: boolean }) =>
      open ? (
        <EuiFlyout
          onClose={() => {}}
          type="push"
          pushMinBreakpoint="xs"
          aria-label="Root flyout"
        />
      ) : null;
    const offsetVar = () =>
      document.documentElement.style.getPropertyValue(
        '--euiPushFlyoutOffsetInlineEnd'
      );

    const a = render(<Root open />);
    const b = render(<Root open />);
    expect(offsetVar()).toBe(PUSH_OFFSET);

    a.rerender(<Root open={false} />);
    expect(bodyOffset()).toBe(PUSH_OFFSET);
    expect(offsetVar()).toBe(PUSH_OFFSET);

    b.rerender(<Root open={false} />);
    expect(bodyOffset()).toBe('');
    expect(offsetVar()).toBe('');

    a.unmount();
    b.unmount();
  });

  it('scopes the offset to a shared container element, not document.body', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const renderInContainer = (label: string) =>
      render(
        <EuiFlyout
          onClose={() => {}}
          type="push"
          pushMinBreakpoint="xs"
          container={container}
          aria-label={label}
        />
      );

    const a = renderInContainer('Container flyout A');
    // The offset is applied to the container, and document.body is untouched.
    expect(container.style.paddingInlineEnd).toBe(PUSH_OFFSET);
    expect(bodyOffset()).toBe('');

    const b = renderInContainer('Container flyout B');
    expect(container.style.paddingInlineEnd).toBe(PUSH_OFFSET);

    // Same close-order guarantee as document.body, but scoped to the container.
    a.unmount();
    expect(container.style.paddingInlineEnd).toBe(PUSH_OFFSET);

    b.unmount();
    expect(container.style.paddingInlineEnd).toBe('');

    container.remove();
  });

  it('applies and clears the inline-start offset for a left-side push flyout', () => {
    const { unmount } = render(
      <EuiFlyout
        onClose={() => {}}
        type="push"
        side="left"
        pushMinBreakpoint="xs"
        aria-label="Left-side push flyout"
      />
    );
    // Left-side flyouts push via `padding-inline-start`; the inline-end side is untouched.
    expect(document.body.style.paddingInlineStart).toBe(PUSH_OFFSET);
    expect(bodyOffset()).toBe('');

    unmount();
    expect(document.body.style.paddingInlineStart).toBe('');
  });
});
