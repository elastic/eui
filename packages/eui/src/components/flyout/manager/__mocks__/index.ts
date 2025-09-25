/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { LEVEL_MAIN } from '../const';

/**
 * Centralized test utilities for flyout manager tests.
 * Eliminates redundant mock setup and provides single source of truth.
 */

// Shared mock functions - reused across all mocks
export const mockCloseFlyout = jest.fn();

export const createMockFunctions = () => ({
  dispatch: jest.fn(),
  addFlyout: jest.fn(),
  closeFlyout: mockCloseFlyout,
  setActiveFlyout: jest.fn(),
  setFlyoutWidth: jest.fn(),
  goBack: jest.fn(),
  goToFlyout: jest.fn(),
  getHistoryItems: jest.fn(() => []),
});

// Shared state object - single source of truth
export const createMockState = () => ({
  sessions: [],
  flyouts: [],
  layoutMode: 'side-by-side' as const,
});

/**
 * Factory for creating flyout manager API mock.
 * Used consistently across hooks, selectors, and provider mocks.
 */
export const createFlyoutManagerMock = () => ({
  state: createMockState(),
  ...createMockFunctions(),
});

/**
 * Factory for creating flyout manager reducer mock.
 * Includes additional reducer-specific properties.
 */
export const createFlyoutManagerReducerMock = () => ({
  state: createMockState(),
  ...createMockFunctions(),
});

/**
 * Helper for creating dynamic test state.
 * Useful for tests that need to simulate state changes.
 */
export const createTestState = (
  overrides: Partial<ReturnType<typeof createMockState>> = {}
) => ({
  ...createMockState(),
  ...overrides,
});

/**
 * Helper for creating test session data.
 */
export const createTestSession = (
  main: string,
  title: string,
  child: string | null = null
) => ({
  main,
  title,
  child,
});

/**
 * Helper for creating test flyout data.
 */
export const createTestFlyout = (
  flyoutId: string,
  level: string = LEVEL_MAIN
) => ({
  flyoutId,
  level,
});

/**
 * Reset all mocks. Call this in beforeEach.
 */
export const resetFlyoutMocks = () => {
  jest.clearAllMocks();
};
