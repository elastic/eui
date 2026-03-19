/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { waitFor } from '@testing-library/react';
import { render } from '../../test/rtl';
import { EuiFlyout } from './flyout';

/**
 * Mock EuiFlyoutOverlay so we can inspect the containerRect prop that
 * flyout.component.tsx passes down, without depending on Emotion's CSS
 * injection or internal class-name details.
 */
const mockOverlayProps = jest.fn();

jest.mock('./_flyout_overlay', () => ({
  EuiFlyoutOverlay: (props: any) => {
    mockOverlayProps(props);
    return <>{props.children}</>;
  },
}));

jest.mock('../portal', () => ({
  EuiPortal: ({ children }: { children: any }) => children,
}));

describe('EuiFlyout container prop', () => {
  const MOCK_RECT = {
    top: 50,
    left: 100,
    width: 900,
    height: 600,
    right: 1000,
    bottom: 650,
    x: 100,
    y: 50,
    toJSON: () => ({}),
  } as DOMRect;

  let containerEl: HTMLDivElement;

  beforeEach(() => {
    mockOverlayProps.mockClear();
    containerEl = document.createElement('div');
    jest.spyOn(containerEl, 'getBoundingClientRect').mockReturnValue(MOCK_RECT);
    document.body.appendChild(containerEl);
  });

  afterEach(() => {
    containerEl.remove();
  });

  it('passes containerRect to EuiFlyoutOverlay when container is provided', async () => {
    render(<EuiFlyout onClose={() => {}} container={containerEl} />);

    // containerRect is set asynchronously via useLayoutEffect after
    // useResizeObserver fires, so wait for the overlay to re-render
    // with a non-null containerRect.
    await waitFor(() => {
      const lastCall = mockOverlayProps.mock.calls.at(-1)?.[0];
      expect(lastCall?.containerRect).toEqual(
        expect.objectContaining({
          top: 50,
          left: 100,
          width: 900,
          height: 600,
        })
      );
    });
  });

  it('does not pass containerRect when no container is provided', () => {
    render(<EuiFlyout onClose={() => {}} />);

    const lastCall = mockOverlayProps.mock.calls.at(-1)?.[0];
    expect(lastCall?.containerRect).toBeNull();
  });
});
