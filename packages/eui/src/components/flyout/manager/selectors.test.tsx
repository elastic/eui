/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React from 'react';
import { renderHook } from '../../../test/rtl';
import {
  useFlyoutWidth,
  useParentFlyoutSize,
  useHasChildFlyout,
} from './selectors';
import { useFlyoutManager } from './provider';

import { LEVEL_MAIN, LEVEL_CHILD } from './const';

// Mock the provider context
jest.mock('./provider', () => ({
  EuiFlyoutManager: ({ children }: { children: React.ReactNode }) => children,
  useFlyoutManager: jest.fn(),
}));

const mockUseFlyoutManager = useFlyoutManager as jest.MockedFunction<
  typeof useFlyoutManager
>;

describe('Flyout Manager Selectors', () => {
  let baseMock: NonNullable<ReturnType<typeof mockUseFlyoutManager>>;

  beforeEach(() => {
    mockUseFlyoutManager.mockClear();

    // Create base mock that all tests can build upon
    baseMock = {
      state: {
        sessions: [],
        flyouts: [],
        layoutMode: 'side-by-side',
      },
      dispatch: jest.fn(),
      addFlyout: jest.fn(),
      closeFlyout: jest.fn(),
      setActiveFlyout: jest.fn(),
      setFlyoutWidth: jest.fn(),
      goBack: jest.fn(),
      goToFlyout: jest.fn(),
      updateFlyoutTitle: jest.fn(),
      historyItems: [],
    };
  });

  const createMockWithState = (
    stateOverrides: Partial<typeof baseMock.state>
  ) => ({
    ...baseMock,
    state: { ...baseMock.state, ...stateOverrides },
  });

  describe('useFlyoutWidth', () => {
    it('should return undefined when flyout is not found', () => {
      mockUseFlyoutManager.mockReturnValue(baseMock);

      const { result } = renderHook(() =>
        useFlyoutWidth('non-existent-flyout')
      );

      expect(result.current).toBeUndefined();
    });

    it('should return the width when flyout exists', () => {
      mockUseFlyoutManager.mockReturnValue(
        createMockWithState({
          flyouts: [
            {
              flyoutId: 'test-flyout',
              level: LEVEL_MAIN,
              size: 'm',
              activityStage: 'active',
              width: 500,
            },
          ],
        })
      );

      const { result } = renderHook(() => useFlyoutWidth('test-flyout'));

      expect(result.current).toBe(500);
    });
  });

  describe('useParentFlyoutSize', () => {
    it('should return undefined when no parent flyout exists', () => {
      mockUseFlyoutManager.mockReturnValue(baseMock);

      const { result } = renderHook(() => useParentFlyoutSize('child-flyout'));

      expect(result.current).toBeUndefined();
    });
  });

  describe('useHasChildFlyout', () => {
    it('should return false when no child flyout exists', () => {
      mockUseFlyoutManager.mockReturnValue(
        createMockWithState({
          flyouts: [
            {
              flyoutId: 'parent-flyout',
              level: LEVEL_MAIN,
              size: 'm',
              activityStage: 'active',
            },
          ],
        })
      );

      const { result } = renderHook(() => useHasChildFlyout('parent-flyout'));

      expect(result.current).toBe(false);
    });

    it('should return true when child flyout exists', () => {
      mockUseFlyoutManager.mockReturnValue(
        createMockWithState({
          sessions: [
            {
              mainFlyoutId: 'parent-flyout',
              childFlyoutId: 'child-flyout',
              title: 'Parent Flyout',
            },
          ],
          flyouts: [
            {
              flyoutId: 'parent-flyout',
              level: LEVEL_MAIN,
              size: 'm',
              activityStage: 'active',
            },
            {
              flyoutId: 'child-flyout',
              level: LEVEL_CHILD,
              size: 'm',
              activityStage: 'active',
            },
          ],
        })
      );

      const { result } = renderHook(() => useHasChildFlyout('parent-flyout'));

      expect(result.current).toBe(true);
    });
  });
});
