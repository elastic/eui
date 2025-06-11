/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { FlyoutAction, FlyoutHistoryState, FlyoutGroup } from './types';

export const initialFlyoutState: FlyoutHistoryState = {
  activeFlyoutGroup: null,
  history: [],
};

// Helper to apply size constraints for flyout groups
const applySizeConstraints = (group: FlyoutGroup): FlyoutGroup => {
  const newConfig = { ...group.config };
  let mainSize = newConfig.mainSize;
  let childSize = newConfig.childSize;

  if (group.isChildOpen) {
    if (mainSize === 'l') {
      mainSize = 'm'; // If main is 'l' with child, it must be converted to 'm'
      childSize = 's'; // And child must be 's'
    }
    if (mainSize === 'm' && childSize !== 's') {
      childSize = 's'; // If main is 'm' with child, child must be 's'
    }
  }

  return {
    ...group,
    config: {
      ...newConfig,
      mainSize,
      childSize,
    },
  };
};

export function flyoutReducer(
  state: FlyoutHistoryState,
  action: FlyoutAction
): FlyoutHistoryState {
  switch (action.type) {
    case 'OPEN_MAIN_FLYOUT': {
      const { mainSize, mainFlyoutProps, onUnmount } = action.payload;
      const newHistory = [...state.history];

      if (state.activeFlyoutGroup) {
        state.activeFlyoutGroup.onUnmount?.();
        newHistory.push(state.activeFlyoutGroup);
      }

      const newActiveGroup: FlyoutGroup = {
        isMainOpen: true,
        isChildOpen: false,
        config: {
          mainSize,
          // Provide a default childSize, even if no child is initially open
          childSize: 's', // Or derive from a global default if available
          mainFlyoutProps,
          childFlyoutProps: {}, // Initialize childFlyoutProps
        },
        onUnmount,
      };

      return {
        activeFlyoutGroup: applySizeConstraints(newActiveGroup),
        history: newHistory,
      };
    }

    case 'OPEN_CHILD_FLYOUT': {
      if (!state.activeFlyoutGroup || !state.activeFlyoutGroup.isMainOpen) {
        console.warn(
          'Cannot open child flyout: main flyout is not open or no active group.'
        );
        return state;
      }

      const { childSize, childFlyoutProps, onUnmount } = action.payload;
      const newHistory = [...state.history];

      // Current active group's onUnmount is called before it's moved to history
      state.activeFlyoutGroup.onUnmount?.();
      newHistory.push(state.activeFlyoutGroup);

      const newActiveGroup: FlyoutGroup = {
        ...state.activeFlyoutGroup, // Inherit properties from current active group
        isChildOpen: true,
        config: {
          ...state.activeFlyoutGroup.config,
          childSize,
          childFlyoutProps,
        },
        onUnmount, // New onUnmount for the state with child open
      };

      return {
        activeFlyoutGroup: applySizeConstraints(newActiveGroup),
        history: newHistory,
      };
    }

    case 'CLOSE_CURRENT_FLYOUT': {
      state.activeFlyoutGroup?.onUnmount?.();

      if (state.history.length > 0) {
        const newHistory = [...state.history];
        const previousGroup = newHistory.pop();
        return {
          activeFlyoutGroup: previousGroup || null,
          history: newHistory,
        };
      } else {
        // No history, so close everything
        return initialFlyoutState;
      }
    }

    case 'UPDATE_ACTIVE_FLYOUT_CONFIG': {
      if (!state.activeFlyoutGroup) {
        console.warn('Cannot update config: no active flyout group.');
        return state;
      }

      const { configChanges, onUnmount } = action.payload;

      // Directly update the active group. No new history entry is created.
      // The onUnmount of the *current* activeFlyoutGroup is NOT called here,
      // as this is an in-place update, not a navigation away from it.
      const updatedActiveGroup: FlyoutGroup = {
        ...state.activeFlyoutGroup,
        config: {
          ...state.activeFlyoutGroup.config,
          ...configChanges,
        },
        // If a new onUnmount is provided in the payload, it REPLACES the existing one on the active group.
        // If not provided, the existing onUnmount is preserved.
        onUnmount:
          onUnmount !== undefined
            ? onUnmount
            : state.activeFlyoutGroup.onUnmount,
      };

      return {
        ...state, // Keep the existing history array
        activeFlyoutGroup: applySizeConstraints(updatedActiveGroup),
      };
    }

    case 'CLEAR_HISTORY':
      return {
        ...state,
        history: [],
      };

    default:
      return state;
  }
}
