/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { EuiFlyoutLevel, EuiFlyoutManagerState } from './types';
import type { Action } from './actions';
import {
  addFlyout as addFlyoutAction,
  closeFlyout as closeFlyoutAction,
  setActiveFlyout as setActiveFlyoutAction,
  setFlyoutWidth as setFlyoutWidthAction,
  setPushPadding as setPushPaddingAction,
  goBack as goBackAction,
  goToFlyout as goToFlyoutAction,
  addUnmanagedFlyout as addUnmanagedFlyoutAction,
  closeUnmanagedFlyout as closeUnmanagedFlyoutAction,
} from './actions';
import { flyoutManagerReducer, initialState } from './reducer';

type Listener = () => void;

export interface FlyoutManagerStore {
  getState: () => EuiFlyoutManagerState;
  subscribe: (listener: Listener) => () => void;
  dispatch: (action: Action) => void;
  // Convenience bound action creators
  addFlyout: (
    flyoutId: string,
    title: string,
    level?: EuiFlyoutLevel,
    size?: string
  ) => void;
  closeFlyout: (flyoutId: string) => void;
  setActiveFlyout: (flyoutId: string | null) => void;
  setFlyoutWidth: (flyoutId: string, width: number) => void;
  setPushPadding: (side: 'left' | 'right', width: number) => void;
  goBack: () => void;
  goToFlyout: (flyoutId: string) => void;
  addUnmanagedFlyout: (flyoutId: string) => void;
  closeUnmanagedFlyout: (flyoutId: string) => void;
  historyItems: Array<{
    title: string;
    onClick: () => void;
  }>;
}

function createStore(
  initial: EuiFlyoutManagerState = initialState
): FlyoutManagerStore {
  let currentState: EuiFlyoutManagerState = initial;
  const listeners = new Set<Listener>();

  const getState = () => currentState;

  const subscribe = (listener: Listener) => {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  };

  // The onClick handlers won't execute until after store is fully assigned.
  // eslint-disable-next-line prefer-const -- Forward declaration requires 'let' not 'const'
  let store: FlyoutManagerStore;

  const computeHistoryItems = (): Array<{
    title: string;
    onClick: () => void;
  }> => {
    const currentSessionIndex = currentState.sessions.length - 1;
    const previousSessions = currentState.sessions.slice(
      0,
      currentSessionIndex
    );
    return previousSessions.reverse().map(({ title, mainFlyoutId }) => ({
      title,
      onClick: () => {
        store.dispatch(goToFlyoutAction(mainFlyoutId));
      },
    }));
  };

  const dispatch = (action: Action) => {
    const nextState = flyoutManagerReducer(currentState, action);
    if (nextState !== currentState) {
      const previousSessions = currentState.sessions;
      currentState = nextState;

      // Recompute history items eagerly if sessions changed
      // This ensures stable references and avoids stale closures
      if (nextState.sessions !== previousSessions) {
        store.historyItems = computeHistoryItems();
      }

      listeners.forEach((l) => {
        l();
      });
    }
  };

  store = {
    getState,
    subscribe,
    dispatch,
    addFlyout: (flyoutId, title, level, size) =>
      dispatch(addFlyoutAction(flyoutId, title, level, size)),
    closeFlyout: (flyoutId) => dispatch(closeFlyoutAction(flyoutId)),
    setActiveFlyout: (flyoutId) => dispatch(setActiveFlyoutAction(flyoutId)),
    setFlyoutWidth: (flyoutId, width) =>
      dispatch(setFlyoutWidthAction(flyoutId, width)),
    setPushPadding: (side, width) =>
      dispatch(setPushPaddingAction(side, width)),
    goBack: () => dispatch(goBackAction()),
    goToFlyout: (flyoutId) => dispatch(goToFlyoutAction(flyoutId)),
    addUnmanagedFlyout: (flyoutId) =>
      dispatch(addUnmanagedFlyoutAction(flyoutId)),
    closeUnmanagedFlyout: (flyoutId) =>
      dispatch(closeUnmanagedFlyoutAction(flyoutId)),
    historyItems: computeHistoryItems(), // Initialize with current state
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
