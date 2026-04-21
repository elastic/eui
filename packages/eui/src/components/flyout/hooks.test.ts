/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { renderHook } from '../../test/rtl/render_hook';
import { useIsPushed } from './hooks';

// Mock the viewport-based breakpoint hook so tests can control it
// independently of the jsdom window size.
jest.mock('../../services', () => {
  const actual = jest.requireActual('../../services');
  return {
    ...actual,
    useIsWithinMinBreakpoint: jest.fn(() => false),
  };
});

const mockUseIsWithinMinBreakpoint = jest.requireMock('../../services')
  .useIsWithinMinBreakpoint as jest.Mock;

describe('useIsPushed', () => {
  beforeEach(() => {
    mockUseIsWithinMinBreakpoint.mockReset().mockReturnValue(false);
  });

  describe('viewport fallback (no containerWidth)', () => {
    it('returns true when type is push and viewport is large enough', () => {
      mockUseIsWithinMinBreakpoint.mockReturnValue(true);
      const { result } = renderHook(() =>
        useIsPushed({ type: 'push', pushMinBreakpoint: 'm' })
      );
      expect(result.current).toBe(true);
    });

    it('returns false when viewport is too small', () => {
      mockUseIsWithinMinBreakpoint.mockReturnValue(false);
      const { result } = renderHook(() =>
        useIsPushed({ type: 'push', pushMinBreakpoint: 'm' })
      );
      expect(result.current).toBe(false);
    });
  });

  describe('container width', () => {
    it('returns true when container width exceeds breakpoint', () => {
      // Viewport mock returns false — should be ignored
      mockUseIsWithinMinBreakpoint.mockReturnValue(false);
      const { result } = renderHook(() =>
        useIsPushed({
          type: 'push',
          pushMinBreakpoint: 'm',
          containerWidth: 800, // > 768
        })
      );
      expect(result.current).toBe(true);
    });

    it('returns false when container width is below breakpoint', () => {
      // Viewport mock returns true — should be ignored
      mockUseIsWithinMinBreakpoint.mockReturnValue(true);
      const { result } = renderHook(() =>
        useIsPushed({
          type: 'push',
          pushMinBreakpoint: 'm',
          containerWidth: 700, // < 768
        })
      );
      expect(result.current).toBe(false);
    });

    it('returns true when container width equals breakpoint exactly', () => {
      const { result } = renderHook(() =>
        useIsPushed({
          type: 'push',
          pushMinBreakpoint: 'm',
          containerWidth: 768, // === 768
        })
      );
      expect(result.current).toBe(true);
    });

    it('falls back to the viewport hook when the breakpoint key is not on the theme', () => {
      mockUseIsWithinMinBreakpoint.mockReturnValue(true);
      const { result } = renderHook(() =>
        useIsPushed({
          type: 'push',
          pushMinBreakpoint: 'xxl', // not a default theme key
          containerWidth: 2000,
        })
      );
      expect(result.current).toBe(true);
      expect(mockUseIsWithinMinBreakpoint).toHaveBeenCalledWith('xxl');
    });
  });

  describe('non-push type', () => {
    it('returns false for overlay type regardless of containerWidth', () => {
      const { result } = renderHook(() =>
        useIsPushed({
          type: 'overlay',
          pushMinBreakpoint: 'm',
          containerWidth: 1200,
        })
      );
      expect(result.current).toBe(false);
    });

    it('returns false for overlay type regardless of viewport', () => {
      mockUseIsWithinMinBreakpoint.mockReturnValue(true);
      const { result } = renderHook(() =>
        useIsPushed({ type: 'overlay', pushMinBreakpoint: 'm' })
      );
      expect(result.current).toBe(false);
    });
  });
});
