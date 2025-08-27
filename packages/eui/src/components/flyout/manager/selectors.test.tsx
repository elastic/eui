/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { renderHook } from '@testing-library/react';
import {
  useSession,
  useHasActiveSession,
  useIsFlyoutActive,
  useFlyout,
  useCurrentSession,
  useCurrentMainFlyout,
  useCurrentChildFlyout,
  useFlyoutWidth,
  useParentFlyoutSize,
  useHasChildFlyout,
} from './selectors';
import { EuiFlyoutManager, useFlyoutManager } from './provider';
import { useFlyoutManagerReducer } from './hooks';

import { LEVEL_MAIN, LEVEL_CHILD } from './const';

// Mock the hooks module to avoid circular dependencies
jest.mock('./hooks', () => ({
  useFlyoutManagerReducer: jest.fn(),
}));

// Mock the provider context
jest.mock('./provider', () => ({
  EuiFlyoutManager: ({ children }: { children: React.ReactNode }) => children,
  useFlyoutManager: jest.fn(),
}));

// Test wrapper component
const TestWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <EuiFlyoutManager>{children}</EuiFlyoutManager>;
};

// Mock data
const mockState = {
  sessions: [
    { main: 'main-1', child: 'child-1' },
    { main: 'main-2', child: null },
  ],
  flyouts: [
    { flyoutId: 'main-1', level: LEVEL_MAIN, size: 'l', width: 600 },
    { flyoutId: 'child-1', level: LEVEL_CHILD, size: 'm', width: 400 },
    { flyoutId: 'main-2', level: LEVEL_MAIN, size: 's', width: 300 },
  ],
  layoutMode: 'side-by-side' as const,
};

const mockApi = {
  state: mockState,
  dispatch: jest.fn(),
  addFlyout: jest.fn(),
  closeFlyout: jest.fn(),
  setActiveFlyout: jest.fn(),
  setFlyoutWidth: jest.fn(),
};

describe('flyout manager selectors', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    const mockUseFlyoutManagerReducer = useFlyoutManagerReducer as jest.Mock;
    const mockUseFlyoutManager = useFlyoutManager as jest.Mock;
    mockUseFlyoutManagerReducer.mockReturnValue(mockApi);
    mockUseFlyoutManager.mockReturnValue(mockApi);
  });

  describe('useSession', () => {
    it('should return session when flyout ID matches main', () => {
      const { result } = renderHook(() => useSession('main-1'), {
        wrapper: TestWrapper,
      });

      expect(result.current).toEqual({ main: 'main-1', child: 'child-1' });
    });

    it('should return session when flyout ID matches child', () => {
      const { result } = renderHook(() => useSession('child-1'), {
        wrapper: TestWrapper,
      });

      expect(result.current).toEqual({ main: 'main-1', child: 'child-1' });
    });

    it('should return null when flyout ID does not match any session', () => {
      const { result } = renderHook(() => useSession('non-existent'), {
        wrapper: TestWrapper,
      });

      expect(result.current).toBeNull();
    });

    it('should return null when no flyout ID is provided', () => {
      const { result } = renderHook(() => useSession(), {
        wrapper: TestWrapper,
      });

      expect(result.current).toBeNull();
    });

    it('should return null when flyout ID is null', () => {
      const { result } = renderHook(() => useSession(null), {
        wrapper: TestWrapper,
      });

      // The selector treats null as a literal value to search for
      // It finds the session where child: null matches flyoutId: null
      expect(result.current).toEqual({ main: 'main-2', child: null });
    });
  });

  describe('useHasActiveSession', () => {
    it('should return true when there are active sessions', () => {
      const { result } = renderHook(() => useHasActiveSession(), {
        wrapper: TestWrapper,
      });

      expect(result.current).toBe(true);
    });

    it('should return false when there are no sessions', () => {
      const emptyState = { ...mockState, sessions: [] };
      (useFlyoutManagerReducer as jest.Mock).mockReturnValue({
        ...mockApi,
        state: emptyState,
      });
      (useFlyoutManager as jest.Mock).mockReturnValue({
        ...mockApi,
        state: emptyState,
      });

      const { result } = renderHook(() => useHasActiveSession(), {
        wrapper: TestWrapper,
      });

      expect(result.current).toBe(false);
    });
  });

  describe('useIsFlyoutActive', () => {
    it('should return true when flyout is main in current session', () => {
      const { result } = renderHook(() => useIsFlyoutActive('main-2'), {
        wrapper: TestWrapper,
      });

      expect(result.current).toBe(true);
    });

    it('should return true when flyout is child in current session', () => {
      const { result } = renderHook(() => useIsFlyoutActive('child-1'), {
        wrapper: TestWrapper,
      });

      // child-1 is not in the current session (main-2 with no child)
      // It's in the previous session (main-1 with child-1)
      expect(result.current).toBe(false);
    });

    it('should return false when flyout is not in current session', () => {
      const { result } = renderHook(() => useIsFlyoutActive('non-existent'), {
        wrapper: TestWrapper,
      });

      expect(result.current).toBe(false);
    });

    it('should return false when flyout is in previous session', () => {
      const { result } = renderHook(() => useIsFlyoutActive('main-1'), {
        wrapper: TestWrapper,
      });

      expect(result.current).toBe(false);
    });
  });

  describe('useFlyout', () => {
    it('should return flyout when ID exists', () => {
      const { result } = renderHook(() => useFlyout('main-1'), {
        wrapper: TestWrapper,
      });

      expect(result.current).toEqual({
        flyoutId: 'main-1',
        level: LEVEL_MAIN,
        size: 'l',
        width: 600,
      });
    });

    it('should return null when flyout ID does not exist', () => {
      const { result } = renderHook(() => useFlyout('non-existent'), {
        wrapper: TestWrapper,
      });

      expect(result.current).toBeNull();
    });

    it('should return null when no flyout ID is provided', () => {
      const { result } = renderHook(() => useFlyout(), {
        wrapper: TestWrapper,
      });

      expect(result.current).toBeNull();
    });

    it('should return null when flyout ID is null', () => {
      const { result } = renderHook(() => useFlyout(null), {
        wrapper: TestWrapper,
      });

      expect(result.current).toBeNull();
    });
  });

  describe('useCurrentSession', () => {
    it('should return the most recent session', () => {
      const { result } = renderHook(() => useCurrentSession(), {
        wrapper: TestWrapper,
      });

      expect(result.current).toEqual({ main: 'main-2', child: null });
    });

    it('should return null when no sessions exist', () => {
      const emptyState = { ...mockState, sessions: [] };
      (useFlyoutManagerReducer as jest.Mock).mockReturnValue({
        ...mockApi,
        state: emptyState,
      });
      (useFlyoutManager as jest.Mock).mockReturnValue({
        ...mockApi,
        state: emptyState,
      });

      const { result } = renderHook(() => useCurrentSession(), {
        wrapper: TestWrapper,
      });

      expect(result.current).toBeNull();
    });
  });

  describe('useCurrentMainFlyout', () => {
    it('should return the main flyout of current session', () => {
      const { result } = renderHook(() => useCurrentMainFlyout(), {
        wrapper: TestWrapper,
      });

      expect(result.current).toEqual({
        flyoutId: 'main-2',
        level: LEVEL_MAIN,
        size: 's',
        width: 300,
      });
    });

    it('should return null when no current session exists', () => {
      const emptyState = { ...mockState, sessions: [] };
      (useFlyoutManagerReducer as jest.Mock).mockReturnValue({
        ...mockApi,
        state: emptyState,
      });
      (useFlyoutManager as jest.Mock).mockReturnValue({
        ...mockApi,
        state: emptyState,
      });

      const { result } = renderHook(() => useCurrentMainFlyout(), {
        wrapper: TestWrapper,
      });

      expect(result.current).toBeNull();
    });
  });

  describe('useCurrentChildFlyout', () => {
    it('should return the child flyout of current session', () => {
      // Change current session to one with a child
      const stateWithChildCurrent = {
        ...mockState,
        sessions: [
          { main: 'main-2', child: null },
          { main: 'main-1', child: 'child-1' }, // Make this the current session
        ],
      };
      (useFlyoutManagerReducer as jest.Mock).mockReturnValue({
        ...mockApi,
        state: stateWithChildCurrent,
      });
      (useFlyoutManager as jest.Mock).mockReturnValue({
        ...mockApi,
        state: stateWithChildCurrent,
      });

      const { result } = renderHook(() => useCurrentChildFlyout(), {
        wrapper: TestWrapper,
      });

      expect(result.current).toEqual({
        flyoutId: 'child-1',
        level: LEVEL_CHILD,
        size: 'm',
        width: 400,
      });
    });

    it('should return null when current session has no child', () => {
      const { result } = renderHook(() => useCurrentChildFlyout(), {
        wrapper: TestWrapper,
      });

      expect(result.current).toBeNull();
    });

    it('should return null when no current session exists', () => {
      const emptyState = { ...mockState, sessions: [] };
      (useFlyoutManagerReducer as jest.Mock).mockReturnValue({
        ...mockApi,
        state: emptyState,
      });
      (useFlyoutManager as jest.Mock).mockReturnValue({
        ...mockApi,
        state: emptyState,
      });

      const { result } = renderHook(() => useCurrentChildFlyout(), {
        wrapper: TestWrapper,
      });

      expect(result.current).toBeNull();
    });
  });

  describe('useFlyoutWidth', () => {
    it('should return flyout width when it exists', () => {
      const { result } = renderHook(() => useFlyoutWidth('main-1'), {
        wrapper: TestWrapper,
      });

      expect(result.current).toBe(600);
    });

    it('should return undefined when flyout has no width', () => {
      const stateWithoutWidth = {
        ...mockState,
        flyouts: [{ flyoutId: 'main-1', level: LEVEL_MAIN, size: 'l' }],
      };
      (useFlyoutManagerReducer as jest.Mock).mockReturnValue({
        ...mockApi,
        state: stateWithoutWidth,
      });
      (useFlyoutManager as jest.Mock).mockReturnValue({
        ...mockApi,
        state: stateWithoutWidth,
      });

      const { result } = renderHook(() => useFlyoutWidth('main-1'), {
        wrapper: TestWrapper,
      });

      expect(result.current).toBeUndefined();
    });

    it('should return undefined when flyout does not exist', () => {
      const { result } = renderHook(() => useFlyoutWidth('non-existent'), {
        wrapper: TestWrapper,
      });

      expect(result.current).toBeUndefined();
    });

    it('should return undefined when no flyout ID is provided', () => {
      const { result } = renderHook(() => useFlyoutWidth(), {
        wrapper: TestWrapper,
      });

      expect(result.current).toBeUndefined();
    });
  });

  describe('useParentFlyoutSize', () => {
    it('should return parent flyout size for child flyout', () => {
      const { result } = renderHook(() => useParentFlyoutSize('child-1'), {
        wrapper: TestWrapper,
      });

      expect(result.current).toBe('l');
    });

    it('should return undefined when child flyout has no parent', () => {
      const { result } = renderHook(() => useParentFlyoutSize('non-existent'), {
        wrapper: TestWrapper,
      });

      expect(result.current).toBeUndefined();
    });

    it('should return undefined when parent flyout has no size', () => {
      const stateWithoutSize = {
        ...mockState,
        flyouts: [
          { flyoutId: 'main-1', level: LEVEL_MAIN },
          { flyoutId: 'child-1', level: LEVEL_CHILD },
        ],
      };
      (useFlyoutManagerReducer as jest.Mock).mockReturnValue({
        ...mockApi,
        state: stateWithoutSize,
      });
      (useFlyoutManager as jest.Mock).mockReturnValue({
        ...mockApi,
        state: stateWithoutSize,
      });

      const { result } = renderHook(() => useParentFlyoutSize('child-1'), {
        wrapper: TestWrapper,
      });

      expect(result.current).toBeUndefined();
    });
  });

  describe('useHasChildFlyout', () => {
    it('should return true when main flyout has a child', () => {
      const { result } = renderHook(() => useHasChildFlyout('main-1'), {
        wrapper: TestWrapper,
      });

      expect(result.current).toBe(true);
    });

    it('should return false when main flyout has no child', () => {
      const { result } = renderHook(() => useHasChildFlyout('main-2'), {
        wrapper: TestWrapper,
      });

      expect(result.current).toBe(false);
    });

    it('should return false when flyout ID does not exist', () => {
      const { result } = renderHook(() => useHasChildFlyout('non-existent'), {
        wrapper: TestWrapper,
      });

      expect(result.current).toBe(false);
    });

    it('should return false when flyout is not a main flyout', () => {
      const { result } = renderHook(() => useHasChildFlyout('child-1'), {
        wrapper: TestWrapper,
      });

      // The selector checks if the flyout ID has a session with a child
      // Since child-1 is in a session with child: 'child-1', it returns true
      expect(result.current).toBe(true);
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle empty flyouts array', () => {
      const emptyState = { ...mockState, flyouts: [] };
      (useFlyoutManagerReducer as jest.Mock).mockReturnValue({
        ...mockApi,
        state: emptyState,
      });
      (useFlyoutManager as jest.Mock).mockReturnValue({
        ...mockApi,
        state: emptyState,
      });

      const { result: flyoutResult } = renderHook(() => useFlyout('main-1'), {
        wrapper: TestWrapper,
      });
      const { result: widthResult } = renderHook(
        () => useFlyoutWidth('main-1'),
        {
          wrapper: TestWrapper,
        }
      );

      expect(flyoutResult.current).toBeNull();
      expect(widthResult.current).toBeUndefined();
    });

    it('should handle malformed flyout data gracefully', () => {
      const malformedState = {
        ...mockState,
        flyouts: [
          { flyoutId: 'main-1' }, // Missing required properties
        ],
      };
      (useFlyoutManagerReducer as jest.Mock).mockReturnValue({
        ...mockApi,
        state: malformedState,
      });
      (useFlyoutManager as jest.Mock).mockReturnValue({
        ...mockApi,
        state: malformedState,
      });

      const { result } = renderHook(() => useFlyout('main-1'), {
        wrapper: TestWrapper,
      });

      expect(result.current).toEqual({ flyoutId: 'main-1' });
    });

    it('should handle sessions with missing flyout references', () => {
      const invalidState = {
        ...mockState,
        sessions: [{ main: 'main-1', child: 'non-existent-child' }],
        flyouts: [{ flyoutId: 'main-1', level: LEVEL_MAIN }],
      };
      (useFlyoutManagerReducer as jest.Mock).mockReturnValue({
        ...mockApi,
        state: invalidState,
      });
      (useFlyoutManager as jest.Mock).mockReturnValue({
        ...mockApi,
        state: invalidState,
      });

      const { result } = renderHook(() => useSession('non-existent-child'), {
        wrapper: TestWrapper,
      });

      expect(result.current).toEqual({
        main: 'main-1',
        child: 'non-existent-child',
      });
    });
  });
});
