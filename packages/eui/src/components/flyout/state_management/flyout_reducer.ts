/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { FlyoutAction, FlyoutState } from './types';

export const initialFlyoutState: FlyoutState = {
  isMainOpen: false,
  isChildOpen: false,
  config: {
    mainSize: 'm',
    childSize: 's',
    mainFlyoutProps: {},
    childFlyoutProps: {},
  },
};

export function flyoutReducer(
  state: FlyoutState,
  action: FlyoutAction
): FlyoutState {
  switch (action.type) {
    case 'OPEN_MAIN_FLYOUT': {
      const mainSize = action.payload?.mainSize || state.config.mainSize || 'm';
      const newConfig = { ...state.config, ...action.payload, mainSize };

      return {
        ...state,
        isMainOpen: true,
        isChildOpen: state.isChildOpen,
        config: newConfig,
      };
    }
    case 'CLOSE_MAIN_FLYOUT':
      return {
        ...initialFlyoutState,
        config: {
          mainSize: state.config.mainSize,
          childSize: state.config.childSize,
          mainFlyoutProps: initialFlyoutState.config.mainFlyoutProps,
          childFlyoutProps: initialFlyoutState.config.childFlyoutProps,
        },
      };

    case 'OPEN_CHILD_FLYOUT': {
      if (!state.isMainOpen) {
        console.warn('Cannot open child flyout when main flyout is closed.');
        return state;
      }

      let nextMainSize = state.config.mainSize;
      let nextChildSize =
        action.payload?.childSize || state.config.childSize || 's';
      if (nextMainSize === 'l') {
        // FIXME: remember that the original mainSize was 'l', so it can be restored when the child closes
        nextMainSize = 'm'; // If main is 'l', it must be converted to 'm'
        nextChildSize = 's';
      }
      if (nextMainSize === 'm' && nextChildSize !== 's') {
        nextChildSize = 's'; // If main is 'm', child must be 's'
      }

      return {
        ...state,
        isChildOpen: true,
        config: {
          ...state.config,
          ...action.payload,
          mainSize: nextMainSize,
          childSize: nextChildSize,
        },
      };
    }
    case 'CLOSE_CHILD_FLYOUT':
      return {
        ...state,
        isChildOpen: false,
        config: {
          ...state.config,
          childFlyoutProps: initialFlyoutState.config.childFlyoutProps,
        },
      };
    case 'SET_CONFIG_SIZES': {
      const newConfig = { ...state.config };

      if (action.payload.mainSize !== undefined) {
        newConfig.mainSize = action.payload.mainSize;
      }
      if (action.payload.childSize !== undefined) {
        newConfig.childSize = action.payload.childSize;
      }

      if (
        ['m', 'l'].includes(newConfig.mainSize) &&
        newConfig.childSize !== 's'
      ) {
        newConfig.childSize = 's'; // If main is 'm' or 'l', child must be 's'
      }

      return {
        ...state,
        config: newConfig,
      };
    }
    default:
      return state;
  }
}
