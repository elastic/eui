/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { useFlyoutManager } from './provider';

/** True if the given `flyoutId` is the main or child flyout in the latest session. */
export const useIsFlyoutActive = (flyoutId: string) => {
  const context = useFlyoutManager();
  if (!context) {
    return false;
  }
  const currentSession =
    context.state.sessions[context.state.sessions.length - 1];
  return (
    currentSession?.main === flyoutId || currentSession?.child === flyoutId
  );
};

/** True when any managed flyout session is currently active. */
export const useIsSessionActive = () => {
  const context = useFlyoutManager();
  if (!context) return false;
  return context.state.sessions.length > 0;
};

/** The most recent flyout session or `null` if none. */
export const useCurrentSession = () => {
  const context = useFlyoutManager();
  if (!context) return null;
  return context.state.sessions[context.state.sessions.length - 1] || null;
};

/** The registered state of the current session's main flyout, if present. */
export const useCurrentMainFlyout = () => {
  const context = useFlyoutManager();
  const currentSession = useCurrentSession();
  if (!context || !currentSession) return null;
  const mainFlyoutId = currentSession.main;
  return (
    context.state.flyouts.find((flyout) => flyout.flyoutId === mainFlyoutId) ||
    null
  );
};

/** The registered state of the current session's child flyout, if present. */
export const useCurrentChildFlyout = () => {
  const context = useFlyoutManager();
  const currentSession = useCurrentSession();
  if (!context || !currentSession || !currentSession.child) return null;
  const childFlyoutId = currentSession.child;
  return (
    context.state.flyouts.find((flyout) => flyout.flyoutId === childFlyoutId) ||
    null
  );
};

/** The measured width (px) of the specified flyout, or `null` if unknown. */
export const useFlyoutWidth = (flyoutId?: string | null) => {
  const context = useFlyoutManager();
  if (!context) return null;
  const flyout = context.state.flyouts.find((f) => f.flyoutId === flyoutId);
  return flyout?.width;
};

/** The configured size of the parent (main) flyout for a given child flyout ID. */
export const useParentFlyoutSize = (childFlyoutId: string) => {
  const context = useFlyoutManager();
  if (!context) return undefined;
  const currentSession = context.state.sessions.find(
    (session) => session.child === childFlyoutId
  );
  if (!currentSession) return undefined;
  const parentFlyout = context.state.flyouts.find(
    (f) => f.flyoutId === currentSession.main
  );
  return parentFlyout?.size;
};

/** True if the provided `flyoutId` is the main flyout and it currently has a child. */
export const useHasChildFlyout = (flyoutId: string) => {
  const currentSession = useCurrentSession();
  if (!currentSession) return false;
  return currentSession.main === flyoutId && Boolean(currentSession.child);
};
