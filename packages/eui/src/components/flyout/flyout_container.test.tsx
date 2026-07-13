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

  describe('container min-inline-size', () => {
    const getMinInlineSize = async (size: string, containerWidth: number) => {
      const rect = {
        ...MOCK_RECT,
        width: containerWidth,
        right: MOCK_RECT.left + containerWidth,
      } as DOMRect;
      (containerEl.getBoundingClientRect as jest.Mock).mockReturnValue(rect);
      Object.defineProperty(containerEl, 'clientWidth', {
        value: containerWidth,
        configurable: true,
      });

      const { container } = render(
        <EuiFlyout
          onClose={() => {}}
          container={containerEl}
          size={size as any}
        />
      );

      let flyout: HTMLElement | null = null;
      await waitFor(() => {
        flyout = container.querySelector('.euiFlyout');
        expect(flyout).not.toBeNull();
        expect(flyout!.style.minInlineSize).not.toBe('');
      });
      return flyout!.style.minInlineSize;
    };

    it('applies a min-inline-size for size s', async () => {
      const minSize = await getMinInlineSize('s', 900);
      const px = parseInt(minSize, 10);
      expect(px).toBeGreaterThan(0);
      expect(px).toBeLessThanOrEqual(900 * 0.9);
    });

    it('applies a min-inline-size for size m', async () => {
      const minSize = await getMinInlineSize('m', 900);
      const px = parseInt(minSize, 10);
      expect(px).toBeGreaterThan(0);
      expect(px).toBeLessThanOrEqual(900 * 0.9);
    });

    it('caps min-inline-size at containerMaxWidth for small containers', async () => {
      const containerWidth = 300;
      const minSize = await getMinInlineSize('s', containerWidth);
      const px = parseInt(minSize, 10);
      expect(px).toBe(Math.round(containerWidth * 0.9));
    });

    it('uses min-inline-size of 0 for fill size', async () => {
      const minSize = await getMinInlineSize('fill', 900);
      expect(parseInt(minSize, 10)).toBe(0);
    });
  });
});
