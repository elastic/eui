/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useEuiTheme } from '../../../services';

export interface EuiManagedFlyoutState {
  flyoutId: string;
  level: 'main' | 'child';
  width?: number;
  size?: string;
}

export interface FlyoutSession {
  main: string;
  child: string | null;
}

export interface EuiFlyoutManagerState {
  sessions: FlyoutSession[];
  flyouts: EuiManagedFlyoutState[];
  dispatch: (action: Action) => void;
  layoutMode: 'side-by-side' | 'stacked';
}

const initialState: EuiFlyoutManagerState = {
  sessions: [],
  flyouts: [],
  dispatch: () => {},
  layoutMode: 'side-by-side',
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
const ACTION_SET_LAYOUT_MODE = `${EUI_FLYOUT_PREFIX}/setLayoutMode` as const;

interface AddFlyoutAction extends BaseAction {
  type: typeof ACTION_ADD;
  flyoutId: string;
  level: 'main' | 'child';
  size?: string;
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

interface SetLayoutModeAction extends BaseAction {
  type: typeof ACTION_SET_LAYOUT_MODE;
  layoutMode: 'side-by-side' | 'stacked';
}

type Action =
  | AddFlyoutAction
  | CloseFlyoutAction
  | SetActiveFlyoutAction
  | SetWidthAction
  | SetLayoutModeAction;

function flyoutManagerReducer(
  state: EuiFlyoutManagerState = initialState,
  action: Action
): EuiFlyoutManagerState {
  switch (action.type) {
    case ACTION_ADD:
      const { flyoutId, level, size } = action;
      if (state.flyouts.some((f) => f.flyoutId === flyoutId)) {
        return state;
      }

      const newFlyouts = [...state.flyouts, { level, flyoutId, size }];

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
    case ACTION_SET_LAYOUT_MODE:
      return {
        ...state,
        layoutMode: action.layoutMode,
      };
    default:
      return state;
  }
}

export const addFlyout = (
  flyoutId: string,
  level: 'main' | 'child' = 'main',
  size?: string
): AddFlyoutAction => ({
  type: ACTION_ADD,
  flyoutId,
  level,
  size,
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

export const setLayoutModeAction = (
  layoutMode: 'side-by-side' | 'stacked'
): SetLayoutModeAction => ({
  type: ACTION_SET_LAYOUT_MODE,
  layoutMode,
});

// React hook for local reducer usage
export function useFlyoutManagerReducer(
  initial: EuiFlyoutManagerState = initialState
) {
  const [state, dispatch] = React.useReducer(flyoutManagerReducer, initial);

  const add = React.useCallback(
    (flyoutId: string, level: 'main' | 'child' = 'main', size?: string) =>
      dispatch(addFlyout(flyoutId, level, size)),
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

  return {
    state,
    dispatch,
    addFlyout: add,
    closeFlyout: close,
    setActiveFlyout: setActive,
    setFlyoutWidth: setWidth,
  };
}

export const useFlyoutManager = (): FlyoutManagerContextType | null =>
  useContext(EuiFlyoutManagerContext);

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
  const context = useFlyoutManager();

  if (!context) return false;

  const currentSession =
    context?.state.sessions[context.state.sessions.length - 1];
  return (
    currentSession?.main === flyoutId || currentSession?.child === flyoutId
  );
};

export const useIsSessionActive = () => {
  const context = useFlyoutManager();
  if (!context) {
    return false;
  }

  return context.state.sessions.length > 0;
};

export const useIsManagedFlyoutContext = () => {
  return useContext(EuiManagedFlyoutContext);
};

export const useCurrentSession = () => {
  const context = useFlyoutManager();

  if (!context) {
    return null;
  }

  return context.state.sessions[context.state.sessions.length - 1] || null;
};

export const useCurrentMainFlyout = () => {
  const context = useFlyoutManager();
  const currentSession = useCurrentSession();

  if (!context || !currentSession) {
    return null;
  }

  const mainFlyoutId = currentSession.main;

  return context.state.flyouts.find(
    (flyout) => flyout.flyoutId === mainFlyoutId
  );
};

export const useCurrentChildFlyout = () => {
  const context = useFlyoutManager();
  const currentSession = useCurrentSession();

  if (!context || !currentSession || !currentSession.child) {
    return null;
  }

  const childFlyoutId = currentSession.child;

  return context.state.flyouts.find(
    (flyout) => flyout.flyoutId === childFlyoutId
  );
};

export const useFlyoutWidth = (flyoutId?: string | null) => {
  const context = useFlyoutManager();
  if (!context) {
    return null;
  }
  const flyout = context.state.flyouts.find((f) => f.flyoutId === flyoutId);
  return flyout?.width;
};

/**
 * Hook to get the size of a parent flyout for validation purposes
 */
export const useParentFlyoutSize = (childFlyoutId: string) => {
  const context = useFlyoutManager();

  if (!context) {
    return undefined;
  }

  const currentSession = context.state.sessions.find(
    (session) => session.child === childFlyoutId
  );

  if (!currentSession) {
    return undefined;
  }

  const parentFlyout = context.state.flyouts.find(
    (f) => f.flyoutId === currentSession.main
  );

  return parentFlyout?.size;
};

export const useHasChildFlyout = (flyoutId: string) => {
  const currentSession = useCurrentSession();

  if (!currentSession) {
    return false;
  }

  return currentSession.child === flyoutId;
};

/**
 * Helper function to convert size to width using theme breakpoints
 */
const getWidthFromSize = (size: string | number, euiTheme: any): number => {
  if (typeof size === 'number') {
    return size;
  }

  if (typeof size === 'string') {
    // Try to parse as number (assumes px)
    const parsed = parseInt(size, 10);
    if (!isNaN(parsed)) {
      return parsed;
    }

    // Handle named sizes
    if (size === 's') {
      return euiTheme.breakpoint.s;
    } else if (size === 'm') {
      return euiTheme.breakpoint.m;
    } else if (size === 'l') {
      return euiTheme.breakpoint.l;
    }
  }

  // Default fallback
  return 0;
};

/**
 * Hook to handle responsive layout mode for managed flyouts
 */
export const useFlyoutLayoutMode = () => {
  const context = useFlyoutManager();
  const setLayoutMode = React.useCallback(
    (layoutMode: 'side-by-side' | 'stacked') => {
      if (context?.dispatch) {
        context.dispatch(setLayoutModeAction(layoutMode));
      }
    },
    [context]
  );

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : Infinity
  );

  // Update window width on resize
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const { euiTheme } = useEuiTheme();

  // Get current session and flyout IDs
  const currentSession = useCurrentSession();
  const parentFlyoutId = currentSession?.main;
  const childFlyoutId = currentSession?.child;

  // Get current flyouts for size information
  const parentFlyout = useCurrentMainFlyout();
  const childFlyout = useCurrentChildFlyout();

  // Get actual widths using the helper
  const parentWidth = useFlyoutWidth(parentFlyoutId);
  const childWidth = useFlyoutWidth(childFlyoutId);

  // Calculate stacking breakpoint and update layout mode
  useEffect(() => {
    if (!context) return;

    if (!childFlyoutId) {
      setLayoutMode('side-by-side');
      return;
    }

    // If we have actual widths, use them; otherwise fall back to size-based calculation
    let parentWidthValue = parentWidth;
    let childWidthValue = childWidth;

    // Fall back to size-based calculation if widths are not available
    if (!parentWidthValue && parentFlyout?.size) {
      parentWidthValue = getWidthFromSize(parentFlyout.size, euiTheme);
    }
    if (!childWidthValue && childFlyout?.size) {
      childWidthValue = getWidthFromSize(childFlyout.size, euiTheme);
    }

    if (!parentWidthValue || !childWidthValue) {
      setLayoutMode('side-by-side');
      return;
    }

    const combinedWidth = parentWidthValue + childWidthValue;
    const combinedWidthPercentage = (combinedWidth / windowWidth) * 100;

    // Apply the 90% rule: if combined widths are 90% or more of viewport, use stacked layout
    const newLayoutMode =
      combinedWidthPercentage >= 90 ? 'stacked' : 'side-by-side';

    setLayoutMode(newLayoutMode);
  }, [
    windowWidth,
    context,
    setLayoutMode,
    parentWidth,
    childWidth,
    childFlyoutId,
    parentFlyout?.size,
    childFlyout?.size,
    euiTheme,
  ]);

  return {
    layoutMode: context?.state.layoutMode || 'side-by-side',
    setLayoutMode,
  };
};
