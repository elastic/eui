/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { createContext, useContext } from 'react';

export interface EuiManagedFlyoutState {
  flyoutId: string;
  level: 'main' | 'child';
  width?: number;
}

export interface FlyoutSession {
  main: string;
  child: string | null;
}

export interface EuiFlyoutManagerState {
  sessions: FlyoutSession[];
  flyouts: EuiManagedFlyoutState[];
  dispatch: (action: Action) => void;
}

const initialState: EuiFlyoutManagerState = {
  sessions: [],
  flyouts: [],
  dispatch: () => {},
};

type FlyoutManagerContextType = ReturnType<typeof useFlyoutManagerReducer>;

const EuiFlyoutManagerContext = createContext<FlyoutManagerContextType | null>(
  null
);

// Context to track if we're within a managed flyout
export const EuiManagedFlyoutContext = createContext<boolean>(false);

const EUI_FLYOUT_PREFIX = 'eui/flyoutManager';

interface BaseAction {
  type: `${typeof EUI_FLYOUT_PREFIX}/${string}`;
}

const ACTION_ADD = `${EUI_FLYOUT_PREFIX}/add` as const;
const ACTION_CLOSE = `${EUI_FLYOUT_PREFIX}/close` as const;
const ACTION_SET_ACTIVE = `${EUI_FLYOUT_PREFIX}/setActive` as const;
const ACTION_SET_WIDTH = `${EUI_FLYOUT_PREFIX}/setWidth` as const;

interface AddFlyoutAction extends BaseAction {
  type: typeof ACTION_ADD;
  flyoutId: string;
  level: 'main' | 'child';
}

interface CloseFlyoutAction extends BaseAction {
  type: typeof ACTION_CLOSE;
  flyoutId: string;
}

interface SetActiveFlyoutAction extends BaseAction {
  type: typeof ACTION_SET_ACTIVE;
  flyoutId: string | null;
}

interface SetWidthAction extends BaseAction {
  type: typeof ACTION_SET_WIDTH;
  flyoutId: string;
  width: number;
}

type Action =
  | AddFlyoutAction
  | CloseFlyoutAction
  | SetActiveFlyoutAction
  | SetWidthAction;

function flyoutManagerReducer(
  state: EuiFlyoutManagerState = initialState,
  action: Action
): EuiFlyoutManagerState {
  switch (action.type) {
    case ACTION_ADD:
      const { flyoutId, level } = action;
      if (state.flyouts.some((f) => f.flyoutId === flyoutId)) {
        return state;
      }

      const newFlyouts = [...state.flyouts, { level, flyoutId }];

      if (level === 'main') {
        // Create a new session with this main flyout
        const newSession: FlyoutSession = { main: flyoutId, child: null };
        return {
          ...state,
          sessions: [...state.sessions, newSession],
          flyouts: newFlyouts,
        };
      } else {
        // Child flyout - update the current session's child
        if (state.sessions.length === 0) {
          // No active session to attach child to - this shouldn't happen in normal usage
          return state;
        }

        const updatedSessions = [...state.sessions];
        const currentSessionIndex = updatedSessions.length - 1;
        updatedSessions[currentSessionIndex] = {
          ...updatedSessions[currentSessionIndex],
          child: flyoutId,
        };

        return {
          ...state,
          sessions: updatedSessions,
          flyouts: newFlyouts,
        };
      }

    case ACTION_CLOSE: {
      const removedFlyout = state.flyouts.find(
        (f) => f.flyoutId === action.flyoutId
      );
      const newFlyouts = state.flyouts.filter(
        (f) => f.flyoutId !== action.flyoutId
      );

      if (!removedFlyout) {
        return state;
      }

      if (removedFlyout.level === 'main') {
        // Remove the session containing this main flyout
        const newSessions = state.sessions.filter(
          (session) => session.main !== action.flyoutId
        );
        return {
          ...state,
          sessions: newSessions,
          flyouts: newFlyouts,
        };
      } else {
        // Child flyout - set the current session's child to null
        if (state.sessions.length === 0) {
          return { ...state, flyouts: newFlyouts };
        }

        const updatedSessions = [...state.sessions];
        const currentSessionIndex = updatedSessions.length - 1;
        if (updatedSessions[currentSessionIndex].child === action.flyoutId) {
          updatedSessions[currentSessionIndex] = {
            ...updatedSessions[currentSessionIndex],
            child: null,
          };
        }

        return {
          ...state,
          sessions: updatedSessions,
          flyouts: newFlyouts,
        };
      }
    }
    case ACTION_SET_ACTIVE:
      // This action might not be needed with the new session-based approach
      // Keeping it for backward compatibility but it may need review
      if (state.sessions.length === 0) {
        return state;
      }

      const updatedSessions = [...state.sessions];
      const currentSessionIndex = updatedSessions.length - 1;
      updatedSessions[currentSessionIndex] = {
        ...updatedSessions[currentSessionIndex],
        child: action.flyoutId,
      };

      return {
        ...state,
        sessions: updatedSessions,
      };
    case ACTION_SET_WIDTH: {
      const { flyoutId, width } = action;

      // Update width for the specific flyout in the flyouts array
      const updatedFlyouts = state.flyouts.map((flyout) =>
        flyout.flyoutId === flyoutId ? { ...flyout, width } : flyout
      );

      return {
        ...state,
        flyouts: updatedFlyouts,
      };
    }
    default:
      return state;
  }
}

export const addFlyout = (
  flyoutId: string,
  level: 'main' | 'child' = 'main'
): AddFlyoutAction => ({
  type: ACTION_ADD,
  flyoutId,
  level,
});

export const closeFlyout = (flyoutId: string): CloseFlyoutAction => ({
  type: ACTION_CLOSE,
  flyoutId,
});

export const setActiveFlyout = (
  flyoutId: string | null
): SetActiveFlyoutAction => ({
  type: ACTION_SET_ACTIVE,
  flyoutId,
});

export const setFlyoutWidth = (
  flyoutId: string,
  width: number
): SetWidthAction => ({
  type: ACTION_SET_WIDTH,
  flyoutId,
  width,
});

// React hook for local reducer usage
export function useFlyoutManagerReducer(
  initial: EuiFlyoutManagerState = initialState
) {
  const [state, dispatch] = React.useReducer(flyoutManagerReducer, initial);

  const add = React.useCallback(
    (flyoutId: string, level: 'main' | 'child' = 'main') =>
      dispatch(addFlyout(flyoutId, level)),
    []
  );
  const close = React.useCallback(
    (flyoutId: string) => dispatch(closeFlyout(flyoutId)),
    []
  );
  const setActive = React.useCallback(
    (flyoutId: string | null) => dispatch(setActiveFlyout(flyoutId)),
    []
  );
  const setWidth = React.useCallback(
    (flyoutId: string, width: number) =>
      dispatch(setFlyoutWidth(flyoutId, width)),
    []
  );

  // TODO: need a variable to track if a child flyout is active

  // TODO: need a variable to track if the layout should be "side-by-side" or "stacked"

  return {
    state,
    dispatch,
    addFlyout: add,
    closeFlyout: close,
    setActiveFlyout: setActive,
    setFlyoutWidth: setWidth,
  };
}

export function useFlyoutManager(): FlyoutManagerContextType {
  const context = useContext(EuiFlyoutManagerContext);

  if (!context) {
    throw new Error('useFlyoutManager must be used within an EuiFlyoutManager');
  }

  return context;
}

// Update EuiFlyoutManager to use the reducer
export const EuiFlyoutManager = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const api = useFlyoutManagerReducer();

  return (
    <EuiFlyoutManagerContext.Provider value={api}>
      {children}
    </EuiFlyoutManagerContext.Provider>
  );
};

export const useIsFlyoutActive = (flyoutId: string) => {
  const { state } = useFlyoutManager();
  const currentSession = state.sessions[state.sessions.length - 1];
  return (
    currentSession?.main === flyoutId || currentSession?.child === flyoutId
  );
};

export const useIsSessionActive = () => {
  const { state } = useFlyoutManager();
  return state.sessions.length > 0;
};

export const useIsManagedFlyoutContext = () => {
  return useContext(EuiManagedFlyoutContext);
};

export const useCurrentSession = () => {
  const { state } = useFlyoutManager();
  return state.sessions[state.sessions.length - 1] || null;
};

export const useCurrentMainFlyout = () => {
  const { state } = useFlyoutManager();
  const mainFlyoutId = useCurrentSession()?.main;
  return state.flyouts.find((flyout) => flyout.flyoutId === mainFlyoutId);
};

export const useFlyoutWidth = (flyoutId?: string | null) => {
  const { state } = useFlyoutManager();
  const flyout = state.flyouts.find((flyout) => flyout.flyoutId === flyoutId);
  return flyout?.width;
};
