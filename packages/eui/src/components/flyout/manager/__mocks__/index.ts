/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { LEVEL_MAIN } from '../const';
import { FlyoutManagerApi } from '../types';

/**
 * Centralized test utilities for flyout manager tests.
 */

export const mockCloseFlyout = jest.fn();
export const mockCloseAllFlyouts = jest.fn();

export const createMockFunctions = (): Omit<
  FlyoutManagerApi,
  'state' | 'historyItems'
> => ({
  dispatch: jest.fn(),
  addFlyout: jest.fn(),
  closeFlyout: mockCloseFlyout,
  closeAllFlyouts: mockCloseAllFlyouts,
  setActiveFlyout: jest.fn(),
  setFlyoutWidth: jest.fn(),
  goBack: jest.fn(),
  goToFlyout: jest.fn(),
  addUnmanagedFlyout: jest.fn(),
  closeUnmanagedFlyout: jest.fn(),
  setPushPadding: jest.fn(),
});

export const createMockState = () => ({
  sessions: [],
  flyouts: [],
  layoutMode: 'side-by-side' as const,
});

/**
 * Factory for creating flyout manager API mock.
 */
export const createFlyoutManagerMock = () => ({
  state: createMockState(),
  historyItems: [],
  ...createMockFunctions(),
});

/**
 * Factory for creating flyout manager reducer mock.
 */
export const createFlyoutManagerReducerMock = () => ({
  state: createMockState(),
  ...createMockFunctions(),
});

/**
 * Helper for creating dynamic test state.
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
