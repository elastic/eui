/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { renderHook } from '../../../test/rtl';
import { render, act } from '@testing-library/react';
import { useEuiTheme } from '../../../services';
import { setLayoutMode } from './actions';
import {
  useCurrentChildFlyout,
  useCurrentMainFlyout,
  useCurrentSession,
  useFlyoutWidth,
} from './selectors';
import { useFlyoutManager } from './hooks';
import { LAYOUT_MODE_SIDE_BY_SIDE, LAYOUT_MODE_STACKED } from './const';
import {
  useApplyFlyoutLayoutMode,
  getWidthFromSize,
  useFlyoutLayoutMode,
} from './layout_mode';

// Mock dependencies
jest.mock('../../../services', () => ({
  useEuiTheme: jest.fn(),
}));

jest.mock('./actions', () => ({
  setLayoutMode: jest.fn(),
}));

jest.mock('./selectors', () => ({
  useCurrentChildFlyout: jest.fn(),
  useCurrentMainFlyout: jest.fn(),
  useCurrentSession: jest.fn(),
  useFlyoutWidth: jest.fn(),
}));

jest.mock('./hooks', () => ({
  useFlyoutManager: jest.fn(),
}));

jest.mock('./provider', () => ({
  EuiFlyoutManager: ({ children }: { children: React.ReactNode }) => children,
}));

// Mock window methods
const mockWindow = {
  innerWidth: 1200,
  addEventListener: jest.fn(),
  removeEventListener: jest.fn(),
  requestAnimationFrame: jest.fn(() => {
    return rafId++;
  }),
  cancelAnimationFrame: jest.fn(),
};

let rafId = 1;

Object.defineProperty(window, 'innerWidth', {
  writable: true,
  value: mockWindow.innerWidth,
});

Object.defineProperty(window, 'addEventListener', {
  writable: true,
  value: mockWindow.addEventListener,
});

Object.defineProperty(window, 'removeEventListener', {
  writable: true,
  value: mockWindow.removeEventListener,
});

Object.defineProperty(window, 'requestAnimationFrame', {
  writable: true,
  value: mockWindow.requestAnimationFrame,
});

Object.defineProperty(window, 'cancelAnimationFrame', {
  writable: true,
  value: mockWindow.cancelAnimationFrame,
});

const mockUseEuiTheme = useEuiTheme as jest.Mock;
const mockSetLayoutMode = setLayoutMode as jest.Mock;
const mockUseCurrentChildFlyout = useCurrentChildFlyout as jest.Mock;
const mockUseCurrentMainFlyout = useCurrentMainFlyout as jest.Mock;
const mockUseCurrentSession = useCurrentSession as jest.Mock;
const mockUseFlyoutWidth = useFlyoutWidth as jest.Mock;
const mockUseFlyoutManager = useFlyoutManager as jest.Mock;

describe('layout_mode', () => {
  const getResizeHandler = () => {
    const call = mockWindow.addEventListener.mock.calls.find(
      (args) => args[0] === 'resize'
    );
    return call ? call[1] : undefined;
  };
  beforeEach(() => {
    jest.clearAllMocks();
    rafId = 1;

    // Default mocks
    mockUseEuiTheme.mockReturnValue({
      euiTheme: {
        breakpoint: { s: 768 },
      },
    });

    mockSetLayoutMode.mockReturnValue({
      type: 'ACTION_SET_LAYOUT_MODE',
      layoutMode: LAYOUT_MODE_SIDE_BY_SIDE,
    });

    mockUseCurrentSession.mockReturnValue({
      mainFlyoutId: 'main-1',
      childFlyoutId: 'child-1',
    });

    mockUseCurrentMainFlyout.mockReturnValue({
      flyoutId: 'main-1',
      level: 'main',
      size: 'm',
    });

    mockUseCurrentChildFlyout.mockReturnValue({
      flyoutId: 'child-1',
      level: 'child',
      size: 's',
    });

    mockUseFlyoutWidth
      .mockReturnValueOnce(600) // parent width
      .mockReturnValueOnce(300); // child width

    mockUseFlyoutManager.mockReturnValue({
      state: {
        layoutMode: LAYOUT_MODE_SIDE_BY_SIDE,
      },
      dispatch: jest.fn(),
    });
  });

  describe('useFlyoutLayoutMode', () => {
    it('returns layout mode from context when available', () => {
      mockUseFlyoutManager.mockReturnValue({
        state: {
          layoutMode: LAYOUT_MODE_STACKED,
        },
      });

      const { result } = renderHook(() => useFlyoutLayoutMode());
      expect(result.current).toBe(LAYOUT_MODE_STACKED);
    });

    it('returns default LAYOUT_MODE_SIDE_BY_SIDE when context is null', () => {
      mockUseFlyoutManager.mockReturnValue(null);

      const { result } = renderHook(() => useFlyoutLayoutMode());
      expect(result.current).toBe(LAYOUT_MODE_SIDE_BY_SIDE);
    });

    it('returns default LAYOUT_MODE_SIDE_BY_SIDE when state is undefined', () => {
      mockUseFlyoutManager.mockReturnValue({
        state: undefined,
      });

      const { result } = renderHook(() => useFlyoutLayoutMode());
      expect(result.current).toBe(LAYOUT_MODE_SIDE_BY_SIDE);
    });
  });

  describe('getWidthFromSize', () => {
    beforeEach(() => {
      // Reset window.innerWidth for each test
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1200,
      });
    });

    it('returns number values as-is', () => {
      expect(getWidthFromSize(500)).toBe(500);
      expect(getWidthFromSize(0)).toBe(0);
      expect(getWidthFromSize(1000)).toBe(1000);
    });

    it('parses numeric strings', () => {
      expect(getWidthFromSize('500')).toBe(500);
      expect(getWidthFromSize('0')).toBe(0);
      expect(getWidthFromSize('1000')).toBe(1000);
    });

    it('calculates size s as 25% of viewport width', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1200,
      });
      expect(getWidthFromSize('s')).toBe(300); // 1200 * 0.25
    });

    it('calculates size m as 50% of viewport width', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1200,
      });
      expect(getWidthFromSize('m')).toBe(600); // 1200 * 0.5
    });

    it('calculates size l as 75% of viewport width', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1200,
      });
      expect(getWidthFromSize('l')).toBe(900); // 1200 * 0.75
    });

    it('handles different viewport widths', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 800,
      });
      expect(getWidthFromSize('s')).toBe(200); // 800 * 0.25
      expect(getWidthFromSize('m')).toBe(400); // 800 * 0.5
      expect(getWidthFromSize('l')).toBe(600); // 800 * 0.75
    });

    it('returns 0 for unknown size strings', () => {
      expect(getWidthFromSize('unknown')).toBe(0);
      expect(getWidthFromSize('xl')).toBe(0);
      expect(getWidthFromSize('')).toBe(0);
    });

    it('returns 0 for non-numeric strings', () => {
      expect(getWidthFromSize('abc')).toBe(0);
      expect(getWidthFromSize('')).toBe(0);
    });

    it('parses partial numeric strings', () => {
      expect(getWidthFromSize('12abc')).toBe(12);
      expect(getWidthFromSize('500px')).toBe(500);
    });

    it('calculates size fill as 90% of viewport width', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1200,
      });
      expect(getWidthFromSize('fill')).toBe(1080); // 1200 * 0.9
    });

    it('handles edge cases', () => {
      expect(getWidthFromSize(null as any)).toBe(0);
      expect(getWidthFromSize(undefined as any)).toBe(0);
      expect(getWidthFromSize('')).toBe(0);
    });
  });

  describe('useApplyFlyoutLayoutMode', () => {
    let TestComponent: React.FC;

    beforeEach(() => {
      TestComponent = () => {
        useApplyFlyoutLayoutMode();
        return <div>Test</div>;
      };
    });

    it('sets up window resize listener on mount', () => {
      render(<TestComponent />);

      expect(mockWindow.addEventListener).toHaveBeenCalledWith(
        'resize',
        expect.any(Function)
      );
    });

    it('removes window resize listener on unmount', () => {
      const { unmount } = render(<TestComponent />);
      unmount();

      expect(mockWindow.removeEventListener).toHaveBeenCalledWith(
        'resize',
        expect.any(Function)
      );
    });

    it('cancels animation frame on unmount if one is active', () => {
      const { unmount } = render(<TestComponent />);

      // Simulate a resize event to create an active animation frame
      const resizeHandler = getResizeHandler()!;
      act(() => {
        resizeHandler();
      });

      unmount();

      // Should cancel the animation frame that was created
      expect(mockWindow.cancelAnimationFrame).toHaveBeenCalledWith(1);
    });

    it('sets layout mode to STACKED when window is too small', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 500, // Below 768 * 1.4 = 1075.2
      });

      const mockDispatch = jest.fn();
      mockUseFlyoutManager.mockReturnValue({
        state: {
          layoutMode: LAYOUT_MODE_SIDE_BY_SIDE,
        },
        dispatch: mockDispatch,
      });

      render(<TestComponent />);

      expect(mockDispatch).toHaveBeenCalledWith(
        mockSetLayoutMode(LAYOUT_MODE_STACKED)
      );
    });

    it('does not change layout mode when window is small but already STACKED', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 500,
      });

      const mockDispatch = jest.fn();
      mockUseFlyoutManager.mockReturnValue({
        state: {
          layoutMode: LAYOUT_MODE_STACKED,
        },
        dispatch: mockDispatch,
      });

      render(<TestComponent />);

      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('switches to SIDE_BY_SIDE when no child flyout exists and currently in STACKED mode', () => {
      // Set window width to be large enough to not trigger the small window check
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1200,
      });

      mockUseCurrentSession.mockReturnValue({
        mainFlyoutId: 'main-1',
        childFlyoutId: null,
      });

      // Reset the mock to return undefined for widths since no child exists
      mockUseFlyoutWidth.mockReset();
      mockUseFlyoutWidth.mockReturnValue(undefined); // This will be used for both parent and child calls

      const mockDispatch = jest.fn();
      const mockContext = {
        state: {
          layoutMode: LAYOUT_MODE_STACKED, // Currently in STACKED mode
        },
        dispatch: mockDispatch,
      };

      mockUseFlyoutManager.mockReturnValue(mockContext);

      render(<TestComponent />);

      // The hook should switch to SIDE_BY_SIDE when no child exists and currently in STACKED mode
      expect(mockDispatch).toHaveBeenCalledWith(
        mockSetLayoutMode(LAYOUT_MODE_SIDE_BY_SIDE)
      );
    });

    it('switches to SIDE_BY_SIDE when flyout widths are not available and currently in STACKED mode', () => {
      // Set window width to be large enough to not trigger the small window check
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1200,
      });

      // Ensure both width calls return undefined
      mockUseFlyoutWidth.mockReset();
      mockUseFlyoutWidth.mockReturnValue(undefined);

      const mockDispatch = jest.fn();
      const mockContext = {
        state: {
          layoutMode: LAYOUT_MODE_STACKED, // Currently in STACKED mode
        },
        dispatch: mockDispatch,
      };

      mockUseFlyoutManager.mockReturnValue(mockContext);

      render(<TestComponent />);

      // The hook should switch to SIDE_BY_SIDE when widths are not available and currently in STACKED mode
      expect(mockDispatch).toHaveBeenCalledWith(
        mockSetLayoutMode(LAYOUT_MODE_SIDE_BY_SIDE)
      );
    });

    it('switches to SIDE_BY_SIDE when combined width is below threshold and currently in STACKED mode', () => {
      // Set window width to be large enough to not trigger the small window check
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1200,
      });

      // Combined width: 600 + 300 = 900px
      // Percentage: (900 / 1200) * 100 = 75%
      // Since 75% <= 85% threshold, should switch to SIDE_BY_SIDE

      // Reset the mock to return the expected widths
      mockUseFlyoutWidth.mockReset();
      mockUseFlyoutWidth
        .mockReturnValueOnce(600) // parent width
        .mockReturnValueOnce(300); // child width

      const mockDispatch = jest.fn();
      const mockContext = {
        state: {
          layoutMode: LAYOUT_MODE_STACKED, // Currently in STACKED mode
        },
        dispatch: mockDispatch,
      };

      mockUseFlyoutManager.mockReturnValue(mockContext);

      render(<TestComponent />);

      // The hook should switch to SIDE_BY_SIDE when combined width is below threshold
      // and currently in STACKED mode
      expect(mockDispatch).toHaveBeenCalledWith(
        mockSetLayoutMode(LAYOUT_MODE_SIDE_BY_SIDE)
      );
    });

    it('switches to STACKED when combined width exceeds 95% threshold', () => {
      // Set window width to be large enough to not trigger the small window check
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1200,
      });

      // Set up session with both main and child flyouts
      mockUseCurrentSession.mockReturnValue({
        mainFlyoutId: 'main-1',
        childFlyoutId: 'child-1',
      });

      // Set up flyout objects
      mockUseCurrentMainFlyout.mockReturnValue({
        flyoutId: 'main-1',
        level: 'main',
        size: 'm',
      });

      mockUseCurrentChildFlyout.mockReturnValue({
        flyoutId: 'child-1',
        level: 'child',
        size: 's',
      });

      // Set a very wide combined width
      mockUseFlyoutWidth.mockReset();
      mockUseFlyoutWidth
        .mockReturnValueOnce(800) // parent width
        .mockReturnValueOnce(400); // child width

      // Combined width: 800 + 400 = 1200px
      // Percentage: (1200 / 1200) * 100 = 100%
      // Since 100% >= 95% threshold, should switch to STACKED

      const mockDispatch = jest.fn();
      mockUseFlyoutManager.mockReturnValue({
        state: {
          layoutMode: LAYOUT_MODE_SIDE_BY_SIDE,
        },
        dispatch: mockDispatch,
      });

      render(<TestComponent />);

      expect(mockDispatch).toHaveBeenCalledWith(
        mockSetLayoutMode(LAYOUT_MODE_STACKED)
      );
    });

    it('switches to SIDE_BY_SIDE when using size-based width calculation and currently in STACKED mode', () => {
      // Set window width to be large enough to not trigger the small window check
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1200,
      });

      // Ensure both width calls return undefined so the hook falls back to size-based calculation
      mockUseFlyoutWidth.mockReset();
      mockUseFlyoutWidth.mockReturnValue(undefined);

      const mockDispatch = jest.fn();
      const mockContext = {
        state: {
          layoutMode: LAYOUT_MODE_STACKED, // Currently in STACKED mode
        },
        dispatch: mockDispatch,
      };

      mockUseFlyoutManager.mockReturnValue(mockContext);

      render(<TestComponent />);

      // Should calculate based on sizes: m (50%) + s (25%) = 75% of viewport
      // 75% <= 85% threshold, so should switch to SIDE_BY_SIDE
      // when currently in STACKED mode
      expect(mockDispatch).toHaveBeenCalledWith(
        mockSetLayoutMode(LAYOUT_MODE_SIDE_BY_SIDE)
      );
    });

    it('does not dispatch when layout mode is already correct', () => {
      // Set window width to be large enough to not trigger the small window check
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1200,
      });

      // Set up a scenario where the layout mode should remain the same
      mockUseCurrentSession.mockReturnValue({
        mainFlyoutId: 'main-1',
        childFlyoutId: null, // No child flyout
      });

      const mockDispatch = jest.fn();
      mockUseFlyoutManager.mockReturnValue({
        state: {
          layoutMode: LAYOUT_MODE_SIDE_BY_SIDE,
        },
        dispatch: mockDispatch,
      });

      render(<TestComponent />);

      // Already in SIDE_BY_SIDE and no child exists - no action should dispatch
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('handles null context gracefully', () => {
      mockUseFlyoutManager.mockReturnValue(null);

      expect(() => {
        render(<TestComponent />);
      }).not.toThrow();
    });

    it('handles missing dispatch gracefully', () => {
      mockUseFlyoutManager.mockReturnValue({
        state: {
          layoutMode: LAYOUT_MODE_SIDE_BY_SIDE,
        },
        dispatch: undefined,
      });

      expect(() => {
        render(<TestComponent />);
      }).not.toThrow();
    });

    it('debounces resize events using requestAnimationFrame', () => {
      render(<TestComponent />);

      // Simulate first resize event
      const resizeHandler = getResizeHandler()!;
      act(() => {
        resizeHandler();
      });

      // Should call requestAnimationFrame and get ID 1
      expect(mockWindow.requestAnimationFrame).toHaveBeenCalled();

      // Simulate second resize event before the first one executes
      act(() => {
        resizeHandler();
      });

      // Should cancel the previous animation frame (ID 1) and create a new one (ID 2)
      expect(mockWindow.cancelAnimationFrame).toHaveBeenCalledWith(1);
      expect(mockWindow.requestAnimationFrame).toHaveBeenCalledTimes(2);
    });

    it('updates window width state on resize', () => {
      render(<TestComponent />);

      // Simulate resize event
      const resizeHandler = getResizeHandler()!;

      // Change window width
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 800,
      });

      act(() => {
        resizeHandler();
      });

      // The hook should re-evaluate with new window width
      expect(mockWindow.requestAnimationFrame).toHaveBeenCalled();
    });

    describe('resize listener optimization', () => {
      beforeEach(() => {
        jest.clearAllMocks();
      });

      it('should attach resize listener when there is a parent flyout', () => {
        // Set up session with only parent flyout (no child)
        mockUseCurrentSession.mockReturnValue({
          mainFlyoutId: 'main-1',
          childFlyoutId: null,
        });

        mockUseCurrentChildFlyout.mockReturnValue(null);

        const mockDispatch = jest.fn();
        mockUseFlyoutManager.mockReturnValue({
          state: {
            layoutMode: LAYOUT_MODE_SIDE_BY_SIDE,
          },
          dispatch: mockDispatch,
        });

        render(<TestComponent />);

        // Resize listener SHOULD be attached when parent flyout exists
        // to keep window dimensions fresh for when child opens
        expect(mockWindow.addEventListener).toHaveBeenCalledWith(
          'resize',
          expect.any(Function)
        );
      });

      it('should attach resize listener when there is a child flyout', () => {
        // Set up session with both parent and child flyouts
        mockUseCurrentSession.mockReturnValue({
          mainFlyoutId: 'main-1',
          childFlyoutId: 'child-1',
        });

        mockUseCurrentChildFlyout.mockReturnValue({
          flyoutId: 'child-1',
          level: 'child',
          size: 's',
        });

        const mockDispatch = jest.fn();
        mockUseFlyoutManager.mockReturnValue({
          state: {
            layoutMode: LAYOUT_MODE_SIDE_BY_SIDE,
          },
          dispatch: mockDispatch,
        });

        render(<TestComponent />);

        // Resize listener SHOULD be attached when there's a child flyout
        expect(mockWindow.addEventListener).toHaveBeenCalledWith(
          'resize',
          expect.any(Function)
        );
      });

      it('should add and remove resize listener when parent flyout opens and closes', () => {
        // Start with no flyouts at all
        mockUseCurrentSession.mockReturnValue({
          mainFlyoutId: null,
          childFlyoutId: null,
        });

        mockUseCurrentMainFlyout.mockReturnValue(null);
        mockUseCurrentChildFlyout.mockReturnValue(null);

        const mockDispatch = jest.fn();
        mockUseFlyoutManager.mockReturnValue({
          state: {
            layoutMode: LAYOUT_MODE_SIDE_BY_SIDE,
          },
          dispatch: mockDispatch,
        });

        const { rerender } = render(<TestComponent />);

        // Should have resize listener before flyout appears so that the initial layout mode is correct
        expect(mockWindow.addEventListener).toHaveBeenCalledWith(
          'resize',
          expect.any(Function)
        );

        // Now open a parent flyout
        mockUseCurrentSession.mockReturnValue({
          mainFlyoutId: 'main-1',
          childFlyoutId: null,
        });

        mockUseCurrentMainFlyout.mockReturnValue({
          flyoutId: 'main-1',
          level: 'main',
          size: 'm',
        });

        rerender(<TestComponent />);

        // Should now have attached the listener
        expect(mockWindow.addEventListener).toHaveBeenCalledWith(
          'resize',
          expect.any(Function)
        );

        // Now close the parent flyout
        mockUseCurrentSession.mockReturnValue({
          mainFlyoutId: null,
          childFlyoutId: null,
        });

        mockUseCurrentMainFlyout.mockReturnValue(null);

        rerender(<TestComponent />);

        // Should not remove the resize listener
        expect(mockWindow.removeEventListener).not.toHaveBeenCalledWith(
          'resize',
          expect.any(Function)
        );
      });

      it('should NOT attach resize listener when there is no parent flyout', () => {
        // Set up session with no flyouts at all
        mockUseCurrentSession.mockReturnValue({
          mainFlyoutId: null,
          childFlyoutId: null,
        });

        mockUseCurrentMainFlyout.mockReturnValue(null);
        mockUseCurrentChildFlyout.mockReturnValue(null);

        const mockDispatch = jest.fn();
        mockUseFlyoutManager.mockReturnValue({
          state: {
            layoutMode: LAYOUT_MODE_SIDE_BY_SIDE,
          },
          dispatch: mockDispatch,
        });

        render(<TestComponent />);

        // Should have resize listener before flyout appears so that the initial layout mode is correct
        expect(mockWindow.addEventListener).toHaveBeenCalledWith(
          'resize',
          expect.any(Function)
        );
      });
    });
  });

  describe('useApplyFlyoutLayoutMode with fill size', () => {
    let TestComponent: React.FC;

    beforeEach(() => {
      TestComponent = () => {
        useApplyFlyoutLayoutMode();
        return <div>Test</div>;
      };
    });

    it('should maintain side-by-side layout when parent is fill', () => {
      // Set window width to be large enough (above breakpoint.s * 1.4)
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1200, // Above 768 * 1.4 = 1075.2
      });

      // Mock flyout data with parent as fill
      mockUseCurrentMainFlyout.mockReturnValue({
        flyoutId: 'main-1',
        level: 'main',
        size: 'fill',
      });

      mockUseCurrentChildFlyout.mockReturnValue({
        flyoutId: 'child-1',
        level: 'child',
        size: 's',
      });

      mockUseCurrentSession.mockReturnValue({
        mainFlyoutId: 'main-1',
        childFlyoutId: 'child-1',
      });

      const mockDispatch = jest.fn();
      mockUseFlyoutManager.mockReturnValue({
        state: {
          layoutMode: LAYOUT_MODE_STACKED, // Currently in STACKED mode
        },
        dispatch: mockDispatch,
      });

      render(<TestComponent />);

      // Should maintain side-by-side layout for fill flyouts
      expect(mockDispatch).toHaveBeenCalledWith(
        mockSetLayoutMode(LAYOUT_MODE_SIDE_BY_SIDE)
      );
    });

    it('should maintain side-by-side layout when child is fill', () => {
      // Set window width to be large enough
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1200,
      });

      // Mock flyout data with child as fill
      mockUseCurrentMainFlyout.mockReturnValue({
        flyoutId: 'main-1',
        level: 'main',
        size: 's',
      });

      mockUseCurrentChildFlyout.mockReturnValue({
        flyoutId: 'child-1',
        level: 'child',
        size: 'fill',
      });

      mockUseCurrentSession.mockReturnValue({
        mainFlyoutId: 'main-1',
        childFlyoutId: 'child-1',
      });

      const mockDispatch = jest.fn();
      mockUseFlyoutManager.mockReturnValue({
        state: {
          layoutMode: LAYOUT_MODE_STACKED, // Currently in STACKED mode
        },
        dispatch: mockDispatch,
      });

      render(<TestComponent />);

      // Should maintain side-by-side layout for fill flyouts
      expect(mockDispatch).toHaveBeenCalledWith(
        mockSetLayoutMode(LAYOUT_MODE_SIDE_BY_SIDE)
      );
    });

    it('should maintain side-by-side layout when both parent and child are fill', () => {
      // Set window width to be large enough
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1200,
      });

      // Mock flyout data with both as fill
      mockUseCurrentMainFlyout.mockReturnValue({
        flyoutId: 'main-1',
        level: 'main',
        size: 'fill',
      });

      mockUseCurrentChildFlyout.mockReturnValue({
        flyoutId: 'child-1',
        level: 'child',
        size: 'fill',
      });

      mockUseCurrentSession.mockReturnValue({
        mainFlyoutId: 'main-1',
        childFlyoutId: 'child-1',
      });

      const mockDispatch = jest.fn();
      mockUseFlyoutManager.mockReturnValue({
        state: {
          layoutMode: LAYOUT_MODE_STACKED, // Currently in STACKED mode
        },
        dispatch: mockDispatch,
      });

      render(<TestComponent />);

      // Should maintain side-by-side layout for fill flyouts
      expect(mockDispatch).toHaveBeenCalledWith(
        mockSetLayoutMode(LAYOUT_MODE_SIDE_BY_SIDE)
      );
    });

    it('should stack when viewport is too small for fill flyouts', () => {
      // Set window width to be too small (below breakpoint.s * 1.4)
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 800, // Below 768 * 1.4 = 1075.2
      });

      // Mock flyout data with parent as fill
      mockUseCurrentMainFlyout.mockReturnValue({
        flyoutId: 'main-1',
        level: 'main',
        size: 'fill',
      });

      mockUseCurrentChildFlyout.mockReturnValue({
        flyoutId: 'child-1',
        level: 'child',
        size: 's',
      });

      mockUseCurrentSession.mockReturnValue({
        mainFlyoutId: 'main-1',
        childFlyoutId: 'child-1',
      });

      const mockDispatch = jest.fn();
      mockUseFlyoutManager.mockReturnValue({
        state: {
          layoutMode: LAYOUT_MODE_SIDE_BY_SIDE, // Currently in SIDE_BY_SIDE mode
        },
        dispatch: mockDispatch,
      });

      render(<TestComponent />);

      // Should stack when viewport is too small
      expect(mockDispatch).toHaveBeenCalledWith(
        mockSetLayoutMode(LAYOUT_MODE_STACKED)
      );
    });

    it('should not dispatch when fill flyout is already in correct layout mode', () => {
      // Set window width to be large enough
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1200,
      });

      // Mock flyout data with parent as fill
      mockUseCurrentMainFlyout.mockReturnValue({
        flyoutId: 'main-1',
        level: 'main',
        size: 'fill',
      });

      mockUseCurrentChildFlyout.mockReturnValue({
        flyoutId: 'child-1',
        level: 'child',
        size: 's',
      });

      mockUseCurrentSession.mockReturnValue({
        mainFlyoutId: 'main-1',
        childFlyoutId: 'child-1',
      });

      const mockDispatch = jest.fn();
      mockUseFlyoutManager.mockReturnValue({
        state: {
          layoutMode: LAYOUT_MODE_SIDE_BY_SIDE, // Already in correct mode
        },
        dispatch: mockDispatch,
      });

      render(<TestComponent />);

      // Should not dispatch when already in correct layout mode
      expect(mockDispatch).not.toHaveBeenCalled();
    });

    it('should handle fill flyout with no child', () => {
      // Set window width to be large enough
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1200,
      });

      // Mock flyout data with parent as fill and no child
      mockUseCurrentMainFlyout.mockReturnValue({
        flyoutId: 'main-1',
        level: 'main',
        size: 'fill',
      });

      mockUseCurrentChildFlyout.mockReturnValue(null);

      mockUseCurrentSession.mockReturnValue({
        mainFlyoutId: 'main-1',
        childFlyoutId: null,
      });

      const mockDispatch = jest.fn();
      mockUseFlyoutManager.mockReturnValue({
        state: {
          layoutMode: LAYOUT_MODE_STACKED, // Currently in STACKED mode
        },
        dispatch: mockDispatch,
      });

      render(<TestComponent />);

      // Should maintain side-by-side layout for fill flyouts even without child
      expect(mockDispatch).toHaveBeenCalledWith(
        mockSetLayoutMode(LAYOUT_MODE_SIDE_BY_SIDE)
      );
    });

    it('should handle fill flyout with no session', () => {
      // Set window width to be large enough
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        value: 1200,
      });

      // Mock no session
      mockUseCurrentSession.mockReturnValue(null);
      mockUseCurrentMainFlyout.mockReturnValue(null);
      mockUseCurrentChildFlyout.mockReturnValue(null);

      const mockDispatch = jest.fn();
      mockUseFlyoutManager.mockReturnValue({
        state: {
          layoutMode: LAYOUT_MODE_SIDE_BY_SIDE,
        },
        dispatch: mockDispatch,
      });

      render(<TestComponent />);

      // Should not dispatch when no session exists
      expect(mockDispatch).not.toHaveBeenCalled();
    });
  });
});
