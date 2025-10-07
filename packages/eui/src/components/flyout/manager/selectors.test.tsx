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
  beforeEach(() => {
    mockUseFlyoutManager.mockClear();
  });

  describe('useFlyoutWidth', () => {
    it('should return undefined when flyout is not found', () => {
      mockUseFlyoutManager.mockReturnValue({
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
        historyItems: [],
      });

      const { result } = renderHook(() =>
        useFlyoutWidth('non-existent-flyout')
      );

      expect(result.current).toBeUndefined();
    });

    it('should return the width when flyout exists', () => {
      mockUseFlyoutManager.mockReturnValue({
        state: {
          sessions: [],
          flyouts: [
            {
              flyoutId: 'test-flyout',
              level: LEVEL_MAIN,
              size: 'm',
              activityStage: 'active',
              width: 500,
            },
          ],
          layoutMode: 'side-by-side',
        },
        dispatch: jest.fn(),
        addFlyout: jest.fn(),
        closeFlyout: jest.fn(),
        setActiveFlyout: jest.fn(),
        setFlyoutWidth: jest.fn(),
        goBack: jest.fn(),
        goToFlyout: jest.fn(),
        historyItems: [],
      });

      const { result } = renderHook(() => useFlyoutWidth('test-flyout'));

      expect(result.current).toBe(500);
    });
  });

  describe('useParentFlyoutSize', () => {
    it('should return undefined when no parent flyout exists', () => {
      mockUseFlyoutManager.mockReturnValue({
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
        historyItems: [],
      });

      const { result } = renderHook(() => useParentFlyoutSize('child-flyout'));

      expect(result.current).toBeUndefined();
    });
  });

  describe('useHasChildFlyout', () => {
    it('should return false when no child flyout exists', () => {
      mockUseFlyoutManager.mockReturnValue({
        state: {
          sessions: [],
          flyouts: [
            {
              flyoutId: 'parent-flyout',
              level: LEVEL_MAIN,
              size: 'm',
              activityStage: 'active',
            },
          ],
          layoutMode: 'side-by-side',
        },
        dispatch: jest.fn(),
        addFlyout: jest.fn(),
        closeFlyout: jest.fn(),
        setActiveFlyout: jest.fn(),
        setFlyoutWidth: jest.fn(),
        goBack: jest.fn(),
        goToFlyout: jest.fn(),
        historyItems: [],
      });

      const { result } = renderHook(() => useHasChildFlyout('parent-flyout'));

      expect(result.current).toBe(false);
    });

    it('should return true when child flyout exists', () => {
      mockUseFlyoutManager.mockReturnValue({
        state: {
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
          layoutMode: 'side-by-side',
        },
        dispatch: jest.fn(),
        addFlyout: jest.fn(),
        closeFlyout: jest.fn(),
        setActiveFlyout: jest.fn(),
        setFlyoutWidth: jest.fn(),
        goBack: jest.fn(),
        goToFlyout: jest.fn(),
        historyItems: [],
      });

      const { result } = renderHook(() => useHasChildFlyout('parent-flyout'));

      expect(result.current).toBe(true);
    });
  });
});
