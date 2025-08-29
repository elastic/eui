/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Action } from './actions';

import {
  STAGE_CLOSING,
  STAGE_OPENING,
  STAGE_ACTIVE,
  STAGE_INACTIVE,
  STAGE_BACKGROUNDING,
  STAGE_BACKGROUNDED,
  STAGE_RETURNING,
  LAYOUT_MODE_SIDE_BY_SIDE,
  LAYOUT_MODE_STACKED,
  LEVEL_CHILD,
  LEVEL_MAIN,
} from './const';

// Core domain types for the flyout manager

export type EuiFlyoutLayoutMode =
  | typeof LAYOUT_MODE_STACKED
  | typeof LAYOUT_MODE_SIDE_BY_SIDE;

export type EuiFlyoutLevel = typeof LEVEL_MAIN | typeof LEVEL_CHILD;

export type EuiFlyoutActivityStage =
  | typeof STAGE_OPENING
  | typeof STAGE_ACTIVE
  | typeof STAGE_INACTIVE
  | typeof STAGE_BACKGROUNDING
  | typeof STAGE_BACKGROUNDED
  | typeof STAGE_RETURNING
  | typeof STAGE_CLOSING;

export interface EuiManagedFlyoutState {
  flyoutId: string;
  level: EuiFlyoutLevel;
  width?: number;
  size?: string;
  activityStage?: EuiFlyoutActivityStage;
}

export interface FlyoutSession {
  main: string;
  child: string | null;
}

export interface EuiFlyoutManagerState {
  sessions: FlyoutSession[];
  flyouts: EuiManagedFlyoutState[];
  layoutMode: EuiFlyoutLayoutMode;
}

/**
 * Public API surface provided through React context.
 * Kept intentionally decoupled from action types to avoid module cycles.
 */
export interface FlyoutManagerApi {
  state: EuiFlyoutManagerState;
  dispatch: (action: Action) => void;
  addFlyout: (flyoutId: string, level?: EuiFlyoutLevel, size?: string) => void;
  closeFlyout: (flyoutId: string) => void;
  setActiveFlyout: (flyoutId: string | null) => void;
  setFlyoutWidth: (flyoutId: string, width: number) => void;
}
