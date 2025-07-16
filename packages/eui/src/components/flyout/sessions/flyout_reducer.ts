/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import {
  EuiFlyoutSessionAction,
  EuiFlyoutSessionHistoryState,
  EuiFlyoutSessionGroup,
} from './types';

/**
 * Initial state for the flyout session
 * @internal
 */
export const initialFlyoutState: EuiFlyoutSessionHistoryState<unknown> = {
  activeFlyoutGroup: null,
  history: [],
};

// Helper to apply size constraints for flyout groups
const applySizeConstraints = <FlyoutMeta>(
  group: EuiFlyoutSessionGroup<FlyoutMeta>
): EuiFlyoutSessionGroup<FlyoutMeta> => {
  const originalMainSize = group.config.mainSize;
  const originalChildSize = group.config.childSize;
  let newMainSize = originalMainSize;
  let newChildSize = originalChildSize;

  if (group.isChildOpen) {
    if (originalMainSize === 'l') {
      newMainSize = 'm'; // If main is 'l' with child, it must be converted to 'm'
      newChildSize = 's'; // And child must be 's'
    } else if (originalMainSize === 'm' && originalChildSize !== 's') {
      newChildSize = 's'; // If main is 'm' with child, child must be 's'
    }
  }

  // If sizes haven't changed, return the original group to preserve references
  if (newMainSize === originalMainSize && newChildSize === originalChildSize) {
    return group;
  }

  return {
    ...group,
    config: {
      ...group.config,
      mainSize: newMainSize,
      childSize: newChildSize,
    },
  };
};

/**
 * Flyout reducer
 * Controls state changes for flyout groups
 */
export function flyoutReducer<FlyoutMeta>(
  state: EuiFlyoutSessionHistoryState<FlyoutMeta>,
  action: EuiFlyoutSessionAction<FlyoutMeta>
): EuiFlyoutSessionHistoryState<FlyoutMeta> {
  switch (action.type) {
    case 'OPEN_MAIN_FLYOUT': {
      const { size, flyoutProps, meta } = action.payload;
      const newHistory = [...state.history];

      if (state.activeFlyoutGroup) {
        newHistory.push(state.activeFlyoutGroup);
      }

      const newActiveGroup: EuiFlyoutSessionGroup<FlyoutMeta> = {
        isMainOpen: true,
        isChildOpen: false,
        config: {
          mainSize: size,
          mainFlyoutProps: flyoutProps,
        },
        meta,
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

      const { size, flyoutProps, meta } = action.payload;
      const updatedActiveGroup: EuiFlyoutSessionGroup<FlyoutMeta> = {
        ...state.activeFlyoutGroup,
        isChildOpen: true,
        config: {
          ...state.activeFlyoutGroup.config,
          childSize: size,
          childFlyoutProps: flyoutProps,
        },
        meta,
      };

      return {
        history: state.history,
        activeFlyoutGroup: applySizeConstraints(updatedActiveGroup),
      };
    }

    case 'OPEN_FLYOUT_GROUP': {
      const { main, child, meta } = action.payload;
      const newHistory = [...state.history];

      if (state.activeFlyoutGroup) {
        newHistory.push(state.activeFlyoutGroup);
      }

      // Create the new active group with both main and child flyouts open
      const newActiveGroup: EuiFlyoutSessionGroup<FlyoutMeta> = {
        isMainOpen: true,
        isChildOpen: true,
        config: {
          mainSize: main.size,
          childSize: child.size,
          mainFlyoutProps: main.flyoutProps,
          childFlyoutProps: child.flyoutProps,
        },
        meta,
      };

      return {
        activeFlyoutGroup: applySizeConstraints(newActiveGroup),
        history: newHistory,
      };
    }

    case 'CLOSE_CHILD_FLYOUT': {
      if (!state.activeFlyoutGroup || !state.activeFlyoutGroup.isChildOpen) {
        console.warn(
          'Cannot close child flyout: no child is open or no active group.'
        );
        return state;
      }

      const updatedActiveGroup: EuiFlyoutSessionGroup<FlyoutMeta> = {
        ...state.activeFlyoutGroup,
        isChildOpen: false,
        config: {
          ...state.activeFlyoutGroup.config,
          childFlyoutProps: {},
        },
      };

      return {
        history: state.history,
        activeFlyoutGroup: applySizeConstraints(updatedActiveGroup),
      };
    }

    case 'GO_BACK': {
      if (!state.activeFlyoutGroup)
        return initialFlyoutState as EuiFlyoutSessionHistoryState<FlyoutMeta>;

      // Restore from history or return to initial state
      if (state.history.length > 0) {
        const newHistory = [...state.history];
        const previousGroup = newHistory.pop();
        return {
          activeFlyoutGroup: previousGroup
            ? applySizeConstraints(previousGroup)
            : null,
          history: newHistory,
        };
      } else {
        return initialFlyoutState as EuiFlyoutSessionHistoryState<FlyoutMeta>;
      }
    }

    case 'UPDATE_ACTIVE_FLYOUT_CONFIG': {
      if (!state.activeFlyoutGroup) {
        console.warn('Cannot update config: no active flyout group.');
        return state;
      }

      const { configChanges } = action.payload;

      const updatedActiveGroup: EuiFlyoutSessionGroup<FlyoutMeta> = {
        ...state.activeFlyoutGroup,
        config: {
          ...state.activeFlyoutGroup.config,
          ...configChanges,
        },
      };

      const finalUpdatedActiveGroup = applySizeConstraints(updatedActiveGroup);

      return {
        ...state,
        activeFlyoutGroup: finalUpdatedActiveGroup,
      };
    }

    case 'CLOSE_SESSION':
      // Remove the active group and close the session
      return {
        activeFlyoutGroup: null,
        history: [],
      };

    default:
      return state;
  }
}
