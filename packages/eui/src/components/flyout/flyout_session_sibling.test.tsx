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

// jsdom doesn't lay out; pin every observed element's width so the first
// flyout registers a non-zero width in the manager store. Unobserved (null)
// targets, such as the manager's absent `container`, must stay 0 so the
// reference width falls back to the window.
const MEASURED_WIDTH = 300;
jest.mock('../observer/resize_observer', () => ({
  useResizeObserver: (element: Element | null) => ({
    width: element ? MEASURED_WIDTH : 0,
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

// Let the newly mounted root register its session in the store and re-render.
const flushCrossRoot = async () => {
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 0));
  });
};

// Legacy roots mirror consumers mounting each flyout with `ReactDOM.render`
// (e.g. Kibana's system flyouts). There, the width seeded from `size` and the
// store-driven re-render land in the same sync batch, so a wrongly-derived
// sibling on the first render sticks. Concurrent roots happen to recover.
const renderManagedFlyout = (props: Record<string, unknown> = {}) =>
  render(
    <EuiFlyoutManager>
      <EuiFlyout onClose={() => {}} session="start" {...props} />
    </EuiFlyoutManager>,
    { legacyRoot: true }
  );

describe('EuiFlyout sibling derivation across sessions', () => {
  const consoleError = console.error;
  beforeEach(() => {
    _resetFlyoutManagerStore();
    // The Jest setup throws on console.error; React 18 warns once per legacy root.
    console.error = (...args: unknown[]) => {
      if (String(args[0]).includes('ReactDOM.render is no longer supported')) {
        return;
      }
      consoleError(...args);
    };
  });
  afterEach(() => {
    console.error = consoleError;
    _resetFlyoutManagerStore();
  });

  it('does not clamp a new main flyout against the main of the session it backgrounds', async () => {
    const referenceWidth = window.innerWidth;
    // Wider than 90% of the reference minus the first flyout's width, so a
    // wrongly-derived sibling would visibly shrink it.
    const requestedWidth = Math.round(referenceWidth * 0.75);
    expect(requestedWidth).toBeGreaterThan(
      referenceWidth * 0.9 - MEASURED_WIDTH
    );

    const first = renderManagedFlyout({ 'aria-label': 'First' });
    await flushCrossRoot();

    // Rendered in a separate React root, sharing the singleton store (e.g.
    // Kibana system flyouts). On its first render its own session is not yet
    // registered, so the top-most session still belongs to the first flyout.
    const second = renderManagedFlyout({
      'aria-label': 'Second',
      resizable: true,
      size: requestedWidth,
    });
    await flushCrossRoot();

    const secondFlyout = second.getByLabelText('Second');
    const expectedPct = (requestedWidth / referenceWidth) * 100;
    expect(secondFlyout.getAttribute('style')).toContain(
      `inline-size: ${expectedPct}%`
    );

    second.unmount();
    first.unmount();
  });

  it('publishes the main width variable only for the active session', async () => {
    const mainWidthVar = () =>
      document.documentElement.style.getPropertyValue('--euiFlyoutMainWidth');
    const toPct = (width: number) => `${(width / window.innerWidth) * 100}%`;
    const requestedWidth = 400;
    const expectedPct = toPct(requestedWidth);

    const first = renderManagedFlyout({
      'aria-label': 'First',
      resizable: true,
      size: requestedWidth,
    });
    await flushCrossRoot();
    expect(mainWidthVar()).toBe(expectedPct);

    // A non-resizable main never writes the variable, so the backgrounded
    // main has to clear its own value or the new session's child reads it.
    const second = renderManagedFlyout({ 'aria-label': 'Second' });
    await flushCrossRoot();
    expect(mainWidthVar()).toBe('');

    // Back in the foreground, the first main publishes again.
    second.unmount();
    await flushCrossRoot();
    expect(mainWidthVar()).toBe(expectedPct);

    // The backgrounded main's cleanup runs after the new main has published
    // in its own root and must not remove the new value.
    const third = renderManagedFlyout({
      'aria-label': 'Third',
      resizable: true,
      size: 300,
    });
    await flushCrossRoot();
    expect(mainWidthVar()).toBe(toPct(300));

    third.unmount();
    await flushCrossRoot();
    expect(mainWidthVar()).toBe(expectedPct);

    first.unmount();
    expect(mainWidthVar()).toBe('');
  });
});
