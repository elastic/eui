/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { LEVEL_MAIN } from '../const';
import type {
  EuiFlyoutManagerState,
  FlyoutManagerApi,
  FlyoutSession,
} from '../types';

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
  setContainerElement: jest.fn(),
});

/** Default state shape matching EuiFlyoutManagerState for tests. */
export const createMockState = (): EuiFlyoutManagerState => ({
  sessions: [],
  flyouts: [],
  layoutMode: 'side-by-side',
  pushPadding: { left: 0, right: 0 },
  unmanagedFlyouts: [],
  currentZIndex: 0,
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
 * Helper for creating dynamic test state (merge overrides onto default state).
 */
export const createTestState = (
  overrides: Partial<EuiFlyoutManagerState> = {}
): EuiFlyoutManagerState => ({
  ...createMockState(),
  ...overrides,
});

/**
 * Minimal session for tests (matches FlyoutSession shape).
 */
export const createTestSession = (
  mainFlyoutId: string,
  title: string,
  childFlyoutId: string | null = null,
  overrides: Partial<FlyoutSession> = {}
): FlyoutSession => ({
  mainFlyoutId,
  title,
  childFlyoutId,
  childHistory: [],
  historyKey: Symbol(mainFlyoutId),
  zIndex: 0,
  ...overrides,
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
