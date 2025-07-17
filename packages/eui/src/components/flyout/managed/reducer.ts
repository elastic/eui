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

      // Add new flyout as active, set all others inactive, preserve order
      return {
        ...state,
        flyouts: [
          ...state.flyouts.map((f) => ({ ...f, isActive: false })),
          {
            id: action.id,
            meta: action.meta,
            isActive: true,
          },
        ],
      };
    }

    case 'CLOSE_FLYOUT': {
      // Remove the specified flyout
      const filtered = state.flyouts.filter((f) => f.id !== action.id);
      if (filtered.length === 0) {
        return { ...state, flyouts: [] };
      }
      // Set the last flyout as active (if any remain)
      return {
        ...state,
        flyouts: filtered.map((f, i) => ({
          ...f,
          isActive: i === filtered.length - 1,
        })),
      };
    }

    case 'SET_ACTIVE': {
      // Set the specified flyout as active, all others inactive
      return {
        ...state,
        flyouts: state.flyouts.map((f) => ({
          ...f,
          isActive: f.id === action.id,
        })),
      };
    }
    default:
      return state;
  }
}
