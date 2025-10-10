/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { renderHook } from '../../../test/rtl';
import { act } from '@testing-library/react';
import { useFlyoutManagerReducer, useFlyoutId } from './hooks';
import { LEVEL_MAIN, LEVEL_CHILD } from './const';

// Mock the warnOnce service but keep other actual exports (e.g., useGeneratedHtmlId)
jest.mock('../../../services', () => {
  const actual = jest.requireActual('../../../services');
  return {
    ...actual,
    warnOnce: jest.fn(),
  };
});

// Mock the useFlyout selector
jest.mock('./selectors', () => ({
  useFlyout: jest.fn(),
  useIsFlyoutRegistered: jest.fn(),
}));

describe('flyout manager hooks', () => {
  const {
    useFlyout: mockUseFlyout,
    useIsFlyoutRegistered: mockUseIsFlyoutRegistered,
  } = jest.requireMock('./selectors');

  beforeEach(() => {
    mockUseFlyout.mockClear();
    mockUseIsFlyoutRegistered.mockClear();
  });

  describe('useFlyoutManagerReducer', () => {
    it('should return initial state and bound action creators', () => {
      const { result } = renderHook(() => useFlyoutManagerReducer());

      expect(result.current.state).toEqual({
        sessions: [],
        flyouts: [],
        layoutMode: 'side-by-side',
      });
      expect(typeof result.current.dispatch).toBe('function');
      expect(typeof result.current.addFlyout).toBe('function');
      expect(typeof result.current.closeFlyout).toBe('function');
      expect(typeof result.current.setActiveFlyout).toBe('function');
      expect(typeof result.current.setFlyoutWidth).toBe('function');
    });

    it('should accept custom initial state', () => {
      const customInitialState = {
        sessions: [],
        flyouts: [],
        layoutMode: 'stacked' as const,
      };

      const { result } = renderHook(() =>
        useFlyoutManagerReducer(customInitialState)
      );

      expect(result.current.state.layoutMode).toBe('stacked');
    });

    it('should dispatch actions correctly', () => {
      const { result } = renderHook(() => useFlyoutManagerReducer());

      act(() => {
        result.current.addFlyout('main-1', 'main', LEVEL_MAIN, 'l');
      });

      expect(result.current.state.flyouts).toHaveLength(1);
      expect(result.current.state.flyouts[0]).toEqual({
        flyoutId: 'main-1',
        level: LEVEL_MAIN,
        size: 'l',
        activityStage: 'opening',
      });
      expect(result.current.state.sessions).toHaveLength(1);
    });

    it('should handle multiple actions in sequence', () => {
      const { result } = renderHook(() => useFlyoutManagerReducer());

      act(() => {
        result.current.addFlyout('main-1', 'main', LEVEL_MAIN);
        result.current.addFlyout('child-1', 'child', LEVEL_CHILD);
        result.current.setActiveFlyout('child-1');
        result.current.setFlyoutWidth('main-1', 600);
        result.current.setFlyoutWidth('child-1', 400);
      });

      expect(result.current.state.flyouts).toHaveLength(2);
      expect(result.current.state.sessions[0].childFlyoutId).toBe('child-1');
      expect(result.current.state.flyouts[0].width).toBe(600);
      expect(result.current.state.flyouts[1].width).toBe(400);
    });

    it('should maintain action creator stability across renders', () => {
      const { result, rerender } = renderHook(() => useFlyoutManagerReducer());

      const initialAddFlyout = result.current.addFlyout;
      const initialCloseFlyout = result.current.closeFlyout;

      rerender();

      expect(result.current.addFlyout).toBe(initialAddFlyout);
      expect(result.current.closeFlyout).toBe(initialCloseFlyout);
    });

    it('should handle complex state transitions', () => {
      const { result } = renderHook(() => useFlyoutManagerReducer());

      // Create a complex scenario
      act(() => {
        // Add main flyout
        result.current.addFlyout('main-1', 'main', LEVEL_MAIN, 'l');
        // Add child flyout
        result.current.addFlyout('child-1', 'child', LEVEL_CHILD, 'm');
        // Set child as active
        result.current.setActiveFlyout('child-1');
        // Update widths
        result.current.setFlyoutWidth('main-1', 600);
        result.current.setFlyoutWidth('child-1', 400);
        // Close child flyout
        result.current.closeFlyout('child-1');
        // Close main flyout
        result.current.closeFlyout('main-1');
      });

      expect(result.current.state.flyouts).toHaveLength(0);
      expect(result.current.state.sessions).toHaveLength(0);
    });
  });

  describe('useFlyoutId', () => {
    it('should return provided flyout ID when it is not registered', () => {
      mockUseIsFlyoutRegistered.mockReturnValue(false); // ID is available
      const { result } = renderHook(() => useFlyoutId('existing-id'));

      expect(mockUseIsFlyoutRegistered).toHaveBeenCalledWith('existing-id');
      expect(result.current).toBe('existing-id');
    });

    it('should generate deterministic ID when no ID is provided', () => {
      const { result } = renderHook(() => useFlyoutId());

      expect(result.current).toMatch(/^flyout-/);
      expect(typeof result.current).toBe('string');
    });

    it('should generate deterministic ID when provided ID is empty', () => {
      const { result } = renderHook(() => useFlyoutId(''));

      expect(result.current).toMatch(/^flyout-/);
    });

    it('should generate deterministic ID when provided ID is undefined', () => {
      const { result } = renderHook(() => useFlyoutId(undefined));

      expect(result.current).toMatch(/^flyout-/);
    });

    it('should maintain ID consistency across renders', () => {
      mockUseIsFlyoutRegistered.mockReturnValue(false); // ID is available
      const { result, rerender } = renderHook(() => useFlyoutId('stable-id'));

      const initialId = result.current;
      rerender();
      rerender();

      expect(result.current).toBe(initialId);
    });

    it('should handle different IDs for different components', () => {
      mockUseIsFlyoutRegistered.mockReturnValue(false); // IDs are available
      const { result: result1 } = renderHook(() => useFlyoutId('id-1'));
      const { result: result2 } = renderHook(() => useFlyoutId('id-2'));

      expect(result1.current).toBe('id-1');
      expect(result2.current).toBe('id-2');
    });

    it('should handle generated IDs for different components', () => {
      const { result: result1 } = renderHook(() => useFlyoutId());
      const { result: result2 } = renderHook(() => useFlyoutId());

      expect(result1.current).not.toBe(result2.current);
      expect(result1.current).toMatch(/^flyout-/);
      expect(result2.current).toMatch(/^flyout-/);
    });

    it('should handle ID conflicts gracefully', () => {
      // Mock that the ID is already registered (conflict)
      mockUseIsFlyoutRegistered.mockReturnValue(true);

      const { result } = renderHook(() => useFlyoutId('conflict-id'));

      expect(result.current).toMatch(/^flyout-/);
      expect(result.current).not.toBe('conflict-id');
    });

    it('should handle multiple ID conflicts', () => {
      // Mock multiple conflicts
      mockUseIsFlyoutRegistered.mockReturnValue(true);

      const { result } = renderHook(() => useFlyoutId('conflict-1'));

      expect(result.current).toMatch(/^flyout-/);
      expect(result.current).not.toBe('conflict-1');
    });

    it('should handle special characters in provided IDs', () => {
      mockUseIsFlyoutRegistered.mockReturnValue(false); // IDs are available
      const specialIds = [
        'flyout-1',
        'flyout_2',
        'flyout.3',
        'flyout-4',
        'FLYOUT-5',
        'Flyout-6',
      ];

      specialIds.forEach((id) => {
        const { result } = renderHook(() => useFlyoutId(id));
        expect(result.current).toBe(id);
      });
    });

    it('should handle very long IDs', () => {
      mockUseIsFlyoutRegistered.mockReturnValue(false); // ID is available
      const longId = 'a'.repeat(1000);
      const { result } = renderHook(() => useFlyoutId(longId));

      expect(result.current).toBe(longId);
    });

    it('should handle empty string IDs', () => {
      const { result } = renderHook(() => useFlyoutId(''));

      expect(result.current).toMatch(/^flyout-/);
    });

    it('should handle null IDs', () => {
      const { result } = renderHook(() => useFlyoutId(null as any));

      expect(result.current).toMatch(/^flyout-/);
    });

    it('should maintain ID stability when input changes', () => {
      // First call with no ID - generates one
      const { result, rerender } = renderHook(() => useFlyoutId());
      const firstId = result.current;

      // Re-render with same input (no ID)
      rerender();
      expect(result.current).toBe(firstId);

      // Re-render with different input (still no ID)
      rerender();
      expect(result.current).toBe(firstId);
    });

    it('should not change ID when provided ID changes', () => {
      const { result, rerender } = renderHook(({ id }) => useFlyoutId(id), {
        initialProps: { id: undefined as string | undefined },
      });

      const generatedId = result.current;
      expect(generatedId).toMatch(/^flyout-/);

      // Change to provided ID
      mockUseIsFlyoutRegistered.mockReturnValue(false);
      rerender({ id: 'provided-id' });

      expect(result.current).toBe(generatedId);
      expect(result.current).not.toBe('provided-id');
    });
  });

  describe('hook integration', () => {
    it('should work together with reducer', () => {
      mockUseIsFlyoutRegistered.mockReturnValue(false); // ID is available
      const { result: reducerResult } = renderHook(() =>
        useFlyoutManagerReducer()
      );
      const { result: idResult } = renderHook(() => useFlyoutId('test-id'));

      act(() => {
        reducerResult.current.addFlyout(idResult.current, 'main', LEVEL_MAIN);
      });

      expect(reducerResult.current.state.flyouts).toHaveLength(1);
      expect(reducerResult.current.state.flyouts[0].flyoutId).toBe('test-id');
    });

    it('should handle multiple flyouts with generated IDs', () => {
      const { result: reducerResult } = renderHook(() =>
        useFlyoutManagerReducer()
      );
      const { result: idResult1 } = renderHook(() => useFlyoutId());
      const { result: idResult2 } = renderHook(() => useFlyoutId());

      act(() => {
        reducerResult.current.addFlyout(idResult1.current, 'main', LEVEL_MAIN);
        reducerResult.current.addFlyout(
          idResult2.current,
          'child',
          LEVEL_CHILD
        );
      });

      expect(reducerResult.current.state.flyouts).toHaveLength(2);
      expect(reducerResult.current.state.sessions).toHaveLength(1);
      expect(reducerResult.current.state.sessions[0].childFlyoutId).toBe(
        idResult2.current
      );
    });
  });

  describe('edge cases', () => {
    it('should handle rapid state changes', () => {
      const { result } = renderHook(() => useFlyoutManagerReducer());

      act(() => {
        // Rapidly add and remove flyouts
        for (let i = 0; i < 10; i++) {
          result.current.addFlyout(`flyout-${i}`, 'main', LEVEL_MAIN);
          result.current.closeFlyout(`flyout-${i}`);
        }
      });

      expect(result.current.state.flyouts).toHaveLength(0);
      expect(result.current.state.sessions).toHaveLength(0);
    });

    it('should handle concurrent ID generation', () => {
      const results = [];
      for (let i = 0; i < 5; i++) {
        const { result } = renderHook(() => useFlyoutId());
        results.push(result.current);
      }

      // All IDs should be unique
      const uniqueIds = new Set(results);
      expect(uniqueIds.size).toBe(5);

      // All IDs should follow the pattern
      results.forEach((id) => {
        expect(id).toMatch(/^flyout-/);
      });
    });

    it('should handle undefined initial state gracefully', () => {
      const { result } = renderHook(() =>
        useFlyoutManagerReducer(undefined as any)
      );

      expect(result.current.state).toEqual({
        sessions: [],
        flyouts: [],
        layoutMode: 'side-by-side',
      });
    });
  });
});
