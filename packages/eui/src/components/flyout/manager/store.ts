/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { IconType } from '../../icon';
import type {
  EuiFlyoutLevel,
  EuiFlyoutManagerState,
  FlyoutSession,
} from './types';
import type { Action } from './actions';
import {
  addFlyout as addFlyoutAction,
  closeFlyout as closeFlyoutAction,
  closeAllFlyouts as closeAllFlyoutsAction,
  setActiveFlyout as setActiveFlyoutAction,
  setFlyoutWidth as setFlyoutWidthAction,
  setPushPadding as setPushPaddingAction,
  goBack as goBackAction,
  goToFlyout as goToFlyoutAction,
  addUnmanagedFlyout as addUnmanagedFlyoutAction,
  closeUnmanagedFlyout as closeUnmanagedFlyoutAction,
  setContainerElement as setContainerElementAction,
} from './actions';
import { flyoutManagerReducer, initialState } from './reducer';

type Listener = () => void;

/**
 * Events emitted by the flyout manager store for external consumers.
 */
export type FlyoutManagerEvent = {
  type: 'CLOSE_SESSION';
  session: FlyoutSession;
};

type EventListener = (event: FlyoutManagerEvent) => void;

export interface FlyoutManagerStore {
  getState: () => EuiFlyoutManagerState;
  subscribe: (listener: Listener) => () => void;
  subscribeToEvents: (listener: EventListener) => () => void;
  dispatch: (action: Action) => void;
  // Convenience bound action creators
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

function createStore(
  initial: EuiFlyoutManagerState = initialState
): FlyoutManagerStore {
  let currentState: EuiFlyoutManagerState = initial;
  const listeners = new Set<Listener>();
  const eventListeners = new Set<EventListener>();

  const getState = () => currentState;

  const subscribe = (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  const subscribeToEvents = (listener: EventListener) => {
    eventListeners.add(listener);
    return () => {
      eventListeners.delete(listener);
    };
  };

  const emitEvent = (event: FlyoutManagerEvent) => {
    eventListeners.forEach((listener) => {
      listener(event);
    });
  };

  // The onClick handlers won't execute until after store is fully assigned.
  // eslint-disable-next-line prefer-const -- Forward declaration requires 'let' not 'const'
  let store: FlyoutManagerStore;

  const computeHistoryItems = (
    dispatchFn: (action: Action) => void
  ): Array<{
    title: string;
    iconType?: IconType;
    onClick: () => void;
  }> => {
    const currentSessionIndex = currentState.sessions.length - 1;
    const currentSession =
      currentSessionIndex >= 0
        ? currentState.sessions[currentSessionIndex]
        : null;

    if (!currentSession) {
      return [];
    }

    const previousSessions = currentState.sessions.slice(
      0,
      currentSessionIndex
    );
    // Only include sessions in the same history group (same historyKey reference)
    const previousSessionsInGroup = previousSessions.filter(
      (session) => session.historyKey === currentSession.historyKey
    );

    const childHistory = currentSession.childHistory ?? [];
    const childItems = [...childHistory].reverse().map((entry) => ({
      title: entry.title,
      iconType: entry.iconType,
      onClick: () => {
        dispatchFn(goToFlyoutAction(entry.flyoutId, 'child'));
      },
    }));

    // Previous sessions (same group): list each session's current child then its child history
    const previousSessionItems: Array<{
      title: string;
      iconType?: IconType;
      onClick: () => void;
    }> = [];
    for (let i = previousSessionsInGroup.length - 1; i >= 0; i--) {
      const session = previousSessionsInGroup[i];
      const mainTitle = session.title;
      const mainFlyoutId = session.mainFlyoutId;
      const history = session.childHistory ?? [];
      const hasChildren =
        (session.childFlyoutId != null && session.childTitle != null) ||
        history.length > 0;

      if (session.childFlyoutId && session.childTitle) {
        previousSessionItems.push({
          title: session.childTitle,
          iconType: session.childIconType,
          onClick: () => {
            dispatchFn(goToFlyoutAction(mainFlyoutId, 'main'));
          },
        });
      }
      for (let h = history.length - 1; h >= 0; h--) {
        const entry = history[h];
        previousSessionItems.push({
          title: entry.title,
          iconType: entry.iconType,
          onClick: () => {
            dispatchFn(goToFlyoutAction(mainFlyoutId, 'main'));
            dispatchFn(goToFlyoutAction(entry.flyoutId, 'child'));
          },
        });
      }
      if (!hasChildren) {
        previousSessionItems.push({
          title: mainTitle,
          iconType: session.iconType,
          onClick: () => {
            dispatchFn(goToFlyoutAction(mainFlyoutId, 'main'));
          },
        });
      }
    }

    return [...childItems, ...previousSessionItems];
  };

  const dispatch = (action: Action) => {
    const nextState = flyoutManagerReducer(currentState, action);
    if (nextState !== currentState) {
      const previousSessions = currentState.sessions;
      currentState = nextState;

      // Recompute history items eagerly if sessions changed
      // This ensures stable references and avoids stale closures
      if (nextState.sessions !== previousSessions) {
        store.historyItems = computeHistoryItems(dispatch);

        // Detect removed sessions and emit CLOSE_SESSION events
        const nextSessionIds = new Set(
          nextState.sessions.map((s) => s.mainFlyoutId)
        );
        previousSessions.forEach((session) => {
          if (!nextSessionIds.has(session.mainFlyoutId)) {
            emitEvent({
              type: 'CLOSE_SESSION',
              session,
            });
          }
        });
      }

      listeners.forEach((l) => {
        l();
      });
    }
  };

  store = {
    getState,
    subscribe,
    subscribeToEvents,
    dispatch,
    addFlyout: (flyoutId, title, level, size, historyKey, iconType, minWidth) =>
      dispatch(
        addFlyoutAction(
          flyoutId,
          title,
          level,
          size,
          historyKey,
          iconType,
          minWidth
        )
      ),
    closeFlyout: (flyoutId) => dispatch(closeFlyoutAction(flyoutId)),
    closeAllFlyouts: () => dispatch(closeAllFlyoutsAction()),
    setActiveFlyout: (flyoutId) => dispatch(setActiveFlyoutAction(flyoutId)),
    setFlyoutWidth: (flyoutId, width) =>
      dispatch(setFlyoutWidthAction(flyoutId, width)),
    setPushPadding: (side, width) =>
      dispatch(setPushPaddingAction(side, width)),
    setContainerElement: (element) =>
      dispatch(setContainerElementAction(element)),
    goBack: () => dispatch(goBackAction()),
    goToFlyout: (flyoutId, level) =>
      dispatch(goToFlyoutAction(flyoutId, level)),
    addUnmanagedFlyout: (flyoutId) =>
      dispatch(addUnmanagedFlyoutAction(flyoutId)),
    closeUnmanagedFlyout: (flyoutId) =>
      dispatch(closeUnmanagedFlyoutAction(flyoutId)),
    historyItems: computeHistoryItems(dispatch), // Initialize with current state
  };

  return store;
}

// Module-level singleton.  A necessary trade-off to avoid global namespace pollution or the need for a third-party library.
let storeInstance: FlyoutManagerStore | null = null;

/**
 * Returns a singleton store instance shared across all React roots within the same JS context.
 * Uses module-level singleton to ensure deduplication even if modules are loaded twice.
 */
export function getFlyoutManagerStore(): FlyoutManagerStore {
  if (!storeInstance) {
    storeInstance = createStore();
  }
  return storeInstance;
}

/**
 * For testing purposes - allows resetting the store
 */
export function _resetFlyoutManagerStore(): void {
  storeInstance = null;
}
