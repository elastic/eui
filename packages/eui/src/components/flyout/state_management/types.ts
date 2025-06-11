/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0 and the Server Side Public License, v 1; you may not use this file except
 * in compliance with, at your election, the Elastic License 2.0 or the Server
 * Side Public License, v 1.
 */

import { EuiFlyoutProps, EuiFlyoutSize } from '../flyout';
import { EuiFlyoutChildProps } from '../flyout_child';

// FlyoutConfig remains largely the same, defining properties for a flyout setup.
// It's used within FlyoutGroup.
interface FlyoutConfig {
  mainSize: EuiFlyoutSize;
  childSize: 's' | 'm'; // Default or relevant size for a potential child
  mainFlyoutProps?: Partial<Omit<EuiFlyoutProps, 'onClose' | 'children'>> & {
    customData?: any;
  };
  childFlyoutProps?: Partial<
    Omit<EuiFlyoutChildProps, 'onClose' | 'children'>
  > & { customData?: any };
}

// Represents a snapshot of the flyout system's state at a point in time.
export interface FlyoutGroup {
  isMainOpen: boolean; // Is the main flyout part of this state open?
  isChildOpen: boolean; // Is the child flyout part of this state open?
  config: FlyoutConfig; // Configuration for this specific state
  mainOnUnmount?: () => void; // For the main flyout portion of this group
  childOnUnmount?: () => void; // For the child flyout portion, if isChildOpen is true
}

// The overall state managed by FlyoutManager, now with history.
// Replaces the old FlyoutState.
export interface FlyoutHistoryState {
  activeFlyoutGroup: FlyoutGroup | null; // Current active state, or null if none
  history: FlyoutGroup[]; // Stack of previous FlyoutGroup states
}

// Updated actions for the FlyoutManager with history capabilities.
export type FlyoutAction =
  | {
      type: 'OPEN_MAIN_FLYOUT';
      payload: {
        mainSize: EuiFlyoutSize;
        mainFlyoutProps?: FlyoutConfig['mainFlyoutProps'];
        mainOnUnmount?: () => void; // Renamed for clarity
      };
    }
  | {
      type: 'OPEN_CHILD_FLYOUT';
      payload: {
        childSize: 's' | 'm';
        childFlyoutProps?: FlyoutConfig['childFlyoutProps'];
        childOnUnmount?: () => void; // Renamed for clarity, specific to child state
      };
    }
  // Closes the current flyout (child if open, then main). Triggers 'go back' logic.
  | { type: 'CLOSE_CURRENT_FLYOUT' }
  // New action to specifically close an open child flyout without affecting history
  | { type: 'CLOSE_CHILD_FLYOUT' }
  // Updates config of the active flyout group, creating a new history entry.
  | {
      type: 'UPDATE_ACTIVE_FLYOUT_CONFIG';
      payload: {
        configChanges: Partial<FlyoutConfig>; // Changes to apply to the active config
        newMainOnUnmount?: () => void; // Optional new onUnmount for the main part
        newChildOnUnmount?: () => void; // Optional new onUnmount for the child part (if child is open)
      };
    }
  // Clears the history stack, does not affect the activeFlyoutGroup.
  | { type: 'CLEAR_HISTORY' };

// --- Types for FlyoutManager component and its render callback ---

// Context object passed to the renderFlyoutContent function
export interface FlyoutRenderContext {
  // The specific EUI flyout props (main or child) that were originally passed when opening the flyout.
  // This includes `customData`.
  flyoutSpecificProps: Partial<EuiFlyoutProps | EuiFlyoutChildProps> & {
    customData?: any;
  };
  // The size ('s', 'm', 'l', etc.) for the flyout being rendered.
  flyoutSize: EuiFlyoutProps['size'] | EuiFlyoutChildProps['size'];
  // Indicates if rendering for the 'main' or 'child' flyout.
  flyoutType: 'main' | 'child';
  // The dispatch function from the FlyoutManager's reducer, to allow content to trigger state changes.
  dispatch: React.Dispatch<FlyoutAction>;
  // The currently active FlyoutGroup, for broader context if needed by the rendering logic.
  activeFlyoutGroup: FlyoutGroup | null;
  // The standard `onClose` handler that should be called by the rendered content to close the current flyout.
  onClose: () => void;
}

// Props for the FlyoutManager component itself
export interface FlyoutManagerComponentProps {
  // Standard children prop, for any application content that lives outside the flyouts managed by FlyoutManager.
  children?: React.ReactNode;
  // Callback function responsible for rendering the actual content of a flyout.
  // FlyoutManager calls this function when it needs to display a main or child flyout.
  renderFlyoutContent: (context: FlyoutRenderContext) => React.ReactNode;
}
