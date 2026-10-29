/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { useState } from 'react';
import { fireEvent } from '@testing-library/react';

import { render, screen } from '../../test/rtl';
import { EuiFlyout } from './flyout';
import { getMaximizedFlyoutStyles } from './flyout.styles';
import { EuiFlyoutManager } from './manager';
import {
  _resetFlyoutManagerStore,
  getFlyoutManagerStore,
} from './manager/store';

const CONTAINER_WIDTH = 900;
const FLYOUT_WIDTH = 300;

// jsdom doesn't lay out. The container reports its mocked width. A flyout
// reports `mockMeasuredWidth` when a test sets it, otherwise its painted
// inline size, so a maximized paint is what the resize observer would see.
let mockContainer: HTMLElement | null = null;
let mockMeasuredWidth: number | undefined;
jest.mock('../observer/resize_observer', () => ({
  useResizeObserver: (element: HTMLElement | null) => {
    if (!element) return { width: 0, height: 0 };
    if (element === mockContainer) return { width: 900, height: 0 };
    return {
      width: mockMeasuredWidth ?? (parseFloat(element.style.inlineSize) || 300),
      height: 0,
    };
  },
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

const maximizeButton = () =>
  screen.getByTestSubject('euiFlyoutMenuMaximizeButton');

const storedFlyout = (flyoutId: string) =>
  getFlyoutManagerStore()
    .getState()
    .flyouts.find((f) => f.flyoutId === flyoutId);

describe('EuiFlyout maximize', () => {
  let containerEl: HTMLDivElement;

  beforeEach(() => {
    _resetFlyoutManagerStore();
    containerEl = document.createElement('div');
    mockContainer = containerEl;
    jest.spyOn(containerEl, 'getBoundingClientRect').mockReturnValue({
      top: 50,
      left: 100,
      width: CONTAINER_WIDTH,
      height: 600,
      right: 100 + CONTAINER_WIDTH,
      bottom: 650,
      x: 100,
      y: 50,
      toJSON: () => ({}),
    } as DOMRect);
    Object.defineProperty(containerEl, 'clientWidth', {
      value: CONTAINER_WIDTH,
      configurable: true,
    });
    document.body.appendChild(containerEl);
  });

  afterEach(() => {
    containerEl.remove();
    mockContainer = null;
    mockMeasuredWidth = undefined;
    _resetFlyoutManagerStore();
  });

  describe('standalone flyout in a container', () => {
    const renderStandalone = (props: Record<string, unknown> = {}) =>
      render(
        <EuiFlyout
          aria-label="Standalone"
          onClose={() => {}}
          container={containerEl}
          size={400}
          resizable
          flyoutMenuProps={{ showMaximizeButton: true }}
          {...props}
        />
      );

    it('fills the container and restores the previous width', () => {
      const onMaximizeChange = jest.fn();
      renderStandalone({
        flyoutMenuProps: { showMaximizeButton: true, onMaximizeChange },
      });
      const flyout = screen.getByLabelText('Standalone');
      const restoredInlineSize = flyout.style.inlineSize;
      expect(restoredInlineSize).not.toBe(`${CONTAINER_WIDTH}px`);

      fireEvent.click(maximizeButton());

      expect(flyout).toHaveClass('euiFlyout--maximized');
      expect(flyout.style.inlineSize).toBe(`${CONTAINER_WIDTH}px`);
      expect(flyout.style.minInlineSize).toBe(`${CONTAINER_WIDTH}px`);
      expect(flyout.style.maxInlineSize).toBe('none');
      expect(onMaximizeChange).toHaveBeenLastCalledWith(true);

      fireEvent.click(maximizeButton());

      expect(flyout).not.toHaveClass('euiFlyout--maximized');
      expect(flyout.style.inlineSize).toBe(restoredInlineSize);
      expect(onMaximizeChange).toHaveBeenLastCalledWith(false);
    });

    it('hides the resize handle while maximized', () => {
      const { container } = renderStandalone();
      expect(container.querySelector('.euiResizableButton')).not.toBeNull();

      fireEvent.click(maximizeButton());

      expect(container.querySelector('.euiResizableButton')).toBeNull();
    });

    it('ignores maxWidth while maximized', () => {
      renderStandalone({ maxWidth: 500 });
      const flyout = screen.getByLabelText('Standalone');

      fireEvent.click(maximizeButton());

      expect(flyout.style.inlineSize).toBe(`${CONTAINER_WIDTH}px`);
      expect(flyout.style.maxInlineSize).toBe('none');
    });
  });

  describe('managed main and child', () => {
    const CHILD_WIDTH = CONTAINER_WIDTH * 0.25;

    const MainWithChild = ({
      onMaximizeChange,
      childSize = 's',
      childResizable = false,
      showMaximizeButton = true,
      mainProps,
    }: {
      onMaximizeChange?: (isMaximized: boolean) => void;
      childSize?: 's' | 'fill';
      childResizable?: boolean;
      showMaximizeButton?: boolean;
      mainProps?: { size?: number; resizable?: boolean; onResize?: () => void };
    }) => {
      const [isChildOpen, setIsChildOpen] = useState(false);
      return (
        <EuiFlyoutManager>
          <EuiFlyout
            id="main"
            aria-label="Main"
            session="start"
            size="s"
            container={containerEl}
            onClose={() => {}}
            flyoutMenuProps={{ showMaximizeButton, onMaximizeChange }}
            {...mainProps}
          >
            <button onClick={() => setIsChildOpen(true)}>Open child</button>
            <button onClick={() => setIsChildOpen(false)}>Close child</button>
            {isChildOpen && (
              <EuiFlyout
                id="child"
                aria-label="Child"
                session="inherit"
                size={childSize}
                resizable={childResizable}
                container={containerEl}
                onClose={() => setIsChildOpen(false)}
                // Ignored: only main flyouts have the button
                flyoutMenuProps={{ showMaximizeButton: true }}
              />
            )}
          </EuiFlyout>
        </EuiFlyoutManager>
      );
    };

    it('shows the button only on the main flyout', () => {
      render(<MainWithChild />);
      fireEvent.click(screen.getByText('Open child'));

      const buttons = screen.getAllByTestSubject('euiFlyoutMenuMaximizeButton');
      expect(buttons).toHaveLength(1);
      expect(screen.getByLabelText('Main')).toContainElement(buttons[0]);
    });

    it('keeps a maximized main maximized and makes room for a child that opens', () => {
      const onMaximizeChange = jest.fn();
      render(<MainWithChild onMaximizeChange={onMaximizeChange} />);
      const main = screen.getByLabelText('Main');

      fireEvent.click(maximizeButton());
      expect(main.style.inlineSize).toBe(`${CONTAINER_WIDTH}px`);

      fireEvent.click(screen.getByText('Open child'));

      expect(storedFlyout('main')?.maximized).toBe(true);
      expect(main).toHaveClass('euiFlyout--maximized');
      expect(screen.getByLabelText('Child').style.inlineSize).toBe(
        `${CHILD_WIDTH}px`
      );
      expect(main.style.inlineSize).toBe(
        `${CONTAINER_WIDTH - storedFlyout('child')!.width!}px`
      );
      expect(getFlyoutManagerStore().getState().layoutMode).toBe(
        'side-by-side'
      );
      expect(onMaximizeChange).toHaveBeenCalledTimes(1);

      fireEvent.click(screen.getByText('Close child'));

      expect(main.style.inlineSize).toBe(`${CONTAINER_WIDTH}px`);
    });

    it('makes room for an open child when the main is maximized', () => {
      render(<MainWithChild />);
      fireEvent.click(screen.getByText('Open child'));
      const main = screen.getByLabelText('Main');
      const child = screen.getByLabelText('Child');

      fireEvent.click(maximizeButton());

      expect(child.style.inlineSize).toBe(`${CHILD_WIDTH}px`);
      expect(main.style.inlineSize).toBe(
        `${CONTAINER_WIDTH - storedFlyout('child')!.width!}px`
      );
      expect(getFlyoutManagerStore().getState().layoutMode).toBe(
        'side-by-side'
      );
    });

    it('keeps the width of a fill child, which depends on the main width', () => {
      render(<MainWithChild childSize="fill" />);
      fireEvent.click(screen.getByText('Open child'));
      const main = screen.getByLabelText('Main');
      const child = screen.getByLabelText('Child');
      const childInlineSize = child.style.inlineSize;
      expect(parseFloat(childInlineSize)).toBeGreaterThan(0);

      fireEvent.click(maximizeButton());

      expect(child.style.inlineSize).toBe(childInlineSize);
      expect(main.style.inlineSize).toBe(
        `${CONTAINER_WIDTH - parseFloat(childInlineSize)}px`
      );

      fireEvent.click(maximizeButton());

      expect(child.style.inlineSize).toBe(childInlineSize);
    });

    it('stores the painted width on maximize and on restore', () => {
      render(<MainWithChild />);
      fireEvent.click(screen.getByText('Open child'));
      const main = screen.getByLabelText('Main');
      const restoredInlineSize = main.style.inlineSize;

      fireEvent.click(maximizeButton());
      expect(`${storedFlyout('main')?.width}px`).toBe(main.style.inlineSize);

      fireEvent.click(maximizeButton());
      expect(main.style.inlineSize).toBe(restoredInlineSize);
      expect(`${storedFlyout('main')?.width}px`).toBe(restoredInlineSize);
    });

    it('restores a wide resizable main to the width that fits beside the child', () => {
      const onResize = jest.fn();
      render(
        <MainWithChild mainProps={{ size: 700, resizable: true, onResize }} />
      );
      const main = screen.getByLabelText('Main');

      fireEvent.click(maximizeButton());
      fireEvent.click(screen.getByText('Open child'));
      fireEvent.click(maximizeButton());

      expect(main.style.inlineSize).toBe(
        `${CONTAINER_WIDTH * 0.9 - CHILD_WIDTH}px`
      );
      expect(getFlyoutManagerStore().getState().layoutMode).toBe(
        'side-by-side'
      );
      expect(onResize).not.toHaveBeenCalled();
    });

    it('changes the maximized flag and the stored width in one update', () => {
      render(<MainWithChild />);
      fireEvent.click(screen.getByText('Open child'));
      const restoredWidth = storedFlyout('main')!.width;
      const maximizedWidth = CONTAINER_WIDTH - storedFlyout('child')!.width!;

      const updates: Array<{ maximized?: boolean; width?: number }> = [];
      const unsubscribe = getFlyoutManagerStore().subscribe(() => {
        const { maximized, width } = storedFlyout('main')!;
        updates.push({ maximized, width });
      });
      fireEvent.click(maximizeButton());
      fireEvent.click(maximizeButton());
      unsubscribe();

      expect(updates).toContainEqual({
        maximized: true,
        width: maximizedWidth,
      });
      expect(updates).not.toContainEqual({
        maximized: true,
        width: restoredWidth,
      });
      expect(updates).not.toContainEqual({
        maximized: false,
        width: maximizedWidth,
      });
    });

    it("hides the child's resize handle while the main is maximized", () => {
      render(<MainWithChild childResizable />);
      fireEvent.click(screen.getByText('Open child'));
      const childHandle = () =>
        screen.getByLabelText('Child').querySelector('.euiResizableButton');
      expect(childHandle()).not.toBeNull();

      fireEvent.click(maximizeButton());
      expect(childHandle()).toBeNull();

      fireEvent.click(maximizeButton());
      expect(childHandle()).not.toBeNull();
    });

    it('clears the store flag when the button is turned off while maximized', () => {
      const { rerender } = render(<MainWithChild childResizable />);
      fireEvent.click(screen.getByText('Open child'));
      const restoredWidth = storedFlyout('main')!.width;
      fireEvent.click(maximizeButton());

      rerender(<MainWithChild childResizable showMaximizeButton={false} />);

      expect(storedFlyout('main')).toMatchObject({
        maximized: false,
        width: restoredWidth,
      });
      expect(
        screen.getByLabelText('Child').querySelector('.euiResizableButton')
      ).not.toBeNull();
    });

    it('keeps the session and both registrations while toggling', () => {
      render(<MainWithChild />);
      fireEvent.click(screen.getByText('Open child'));
      const session = getFlyoutManagerStore().getState().sessions[0];

      fireEvent.click(maximizeButton());
      fireEvent.click(maximizeButton());

      const state = getFlyoutManagerStore().getState();
      expect(state.sessions).toHaveLength(1);
      expect(state.sessions[0].mainFlyoutId).toBe(session.mainFlyoutId);
      expect(state.sessions[0].childFlyoutId).toBe('child');
      expect(screen.getByLabelText('Main')).toBeInTheDocument();
      expect(screen.getByLabelText('Child')).toBeInTheDocument();
    });
  });

  describe('push flyout', () => {
    it('drops the push padding while maximized and keeps push behavior', () => {
      const onClose = jest.fn();
      const flyout = (testSubj: string) => (
        <EuiFlyout
          aria-label="Push"
          data-test-subj={testSubj}
          type="push"
          pushMinBreakpoint="xs"
          onClose={onClose}
          flyoutMenuProps={{ showMaximizeButton: true }}
        />
      );
      const { rerender } = render(flyout('initial'));
      expect(document.body.style.paddingInlineEnd).toBe(`${FLYOUT_WIDTH}px`);

      fireEvent.click(maximizeButton());
      // The observer measures the maximized paint
      mockMeasuredWidth = 1024;
      rerender(flyout('maximized'));

      expect(document.body.style.paddingInlineEnd).toBe('');
      fireEvent.keyDown(window, { key: 'Escape' });
      expect(onClose).not.toHaveBeenCalled();

      // The first restored render still carries the maximized measurement
      fireEvent.click(maximizeButton());
      expect(document.body.style.paddingInlineEnd).toBe(`${FLYOUT_WIDTH}px`);

      mockMeasuredWidth = 320;
      rerender(flyout('restored'));
      expect(document.body.style.paddingInlineEnd).toBe('320px');
    });

    it('draws the border beside the child while a push main is maximized', () => {
      render(
        <EuiFlyoutManager>
          <EuiFlyout
            id="main"
            aria-label="Main"
            session="start"
            size="s"
            type="push"
            pushMinBreakpoint="xs"
            container={containerEl}
            onClose={() => {}}
            flyoutMenuProps={{ showMaximizeButton: true }}
          >
            <EuiFlyout
              id="child"
              aria-label="Child"
              session="inherit"
              size="s"
              container={containerEl}
              onClose={() => {}}
            />
          </EuiFlyout>
        </EuiFlyoutManager>
      );
      const main = screen.getByLabelText('Main');

      fireEvent.click(maximizeButton());

      // The overlay chrome's shadow gives way to the border beside the child
      expect(main).toHaveStyleRule('box-shadow', 'none');
      expect(main).toHaveStyleRule('border-inline-start', expect.anything());
    });
  });
});

describe('getMaximizedFlyoutStyles', () => {
  it('leaves room for the sibling without a container', () => {
    expect(
      getMaximizedFlyoutStyles({
        isMaximized: true,
        containerWidth: undefined,
        siblingFlyoutWidth: 300,
      })
    ).toMatchObject({ inlineSize: 'calc(100% - 300px)' });
  });
});
