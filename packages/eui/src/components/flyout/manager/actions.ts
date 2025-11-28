/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { LEVEL_MAIN } from './const';
import {
  EuiFlyoutActivityStage,
  EuiFlyoutLevel,
  EuiFlyoutLayoutMode,
} from './types';

const PREFIX = 'eui/flyoutManager' as const;

interface BaseAction {
  type: `${typeof PREFIX}/${string}`;
}

/** Dispatched when a flyout registers itself with the manager. */
export const ACTION_ADD = `${PREFIX}/add` as const;
/** Dispatched to remove a flyout from the manager (usually on close/unmount). */
export const ACTION_CLOSE = `${PREFIX}/close` as const;
/** Dispatched to set which flyout is currently active within the session. */
export const ACTION_SET_ACTIVE = `${PREFIX}/setActive` as const;
/** Dispatched when an active flyout's pixel width changes (for responsive layout). */
export const ACTION_SET_WIDTH = `${PREFIX}/setWidth` as const;
/** Dispatched to switch layout mode between `side-by-side` and `stacked`. */
export const ACTION_SET_LAYOUT_MODE = `${PREFIX}/setLayoutMode` as const;
/** Dispatched to update a flyout's activity stage (e.g., opening -> active). */
export const ACTION_SET_ACTIVITY_STAGE = `${PREFIX}/setActivityStage` as const;
/** Dispatched to go back one session (remove current session). */
export const ACTION_GO_BACK = `${PREFIX}/goBack` as const;
/** Dispatched to navigate to a specific flyout (remove all sessions after it). */
export const ACTION_GO_TO_FLYOUT = `${PREFIX}/goToFlyout` as const;
/** Dispatched to set push padding offset for a side. */
export const ACTION_SET_PUSH_PADDING = `${PREFIX}/setPushPadding` as const;
export const ACTION_ADD_UNMANAGED_FLYOUT =
  `${PREFIX}/addUnmanagedFlyout` as const;
export const ACTION_CLOSE_UNMANAGED_FLYOUT =
  `${PREFIX}/closeUnmanagedFlyout` as const;

/**
 * Add a flyout to manager state. The manager will create or update
 * the current session depending on the `level` provided.
 */
export interface AddFlyoutAction extends BaseAction {
  type: typeof ACTION_ADD;
  flyoutId: string;
  title: string;
  level: EuiFlyoutLevel;
  size?: string;
}

/** Remove a flyout from manager state. Also updates the active session. */
export interface CloseFlyoutAction extends BaseAction {
  type: typeof ACTION_CLOSE;
  flyoutId: string;
}

/** Set the active flyout within the current session (or clear with `null`). */
export interface SetActiveFlyoutAction extends BaseAction {
  type: typeof ACTION_SET_ACTIVE;
  flyoutId: string | null;
}

/** Update a flyout's measured width in pixels. */
export interface SetWidthAction extends BaseAction {
  type: typeof ACTION_SET_WIDTH;
  flyoutId: string;
  width: number;
}

/** Change how flyouts are arranged: `side-by-side` or `stacked`. */
export interface SetLayoutModeAction extends BaseAction {
  type: typeof ACTION_SET_LAYOUT_MODE;
  layoutMode: EuiFlyoutLayoutMode;
}

/** Set a specific flyout's activity stage. */
export interface SetActivityStageAction extends BaseAction {
  type: typeof ACTION_SET_ACTIVITY_STAGE;
  flyoutId: string;
  activityStage: EuiFlyoutActivityStage;
}

/** Go back one session (remove current session from stack). */
export interface GoBackAction extends BaseAction {
  type: typeof ACTION_GO_BACK;
}

/** Navigate to a specific flyout (remove all sessions after it). */
export interface GoToFlyoutAction extends BaseAction {
  type: typeof ACTION_GO_TO_FLYOUT;
  flyoutId: string;
}

/** Set push padding offset for a specific side. */
export interface SetPushPaddingAction extends BaseAction {
  type: typeof ACTION_SET_PUSH_PADDING;
  side: 'left' | 'right';
  width: number;
}

export interface AddUnmanagedFlyoutAction extends BaseAction {
  type: typeof ACTION_ADD_UNMANAGED_FLYOUT;
  flyoutId: string;
}

export interface CloseUnmanagedFlyoutAction extends BaseAction {
  type: typeof ACTION_CLOSE_UNMANAGED_FLYOUT;
  flyoutId: string;
}

/** Union of all flyout manager actions. */
export type Action =
  | AddFlyoutAction
  | CloseFlyoutAction
  | SetActiveFlyoutAction
  | SetWidthAction
  | SetLayoutModeAction
  | SetActivityStageAction
  | GoBackAction
  | GoToFlyoutAction
  | SetPushPaddingAction
  | AddUnmanagedFlyoutAction
  | CloseUnmanagedFlyoutAction;

/**
 * Register a flyout with the manager.
 * - `title` is used for the flyout menu.
 * - `level` determines whether the flyout is `main` or `child`.
 * - Optional `size` is the named EUI size (e.g. `s`, `m`, `l`).
 */
export const addFlyout = (
  flyoutId: string,
  title: string,
  level: EuiFlyoutLevel = LEVEL_MAIN,
  size?: string
): AddFlyoutAction => ({
  type: ACTION_ADD,
  flyoutId,
  title,
  level,
  size,
});

/** Unregister a flyout and update the session accordingly. */
export const closeFlyout = (flyoutId: string): CloseFlyoutAction => ({
  type: ACTION_CLOSE,
  flyoutId,
});

/** Set or clear the active flyout for the current session. */
export const setActiveFlyout = (
  flyoutId: string | null
): SetActiveFlyoutAction => ({
  type: ACTION_SET_ACTIVE,
  flyoutId,
});

/** Record a flyout's current width in pixels. */
export const setFlyoutWidth = (
  flyoutId: string,
  width: number
): SetWidthAction => ({
  type: ACTION_SET_WIDTH,
  flyoutId,
  width,
});

/** Switch layout mode between `side-by-side` and `stacked`. */
export const setLayoutMode = (
  layoutMode: EuiFlyoutLayoutMode
): SetLayoutModeAction => ({
  type: ACTION_SET_LAYOUT_MODE,
  layoutMode,
});

/** Update a flyout's activity stage. */
export const setActivityStage = (
  flyoutId: string,
  activityStage: EuiFlyoutActivityStage
): SetActivityStageAction => ({
  type: ACTION_SET_ACTIVITY_STAGE,
  flyoutId,
  activityStage,
});

/** Go back one session (remove current session from stack). */
export const goBack = (): GoBackAction => ({
  type: ACTION_GO_BACK,
});

/** Navigate to a specific flyout (remove all sessions after it). */
export const goToFlyout = (flyoutId: string): GoToFlyoutAction => ({
  type: ACTION_GO_TO_FLYOUT,
  flyoutId,
});

/** Set push padding offset for a specific side. */
export const setPushPadding = (
  side: 'left' | 'right',
  width: number
): SetPushPaddingAction => ({
  type: ACTION_SET_PUSH_PADDING,
  side,
  width,
});

/** Register an unmanaged flyout for z-index positioning purposes */
export const addUnmanagedFlyout = (
  flyoutId: string
): AddUnmanagedFlyoutAction => ({
  type: ACTION_ADD_UNMANAGED_FLYOUT,
  flyoutId,
});

/** Unregister an unmanaged flyout */
export const closeUnmanagedFlyout = (
  flyoutId: string
): CloseUnmanagedFlyoutAction => ({
  type: ACTION_CLOSE_UNMANAGED_FLYOUT,
  flyoutId,
});
