/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { IconType } from '../../icon';
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
  minWidth?: number;
  activityStage?: EuiFlyoutActivityStage;
}

/** Entry for a child flyout in session history. */
export interface ChildHistoryEntry {
  flyoutId: string;
  title: string;
  iconType?: IconType;
}

export interface FlyoutSession {
  /** ID of the main flyout for this session */
  mainFlyoutId: string;
  /** ID of the child flyout for this session */
  childFlyoutId: string | null;
  /** Title of the main flyout in this session */
  title: string;
  /** Optional icon for this session when shown in history popover */
  iconType?: IconType;
  /** z-index value to be used by the flyout session */
  zIndex: number;
  /** Title of the current child flyout. */
  childTitle?: string;
  /** Icon of the current child flyout. */
  childIconType?: IconType;
  /** Stack of child flyouts we navigated away from. */
  childHistory: ChildHistoryEntry[];
  /** Key that scopes this session's history; same Symbol reference = same history group. Always set (from action or Symbol()). */
  historyKey: symbol;
}

export interface PushPaddingOffsets {
  /** Push padding applied to the left side (in pixels) */
  left: number;
  /** Push padding applied to the right side (in pixels) */
  right: number;
}

export interface EuiFlyoutManagerState {
  sessions: FlyoutSession[];
  flyouts: EuiManagedFlyoutState[];
  layoutMode: EuiFlyoutLayoutMode;
  /** Active push padding offsets (updated by active push flyouts) */
  pushPadding?: PushPaddingOffsets;
  currentZIndex: number;
  unmanagedFlyouts: string[];
  /** The container element that flyouts are positioned relative to (if any). */
  containerElement?: HTMLElement | null;
  /**
   * Reference width used for layout and resize clamping (container or viewport).
   * Set by the layout mode hook so flyouts use the same value for consistent clamping.
   */
  referenceWidth?: number;
}

/**
 * Public API surface provided through React context.
 * Kept intentionally decoupled from action types to avoid module cycles.
 */
export interface FlyoutManagerApi {
  state: EuiFlyoutManagerState;
  dispatch: (action: Action) => void;
  addFlyout: (
    flyoutId: string,
    title: string,
    level?: EuiFlyoutLevel,
    size?: string,
    historyKey?: symbol,
    iconType?: IconType,
    minWidth?: number
  ) => void;
  closeFlyout: (flyoutId: string) => void;
  closeAllFlyouts: () => void;
  setActiveFlyout: (flyoutId: string | null) => void;
  setFlyoutWidth: (flyoutId: string, width: number) => void;
  setPushPadding: (side: 'left' | 'right', width: number) => void;
  setContainerElement: (element: HTMLElement | null) => void;
  goBack: () => void;
  goToFlyout: (flyoutId: string, level?: EuiFlyoutLevel) => void;
  addUnmanagedFlyout: (flyoutId: string) => void;
  closeUnmanagedFlyout: (flyoutId: string) => void;
  historyItems: Array<{
    title: string;
    iconType?: IconType;
    onClick: () => void;
  }>;
}
