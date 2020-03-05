import { CSSProperties, ReactElement, ReactNode } from 'react';
import { NoArgCallback } from '../common';

export interface EuiTourStepInterface {
  children: ReactElement;
  content: ReactNode;

  /**
   * Set to `true`, step will display if parent tour is active
   */
  isStepOpen?: boolean;

  /**
   * State of the parent tour
   */
  isTourActive: boolean;

  /**
   * Sets the min-width of the tour popover,
   * set to `true` to use the default size,
   * set to `false` to not restrict the width,
   * set to a number for a custom width in px,
   * set to a string for a custom width in custom measurement.
   */
  minWidth?: boolean | number | string;

  /**
   * Function to call for 'skip tour' actions
   */
  onSkip: NoArgCallback<void>;

  /**
   * Function to call for 'end tour' actions
   */
  onEnd: NoArgCallback<void>;

  /**
   * The number of the step within the parent tour
   */
  step: number;

  /**
   * The total number of steps in the tour
   */
  stepsTotal: number;

  style?: CSSProperties;

  /**
   * Smaller title text that appears atop each step in the tour
   */
  subtitle: string;

  // Larger title text specific to this step
  title: string;
}

export interface EuiTourState {
  currentTourStep: number;
  isTourActive: boolean;
  tourPopoverWidth: number;
  tourSubtitle: string;
}

export interface EuiTourAction {
  type: string;
  payload?: { [key: string]: any };
}

export interface EuiTourActions {
  [key: string]: (action: EuiTourAction) => void;
}
