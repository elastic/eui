/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  ACTION_ADD,
  ACTION_CLOSE,
  ACTION_SET_ACTIVE,
  ACTION_SET_LAYOUT_MODE,
  ACTION_SET_WIDTH,
  ACTION_SET_ACTIVITY_STAGE,
  ACTION_GO_BACK,
  ACTION_GO_TO_FLYOUT,
  Action,
} from './actions';
import { LAYOUT_MODE_SIDE_BY_SIDE, LEVEL_MAIN, STAGE_OPENING } from './const';
import {
  EuiFlyoutManagerState,
  FlyoutSession,
  EuiManagedFlyoutState,
} from './types';

/**
 * Default flyout manager state used to initialize the reducer.
 */
export const initialState: EuiFlyoutManagerState = {
  sessions: [],
  flyouts: [],
  layoutMode: LAYOUT_MODE_SIDE_BY_SIDE,
};

/**
 * Reducer handling all flyout manager actions and state transitions.
 */
export function flyoutManagerReducer(
  state: EuiFlyoutManagerState = initialState,
  action: Action
): EuiFlyoutManagerState {
  switch (action.type) {
    // Register a flyout.
    // - Ignore duplicates by `flyoutId`.
    // - For a `main` flyout, start a new session { main, child: null }.
    // - For a `child` flyout, attach it to the most recent session; if no
    //   session exists, do nothing (invalid child without a parent).
    case ACTION_ADD: {
      const { flyoutId, title, level, size } = action;

      // Ignore duplicate registrations
      if (state.flyouts.some((f) => f.flyoutId === flyoutId)) {
        return state;
      }

      const newFlyoutState: EuiManagedFlyoutState = {
        level,
        flyoutId,
        size,
        activityStage: STAGE_OPENING,
      };
      const newFlyouts: EuiManagedFlyoutState[] = [
        ...state.flyouts,
        newFlyoutState,
      ];

      if (level === LEVEL_MAIN) {
        const newSession: FlyoutSession = {
          mainFlyoutId: flyoutId,
          title: title,
          childFlyoutId: null,
        };

        return {
          ...state,
          sessions: [...state.sessions, newSession],
          flyouts: newFlyouts,
        };
      }

      if (state.sessions.length === 0) {
        return state;
      }

      const updatedSessions = [...state.sessions];
      const currentSessionIndex = updatedSessions.length - 1;

      updatedSessions[currentSessionIndex] = {
        ...updatedSessions[currentSessionIndex],
        childFlyoutId: flyoutId,
      };

      return { ...state, sessions: updatedSessions, flyouts: newFlyouts };
    }

    // Unregister a flyout and update sessions accordingly.
    // - When closing a `main` flyout, drop its entire session and all associated flyouts.
    // - When closing a `child` flyout, clear the child pointer on the most
    //   recent session if it matches.
    case ACTION_CLOSE: {
      const removedFlyout = state.flyouts.find(
        (f) => f.flyoutId === action.flyoutId
      );

      if (!removedFlyout) {
        return state;
      }

      if (removedFlyout.level === LEVEL_MAIN) {
        // Find the session that contains this main flyout
        const sessionToRemove = state.sessions.find(
          (session) => session.mainFlyoutId === action.flyoutId
        );

        if (sessionToRemove) {
          // Remove all flyouts associated with this session (main + child)
          const flyoutsToRemove = new Set([action.flyoutId]);
          if (sessionToRemove.childFlyoutId) {
            flyoutsToRemove.add(sessionToRemove.childFlyoutId);
          }

          const newFlyouts = state.flyouts.filter(
            (f) => !flyoutsToRemove.has(f.flyoutId)
          );

          const newSessions = state.sessions.filter(
            (session) => session.mainFlyoutId !== action.flyoutId
          );

          return { ...state, sessions: newSessions, flyouts: newFlyouts };
        }
      }

      // Handle child flyout closing (existing logic)
      const newFlyouts = state.flyouts.filter(
        (f) => f.flyoutId !== action.flyoutId
      );

      if (state.sessions.length === 0) {
        return { ...state, flyouts: newFlyouts };
      }

      const updatedSessions = [...state.sessions];
      const currentSessionIndex = updatedSessions.length - 1;

      if (
        updatedSessions[currentSessionIndex].childFlyoutId === action.flyoutId
      ) {
        updatedSessions[currentSessionIndex] = {
          ...updatedSessions[currentSessionIndex],
          childFlyoutId: null,
        };
      }

      return { ...state, sessions: updatedSessions, flyouts: newFlyouts };
    }

    // Mark the provided flyout ID as the active child for the latest session.
    case ACTION_SET_ACTIVE: {
      // No-op when no session exists.
      if (state.sessions.length === 0) {
        return state;
      }

      const updatedSessions = [...state.sessions];
      const currentSessionIndex = updatedSessions.length - 1;

      updatedSessions[currentSessionIndex] = {
        ...updatedSessions[currentSessionIndex],
        childFlyoutId: action.flyoutId,
      };

      return { ...state, sessions: updatedSessions };
    }

    // Persist a flyout's measured width (px). Used for responsive layout
    // calculations, e.g., deciding stacked vs side-by-side.
    case ACTION_SET_WIDTH: {
      const { flyoutId, width } = action;
      const updatedFlyouts = state.flyouts.map((flyout) =>
        flyout.flyoutId === flyoutId ? { ...flyout, width } : flyout
      );
      return { ...state, flyouts: updatedFlyouts };
    }

    // Switch global layout mode for managed flyouts.
    case ACTION_SET_LAYOUT_MODE: {
      return { ...state, layoutMode: action.layoutMode };
    }

    // Update a flyout's activity stage in state
    case ACTION_SET_ACTIVITY_STAGE: {
      const { flyoutId } = action;
      const updatedFlyouts = state.flyouts.map((flyout) =>
        flyout.flyoutId === flyoutId
          ? { ...flyout, activityStage: action.activityStage }
          : flyout
      );
      return { ...state, flyouts: updatedFlyouts };
    }

    // Go back one session (remove current session from stack)
    case ACTION_GO_BACK: {
      if (state.sessions.length === 0) {
        return state;
      }

      const currentSessionIndex = state.sessions.length - 1;
      const currentSession = state.sessions[currentSessionIndex];

      // Close all flyouts in the current session
      const flyoutsToRemove = new Set([currentSession.mainFlyoutId]);
      if (currentSession.childFlyoutId) {
        flyoutsToRemove.add(currentSession.childFlyoutId);
      }

      const newFlyouts = state.flyouts.filter(
        (f) => !flyoutsToRemove.has(f.flyoutId)
      );

      const newSessions = state.sessions.slice(0, currentSessionIndex);

      return { ...state, sessions: newSessions, flyouts: newFlyouts };
    }

    // Navigate to a specific flyout (remove all sessions after it)
    case ACTION_GO_TO_FLYOUT: {
      const { flyoutId } = action;

      // Find the session containing the target flyout
      const targetSessionIndex = state.sessions.findIndex(
        (session) => session.mainFlyoutId === flyoutId
      );

      if (targetSessionIndex === -1) {
        return state; // Target flyout not found
      }

      // Close all sessions after the target session
      const sessionsToClose = state.sessions.slice(targetSessionIndex + 1);
      const flyoutsToRemove = new Set<string>();

      sessionsToClose.forEach((session) => {
        flyoutsToRemove.add(session.mainFlyoutId);
        if (session.childFlyoutId) {
          flyoutsToRemove.add(session.childFlyoutId);
        }
      });

      const newFlyouts = state.flyouts.filter(
        (f) => !flyoutsToRemove.has(f.flyoutId)
      );

      const newSessions = state.sessions.slice(0, targetSessionIndex + 1);

      return { ...state, sessions: newSessions, flyouts: newFlyouts };
    }

    default:
      return state;
  }
}
