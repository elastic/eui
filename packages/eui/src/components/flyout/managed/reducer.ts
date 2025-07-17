/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import type { Action, FlyoutManagerState } from './types';

export const initialState: FlyoutManagerState = {
  flyouts: [],
  activeFlyoutId: undefined,
};

/**
 * Reducer to manage the state of flyouts.
 * Handles adding, closing, and setting active flyouts.
 */
export function reducer(
  state: FlyoutManagerState,
  action: Action
): FlyoutManagerState {
  switch (action.type) {
    case 'ADD_FLYOUT': {
      // Avoid adding duplicate flyouts
      if (state.flyouts.find((f) => f.id === action.id)) return state;

      // Add new flyout and set it as active
      return {
        ...state,
        flyouts: [
          ...state.flyouts,
          {
            id: action.id,
            meta: action.meta,
          },
        ],
        activeFlyoutId: action.id,
      };
    }

    case 'CLOSE_FLYOUT': {
      // Remove the specified flyout
      const filtered = state.flyouts.filter((f) => f.id !== action.id);
      if (filtered.length === 0) {
        return { ...state, flyouts: [], activeFlyoutId: undefined };
      }
      // Set the last flyout as active (if any remain)
      const newActiveFlyoutId =
        state.activeFlyoutId === action.id
          ? filtered[filtered.length - 1].id
          : state.activeFlyoutId;
      return {
        ...state,
        flyouts: filtered,
        activeFlyoutId: newActiveFlyoutId,
      };
    }

    case 'SET_ACTIVE': {
      // Set the specified flyout as active
      return {
        ...state,
        activeFlyoutId: action.id,
      };
    }
    default:
      return state;
  }
}
