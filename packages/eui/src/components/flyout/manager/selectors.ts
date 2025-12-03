/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useFlyoutManager } from './provider';
import { useRef } from 'react';

export const useSession = (flyoutId?: string | null) => {
  const context = useFlyoutManager();

  if (!context) {
    return null;
  }

  return (
    context.state.sessions.find(
      (s) => s.mainFlyoutId === flyoutId || s.childFlyoutId === flyoutId
    ) || null
  );
};

/** True when any managed flyout session is currently active. */
export const useHasActiveSession = () => !!useCurrentSession();

/** True if the given `flyoutId` is the main or child flyout in the latest session. */
export const useIsFlyoutActive = (flyoutId: string) => {
  const currentSession = useCurrentSession();
  return (
    currentSession?.mainFlyoutId === flyoutId ||
    currentSession?.childFlyoutId === flyoutId
  );
};

export const useFlyout = (flyoutId?: string | null) => {
  const context = useFlyoutManager();
  if (!context || !flyoutId) {
    return null;
  }
  return context.state.flyouts.find((f) => f.flyoutId === flyoutId) || null;
};

export const useIsFlyoutRegistered = (flyoutId?: string | null) => {
  const context = useFlyoutManager();
  if (!context || !flyoutId) {
    return false;
  }
  return context.state.flyouts.some((f) => f.flyoutId === flyoutId);
};

/** The most recent flyout session or `null` if none. */
export const useCurrentSession = () => {
  const context = useFlyoutManager();
  if (!context) return null;
  return context.state.sessions[context.state.sessions.length - 1] || null;
};

/** The registered state of the current session's main flyout, if present. */
export const useCurrentMainFlyout = () => {
  const currentSession = useCurrentSession();
  const mainFlyoutId = currentSession?.mainFlyoutId;
  return useFlyout(mainFlyoutId);
};

/** The registered state of the current session's child flyout, if present. */
export const useCurrentChildFlyout = () => {
  const currentSession = useCurrentSession();
  const childFlyoutId = currentSession?.childFlyoutId;
  return useFlyout(childFlyoutId);
};

/** The measured width (px) of the specified flyout, or `null` if unknown. */
export const useFlyoutWidth = (flyoutId?: string | null) =>
  useFlyout(flyoutId)?.width;

/** The configured size of the parent (main) flyout for a given child flyout ID. */
export const useParentFlyoutSize = (childFlyoutId: string) => {
  const session = useSession(childFlyoutId);
  const parentFlyout = useFlyout(session?.mainFlyoutId);
  return parentFlyout?.size;
};

/** True if the provided `flyoutId` is the main flyout and it currently has a child. */
export const useHasChildFlyout = (flyoutId: string) => {
  const session = useSession(flyoutId);
  return !!session?.childFlyoutId;
};

/** Get the current push padding offsets from manager state. */
export const usePushPaddingOffsets = () => {
  const context = useFlyoutManager();
  if (!context) {
    return { left: 0, right: 0 };
  }
  return context.state.pushPadding ?? { left: 0, right: 0 };
};

/** True if there's any active push padding (left or right side). */
export const useHasPushPadding = () => {
  const pushPadding = usePushPaddingOffsets();
  return pushPadding.left > 0 || pushPadding.right > 0;
};

/** Get the ref for the current flyout z-index to be used */
export const useCurrentFlyoutZIndexRef = () => {
  const context = useFlyoutManager();

  return useRef(context?.state.currentZIndex || 0);
};
